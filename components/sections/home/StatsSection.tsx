'use client';

import { useRef, useEffect } from 'react';
import WaterDistortionOverlay from '@/components/canvas/WaterDistortionOverlay';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import ImageSequenceCanvas from '@/components/canvas/ImageSequenceCanvas';
import { generateFrameUrls } from '@/lib/frameUtils';
import { tokens } from '@/theme/theme';

// ─── Frame config ─────────────────────────────────────────────────
const FRAME_COUNT = 357;
const DESKTOP_FRAMES = generateFrameUrls(
    '/frames/Stats-section/desktop/stats_d_{n}.webp', 1, FRAME_COUNT, 5,
);

// ─── Section / timeline config ────────────────────────────────────
const SCROLL_HEIGHT = '500vh';
const TL_DUR = 10;

const T = {
    ch2: 1.2,
    ch3: 4.0,
    ch4: 6.8,
};

const FADE = 0.45;

// ═══════════════════════════════════════════════════════════════════
// Styled components (unchanged)
// ═══════════════════════════════════════════════════════════════════

const ScrollContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    height: SCROLL_HEIGHT,
});

const StickyFrame = styled(Box)({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    background: tokens.color.ink900,
});

const CanvasLayer = styled(Box)({
    position: 'absolute',
    inset: 0,
});

const Screen = styled(Box)({
    position: 'absolute',
    inset: 0,
    display: 'flex',
    flexDirection: 'column',
});

const S1Wrap = styled(Screen)({
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 24px',
});

const DecorLine = styled(Box)({
    width: 1,
    height: 60,
    background: alpha(tokens.color.neutral0, 0.25),
    marginBottom: '20px',
    alignSelf: 'center',
});

const S2Wrap = styled(Screen)(({ theme }) => ({
    justifyContent: 'center',
    padding: '0 40px',
    [theme.breakpoints.up('md')]: { padding: '0 80px' },
}));

const S3Wrap = styled(Screen)(({ theme }) => ({
    justifyContent: 'center',
    padding: '0 40px',
    [theme.breakpoints.up('md')]: { padding: '0 80px' },
}));

const S4Wrap = styled(Screen)({
    position: 'absolute',
    inset: 0,
});

const Eyebrow = styled(Typography)({
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: '11px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: tokens.color.uv300,
    marginBottom: '20px',
});

const ChapterHeadline = styled('h2')(({ theme }) => ({
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 'clamp(40px, 6.5vw, 88px)',
    lineHeight: 1.0,
    letterSpacing: '-0.035em',
    color: tokens.color.neutral0,
    margin: 0,
    marginBottom: '28px',
    [theme.breakpoints.down('md')]: { marginBottom: '16px' },
}));

const ChapterBody = styled('p')(({ theme }) => ({
    fontFamily: 'var(--font-body)',
    fontWeight: 400,
    fontSize: 'clamp(15px, 1.3vw, 18px)',
    lineHeight: 1.7,
    color: alpha(tokens.color.neutral0, 0.6),
    margin: 0,
    maxWidth: 640,
    [theme.breakpoints.down('md')]: { maxWidth: '90vw' },
}));

const StatNumber = styled('div')(({ theme }) => ({
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 'clamp(88px, 14vw, 180px)',
    lineHeight: 0.9,
    letterSpacing: '-0.04em',
    color: tokens.color.neutral0,
    marginBottom: '16px',
    [theme.breakpoints.down('md')]: { fontSize: 'clamp(64px, 18vw, 120px)' },
}));

const StatAccent = styled('span')({
    color: tokens.color.uv300,
});

const StatLabel = styled('p')({
    fontFamily: 'var(--font-body)',
    fontWeight: 600,
    fontSize: '11px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: alpha(tokens.color.neutral0, 0.45),
    margin: 0,
});

const StatBlock = styled(Box)<{
    vpos: 'top' | 'bottom';
    hpos: 'left' | 'right';
}>(({ vpos, hpos, theme }) => ({
    position: 'absolute',
    [vpos === 'top' ? 'top' : 'bottom']: 'clamp(60px, 15vh, 140px)',
    [hpos === 'left' ? 'left' : 'right']: 'clamp(32px, 6vw, 96px)',
    textAlign: hpos === 'right' ? 'right' : 'left',
    [theme.breakpoints.down('md')]: {
        [vpos === 'top' ? 'top' : 'bottom']: '80px',
        [hpos === 'left' ? 'left' : 'right']: '24px',
    },
}));

// ═══════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════

