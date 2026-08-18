'use client';

import { useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { tokens } from '@/theme/theme';

// ─────────────────────────────────────────────────────────────────────────────
// Card data
// ─────────────────────────────────────────────────────────────────────────────

const WORK_CARDS = [
    {
        id: 0,
        title: 'Sombra',
        category: 'Brand Identity',
        year: '2024',
        bg: '#111118',
        accent: tokens.color.coral500,
        image: '/placeholder.jpg',
    },
    {
        id: 1,
        title: 'Future Arc',
        category: 'Digital Experience',
        year: '2024',
        bg: '#C84B31',
        accent: '#ffffff',
        image: '/placeholder2.jpg',
    },
    {
        id: 2,
        title: 'Born of Nature',
        category: 'Web Design',
        year: '2023',
        bg: '#0a0a0f',
        accent: tokens.color.uv300,
        image: '/placeholder3.jpg',
    },
    {
        id: 3,
        title: 'Momentum',
        category: 'Motion & Interaction',
        year: '2023',
        bg: '#0d2b20',
        accent: tokens.color.mint500,
        image: '/placeholder4.jpg',
    },
    {
        id: 4,
        title: 'Prism UI',
        category: 'Product Design',
        year: '2022',
        bg: '#1a1060',
        accent: tokens.color.uv500,
        image: '/placeholder5.jpg',
    },
    {
        id: 5,
        title: 'Void Studio',
        category: 'Creative Direction',
        year: '2022',
        bg: '#1c0a0a',
        accent: tokens.color.coral500,
        image: '/placeholder6.jpg',
    },
    {
        id: 6,
        title: 'Aether',
        category: 'UX & Strategy',
        year: '2021',
        bg: '#080f1a',
        accent: tokens.color.uv300,
        image: '/placeholder7.jpg',
    },
    {
        id: 7,
        title: 'Luminary',
        category: 'Visual Identity',
        year: '2021',
        bg: '#0f1a0a',
        accent: tokens.color.mint500,
        image: '/placeholder8.jpg',
    },
    {
        id: 8,
        title: 'Obsidian',
        category: 'Brand & Web',
        year: '2020',
        bg: '#15100a',
        accent: '#C84B31',
        image: '/placeholder9.jpg',
    },
];

// ─────────────────────────────────────────────────────────────────────────────
// Tuning — matched to reference
// ─────────────────────────────────────────────────────────────────────────────

/**
 * PERSPECTIVE = 620px
 *
 * Lower value = more aggressive 3D warp.
 * 620px at ~1300px viewport gives the heavy trapezoid wedge seen in
 * the reference. Going below 500px makes side cards too distorted.
 */
const PERSPECTIVE = 620;

/**
 * SPREAD = 520px
 *
 * Was 780px — that pushed ±1 cards too far off-screen so only 1 card
 * was clearly visible. 520px keeps ±1 and ±2 cards within viewport,
 * matching the reference where 4–5 cards show simultaneously.
 */
const SPREAD = 520;

/**
 * DEPTH = 300px
 *
 * Was 480px — too much z-pullback made side cards shrink via perspective
 * and disappear. 300px keeps them large enough to read while still
 * curving back convincingly.
 */
const DEPTH = 300;

/**
 * ANGLE = 22deg
 *
 * Was 40deg — at 40deg, ±1 card already faces nearly sideways (80deg
 * total rotation) so it looks like a thin sliver. 22deg means ±2 card
 * is at 44deg rotation — still clearly a card face, not a knife edge.
 * This is what lets 2 cards each side stay readable.
 */
const ANGLE = 22;

/**
 * SCALE_STEP = 0.055
 *
 * Very subtle. Perspective already handles apparent size reduction.
 * This just adds a tiny extra step so far cards don't look same-size
 * as center card.
 */
const SCALE_STEP = 0.055;

/**
 * FADE_STEP unused directly — opacity handled inside applyTransforms
 * via seamThreshold. Kept for reference.
 */
const FADE_STEP = 0.28;

// ─────────────────────────────────────────────────────────────────────────────
// Scroll / drag
// ─────────────────────────────────────────────────────────────────────────────

const SCROLL_PER_CARD = 700;
const SCRUB_LAG = 1.2;
const DRAG_MULTIPLIER = SCROLL_PER_CARD / 260;

// ─────────────────────────────────────────────────────────────────────────────
// Styled components
// ─────────────────────────────────────────────────────────────────────────────

const Section = styled(Box)({
    position: 'relative',
    width: '100vw',
    maxWidth: '100vw',
    marginLeft: 'calc(50% - 50vw)',
    height: '100vh',
    background: tokens.color.neutral50,
    /**
     * overflow: hidden REMOVED.
     * Reference cards bleed past viewport edges — clipping kills the effect.
     * The GSAP pin container clips naturally.
     */
    overflow: 'visible',
    userSelect: 'none',
});

const StickyFrame = styled(Box)({
    position: 'relative',
    width: '100vw',
    maxWidth: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
});

const Header = styled(Box)({
    position: 'absolute',
    top: 'clamp(48px, 8vh, 80px)',
    left: '50%',
    transform: 'translateX(-50%)',
    textAlign: 'center',
    pointerEvents: 'none',
    zIndex: 10000,
    whiteSpace: 'nowrap',
});

const Eyebrow = styled('p')({
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: '11px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: tokens.color.uv500,
    margin: '0 0 10px',
});

const Heading = styled('h2')({
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 'clamp(28px, 4vw, 52px)',
    letterSpacing: '-0.03em',
    lineHeight: 1.05,
    color: tokens.color.ink900,
    margin: 0,
});

/**
 * Stage: shared 3D camera for all cards.
 *
 * perspective is set inline via style prop so it can be
 * viewport-responsive without recalculating in JS.
 *
 * overflow: visible — cards must bleed past stage bounds.
 */
const Stage = styled(Box)({
    position: 'relative',
    width: '100vw',
    maxWidth: '100vw',
    height: 'min(68vh, 640px)',
    perspectiveOrigin: '50% 50%',
    transformStyle: 'preserve-3d',
    cursor: 'grab',
    overflow: 'visible',

    '&:active': {
        cursor: 'grabbing',
    },

    '@media (max-width: 767px)': {
        height: 'min(54vh, 480px)',
    },
});

/**
 * Each card anchored at stage center.
 * applyTransforms() positions it in 3D space.
 *
 * No width clamp — reference cards are wide landscape panels.
 * At 1300px viewport, center card ≈ 780px wide (60vw).
 */
const CardOuter = styled(Box)({
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: 'clamp(480px, 58vw, 860px)',
    aspectRatio: '1.68 / 1',
    transformOrigin: '50% 50%',
    transformStyle: 'preserve-3d',
    backfaceVisibility: 'visible',
    willChange: 'transform, opacity',

    '@media (max-width: 767px)': {
        width: '84vw',
        maxWidth: '420px',
        minWidth: '260px',
    },
});

const CardInner = styled(Box)<{
    cardaccent: string;
    cardbg: string;
}>(({ cardaccent, cardbg }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    /**
     * Barrel curve illusion:
     * top and bottom corners are heavily rounded,
     * left/right stay tighter.
     *
     * This is what creates the "curved screen" look in the reference
     * when combined with aggressive perspective + rotateY.
     */
    borderRadius: 'clamp(16px, 2vw, 28px)',
    overflow: 'hidden',
    background: cardbg,
    /**
     * Reference shadow: strong diffuse drop, no colored glow.
     */
    boxShadow: '0 32px 80px rgba(0,0,0,0.28), 0 8px 20px rgba(0,0,0,0.16)',

    '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,
        background: `linear-gradient(
            155deg,
            ${alpha(cardaccent, 0.22)} 0%,
            transparent 52%
        )`,
        pointerEvents: 'none',
    },
}));

