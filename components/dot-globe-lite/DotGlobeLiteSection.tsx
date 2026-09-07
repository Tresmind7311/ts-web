"use client";

import {
    useCallback,
    useEffect,
    useRef,
    type PointerEvent as ReactPointerEvent,
} from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

import DotGlobeCanvasRenderer from "./DotGlobeCanvas";
import styles from "./DotGlobeLite.module.css";

import type {
    EarthLocation,
    LabelBinding,
} from "./types";

const ANIMATION_SCROLL_DISTANCE_VH = 430;
const SECTION_SCROLL_DISTANCE_VH = 500;
const EARTH_INTERACTION_PROGRESS = 0.90;

const LOCATIONS: EarthLocation[] = [
    {
        id: "uk",
        title: "United Kingdom",
        lines: [
            "London",
            "Borton str. 88",
            "+44 20 7946 0958",
        ],
        lat: 51.5074,
        lng: -0.1278,
        side: "left",
    },
    {
        id: "usa",
        title: "USA",
        lines: [
            "Los Angeles",
            "Beverly Hills 05a",
            "+1 213-555-0173",
        ],
        lat: 34.0522,
        lng: -118.2437,
        side: "right",
    },
];

export default function DotGlobeLiteSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<DotGlobeCanvasRenderer | null>(null);
    const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const progressRef = useRef(0);
    const reducedMotionRef = useRef(false);

    const orbitRef = useRef({
        targetYaw: 0,
        targetPitch: 0,
        dragging: false,
    });

    const dragPointerIdRef = useRef<number | null>(null);
    const lastPointerRef = useRef({
        x: 0,
        y: 0,
    });

    const syncInteractionCursor = useCallback((progress: number) => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        if (
            !reducedMotionRef.current &&
            progress >= EARTH_INTERACTION_PROGRESS
        ) {
            section.style.cursor = orbitRef.current.dragging
                ? "grabbing"
                : "grab";
        } else {
            section.style.cursor = "default";
        }
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;

        if (!section || !canvas) {
            return;
        }

        const labels: LabelBinding[] = LOCATIONS.flatMap((location) => {
            const element = labelRefs.current[location.id];

            return element
                ? [{ location, element }]
                : [];
        });

        const renderer = new DotGlobeCanvasRenderer({
            canvas,
            labels,
        });
        rendererRef.current = renderer;
        renderer.setVisible(false);

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        reducedMotionRef.current = reducedMotion;
        renderer.setReducedMotion(reducedMotion);

        const resize = () => {
            const rect = section.getBoundingClientRect();
            renderer.resize(rect.width, rect.height);
        };

        let resizeFrame = 0;
        const resizeObserver = new ResizeObserver(() => {
            window.cancelAnimationFrame(resizeFrame);
            resizeFrame = window.requestAnimationFrame(resize);
        });
        resizeObserver.observe(section);
        resize();

        const intersectionObserver = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                renderer.setVisible(
                    Boolean(entry?.isIntersecting),
                );
            },
            {
                root: null,
                rootMargin: "120px 0px 120px 0px",
                threshold: 0,
            },
        );
        intersectionObserver.observe(section);

        if (reducedMotion) {
            progressRef.current = 1;
            renderer.setReducedMotion(true);
            renderer.setProgress(1);
            renderer.setPointer(0, 0, 0);
            renderer.setOrbit(0, 0, false);
            syncInteractionCursor(1);

            return () => {
                window.cancelAnimationFrame(resizeFrame);
                resizeObserver.disconnect();
                intersectionObserver.disconnect();
                renderer.destroy();
                rendererRef.current = null;
            };
        }

        let context: ReturnType<typeof gsap.context> | undefined;
        let rafOne = 0;
        let rafTwo = 0;

        rafOne = window.requestAnimationFrame(() => {
            rafTwo = window.requestAnimationFrame(() => {
                context = gsap.context(() => {
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top top",
                        end: `+=${SECTION_SCROLL_DISTANCE_VH}vh`,
                        pin: true,
                        pinSpacing: true,
                        invalidateOnRefresh: true,
                        refreshPriority: -1,

                        onUpdate(self) {
                            const animationProgress = Math.min(
                                self.progress *
                                    (SECTION_SCROLL_DISTANCE_VH /
                                        ANIMATION_SCROLL_DISTANCE_VH),
                                1,
                            );

                            progressRef.current = animationProgress;
                            renderer.setProgress(animationProgress);
                            syncInteractionCursor(animationProgress);

                            if (
                                animationProgress < 0.82 &&
                                !orbitRef.current.dragging
                            ) {
                                orbitRef.current.targetYaw = 0;
                                orbitRef.current.targetPitch = 0;
                                renderer.setOrbit(0, 0, false);
                            }
                        },

                        onRefresh(self) {
                            const animationProgress = Math.min(
                                self.progress *
                                    (SECTION_SCROLL_DISTANCE_VH /
                                        ANIMATION_SCROLL_DISTANCE_VH),
                                1,
                            );

                            progressRef.current = animationProgress;
                            renderer.setProgress(animationProgress);
                            syncInteractionCursor(animationProgress);
                        },

                        onEnter() {
                            progressRef.current = 0;
                            renderer.setProgress(0);
                            syncInteractionCursor(0);
                        },

                        onLeave() {
                            progressRef.current = 1;
                            renderer.setProgress(1);
                            syncInteractionCursor(1);
                        },

                        onEnterBack(self) {
                            const animationProgress = Math.min(
                                self.progress *
                                    (SECTION_SCROLL_DISTANCE_VH /
                                        ANIMATION_SCROLL_DISTANCE_VH),
                                1,
                            );

                            progressRef.current = animationProgress;
                            renderer.setProgress(animationProgress);
                            syncInteractionCursor(animationProgress);
                        },

                        onLeaveBack() {
                            progressRef.current = 0;
                            orbitRef.current.dragging = false;
                            orbitRef.current.targetYaw = 0;
                            orbitRef.current.targetPitch = 0;
                            dragPointerIdRef.current = null;

                            renderer.setProgress(0);
                            renderer.setPointer(0, 0, 0);
                            renderer.setOrbit(0, 0, false);
                            syncInteractionCursor(0);
                        },
                    });
                }, section);
            });
        });

        return () => {
            window.cancelAnimationFrame(resizeFrame);
            window.cancelAnimationFrame(rafOne);
            window.cancelAnimationFrame(rafTwo);
            resizeObserver.disconnect();
            intersectionObserver.disconnect();
            context?.revert();
            renderer.destroy();
            rendererRef.current = null;
        };
    }, [syncInteractionCursor]);

    const handlePointerDown = useCallback(
        (event: ReactPointerEvent<HTMLElement>) => {
            if (
                reducedMotionRef.current ||
                progressRef.current < EARTH_INTERACTION_PROGRESS
            ) {
                return;
            }

            const renderer = rendererRef.current;
            if (!renderer) {
                return;
            }

            orbitRef.current.dragging = true;
            dragPointerIdRef.current = event.pointerId;

            lastPointerRef.current.x = event.clientX;
            lastPointerRef.current.y = event.clientY;

            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.style.cursor = "grabbing";

            renderer.setPointer(0, 0, 0);
            renderer.setOrbit(
                orbitRef.current.targetYaw,
                orbitRef.current.targetPitch,
                true,
            );
        },
        [],
    );

    const handlePointerMove = useCallback(
        (event: ReactPointerEvent<HTMLElement>) => {
            const renderer = rendererRef.current;
            const section = sectionRef.current;

            if (!renderer || !section) {
                return;
            }

            if (
                orbitRef.current.dragging &&
                dragPointerIdRef.current === event.pointerId
            ) {
                const deltaX =
                    event.clientX - lastPointerRef.current.x;
                const deltaY =
                    event.clientY - lastPointerRef.current.y;

                lastPointerRef.current.x = event.clientX;
                lastPointerRef.current.y = event.clientY;

                orbitRef.current.targetYaw += deltaX * 0.006;
                orbitRef.current.targetPitch = Math.max(
                    -0.35,
                    Math.min(
                        0.35,
                        orbitRef.current.targetPitch + deltaY * 0.003,
                    ),
                );

                renderer.setOrbit(
                    orbitRef.current.targetYaw,
                    orbitRef.current.targetPitch,
                    true,
                );
                return;
            }

            const rect = section.getBoundingClientRect();
            const normalizedX =
                ((event.clientX - rect.left) /
                    Math.max(rect.width, 1)) *
                    2 -
                1;
            const normalizedY =
                1 -
                ((event.clientY - rect.top) /
                    Math.max(rect.height, 1)) *
                    2;

            renderer.setPointer(
                normalizedX,
                normalizedY,
                progressRef.current < EARTH_INTERACTION_PROGRESS
                    ? 1
                    : 0,
            );
        },
        [],
    );

    const stopDragging = useCallback(
        (event: ReactPointerEvent<HTMLElement>) => {
            const renderer = rendererRef.current;

            if (
                dragPointerIdRef.current !== null &&
                dragPointerIdRef.current === event.pointerId
            ) {
                if (
                    event.currentTarget.hasPointerCapture(event.pointerId)
                ) {
                    event.currentTarget.releasePointerCapture(
                        event.pointerId,
                    );
                }

                dragPointerIdRef.current = null;
            }

            orbitRef.current.dragging = false;

            renderer?.setOrbit(
                orbitRef.current.targetYaw,
                orbitRef.current.targetPitch,
                false,
            );

            event.currentTarget.style.cursor =
                !reducedMotionRef.current &&
                progressRef.current >= EARTH_INTERACTION_PROGRESS
                    ? "grab"
                    : "default";
        },
        [],
    );

    const handlePointerLeave = useCallback(() => {
        if (!orbitRef.current.dragging) {
            rendererRef.current?.setPointer(0, 0, 0);
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
                <canvas
                    ref={canvasRef}
                    className={styles.canvas}
                />
            </div>

            <div
                className={styles.softVignette}
                aria-hidden="true"
            />

            <div className={styles.labelLayer}>
                {LOCATIONS.map((location) => (
                    <div
                        key={location.id}
                        ref={(element) => {
                            labelRefs.current[location.id] = element;
                        }}
                        className={styles.labelAnchor}
                    >
                        <div
                            className={[
                                styles.earthLabel,
                                location.side === "left"
                                    ? styles.earthLabelLeft
                                    : styles.earthLabelRight,
                            ].join(" ")}
                        >
                            <span
                                className={styles.earthLabelMarker}
                                aria-hidden="true"
                            />

                            <div className={styles.earthLabelContent}>
                                <strong>{location.title}</strong>

                                {location.lines.map((line) => (
                                    <span key={line}>{line}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