export default function StatsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasLayerRef = useRef<HTMLDivElement>(null);
    const frameRef = useRef<HTMLDivElement>(null);

    const s1Ref = useRef<HTMLDivElement>(null);
    const s2Ref = useRef<HTMLDivElement>(null);
    const s3Ref = useRef<HTMLDivElement>(null);
    const s4Ref = useRef<HTMLDivElement>(null);

    const satRef = useRef<HTMLSpanElement>(null);
    const projRef = useRef<HTMLSpanElement>(null);
    const countryRef = useRef<HTMLSpanElement>(null);

    const satAnimated = useRef(false);
    const projAnimated = useRef(false);
    const countryAnimated = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        const frame = frameRef.current;
        const s1 = s1Ref.current;
        const s2 = s2Ref.current;
        const s3 = s3Ref.current;
        const s4 = s4Ref.current;
        if (!container || !frame || !s1 || !s2 || !s3 || !s4) return;

        const c1 = { val: 0 };
        const c2 = { val: 0 };
        const c3 = { val: 0 };

        gsap.set([s1, s2, s3, s4], { opacity: 0, y: 24 });

        const ctx = gsap.context(() => {

            gsap.to(s1, {
                opacity: 1,
                y: 0,
                duration: 1.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: container,
                    start: 'top 85%',
                    once: true,
                },
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => {
                        const units = self.progress * TL_DUR;

                        if (!satAnimated.current && units >= T.ch3 + FADE * 0.5) {
                            satAnimated.current = true;
                            gsap.to(c1, {
                                val: 98, duration: 1.1, ease: 'power2.out',
                                onUpdate: () => {
                                    if (satRef.current) satRef.current.textContent = String(Math.round(c1.val));
                                },
                            });
                        }

                        if (!projAnimated.current && units >= T.ch4 + FADE * 0.5) {
                            projAnimated.current = true;
                            gsap.to(c2, {
                                val: 150, duration: 1.3, ease: 'power2.out',
                                onUpdate: () => {
                                    if (projRef.current) projRef.current.textContent = String(Math.round(c2.val));
                                },
                            });
                        }

                        if (!countryAnimated.current && units >= T.ch4 + FADE * 0.5 + 0.3) {
                            countryAnimated.current = true;
                            gsap.to(c3, {
                                val: 12, duration: 1.0, ease: 'power2.out',
                                onUpdate: () => {
                                    if (countryRef.current) countryRef.current.textContent = String(Math.round(c3.val));
                                },
                            });
                        }
                    },
                },
                defaults: { ease: 'power2.inOut' },
                duration: TL_DUR,
            });

            tl.to(s1, { opacity: 0, y: -24, duration: FADE }, T.ch2)
                .to(s2, { opacity: 1, y: 0, duration: FADE }, T.ch2)
                .to(s2, { opacity: 0, y: -24, duration: FADE }, T.ch3)
                .to(s3, { opacity: 1, y: 0, duration: FADE }, T.ch3)
                .to(s3, { opacity: 0, y: -24, duration: FADE }, T.ch4)
                .to(s4, { opacity: 1, y: 0, duration: FADE }, T.ch4);

        }, container);

        // ── Visibility gate ────────────────────────────────────────────────────
        // Previously: window scroll listener calling getBoundingClientRect()
        // on every scroll event — a forced layout read per tick.
        //
        // Now: IntersectionObserver fires only on enter/exit (not per-scroll),
        // zero layout cost during active scrolling.
        const io = new IntersectionObserver(([entry]) => {
            const visible = entry.isIntersecting;
            frame.style.visibility = visible ? 'visible' : 'hidden';
            frame.style.pointerEvents = visible ? '' : 'none';
        }, { threshold: 0 });
        io.observe(container);

        return () => {
            ctx.revert();
            io.disconnect();
        };
    }, []);

    return (
        <ScrollContainer ref={containerRef} id="studio">
            <StickyFrame ref={frameRef}>

                <CanvasLayer ref={canvasLayerRef}>
                    <ImageSequenceCanvas
                        desktopFrames={DESKTOP_FRAMES}
                        containerRef={containerRef}
                        objectFit="cover"
                    />
                    {/*
                      containerRef passed so WaterDistortionOverlay can observe
                      the scroll container (not the fixed frame) for visibility.
                      This lets it correctly pause WebGL rendering when the
                      section is off-screen.
                    */}
                    <WaterDistortionOverlay
                        sourceRef={canvasLayerRef}
                        containerRef={containerRef}
                    />
                </CanvasLayer>

                <S1Wrap ref={s1Ref}>
                    <DecorLine />
                    <Eyebrow>Chapter 01 — The Prism</Eyebrow>
                    <ChapterHeadline>
                        One idea, a<br />thousand facets.
                    </ChapterHeadline>
                    <ChapterBody style={{ textAlign: 'center', maxWidth: 680 }}>
                        We are Tresmind Solutions — a creative technology studio.
                        Strategy, design, and engineering pass through a single lens
                        until your idea becomes an experience people feel.
                    </ChapterBody>
                </S1Wrap>

                <S2Wrap ref={s2Ref}>
                    <Eyebrow>Chapter 02 — In Numbers</Eyebrow>
                    <ChapterHeadline>Key Facts</ChapterHeadline>
                    <ChapterBody>
                        A decade of light, measured. What remains when the noise burns away.
                    </ChapterBody>
                </S2Wrap>

                <S3Wrap ref={s3Ref}>
                    <StatNumber>
                        <span ref={satRef}>0</span>
                        <StatAccent>%</StatAccent>
                    </StatNumber>
                    <StatLabel>Client Satisfaction</StatLabel>
                </S3Wrap>

                <S4Wrap ref={s4Ref}>
                    <StatBlock vpos="top" hpos="right">
                        <StatNumber>
                            <span ref={projRef}>0</span>
                            <StatAccent>+</StatAccent>
                        </StatNumber>
                        <StatLabel>Projects Delivered</StatLabel>
                    </StatBlock>

                    <StatBlock vpos="bottom" hpos="left">
                        <StatNumber style={{ fontSize: 'clamp(80px,12vw,160px)' }}>
                            <span ref={countryRef}>0</span>
                            <StatAccent>+</StatAccent>
                        </StatNumber>
                        <StatLabel>Countries Served</StatLabel>
                    </StatBlock>
                </S4Wrap>

            </StickyFrame>
        </ScrollContainer>
    );
}