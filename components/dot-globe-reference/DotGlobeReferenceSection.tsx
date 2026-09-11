"use client";

import {
    useCallback,
    useEffect,
    useRef,
    type PointerEvent as ReactPointerEvent,
} from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

import DotGlobeReferenceCanvasRenderer, {
    type EarthLocation,
    type LabelBinding,
} from "./DotGlobeReferenceCanvas";
import styles from "./DotGlobeReference.module.css";

// Contact intro, then the original globe timeline stretched from 430 to 650vh.
const CONTACT_SCROLL_DISTANCE_VH = 220;
const ANIMATION_SCROLL_DISTANCE_VH = 650;
const SECTION_SCROLL_DISTANCE_VH = 940;
const GLOBE_INTERACTION_PROGRESS = 0.90;

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

export interface DotGlobeReferenceSectionProps {
    phoneNumber?: string;
    emailAddress?: string;
}

export default function DotGlobeReferenceSection({
    phoneNumber = "+44 20 7946 0958",
    // Replace this placeholder with the site's contact email, or pass the prop.
    emailAddress = "contact@tresmind.com",
}: DotGlobeReferenceSectionProps = {}) {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<DotGlobeReferenceCanvasRenderer | null>(null);
    const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const phoneRef = useRef<HTMLDivElement>(null);
    const emailRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef(0);

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
            progress >= GLOBE_INTERACTION_PROGRESS
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

        const renderer = new DotGlobeReferenceCanvasRenderer({
            canvas,
            labels,
        });
        rendererRef.current = renderer;
        renderer.setVisible(false);

        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const updateMotionPreference = () => {
            renderer.setReducedMotion(motionQuery.matches);
        };
        updateMotionPreference();
        motionQuery.addEventListener("change", updateMotionPreference);

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
                renderer.setVisible(Boolean(entry?.isIntersecting));
            },
            {
                root: null,
                rootMargin: "120px 0px 120px 0px",
                threshold: 0,
            },
        );
        intersectionObserver.observe(section);

        // All states derive from scroll position, including reverse scroll and refresh.
        const fadeContact = (element: HTMLDivElement | null, distance: number, start: number) => {
            if (!element) return;
            const smooth = (value: number) => {
                const t = Math.max(0, Math.min(1, value));
                return t * t * (3 - 2 * t);
            };
            const opacity = smooth((distance - start) / 25) *
                (1 - smooth((distance - start - 60) / 25));
            element.style.opacity = String(opacity);
            element.style.visibility = opacity > 0.001 ? "visible" : "hidden";
        };
        const syncScroll = (sectionProgress: number) => {
            const distance = sectionProgress * SECTION_SCROLL_DISTANCE_VH;
            fadeContact(phoneRef.current, distance, 15);
            fadeContact(emailRef.current, distance, 120);
            // First 22% controls dot movement before globe morph begins.
            const DOT_FLOW_END_PROGRESS = 0.22;

            const animationProgress =
                distance <= CONTACT_SCROLL_DISTANCE_VH
                    ? DOT_FLOW_END_PROGRESS *
                    Math.max(0, Math.min(
                        distance / CONTACT_SCROLL_DISTANCE_VH,
                        1,
                    ))
                    : DOT_FLOW_END_PROGRESS +
                    (1 - DOT_FLOW_END_PROGRESS) *
                    Math.max(0, Math.min(
                        (distance - CONTACT_SCROLL_DISTANCE_VH) /
                        ANIMATION_SCROLL_DISTANCE_VH,
                        1,
                    ));
            progressRef.current = animationProgress;
            renderer.setProgress(animationProgress);
            syncInteractionCursor(animationProgress);
            if (animationProgress < 0.82 && !orbitRef.current.dragging) {
                orbitRef.current.targetYaw = 0;
                orbitRef.current.targetPitch = 0;
                renderer.setOrbit(0, 0, false);
            }
        };
        syncScroll(0);

        let context: ReturnType<typeof gsap.context> | undefined;
        let rafOne = 0;
        let rafTwo = 0;

        rafOne = window.requestAnimationFrame(() => {
            rafTwo = window.requestAnimationFrame(() => {
                context = gsap.context(() => {
                    ScrollTrigger.create({
                        trigger: section,
                        start: "top top",
                        end: () => `+=${section.clientHeight * SECTION_SCROLL_DISTANCE_VH / 100}`,
                        pin: true,
                        pinSpacing: true,
                        invalidateOnRefresh: true,
                        refreshPriority: -1,

                        onUpdate(self) { syncScroll(self.progress); },
                        onRefresh(self) { syncScroll(self.progress); },
                        onEnter(self) { syncScroll(self.progress); },
                        onLeave() { syncScroll(1); },
                        onEnterBack(self) { syncScroll(self.progress); },

                        onLeaveBack() {
                            syncScroll(0);
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
            motionQuery.removeEventListener("change", updateMotionPreference);
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
                progressRef.current < GLOBE_INTERACTION_PROGRESS
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

                orbitRef.current.targetYaw += deltaX * 0.0055;
                orbitRef.current.targetPitch = Math.max(
                    -0.72,
                    Math.min(
                        0.72,
                        orbitRef.current.targetPitch +
                        deltaY * 0.0038,
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
                progressRef.current < GLOBE_INTERACTION_PROGRESS
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
                progressRef.current >= GLOBE_INTERACTION_PROGRESS
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

            <div className={styles.contactLayer} aria-hidden="true">
                <div ref={phoneRef} className={styles.contactDetail}>
                    <span className={styles.contactLabel}>Phone</span>
                    <strong>{phoneNumber}</strong>
                </div>
                <div ref={emailRef} className={styles.contactDetail}>
                    <span className={styles.contactLabel}>Email</span>
                    <strong>{emailAddress}</strong>
                </div>
            </div>
            <div className={styles.srOnly}>
                <p>Phone: {phoneNumber}</p>
                <p>Email: {emailAddress}</p>
            </div>

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
                                styles.locationCard,
                                location.side === "left"
                                    ? styles.locationCardLeft
                                    : styles.locationCardRight,
                            ].join(" ")}
                        >
                            <span
                                className={styles.locationDot}
                                aria-hidden="true"
                            />

                            <div className={styles.locationContent}>
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
