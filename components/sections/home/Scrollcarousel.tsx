'use client';

import { useEffect, useMemo, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const CENTER = 50;
const SIDE_LEFT = 17.5;
const SIDE_RIGHT = 82.5;
const OUTER_LEFT = 5;
const OUTER_RIGHT = 95;

const SIDE_ROTATION = 74;
const OUTER_ROTATION = 82;

const SIDE_SCALE = 0.72;
const OUTER_SCALE = 0.56;

const CARD_ASPECT_RATIO = 1.68;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function easeInQuad(t: number): number {
    return t * t;
}

function easeOutQuad(t: number): number {
    return 1 - (1 - t) * (1 - t);
}

/**
 * Reference-style horizontal path.
 *
 * Incoming card stays near side a little longer, then moves into center.
 * Outgoing card clears center faster.
 *
 * This keeps visual space between adjacent cards while they rotate.
 */
function centerAt(relPos: number): number {
    if (relPos >= 0 && relPos <= 1) {
        const progressToCenter = 1 - relPos;

        return lerp(
            SIDE_RIGHT,
            CENTER,
            easeInQuad(progressToCenter),
        );
    }

    if (relPos >= -1 && relPos <= 0) {
        const progressToLeft = -relPos;

        return lerp(
            CENTER,
            SIDE_LEFT,
            easeOutQuad(progressToLeft),
        );
    }

    if (relPos > 1 && relPos <= 2) {
        return lerp(
            SIDE_RIGHT,
            OUTER_RIGHT,
            relPos - 1,
        );
    }

    if (relPos < -1 && relPos >= -2) {
        return lerp(
            SIDE_LEFT,
            OUTER_LEFT,
            -relPos - 1,
        );
    }

    if (relPos > 2) {
        return OUTER_RIGHT + (relPos - 2) * 12.5;
    }

    return OUTER_LEFT - (-relPos - 2) * 12.5;
}

/**
 * Reference flip:
 *
 * center      -> 0deg
 * first side  -> about 74deg
 * outer side  -> about 82deg
 *
 * Right side uses positive rotationY.
 * Left side mirrors it with negative rotationY.
 *
 * Power curve keeps cards edge-on longer, matching reference more closely
 * than simple linear rotation.
 */
function rotationAt(relPos: number): number {
    const distance = Math.abs(relPos);

    if (distance < 0.0001) {
        return 0;
    }

    let angle: number;

    if (distance <= 1) {
        angle =
            SIDE_ROTATION *
            Math.pow(clamp01(distance), 0.65);
    } else if (distance <= 2) {
        angle = lerp(
            SIDE_ROTATION,
            OUTER_ROTATION,
            distance - 1,
        );
    } else {
        angle = OUTER_ROTATION;
    }

    return Math.sign(relPos) * angle;
}

/**
 * Reference also makes cards visually smaller away from center.
 * This is continuous position-based sizing, not a center "pop" animation.
 */
function scaleAt(relPos: number): number {
    const distance = Math.abs(relPos);

    if (distance <= 1) {
        return lerp(
            1,
            SIDE_SCALE,
            Math.pow(clamp01(distance), 0.75),
        );
    }

    if (distance <= 2) {
        return lerp(
            SIDE_SCALE,
            OUTER_SCALE,
            distance - 1,
        );
    }

    return OUTER_SCALE;
}

function opacityAt(relPos: number): number {
    const distance = Math.abs(relPos);

    if (distance <= 2) {
        return 1;
    }

    if (distance >= 3) {
        return 0;
    }

    return 1 - (distance - 2);
}

interface ScrollCarouselProps {
    images: string[];
    alts?: string[];

    /**
     * Card/carousel height.
     * Reference is visually closest around 56vh on desktop.
     */
    height?: string;

    /** Full pinned-section background. */
    background?: string;

    /**
     * Kept for API compatibility.
     * Reference spacing comes from 3D rotation + slot positioning,
     * so use 0 for closest match.
     */
    gap?: number;

    /** Card corner radius. */
    radius?: number;

    /** Vertical scroll distance per slide in vh. */
    scrollPerSlide?: number;

    /** CSS 3D perspective distance. */
    perspective?: number;
}

export default function ScrollCarousel({
    images,
    alts,
    height = '56vh',
    background = '#ffffff',
    gap = 0,
    radius = 10,
    scrollPerSlide = 100,
    perspective = 1800,
}: ScrollCarouselProps) {
    const count = images.length;

    const tripled = useMemo(
        () => [...images, ...images, ...images],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [images.join(',')],
    );

    const startCI = count;
    const endCI = count * 2 - 1;

    const sectionRef = useRef<HTMLElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        const cards = cardRefs.current;

        if (!section || count < 1) {
            return;
        }

        const proxy = { ci: startCI };

        const layout = () => {
            const ci = proxy.ci;

            cards.forEach((card, index) => {
                if (!card) {
                    return;
                }

                const relPos = index - ci;
                const distance = Math.abs(relPos);

                if (distance > 3) {
                    gsap.set(card, {
                        left: relPos < 0 ? '-20%' : '120%',
                        top: '50%',
                        xPercent: -50,
                        yPercent: -50,
                        x:
                            Math.sign(relPos) *
                            (gap / 2),
                        opacity: 0,
                        rotationY: Math.sign(relPos) * OUTER_ROTATION,
                        scale: OUTER_SCALE,
                    });

                    return;
                }

                gsap.set(card, {
                    left: `${centerAt(relPos)}%`,
                    top: '50%',

                    xPercent: -50,
                    yPercent: -50,

                    // Optional extra physical spacing without shrinking cards.
                    x:
                        Math.sign(relPos) *
                        (gap / 2) *
                        Math.min(distance, 1),

                    opacity: opacityAt(relPos),

                    rotationY: rotationAt(relPos),
                    scale: scaleAt(relPos),

                    zIndex: Math.max(
                        1,
                        Math.round(20 - distance * 5),
                    ),

                    transformOrigin: '50% 50%',
                    force3D: true,
                });
            });
        };

        const ctx = gsap.context(() => {
            const tween = gsap.to(proxy, {
                ci: endCI,
                ease: 'none',
                onUpdate: layout,
            });

            layout();

            ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: `+=${count * scrollPerSlide}vh`,
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                scrub: 1,
                animation: tween,
                refreshPriority: 15,
                invalidateOnRefresh: true,
            });
        }, section);

        return () => ctx.revert();
    }, [
        count,
        startCI,
        endCI,
        scrollPerSlide,
        gap,
    ]);

    return (
        <section
            ref={sectionRef}
            style={{
                position: 'relative',
                width: '100%',
                height: '100vh',
                background,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    width: '100%',
                    height,
                    perspective: `${perspective}px`,
                    perspectiveOrigin: '50% 50%',
                    overflow: 'visible',
                }}
            >
                {tripled.map((src, index) => (
                    <div
                        key={`${src}-${index}`}
                        ref={(element) => {
                            cardRefs.current[index] = element;
                        }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',

                            height: '100%',
                            aspectRatio: `${CARD_ASPECT_RATIO} / 1`,
                            width: 'auto',

                            boxSizing: 'border-box',

                            transformStyle: 'preserve-3d',
                            backfaceVisibility: 'hidden',
                            WebkitBackfaceVisibility: 'hidden',

                            willChange:
                                'left, opacity, transform',
                        }}
                    >
                        <img
                            src={src}
                            alt={
                                alts?.[index % count] ??
                                `Slide ${(index % count) + 1}`
                            }
                            draggable={false}
                            style={{
                                display: 'block',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',

                                borderRadius: `${radius}px`,

                                userSelect: 'none',

                                backfaceVisibility: 'hidden',
                                WebkitBackfaceVisibility: 'hidden',
                            }}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
