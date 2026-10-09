'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { styled } from '@mui/material/styles';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { tokens } from '@/theme/theme';

const WORKS = [
    { title: 'Market Motion', date: 'September - 2024', dateTime: '2024-09' },
    { title: 'Market Magnet', date: 'March - 2020', dateTime: '2020-03' },
    { title: 'Growth Engine', date: 'June - 2022', dateTime: '2022-06' },
    { title: 'Tidal Strategy', date: 'September - 2025', dateTime: '2025-09' },
];

const Section = styled('section')(({ theme }) => ({
    background: '#f2fcff',
    padding: '63px 40px 40px',
    [theme.breakpoints.down('md')]: { padding: '40px 24px' },
    [theme.breakpoints.down('sm')]: { padding: '24px 16px' },
}));

const Content = styled('div')(({ theme }) => ({
    maxWidth: 1360,
    margin: '0 auto',
    padding: '0 40px 50px',
    background: tokens.color.neutral0,
    [theme.breakpoints.down('md')]: { padding: '0 24px 36px' },
    [theme.breakpoints.down('sm')]: { padding: '0 16px 28px' },
}));

const Heading = styled('h2')(({ theme }) => ({
    margin: '0 auto clamp(40px, 4.1vw, 57px)',
    paddingTop: 'clamp(32px, 8.5vw, 118px)',
    color: '#333437',
    fontFamily: tokens.font.display,
    fontSize: 'clamp(64px, 11.5vw, 160px)',
    fontWeight: 700,
    lineHeight: 1.275,
    letterSpacing: '-0.065em',
    textAlign: 'center',
    '& > span': { display: 'block' },
    '& .work-heading-image': {
        position: 'relative',
        display: 'inline-block',
        width: 0,
        height: '1em',
        marginInline: 0,
        overflow: 'hidden',
        verticalAlign: 'middle',
        letterSpacing: 0,
        borderRadius: '0.125em',
        transition: `width 600ms ${tokens.motion.ease}, margin 600ms ${tokens.motion.ease}`,
        '& img': {
            position: 'absolute',
            inset: 0,
            width: '2.18em',
            height: '1em',
            objectFit: 'cover',
            opacity: 0,
            transform: 'scale(0.92)',
            transition: `opacity 600ms ${tokens.motion.ease}, transform 600ms ${tokens.motion.ease}`,
        },
    },
    '@media (hover: hover) and (pointer: fine)': {
        '&:hover .work-heading-image': {
            width: '2.18em',
            marginInline: '0.12em',
            '& img': { opacity: 1, transform: 'scale(1)' },
        },
    },
    '@media (prefers-reduced-motion: reduce)': {
        '& .work-heading-image, & .work-heading-image img': { transition: 'none' },
    },
    [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(36px, 11.5vw, 64px)',
        lineHeight: 1.2,
    },
}));

const Stack = styled('div')({ position: 'relative' });
const CardSlot = styled('div')({ position: 'relative', perspective: 1000 });
const Card = styled('article')({
    position: 'relative',
    background: tokens.color.neutral0,
    transformOrigin: 'top center',
    transformStyle: 'preserve-3d',
});
const Media = styled('div')(({ theme }) => ({
    position: 'relative',
    aspectRatio: '1280 / 610',
    overflow: 'hidden',
    borderRadius: 20,
    [theme.breakpoints.down('sm')]: { borderRadius: 14 },
}));
const Metadata = styled('div')(({ theme }) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: 24, minHeight: 90,
    color: '#161c1c', fontFamily: tokens.font.body,
    '& h3': { margin: 0, fontSize: 22.8, fontWeight: 600, lineHeight: 1.24 },
    '& time': { color: '#78828d', fontSize: 17.1, lineHeight: 1.4 },
    [theme.breakpoints.down('md')]: {
        gap: 16, minHeight: 90,
        '& h3': { fontSize: 20 }, '& time': { fontSize: 15 },
    },
    [theme.breakpoints.down('sm')]: {
        gap: 12, minHeight: 108,
        '& h3': { fontSize: 17 }, '& time': { fontSize: 13 },
    },
}));
const Identity = styled('div')(({ theme }) => ({
    display: 'flex', alignItems: 'center', gap: 38,
    [theme.breakpoints.down('md')]: { gap: 20 },
    [theme.breakpoints.down('sm')]: { flexDirection: 'column', alignItems: 'flex-start', gap: 6 },
}));
const ProjectLink = styled(Link)(({ theme }) => ({
    display: 'inline-flex', alignItems: 'center', gap: 16,
    flexShrink: 0, minHeight: 44,
    color: 'inherit', fontSize: 17.1, fontWeight: 500, textDecoration: 'none',
    '& span:first-of-type': { textDecoration: 'underline', textUnderlineOffset: 4 },
    '&:focus-visible': { outline: `2px solid ${tokens.color.uv300}`, outlineOffset: 4 },
    [theme.breakpoints.down('sm')]: { fontSize: 13, gap: 8 },
}));
const BottomAction = styled('div')({ display: 'flex', justifyContent: 'center' });
const WorksLink = styled(Link)({
    display: 'inline-flex', alignItems: 'center', gap: 8,
    minHeight: 51, padding: '12px 19px', borderRadius: 9,
    background: '#22c5eb', color: '#05252f',
    fontFamily: tokens.font.body, fontSize: 18, fontWeight: 500, textDecoration: 'none',
    '&:focus-visible': { outline: `2px solid ${tokens.color.uv800}`, outlineOffset: 4 },
});

