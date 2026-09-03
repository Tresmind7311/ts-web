"use client";

import { Canvas } from "@react-three/fiber";
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

import DotGlobeScene from "./DotGlobeScene";
import styles from "./DotGlobe.module.css";

import type {
    DotPointer,
    EarthOrbitState,
} from "./types";

const SCROLL_DISTANCE_VH = 430;
const EARTH_PRELOAD_PROGRESS = 0.72;
const EARTH_INTERACTION_PROGRESS = 0.90;

export default function DotGlobeSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const progressRef = useRef(0);

    const earthEnabledRef = useRef(false);
    const [earthEnabled, setEarthEnabled] = useState(false);

    const pointerRef = useRef<DotPointer>({
        x: 0,
        y: 0,
        active: 0,
    });

    const orbitRef = useRef<EarthOrbitState>({
        targetX: 0,
        targetY: 0,
        dragging: false,
    });

    const dragPointerIdRef = useRef<number | null>(null);
    const lastPointerRef = useRef({
        x: 0,
        y: 0,
    });

    const enableEarth = useCallback(() => {
        if (earthEnabledRef.current) {
            return;
        }

        earthEnabledRef.current = true;
        setEarthEnabled(true);
    }, []);

    const syncEarthLoading = useCallback(
        (progress: number) => {
            if (progress >= EARTH_PRELOAD_PROGRESS) {
                enableEarth();
            }
        },
        [enableEarth],
    );

    const syncInteractionCursor = useCallback((progress: number) => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        if (progress >= EARTH_INTERACTION_PROGRESS) {
            section.style.cursor = orbitRef.current.dragging
                ? "grabbing"
                : "grab";
        } else {
            section.style.cursor = "default";
        }
    }, []);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (reducedMotion) {
            progressRef.current = 1;
            pointerRef.current.active = 0;
            enableEarth();
            syncInteractionCursor(1);
            return;
        }

        let context: ReturnType<typeof gsap.context>;

        const raf = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                context = gsap.context(() => {
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top top",

                        end: `+=${SCROLL_DISTANCE_VH}vh`,

                        pin: true,
                        pinSpacing: true,
                        // anticipatePin: 1,
                        invalidateOnRefresh: true,
                        refreshPriority: -1,

                        onUpdate(self) {
                            progressRef.current = self.progress;
                            syncEarthLoading(self.progress);
                            syncInteractionCursor(self.progress);

                            if (self.progress < 0.82 && !orbitRef.current.dragging) {
                                orbitRef.current.targetX = 0;
                                orbitRef.current.targetY = 0;
                            }
                        },

                        onEnter() {
                            progressRef.current = 0;
                            syncInteractionCursor(0);
                        },

                        onLeave() {
                            progressRef.current = 1;
                            enableEarth();
                            syncInteractionCursor(1);
                        },

                        onEnterBack(self) {
                            progressRef.current = self.progress;
                            syncEarthLoading(self.progress);
                            syncInteractionCursor(self.progress);
                        },

                        onLeaveBack() {
                            progressRef.current = 0;
                            orbitRef.current.dragging = false;
                            orbitRef.current.targetX = 0;
                            orbitRef.current.targetY = 0;
                            dragPointerIdRef.current = null;
                            syncInteractionCursor(0);
                        },
                    });
                }, section);
            });
        });

        return () => {
            cancelAnimationFrame(raf);
            context?.revert();
        };
    }, [
        enableEarth,
        syncEarthLoading,
        syncInteractionCursor,
    ]);

    const handlePointerDown = useCallback(
        (event: React.PointerEvent<HTMLElement>) => {
            if (progressRef.current < EARTH_INTERACTION_PROGRESS) {
                return;
            }

            orbitRef.current.dragging = true;
            dragPointerIdRef.current = event.pointerId;

            lastPointerRef.current.x = event.clientX;
            lastPointerRef.current.y = event.clientY;

            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.style.cursor = "grabbing";

            pointerRef.current.active = 0;
        },
        [],
    );

    const handlePointerMove = useCallback(
        (event: React.PointerEvent<HTMLElement>) => {
            if (
                orbitRef.current.dragging &&
                dragPointerIdRef.current === event.pointerId
            ) {
                const deltaX = event.clientX - lastPointerRef.current.x;
                const deltaY = event.clientY - lastPointerRef.current.y;

                lastPointerRef.current.x = event.clientX;
                lastPointerRef.current.y = event.clientY;

                orbitRef.current.targetY += deltaX * 0.006;
                orbitRef.current.targetX += deltaY * 0.006;

                orbitRef.current.targetX = Math.max(
                    -1.15,
                    Math.min(1.15, orbitRef.current.targetX),
                );

                return;
            }

            const normalizedX =
                (event.clientX / window.innerWidth) * 2 - 1;

            const normalizedY =
                1 - (event.clientY / window.innerHeight) * 2;

            pointerRef.current.x = normalizedX;
            pointerRef.current.y = normalizedY;

            pointerRef.current.active =
                progressRef.current < EARTH_INTERACTION_PROGRESS
                    ? 1
                    : 0;
        },
        [],
    );

    const stopDragging = useCallback(
        (event: React.PointerEvent<HTMLElement>) => {
            if (
                dragPointerIdRef.current !== null &&
                dragPointerIdRef.current === event.pointerId
            ) {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                    event.currentTarget.releasePointerCapture(event.pointerId);
                }

                dragPointerIdRef.current = null;
            }

            orbitRef.current.dragging = false;

            event.currentTarget.style.cursor =
                progressRef.current >= EARTH_INTERACTION_PROGRESS
                    ? "grab"
                    : "default";
        },
        [],
    );

    const handlePointerLeave = useCallback(() => {
        if (!orbitRef.current.dragging) {
            pointerRef.current.active = 0;
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className={styles.section}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
            onPointerLeave={handlePointerLeave}
        >
            <div
                className={styles.canvasWrapper}
                aria-hidden="true"
            >
                <Canvas
                    className={styles.canvas}
                    camera={{
                        position: [0, 0, 10],
                        fov: 45,
                        near: 0.1,
                        far: 50,
                    }}
                    dpr={[1, 1.5]}
                    gl={{
                        antialias: true,
                        alpha: true,
                        powerPreference: "high-performance",
                    }}
                >
                    <DotGlobeScene
                        progressRef={progressRef}
                        pointerRef={pointerRef}
                        orbitRef={orbitRef}
                        earthEnabled={earthEnabled}
                    />
                </Canvas>
            </div>

            <div
                className={styles.softVignette}
                aria-hidden="true"
            />
        </section>
    );
}
