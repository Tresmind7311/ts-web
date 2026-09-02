'use client';


import {
    Suspense,
    useLayoutEffect,
    useRef,
    type PointerEvent as ReactPointerEvent,
} from 'react';

import {
    Canvas,
} from '@react-three/fiber';

import gsap from 'gsap';

import {
    ScrollTrigger,
} from 'gsap/ScrollTrigger';

import * as THREE from 'three';

import CurvedProjectsScene from './CurvedProjectsScene';

import styles from './CurvedProjects.module.css';

import type {
    Project,
    RectSnapshot,
    RippleState,
    ScrollState,
} from './types';

if (
    typeof window !==
    'undefined'
) {
    gsap.registerPlugin(
        ScrollTrigger,
    );
}

interface CurvedProjectsProps {
    projects: Project[];
}

export default function CurvedProjects({
    projects,
}: CurvedProjectsProps) {
    const sectionRef =
        useRef<HTMLElement>(
            null,
        );

    const trackRef =
        useRef<HTMLDivElement>(
            null,
        );

    const cardRefs =
        useRef<
            (
                | HTMLAnchorElement
                | null
            )[]
        >([]);

    const uiRefs =
        useRef<
            (
                | HTMLDivElement
                | null
            )[]
        >([]);

    const rectsRef =
        useRef<
            RectSnapshot[]
        >([]);

    const hoverRef =
        useRef<number[]>(
            projects.map(
                () => 0,
            ),
        );

    const rippleRef =
        useRef<
            RippleState[]
        >(
            projects.map(
                () => ({
                    x: 0.5,
                    y: 0.5,
                    strength: 0,
                }),
            ),
        );

    const scrollRef =
        useRef<ScrollState>({
            target: 0,
            current: 0,
            velocity: 0,
        });

    /*
     * =========================================
     * SCROLLTRIGGER
     * =========================================
     */

    useLayoutEffect(() => {
        const section =
            sectionRef.current;

        if (!section) {
            return;
        }

        hoverRef.current =
            projects.map(
                (
                    _,
                    index,
                ) =>
                    hoverRef.current[
                    index
                    ] ?? 0,
            );

        rippleRef.current =
            projects.map(
                (
                    _,
                    index,
                ) =>
                    rippleRef.current[
                    index
                    ] ?? {
                        x: 0.5,
                        y: 0.5,
                        strength: 0,
                    },
            );

        const reducedMotion =
            window.matchMedia(
                '(prefers-reduced-motion: reduce)',
            );

        /*
         * Reduced motion version uses
         * normal horizontal DOM gallery.
         */
        if (
            reducedMotion.matches
        ) {
            return;
        }

        let refreshFrame =
            0;

        const context =
            gsap.context(
                () => {
                    ScrollTrigger.create(
                        {
                            trigger:
                                section,

                            start:
                                'top top',

                            end: () => {
                                const projectDistance =
                                    window.innerHeight *
                                    Math.max(
                                        projects.length -
                                        1,
                                        1,
                                    ) *
                                    0.9;

                                const minimumDistance =
                                    window.innerHeight *
                                    3;

                                return `+=${Math.max(
                                    projectDistance,
                                    minimumDistance,
                                )}`;
                            },

                            pin: true,

                            pinSpacing:
                                true,

                            anticipatePin:
                                1,

                            invalidateOnRefresh:
                                true,

                            onUpdate:
                                (self) => {
                                    scrollRef.current.target =
                                        self.progress *
                                        Math.max(
                                            projects.length -
                                            1,
                                            0,
                                        );

                                    scrollRef.current.velocity =
                                        self.getVelocity();
                                },

                            onLeave:
                                () => {
                                    scrollRef.current.velocity =
                                        0;
                                },

                            onLeaveBack:
                                () => {
                                    scrollRef.current.velocity =
                                        0;
                                },
                        },
                    );
                },

                section,
            );

        refreshFrame =
            window.requestAnimationFrame(
                () => {
                    ScrollTrigger.refresh();
                },
            );

        return () => {
            window.cancelAnimationFrame(
                refreshFrame,
            );

            context.revert();
        };
    }, [
        projects.length,
    ]);

    /*
     * =========================================
     * RIPPLE POSITION
     * =========================================
     */

    const updateRippleFromPointer =
        (
            index: number,

            element:
                HTMLAnchorElement,

            clientX: number,

            clientY: number,

            strength: number,
        ) => {
            const rect =
                element.getBoundingClientRect();

            if (
                rect.width <= 0 ||
                rect.height <= 0
            ) {
                return;
            }

            const x =
                THREE.MathUtils.clamp(
                    (
                        clientX -
                        rect.left
                    ) /
                    rect.width,

                    0,
                    1,
                );

            /*
             * DOM Y:
             * top = 0
             *
             * WebGL UV:
             * top = 1
             */
            const y =
                THREE.MathUtils.clamp(
                    1 -
                    (
                        clientY -
                        rect.top
                    ) /
                    rect.height,

                    0,
                    1,
                );

            rippleRef.current[
                index
            ] = {
                x,
                y,
                strength,
            };
        };

    /*
     * =========================================
     * POINTER EVENTS
     * =========================================
     */

    const handlePointerEnter =
        (
            index: number,

            event:
                ReactPointerEvent<HTMLAnchorElement>,
        ) => {
            hoverRef.current[
                index
            ] = 1;

            updateRippleFromPointer(
                index,

                event.currentTarget,

                event.clientX,

                event.clientY,

                1,
            );
        };

    const handlePointerMove =
        (
            index: number,

            event:
                ReactPointerEvent<HTMLAnchorElement>,
        ) => {
            updateRippleFromPointer(
                index,

                event.currentTarget,

                event.clientX,

                event.clientY,

                1,
            );
        };

    const handlePointerLeave =
        (
            index: number,
        ) => {
            hoverRef.current[
                index
            ] = 0;

            const previous =
                rippleRef.current[
                index
                ];

            rippleRef.current[
                index
            ] = {
                x:
                    previous?.x ??
                    0.5,

                y:
                    previous?.y ??
                    0.5,

                strength: 0,
            };
        };

    return (
        <section
            ref={sectionRef}
            className={
                styles.section
            }
            aria-label="Featured projects"
        >
            {/* ====================================
          REAL DOM LAYOUT

          Invisible images define exact
          responsive browser layout.

          WebGL mirrors these rectangles.
      ==================================== */}

            <div
                className={
                    styles.domStage
                }
            >
                <div
                    ref={trackRef}
                    className={
                        styles.domTrack
                    }
                >
                    {projects.map(
                        (
                            project,
                            index,
                        ) => (
                            <a
                                key={`${project.href}-${index}`}
                                ref={(
                                    element,
                                ) => {
                                    cardRefs.current[
                                        index
                                    ] =
                                        element;
                                }}
                                href={
                                    project.href
                                }
                                className={
                                    styles.domCard
                                }
                                aria-label={`View ${project.title}`}
                                onPointerEnter={(
                                    event,
                                ) =>
                                    handlePointerEnter(
                                        index,
                                        event,
                                    )
                                }
                                onPointerMove={(
                                    event,
                                ) =>
                                    handlePointerMove(
                                        index,
                                        event,
                                    )
                                }
                                onPointerLeave={() =>
                                    handlePointerLeave(
                                        index,
                                    )
                                }
                                onPointerCancel={() =>
                                    handlePointerLeave(
                                        index,
                                    )
                                }
                            >
                                <div
                                    className={
                                        styles.domMedia
                                    }
                                >
                                    <img
                                        src={project.image}
                                        alt=""
                                        draggable={false}
                                        loading={index <= 1 ? 'eager' : 'lazy'}
                                        decoding="async"
                                    />
                                </div>

                                {/*
                 * Keep UI as HTML.
                 *
                 * More precise text rendering,
                 * accessible links and no
                 * Three.js font dependency.
                 */}

                                <div
                                    ref={(
                                        element,
                                    ) => {
                                        uiRefs.current[
                                            index
                                        ] =
                                            element;
                                    }}
                                    className={
                                        styles.domUi
                                    }
                                >
                                    <span
                                        className={
                                            styles.projectTitle
                                        }
                                    >
                                        {
                                            project.title
                                        }
                                    </span>

                                    <span
                                        className={
                                            styles.projectArrow
                                        }
                                        aria-hidden="true"
                                    >
                                        ↗
                                    </span>
                                </div>
                            </a>
                        ),
                    )}
                </div>
            </div>

            {/* ====================================
          WEBGL RENDERING
      ==================================== */}

            <div
                className={
                    styles.canvasWrapper
                }
                aria-hidden="true"
            >
                <Canvas
                    dpr={[
                        1,
                        1.5,
                    ]}
                    camera={{
                        position: [
                            0,
                            0,
                            8.5,
                        ],

                        fov: 45,

                        near:
                            0.1,

                        far:
                            90,
                    }}
                    gl={{
                        antialias:
                            true,

                        alpha:
                            false,

                        powerPreference:
                            'high-performance',
                    }}
                    fallback={
                        <div
                            className={
                                styles.webglFallback
                            }
                        >
                            WebGL unavailable.
                        </div>
                    }
                >
                    <color
                        attach="background"
                        args={[
                            '#000000',
                        ]}
                    />

                    <fog
                        attach="fog"
                        args={[
                            '#000000',
                            14,
                            48,
                        ]}
                    />

                    <Suspense
                        fallback={
                            null
                        }
                    >
                        <CurvedProjectsScene
                            projects={
                                projects
                            }
                            cardRefs={
                                cardRefs
                            }
                            uiRefs={
                                uiRefs
                            }
                            trackRef={
                                trackRef
                            }
                            rectsRef={
                                rectsRef
                            }
                            scrollRef={
                                scrollRef
                            }
                            hoverRef={
                                hoverRef
                            }
                            rippleRef={
                                rippleRef
                            }
                        />
                    </Suspense>
                </Canvas>
            </div>

            {/* ====================================
          SCREEN VIGNETTE
      ==================================== */}

            <div
                className={
                    styles.vignette
                }
                aria-hidden="true"
            />
        </section>
    );
}