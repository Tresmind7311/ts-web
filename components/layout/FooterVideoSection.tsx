'use client';

import {
    useEffect,
    useRef,
    type FormEvent,
} from 'react';
import { styled, alpha } from '@mui/material/styles';
import { gsap } from '@/lib/gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import { tokens } from '@/theme/theme';
import { PrimaryButton } from '../common/Button';

// ─── Asset config ─────────────────────────────────────────────────────────────
const GIF_SRC = '/rotating_crystal.gif';
const BG_IMAGE_SRC = '/footer-bg.jpg'; // set to '' to fall back to solid colour

// ─── Entrance animation config ────────────────────────────────────────────────
const SLOT_COUNT = 8;
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
    minHeight: '100vh',
    overflow: 'hidden',
    background: '#000000',
    borderTopLeftRadius: '65px',
    borderTopRightRadius: '65px',
});

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
    position: 'relative',
    zIndex: 2,
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '72px 48px',
    gap: '28px',
    textAlign: 'center',

    '@media (max-width: 600px)': {
        padding: '56px 20px',
        gap: '22px',
    },
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

const ContactPanel = styled('div')({
    width: '100%',
    maxWidth: '980px',
    display: 'grid',
    gridTemplateColumns: 'minmax(180px, 0.7fr) minmax(0, 2fr)',
    gap: tokens.space[8],
    alignItems: 'start',
    padding: 'clamp(20px, 2.5vw, 32px)',
    border: `1px solid ${alpha(tokens.color.neutral50, 0.14)}`,
    borderRadius: tokens.radius.xl,
    background: alpha(tokens.color.uv800, 0.16),
    backdropFilter: 'blur(14px)',
    WebkitBackdropFilter: 'blur(14px)',
    textAlign: 'left',

    '@media (max-width: 760px)': {
        gridTemplateColumns: '1fr',
        gap: tokens.space[5],
    },
});

const ContactIntro = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.space[3],
    paddingTop: tokens.space[1],
});

const ContactKicker = styled('span')({
    fontFamily: tokens.font.mono,
    fontSize: '10px',
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    color: tokens.color.uv300,
});

const ContactTitle = styled('h3')({
    margin: 0,
    fontFamily: tokens.font.display,
    fontSize: 'clamp(24px, 2.2vw, 34px)',
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: '-0.025em',
    color: tokens.color.neutral50,
});

const ContactCopy = styled('p')({
    margin: 0,
    maxWidth: '24ch',
    fontFamily: tokens.font.body,
    fontSize: '13px',
    lineHeight: 1.6,
    color: alpha(tokens.color.neutral50, 0.48),
});

const QueryForm = styled('form')({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: tokens.space[4],

    '@media (max-width: 640px)': {
        gridTemplateColumns: '1fr',
    },
});

const Field = styled('label')({
    display: 'flex',
    minWidth: 0,
    flexDirection: 'column',
    gap: tokens.space[2],
});

const FieldFull = styled(Field)({
    gridColumn: '1 / -1',
});

const FieldLabel = styled('span')({
    fontFamily: tokens.font.body,
    fontSize: '11px',
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: alpha(tokens.color.neutral50, 0.58),
});

const fieldBase = {
    width: '100%',
    minWidth: 0,
    border: `1px solid ${alpha(tokens.color.neutral50, 0.14)}`,
    borderRadius: tokens.radius.md,
    outline: 'none',
    background: alpha(tokens.color.neutral0, 0.045),
    color: tokens.color.neutral50,
    fontFamily: tokens.font.body,
    fontSize: '14px',
    lineHeight: 1.4,
    transition: [
        `border-color ${tokens.motion.base} ${tokens.motion.ease}`,
        `background ${tokens.motion.base} ${tokens.motion.ease}`,
        `box-shadow ${tokens.motion.base} ${tokens.motion.ease}`,
    ].join(', '),

    '&::placeholder': {
        color: alpha(tokens.color.neutral50, 0.28),
    },

    '&:hover': {
        borderColor: alpha(tokens.color.neutral50, 0.26),
        background: alpha(tokens.color.neutral0, 0.06),
    },

    '&:focus': {
        borderColor: tokens.color.uv300,
        background: alpha(tokens.color.neutral0, 0.07),
        boxShadow: `0 0 0 3px ${alpha(tokens.color.uv300, 0.12)}`,
    },
};

