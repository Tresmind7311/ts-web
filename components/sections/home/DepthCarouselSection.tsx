'use client';

import { useRef, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── GLSL ──────────────────────────────────────────────────────────────────────

const GRID_VERT = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const GRID_FRAG = /* glsl */`
  precision highp float;
  varying vec2 vUv;
  uniform float u_offset;

  void main() {
    vec2 uv  = vec2(vUv.x + u_offset, vUv.y) * 200.0;
    vec2 fw  = fwidth(uv);
    vec2 grd = abs(fract(uv - 0.5) - 0.5) / max(fw, vec2(0.0005));
    float ln = 1.0 - min(min(grd.x, grd.y), 1.0);

    float fade  = smoothstep(0.90, 0.04, vUv.y);
    float sides = 1.0 - pow(abs(vUv.x * 2.0 - 1.0), 2.5);

    float alpha = ln * fade * sides * 0.2;
    vec3 color = vec3(0.45);
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

const BARREL_FRAG = /* glsl */`
  uniform sampler2D tDiffuse;
  uniform float u_strength;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv - 0.5;
    float dist = dot(uv, uv);
    uv *= 1.0 + dist * u_strength;
    gl_FragColor = texture2D(tDiffuse, uv + 0.5);
  }
`;

// ─── Config ────────────────────────────────────────────────────────────────────

const CARD_W = 380;
const CARD_H = 500;
const MAX_ROT_Y = 15;
const DAMPING = 0.88;
const LERP_SPEED = 0.12;
const PIN_PX = 3000;
const MAX_SCROLL = 3600;

const CARDS = [
    { id: 0, label: 'NEURAL DRIFT', tag: "'24", speed: 0.50, baseX: -2050 },
    { id: 1, label: 'VOID MIRRORS', tag: "'24", speed: 1.20, baseX: -1250 },
    { id: 2, label: 'PHASE SHIFT', tag: "'23", speed: 0.76, baseX: -580 },
    { id: 3, label: 'ECLIPSE OPS', tag: "'23", speed: 1.44, baseX: -175 },
    { id: 4, label: 'PRISM BREAK', tag: "'24", speed: 0.95, baseX: 215 },
    { id: 5, label: 'DARK SIGNAL', tag: "'23", speed: 1.62, baseX: 695 },
    { id: 6, label: 'LIQUID CODE', tag: "'24", speed: 0.68, baseX: 1280 },
    { id: 7, label: 'ARC VECTOR', tag: "'22", speed: 1.30, baseX: 1880 },
    { id: 8, label: 'ZERO POINT', tag: "'22", speed: 0.86, baseX: 2460 },
] as const;

// ─── Styles ────────────────────────────────────────────────────────────────────

const StickySection = styled('section')({
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    background: '#ffffff',
    zIndex: 10,
});

const BGCanvas = styled('canvas')({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    display: 'block',
    zIndex: 0,
    pointerEvents: 'none',
});

const CardTrack = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 1,
});

const CardEl = styled('div')({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: `${CARD_W}px`,
    height: `${CARD_H}px`,
    marginLeft: `-${CARD_W / 2}px`,
    marginTop: `-${CARD_H / 2}px`,
    willChange: 'transform',
    userSelect: 'none',
    transformStyle: 'preserve-3d',
    perspective: '800px',
});

const CardFace = styled('div')({
    width: '100%',
    height: '100%',
    borderRadius: '16px',
    overflow: 'hidden',
    position: 'relative',
    border: '1px solid rgba(0,0,0,0.08)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, #ffffff33, transparent)',
        pointerEvents: 'none',
    },
});

const CardLabel = styled('div')({
    position: 'absolute',
    bottom: '24px',
    left: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    zIndex: 2, // ensure text above image
});

const CardTag = styled('span')({
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    fontSize: '10px',
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
});

const CardTitle = styled('span')({
    fontFamily: 'var(--font-body, sans-serif)',
    fontSize: '12px',
    fontWeight: 700,
    color: 'rgba(255,255,255,0.95)',
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
});

const CardNum = styled('span')({
    position: 'absolute',
    top: '20px',
    right: '20px',
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    fontSize: '10px',
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: '0.08em',
    zIndex: 2,
    textShadow: '0 1px 4px rgba(0,0,0,0.5)',
});

const CardDiag = styled('div')({
    position: 'absolute',
    top: '50px',
    left: '24px',
    right: '24px',
    height: '1px',
    background: 'rgba(255,255,255,0.12)',
    transform: 'rotate(-18deg)',
    transformOrigin: 'left center',
    zIndex: 1,
});

const UI = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 10,
    pointerEvents: 'none',
});

const NavLabel = styled('p')({
    position: 'absolute',
    margin: 0,
    top: '28px',
    fontFamily: 'var(--font-mono, ui-monospace, monospace)',
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(0,0,0,0.3)',
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function DepthCarouselSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(CARDS.length).fill(null));
    const cardCurrentX = useRef<number[]>(Array(CARDS.length).fill(0));

    const scrollXRef = useRef(0);
    const targetScrollXRef = useRef(0);
    const velocityRef = useRef(0);

    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const gridMatRef = useRef<THREE.ShaderMaterial | null>(null);
    const composerRef = useRef<EffectComposer | null>(null);
    const barrelPassRef = useRef<ShaderPass | null>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        if (!section || !canvas) return;

        // ── Three.js setup ──────────────────────────────────────────────────────
        const w = window.innerWidth;
        const h = window.innerHeight;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: false,
            alpha: false,
            powerPreference: 'high-performance',
        });
        renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
        renderer.setSize(w, h, false);
        renderer.setClearColor(0xffffff, 1);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(62, w / h, 0.1, 100);
        camera.position.set(0, 6.0, 18.0);
        camera.rotation.x = -0.1;

        // ── Grid ──────────────────────────────────────────────────────────────
        const gridGeo = new THREE.PlaneGeometry(600, 600, 1, 1);
        gridGeo.rotateX(-Math.PI / 2);
        const gridMat = new THREE.ShaderMaterial({
            transparent: true,
            depthWrite: false,
            uniforms: { u_offset: { value: 0 } },
            vertexShader: GRID_VERT,
            fragmentShader: GRID_FRAG,
        });
        const gridMesh = new THREE.Mesh(gridGeo, gridMat);
        gridMesh.position.y = -2.0;
        scene.add(gridMesh);

        // ── Post-processing ──────────────────────────────────────────────────
        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const barrelPass = new ShaderPass({
            uniforms: {
                tDiffuse: { value: null },
                u_strength: { value: 0 },
            },
            vertexShader: `
                varying vec2 vUv;
                void main() {
                    vUv = uv;
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: BARREL_FRAG,
        });
        composer.addPass(barrelPass);

        // ── Resize handler ────────────────────────────────────────────────────
        const onResize = () => {
            const nw = window.innerWidth;
            const nh = window.innerHeight;
            camera.aspect = nw / nh;
            camera.updateProjectionMatrix();
            renderer.setSize(nw, nh, false);
            composer.setSize(nw, nh);
        };
        window.addEventListener('resize', onResize);

        rendererRef.current = renderer;
        cameraRef.current = camera;
        gridMatRef.current = gridMat;
        composerRef.current = composer;
        barrelPassRef.current = barrelPass;

        // ── ScrollTrigger pin ──────────────────────────────────────────────────
        ScrollTrigger.create({
            trigger: section,
            pin: true,
            start: 'top top',
            end: `+=${PIN_PX}`,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
                targetScrollXRef.current = progress * MAX_SCROLL;
            },
        });

        // ── RAF loop ──────────────────────────────────────────────────────────
        let rafId = 0;
        let lastTarget = 0;
        let lastTime = 0;

        const tick = (time: number) => {
            const delta = lastTime ? (time - lastTime) / 16.67 : 1;
            lastTime = time;

            const diff = targetScrollXRef.current - scrollXRef.current;
            scrollXRef.current += diff * LERP_SPEED * delta;

            const currentTarget = targetScrollXRef.current;
            velocityRef.current += ((currentTarget - lastTarget) * 0.05 - velocityRef.current) * 0.08;
            lastTarget = currentTarget;

            const scrollX = scrollXRef.current;
            const vw = window.innerWidth;

            cardRefs.current.forEach((el, i) => {
                if (!el) return;
                const card = CARDS[i];
                const targetX = card.baseX - scrollX * card.speed;
                cardCurrentX.current[i] += (targetX - cardCurrentX.current[i]) * 0.12 * delta;
                const x = cardCurrentX.current[i];

                const cardCenterX = vw / 2 + x + CARD_W / 2;
                const centerOffset = (cardCenterX - vw / 2) / (vw * 0.55);
                const rotY = Math.max(-MAX_ROT_Y, Math.min(MAX_ROT_Y, centerOffset * MAX_ROT_Y));

                el.style.transform = `translateX(${x}px) rotateY(${rotY}deg)`;
            });

            if (gridMatRef.current) {
                gridMatRef.current.uniforms.u_offset.value = scrollX * 0.0003;
            }

            if (cameraRef.current) {
                const targetRotY = velocityRef.current * 0.0002;
                cameraRef.current.rotation.y += (targetRotY - cameraRef.current.rotation.y) * 0.065;
            }

            if (barrelPassRef.current) {
                const strength = Math.min(Math.abs(velocityRef.current) * 0.0004, 0.3);
                barrelPassRef.current.uniforms.u_strength.value = strength;
            }

            if (composerRef.current) {
                composerRef.current.render();
            }

            rafId = requestAnimationFrame(tick);
        };

        rafId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafId);
            ScrollTrigger.getAll().forEach(st => st.kill());
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            gridGeo.dispose();
            gridMat.dispose();
            composer.dispose();
        };
    }, []);

    return (
        <>

            <StickySection ref={sectionRef}>
                <BGCanvas ref={canvasRef} />

                <CardTrack>
                    {CARDS.map((card, i) => {
                        // Map each card to an image: placeholder2.jpg to placeholder9.jpg cycling
                        const imageIndex = (i % 8) + 2; // 2..9
                        const imageUrl = `/placeholder${imageIndex}.jpg`;
                        return (
                            <CardEl
                                key={card.id}
                                ref={(el) => { cardRefs.current[i] = el; }}
                                style={{ zIndex: Math.round(card.speed * 10) }}
                            >
                                <CardFace
                                    style={{
                                        backgroundImage: `url(${imageUrl})`,
                                    }}
                                >
                                    <CardNum>{'0' + (card.id + 1)}</CardNum>
                                    <CardDiag />
                                    <CardLabel>
                                        <CardTag>{card.tag}</CardTag>
                                        <CardTitle>{card.label}</CardTitle>
                                    </CardLabel>
                                </CardFace>
                            </CardEl>
                        );
                    })}
                </CardTrack>

                <UI>
                    <NavLabel style={{ left: 28 }}>Selected Work</NavLabel>
                    <NavLabel style={{ right: 28 }}>Scroll to explore</NavLabel>
                </UI>
            </StickySection>

            
        </>
    );
}