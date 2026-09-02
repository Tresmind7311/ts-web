'use client';

import {
    useCallback,
    useEffect,
    useMemo,
    useRef,
} from 'react';

import {
    useFrame,
    useThree,
} from '@react-three/fiber';

import { useTexture } from '@react-three/drei';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import * as THREE from 'three';

import {
    CARD_FRAGMENT_SHADER,
    CARD_VERTEX_SHADER,
    GRID_FRAGMENT_SHADER,
    GRID_VERTEX_SHADER,
} from './shaders';

import type {
    CurvedProjectsSceneProps,
    Project,
    RectSnapshot,
    RippleState,
    ScrollState,
} from './types';

import type { MutableRefObject } from 'react';

/*
 * =============================================
 * VISUAL TUNING
 * =============================================
 */

const CAMERA_Z = 8.5;

/*
 * Higher = side cards recede more.
 */
const CURVE_DEPTH = 2.75;

/*
 * Higher = stronger downward arc at edges.
 */
const CURVE_DROP = 0.44;

/*
 * CSS top position of .domTrack (must match the CSS).
 * Using a fraction of viewport height.
 */
const TRACK_TOP_VH = 0.17;

/*
 * =============================================
 * CACHED CARD METRICS
 * =============================================
 *
 * Read offsetLeft/offsetWidth once (not per frame).
 * Only refresh on resize / ScrollTrigger refresh.
 * This eliminates all getBoundingClientRect calls
 * from the hot RAF path.
 */

interface CardMetric {
    offsetLeft: number;
    width: number;
    height: number;
}

interface TrackMetrics {
    step: number;
    firstWidth: number;
    cards: CardMetric[];
}

/*
 * =============================================
 * DOM TRACK DRIVER
 * =============================================
 */

interface DomTrackDriverProps {
    cardRefs: MutableRefObject<(HTMLAnchorElement | null)[]>;
    uiRefs: MutableRefObject<(HTMLDivElement | null)[]>;
    trackRef: MutableRefObject<HTMLDivElement | null>;
    rectsRef: MutableRefObject<RectSnapshot[]>;
    scrollRef: MutableRefObject<ScrollState>;
    projectCount: number;

    /* Imperative DOM refs updated without React state */
    counterElemRef: MutableRefObject<HTMLSpanElement | null>;
    dotNavRef: MutableRefObject<HTMLDivElement | null>;
    dragHintRef: MutableRefObject<HTMLDivElement | null>;
    progressBarRef: MutableRefObject<HTMLDivElement | null>;
}

