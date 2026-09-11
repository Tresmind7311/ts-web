"use client";

import {
    useCallback,
    useEffect,
    useRef,
    type PointerEvent as ReactPointerEvent,
    type ReactNode,
    type CSSProperties,
} from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";

import DotGlobeReferenceCanvasRenderer, {
    type EarthLocation,
    type LabelBinding,
} from "./DotGlobeReferenceCanvas";
import styles from "./DotGlobeReference.module.css";
import { PrimaryButton } from "../common/Button";

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
    locationText?: string;
    /** Pass your existing button component here; no button import is assumed. */
    contactCta?: ReactNode;
    /** Map these to your project text tokens without changing global styles. */
    textColor?: string;
    mutedTextColor?: string;
}

export default function DotGlobeReferenceSection({
    phoneNumber = "+44 20 7946 0958",
    emailAddress = "contact@tresmind.com",
    locationText = "London, United Kingdom",
    contactCta,
    textColor,
    mutedTextColor,
}: DotGlobeReferenceSectionProps = {}) {
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rendererRef = useRef<DotGlobeReferenceCanvasRenderer | null>(null);
    const labelRefs = useRef<Record<string, HTMLDivElement | null>>({});

    const progressRef = useRef(0);
    const finalRef = useRef<HTMLDivElement>(null);
    const introRef = useRef<HTMLDivElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<Array<HTMLDivElement | null>>([]);

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

        const reveal = (element: HTMLElement | null, value: number, lift = 0) => {
            if (!element) return;
            const t = Math.max(0, Math.min(1, value));
            const eased = t * t * (3 - 2 * t);
            element.style.opacity = String(eased);
            element.style.visibility = eased > 0.001 ? "visible" : "hidden";
            element.style.transform = `translateY(${motionQuery.matches ? 0 : (1 - eased) * lift}px)`;
            // Hidden CTA/contact links must not be reachable by keyboard.
            element.toggleAttribute("inert", eased < 0.99);
        };
        const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        let previousContactProgress = -1;
        let previousReducedMotion = motionQuery.matches;
        const renderer = new DotGlobeReferenceCanvasRenderer({
            canvas,
            labels,
            onContactFrame(progress) {
                if (progress === previousContactProgress &&
                    previousReducedMotion === motionQuery.matches) return;
                previousContactProgress = progress;
                previousReducedMotion = motionQuery.matches;
                reveal(introRef.current, (progress - 0.12) / 0.35, 18);
                itemRefs.current.forEach((element, index) => {
                    reveal(element, (progress - 0.30 - index * 0.12) / 0.25, 8);
                });
                reveal(ctaRef.current, (progress - 0.76) / 0.24, 8);
            },
        });
        rendererRef.current = renderer;
        renderer.setVisible(false);

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
        const syncScroll = (sectionProgress: number) => {
            const distance = sectionProgress * SECTION_SCROLL_DISTANCE_VH;
            // Preserve the requested dot movement from the first scroll.
            const DOT_FLOW_END_PROGRESS = 0.22;
            const animationProgress = distance <= CONTACT_SCROLL_DISTANCE_VH
                ? DOT_FLOW_END_PROGRESS * Math.max(0, distance / CONTACT_SCROLL_DISTANCE_VH)
                : DOT_FLOW_END_PROGRESS + (1 - DOT_FLOW_END_PROGRESS) *
                Math.max(0, Math.min(
                    (distance - CONTACT_SCROLL_DISTANCE_VH) / ANIMATION_SCROLL_DISTANCE_VH,
                    1,
                ));
            // Intro: stagger in over 70vh, hold until 150vh, then fade out
            // before globe formation begins at 220vh. The center stays empty.
            renderer.setContactProgress(Math.max(0, Math.min(
                distance / 70,
                (CONTACT_SCROLL_DISTANCE_VH - distance) / 70,
                1,
            )));
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
                finalRef.current?.contains(event.target as Node) ||
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
            aria-label="Contact Tresmind"
            style={{
                "--contact-text": textColor,
                "--contact-muted": mutedTextColor,
            } as CSSProperties}
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
            <div ref={finalRef} className={styles.finalContact}>
                <div className={styles.finalLeft}>
                    <div ref={introRef} className={styles.finalReveal}>
                        <p className={styles.eyebrow}>LET&apos;S BUILD</p>
                        <h2 className={styles.finalHeading}>
                            What&apos;s Next Together.
                        </h2>
                        <p className={styles.finalDescription}>
                            Have a project in mind or simply want to say hello?
                            We&apos;re always open to discussing new ideas, products, and opportunities.
                        </p>
                    </div>
                        {/* <PrimaryButton>Get In Touch</PrimaryButton> */}
                    <div ref={ctaRef} className={`${styles.finalReveal} ${styles.finalCta}`}>
                        {contactCta ?? (
                            <PrimaryButton className={styles.ctaFallback} href={`mailto:${emailAddress}`}>
                                Get In Touch <span aria-hidden="true">↗</span>
                            </PrimaryButton>

                        )}
                    </div>
                </div>
                <div className={styles.finalRight}>
                    {[
                        { label: "Phone", value: phoneNumber, href: `tel:${phoneNumber.replace(/[^+\d]/g, "")}`, icon: "phone" },
                        { label: "Email", value: emailAddress, href: `mailto:${emailAddress}`, icon: "email" },
                        { label: "Location", value: locationText, href: undefined, icon: "location" },
                    ].map((item, index) => (
                        <div
                            key={item.label}
                            ref={(element) => { itemRefs.current[index] = element; }}
                            className={`${styles.finalReveal} ${styles.contactItem}`}
                        >
                            <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
                                strokeLinejoin="round" aria-hidden="true" focusable="false">
                                {item.icon === "phone" ? (
                                    <path d="M5 3h4l2 5-3 2c1.5 3 3 4.5 6 6l2-3 5 2v4a2 2 0 0 1-2 2C10 21 3 14 3 5a2 2 0 0 1 2-2Z" />
                                ) : item.icon === "email" ? (
                                    <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>
                                ) : (
                                    <><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></>
                                )}
                            </svg>
                            <div className={styles.contactItemText}>
                                <span className={styles.itemLabel}>{item.label}</span>
                                {item.href ? <a href={item.href}>{item.value}</a> : <span>{item.value}</span>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
