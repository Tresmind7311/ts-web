'use client';

import { useEffect, useMemo, useRef } from 'react';
import { styled } from '@mui/material/styles';

import { gsap, ScrollTrigger } from '@/lib/gsap';

import CurvedProjectsCanvasRenderer from './CurvedProjectsCanvas';

export interface Project {
    title: string;
    image: string;
    href: string;
    tag?: string;
}

interface CurvedProjectsContinuousProps {
    projects: Project[];
    sectionLabel?: string;
}

const LEADING_BUFFER_COUNT = 2;
const LOOP_CENTER_COUNT = 2;
const LOOKAHEAD_BUFFER_COUNT = 2;
const SCROLL_PER_CARD_VH = 1.15;

const Section = styled('section')({
    position: 'relative',
    width: '100%',
    height: '100svh',
    overflow: 'hidden',
    background: '#fff',
    isolation: 'isolate',

    '@media (prefers-reduced-motion: reduce)': {
        height: 'auto',
        padding: '60px 0',
    },
});

const CanvasLayer = styled('canvas')({
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    display: 'block',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',

    '@media (prefers-reduced-motion: reduce)': {
        display: 'none',
    },
});

const DomStage = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    overflow: 'hidden',
    pointerEvents: 'none',

    '@media (prefers-reduced-motion: reduce)': {
        position: 'relative',
        overflowX: 'auto',
    },
});

const DomTrack = styled('div')({
    position: 'absolute',
    top: '17svh',
    left: 0,
    display: 'flex',
    gap: '8.75vw',
    width: 'max-content',
    pointerEvents: 'none',

    '@media (max-width: 1100px)': {
        top: '18svh',
        gap: '8vw',
    },

    '@media (max-width: 767px)': {
        top: '22svh',
        gap: '10vw',
    },

    '@media (prefers-reduced-motion: reduce)': {
        position: 'relative',
        top: 'auto',
        transform: 'none !important',
        paddingInline: '20px',
    },
});

const DomCard = styled('a')({
    position: 'relative',
    flex: '0 0 auto',
    width: 'clamp(460px, 52vw, 1020px)',
    aspectRatio: '1.64 / 1',
    display: 'block',
    color: 'inherit',
    textDecoration: 'none',
    pointerEvents: 'auto',
    willChange: 'transform',

    '&:focus-visible': {
        outline: 'none',
    },

    '&:focus-visible [data-dom-media="true"]': {
        opacity: 1,
    },

    '&:focus-visible::after': {
        content: '""',
        position: 'absolute',
        inset: '-4px',
        border: '2px solid #111',
        borderRadius: '24px',
    },

    '@media (max-width: 1100px)': {
        width: '64vw',
    },

    '@media (max-width: 767px)': {
        width: '82vw',
        aspectRatio: '1.38 / 1',
    },

    '@media (prefers-reduced-motion: reduce)': {
        transform: 'none !important',
    },
});

const DomMedia = styled('div')({
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    borderRadius: 'clamp(14px, 1.1vw, 22px)',
    opacity: 0,

    '& img': {
        display: 'block',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        userSelect: 'none',
        pointerEvents: 'none',
    },

    '@media (prefers-reduced-motion: reduce)': {
        opacity: 1,
    },
});

