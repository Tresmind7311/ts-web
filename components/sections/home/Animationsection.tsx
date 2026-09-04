'use client';

import { useCallback, useEffect, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { tokens } from '@/theme/theme';

// ─── Card data ─────────────────────────────────────────────────────
const REEL_CARDS = [
    {
        image: 'UIUX-Design.jpg',
        number: '01',
        heading: 'UI/UX Design',
        description: 'Interfaces shaped around how people actually move.',
    },
    {
        image: 'Brand-Identity.jpg',
        number: '02',
        heading: 'Brand Identity',
        description: 'Systems of type, color, and voice that endure.',
    },
    {
        image: 'Web-Design-and-Dev.jpg',
        number: '03',
        heading: 'Web Design & Development',
        description: 'Sites engineered to feel as good as they look.',
    },
    {
        image: 'Motion-Graphics.jpg',
        number: '04',
        heading: 'Motion Graphics',
        description: 'Movement with intent, never decoration.',
    },
    {
        image: 'Creative-Strategy.jpg',
        number: '05',
        heading: 'Creative Strategy',
        description: 'Decisions grounded in research, not fashion.',
    },
    {
        image: 'Ai.jpg',
        number: '06',
        heading: 'AI-Powered Creative',
        description: 'New tools, applied with editorial judgment.',
    },
];

// ─── Motion config ─────────────────────────────────────────────────
const SCROLL_PER_STEP = 760;
const SCRUB_LAG = 0.85;
const DRAG_SCROLL_MULTIPLIER = 2.8;

const DESKTOP_CARD_STEP_X = 940;
const DESKTOP_CARD_STEP_Y = 105;
const DESKTOP_CARD_ROTATION_Y = 52;
const DESKTOP_CARD_DEPTH = 115;

const MOBILE_CARD_STEP_Y = 55;
const MOBILE_CARD_ROTATION_Y = 34;
const MOBILE_CARD_DEPTH = 75;

// ─── Layout ────────────────────────────────────────────────────────
const SectionWrapper = styled(Box)({
    position: 'relative',
    width: '100%',
    userSelect: 'none',
});

const StickyContent = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '100vh',
    minHeight: '100svh',
    overflow: 'hidden',
    backgroundColor: tokens.color.neutral0,
    cursor: 'default',
    touchAction: 'pan-y',
    isolation: 'isolate',
});

const GridBackground = styled(Box)({
    position: 'absolute',
    inset: '-18% -12% -20%',
    zIndex: 0,
    overflow: 'hidden',
    pointerEvents: 'none',

    '&::before': {
        content: '""',
        position: 'absolute',
        left: '-10%',
        right: '-10%',
        top: '4%',
        height: '142%',
        backgroundImage: [
            'linear-gradient(to right, rgba(43, 57, 57, 0.055) 1px, transparent 1px)',
            'linear-gradient(to bottom, rgba(43, 57, 57, 0.055) 1px, transparent 1px)',
        ].join(', '),
        backgroundSize: '72px 72px',
        transformOrigin: '50% 0%',
        transform: 'perspective(760px) rotateX(61deg) scale(1.52)',
        WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, #000 10%, #000 88%, transparent 100%)',
        maskImage:
            'linear-gradient(to bottom, transparent 0%, #000 10%, #000 88%, transparent 100%)',
    },

    '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background:
            'radial-gradient(ellipse 70% 72% at 50% 38%, rgba(255,255,255,0) 35%, rgba(255,255,255,0.18) 68%, rgba(255,255,255,0.82) 100%)',
    },
});

const CarouselScene = styled(Box)(({ theme }) => ({
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    perspective: '1400px',
    perspectiveOrigin: '50% 43%',
    transformStyle: 'preserve-3d',
    overflow: 'visible',

    [theme.breakpoints.down('md')]: {
        perspective: '1000px',
        perspectiveOrigin: '50% 46%',
    },
}));

