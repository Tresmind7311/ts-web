'use client';

import { useRef, useEffect, useCallback } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { tokens } from '@/theme/theme';

// ─── Card data ────────────────────────────────────────────────────
const REEL_CARDS = [
    { image: 'UIUX-Design.jpg', number: '01', heading: 'UI/UX Design', description: 'Interfaces shaped around how people actually move.' },
    { image: 'Brand-Identity.jpg', number: '02', heading: 'Brand Identity', description: 'Systems of type, color, and voice that endure.' },
    { image: 'Web-Design-and-Dev.jpg', number: '03', heading: 'Web Design & Development', description: 'Sites engineered to feel as good as they look.' },
    { image: 'Motion-Graphics.jpg', number: '04', heading: 'Motion Graphics', description: 'Movement with intent, never decoration.' },
    { image: 'Creative-Strategy.jpg', number: '05', heading: 'Creative Strategy', description: 'Decisions grounded in research, not fashion.' },
    { image: 'Ai.jpg', number: '06', heading: 'AI-Powered Creative', description: 'New tools, applied with editorial judgement.' },

    // { image: '...', number: '07', heading: 'Cinematic Storytelling', description: '...' },
    // { image: '...', number: '08', heading: 'Commercial Production',  description: '...' },
];

// const FALLBACK_IMG = '...';
// const BG_IMG       = '...';

// ─── Config ───────────────────────────────────────────────────────
const ARC_PX = 280;   // parabolic arc depth (px)
const SCROLL_PER_STEP = 700;   // px of scroll per card step — raise to slow down
const SCRUB_LAG = 1.2;   // GSAP scrub seconds — higher = floatier

// ═══════════════════════════════════════════════════════════════════
// Styled components
// ═══════════════════════════════════════════════════════════════════

/** Outer trigger element — height is auto; GSAP adds pinSpacing below it */
const SectionWrapper = styled(Box)({
    position: 'relative',
    width: '100%',
    userSelect: 'none',
});

/** GSAP pins this to the viewport while the section is active */
const StickyContent = styled(Box)({
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: tokens.color.neutral0,
    cursor: 'grab',
    '&:active': { cursor: 'grabbing' },
});

const GridBackground = styled(Box)({
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    backgroundImage: [
        'linear-gradient(to right,  rgba(0,0,0,0.05) 1px, transparent 1px)',
        'linear-gradient(to bottom, rgba(2,2,2,0.05) 1px, transparent 1px)',
    ].join(', '),
    backgroundSize: '68px 68px',
    WebkitMaskImage: 'radial-gradient(ellipse 80% 65% at 50% 0%, #000 55%, transparent 100%)',
    maskImage: 'radial-gradient(ellipse 80% 65% at 50% 0%, #000 55%, transparent 100%)',
    pointerEvents: 'none',
});

const SectionInner = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    width: '100%',
    height: '100%',
    overflow: 'visible',
    display: 'flex',
    flexDirection: 'column',
    padding: '100px 15px 60px',
    [theme.breakpoints.up('md')]: { padding: '120px 15px 60px' },
}));

const HeaderBox = styled(Box)({
    position: 'relative',
    zIndex: 50,
    marginBottom: '20px',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

// const SectionTitle = styled(Typography)(({ theme }) => ({
//     color: tokens.color.ink900, fontFamily: 'var(--font-display)', fontWeight: 700,
//     letterSpacing: '2px', textTransform: 'uppercase', lineHeight: 1, margin: 0,
//     fontSize: '60px',
//     [theme.breakpoints.up('md')]: { fontSize: '100px' },
// }));
// const TitleUnderline = styled(Box)(() => ({
//     width: 90, height: 2, background: tokens.color.ink900, marginTop: '8px', marginBottom: '15px',
// }));
// const SectionSubtitle = styled(Typography)(({ theme }) => ({
//     color: alpha(tokens.color.neutral700, 0.9), fontFamily: 'var(--font-body)', fontWeight: 500,
//     maxWidth: 900, lineHeight: 1.4, marginBottom: '20px', textAlign: 'center', fontSize: '15px',
//     [theme.breakpoints.up('md')]: { fontSize: '24px' },
// }));
// const ExploreButton = styled('a')(() => ({
//     display: 'inline-flex', alignItems: 'center', gap: '10px', background: tokens.color.neutral0,
//     color: tokens.color.ink900, padding: '12px 28px', fontFamily: 'var(--font-body)', fontWeight: 600,
//     fontSize: '18px', textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none',
//     borderRadius: tokens.radius.sm,
//     transition: `transform ${tokens.motion.base} ${tokens.motion.ease}, box-shadow ${tokens.motion.base} ${tokens.motion.ease}`,
//     '&:hover': { color: tokens.color.ink900, transform: 'translateY(-2px)', boxShadow: `0 10px 24px ${alpha(tokens.color.ink900, 0.45)}` },
//     '&::after': { content: '""', display: 'inline-block', width: 14, height: 14,
//         backgroundImage: `url('https://jawadsalimee.com/new-site/wp-content/uploads/2026/07/SVG-Vector.svg')`,
//         backgroundSize: 'contain', backgroundRepeat: 'no-repeat' },
// }));

const CarouselScene = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    flex: 1,
    // overflow: 'hidden',
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { height: '420px', flex: 'none' },
}));

