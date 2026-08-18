'use client';

import { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import gsap from '@/lib/gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import FrameCanvas, { type FrameCanvasHandle } from '@/components/canvas/FrameCanvas';

// ─── Frame config ─────────────────────────────────────────────────────────────
// ponytail: Hero frames used as placeholder — swap path + count when footer
// sequence arrives. Only these two constants need changing.
const FRAME_COUNT = 151;
const FRAMES_BASE = '/frames/TS-footer-Video/Desktop/footer_d';
const DESKTOP_FRAMES = Array.from(
    { length: FRAME_COUNT },
    (_, i) => `${FRAMES_BASE}_${String(i + 1).padStart(5, '0')}.webp`
);

// ─── Scroll config ────────────────────────────────────────────────────────────
/**
 * Total pinned scroll = TOTAL_SCROLL_VH × window.innerHeight.
 * Phase 1 (0 → CANVAS_THRESHOLD): canvas plays through all frames.
 * Phase 2 (CANVAS_THRESHOLD → 1): content slots animate in, canvas frozen on last frame.
 */
const TOTAL_SCROLL_VH = 5;    // ×100vh of pinned scroll
const CANVAS_THRESHOLD = 0.65; // canvas done at 65 % of total scroll

/**
 * Slot stagger: slot i starts animating at contentProgress = i × SLOT_STEP,
 * finishes SLOT_DURATION later. Slots overlap slightly → cascade effect.
 */
const SLOT_COUNT = 6;
const SLOT_STEP = 0.14;  // 6 slots × 0.14 → last starts at 0.70
const SLOT_DURATION = 0.22;  // each slot takes 22 % of content phase

const LIFT_PX = 40; // translateY starting offset (px)

// ─── Copy ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ['Work', 'Services', 'Lab', 'Testimonials', 'Contact'];
const SOCIAL_LINKS = ['Twitter', 'LinkedIn', 'Dribbble'];
const EMAIL = 'hello@tresmind.com';
const YEAR = new Date().getFullYear();

// ─── Styles ───────────────────────────────────────────────────────────────────
const Root = styled('section')({
    position: 'relative',
    height: '100vh',          // Conflict rule §8: pinned section = 100vh only
    overflow: 'hidden',
    background: '#12121A',    // ink900 — shown while first frame loads
});

const CanvasLayer = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 0,
});

/**
 * Bottom-heavy gradient scrim — keeps upper canvas visible but ensures
 * footer text on the lower half is always legible regardless of frame content.
 */
const Scrim = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    background:
        'linear-gradient(to bottom, transparent 12%, rgba(18,18,26,0.45) 42%, rgba(18,18,26,0.94) 100%)',
    pointerEvents: 'none',
});

const ContentWrap = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '72px 48px',
    gap: '28px',
    textAlign: 'center',
});

/** Each animated slot starts invisible and lifted; GSAP drives opacity + translateY. */
const AnimSlot = styled('div')({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    opacity: 0,
    transform: `translateY(${LIFT_PX}px)`,
    willChange: 'opacity, transform',
});

const Eyebrow = styled('span')({
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(246,245,242,0.40)',
    fontFamily: 'var(--font-geist-mono, ui-monospace, monospace)',
});

const Headline = styled('h2')({
    margin: 0,
    fontSize: 'clamp(44px, 7.5vw, 118px)',
    fontWeight: 800,
    lineHeight: 1.0,
    letterSpacing: '-0.03em',
    color: '#F6F5F2',         // neutral50
    maxWidth: '17ch',
    textAlign: 'center',
});

const SubHead = styled('p')({
    margin: 0,
    fontSize: 'clamp(14px, 1.15vw, 18px)',
    fontWeight: 400,
    lineHeight: 1.7,
    color: 'rgba(246,245,242,0.52)',
    maxWidth: '500px',
    textAlign: 'center',
});

const FooterRule = styled('div')({
    width: '100%',
    maxWidth: '820px',
    height: '1px',
    background: 'rgba(246,245,242,0.10)',
});

const NavRow = styled('nav')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '10px 32px',
});

const NavLink = styled('a')({
    fontSize: '13px',
    fontWeight: 500,
    letterSpacing: '0.05em',
    color: 'rgba(246,245,242,0.55)',
    textDecoration: 'none',
    transition: 'color 180ms',
    '&:hover': { color: '#F6F5F2' },
});