const CarouselCard = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '50%',
    top: '58%',
    width: 'clamp(720px, 54vw, 980px)',
    height: 'clamp(580px, 82vh, 720px)',
    borderRadius: '22px',
    overflow: 'hidden',
    boxSizing: 'border-box',
    background: tokens.color.neutral0,
    border: `1px solid ${alpha(tokens.color.ink900, 0.10)}`,
    boxShadow: `0 20px 60px ${alpha(tokens.color.ink900, 0.08)}`,
    transformOrigin: '50% 50%',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'hidden',
    willChange: 'transform, opacity, filter',
    cursor: 'default',

    '&.is-active': {
        borderColor: alpha(tokens.color.ink900, 0.14),
        boxShadow: [
            `0 26px 70px ${alpha(tokens.color.ink900, 0.10)}`,
            `0 1px 0 ${alpha(tokens.color.ink900, 0.04)}`,
        ].join(', '),
    },

    [theme.breakpoints.down('md')]: {
        top: '56%',
        width: 'min(84vw, 520px)',
        height: 'min(68vh, 500px)',
        minHeight: '410px',
        borderRadius: '18px',
    },
}));

const CardImageWrapper = styled(Box)(({ theme }) => ({
    height: '50%',
    margin: '28px 28px 18px',
    overflow: 'hidden',
    borderRadius: '14px',
    background: alpha(tokens.color.ink900, 0.035),

    [theme.breakpoints.down('md')]: {
        height: '47%',
        margin: '18px 18px 14px',
        borderRadius: '12px',
    },
}));

const CardImage = styled('img')({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
    userSelect: 'none',
});

const CardContent = styled(Box)(({ theme }) => ({
    padding: '0 30px 30px',
    display: 'flex',
    flexDirection: 'column',

    [theme.breakpoints.down('md')]: {
        padding: '0 20px 22px',
    },
}));

const CardMeta = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
});

const CardNumber = styled(Typography)(({ theme }) => ({
    flexShrink: 0,
    margin: 0,
    color: alpha(tokens.color.ink900, 0.48),
    fontFamily: 'var(--font-body)',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: 1,

    [theme.breakpoints.down('md')]: {
        fontSize: '11px',
    },
}));

const CardDivider = styled(Box)({
    flex: 1,
    height: '1px',
    background: alpha(tokens.color.ink900, 0.14),
});

const CardHeading = styled(Typography)(({ theme }) => ({
    marginTop: '24px',
    color: tokens.color.ink900,
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(28px, 2.75vw, 38px)',
    fontWeight: 700,
    lineHeight: 1.06,
    letterSpacing: '-0.025em',

    [theme.breakpoints.down('md')]: {
        marginTop: '18px',
        fontSize: 'clamp(24px, 7vw, 32px)',
    },
}));

const CardDescription = styled(Typography)(({ theme }) => ({
    marginTop: '16px',
    color: alpha(tokens.color.ink900, 0.58),
    fontFamily: 'var(--font-body)',
    fontSize: '17px',
    fontWeight: 400,
    lineHeight: 1.45,

    [theme.breakpoints.down('md')]: {
        marginTop: '12px',
        fontSize: '14px',
    },
}));

const SectionCounter = styled(Box)(({ theme }) => ({
    position: 'absolute',
    left: '4.5vw',
    bottom: '7vh',
    zIndex: 20,
    pointerEvents: 'none',

    [theme.breakpoints.down('md')]: {
        left: '22px',
        bottom: '72px',
    },
}));

const CounterLabel = styled(Typography)({
    margin: 0,
    color: alpha(tokens.color.ink900, 0.52),
    fontFamily: 'var(--font-body)',
    fontSize: '10px',
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
});

const CounterValue = styled(Box)({
    display: 'flex',
    alignItems: 'baseline',
    gap: '5px',
    marginTop: '16px',
    color: tokens.color.ink900,
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    lineHeight: 1,
});

const CounterCurrent = styled('span')({
    fontWeight: 600,
});

const CounterTotal = styled('span')({
    color: alpha(tokens.color.ink900, 0.38),
    fontWeight: 500,
});

// ─── Helpers ───────────────────────────────────────────────────────
function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
    const t = clamp(
        (value - edge0) / Math.max(edge1 - edge0, 0.00001),
        0,
        1,
    );

    return t * t * (3 - 2 * t);
}