function DomTrackDriver({
    cardRefs,
    uiRefs,
    trackRef,
    rectsRef,
    scrollRef,
    projectCount,
    counterElemRef,
    dotNavRef,
    dragHintRef,
    progressBarRef,
}: DomTrackDriverProps) {
    const { size, viewport } = useThree();

    /*
     * Metric cache — refreshed on mount, resize,
     * and ScrollTrigger refresh (pin spacer shifts).
     * Zero layout reads inside the RAF tick.
     */
    const metricsRef = useRef<TrackMetrics>({
        step: 0,
        firstWidth: 0,
        cards: [],
    });

    const prevIndexRef = useRef(-1);
    const hasMovedRef = useRef(false);

    const cacheMetrics = useCallback(() => {
        const track = trackRef.current;
        const cards = cardRefs.current;

        if (!track || !cards[0]) {
            return;
        }

        const firstCard = cards[0];
        const secondCard = cards[1] ?? null;

        const step = secondCard
            ? secondCard.offsetLeft - firstCard.offsetLeft
            : firstCard.offsetWidth;

        metricsRef.current = {
            step,
            firstWidth: firstCard.offsetWidth,
            cards: cards.map((card) => ({
                offsetLeft: card?.offsetLeft ?? 0,
                width: card?.offsetWidth ?? 0,
                height: card?.offsetHeight ?? 0,
            })),
        };
    }, [cardRefs, trackRef]);

    useEffect(() => {
        /*
         * Wait one rAF for the DOM to have laid out
         * before caching — especially important on
         * the first render before images have loaded.
         */
        const frameId = window.requestAnimationFrame(cacheMetrics);

        window.addEventListener('resize', cacheMetrics, { passive: true });
        ScrollTrigger.addEventListener('refresh', cacheMetrics);

        return () => {
            window.cancelAnimationFrame(frameId);
            window.removeEventListener('resize', cacheMetrics);
            ScrollTrigger.removeEventListener('refresh', cacheMetrics);
        };
    }, [cacheMetrics]);

    useFrame((_, delta) => {
        const track = trackRef.current;
        const { step, firstWidth, cards } = metricsRef.current;

        if (!track || step === 0 || size.width <= 0 || size.height <= 0) {
            return;
        }

        /*
         * Smooth scroll independently from
         * GSAP's raw scroll progress.
         */
        scrollRef.current.current = THREE.MathUtils.damp(
            scrollRef.current.current,
            scrollRef.current.target,
            7,
            delta,
        );

        /*
         * Active card centred in viewport.
         */
        const trackX =
            size.width / 2
            - firstWidth / 2
            - scrollRef.current.current * step;

        track.style.transform = `translate3d(${trackX}px, 0, 0)`;

        /*
         * Compute card rects from cached metrics + live trackX.
         * No getBoundingClientRect in the tick.
         */
        const trackTop = size.height * TRACK_TOP_VH;
        const worldPerPixelX = viewport.width / size.width;
        const worldPerPixelY = viewport.height / size.height;
        const snapshots: RectSnapshot[] = [];

        for (let i = 0; i < cards.length; i++) {
            const card = cards[i];

            if (!card || card.width <= 0) {
                continue;
            }

            const left = trackX + card.offsetLeft;

            snapshots[i] = {
                left,
                top: trackTop,
                width: card.width,
                height: card.height,
            };

            /*
             * Approximate the same perspective projection
             * that the vertex shader applies to the mesh
             * so that the DOM text overlay stays on the card.
             */
            const ui = uiRefs.current[i];

            if (!ui) {
                continue;
            }

            const centerX = left + card.width / 2;
            const centerY = trackTop + card.height / 2;
            const dx = centerX - size.width / 2;
            const dy = centerY - size.height / 2;
            const normalizedX = dx / (size.width / 2);
            const edge = Math.min(Math.abs(normalizedX), 1.4);
            const curve = edge * edge;
            const depth = curve * CURVE_DEPTH;
            const scale = CAMERA_Z / (CAMERA_Z + depth);
            const dropPixels = (curve * CURVE_DROP) / worldPerPixelY;
            const shiftX = dx * scale - dx;
            const shiftY = dy * scale - dy + dropPixels * scale;

            ui.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0) scale(${scale})`;

            ui.style.opacity = String(
                THREE.MathUtils.clamp(1 - curve * 0.28, 0.45, 1),
            );
        }

        rectsRef.current = snapshots;

        /*
         * ==========================================
         * IMPERATIVE UI UPDATES (no React re-renders)
         * ==========================================
         */

        const rawIndex = scrollRef.current.current;
        const activeIndex = Math.max(
            0,
            Math.min(Math.round(rawIndex), projectCount - 1),
        );

        /* Counter + dots — only update on index change */
        if (activeIndex !== prevIndexRef.current) {
            prevIndexRef.current = activeIndex;

            /* "01 / 08" counter */
            if (counterElemRef.current) {
                counterElemRef.current.textContent =
                    `${String(activeIndex + 1).padStart(2, '0')} / ${String(projectCount).padStart(2, '0')}`;
            }

            /* Dot indicators */
            if (dotNavRef.current) {
                const dots = dotNavRef.current.children;

                for (let d = 0; d < dots.length; d++) {
                    const dot = dots[d] as HTMLElement;

                    dot.style.opacity = d === activeIndex ? '1' : '0.25';
                    dot.style.transform = d === activeIndex ? 'scale(1.5)' : 'scale(1)';
                }
            }

            /* Fade drag hint after the first card change */
            if (!hasMovedRef.current && activeIndex > 0) {
                hasMovedRef.current = true;

                if (dragHintRef.current) {
                    dragHintRef.current.style.opacity = '0';
                }
            }
        }

        /* Progress bar — every frame for smoothness */
        if (progressBarRef.current) {
            const progress = rawIndex / Math.max(projectCount - 1, 1);

            progressBarRef.current.style.transform = `scaleX(${
                Math.max(0, Math.min(progress, 1))
            })`;
        }
    }, -100);

    return null;
}

/*
 * =============================================
 * WEBGL PROJECT CARD
 * =============================================
 */

interface MirroredCardProps {
    project: Project;
    index: number;
    rectsRef: MutableRefObject<RectSnapshot[]>;
    scrollRef: MutableRefObject<ScrollState>;
    hoverRef: MutableRefObject<number[]>;
    rippleRef: MutableRefObject<RippleState[]>;
}

function MirroredCard({
    project,
    index,
    rectsRef,
    scrollRef,
    hoverRef,
    rippleRef,
}: MirroredCardProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const hoverCurrentRef = useRef(0);
    const rippleStrengthRef = useRef(0);
    const ripplePositionRef = useRef(new THREE.Vector2(0.5, 0.5));

    const texture = useTexture(project.image);

    const { size, viewport, gl } = useThree();

    useEffect(() => {
        texture.colorSpace = THREE.SRGBColorSpace;

        texture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());

        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;

        texture.needsUpdate = true;
    }, [texture, gl]);

    const textureAspect = useMemo(() => {
        const image = texture.image as HTMLImageElement | undefined;

        if (!image?.naturalWidth || !image?.naturalHeight) {
            return 1.55;
        }

        return image.naturalWidth / image.naturalHeight;
    }, [texture]);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: CARD_VERTEX_SHADER,
            fragmentShader: CARD_FRAGMENT_SHADER,

            uniforms: {
                uTexture: { value: texture },
                uTextureAspect: { value: textureAspect },
                uPlaneAspect: { value: 1.55 },
                uViewportWidth: { value: viewport.width },
                uCurveDepth: { value: CURVE_DEPTH },
                uCurveDrop: { value: CURVE_DROP },
                uVelocity: { value: 0 },
                uHover: { value: 0 },
                uTime: { value: 0 },
                uRipplePosition: { value: new THREE.Vector2(0.5, 0.5) },
                uRippleStrength: { value: 0 },
            },

            side: THREE.DoubleSide,
            depthTest: true,
            depthWrite: true,
            transparent: false,
            toneMapped: false,
        });
    }, [texture, textureAspect, viewport.width]);

    useEffect(() => {
        return () => {
            material.dispose();
        };
    }, [material]);

    useFrame((state, delta) => {
        const mesh = meshRef.current;
        const rect = rectsRef.current[index];

        if (
            !mesh
            || !rect
            || rect.width <= 0
            || rect.height <= 0
            || size.width <= 0
            || size.height <= 0
        ) {
            if (mesh) {
                mesh.visible = false;
            }

            return;
        }

        mesh.visible = true;

        const pixelToWorldX = viewport.width / size.width;
        const pixelToWorldY = viewport.height / size.height;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const x = (centerX - size.width / 2) * pixelToWorldX;
        const y = -(centerY - size.height / 2) * pixelToWorldY;

        mesh.position.set(x, y, 0);

        mesh.scale.set(
            rect.width * pixelToWorldX,
            rect.height * pixelToWorldY,
            1,
        );

        material.uniforms.uPlaneAspect.value = rect.width / rect.height;
        material.uniforms.uViewportWidth.value = viewport.width;

        /* Scroll velocity */
        const velocity = THREE.MathUtils.clamp(
            scrollRef.current.velocity / 3500,
            -1,
            1,
        );

        material.uniforms.uVelocity.value = THREE.MathUtils.damp(
            material.uniforms.uVelocity.value,
            velocity,
            5,
            delta,
        );

        /* Hover */
        const hoverTarget = hoverRef.current[index] ?? 0;

        hoverCurrentRef.current = THREE.MathUtils.damp(
            hoverCurrentRef.current,
            hoverTarget,
            8,
            delta,
        );

        material.uniforms.uHover.value = hoverCurrentRef.current;

        /* Ripple */
        const ripple = rippleRef.current[index];

        if (ripple) {
            ripplePositionRef.current.x = THREE.MathUtils.damp(
                ripplePositionRef.current.x,
                ripple.x,
                14,
                delta,
            );

            ripplePositionRef.current.y = THREE.MathUtils.damp(
                ripplePositionRef.current.y,
                ripple.y,
                14,
                delta,
            );

            rippleStrengthRef.current = THREE.MathUtils.damp(
                rippleStrengthRef.current,
                ripple.strength,
                ripple.strength > 0 ? 9 : 4,
                delta,
            );
        } else {
            rippleStrengthRef.current = THREE.MathUtils.damp(
                rippleStrengthRef.current,
                0,
                4,
                delta,
            );
        }

        material.uniforms.uRipplePosition.value.copy(ripplePositionRef.current);
        material.uniforms.uRippleStrength.value = rippleStrengthRef.current;
        material.uniforms.uTime.value = state.clock.elapsedTime;
    });

    return (
        <mesh ref={meshRef} frustumCulled={false}>
            {/*
             * High subdivision for vertex shader
             * to physically bend the card.
             */}
            <planeGeometry args={[1, 1, 96, 48]} />

            <primitive object={material} attach="material" />
        </mesh>
    );
}

/*
 * =============================================
 * FLOOR GRID
 * =============================================
 */

function PerspectiveGrid() {
    const geometry = useMemo(() => {
        const positions: number[] = [];

        const minX = -32;
        const maxX = 32;
        const frontZ = 6;
        const backZ = -52;

        /* Vertical perspective lines */
        for (let x = minX; x <= maxX; x += 1.35) {
            positions.push(x, -2.42, frontZ);
            positions.push(x, -2.42, backZ);
        }

        /* Horizontal depth lines */
        for (let z = frontZ; z >= backZ; z -= 1.22) {
            positions.push(minX, -2.42, z);
            positions.push(maxX, -2.42, z);
        }

        const buffer = new THREE.BufferGeometry();

        buffer.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(positions, 3),
        );

        return buffer;
    }, []);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: GRID_VERTEX_SHADER,
            fragmentShader: GRID_FRAGMENT_SHADER,

            uniforms: {
                uCurveStrength: { value: 0.9 },
            },

            transparent: true,
            depthWrite: false,
            depthTest: true,
        });
    }, []);

    useEffect(() => {
        return () => {
            geometry.dispose();
            material.dispose();
        };
    }, [geometry, material]);

    return (
        <lineSegments
            geometry={geometry}
            material={material}
            frustumCulled={false}
        />
    );
}

/*
 * =============================================
 * HORIZON
 * =============================================
 */

function Horizon() {
    return (
        <mesh position={[0, -2.36, -25]}>
            <planeGeometry args={[65, 0.012]} />

            <meshBasicMaterial
                color="#372626"
                transparent
                opacity={0.3}
                depthWrite={false}
            />
        </mesh>
    );
}

/*
 * =============================================
 * BACKGROUND PARTICLES
 * =============================================
 */

function Dust() {
    const positions = useMemo(() => {
        const count = 400;
        const output = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            output[i * 3] = (Math.random() - 0.5) * 30;
            output[i * 3 + 1] = Math.random() * 9 - 1;
            output[i * 3 + 2] = -Math.random() * 30 - 1;
        }

        return output;
    }, []);

    return (
        <points>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    args={[positions, 3]}
                />
            </bufferGeometry>

            <pointsMaterial
                size={0.014}
                color="#ffffff"
                transparent
                opacity={0.2}
                depthWrite={false}
                sizeAttenuation
            />
        </points>
    );
}

/*
 * =============================================
 * CAMERA MOTION
 * =============================================
 */

interface CameraMotionProps {
    scrollRef: MutableRefObject<ScrollState>;
}

function CameraMotion({ scrollRef }: CameraMotionProps) {
    const { camera } = useThree();

    useFrame((_, delta) => {
        const velocity = THREE.MathUtils.clamp(
            scrollRef.current.velocity / 5000,
            -1,
            1,
        );

        camera.position.x = THREE.MathUtils.damp(
            camera.position.x,
            velocity * 0.045,
            4,
            delta,
        );

        camera.rotation.z = THREE.MathUtils.damp(
            camera.rotation.z,
            velocity * -0.004,
            4,
            delta,
        );
    });

    return null;
}

/*
 * =============================================
 * MAIN SCENE
 * =============================================
 */

export default function CurvedProjectsScene({
    projects,
    cardRefs,
    uiRefs,
    trackRef,
    rectsRef,
    scrollRef,
    hoverRef,
    rippleRef,
    counterElemRef,
    dotNavRef,
    dragHintRef,
    progressBarRef,
}: CurvedProjectsSceneProps) {
    return (
        <>
            <DomTrackDriver
                cardRefs={cardRefs}
                uiRefs={uiRefs}
                trackRef={trackRef}
                rectsRef={rectsRef}
                scrollRef={scrollRef}
                projectCount={projects.length}
                counterElemRef={counterElemRef}
                dotNavRef={dotNavRef}
                dragHintRef={dragHintRef}
                progressBarRef={progressBarRef}
            />

            <CameraMotion scrollRef={scrollRef} />

            <Dust />

            <PerspectiveGrid />

            <Horizon />

            {projects.map((project, index) => (
                <MirroredCard
                    key={`${project.href}-${index}`}
                    project={project}
                    index={index}
                    rectsRef={rectsRef}
                    scrollRef={scrollRef}
                    hoverRef={hoverRef}
                    rippleRef={rippleRef}
                />
            ))}
        </>
    );
}
