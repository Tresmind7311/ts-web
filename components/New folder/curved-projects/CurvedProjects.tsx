'use client';

import {
    Suspense,
    useLayoutEffect,
    useRef,
    type PointerEvent as ReactPointerEvent,
} from 'react';

import { Canvas } from '@react-three/fiber';

import gsap from 'gsap';

import { ScrollTrigger } from 'gsap/ScrollTrigger';

import * as THREE from 'three';

import CurvedProjectsScene from './CurvedProjectsScene';

import styles from './CurvedProjects.module.css';

import type {
    Project,
    RectSnapshot,
    RippleState,
    ScrollState,
} from './types';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

interface CurvedProjectsProps {
    projects: Project[];
    /** Override the "(work)" section label */
    sectionLabel?: string;
}

export default function CurvedProjects({
    projects,
    sectionLabel = '(work)',
}: CurvedProjectsProps) {
    const sectionRef = useRef<HTMLElement>(null);

    /* Card layout refs */
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const uiRefs = useRef<(HTMLDivElement | null)[]>([]);
    const rectsRef = useRef<RectSnapshot[]>([]);

    /* Scroll / interaction state */
    const hoverRef = useRef<number[]>(projects.map(() => 0));
    const rippleRef = useRef<RippleState[]>(
        projects.map(() => ({ x: 0.5, y: 0.5, strength: 0 })),
    );
    const scrollRef = useRef<ScrollState>({ target: 0, current: 0, velocity: 0 });

    /*
     * Imperative UI refs — updated directly from R3F useFrame,
     * zero React state updates during animation.
     */
    const counterElemRef = useRef<HTMLSpanElement>(null);
    const dotNavRef = useRef<HTMLDivElement>(null);
    const dragHintRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const sectionHeaderRef = useRef<HTMLDivElement>(null);

    /*
     * =========================================
     * SCROLLTRIGGER  +  SECTION REVEAL
     * =========================================
     */

    useLayoutEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        hoverRef.current = projects.map((_, i) => hoverRef.current[i] ?? 0);

        rippleRef.current = projects.map(
            (_, i) => rippleRef.current[i] ?? { x: 0.5, y: 0.5, strength: 0 },
        );

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        let refreshFrame = 0;

        const context = gsap.context(() => {
            /*
             * ── Carousel pin ─────────────────────────────
             * One card step ≈ 0.9 × viewport height of scroll.
             */
            ScrollTrigger.create({
                trigger: section,

                start: 'top top',

                end: () => {
                    const projectDistance =
                        window.innerHeight
                        * Math.max(projects.length - 1, 1)
                        * 0.9;

                    const minimumDistance = window.innerHeight * 3;

                    return `+=${Math.max(projectDistance, minimumDistance)}`;
                },

                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,

                onUpdate: (self) => {
                    scrollRef.current.target =
                        self.progress * Math.max(projects.length - 1, 0);

                    scrollRef.current.velocity = self.getVelocity();
                },

                onLeave: () => { scrollRef.current.velocity = 0; },
                onLeaveBack: () => { scrollRef.current.velocity = 0; },
            });

            /*
             * ── Section reveal ────────────────────────────
             * Initial states are hidden; animate in as the
             * section scrolls into view from below.
             */
            gsap.set(sectionHeaderRef.current, { opacity: 0, y: -10 });
            gsap.set(dotNavRef.current, { opacity: 0 });
            gsap.set(dragHintRef.current, { opacity: 0, y: 8 });
            gsap.set(progressBarRef.current?.parentElement ?? null, { opacity: 0 });

            const revealTl = gsap.timeline({ paused: true });

            revealTl
                .to(sectionHeaderRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                })
                .to(
                    progressBarRef.current?.parentElement ?? null,
                    { opacity: 1, duration: 0.6, ease: 'power2.out' },
                    0.1,
                )
                .to(
                    dotNavRef.current,
                    { opacity: 1, duration: 0.6, ease: 'power2.out' },
                    0.2,
                )
                .to(
                    dragHintRef.current,
                    { opacity: 1, y: 0, duration: 0.65, ease: 'power2.out' },
                    0.3,
                );

            ScrollTrigger.create({
                trigger: section,
                start: 'top 85%',
                onEnter: () => revealTl.play(),
                onLeaveBack: () => revealTl.reverse(),
            });
        }, section);

        refreshFrame = window.requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

        return () => {
            window.cancelAnimationFrame(refreshFrame);
            context.revert();
        };
    }, [projects.length]);

    /*
     * =========================================
     * RIPPLE POSITION
     * =========================================
     */

    const updateRippleFromPointer = (
        index: number,
        element: HTMLAnchorElement,
        clientX: number,
        clientY: number,
        strength: number,
    ) => {
        const rect = element.getBoundingClientRect();

        if (rect.width <= 0 || rect.height <= 0) {
            return;
        }

        const x = THREE.MathUtils.clamp(
            (clientX - rect.left) / rect.width,
            0,
            1,
        );

        /*
         * DOM Y: top = 0
         * WebGL UV: top = 1
         */
        const y = THREE.MathUtils.clamp(
            1 - (clientY - rect.top) / rect.height,
            0,
            1,
        );

        rippleRef.current[index] = { x, y, strength };
    };

    /*
     * =========================================
     * POINTER EVENTS
     * =========================================
     */

    const handlePointerEnter = (
        index: number,
        event: ReactPointerEvent<HTMLAnchorElement>,
    ) => {
        hoverRef.current[index] = 1;

        updateRippleFromPointer(
            index,
            event.currentTarget,
            event.clientX,
            event.clientY,
            1,
        );
    };

    const handlePointerMove = (
        index: number,
        event: ReactPointerEvent<HTMLAnchorElement>,
    ) => {
        updateRippleFromPointer(
            index,
            event.currentTarget,
            event.clientX,
            event.clientY,
            1,
        );
    };

    const handlePointerLeave = (index: number) => {
        hoverRef.current[index] = 0;

        const previous = rippleRef.current[index];

        rippleRef.current[index] = {
            x: previous?.x ?? 0.5,
            y: previous?.y ?? 0.5,
            strength: 0,
        };
    };

    const total = String(projects.length).padStart(2, '0');

    return (
        <section
            ref={sectionRef}
            className={styles.section}
            aria-label="Featured projects"
        >
            {/* ====================================
                SECTION HEADER
                (work) label  ·  01 / 08 counter
            ==================================== */}

            <div
                ref={sectionHeaderRef}
                className={styles.sectionHeader}
                aria-hidden="true"
            >
                <span className={styles.sectionLabel}>
                    {sectionLabel}
                </span>

                <span
                    ref={counterElemRef}
                    className={styles.sectionCounter}
                >
                    {/* Populated by DomTrackDriver */}
                    01 / {total}
                </span>
            </div>

            {/* ====================================
                REAL DOM LAYOUT

                Invisible cards define the responsive
                layout. WebGL mirrors their rects.
            ==================================== */}

            <div className={styles.domStage}>
                <div ref={trackRef} className={styles.domTrack}>
                    {projects.map((project, index) => (
                        <a
                            key={`${project.href}-${index}`}
                            ref={(el) => { cardRefs.current[index] = el; }}
                            href={project.href}
                            className={styles.domCard}
                            aria-label={`View ${project.title}`}
                            onPointerEnter={(e) => handlePointerEnter(index, e)}
                            onPointerMove={(e) => handlePointerMove(index, e)}
                            onPointerLeave={() => handlePointerLeave(index)}
                            onPointerCancel={() => handlePointerLeave(index)}
                        >
                            {/* Accessibility / reduced-motion fallback */}
                            <div className={styles.domMedia}>
                                <img
                                    src={project.image}
                                    alt=""
                                    draggable={false}
                                    loading={index <= 1 ? 'eager' : 'lazy'}
                                    decoding="async"
                                />
                            </div>

                            {/*
                             * Text overlay — crisp HTML rendered above WebGL.
                             * DomTrackDriver matches its transform to the card's
                             * perspective projection each frame.
                             */}
                            <div
                                ref={(el) => { uiRefs.current[index] = el; }}
                                className={styles.domUi}
                            >
                                {project.tag && (
                                    <span className={styles.projectTag}>
                                        {project.tag}
                                    </span>
                                )}

                                <span className={styles.projectTitle}>
                                    {project.title}
                                </span>

                                <span
                                    className={styles.projectArrow}
                                    aria-hidden="true"
                                >
                                    ↗
                                </span>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* ====================================
                WEBGL RENDERING
            ==================================== */}

            <div
                className={styles.canvasWrapper}
                aria-hidden="true"
            >
                <Canvas
                    dpr={[1, 1.5]}
                    camera={{
                        position: [0, 0, 8.5],
                        fov: 45,
                        near: 0.1,
                        far: 90,
                    }}
                    gl={{
                        antialias: true,
                        alpha: false,
                        powerPreference: 'high-performance',
                    }}
                    fallback={
                        <div className={styles.webglFallback}>
                            WebGL unavailable.
                        </div>
                    }
                >
                    <color attach="background" args={['#000000']} />

                    <fog attach="fog" args={['#000000', 14, 48]} />

                    <Suspense fallback={null}>
                        <CurvedProjectsScene
                            projects={projects}
                            cardRefs={cardRefs}
                            uiRefs={uiRefs}
                            trackRef={trackRef}
                            rectsRef={rectsRef}
                            scrollRef={scrollRef}
                            hoverRef={hoverRef}
                            rippleRef={rippleRef}
                            counterElemRef={counterElemRef}
                            dotNavRef={dotNavRef}
                            dragHintRef={dragHintRef}
                            progressBarRef={progressBarRef}
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* ====================================
                VIGNETTE
            ==================================== */}

            <div className={styles.vignette} aria-hidden="true" />

            {/* ====================================
                BOTTOM UI
            ==================================== */}

            {/* Drag / scroll hint — fades on first card change */}
            <div
                ref={dragHintRef}
                className={styles.dragHint}
                aria-hidden="true"
            >
                <div className={styles.dragHintLine} />
                <span className={styles.dragHintText}>drag</span>
                <div className={styles.dragHintLine} />
            </div>

            {/* Dot indicators (hidden when > 12 projects to avoid crowding) */}
            {projects.length <= 12 && (
                <div
                    ref={dotNavRef}
                    className={styles.dotNav}
                    aria-hidden="true"
                >
                    {projects.map((_, i) => (
                        <div
                            key={i}
                            className={styles.dot}
                            style={{
                                opacity: i === 0 ? 1 : 0.25,
                                transform: i === 0 ? 'scale(1.5)' : 'scale(1)',
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Scroll-progress bar along the bottom edge */}
            <div className={styles.progressTrack} aria-hidden="true">
                <div
                    ref={progressBarRef}
                    className={styles.progressBar}
                />
            </div>
        </section>
    );
}