const CarouselCard = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-112.5px',
    marginLeft: '-77.5px',
    width: '155px',
    height: '225px',
    // ── Arc transform — driven by --card-active CSS var (set each frame) ──
    // transformOrigin controls entry direction:
    //   '100% 100%' = pivot bottom-RIGHT → cards enter from bottom-LEFT (current)
    //   '0% 100%'   = pivot bottom-LEFT  → cards enter from bottom-RIGHT
    //   '50% 100%'  = symmetric fan
    // X translate sign: -800% = spread left, +800% = spread right
    transform: [
        'translate(',
        '  calc(var(--card-active, 0) * -800%),',
        '  calc(var(--card-active, 0) * 200% + var(--card-arc-y, 0px))',
        ')',
        'rotate(calc(var(--card-active, 0) * -50deg))',
    ].join(' '),
    transformOrigin: '100% 100%',
    borderRadius: tokens.radius.lg,
    overflow: 'hidden',
    background: tokens.color.neutral0,
    boxSizing: 'border-box',
    boxShadow: tokens.shadow.md,
    cursor: 'inherit',
    willChange: 'transform, opacity',
    display: 'flex',
    flexDirection: 'column',
    '&.is-active': {
        border: `3px solid ${tokens.color.ink900}`,
        boxShadow: `0 24px 64px ${alpha(tokens.color.ink900, 0.18)}, 0 0 0 1px ${alpha(tokens.color.ink900, 0.06)}`,
    },
    [theme.breakpoints.up('md')]: {
        marginTop: '-300px',
        marginLeft: '-150px',
        width: '700px',
        height: '600px',
    },
}));

const CardImageWrapper = styled(Box)(({ theme }) => ({
    flexShrink: 0,
    overflow: 'hidden',
    borderRadius: tokens.radius.md,
    margin: '6px',
    height: '55%',
    width: 'calc(100% - 12px)',
    [theme.breakpoints.up('md')]: {
        borderRadius: tokens.radius.lg,
        margin: '12px',
        height: '58%',
        width: 'calc(100% - 24px)',
    },
}));

const CardImage = styled('img')({
    width: '100%', height: '100%', objectFit: 'cover',
    display: 'block', pointerEvents: 'none', userSelect: 'none',
});

const CardContent = styled(Box)(({ theme }) => ({
    flex: 1, paddingLeft: '10px', paddingRight: '10px',
    paddingBottom: '10px', paddingTop: '6px',
    display: 'flex', flexDirection: 'column', gap: '4px',
    [theme.breakpoints.up('md')]: {
        paddingLeft: '20px', paddingRight: '20px',
        paddingBottom: '20px', paddingTop: '10px', gap: '8px',
    },
}));

const CardMeta = styled(Box)({ display: 'flex', alignItems: 'center', gap: '10px' });

const CardNumber = styled(Typography)(({ theme }) => ({
    fontFamily: 'var(--font-body)', fontWeight: 500,
    color: tokens.color.neutral500, flexShrink: 0, fontSize: '10px',
    [theme.breakpoints.up('md')]: { fontSize: '14px' },
}));

const CardDivider = styled(Box)({ flex: 1, height: 1, background: tokens.color.borderSubtle });

const CardHeading = styled(Typography)(({ theme }) => ({
    fontFamily: 'var(--font-display)', fontWeight: 700, color: tokens.color.ink900,
    lineHeight: 1.2, letterSpacing: '-0.01em', fontSize: '13px',
    [theme.breakpoints.up('md')]: { fontSize: '28px' },
}));

const CardDescription = styled(Typography)(({ theme }) => ({
    fontFamily: 'var(--font-body)', color: tokens.color.neutral600,
    lineHeight: 1.5, fontSize: '10px',
    [theme.breakpoints.up('md')]: { fontSize: '16px' },
}));

// ═══════════════════════════════════════════════════════════════════
// Component
// ═══════════════════════════════════════════════════════════════════