function getCardTransform(relative: number, viewportWidth: number) {
    const isMobile = viewportWidth < 900;
    const absRelative = Math.abs(relative);

    const stepX = isMobile
        ? viewportWidth * 0.76
        : Math.min(DESKTOP_CARD_STEP_X, viewportWidth * 0.50);

    const stepY = isMobile
        ? MOBILE_CARD_STEP_Y
        : DESKTOP_CARD_STEP_Y;

    const rotationPerStep = isMobile
        ? MOBILE_CARD_ROTATION_Y
        : DESKTOP_CARD_ROTATION_Y;

    const depthPerStep = isMobile
        ? MOBILE_CARD_DEPTH
        : DESKTOP_CARD_DEPTH;

    /*
     * Normal slider movement:
     * right card -> center -> left card.
     *
     * Important: 3D perspective is NOT part of the movement path.
     * It fades in only as a card approaches a side slot.
     * This keeps the center handoff flat/clean instead of producing
     * a circular / 360-carousel transition.
     */
    const x = relative * stepX;

    // Reference rises from bottom-left to upper-right.
    const y = -relative * stepY;

    /*
     * 0 near center = normal flat slider.
     * 1 near side position = full 3D side-card treatment.
     */
    const side3D = smoothstep(
        0.12,
        0.98,
        absRelative,
    );

    const direction =
        relative === 0
            ? 0
            : Math.sign(relative);

    const rotateY =
        direction *
        rotationPerStep *
        side3D;

    const z =
        -depthPerStep *
        side3D;

    const scale =
        1 -
        side3D *
        (isMobile ? 0.035 : 0.025);

    return {
        transform: [
            'translate(-50%, -50%)',
            `translate3d(${x}px, ${y}px, ${z}px)`,
            `rotateY(${rotateY}deg)`,
            `scale(${scale})`,
        ].join(' '),
        absRelative,
        side3D,
    };
}

// ═══════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════