export default function CurvedProjectsContinuous({
    projects,
    sectionLabel = 'Featured projects',
}: CurvedProjectsContinuousProps) {
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
            (_, index) =>
                projects[projectCount - leadingBufferCount + index],
        );
        const trailingProjects = Array.from(
            { length: LOOP_CENTER_COUNT + LOOKAHEAD_BUFFER_COUNT },
            (_, index) => projects[index % projectCount],
        );

        return [...leadingProjects, ...projects, ...trailingProjects];
    }, [projects, projectCount, leadingBufferCount]);

    const startIndex = leadingBufferCount;
    const endIndex =
        projectCount > 1
            ? startIndex + projectCount + LOOP_CENTER_COUNT - 1
            : 0;
    const scrollSteps = Math.max(endIndex - startIndex, 0);
    const sectionRef = useRef<HTMLElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const canvas = canvasRef.current;
        const track = trackRef.current;
        cardRefs.current.length = loopedProjects.length;

        if (!section || !canvas || !track || projectCount === 0) {
            return;
        }

        if (
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        const renderer = new CurvedProjectsCanvasRenderer({
            canvas,
            track,
            cards: cardRefs.current,
            projects: loopedProjects,
        });
        let currentIndex = startIndex;
        let resizeFrame = 0;
        let refreshFrameOne = 0;
        let refreshFrameTwo = 0;

        /*
         * PERF: ResizeObserver provides contentRect dimensions directly.
         * Using entry.contentRect avoids the getBoundingClientRect() call
         * that was previously inside the resize handler — getBoundingClientRect()
         * forces a synchronous layout flush (reflow) every time it is called.
         *
         * Also removed: renderer.setContent() was called on EVERY resize event.
         * setContent() triggers loadImages() which iterates all projects to
         * check/start image loading.  Content does not change on resize; images
         * are already loaded at this point.  setContent() is only needed when
         * the actual project list changes, which happens in the outer effect
         * dependency array and causes the whole effect to re-run anyway.
         */
        const resize = (width: number, height: number) => {
            renderer.resize(width, height);
            renderer.render(currentIndex);
        };

        /*
         * Initial size: read once from getBoundingClientRect (acceptable on
         * mount since the layout should already be stable at this point).
         */
        const initialRect = section.getBoundingClientRect();
        resize(initialRect.width, initialRect.height);

        const resizeObserver = new ResizeObserver((entries) => {
            const entry = entries[0];
            if (!entry) return;

            /*
             * Use contentRect from the observer entry — no forced reflow.
             * Cancel any pending frame so rapid resize events coalesce into
             * one render pass (same as the original debounce pattern).
             */
            const { width, height } = entry.contentRect;
            window.cancelAnimationFrame(resizeFrame);
            resizeFrame = window.requestAnimationFrame(() => {
                resize(width, height);
            });
        });
        resizeObserver.observe(section);

        const context = gsap.context(() => {
            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => {
                    const projectDistance =
                        window.innerHeight
                        * Math.max(scrollSteps, 1)
                        * SCROLL_PER_CARD_VH;
                    const minimumDistance = window.innerHeight * 3;

                    return `+=${Math.max(
                        projectDistance,
                        minimumDistance,
                    )}`;
                },
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                refreshPriority: 20,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    currentIndex = startIndex + self.progress * scrollSteps;
                    renderer.render(currentIndex);
                },
                onRefresh: (self) => {
                    currentIndex = startIndex + self.progress * scrollSteps;
                    const rect = section.getBoundingClientRect();
                    resize(rect.width, rect.height);
                },
                onEnter: (self) => {
                    currentIndex = startIndex + self.progress * scrollSteps;
                    renderer.render(currentIndex);
                },
                onEnterBack: (self) => {
                    currentIndex = startIndex + self.progress * scrollSteps;
                    renderer.render(currentIndex);
                },
                onLeave: () => {
                    currentIndex = endIndex;
                    renderer.render(currentIndex);
                },
                onLeaveBack: () => {
                    currentIndex = startIndex;
                    renderer.render(currentIndex);
                },
            });
        }, section);

        refreshFrameOne = window.requestAnimationFrame(() => {
            refreshFrameTwo = window.requestAnimationFrame(() => {
                ScrollTrigger.sort();
                ScrollTrigger.refresh();
            });
        });

        return () => {
            window.cancelAnimationFrame(resizeFrame);
            window.cancelAnimationFrame(refreshFrameOne);
            window.cancelAnimationFrame(refreshFrameTwo);
            resizeObserver.disconnect();
            context.revert();
            renderer.destroy();
        };
    }, [loopedProjects, projectCount, startIndex, endIndex, scrollSteps]);

    return (
        <Section ref={sectionRef} aria-label={sectionLabel}>
            <CanvasLayer ref={canvasRef} aria-hidden="true" />

            <DomStage>
                <DomTrack ref={trackRef}>
                    {loopedProjects.map((project, index) => (
                        <DomCard
                            key={`${project.href}-${index}`}
                            ref={(element) => {
                                cardRefs.current[index] = element;
                            }}
                            href={project.href}
                            aria-label={`View ${project.title}`}
                        >
                            <DomMedia data-dom-media="true">
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
                            </DomMedia>
                        </DomCard>
                    ))}
                </DomTrack>
            </DomStage>
        </Section>
    );
}