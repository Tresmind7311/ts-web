'use client';
import { useRef, useEffect, RefObject } from 'react';
import * as THREE from 'three';
import { gsap } from '@/lib/gsap';

// ─── Shaders (unchanged) ──────────────────────────────────────────────────────

const VERTEX_SHADER = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FRAGMENT_SHADER = /* glsl */`
  precision highp float;

  varying vec2 vUv;

  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform vec2 uMouse;
  uniform float uTime;
  uniform float uIntensity;
  uniform float uRadius;
  uniform float uStrength;
  uniform float uFrequency;
  uniform float uSpeed;

  vec2 coverUv(vec2 uv, vec2 screenSize, vec2 imageSize) {
    float screenRatio = screenSize.x / screenSize.y;
    float imageRatio  = imageSize.x  / imageSize.y;
    vec2 scale = vec2(1.0);
    if (screenRatio > imageRatio) {
      scale.y = imageRatio / screenRatio;
    } else {
      scale.x = screenRatio / imageRatio;
    }
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 aspect  = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 current = vUv * aspect;
    vec2 mouse   = uMouse * aspect;

    vec2  delta             = current - mouse;
    float distanceFromMouse = length(delta);

    float influence = 1.0 - smoothstep(0.0, uRadius, distanceFromMouse);
    influence *= influence;

    float wave      = sin(distanceFromMouse * uFrequency - uTime * uSpeed);
    vec2  direction = normalize(delta + vec2(0.00001));

    vec2 displacement =
      direction * wave * influence * uStrength * uIntensity;

    displacement += vec2(
      sin(uTime * 4.0 + vUv.y * 24.0),
      cos(uTime * 4.5 + vUv.x * 24.0)
    ) * 0.0025 * influence * uIntensity;

    vec2 distortedUv = vUv + displacement;
    vec2 imageUv     = coverUv(distortedUv, uResolution, uImageResolution);

    vec3 color = texture2D(uTexture, imageUv).rgb;

    float chromatic = influence * uIntensity * 0.0025;
    color.r = texture2D(uTexture, imageUv + direction * chromatic).r;
    color.b = texture2D(uTexture, imageUv - direction * chromatic).b;

    color += abs(wave) * influence * uIntensity * 0.035;

    gl_FragColor = vec4(color, 1.0);
  }
`;

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  /** Ref to the div wrapping ImageSequenceCanvas — 2D canvas queried from it. */
  sourceRef: RefObject<HTMLDivElement | null>;
  /**
   * Optional: ref to the SCROLL container (not the fixed frame).
   * Enables IntersectionObserver to pause WebGL rendering when the section
   * is off-screen. Required for correct behaviour in position:fixed layouts
   * where the fixed canvas itself is always geometrically in-viewport.
   */
  containerRef?: RefObject<HTMLElement | null>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WaterDistortionOverlay({ sourceRef, containerRef }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // antialias: false — this is a full-screen quad shader with no geometry
    // edges to smooth; AA has zero visible effect here and wastes GPU memory.
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight, false);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = {
      uTexture: { value: new THREE.Texture() },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uImageResolution: { value: new THREE.Vector2(1920, 1080) }, // set properly in initTexture
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0 },
      uIntensity: { value: 0 },
      uRadius: { value: 0.22 },
      uStrength: { value: 0.035 },
      uFrequency: { value: 32.0 },
      uSpeed: { value: 7.0 },
    };

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material));

    // ── Source canvas — lazy init ──────────────────────────────────────────
    let srcCanvas: HTMLCanvasElement | null = null;
    let texture: THREE.CanvasTexture | null = null;

    const initTexture = () => {
      if (!sourceRef.current) return;
      const found = sourceRef.current.querySelector('canvas');
      if (!found) return;
      srcCanvas = found;
      texture = new THREE.CanvasTexture(srcCanvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      uniforms.uTexture.value = texture;
      // Cache image resolution here — never update it inside the animate loop.
      uniforms.uImageResolution.value.set(srcCanvas.width, srcCanvas.height);
    };

    // ── Mouse tracking ─────────────────────────────────────────────────────
    const targetMouse = new THREE.Vector2(0.5, 0.5);
    const smoothMouse = new THREE.Vector2(0.5, 0.5);
    let targetIntensity = 0;

    // ── Visibility gate ────────────────────────────────────────────────────
    // For position:fixed layouts, the fixed canvas is always geometrically
    // inside the viewport so IO on it always returns isIntersecting:true.
    // We observe the SCROLL container instead (the tall in-flow element)
    // so we correctly detect when the section is actually active.
    let isVisible = false;
    let io: IntersectionObserver | null = null;

    const ioTarget = containerRef?.current ?? sourceRef.current;
    if (ioTarget) {
      io = new IntersectionObserver(
        ([entry]) => { isVisible = entry.isIntersecting; },
        { threshold: 0 },
      );
      io.observe(ioTarget);
    }

    // Skip mouse updates while section is off-screen — avoids
    // stale intensity builds up that cause a flash on re-entry.
    const onPointerMove = (e: PointerEvent) => {
      if (!isVisible) return;
      targetMouse.set(
        e.clientX / window.innerWidth,
        1 - e.clientY / window.innerHeight,
      );
      targetIntensity = 1;
    };
    const onLeave = () => { targetIntensity = 0; };
    const onEnter = () => { targetIntensity = 1; };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
      // Re-read source canvas dimensions — DPR or viewport changes may resize it.
      if (srcCanvas) {
        uniforms.uImageResolution.value.set(srcCanvas.width, srcCanvas.height);
      }
    };
    window.addEventListener('resize', resize, { passive: true });

    // ── Animate (GSAP ticker — same RAF loop as Lenis + ScrollTrigger) ────
    const clock = new THREE.Clock();
    let lastScrollY = -1;

    const animate = () => {
      // ── Skip ALL GPU work when section is off-screen ───────────────────
      if (!isVisible) return;

      // ── Lazy texture init ──────────────────────────────────────────────
      if (!srcCanvas) initTexture();

      // ── Dirty texture upload ───────────────────────────────────────────
      // Previously: texture.needsUpdate = true every frame.
      // Cost: full 2D→GPU texture upload at 60fps (expensive on large canvases).
      //
      // Now: only upload when window.scrollY changed — i.e., only when
      // ImageSequenceCanvas has actually drawn a new frame to the source canvas.
      // While the user is stopped, scrollY stays constant → zero GPU uploads.
      let textureUpdated = false;
      if (texture && srcCanvas) {
        const sy = window.scrollY;
        if (sy !== lastScrollY) {
          texture.needsUpdate = true;
          lastScrollY = sy;
          textureUpdated = true;
        }
      }

      // ── Lerp mouse + intensity ─────────────────────────────────────────
      smoothMouse.lerp(targetMouse, 0.085);
      uniforms.uMouse.value.copy(smoothMouse);
      uniforms.uIntensity.value += (targetIntensity - uniforms.uIntensity.value) * 0.035;
      uniforms.uTime.value = clock.getElapsedTime();

      // ── Skip render when effect is fully inactive ──────────────────────
      // uIntensity drives the entire shader effect (influence *= uIntensity
      // in the GLSL). When it's effectively 0 and no new frame arrived,
      // the output would be identical to the last render — skip it.
      if (uniforms.uIntensity.value < 0.001 && !textureUpdated) return;

      renderer.render(scene, camera);
    };

    gsap.ticker.add(animate);

    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      window.removeEventListener('resize', resize);
      io?.disconnect();
      renderer.dispose();
      material.dispose();
      texture?.dispose();
    };
  }, [sourceRef, containerRef]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        pointerEvents: 'none',
      }}
    />
  );
}