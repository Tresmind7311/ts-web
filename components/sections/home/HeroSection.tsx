'use client';

import { useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ImageSequenceCanvas from '@/components/canvas/ImageSequenceCanvas';
import { generateFrameUrls } from '@/lib/frameUtils';
import { tokens } from '@/theme/theme';

// ─── Frame configuration ──────────────────────────────────────────
const FRAME_COUNT = 151;

const DESKTOP_FRAMES = generateFrameUrls(
    '/frames/hero/desktop/hero_{n}.webp',
    1,
    FRAME_COUNT,
    5,
);

const SCROLL_HEIGHT = '300vh';

// ─── Text transition ──────────────────────────────────────────────
// Number of final frames over which the text color shifts white → dark.
// Raise for a longer fade, lower for a snappier one.
const TEXT_TRANSITION_FRAMES = 80;

// ═══════════════════════════════════════════════════════════════════
// Styled components
// ═══════════════════════════════════════════════════════════════════

const ScrollContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    height: SCROLL_HEIGHT,
});

const StickyFrame = styled(Box)({
    position: 'fixed',
    top: 0,
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    background: tokens.color.ink900,
});

const CanvasLayer = styled(Box)({
    position: 'absolute',
    inset: 0,
});

const ContentOverlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 20px',
    pointerEvents: 'none',
    maxWidth: '1280px',
    margin: 'auto',
    // ── Reveal-on-final-frame ──────────────────────────────────────
    // Hidden by default; JS flips opacity to 1 only once the canvas
    // sequence reaches its last frame, and back to 0 the moment the
    // user scrolls back out of that final-frame state.
    opacity: 0,
    transition: 'opacity 600ms cubic-bezier(0.16,1,0.3,1)',
    // [theme.breakpoints.up('md')]: {
    //     padding: '0 64px',
    // },
    // [theme.breakpoints.up('lg')]: {
    //     padding: '0 96px',
    // },
}));

const Eyebrow = styled(Typography)({
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: '11px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: tokens.color.uv300,
    marginBottom: '24px',
});

const Headline = styled(Typography)(({ theme }) => ({
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 'clamp(44px, 7vw, 96px)',
    lineHeight: 0.95,
    letterSpacing: '-0.04em',
    // CSS var set by scroll handler; falls back to white when not yet set
    color: `var(--hero-headline-color, ${tokens.color.neutral0})`,
    marginBottom: '28px',
    transition: 'none', // JS drives this — no CSS transition lag
    [theme.breakpoints.down('md')]: {
        marginBottom: '20px',
    },
}));

const SubCopy = styled(Typography)(({ theme }) => ({
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    fontSize: 'clamp(15px, 1.4vw, 18px)',
    lineHeight: 1.65,
    // CSS var set by scroll handler; falls back to semi-white when not yet set
    color: `var(--hero-sub-color, ${alpha(tokens.color.neutral0, 0.6)})`,
    maxWidth: '380px',
    marginBottom: '40px',
    transition: 'none',
    [theme.breakpoints.down('md')]: {
        marginBottom: '28px',
    },
}));

