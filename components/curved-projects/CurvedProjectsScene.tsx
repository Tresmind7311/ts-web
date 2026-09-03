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

interface CardMetric {
    offsetLeft: number;
    width: number;
    height: number;
}

interface TrackMetrics {
    step: number;
    top: number;
    cards: CardMetric[];
}

interface DomTrackDriverProps {
    cardRefs: MutableRefObject<(HTMLAnchorElement | null)[]>;
    trackRef: MutableRefObject<HTMLDivElement | null>;
    rectsRef: MutableRefObject<RectSnapshot[]>;
    scrollRef: MutableRefObject<ScrollState>;
    projectCount: number;
}

/*
 * Cards now move linearly through the rendered head/tail buffers.
 *
 * No shortest-path wrapping here.
 * That old cyclic wrap was the reason side cards could appear stuck,
 * jump to the opposite side, or skip becoming the centre card.
 */
function DomTrackDriver({
    cardRefs,
    trackRef,
    rectsRef,
    scrollRef,
    projectCount,
}: DomTrackDriverProps) {
    const { size } = useThree();

    const metricsRef = useRef<TrackMetrics>({
        step: 0,
        top: 0,
        cards: [],
    });

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
            top: track.offsetTop,
            cards: cards.map((card) => ({
                offsetLeft: card?.offsetLeft ?? 0,
                width: card?.offsetWidth ?? 0,
                height: card?.offsetHeight ?? 0,
            })),
        };
    }, [cardRefs, trackRef]);

    useEffect(() => {
        const frameId =
            window.requestAnimationFrame(cacheMetrics);

        window.addEventListener(
            'resize',
            cacheMetrics,
            { passive: true },
        );

        ScrollTrigger.addEventListener(
            'refresh',
            cacheMetrics,
        );

        return () => {
            window.cancelAnimationFrame(frameId);

            window.removeEventListener(
                'resize',
                cacheMetrics,
            );

            ScrollTrigger.removeEventListener(
                'refresh',
                cacheMetrics,
            );
        };
    }, [cacheMetrics]);

    useFrame(() => {
        const track = trackRef.current;
        const { step, top, cards } = metricsRef.current;

        if (
            !track
            || projectCount === 0
            || step === 0
            || size.width <= 0
            || size.height <= 0
        ) {
            return;
        }

        /*
         * Keep WebGL movement locked 1:1 to ScrollTrigger progress.
         * No damping here; damping allowed the pinned section to finish
         * before all cards physically reached the centre.
         */
        scrollRef.current.current =
            scrollRef.current.target;

        track.style.transform = 'none';

        const snapshots: RectSnapshot[] = [];

        for (
            let index = 0;
            index < cards.length;
            index++
        ) {
            const metric = cards[index];
            const cardElement =
                cardRefs.current[index];

            if (
                !metric
                || !cardElement
                || metric.width <= 0
            ) {
                continue;
            }

            /*
             * Linear sequence:
             * right side -> centre -> left side.
             *
             * Buffer duplication is handled by CurvedProjects.tsx,
             * so geometry itself never wraps or jumps.
             */
            const relativeIndex =
                index - scrollRef.current.current;

            const desiredLeft =
                size.width / 2
                - metric.width / 2
                + relativeIndex * step;

            const translateX =
                desiredLeft - metric.offsetLeft;

            cardElement.style.transform =
                `translate3d(${translateX}px, 0, 0)`;

            snapshots[index] = {
                left: desiredLeft,
                top,
                width: metric.width,
                height: metric.height,
            };
        }

        rectsRef.current = snapshots;
    }, -100);

    return null;
}

interface MirroredCardProps {
    project: Project;
    index: number;
    rectsRef: MutableRefObject<RectSnapshot[]>;
    scrollRef: MutableRefObject<ScrollState>;
    rippleRef: MutableRefObject<RippleState[]>;
    projectCount: number;
}