const CardImage = styled('img')({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0.72,
    pointerEvents: 'none',
});

const CardContent = styled(Box)({
    position: 'absolute',
    inset: 0,
    padding: '28px 32px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 1,

    '@media (max-width: 767px)': {
        padding: '20px',
    },
});

const CardTop = styled(Box)({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
});

const CardTitle = styled('h3')({
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 'clamp(22px, 2.4vw, 34px)',
    letterSpacing: '-0.03em',
    color: '#ffffff',
    margin: 0,
});

const CardMeta = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
});

const CardCategory = styled('span')({
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: '11px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: alpha('#ffffff', 0.5),
});

const CardYear = styled('span')({
    fontFamily: 'var(--font-mono)',
    fontSize: '11px',
    color: alpha('#ffffff', 0.35),
});

const CardArrow = styled(Box)<{ cardaccent: string }>(({ cardaccent }) => ({
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: `1px solid ${alpha('#ffffff', 0.2)}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: cardaccent,
    fontSize: '16px',
    flexShrink: 0,
}));

const DragHint = styled('p')({
    position: 'absolute',
    bottom: 'clamp(64px, 9vh, 92px)',
    left: '50%',
    transform: 'translateX(-50%)',
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: alpha(tokens.color.ink900, 0.3),
    margin: 0,
    whiteSpace: 'nowrap',
    pointerEvents: 'none',
    zIndex: 10000,
});

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Wrapped offset: card at index=2, N=5, position=0
 * → offset=2 → wraps to -2 (right side of carousel)
 *
 * Ensures cards always appear on both sides of center.
 */
function getWrappedOffset(index: number, position: number, total: number) {
    if (total <= 1) return 0;
    const half = total / 2;
    let offset = index - position;
    offset = ((offset + half) % total + total) % total - half;
    return offset;
}

// ─────────────────────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────────────────────

export default function WorkSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const hintRef = useRef<HTMLParagraphElement>(null);
    const dotsRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const dotRefs = useRef<(HTMLDivElement | null)[]>([]);

    const isDragging = useRef(false);
    const lastX = useRef(0);
    const activeDot = useRef(-1);
    const currentPosition = useRef(0);

    const N = WORK_CARDS.length;

    // ─────────────────────────────────────────────────────────────────────────
    // applyTransforms
    // ─────────────────────────────────────────────────────────────────────────

    const applyTransforms = (position: number) => {
        currentPosition.current = position;

        const stage = stageRef.current;
        if (!stage || N === 0) return;

        const viewportWidth = window.innerWidth;
        const isMobile = viewportWidth < 768;

        /**
         * Scale SPREAD/DEPTH to viewport so layout is consistent
         * across screen sizes without separate ratio constants.
         */
        const vwScale = Math.min(viewportWidth / 1300, 1.15);
        const spread = SPREAD * (isMobile ? 0.72 : vwScale);
        const depth = DEPTH * (isMobile ? 0.68 : vwScale);

        cardRefs.current.forEach((el, index) => {
            if (!el) return;

            const offset = getWrappedOffset(index, position, N);
            const absOffset = Math.abs(offset);

            /**
             * X: linear spread — cards push to viewport edges.
             */
            const x = offset * spread;

            /**
             * Z: cosine curve — center card at z=0, side cards recede.
             * Cosine shape matches physical carousel/cylinder.
             */
            const angleRad = (offset * ANGLE * Math.PI) / 180;
            const z = -(1 - Math.cos(angleRad)) * depth;

            /**
             * RotateY: tangential rotation.
             * Negative because right card rotates left-face toward camera.
             */
            const rotateY = -(offset * ANGLE);

            /**
             * Scale: mostly handled by perspective.
             * Manual step very small — don't fight CSS 3D.
             */
            const scale = Math.max(0.82, 1 - absOffset * SCALE_STEP);

            /**
             * Fade only cards near the wrap seam (far back of carousel).
             * Normal side cards stay fully opaque — matches reference.
             */
            const seamThreshold = N / 2 - 0.4;
            let opacity = 1;
            if (absOffset > seamThreshold) {
                opacity = Math.max(
                    0,
                    1 - (absOffset - seamThreshold) / 0.6,
                );
            }

            /**
             * translate(-50%,-50%) anchors card center to stage center.
             * All other transforms build on that.
             */
            el.style.transform = [
                'translate(-50%, -50%)',
                `translate3d(${x}px, 0px, ${z}px)`,
                `rotateY(${rotateY}deg)`,
                `scale(${scale})`,
            ].join(' ');

            el.style.opacity = String(opacity);
            el.style.zIndex = String(Math.round(1000 - absOffset * 100));

            /**
             * Only center card gets pointer events.
             * Side cards should not intercept drag.
             */
            el.style.pointerEvents = absOffset < 1.1 ? '' : 'none';
        });

        // ─── dots ────────────────────────────────────────────────────────────

        const nearest = ((Math.round(position) % N) + N) % N;

        if (nearest !== activeDot.current) {
            activeDot.current = nearest;

            dotRefs.current.forEach((dot, index) => {
                if (!dot) return;
                dot.style.width = index === nearest ? '24px' : '6px';
                dot.style.background = index === nearest
                    ? tokens.color.ink900
                    : alpha(tokens.color.ink900, 0.2);
            });
        }
    };

    // ─────────────────────────────────────────────────────────────────────────
    // GSAP / ScrollTrigger
    // ─────────────────────────────────────────────────────────────────────────

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        /**
         * Set perspective inline so it's easy to hot-swap.
         * Styled component can't access PERSPECTIVE constant cleanly.
         */
        if (stageRef.current) {
            stageRef.current.style.perspective = `${PERSPECTIVE}px`;
        }

        applyTransforms(0);

        const ctx = gsap.context(() => {
            gsap.from(
                [headerRef.current, stageRef.current, hintRef.current, dotsRef.current],
                {
                    opacity: 0,
                    y: 28,
                    duration: 1,
                    ease: 'power3.out',
                    stagger: 0.08,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        once: true,
                    },
                },
            );

            ScrollTrigger.create({
                trigger: section,
                pin: true,
                start: 'top top',
                end: `+=${(N - 1) * SCROLL_PER_CARD}`,
                // N=9 cards → 8 × 700 = 5600px total scroll distance
                scrub: SCRUB_LAG,
                invalidateOnRefresh: true,
                onUpdate: self => {
                    applyTransforms(self.progress * (N - 1));
                },
                onRefresh: self => {
                    if (stageRef.current) {
                        stageRef.current.style.perspective = `${PERSPECTIVE}px`;
                    }
                    applyTransforms(self.progress * (N - 1));
                },
            });
        }, section);

        return () => { ctx.revert(); };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [N]);

    // ─────────────────────────────────────────────────────────────────────────
    // Drag
    // ─────────────────────────────────────────────────────────────────────────

    useEffect(() => {
        const stage = stageRef.current;
        if (!stage) return;

        const onDown = (e: PointerEvent) => {
            isDragging.current = true;
            lastX.current = e.clientX;
            stage.setPointerCapture(e.pointerId);
        };

        const onMove = (e: PointerEvent) => {
            if (!isDragging.current) return;
            const dx = e.clientX - lastX.current;
            lastX.current = e.clientX;
            window.scrollBy({ top: -dx * DRAG_MULTIPLIER, behavior: 'instant' });
        };

        const onUp = () => { isDragging.current = false; };

        stage.addEventListener('pointerdown', onDown);
        stage.addEventListener('pointermove', onMove);
        stage.addEventListener('pointerup', onUp);
        stage.addEventListener('pointercancel', onUp);

        return () => {
            stage.removeEventListener('pointerdown', onDown);
            stage.removeEventListener('pointermove', onMove);
            stage.removeEventListener('pointerup', onUp);
            stage.removeEventListener('pointercancel', onUp);
        };
    }, []);

    // ─────────────────────────────────────────────────────────────────────────
    // Render
    // ─────────────────────────────────────────────────────────────────────────

    return (
        <Section ref={sectionRef} id="work">
            <StickyFrame>

                <Header ref={headerRef}>
                    <Eyebrow>Selected Work</Eyebrow>
                    <Heading>What we've built</Heading>
                </Header>

                <Stage ref={stageRef}>
                    {WORK_CARDS.map((card, index) => (
                        <CardOuter
                            key={card.id}
                            ref={el => { cardRefs.current[index] = el; }}
                        >
                            <CardInner cardaccent={card.accent} cardbg={card.bg}>
                                {card.image && (
                                    <CardImage
                                        src={card.image}
                                        alt={card.title}
                                        draggable={false}
                                    />
                                )}
                                <CardContent>
                                    <CardTop>
                                        <CardTitle>{card.title}</CardTitle>
                                        <CardArrow cardaccent={card.accent}>↗</CardArrow>
                                    </CardTop>
                                    <CardMeta>
                                        <CardCategory>{card.category}</CardCategory>
                                        <CardYear>— {card.year}</CardYear>
                                    </CardMeta>
                                </CardContent>
                            </CardInner>
                        </CardOuter>
                    ))}
                </Stage>

                <DragHint ref={hintRef}>Drag or scroll to explore</DragHint>

                <Box
                    ref={dotsRef}
                    sx={{
                        position: 'absolute',
                        bottom: 'clamp(32px, 5vh, 56px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        gap: '8px',
                        pointerEvents: 'none',
                        zIndex: 10000,
                    }}
                >
                    {WORK_CARDS.map((card, index) => (
                        <Box
                            key={card.id}
                            ref={el => { dotRefs.current[index] = el as HTMLDivElement | null; }}
                            sx={{
                                width: index === 0 ? '24px' : '6px',
                                height: '6px',
                                borderRadius: '3px',
                                background: index === 0
                                    ? tokens.color.ink900
                                    : alpha(tokens.color.ink900, 0.2),
                                transition: 'all 300ms cubic-bezier(0.16,1,0.3,1)',
                            }}
                        />
                    ))}
                </Box>

            </StickyFrame>
        </Section>
    );
}