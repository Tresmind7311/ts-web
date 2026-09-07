'use client';

import { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { gsap } from '@/lib/gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ─── Video config ─────────────────────────────────────────────────────────────
const VIDEO_SRC = '/videos/footer-video/footer_Rotating_crystal.mp4';

// ─── Entrance animation config ────────────────────────────────────────────────
const SLOT_COUNT = 6;
const SLOT_STAGGER = 0.3;
const SLOT_DURATION = 0.7;
const LIFT_PX = 40;

// ─── Copy ─────────────────────────────────────────────────────────────────────
const NAV_LINKS = ['Work', 'Services', 'Lab', 'Testimonials', 'Contact'];
const SOCIAL_LINKS = ['Twitter', 'LinkedIn', 'Dribbble'];
const EMAIL = 'hello@tresmind.com';
const YEAR = new Date().getFullYear();

// ─── Styles ───────────────────────────────────────────────────────────────────
const Root = styled('section')({
    position: 'relative',
    height: '100vh',
    overflow: 'hidden',
    background: '#0B0B0B',
});

const VideoLayer = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    background: '#0B0B0B',
});

const BackgroundVideo = styled('video')({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)',
    willChange: 'transform',
});

const Scrim = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    background:
        'linear-gradient(to bottom, transparent 12%, #0f172a8c 42%, #1e293b86 100%)',
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
    color: '#F6F5F2',
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
export default function FooterVideoSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const slotRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const slots = slotRefs.current.filter(
            (el): el is HTMLDivElement => Boolean(el)
        );

        if (slots.length !== SLOT_COUNT) return;

        const entranceTimeline = gsap.timeline({
            paused: true,
            defaults: {
                duration: SLOT_DURATION,
                ease: 'power3.out',
            },
        });

        entranceTimeline.to(slots, {
            opacity: 1,
            y: 0,
            stagger: SLOT_STAGGER,
        });

        const entranceTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                entranceTimeline.play();
            },
        });

        return () => {
            entranceTrigger.kill();
            entranceTimeline.kill();
        };
    }, []);

    const slot = (i: number) => (el: HTMLDivElement | null) => {
        slotRefs.current[i] = el;
    };

    return (
        <Root ref={sectionRef} id="contact">

            {/* ── Video background ────────────────────────────────────────── */}
            <VideoLayer>
                <BackgroundVideo
                    src={VIDEO_SRC}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                    tabIndex={-1}
                />
            </VideoLayer>

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
