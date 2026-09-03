'use client';

import {
    Suspense,
    useEffect,
    useMemo,
    useRef,
    type PointerEvent as ReactPointerEvent,
} from 'react';

import { Canvas } from '@react-three/fiber';
import { gsap, ScrollTrigger } from '@/lib/gsap';

import CurvedProjectsScene from './CurvedProjectsScene';
import styles from './CurvedProjects.module.css';

import type {
    Project,
    RectSnapshot,
    RippleState,
    ScrollState,
} from './types';

interface CurvedProjectsProps {
    projects: Project[];
    /** Kept for API compatibility with previous component versions. */
    sectionLabel?: string;
}

/*
 * Two real loop cards are allowed to reach the centre after all originals.
 *
 * Extra look-ahead cards are rendered only so the right side of the gallery
 * stays populated while those two loop cards pass through the centre.
 */
const LEADING_BUFFER_COUNT = 2;
const LOOP_CENTER_COUNT = 2;
const LOOKAHEAD_BUFFER_COUNT = 2;
const SCROLL_PER_CARD_VH = 1.15;

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);

export default function CurvedProjects({
    projects,
}: CurvedProjectsProps) {
    const projectCount = projects.length;

    const leadingBufferCount =
        projectCount > 1
            ? Math.min(LEADING_BUFFER_COUNT, projectCount)
            : 0;

    const loopedProjects = useMemo(() => {
        if (projectCount <= 1) {
            return projects;
        }

        const leadingProjects = Array.from(
            { length: leadingBufferCount },
            (_, index) => {
                const sourceIndex =
                    projectCount - leadingBufferCount + index;

                return projects[sourceIndex];
            },
        );

        /*
         * Render 2 loop cards that will reach centre + 2 look-ahead cards
         * that never become centre. Look-ahead keeps side-card composition
         * intact at the end of the pinned sequence.
         */
        const trailingProjects = Array.from(
            {
                length:
                    LOOP_CENTER_COUNT
                    + LOOKAHEAD_BUFFER_COUNT,
            },
            (_, index) => projects[index % projectCount],
        );

        return [
            ...leadingProjects,
            ...projects,
            ...trailingProjects,
        ];
    }, [
        projects,
        projectCount,
        leadingBufferCount,
    ]);

    /*
     * Example with 5 projects:
     *
     * Rendered:
     * P4 P5 | P1 P2 P3 P4 P5 | P1 P2 | P3 P4
     *
     * Centre path:
     *           P1 P2 P3 P4 P5   P1 P2
     *
     * First 2 = left-side buffer.
     * Last 2 = right-side look-ahead only.
     */
    const startIndex = leadingBufferCount;

    const endIndex =
        projectCount > 1
            ? startIndex
                + projectCount
                + LOOP_CENTER_COUNT
                - 1
            : 0;

    const scrollSteps =
        Math.max(endIndex - startIndex, 0);

    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
    const rectsRef = useRef<RectSnapshot[]>([]);

    const rippleRef = useRef<RippleState[]>(
        loopedProjects.map(() => ({
            x: 0.5,
            y: 0.5,
            strength: 0,
        })),
    );

    const scrollRef = useRef<ScrollState>({
        target: startIndex,
        current: startIndex,
        velocity: 0,
    });

    useEffect(() => {
        const section = sectionRef.current;

        rippleRef.current = loopedProjects.map(
            (_, index) => rippleRef.current[index] ?? {
                x: 0.5,
                y: 0.5,
                strength: 0,
            },
        );

        cardRefs.current.length = loopedProjects.length;

        if (!section || projectCount === 0) {
            return;
        }

        scrollRef.current.target = startIndex;
        scrollRef.current.current = startIndex;
        scrollRef.current.velocity = 0;

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        let refreshFrameOne = 0;
        let refreshFrameTwo = 0;

        const context = gsap.context(() => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',

                end: () => {
                    const projectDistance =
                        window.innerHeight
                        * Math.max(scrollSteps, 1)
                        * SCROLL_PER_CARD_VH;

                    const minimumDistance =
                        window.innerHeight * 3;

                    return `+=${Math.max(
                        projectDistance,
                        minimumDistance,
                    )}`;
                },

                pin: true,
                pinSpacing: true,
                anticipatePin: 1,

                /*
                 * AnimationSection above = 30.
                 * CurvedProjects = 20.
                 * Testimonials below = 10.
                 *
                 * This guarantees refresh order follows document/pin order.
                 */
                refreshPriority: 20,
                invalidateOnRefresh: true,

                onUpdate: (self) => {
                    scrollRef.current.target =
                        startIndex
                        + self.progress * scrollSteps;

                    scrollRef.current.velocity =
                        self.getVelocity();
                },

                /*
                 * A refresh can happen after fonts/images/layout changes.
                 * Re-sync the carousel to ScrollTrigger's measured progress so
                 * the first frame never jumps at section entry or exit.
                 */
                onRefresh: (self) => {
                    const syncedIndex =
                        startIndex
                        + self.progress * scrollSteps;

                    scrollRef.current.target = syncedIndex;
                    scrollRef.current.current = syncedIndex;
                    scrollRef.current.velocity = 0;
                },

                onEnter: (self) => {
                    const syncedIndex =
                        startIndex
                        + self.progress * scrollSteps;

                    scrollRef.current.target = syncedIndex;
                    scrollRef.current.current = syncedIndex;
                },

                onEnterBack: (self) => {
                    const syncedIndex =
                        startIndex
                        + self.progress * scrollSteps;

                    scrollRef.current.target = syncedIndex;
                    scrollRef.current.current = syncedIndex;
                },

                onLeave: () => {
                    /*
                     * Force exact final loop card into centre before unpinning.
                     * Prevents R3F position from lagging behind ScrollTrigger.
                     */
                    scrollRef.current.target = endIndex;
                    scrollRef.current.current = endIndex;
                    scrollRef.current.velocity = 0;
                },

                onLeaveBack: () => {
                    scrollRef.current.target = startIndex;
                    scrollRef.current.current = startIndex;
                    scrollRef.current.velocity = 0;
                },
            });
        }, section);

        /*
         * Wait until sibling passive effects have mounted their ScrollTriggers,
         * then perform one ordered global refresh. Two rAFs avoids measuring
         * while React/MUI is still committing the neighbouring sections.
         */
        refreshFrameOne = window.requestAnimationFrame(() => {
            refreshFrameTwo = window.requestAnimationFrame(() => {
                ScrollTrigger.sort();
                ScrollTrigger.refresh();
            });
        });

        return () => {
            window.cancelAnimationFrame(refreshFrameOne);
            window.cancelAnimationFrame(refreshFrameTwo);
            context.revert();
        };
    }, [
        loopedProjects.length,
        projectCount,
        startIndex,
        endIndex,
        scrollSteps,
    ]);

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

        const x = clamp01(
            (clientX - rect.left) / rect.width,
        );

        /* DOM top = 0, WebGL UV top = 1. */
        const y = clamp01(
            1 - (clientY - rect.top) / rect.height,
        );

        rippleRef.current[index] = {
            x,
            y,
            strength,
        };
    };

    const handlePointerEnter = (
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
        const previous = rippleRef.current[index];

        rippleRef.current[index] = {
            x: previous?.x ?? 0.5,
            y: previous?.y ?? 0.5,
            strength: 0,
        };
    };

    return (
        <section
            ref={sectionRef}
            className={styles.section}
            aria-label="Featured projects"
        >
            {/*
             * Invisible DOM cards remain layout + interaction source.
             * R3F mirrors their live positions into WebGL.
             */}
            <div className={styles.domStage}>
                <div
                    ref={trackRef}
                    className={styles.domTrack}
                >
                    {loopedProjects.map((project, index) => (
                        <a
                            key={`${project.href}-${index}`}
                            ref={(element) => {
                                cardRefs.current[index] = element;
                            }}
                            href={project.href}
                            className={styles.domCard}
                            aria-label={`View ${project.title}`}
                            onPointerEnter={(event) => {
                                handlePointerEnter(index, event);
                            }}
                            onPointerMove={(event) => {
                                handlePointerMove(index, event);
                            }}
                            onPointerLeave={() => {
                                handlePointerLeave(index);
                            }}
                            onPointerCancel={() => {
                                handlePointerLeave(index);
                            }}
                        >
                            <div className={styles.domMedia}>
                                <img
                                    src={project.image}
                                    alt=""
                                    draggable={false}
                                    loading={
                                        Math.abs(index - startIndex) <= 2
                                            ? 'eager'
                                            : 'lazy'
                                    }
                                    decoding="async"
                                />
                            </div>
                        </a>
                    ))}
                </div>
            </div>

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
                    fallback={(
                        <div className={styles.webglFallback}>
                            WebGL unavailable.
                        </div>
                    )}
                >
                    <color
                        attach="background"
                        args={['#ffffff']}
                    />

                    <Suspense fallback={null}>
                        <CurvedProjectsScene
                            projects={loopedProjects}
                            cardRefs={cardRefs}
                            trackRef={trackRef}
                            rectsRef={rectsRef}
                            scrollRef={scrollRef}
                            rippleRef={rippleRef}
                        />
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
}
