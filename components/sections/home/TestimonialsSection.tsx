'use client';

import { useState, useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { SecondaryButton } from '@/components/common/Button';
import { tokens } from '@/theme/theme';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Testimonial {
    id: number;
    avatar: string;
    quote: string;
    name: string;
    title: string;
}

interface Props {
    testimonials: Testimonial[];
    initialCount?: number;
}

// ─── Styled components ────────────────────────────────────────────────────────

const Section = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100vh',
    background: tokens.color.neutral0,
    padding: 'clamp(64px, 9vh, 96px) 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
        minHeight: '100svh',
        height: 'auto',
        padding: '64px 24px',
        overflow: 'visible',
    },
}));

const Heading = styled('h2')({
    position: 'relative',
    zIndex: 3,
    margin: 0,
    padding: 'clamp(24px, 5svh, 56px) 20px 0',
    color: tokens.color.ink900,
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(36px, 5.2vw, 64px)',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.03em',
    textAlign: 'center',
    pointerEvents: 'none',
    paddingBottom: '75px',
    '@media (prefers-reduced-motion: reduce)': {
        paddingTop: 0,
        marginBottom: '32px',
    },
});

const List = styled(Box)({
    width: '100%',
    maxWidth: '1120px',
    display: 'block',
});

const Row = styled('span', {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    position: 'relative',
    display: 'inline',
    cursor: 'default',
    filter: active ? 'blur(0px)' : 'blur(6px)',
    opacity: active ? 1 : 0.32,
    transition:
        'filter 480ms cubic-bezier(0.16,1,0.3,1), opacity 480ms cubic-bezier(0.16,1,0.3,1)',
}));

const Avatar = styled('img')({
    display: 'inline-block',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px',
    verticalAlign: '-0.15em',
    background: alpha(tokens.color.ink900, 0.08),
});

const QuoteText = styled('span')(({ theme }) => ({
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: 400,
    fontSize: 'clamp(20px, 2.4vw, 30px)',
    lineHeight: 1.35,
    letterSpacing: '-0.01em',
    color: tokens.color.ink900,
    textWrap: 'pretty' as any,
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
    },
}));

const RevealWrap = styled('span', {
    shouldForwardProp: (prop) => prop !== 'show',
})<{ show: boolean }>(({ show }) => ({
    display: 'inline',
    opacity: show ? 1 : 0,
    transition: 'opacity 500ms cubic-bezier(0.16,1,0.3,1)',
}));

const ButtonWrap = styled(Box)({
    marginTop: 'clamp(32px, 5vh, 56px)',
    display: 'flex',
    justifyContent: 'center',
});

const Chevron = styled('span', {
    shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ open }) => ({
    display: 'inline-block',
    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: `transform ${tokens.motion.base} ${tokens.motion.ease}`,
    fontSize: '12px',
}));

// ─── Component ────────────────────────────────────────────────────────────────

export default function TestimonialsSection({ testimonials, initialCount = 4 }: Props) {
    const sectionRef = useRef<HTMLElement>(null);
    const expandedRef = useRef(false);

    const [expanded, setExpanded] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const [hoverActiveId, setHoverActiveId] = useState<number | null>(null);
    const [scrollActiveId, setScrollActiveId] = useState<number>(testimonials[0].id);

    const activeId = hoverActiveId ?? scrollActiveId;

    useEffect(() => {
        expandedRef.current = expanded;
    }, [expanded]);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const mm = gsap.matchMedia();

        mm.add('(min-width: 900px)', () => {
            const getCount = () =>
                expandedRef.current ? testimonials.length : initialCount;

            const getScrollDistance = () => {
                const count = getCount();
                return Math.round(
                    Math.max(
                        window.innerHeight * 1.9,
                        count * window.innerHeight * 0.48,
                    ),
                );
            };

            const setActiveFromProgress = (progress: number) => {
                const count = getCount();
                const index = Math.min(
                    Math.floor(Math.min(progress, 0.999999) * count),
                    count - 1,
                );
                setScrollActiveId(testimonials[index].id);
            };

            const trigger = ScrollTrigger.create({
                trigger: section,
                start: 'top top',
                end: () => `+=${getScrollDistance()}`,
                pin: true,
                pinSpacing: true,
                refreshPriority: 0,
                invalidateOnRefresh: true,
                anticipatePin: 1,
                onUpdate: ({ progress }) => setActiveFromProgress(progress),
                onRefresh: ({ progress }) => setActiveFromProgress(progress),
                onEnter: () => setActiveFromProgress(0),
                onLeaveBack: () => setScrollActiveId(testimonials[0].id),
                onLeave: () => {
                    const count = getCount();
                    setScrollActiveId(testimonials[count - 1].id);
                },
            });

            return () => { trigger.kill(); };
        });

        mm.add('(max-width: 899px)', () => {
            const trigger = ScrollTrigger.create({
                trigger: section,
                start: 'top 75%',
                end: 'bottom 25%',
                refreshPriority: 0,
                invalidateOnRefresh: true,
                onUpdate: ({ progress }) => {
                    const count = expandedRef.current ? testimonials.length : initialCount;
                    const index = Math.min(
                        Math.floor(Math.min(progress, 0.999999) * count),
                        count - 1,
                    );
                    setScrollActiveId(testimonials[index].id);
                },
            });

            return () => { trigger.kill(); };
        });

        return () => { mm.revert(); };
    }, [testimonials, initialCount]);

    const extra = testimonials.slice(initialCount);

    const handleExpand = () => {
        const next = !expanded;
        setExpanded(next);
        if (next) {
            requestAnimationFrame(() => setRevealed(true));
        } else {
            setRevealed(false);
        }
        setTimeout(() => { ScrollTrigger.refresh(); }, 520);
    };

    const renderTestimonial = (item: Testimonial) => (
        <Row
            key={item.id}
            active={activeId === item.id}
            onMouseEnter={() => setHoverActiveId(item.id)}
            onClick={() => setHoverActiveId(item.id)}
            aria-label={`${item.name}, ${item.title}`}
        >
            <Avatar src={item.avatar} alt="" aria-hidden="true" draggable={false} />
            <QuoteText>{item.quote} </QuoteText>
        </Row>
    );

    return (
        <Section ref={sectionRef} id="testimonials">
            <Heading>
                Good Work.{' '}
                <span style={{ color: tokens.color.uv600 }}>Better Words.</span>
            </Heading>
            <List onMouseLeave={() => setHoverActiveId(null)}>
                {testimonials.slice(0, initialCount).map(renderTestimonial)}
                {expanded && (
                    <RevealWrap show={revealed}>
                        {extra.map(renderTestimonial)}
                    </RevealWrap>
                )}
            </List>
            <ButtonWrap>
                <SecondaryButton type="button" onClick={handleExpand} aria-expanded={expanded}>
                    {expanded ? 'Show less' : 'Read testimonials'}
                    <Chevron open={expanded}>▾</Chevron>
                </SecondaryButton>
            </ButtonWrap>
        </Section>
    );
}