function MirroredCard({
    project,
    index,
    rectsRef,
    scrollRef,
    rippleRef,
    projectCount,
}: MirroredCardProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const rippleStrengthRef = useRef(0);

    const ripplePositionRef = useRef(
        new THREE.Vector2(0.5, 0.5),
    );

    const texture = useTexture(project.image);
    const { size, viewport, gl } = useThree();

    useEffect(() => {
        texture.colorSpace =
            THREE.SRGBColorSpace;

        texture.anisotropy = Math.min(
            8,
            gl.capabilities.getMaxAnisotropy(),
        );

        texture.minFilter =
            THREE.LinearMipmapLinearFilter;

        texture.magFilter =
            THREE.LinearFilter;

        texture.needsUpdate = true;
    }, [texture, gl]);

    const textureAspect = useMemo(() => {
        const image =
            texture.image as HTMLImageElement | undefined;

        if (
            !image?.naturalWidth
            || !image?.naturalHeight
        ) {
            return 1.64;
        }

        return (
            image.naturalWidth
            / image.naturalHeight
        );
    }, [texture]);

    const textureTexelSize = useMemo(() => {
        const image =
            texture.image as HTMLImageElement | undefined;

        if (
            !image?.naturalWidth
            || !image?.naturalHeight
        ) {
            return new THREE.Vector2(
                1 / 1024,
                1 / 1024,
            );
        }

        return new THREE.Vector2(
            1 / image.naturalWidth,
            1 / image.naturalHeight,
        );
    }, [texture]);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader: CARD_VERTEX_SHADER,
            fragmentShader: CARD_FRAGMENT_SHADER,

            uniforms: {
                uTexture: {
                    value: texture,
                },

                uTextureAspect: {
                    value: textureAspect,
                },

                uTexelSize: {
                    value: textureTexelSize,
                },

                uPlaneAspect: {
                    value: 1.64,
                },

                uViewportWidth: {
                    value: viewport.width,
                },

                uTime: {
                    value: 0,
                },

                uWaveOffset: {
                    value: index * 0.73,
                },

                uWaveStrength: {
                    value: 0,
                },

                uRipplePosition: {
                    value:
                        new THREE.Vector2(
                            0.5,
                            0.5,
                        ),
                },

                uRippleStrength: {
                    value: 0,
                },
            },

            side: THREE.DoubleSide,
            depthTest: true,
            depthWrite: true,
            transparent: false,
            toneMapped: false,
        });
    }, [
        texture,
        textureAspect,
        textureTexelSize,
        viewport.width,
        index,
    ]);

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

        const pixelToWorldX =
            viewport.width / size.width;

        const pixelToWorldY =
            viewport.height / size.height;

        const centerX =
            rect.left + rect.width / 2;

        const centerY =
            rect.top + rect.height / 2;

        const x =
            (centerX - size.width / 2)
            * pixelToWorldX;

        const y =
            -(centerY - size.height / 2)
            * pixelToWorldY;

        mesh.position.set(x, y, 0);

        mesh.scale.set(
            rect.width * pixelToWorldX,
            rect.height * pixelToWorldY,
            1,
        );

        const ripple =
            rippleRef.current[index];

        if (ripple) {
            ripplePositionRef.current.x =
                THREE.MathUtils.damp(
                    ripplePositionRef.current.x,
                    ripple.x,
                    14,
                    delta,
                );

            ripplePositionRef.current.y =
                THREE.MathUtils.damp(
                    ripplePositionRef.current.y,
                    ripple.y,
                    14,
                    delta,
                );

            rippleStrengthRef.current =
                THREE.MathUtils.damp(
                    rippleStrengthRef.current,
                    ripple.strength,
                    ripple.strength > 0
                        ? 9
                        : 4,
                    delta,
                );
        } else {
            rippleStrengthRef.current =
                THREE.MathUtils.damp(
                    rippleStrengthRef.current,
                    0,
                    4,
                    delta,
                );
        }

        /*
         * Flag wave belongs only to the card that is physically
         * closest to the centre.
         */
        const activeIndex =
            projectCount > 0
                ? THREE.MathUtils.clamp(
                    Math.round(
                        scrollRef.current.current,
                    ),
                    0,
                    projectCount - 1,
                )
                : 0;

        material.uniforms.uWaveStrength.value =
            index === activeIndex
                ? 1
                : 0;

        material.uniforms.uPlaneAspect.value =
            rect.width / rect.height;

        material.uniforms.uViewportWidth.value =
            viewport.width;

        material.uniforms.uTime.value =
            state.clock.elapsedTime;

        material.uniforms.uRipplePosition.value.copy(
            ripplePositionRef.current,
        );

        material.uniforms.uRippleStrength.value =
            rippleStrengthRef.current;
    });

    return (
        <mesh
            ref={meshRef}
            frustumCulled={false}
        >
            <planeGeometry
                args={[1, 1, 96, 48]}
            />

            <primitive
                object={material}
                attach="material"
            />
        </mesh>
    );
}

function PerspectiveGrid() {
    const geometry = useMemo(() => {
        const positions: number[] = [];

        const minX = -32;
        const maxX = 32;
        const frontZ = 6;
        const backZ = -52;
        const floorY = -2.58;

        for (
            let x = minX;
            x <= maxX;
            x += 1.35
        ) {
            positions.push(
                x,
                floorY,
                frontZ,
            );

            positions.push(
                x,
                floorY,
                backZ,
            );
        }

        for (
            let z = frontZ;
            z >= backZ;
            z -= 1.22
        ) {
            positions.push(
                minX,
                floorY,
                z,
            );

            positions.push(
                maxX,
                floorY,
                z,
            );
        }

        const buffer =
            new THREE.BufferGeometry();

        buffer.setAttribute(
            'position',
            new THREE.Float32BufferAttribute(
                positions,
                3,
            ),
        );

        return buffer;
    }, []);

    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            vertexShader:
                GRID_VERTEX_SHADER,

            fragmentShader:
                GRID_FRAGMENT_SHADER,

            uniforms: {
                uCurveStrength: {
                    value: 0.72,
                },
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

function Horizon() {
    return (
        <mesh
            position={[0, -2.53, -25]}
        >
            <planeGeometry
                args={[65, 0.012]}
            />

            <meshBasicMaterial
                color="#b8b8b8"
                transparent
                opacity={0.24}
                depthWrite={false}
            />
        </mesh>
    );
}

export default function CurvedProjectsScene({
    projects,
    cardRefs,
    trackRef,
    rectsRef,
    scrollRef,
    rippleRef,
}: CurvedProjectsSceneProps) {
    return (
        <>
            <PerspectiveGrid />
            <Horizon />

            <DomTrackDriver
                cardRefs={cardRefs}
                trackRef={trackRef}
                rectsRef={rectsRef}
                scrollRef={scrollRef}
                projectCount={projects.length}
            />

            {projects.map((project, index) => (
                <MirroredCard
                    key={`${project.href}-${index}`}
                    project={project}
                    index={index}
                    rectsRef={rectsRef}
                    scrollRef={scrollRef}
                    rippleRef={rippleRef}
                    projectCount={projects.length}
                />
            ))}
        </>
    );
}
