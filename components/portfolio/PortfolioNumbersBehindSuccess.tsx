'use client';

import { useLayoutEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import { PrimaryButton } from '@/components/common/Button';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { tokens } from '@/theme/theme';

const COMPACT_DESKTOP = '@media (min-width: 960px) and (max-height: 849px)';

const PILLS = [
    { text: 'Strategic Agency', x: 14.7, y: 179, width: 20, angle: 12, fill: '#fff', color: '#000' },
    { text: 'Results- driven', x: 30.3, y: 177, width: 18.8, angle: -28, fill: tokens.color.uv300, color: '#000' },
    { text: 'Influential', x: 43.6, y: 110, width: 15, angle: 8, fill: tokens.color.uv800, color: '#fff' },
    { text: 'Innovation Driven', x: 45.9, y: 197, width: 20.2, angle: 5, fill: '#fff', color: '#000' },
    { text: 'Multidimensional', x: 62.4, y: 175, width: 19.5, angle: -27, fill: 'linear-gradient(110deg, #fff 0%, #169cc6 20%, #169cc6 100%)', color: '#fff' },
    { text: 'Strategic - minded', x: 77.4, y: 229, width: 20.5, angle: 8, fill: tokens.color.uv300, color: '#000' },
    { text: 'Result oriented', x: 89, y: 158, width: 18.2, angle: -6, fill: tokens.color.uv800, color: '#fff' },
] as const;

const Section = styled('section')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: tokens.color.uv800,
    backgroundImage: "url('/images/Portfolio/Numbers-Behind-Success-bg.jpg')",
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    paddingTop: 80,
    '@media (prefers-reduced-motion: no-preference)': {
        '& [data-numbers-reveal], & [data-numbers-pill]': { visibility: 'hidden' },
    },
    [COMPACT_DESKTOP]: { paddingTop: 32 },
    [theme.breakpoints.down('md')]: { paddingTop: 48 },
}));

const Inner = styled('div')(({ theme }) => ({
    width: 'calc(100% - 80px)',
    maxWidth: 1250,
    margin: '0 auto',
    [theme.breakpoints.down('md')]: { width: 'calc(100% - 48px)' },
    [theme.breakpoints.down('sm')]: { width: 'calc(100% - 40px)' },
}));

const Header = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) 262px',
    alignItems: 'start',
    gap: 48,
    [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: 24 },
}));

const Title = styled(Heading)(({ theme }) => ({
    color: tokens.color.neutral0,
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(52px, 5.28vw, 76px)',
    fontWeight: 600,
    lineHeight: 1.092,
    letterSpacing: '-0.045em',
    textTransform: 'none',
    [COMPACT_DESKTOP]: { fontSize: 52 },
    [theme.breakpoints.down('md')]: { fontSize: 48 },
    [theme.breakpoints.down('sm')]: { fontSize: 'clamp(32px, 9vw, 42px)' },
}));

const Intro = styled('p')({
    margin: '20px 0',
    fontFamily: 'var(--font-body)',
    fontSize: 18,
    lineHeight: '25px',
    color: '#87999f',
    [COMPACT_DESKTOP]: { margin: '4px 0 12px', fontSize: 16, lineHeight: '22px' },
});

const Stats = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.88fr) repeat(2, minmax(0, 1fr))',
    gap: 20,
    marginTop: 64,
    [COMPACT_DESKTOP]: { marginTop: 24 },
    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        marginTop: 32,
        gap: 16,
        '& > :first-of-type': { gridColumn: '1 / -1' },
    },
    [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' },
}));

const Stat = styled('article')(({ theme }) => ({
    minWidth: 0,
    minHeight: 330,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '30px 30px 28px',
    borderRadius: 20,
    '&:nth-of-type(1)': { backgroundColor: tokens.color.uv300, color: '#fff' },
    '&:nth-of-type(2)': { backgroundColor: '#fff', color: '#34343a' },
    '&:nth-of-type(3)': { backgroundColor: '#07146380', color: '#fff' },
    [COMPACT_DESKTOP]: { minHeight: 230, padding: 24 },
    [theme.breakpoints.down('md')]: { minHeight: 230, padding: 24 },
    [theme.breakpoints.down('sm')]: { minHeight: 190 },
}));

