"use client";

import {
    Suspense,
    useCallback,
    useMemo,
    useRef,
    useState,
} from "react";
import {
    useFrame,
    useThree,
} from "@react-three/fiber";
import * as THREE from "three";

import EarthModel from "./EarthModel";

import {
    DOT_FRAGMENT_SHADER,
    DOT_VERTEX_SHADER,
} from "./shaders";

import {
    createGlobeGridSegments,
    createPointAttributes,
    createRouteSegments,
    smoothstep,
} from "./utils";

import type {
    DotGlobeSceneProps,
    GlobeRoute,
} from "./types";

const ROUTES: GlobeRoute[] = [
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 41.9028,
        endLng: 12.4964,
    },
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 40.4168,
        endLng: -3.7038,
    },
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 37.9838,
        endLng: 23.7275,
    },
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 51.5072,
        endLng: -0.1276,
    },
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 52.52,
        endLng: 13.405,
    },
    {
        startLat: 41.3275,
        startLng: 19.8187,
        endLat: 48.8566,
        endLng: 2.3522,
    },
];

export default function DotGlobeScene({
    progressRef,
    pointerRef,
    orbitRef,
    earthEnabled,
}: DotGlobeSceneProps) {
    const { viewport, size } = useThree();

    const pointsGroupRef = useRef<THREE.Group>(null);
    const globeGroupRef = useRef<THREE.Group>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const globeMaterialRef = useRef<THREE.LineBasicMaterial>(null);
    const routeMaterialRef = useRef<THREE.LineBasicMaterial>(null);

    const currentProgressRef = useRef(progressRef.current);
    const earthRevealRef = useRef(0);

    const [earthReady, setEarthReady] = useState(false);

    const currentPointerRef = useRef({
        x: 0,
        y: 0,
        active: 0,
    });

    const handleEarthReady = useCallback(() => {
        setEarthReady(true);
    }, []);

    const isMobile = size.width < 768;

    const pointCount = isMobile
        ? 2200
        : size.width < 1200
            ? 4200
            : 6500;

    const globeRadius = Math.min(
        viewport.height * (isMobile ? 0.32 : 0.37),
        isMobile ? 2.45 : 3.2,
    );

    // const finalOffsetX = isMobile
    //     ? 0
    //     : viewport.width * 0.185;

    const finalOffsetX = 0;

    const pointAttributes = useMemo(
        () =>
            createPointAttributes(
                pointCount,
                viewport.width * 1.18,
                viewport.height * 1.22,
                globeRadius,
            ),
        [
            pointCount,
            viewport.width,
            viewport.height,
            globeRadius,
        ],
    );

    const globeGrid = useMemo(
        () => createGlobeGridSegments(globeRadius * 1.006),
        [globeRadius],
    );

    const routeSegments = useMemo(
        () => createRouteSegments(ROUTES, globeRadius * 1.014),
        [globeRadius],
    );

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uProgress: { value: 0 },
            uPixelRatio: { value: 1 },
            uMouse: { value: new THREE.Vector2(0, 0) },

            uViewport: {
                value: new THREE.Vector2(
                    viewport.width,
                    viewport.height,
                ),
            },

            uPointerActive: { value: 0 },
            uLayerOpacity: { value: 1 },
        }),
        [
            viewport.width,
            viewport.height,
        ],
    );

    useFrame((state, delta) => {
        const material = materialRef.current;
        const pointsGroup = pointsGroupRef.current;
        const globeGroup = globeGroupRef.current;

        if (!material || !pointsGroup || !globeGroup) {
            return;
        }

        currentProgressRef.current = THREE.MathUtils.damp(
            currentProgressRef.current,
            progressRef.current,
            6.5,
            delta,
        );

        const progress = currentProgressRef.current;
        const targetPointer = pointerRef.current;
        const currentPointer = currentPointerRef.current;

        currentPointer.x = THREE.MathUtils.damp(
            currentPointer.x,
            targetPointer.x,
            7,
            delta,
        );

        currentPointer.y = THREE.MathUtils.damp(
            currentPointer.y,
            targetPointer.y,
            7,
            delta,
        );

        currentPointer.active = THREE.MathUtils.damp(
            currentPointer.active,
            targetPointer.active,
            10,
            delta,
        );

        material.uniforms.uTime.value = state.clock.elapsedTime;
        material.uniforms.uProgress.value = progress;

        material.uniforms.uPixelRatio.value = Math.min(
            window.devicePixelRatio,
            1.5,
        );

        material.uniforms.uMouse.value.set(
            currentPointer.x,
            currentPointer.y,
        );

        material.uniforms.uViewport.value.set(
            viewport.width,
            viewport.height,
        );

        material.uniforms.uPointerActive.value =
            currentPointer.active;

        const morph = smoothstep(
            0.22,
            0.68,
            progress,
        );

        const globeReveal = smoothstep(
            0.62,
            0.84,
            progress,
        );

        const routeReveal = smoothstep(
            0.76,
            0.92,
            progress,
        );

        const targetEarthReveal =
            earthEnabled && earthReady
                ? smoothstep(
                    0.88,
                    0.98,
                    progress,
                )
                : 0;

        earthRevealRef.current = THREE.MathUtils.damp(
            earthRevealRef.current,
            targetEarthReveal,
            7,
            delta,
        );

        const earthReveal = earthRevealRef.current;
        const syntheticOpacity = 1 - earthReveal;

        material.uniforms.uLayerOpacity.value =
            syntheticOpacity;

        const currentOffsetX =
            finalOffsetX * morph;

        pointsGroup.position.x =
            currentOffsetX;

        globeGroup.position.x =
            currentOffsetX;

        const baseRotationY = THREE.MathUtils.lerp(
            -0.68,
            0.22,
            progress,
        );

        /*
         * Synthetic particle globe keeps previous subtle
         * pointer movement. Real GLB does not follow mouse.
         */
        const pointerRotationY =
            currentPointer.x *
            0.11 *
            currentPointer.active;

        const pointerRotationX =
            -currentPointer.y *
            0.065 *
            currentPointer.active;

        const rotationY =
            (
                baseRotationY +
                pointerRotationY
            ) *
            morph;

        const rotationX =
            pointerRotationX *
            morph;

        pointsGroup.rotation.y =
            rotationY;

        pointsGroup.rotation.x =
            rotationX;

        globeGroup.rotation.y =
            rotationY;

        globeGroup.rotation.x =
            rotationX;

        if (globeMaterialRef.current) {
            globeMaterialRef.current.opacity =
                globeReveal *
                0.26 *
                syntheticOpacity;
        }

        if (routeMaterialRef.current) {
            routeMaterialRef.current.opacity =
                routeReveal *
                0.9 *
                syntheticOpacity;
        }

        const syntheticVisible =
            earthReveal < 0.999;

        pointsGroup.visible =
            syntheticVisible;

        globeGroup.visible =
            syntheticVisible;
    });

    return (
        <>
            <ambientLight
                intensity={1.35}
            />

            <directionalLight
                position={[4, 3, 6]}
                intensity={2.1}
            />

            <directionalLight
                position={[-4, -1, 2]}
                intensity={0.55}
            />

            <group ref={pointsGroupRef}>
                <points
                    frustumCulled={false}
                >
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[
                                pointAttributes.plane,
                                3,
                            ]}
                        />

                        <bufferAttribute
                            attach="attributes-aSphere"
                            args={[
                                pointAttributes.sphere,
                                3,
                            ]}
                        />

                        <bufferAttribute
                            attach="attributes-aSize"
                            args={[
                                pointAttributes.sizes,
                                1,
                            ]}
                        />

                        <bufferAttribute
                            attach="attributes-aSeed"
                            args={[
                                pointAttributes.seeds,
                                1,
                            ]}
                        />
                    </bufferGeometry>

                    <shaderMaterial
                        ref={materialRef}
                        uniforms={uniforms}
                        vertexShader={
                            DOT_VERTEX_SHADER
                        }
                        fragmentShader={
                            DOT_FRAGMENT_SHADER
                        }
                        transparent
                        depthWrite={false}
                        depthTest
                    />
                </points>
            </group>

            <group ref={globeGroupRef}>
                <lineSegments>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[
                                globeGrid,
                                3,
                            ]}
                        />
                    </bufferGeometry>

                    <lineBasicMaterial
                        ref={globeMaterialRef}
                        color="#315f5d"
                        transparent
                        opacity={0}
                        depthWrite={false}
                    />
                </lineSegments>

                <lineSegments>
                    <bufferGeometry>
                        <bufferAttribute
                            attach="attributes-position"
                            args={[
                                routeSegments,
                                3,
                            ]}
                        />
                    </bufferGeometry>

                    <lineBasicMaterial
                        ref={routeMaterialRef}
                        color="#66cbc5"
                        transparent
                        opacity={0}
                        depthWrite={false}
                    />
                </lineSegments>
            </group>

            {earthEnabled && (
                <Suspense fallback={null}>
                    <EarthModel
                        progressRef={
                            progressRef
                        }
                        orbitRef={
                            orbitRef
                        }
                        revealRef={
                            earthRevealRef
                        }
                        globeRadius={
                            globeRadius
                        }
                        finalOffsetX={
                            finalOffsetX
                        }
                        onReady={
                            handleEarthReady
                        }
                    />
                </Suspense>
            )}
        </>
    );
}