export default function AnimationSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const currentCounterRef = useRef<HTMLSpanElement>(null);
    const prevActiveRef = useRef(-1);

    const renderFrame = useCallback((progress: number) => {
        const cardCount = REEL_CARDS.length;
        const normalizedProgress = clamp(progress, 0, 100) / 100;
        const floatActive =
            normalizedProgress * (cardCount - 1);

        const activeIndex = clamp(
            Math.round(floatActive),
            0,
            cardCount - 1,
        );

        const viewportWidth = window.innerWidth;

        cardRefs.current.forEach((card, index) => {
            if (!card) {
                return;
            }

            const relative = index - floatActive;
            const {
                transform,
                absRelative,
                side3D,
            } = getCardTransform(
                relative,
                viewportWidth,
            );

            /*
             * Keep primary three strong.
             * Cards beyond them can remain faint, but blur/fade quickly
             * as distance increases. No abrupt visibility switch while
             * activeIndex changes during scroll.
             */
            const distancePastSide =
                Math.max(0, absRelative - 1);

            const opacity = clamp(
                1 -
                side3D * 0.16 -
                distancePastSide * 0.72,
                0,
                1,
            );

            const blur =
                side3D * 2.2 +
                distancePastSide * 3.2;

            const visible =
                absRelative < 1.95 &&
                opacity > 0.01;

            card.style.transform = transform;
            card.style.opacity = String(opacity);
            card.style.filter =
                `blur(${Math.min(blur, 6)}px)`;

            /*
             * Closest-to-center card stays visually on top.
             * Prevents random DOM-order overlap at transition midpoint.
             */
            card.style.zIndex = String(
                1000 -
                Math.round(absRelative * 100),
            );

            card.style.visibility =
                visible ? 'visible' : 'hidden';

            card.style.pointerEvents =
                absRelative <= 1.08
                    ? 'auto'
                    : 'none';
        });

        if (activeIndex !== prevActiveRef.current) {
            const previous = prevActiveRef.current;

            if (previous >= 0) {
                cardRefs.current[previous]?.classList.remove('is-active');
            }

            cardRefs.current[activeIndex]?.classList.add('is-active');

            if (currentCounterRef.current) {
                currentCounterRef.current.textContent =
                    REEL_CARDS[activeIndex].number;
            }

            prevActiveRef.current = activeIndex;
        }
    }, []);

    useEffect(() => {
        const section = sectionRef.current;
        const sticky = stickyRef.current;

        if (!section || !sticky) {
            return;
        }

        renderFrame(0);

        const scrollLength =
            SCROLL_PER_STEP * (REEL_CARDS.length - 1);

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: section,
                pin: sticky,
                start: 'top top',
                end: `+=${scrollLength}`,
                pinSpacing: true,
                scrub: SCRUB_LAG,
                refreshPriority: 30,
                invalidateOnRefresh: true,

                onUpdate(self) {
                    renderFrame(self.progress * 100);
                },

                onRefresh(self) {
                    renderFrame(self.progress * 100);
                },

                onLeave() {
                    renderFrame(100);
                },

                onLeaveBack() {
                    renderFrame(0);
                },
            });
        }, section);

        // Horizontal drag translates to the same vertical page scroll that
        // drives ScrollTrigger. One progress source keeps drag + wheel synced.
        let isDragging = false;
        let lastX = 0;

        const onDown = (clientX: number) => {
            isDragging = true;
            lastX = clientX;
        };

        const onMove = (clientX: number) => {
            if (!isDragging) {
                return;
            }

            const deltaX = clientX - lastX;
            lastX = clientX;

            window.scrollBy(
                0,
                -deltaX * DRAG_SCROLL_MULTIPLIER,
            );
        };

        const onUp = () => {
            isDragging = false;
        };

        const onMouseDown = (event: MouseEvent) => {
            onDown(event.clientX);
        };

        const onMouseMove = (event: MouseEvent) => {
            onMove(event.clientX);
        };

        const onTouchStart = (event: TouchEvent) => {
            const touch = event.touches[0];

            if (touch) {
                onDown(touch.clientX);
            }
        };

        const onTouchMove = (event: TouchEvent) => {
            const touch = event.touches[0];

            if (touch) {
                onMove(touch.clientX);
            }
        };

        sticky.addEventListener('mousedown', onMouseDown);
        sticky.addEventListener('touchstart', onTouchStart, {
            passive: true,
        });

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onUp);
        document.addEventListener('touchmove', onTouchMove, {
            passive: true,
        });
        document.addEventListener('touchend', onUp);
        window.addEventListener('blur', onUp);

        return () => {
            ctx.revert();

            sticky.removeEventListener('mousedown', onMouseDown);
            sticky.removeEventListener('touchstart', onTouchStart);

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onUp);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onUp);
            window.removeEventListener('blur', onUp);
        };
    }, [renderFrame]);

    const scrollToCard = useCallback((index: number) => {
        const section = sectionRef.current;

        if (!section || REEL_CARDS.length <= 1) {
            return;
        }

        const sectionTop =
            window.scrollY +
            section.getBoundingClientRect().top;

        const scrollLength =
            SCROLL_PER_STEP * (REEL_CARDS.length - 1);

        const targetProgress =
            index / (REEL_CARDS.length - 1);

        window.scrollTo({
            top: sectionTop + targetProgress * scrollLength,
            behavior: 'smooth',
        });
    }, []);

    return (
        <SectionWrapper
            ref={sectionRef}
            id="services"
        >
            <StickyContent ref={stickyRef}>
                <GridBackground />

                <CarouselScene>
                    {REEL_CARDS.map((card, index) => (
                        <CarouselCard
                            key={card.number}
                            ref={(element) => {
                                cardRefs.current[index] = element;
                            }}
                            onClick={() => {
                                scrollToCard(index);
                            }}
                        >
                            <CardImageWrapper>
                                <CardImage
                                    src={card.image}
                                    alt={card.heading}
                                    draggable={false}
                                />
                            </CardImageWrapper>

                            <CardContent>
                                <CardMeta>
                                    <CardNumber>
                                        {card.number}
                                    </CardNumber>

                                    <CardDivider />
                                </CardMeta>

                                <CardHeading>
                                    {card.heading}
                                </CardHeading>

                                <CardDescription>
                                    {card.description}
                                </CardDescription>
                            </CardContent>
                        </CarouselCard>
                    ))}
                </CarouselScene>

                <SectionCounter aria-hidden="true">
                    <CounterLabel>
                        Services
                    </CounterLabel>

                    <CounterValue>
                        <CounterCurrent
                            ref={currentCounterRef}
                        >
                            01
                        </CounterCurrent>

                        <CounterTotal>
                            / {String(REEL_CARDS.length).padStart(2, '0')}
                        </CounterTotal>
                    </CounterValue>
                </SectionCounter>
            </StickyContent>
        </SectionWrapper>
    );
}