const Number = styled('p')(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    margin: 0,
    fontFamily: 'var(--font-hero-body)',
    fontSize: 'clamp(64px, 6.94vw, 100px)',
    fontWeight: 400,
    lineHeight: 1.2,
    letterSpacing: '-0.035em',
    '& span': { paddingTop: 2, fontSize: 40, lineHeight: 1.2, letterSpacing: 'normal' },
    [COMPACT_DESKTOP]: { fontSize: 80, '& span': { fontSize: 28 } },
    [theme.breakpoints.down('md')]: { fontSize: 64, '& span': { fontSize: 28 } },
    [theme.breakpoints.down('sm')]: { fontSize: 60, '& span': { fontSize: 24 } },
}));

const StatDescription = styled('p')({
    margin: '32px 0 0',
    fontFamily: 'var(--font-body)',
    fontSize: 16,
    lineHeight: '22px',
    '&.plans': { color: '#000' },
    '&.quality': { color: '#75808e' },
    '&.growth': { color: '#eef2fa' },
});

const PillField = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    maxWidth: 1440,
    height: 292,
    margin: '0 auto',
    [COMPACT_DESKTOP]: { height: 224 },
    [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        height: 'auto',
        padding: '40px 24px 48px',
    },
}));

const PillSlot = styled('div')(({ theme }) => ({
    position: 'absolute',
    left: 'var(--pill-x)',
    top: 'var(--pill-y)',
    width: 'var(--pill-width)',
    transform: 'translate(-50%, -50%)',
    [COMPACT_DESKTOP]: { top: 'calc(var(--pill-y) * 0.7)' },
    [theme.breakpoints.down('md')]: { position: 'relative', left: 'auto', top: 'auto', width: 'auto', maxWidth: '100%', transform: 'none' },
}));

const Pill = styled('span')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 78,
    padding: '16px 20px',
    borderRadius: tokens.radius.full,
    border: '1px solid rgba(13,176,220,0.25)',
    background: 'var(--pill-fill)',
    color: 'var(--pill-color)',
    transform: 'rotate(var(--pill-angle))',
    fontFamily: 'var(--font-body)',
    fontSize: 20,
    lineHeight: 1.3,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    [COMPACT_DESKTOP]: { minHeight: 64, padding: '12px 16px', fontSize: 16 },
    [theme.breakpoints.down('md')]: { minHeight: 44, padding: '12px 18px', fontSize: 16, transform: 'none', whiteSpace: 'normal' },
}));

