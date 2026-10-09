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

        media.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference) and (pointer: fine)', () => {
            let active = true;
            let context: gsap.Context | undefined;
            const rebuild = () => {
                context?.revert();
                const navbarHeight = parseFloat(getComputedStyle(document.documentElement)
                    .getPropertyValue('--navbar-measured-height')) || 88;
                const top = navbarHeight + 16;
                const lastOffset = top + (cards.length - 1) * 15;
                const height = Math.max(...cards.map(card => card.offsetHeight));
                // Normal flow on short viewports keeps every image and metadata row reachable.
                if (lastOffset + height + 16 > window.innerHeight) {
                    ScrollTrigger.refresh();
                    return;
                }
                context = gsap.context(() => {
                    gsap.set(stack, { paddingBottom: 80 });
                    slots.forEach((slot, index) => {
                        const offset = top + index * 15;
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