export default function PortfolioRecentWorks() {
    const sectionRef = useRef<HTMLElement>(null);
    const stackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const stack = stackRef.current;
        if (!section || !stack) return;
        const slots = Array.from(stack.querySelectorAll<HTMLElement>('[data-work-slot]'));
        const cards = Array.from(stack.querySelectorAll<HTMLElement>('article'));
        const media = gsap.matchMedia();
        let frame = 0;

        media.add('(min-width: 960px) and (prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
            let active = true;
            let context: gsap.Context | undefined;
            const rebuild = () => {
                context?.revert();
                const navbarHeight = parseFloat(getComputedStyle(document.documentElement)
                    .getPropertyValue('--navbar-measured-height')) || 88;
                const naturalHeight = Math.max(...cards.map(card => card.offsetHeight));
                const compact = navbarHeight + 16 + (cards.length - 1) * 15
                    + naturalHeight + 16 > window.innerHeight;
                const top = navbarHeight + (compact ? 8 : 16);
                const stagger = compact ? 10 : 15;
                const lastOffset = top + (cards.length - 1) * stagger;
                let fits = true;
                context = gsap.context(() => {
                    if (compact) {
                        // Measure the real metadata height, including any wrapped text.
                        const rows = cards.map(card => card.lastElementChild as HTMLElement);
                        gsap.set(rows, { minHeight: 64 });
                        const metadataHeight = Math.max(...rows.map(row => row.offsetHeight));
                        const imageHeight = Math.floor(window.innerHeight - lastOffset - metadataHeight - 16);
                        if (imageHeight < 220) { fits = false; return; }
                        const images = cards.map(card => card.firstElementChild as HTMLElement);
                        gsap.set(images, {
                            height: (_, image: HTMLElement) => Math.min(image.offsetHeight, imageHeight),
                        });
                    }
                    // Keep the fit guard: unusually short windows still use normal flow.
                    if (lastOffset + Math.max(...cards.map(card => card.offsetHeight)) + 16 > window.innerHeight) {
                        fits = false;
                        return;
                    }
                    gsap.set(stack, { paddingBottom: 80 });
                    slots.forEach((slot, index) => {
                        const offset = top + index * stagger;
                        ScrollTrigger.create({
                            trigger: slot, start: () => `top ${offset}px`,
                            endTrigger: stack,
                            // All cards release together after the final card's full metadata is visible.
                            end: () => `bottom ${lastOffset + cards[cards.length - 1].offsetHeight}px`,
                            pin: slot, pinSpacing: false, invalidateOnRefresh: true,
                        });
                        if (index < cards.length - 1) {
                            gsap.to(cards[index], {
                                scale: 0.9 + index * 0.025, rotationX: -8, ease: 'none',
                                scrollTrigger: {
                                    trigger: slot, start: () => `top ${offset}px`,
                                    endTrigger: slots[index + 1], end: () => `top ${offset + 100}px`,
                                    scrub: true, invalidateOnRefresh: true,
                                },
                            });
                        }
                    });
                }, section);
                if (!fits) context.revert();
                ScrollTrigger.refresh();
            };
            const schedule = () => {
                cancelAnimationFrame(frame);
                frame = requestAnimationFrame(rebuild);
            };
            rebuild();
            window.addEventListener('resize', schedule);
            document.fonts.ready.then(() => { if (active) schedule(); });
            return () => {
                active = false;
                window.removeEventListener('resize', schedule);
                cancelAnimationFrame(frame);
                context?.revert();
            };
        });
        return () => { cancelAnimationFrame(frame); media.revert(); };
    }, []);

    return (
        <Section ref={sectionRef} aria-label="Our Best Works">
            <Heading aria-label="OUR BEST WORKS">
                <span aria-hidden="true">OUR BEST</span>
                <span aria-hidden="true">WOR<span className="work-heading-image">
                    <Image src="/images/Portfolio/Work-Animated.png" alt="" width={350} height={160}
                        sizes="(max-width: 1390px) 25vw, 350px" loading="eager" />
                </span>KS</span>
            </Heading>
            <Content>
                <Stack ref={stackRef}>
                    {WORKS.map((work, index) => (
                        <CardSlot data-work-slot key={work.title} style={{ zIndex: index + 1 }}>
                            <Card>
                                <Media>
                                    <Image src={`/images/Portfolio/our-work/our-work-${index + 1}.png`}
                                        alt={`${work.title} project`} fill
                                        sizes="(max-width: 639px) calc(100vw - 64px), (max-width: 959px) calc(100vw - 96px), (max-width: 1439px) calc(100vw - 160px), 1280px"
                                        style={{ objectFit: 'cover' }} />
                                </Media>
                                <Metadata>
                                    <Identity><h3>{work.title}</h3><time dateTime={work.dateTime}>{work.date}</time></Identity>
                                    <ProjectLink href="#" aria-label={`View ${work.title} project`}>
                                        <span>View Project</span><span aria-hidden="true">→</span>
                                    </ProjectLink>
                                </Metadata>
                            </Card>
                        </CardSlot>
                    ))}
                </Stack>
                <BottomAction><WorksLink href="#">View Works <span aria-hidden="true">→</span></WorksLink></BottomAction>
            </Content>
        </Section>
    );
}