export default function PortfolioNumbersBehindSuccess() {
    const sectionRef = useRef<HTMLElement>(null);
    const fieldRef = useRef<HTMLDivElement>(null);
    const flowRef = useRef<HTMLDivElement>(null);
    const playback = useRef({ phase: 'ready' as 'ready' | 'playing' | 'complete', progress: 0, direction: 1 });

    // Fixed per-pill variation is generated once, never in refresh callbacks.
    const variation = useRef(PILLS.map((_, index) => ({
        start: index * 0.17 + ((index * 37 + 11) % 23) / 100,
        duration: 1.35 + ((index * 19 + 7) % 29) / 100,
        rotation: ((index * 23 + 5) % 31) - 15,
        x: ((index * 17 + 3) % 41) - 20,
    })));

    useLayoutEffect(() => {
        const section = sectionRef.current;
        const field = fieldRef.current;
        const flow = flowRef.current;
        if (!section || !field || !flow) return;

        const media = gsap.matchMedia();
        media.add({
            reduced: '(prefers-reduced-motion: reduce)',
            desktop: '(min-width: 960px)',
            tall: '(min-height: 650px)',
            animated: '(prefers-reduced-motion: no-preference)',
        }, (context) => {
            const pills = Array.from(section.querySelectorAll<HTMLElement>('[data-numbers-pill]'));
            const content = section.querySelectorAll<HTMLElement>('[data-numbers-reveal]');
            const visible = () => {
                const rect = flow.getBoundingClientRect();
                return rect.bottom > 0 && rect.top < window.innerHeight;
            };
            const finalAngle = (index: number) => window.innerWidth >= 960 ? PILLS[index].angle : 0;
            const showFinal = () => {
                gsap.set(content, { autoAlpha: 1, y: 0 });
                gsap.set(pills, { autoAlpha: 1, x: 0, y: 0, rotation: finalAngle });
            };
            if (context.conditions?.reduced) {
                showFinal();
                playback.current = { phase: 'complete', progress: 1, direction: 1 };
                return;
            }

            const desktop = Boolean(context.conditions?.desktop && context.conditions?.tall);
            const state = playback.current;
            let direction = state.direction;
            let holding = false;
            let releasing = false;
            let releaseTween: gsap.core.Tween | undefined;
            const dropDistance = (pill: HTMLElement) => field.offsetTop + (pill.parentElement?.offsetTop ?? 0) + pill.offsetHeight;
            const initialPills = {
                autoAlpha: 0,
                y: (_index: number, pill: HTMLElement) => desktop ? -dropDistance(pill) : -64,
                x: (index: number) => desktop ? variation.current[index].x : 0,
                rotation: (index: number) => finalAngle(index) + (desktop ? variation.current[index].rotation : 0),
            };

            // Measure against the normal-flow wrapper, never the temporarily held frame.
            // Its height is exactly the existing section height, with no pin travel added.
            const updateHold = () => {
                const rect = flow.getBoundingClientRect();
                section.style.width = rect.width + 'px';
                const height = section.offsetHeight;
                flow.style.height = height + 'px';
                const edge = direction > 0 ? Math.min(0, window.innerHeight - height) : Math.max(0, window.innerHeight - height);
                const top = direction > 0 ? Math.max(rect.top, edge) : Math.min(rect.top, edge);
                section.style.top = top + 'px';
                section.style.left = rect.left + 'px';
                if (rect.bottom <= 0 || rect.top >= window.innerHeight) resetOffscreen();
            };
            const hold = () => {
                holding = true;
                flow.style.height = section.offsetHeight + 'px';
                section.style.position = 'fixed';
                section.style.zIndex = '2';
                updateHold();
                gsap.ticker.add(updateHold);
            };
            const clearHold = () => {
                holding = false;
                gsap.ticker.remove(updateHold);
                section.style.removeProperty('position');
                section.style.removeProperty('top');
                section.style.removeProperty('left');
                section.style.removeProperty('width');
                section.style.removeProperty('z-index');
                flow.style.removeProperty('height');
            };
            const timeline = gsap.timeline({ paused: true });
            const resetOffscreen = () => {
                const rect = section.getBoundingClientRect();
                if (visible() || (rect.bottom > 0 && rect.top < window.innerHeight)) return;
                releaseTween?.kill();
                releasing = false;
                clearHold();
                timeline.pause(0, true);
                gsap.set(content, { autoAlpha: 0, y: desktop ? 20 : 10 });
                gsap.set(pills, initialPills);
                state.phase = 'ready';
                state.progress = 0;
            };
            const release = () => {
                state.phase = 'complete';
                state.progress = 1;
                if (!holding) return;
                const heldTop = section.getBoundingClientRect().top;
                clearHold();
                const offset = heldTop - section.getBoundingClientRect().top;
                // Preserve the painted position on release, then return to normal flow.
                releasing = true;
                gsap.set(section, { y: offset });
                releaseTween = gsap.to(section, {
                    y: 0, duration: 0.35, ease: 'power2.out',
                    onComplete: () => {
                        gsap.set(section, { clearProps: 'transform' });
                        releasing = false;
                        resetOffscreen();
                    },
                });
            };

            // Set starting values once; future fromTo tweens must not immediately
            // re-hide content during entry, refresh, or a responsive rebuild.
            gsap.set(content, { autoAlpha: 0, y: desktop ? 20 : 10 });
            gsap.set(pills, initialPills);
            pills.forEach((pill, index) => {
                const seed = variation.current[index];
                timeline.to(pill, {
                    autoAlpha: 1, y: 0, x: 0, rotation: finalAngle(index),
                    duration: desktop ? seed.duration : 0.85 + (seed.duration - 1.35),
                    ease: 'power2.inOut',
                }, desktop ? seed.start : seed.start * 0.65);
            });
            timeline.to(content, {
                autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
            }, timeline.duration());
            timeline.eventCallback('onComplete', release);

            if (state.phase === 'playing') {
                // A resize must preserve playback even if normal flow has scrolled away.
                timeline.progress(state.progress, true);
                hold();
                timeline.play();
            } else if (!visible()) {
                state.phase = 'complete';
                resetOffscreen();
            } else if (state.phase === 'complete') {
                timeline.progress(1, true);
                showFinal();
            }

            const enter = (entryDirection: number) => {
                if (!visible() || state.phase !== 'ready' || releasing) return;
                direction = entryDirection;
                state.direction = entryDirection;
                state.phase = 'playing';
                hold();
                timeline.play(0);
            };
            ScrollTrigger.create({
                trigger: flow,
                start: 'top bottom',
                end: 'bottom top',
                onEnter: () => enter(1),
                onEnterBack: () => enter(-1),
                onLeave: resetOffscreen,
                onLeaveBack: resetOffscreen,
            });
            // Includes a section already visible on initial load or a breakpoint change.
            if (visible()) enter(1);

            let refreshFrame = 0;
            let previousWidth = flow.clientWidth;
            const observer = new ResizeObserver(() => {
                if (flow.clientWidth === previousWidth) return;
                previousWidth = flow.clientWidth;
                cancelAnimationFrame(refreshFrame);
                refreshFrame = requestAnimationFrame(() => ScrollTrigger.refresh());
            });
            observer.observe(flow);
            let active = true;
            document.fonts.ready.then(() => { if (active) ScrollTrigger.refresh(); });
            return () => {
                active = false;
                state.progress = timeline.progress();
                if (releasing) state.phase = 'complete';
                releaseTween?.kill();
                clearHold();
                observer.disconnect();
                cancelAnimationFrame(refreshFrame);
            };
        });
        return () => media.revert();
    }, []);

    return (
        <div ref={flowRef}>
            <Section id="portfolio-numbers" ref={sectionRef} aria-labelledby="portfolio-numbers-heading">
                <noscript><style>{'#portfolio-numbers [data-numbers-reveal], #portfolio-numbers [data-numbers-pill] { visibility: visible !important; }'}</style></noscript>
                <Inner>
                    <Header>
                        <Title id="portfolio-numbers-heading" variant="h2" gradient={false} data-numbers-reveal>The Numbers<br />Behind Success</Title>
                        <div data-numbers-reveal>
                            <Intro>Strategy, creativity, and growth -the engine for every bold idea.</Intro>
                            <PrimaryButton component="a" href="/contact" backgroundColor={tokens.color.uv300} textColor="#000" sx={{ fontSize: 18, minHeight: 52, padding: '12px 15px' }}>
                                Get Started&nbsp;<span aria-hidden="true">→</span>
                            </PrimaryButton>
                        </div>
                    </Header>
                    <Stats>
                        <Stat data-numbers-reveal><Number>500K<span>Users</span></Number><StatDescription className="plans">We offer flexible, custom-fit plans designed to meet the unique needs and budget of your team</StatDescription></Stat>
                        <Stat data-numbers-reveal><Number>98<span>%</span></Number><StatDescription className="quality">Our commitment to quality shines through near 98.05%</StatDescription></Stat>
                        <Stat data-numbers-reveal><Number>23<span>K</span></Number><StatDescription className="growth">Organic growth brings in twenty-three thousand signup</StatDescription></Stat>
                    </Stats>
                </Inner>
                <PillField ref={fieldRef} aria-label="Agency qualities">
                    {PILLS.map(pill => (
                        <PillSlot key={pill.text} style={{
                            '--pill-x': pill.x + '%', '--pill-y': pill.y + 'px', '--pill-width': pill.width + '%',
                            '--pill-fill': pill.fill, '--pill-color': pill.color, '--pill-angle': pill.angle + 'deg',
                        } as React.CSSProperties}>
                            <Pill data-numbers-pill>{pill.text}</Pill>
                        </PillSlot>
                    ))}
                </PillField>
            </Section>
        </div>
    );
}
