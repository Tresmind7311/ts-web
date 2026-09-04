'use client';

import { useRef, useEffect } from 'react';
import { styled, alpha, keyframes } from '@mui/material/styles';
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

// ═══════════════════════════════════════════════════════════════════
// Entrance animation
// Elements stagger in on mount. `both` fill-mode means they start
// from the `from` state even before the delay fires.
// ═══════════════════════════════════════════════════════════════════

const fadeSlideIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(22px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

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
    pointerEvents: 'auto',
    maxWidth: '1280px',
    margin: 'auto',
    // Visible from the start. JS only sets this to 0 at the end trigger.
    opacity: 1,
    transition: `opacity 600ms ${EASE}`,
}));

const Eyebrow = styled(Typography)({
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: '11px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: tokens.color.uv300,
    marginBottom: '24px',
    // First element in — appears almost immediately
    animation: `${fadeSlideIn} 0.8s ${EASE} 0.05s both`,
});

const Headline = styled(Typography)(({ theme }) => ({
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 'clamp(44px, 7vw, 96px)',
    lineHeight: 0.95,
    letterSpacing: '-0.04em',
    color: tokens.color.neutral0,
    marginBottom: '28px',
    animation: `${fadeSlideIn} 0.9s ${EASE} 0.22s both`,
    [theme.breakpoints.down('md')]: {
        marginBottom: '20px',
    },
}));

const SubCopy = styled(Typography)(({ theme }) => ({
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    fontSize: 'clamp(15px, 1.4vw, 18px)',
    lineHeight: 1.65,
    color: alpha(tokens.color.neutral0, 0.6),
    maxWidth: '380px',
    marginBottom: '40px',
    animation: `${fadeSlideIn} 0.8s ${EASE} 0.42s both`,
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
    animation: `${fadeSlideIn} 0.8s ${EASE} 0.62s both`,
    transition: `transform ${tokens.motion.base} ${tokens.motion.ease},
                 box-shadow ${tokens.motion.base} ${tokens.motion.ease}`,
    '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: `0 12px 32px ${alpha(tokens.color.ink900, 0.5)}`,
    },
    '&:active': { transform: 'translateY(0)' },
});

// ═══════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════

export default function HeroSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const heroCompleteRef = useRef(false);

    useEffect(() => {
        const container = scrollRef.current;
        const frame = frameRef.current;
        const overlay = overlayRef.current;
        if (!container || !frame || !overlay) return;

        const onScroll = () => {
            const rect = container.getBoundingClientRect();
            const scrollable =
                container.offsetHeight - window.innerHeight;

            // ── 1. Sticky-via-fixed visibility ────────────────────
            const past = rect.bottom <= 0;
            frame.style.visibility = past ? 'hidden' : 'visible';
            frame.style.pointerEvents = past ? 'none' : '';

            if (scrollable <= 0) return;

            const progress = Math.max(
                0,
                Math.min(1, -rect.top / scrollable),
            );

            // ── 2. Reverse trigger ────────────────────────────────
            // Content is visible from the start (opacity: 1 in CSS).
            // At the point where it previously appeared, it now hides.
            const isComplete = progress >= 0.999;

            overlay.style.opacity = isComplete ? '0' : '1';
            overlay.style.pointerEvents = isComplete
                ? 'none'
                : 'auto';

            // ── 3. Notify navbar on state change ──────────────────
            if (isComplete !== heroCompleteRef.current) {
                heroCompleteRef.current = isComplete;
                window.dispatchEvent(
                    new CustomEvent('hero-complete-change', {
                        detail: { complete: isComplete },
                    }),
                );
            }
        };

        window.addEventListener('scroll', onScroll, {
            passive: true,
        });
        onScroll();
        return () =>
            window.removeEventListener('scroll', onScroll);
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

                {/* ── Text overlay — visible immediately, exits at trigger ── */}
                <ContentOverlay ref={overlayRef}>
                    <Eyebrow component={'p' as React.ElementType}>
                        Tresmind Solutions
                    </Eyebrow>

                    <Headline component={'h1' as React.ElementType}>
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