const BottomRow = styled('div')({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px 28px',
});

const BottomLink = styled('a')({
    fontSize: '12px',
    fontWeight: 400,
    letterSpacing: '0.03em',
    color: 'rgba(246,245,242,0.38)',
    textDecoration: 'none',
    transition: 'color 180ms',
    '&:hover': { color: 'rgba(246,245,242,0.7)' },
});

const Copyright = styled('span')({
    fontSize: '12px',
    color: 'rgba(246,245,242,0.25)',
    letterSpacing: '0.02em',
});

// ─── Component ────────────────────────────────────────────────────────────────
export default function FooterSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const frameCanRef = useRef<FrameCanvasHandle>(null);
    // Direct refs for DOM mutation — no React re-render per scroll tick
    const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const scrollPx = TOTAL_SCROLL_VH * window.innerHeight;

        const st = ScrollTrigger.create({
            trigger: section,
            pin: true,
            end: `+=${scrollPx}`,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: ({ progress: p }) => {
                // ── Phase 1: canvas ─────────────────────────────────────────────
                // Clamp so canvas stays on last frame once threshold is crossed
                frameCanRef.current?.setProgress(Math.min(p / CANVAS_THRESHOLD, 1));

                // ── Phase 2: content ────────────────────────────────────────────
                // contentP = 0 until canvas threshold, then 0→1 over remaining scroll
                const contentP = Math.max(0, (p - CANVAS_THRESHOLD) / (1 - CANVAS_THRESHOLD));

                slotRefs.current.forEach((el, i) => {
                    if (!el) return;
                    const start = i * SLOT_STEP;
                    const ip = Math.max(0, Math.min(1, (contentP - start) / SLOT_DURATION));
                    el.style.opacity = String(ip);
                    el.style.transform = `translateY(${(1 - ip) * LIFT_PX}px)`;
                });
            },
        });

        return () => st.kill();
    }, []);

    // Shorthand: assign slotRefs by index
    const slot = (i: number) => (el: HTMLDivElement | null) => {
        slotRefs.current[i] = el;
    };

    return (
        <Root ref={sectionRef} id="contact">

            {/* ── Canvas background ───────────────────────────────────────── */}
            <CanvasLayer>
                <FrameCanvas ref={frameCanRef} frames={DESKTOP_FRAMES} />
            </CanvasLayer>

            {/* ── Gradient scrim ──────────────────────────────────────────── */}
            <Scrim />

            {/* ── Animated content ────────────────────────────────────────── */}
            <ContentWrap>

                {/* Slot 0 — eyebrow */}
                <AnimSlot ref={slot(0)}>
                    <Eyebrow>Tresmind Studio</Eyebrow>
                </AnimSlot>

                {/* Slot 1 — main headline */}
                <AnimSlot ref={slot(1)} style={{ marginTop: '-4px' }}>
                    <Headline>Let&rsquo;s build something extraordinary.</Headline>
                </AnimSlot>

                {/* Slot 2 — subtitle */}
                <AnimSlot ref={slot(2)}>
                    <SubHead>
                        We help ambitious brands transform ideas into unforgettable digital experiences.
                    </SubHead>
                </AnimSlot>

                {/* Slot 3 — divider */}
                <AnimSlot ref={slot(3)} style={{ margin: '4px 0' }}>
                    <FooterRule />
                </AnimSlot>

                {/* Slot 4 — nav links */}
                <AnimSlot ref={slot(4)}>
                    <NavRow aria-label="Footer navigation">
                        {NAV_LINKS.map((label) => (
                            <NavLink key={label} href={`#${label.toLowerCase()}`}>
                                {label}
                            </NavLink>
                        ))}
                    </NavRow>
                </AnimSlot>

                {/* Slot 5 — contact + social + copyright */}
                <AnimSlot ref={slot(5)}>
                    <BottomRow>
                        <BottomLink href={`mailto:${EMAIL}`}>{EMAIL}</BottomLink>
                        {SOCIAL_LINKS.map((s) => (
                            <BottomLink key={s} href="#">{s}</BottomLink>
                        ))}
                        <Copyright>© {YEAR} Tresmind. All rights reserved.</Copyright>
                    </BottomRow>
                </AnimSlot>

            </ContentWrap>
        </Root>
    );
}