const TextInput = styled('input')({
    ...fieldBase,
    minHeight: '46px',
    padding: '11px 13px',
});

const MessageInput = styled('textarea')({
    ...fieldBase,
    minHeight: '92px',
    padding: '12px 13px',
    resize: 'vertical',
});

const FormActions = styled('div')({
    gridColumn: '1 / -1',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
});

// const SubmitButton = styled('button')({
//     minHeight: '46px',
//     padding: '12px 22px',
//     border: 0,
//     borderRadius: tokens.radius.full,
//     cursor: 'pointer',
//     color: tokens.color.neutral0,
//     fontFamily: tokens.font.body,
//     fontSize: '13px',
//     fontWeight: 700,
//     lineHeight: 1,
//     background: `linear-gradient(
//         100deg,
//         ${tokens.color.uv800} 0%,
//         ${tokens.color.uv500} 58%,
//         ${tokens.color.uv300} 100%
//     )`,
//     boxShadow: `0 10px 28px ${alpha(tokens.color.uv800, 0.32)}`,
//     transition: [
//         `transform ${tokens.motion.base} ${tokens.motion.ease}`,
//         `box-shadow ${tokens.motion.base} ${tokens.motion.ease}`,
//     ].join(', '),
//     WebkitTapHighlightColor: 'transparent',

//     '&:hover': {
//         transform: 'translateY(-1px)',
//         boxShadow: `0 14px 34px ${alpha(tokens.color.uv800, 0.40)}`,
//     },

//     '&:active': {
//         transform: 'translateY(1px) scale(0.98)',
//     },

//     '&:focus-visible': {
//         outline: `2px solid ${tokens.color.uv300}`,
//         outlineOffset: '3px',
//     },

//     '@media (max-width: 640px)': {
//         width: '100%',
//     },
// });

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

    const handleQuerySubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const name = String(formData.get('name') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();
        const message = String(formData.get('message') ?? '').trim();

        const subject = encodeURIComponent(
            `Project enquiry from ${name || 'website visitor'}`
        );
        const body = encodeURIComponent(
            [
                `Name: ${name}`,
                `Email: ${email}`,
                '',
                'Project enquiry:',
                message,
            ].join('\n')
        );

        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    };

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
                            loading="lazy"
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

                {/* Slot 4 — query form */}
                <AnimSlot ref={slot(4)}>
                    <ContactPanel>
                        <ContactIntro>
                            <ContactKicker>Get in touch</ContactKicker>
                            <ContactTitle>Tell us what you&rsquo;re building.</ContactTitle>
                            <ContactCopy>
                                Share the idea, challenge, or next move. We&rsquo;ll take it from there.
                            </ContactCopy>
                        </ContactIntro>

                        <QueryForm onSubmit={handleQuerySubmit}>
                            <Field>
                                <FieldLabel>Name</FieldLabel>
                                <TextInput
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    autoComplete="name"
                                    required
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <TextInput
                                    type="email"
                                    name="email"
                                    placeholder="you@company.com"
                                    autoComplete="email"
                                    required
                                />
                            </Field>

                            <FieldFull>
                                <FieldLabel>Project enquiry</FieldLabel>
                                <MessageInput
                                    name="message"
                                    placeholder="Tell us a little about the project, goals, or timeline..."
                                    rows={3}
                                    required
                                />
                            </FieldFull>

                            <FormActions>
                                <PrimaryButton type="submit">
                                    Send enquiry ↗
                                </PrimaryButton>
                            </FormActions>
                        </QueryForm>
                    </ContactPanel>
                </AnimSlot>

                {/* Slot 5 — divider */}
                <AnimSlot ref={slot(5)} style={{ margin: '4px 0' }}>
                    <FooterRule />
                </AnimSlot>

                {/* Slot 6 — nav links */}
                <AnimSlot ref={slot(6)}>
                    <NavRow aria-label="Footer navigation">
                        {NAV_LINKS.map((label) => (
                            <NavLink key={label} href={`#${label.toLowerCase()}`}>
                                {label}
                            </NavLink>
                        ))}
                    </NavRow>
                </AnimSlot>

                {/* Slot 7 — contact + social + copyright */}
                <AnimSlot ref={slot(7)}>
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