export default function AnimationSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const stickyRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
    const prevIntRef = useRef(-1);

    // ─── Direct render — no RAF lerp ─────────────────────────────
    // GSAP scrub provides the easing; calling renderFrame directly
    // from onUpdate gives one clean update path with no double-lag.
    const renderFrame = useCallback((progress: number) => {
        const n = REEL_CARDS.length;
        const floatActive = (progress / 100) * (n - 1);
        const intActive = Math.round(floatActive);

        cardRefs.current.forEach((card, index) => {
            if (!card) return;
            const cardActive = (index - floatActive) / n;
            const dist = Math.abs(index - floatActive);
            const zFloat = n - dist;
            const opacity = Math.max(0, zFloat / n * 3 - 2);

            card.style.zIndex = String(Math.round(zFloat));
            card.style.opacity = String(opacity);
            card.style.setProperty('--card-active', String(cardActive));
            card.style.setProperty('--card-arc-y', `${cardActive * cardActive * ARC_PX}px`);
        });

        if (intActive !== prevIntRef.current) {
            const prev = prevIntRef.current;
            if (prev >= 0) cardRefs.current[prev]?.classList.remove('is-active');
            cardRefs.current[intActive]?.classList.add('is-active');
            prevIntRef.current = intActive;
        }
    }, []);

    // ─── GSAP + drag setup ────────────────────────────────────────
    useEffect(() => {
        const section = sectionRef.current;
        const sticky = stickyRef.current;
        if (!section || !sticky) return;

        renderFrame(0); // paint initial state

        // Total scroll distance for the section.
        // GSAP pinSpacing adds this as padding below the pinned element.
        const scrollLength = SCROLL_PER_STEP * (REEL_CARDS.length - 1);

        const ctx = gsap.context(() => {
            // ── ScrollTrigger pin + progress driver ──────────────
            // Scroll drives carousel progress. scrub handles easing.
            // No wheel/scroll event captured — page scrolls freely.
            ScrollTrigger.create({
                trigger: section,
                pin: sticky,
                start: 'top top',
                end: `+=${scrollLength}`,
                pinSpacing: true,
                scrub: SCRUB_LAG,
                invalidateOnRefresh: true,
                onUpdate: (self) => renderFrame(self.progress * 100),
            });
        }, section);

        // ── Drag → page scroll ────────────────────────────────────
        // Horizontal drag on the pinned element converts to vertical
        // page scroll, which feeds GSAP naturally. No dual event systems.
        let isDragging = false;
        let lastX = 0;

        const onDown = (clientX: number) => {
            isDragging = true;
            lastX = clientX;
        };
        const onMove = (clientX: number) => {
            if (!isDragging) return;
            const dx = clientX - lastX;
            lastX = clientX;
            // Drag left (dx < 0) = advance cards = scroll page down (+y)
            window.scrollBy(0, -dx * 2.8);
        };
        const onUp = () => { isDragging = false; };

        const onMouseDown = (e: MouseEvent) => onDown(e.clientX);
        const onMouseMove = (e: MouseEvent) => onMove(e.clientX);
        const onTouchStart = (e: TouchEvent) => onDown(e.touches[0].clientX);
        const onTouchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);

        sticky.addEventListener('mousedown', onMouseDown);
        sticky.addEventListener('touchstart', onTouchStart, { passive: true });
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onUp);
        document.addEventListener('touchmove', onTouchMove, { passive: true });
        document.addEventListener('touchend', onUp);

        return () => {
            ctx.revert();
            sticky.removeEventListener('mousedown', onMouseDown);
            sticky.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onUp);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onUp);
        };
    }, [renderFrame]);

    // ─── Render ───────────────────────────────────────────────────
    return (
        <SectionWrapper ref={sectionRef} id="services">
            <StickyContent ref={stickyRef}>

                <GridBackground />

                <SectionInner>
                    <HeaderBox>
                        {/* <SectionTitle component="h2">ANIMATION</SectionTitle> */}
                        {/* <TitleUnderline /> */}
                        {/* <SectionSubtitle>Transforming Visuals Into Engaging Cinematic Stories...</SectionSubtitle> */}
                        {/* <ExploreButton href="#">EXPLORE MORE</ExploreButton> */}
                    </HeaderBox>

                    <CarouselScene>
                        {REEL_CARDS.map((card, i) => (
                            <CarouselCard
                                key={i}
                                ref={el => { cardRefs.current[i] = el; }}
                                onClick={() => {
                                    // Click advances via page scroll → GSAP picks it up
                                    const triggerTop = sectionRef.current?.getBoundingClientRect().top ?? 0;
                                    const currentScroll = window.scrollY;
                                    const targetProgress = i / (REEL_CARDS.length - 1);
                                    const scrollLength = SCROLL_PER_STEP * (REEL_CARDS.length - 1);
                                    window.scrollTo({
                                        top: currentScroll + triggerTop + targetProgress * scrollLength,
                                        behavior: 'smooth',
                                    });
                                }}
                            >
                                <CardImageWrapper>
                                    <CardImage src={card.image} alt={card.heading} draggable={false} />
                                </CardImageWrapper>

                                <CardContent>
                                    <CardMeta>
                                        <CardNumber>{card.number}</CardNumber>
                                        <CardDivider />
                                    </CardMeta>
                                    <CardHeading>{card.heading}</CardHeading>
                                    <CardDescription>{card.description}</CardDescription>
                                </CardContent>
                            </CarouselCard>
                        ))}
                    </CarouselScene>
                </SectionInner>

            </StickyContent>
        </SectionWrapper>
    );
}