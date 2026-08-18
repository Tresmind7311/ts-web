'use client';
import { useState, useRef, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { tokens } from '@/theme/theme';
import { gsap, ScrollTrigger } from '@/lib/gsap';

// ─── Data ─────────────────────────────────────────────────────────────────────
const TESTIMONIALS = [
    {
        id: 0,
        avatar: 'https://i.pravatar.cc/150?img=12',
        quote: "This product has completely transformed how we work. The interface is intuitive and the features are exactly what we needed.",
        name: 'Cristiano Ronaldo',
        title: 'CEO @CR7',
    },
    {
        id: 1,
        avatar: 'https://i.pravatar.cc/150?img=33',
        quote: "I've tried many solutions, but this one stands out for its simplicity and power. Highly recommended!",
        name: 'Jensen Huang',
        title: 'CEO Nvidia',
    },
    {
        id: 2,
        avatar: 'https://i.pravatar.cc/150?img=51',
        quote: 'The team behind this is incredibly responsive and the product keeps getting better with each update.',
        name: 'Antony Raphy',
        title: 'Founder @cndlhaus.studio',
    },
    {
        id: 3,
        avatar: 'https://i.pravatar.cc/150?img=8',
        quote: 'Every feature feels considered. Nothing is there by accident, and nothing we need is missing.',
        name: 'Amara Chen',
        title: 'Design Lead @Halcyon',
    },
    {
        id: 4,
        avatar: 'https://i.pravatar.cc/150?img=59',
        quote: "We evaluated six alternatives before landing here — nothing else came close on speed or support.",
        name: 'Marcus Webb',
        title: 'CTO @Ferrovia',
    },
    {
        id: 5,
        avatar: 'https://i.pravatar.cc/150?img=47',
        quote: 'Onboarding took an afternoon. Adoption across the team took a day. That almost never happens.',
        name: 'Priya Nadar',
        title: 'Ops Director @Kestrel',
    },
];

const INITIAL_COUNT = 3;

// ─── Styled components (unchanged) ────────────────────────────────────────────

const Section = styled(Box)({
    position: 'relative',
    width: '100%',
    background: tokens.color.neutral0,
    padding: 'clamp(80px, 12vh, 140px) 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

const List = styled(Box)({
    width: '100%',
    maxWidth: '980px',
    display: 'flex',
    flexDirection: 'column',
});

const Row = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    position: 'relative',
    padding: '18px 0',
    cursor: 'default',
    filter: active ? 'blur(0px)' : 'blur(6px)',
    opacity: active ? 1 : 0.32,
    zIndex: active ? 2 : 1,
    transition: 'filter 480ms cubic-bezier(0.16,1,0.3,1), opacity 480ms cubic-bezier(0.16,1,0.3,1)',
    overflow: 'hidden',
}));

const Avatar = styled('img')({
    float: 'left',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '10px',
    marginTop: '4px',
    shapeOutside: 'circle(50%)',
    background: alpha(tokens.color.ink900, 0.08),
});

const QuoteText = styled('p')(({ theme }) => ({
    fontFamily: 'Georgia, "Times New Roman", serif',
    fontWeight: 400,
    fontSize: 'clamp(20px, 2.4vw, 30px)',
    lineHeight: 1.35,
    letterSpacing: '-0.01em',
    color: tokens.color.ink900,
    margin: 0,
    textWrap: 'pretty' as any,
    [theme.breakpoints.down('md')]: {
        fontSize: '18px',
    },
}));

const Meta = styled('span')({
    display: 'inline-flex',
    flexDirection: 'column',
    verticalAlign: 'middle',
    marginLeft: '10px',
    lineHeight: 1.3,
});

const MetaName = styled('span')({
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '10px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: tokens.color.coral500,
});

const MetaTitle = styled('span')({
    fontFamily: 'var(--font-mono)',
    fontWeight: 400,
    fontSize: '10px',
    letterSpacing: '0.02em',
    color: alpha(tokens.color.coral500, 0.75),
});

const RevealWrap = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'show',
})<{ show: boolean }>(({ show }) => ({
    opacity: show ? 1 : 0,
    transform: show ? 'translateY(0)' : 'translateY(14px)',
    transition: 'opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 500ms cubic-bezier(0.16,1,0.3,1)',
}));

const ButtonWrap = styled(Box)({
    marginTop: 'clamp(32px, 5vh, 56px)',
    display: 'flex',
    justifyContent: 'center',
});