const CtaButton = styled('a')({
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '15px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    color: tokens.color.neutral50,
    background: tokens.color.transparent0,
    padding: '14px 28px',
    borderRadius: tokens.radius.full,
    border: `1px solid ${tokens.color.neutral50}`,
    maxWidth: '250px',
    textAlign: 'center',
    pointerEvents: 'all',
    transition: `transform ${tokens.motion.base} ${tokens.motion.ease},
                     box-shadow ${tokens.motion.base} ${tokens.motion.ease}`,
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 12px 32px ${alpha(tokens.color.ink900, 0.5)}`,
    },
    '&:active': { transform: 'translateY(0)' },
});

// ═══════════════════════════════════════════════════════════════════
// Helpers
// ═══════════════════════════════════════════════════════════════════

// Linear interpolation between two numbers
const lerp = (a: number, b: number, t: number) => Math.round(a + (b - a) * t);

// ink900 = #12121A = rgb(18, 18, 26)
const INK: [number, number, number] = [18, 18, 26];
// neutral0 = #FFFFFF = rgb(255, 255, 255)
const WHITE: [number, number, number] = [255, 255, 255];
// neutral600 = #6B6B75 = rgb(107, 107, 117)
const SLATE: [number, number, number] = [107, 107, 117];

// ═══════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════

export default function HeroSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    // Tracks the last dispatched "final frame reached" state so we only
    // fire the navbar event on actual transitions, not every scroll tick.
    const heroCompleteRef = useRef(false);

    useEffect(() => {
        const container = scrollRef.current;
        const frame = frameRef.current;
        const overlay = overlayRef.current;
        if (!container || !frame || !overlay) return;

        const onScroll = () => {
            const rect = container.getBoundingClientRect();
            const scrollable = container.offsetHeight - window.innerHeight;

            // ── 1. Sticky-via-fixed visibility ────────────────────
            const past = rect.bottom <= 0;
            frame.style.visibility = past ? 'hidden' : 'visible';
            frame.style.pointerEvents = past ? 'none' : '';

            // ── 2. Text color transition ──────────────────────────
            // t = 0 → white text (normal)
            // t = 1 → dark text (last frame reached)
            if (scrollable <= 0) return;
            const progress = Math.max(0, Math.min(1, -rect.top / scrollable));
            const frameF = progress * (FRAME_COUNT - 1);
            const tStart = FRAME_COUNT - 1 - TEXT_TRANSITION_FRAMES;
            const t = Math.max(0, Math.min(1,
                (frameF - tStart) / TEXT_TRANSITION_FRAMES
            ));

            // Headline: white → ink900
            overlay.style.setProperty('--hero-headline-color',
                `rgb(${lerp(WHITE[0], INK[0], t)},${lerp(WHITE[1], INK[1], t)},${lerp(WHITE[2], INK[2], t)})`
            );

            // SubCopy: rgba(255,255,255,0.6) → neutral600
            // Lerp both RGB and alpha together for a natural fade
            overlay.style.setProperty('--hero-sub-color',
                `rgba(${lerp(WHITE[0], SLATE[0], t)},${lerp(WHITE[1], SLATE[1], t)},${lerp(WHITE[2], SLATE[2], t)},${(0.6 + 0.4 * t).toFixed(3)})`
            );

            // ── 3. Reveal Hero content only on the final frame ────
            // 0.999 instead of 1 to absorb sub-pixel float rounding —
            // without it, the reveal can flicker right at the boundary.
            const isComplete = progress >= 0.999;

            overlay.style.opacity = isComplete ? '1' : '0';
            overlay.style.pointerEvents = isComplete ? 'auto' : 'none';

            // ── 4. Notify the navbar — only on actual state change ──
            // Navbar lives outside this component, so a custom window
            // event is the least invasive way to reach it without
            // editing Navbar.tsx directly. See integration snippet.
            if (isComplete !== heroCompleteRef.current) {
                heroCompleteRef.current = isComplete;
                window.dispatchEvent(
                    new CustomEvent('hero-complete-change', { detail: { complete: isComplete } })
                );
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <ScrollContainer ref={scrollRef} id="home">
            <StickyFrame ref={frameRef}>

                {/* ── Canvas layer ── */}
                <CanvasLayer>
                    <ImageSequenceCanvas
                        desktopFrames={DESKTOP_FRAMES}
                        containerRef={scrollRef}
                        objectFit="cover"
                    />
                </CanvasLayer>

                {/* ── Text overlay ── */}
                <ContentOverlay ref={overlayRef}>
                    <Eyebrow component="p">Tresmind Solutions</Eyebrow>

                    <Headline component="h1">
                        Ideas,<br />refracted.
                    </Headline>

                    <SubCopy>
                        We turn light into language — shaping brands, products, and
                        digital experiences for those who see further.
                    </SubCopy>

                    <CtaButton href="#contact">
                        Start a project&nbsp;&nbsp;→
                    </CtaButton>
                </ContentOverlay>

            </StickyFrame>
        </ScrollContainer>
    );
}