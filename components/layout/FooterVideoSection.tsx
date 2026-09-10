'use client';

import { useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import { gsap } from '@/lib/gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// ─── Asset config ─────────────────────────────────────────────────────────────
const GIF_SRC = '/rotating_crystal.gif';
const BG_IMAGE_SRC = '/footer-bg.jpg'; // set to '' to fall back to solid colour

// ─── Entrance animation config ────────────────────────────────────────────────
const SLOT_COUNT = 7;
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
    background: '#000000',
    borderTopLeftRadius:'65px',
    borderTopRightRadius:'65px',
});

/*
 * Background layer — shows BG_IMAGE_SRC when set,
 * otherwise falls back to the Root's solid colour.
 */
const BgLayer = styled('div')<{ $src: string }>(({ $src }) => ({
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    background: '#000000',
    ...$src && {
        backgroundImage: `url("${$src}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
    },
}));

/* GIF wrapper — sits above the eyebrow in the content area */
const InlineGifWrap = styled('div')({
    width: 'clamp(180px, 20vw, 300px)',
    borderRadius: 'clamp(12px, 1.4vw, 18px)',
    overflow: 'hidden',

    '@media (max-width: 600px)': {
        width: 'clamp(100px, 32vw, 160px)',
    },
});

const InlineGif = styled('img')({
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    pointerEvents: 'none',
});

const Scrim = styled('div')({
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    background: 'linear-gradient(to top, transparent 12%, #020305d3 82%, #000000 100%)',
    pointerEvents: 'none',
    borderTopRightRadius: '70px',
    borderTopLeftRadius: '70px',
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
    fontFamily: 'var(--font-mono)',
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
            defaults: { duration: SLOT_DURATION, ease: 'power3.out' },
        });

        entranceTimeline.to(slots, { opacity: 1, y: 0, stagger: SLOT_STAGGER });

        const entranceTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'top 85%',
            once: true,
            onEnter: () => entranceTimeline.play(),
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

            {/* ── Background (colour or image) ──────────────────────── */}
            <BgLayer $src={BG_IMAGE_SRC} aria-hidden="true" />

            {/* ── Gradient scrim ────────────────────────────────────── */}
            <Scrim />

            {/* ── Animated content ──────────────────────────────────── */}
            <ContentWrap>

                {/* Slot 0 — rotating crystal GIF */}
                <AnimSlot ref={slot(0)}>
                    <InlineGifWrap>
                        <InlineGif
                            src={GIF_SRC}
                            alt="Rotating crystal"
                            aria-hidden="true"
                        />
                    </InlineGifWrap>
                </AnimSlot>

                {/* Slot 1 — eyebrow */}
                <AnimSlot ref={slot(1)}>
                    <Eyebrow>Tresmind Studio</Eyebrow>
                </AnimSlot>

                {/* Slot 2 — main headline */}
                <AnimSlot ref={slot(2)} style={{ marginTop: '-4px' }}>
                    <Headline>Let&rsquo;s build something extraordinary.</Headline>
                </AnimSlot>

                {/* Slot 3 — subtitle */}
                <AnimSlot ref={slot(3)}>
                    <SubHead>
                        We help ambitious brands transform ideas into unforgettable digital experiences.
                    </SubHead>
                </AnimSlot>

                {/* Slot 4 — divider */}
                <AnimSlot ref={slot(4)} style={{ margin: '4px 0' }}>
                    <FooterRule />
                </AnimSlot>

                {/* Slot 5 — nav links */}
                <AnimSlot ref={slot(5)}>
                    <NavRow aria-label="Footer navigation">
                        {NAV_LINKS.map((label) => (
                            <NavLink key={label} href={`#${label.toLowerCase()}`}>
                                {label}
                            </NavLink>
                        ))}
                    </NavRow>
                </AnimSlot>

                {/* Slot 6 — contact + social + copyright */}
                <AnimSlot ref={slot(6)}>
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