const LoadMoreButton = styled('button')({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 22px',
    borderRadius: '999px',
    border: `1px solid ${alpha(tokens.color.ink900, 0.15)}`,
    background: tokens.color.neutral0,
    color: tokens.color.ink900,
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: '14px',
    cursor: 'pointer',
    transition: `all ${tokens.motion.base} ${tokens.motion.ease}`,
    '&:hover': {
        background: alpha(tokens.color.ink900, 0.04),
        borderColor: alpha(tokens.color.ink900, 0.28),
    },
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

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    // Shadow ref for `expanded` — lets the ScrollTrigger (created once) read
    // the current value without needing to be recreated on state change.
    const expandedRef = useRef(false);

    const [expanded, setExpanded] = useState(false);
    const [revealed, setRevealed] = useState(false);

    // ── Two independent activation sources ───────────────────────────────────
    //
    // hoverActiveId — set when mouse enters a row, cleared when mouse leaves
    //                 the list. null = no active hover.
    //
    // scrollActiveId — set by ScrollTrigger as the section scrolls through
    //                  the viewport. Initialized to item 0 (same default as
    //                  the original code).
    //
    // activeId — hover takes priority; scroll is the fallback.
    //            The two sources never write to the same variable, so they
    //            cannot conflict regardless of order of events.
    //
    const [hoverActiveId, setHoverActiveId] = useState<number | null>(null);
    const [scrollActiveId, setScrollActiveId] = useState<number>(TESTIMONIALS[0].id);

    const activeId = hoverActiveId ?? scrollActiveId;

    // Keep shadow in sync
    useEffect(() => { expandedRef.current = expanded; }, [expanded]);

    // ── ScrollTrigger — created once ─────────────────────────────────────────
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const st = ScrollTrigger.create({
            trigger: section,
            // Start when section top reaches 75% from viewport top (entering view).
            // End when section bottom reaches 25% from viewport top (leaving view).
            // This maps the section's full viewport travel to the testimonial list.
            start: 'top 75%',
            end: 'bottom 25%',
            // scrub: 0.3 — brief smoothing so the activation doesn't feel jittery
            // on trackpad micro-movements, but still reverses naturally on scroll-up.
            scrub: 0.3,
            invalidateOnRefresh: true,
            onUpdate: ({ progress }) => {
                // Read expandedRef (not state) — avoids recreating the trigger.
                const count = expandedRef.current ? TESTIMONIALS.length : INITIAL_COUNT;
                // Map progress [0,1] → item index [0, count-1].
                const idx = Math.min(Math.floor(progress * count), count - 1);
                setScrollActiveId(TESTIMONIALS[idx].id);
            },
        });

        return () => st.kill();
    }, []); // empty — created once, expandedRef read at call time

    const extra = TESTIMONIALS.slice(INITIAL_COUNT);

    const handleExpand = () => {
        const next = !expanded;
        setExpanded(next);
        if (next) {
            requestAnimationFrame(() => setRevealed(true));
        } else {
            setRevealed(false);
        }
        // Section height changes after the 500ms reveal transition.
        // Refresh so ScrollTrigger re-measures the new section bounds.
        setTimeout(() => ScrollTrigger.refresh(), 520);
    };

    const renderRow = (item: (typeof TESTIMONIALS)[number]) => (
        <Row
            key={item.id}
            active={activeId === item.id}
            onMouseEnter={() => setHoverActiveId(item.id)}
            onClick={() => setHoverActiveId(item.id)} // touch fallback
        >
            <Avatar src={item.avatar} alt={item.name} draggable={false} />
            <QuoteText>
                {item.quote}
                <Meta>
                    <MetaName>{item.name}</MetaName>
                    <MetaTitle>{item.title}</MetaTitle>
                </Meta>
            </QuoteText>
        </Row>
    );

    return (
        <Section ref={sectionRef} id="testimonials">
            <List
                // Clearing hoverActiveId (not resetting to item 0) lets the
                // scroll-driven value take over naturally when the mouse leaves.
                onMouseLeave={() => setHoverActiveId(null)}
            >
                {TESTIMONIALS.slice(0, INITIAL_COUNT).map(renderRow)}

                {expanded && (
                    <RevealWrap show={revealed}>
                        {extra.map(renderRow)}
                    </RevealWrap>
                )}
            </List>

            <ButtonWrap>
                <LoadMoreButton onClick={handleExpand}>
                    {expanded ? 'Show less' : 'Read testimonials'}
                    <Chevron open={expanded}>▾</Chevron>
                </LoadMoreButton>
            </ButtonWrap>
        </Section>
    );
}