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

const INITIAL_COUNT = 4;

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

    // Preserve original blur / opacity behavior.
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

    // Preserve original text color.
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
    const expandedRef = useRef(false);

    const [expanded, setExpanded] = useState(false);
    const [revealed, setRevealed] = useState(false);

    const [hoverActiveId, setHoverActiveId] = useState<number | null>(null);
    const [scrollActiveId, setScrollActiveId] = useState<number>(TESTIMONIALS[0].id);

    const activeId = hoverActiveId ?? scrollActiveId;

    useEffect(() => {
        expandedRef.current = expanded;
    }, [expanded]);

    // Pin section and move active testimonial forward/backward with scroll.
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const mm = gsap.matchMedia();

        mm.add('(min-width: 900px)', () => {
            const getCount = () =>
                expandedRef.current
                    ? TESTIMONIALS.length
                    : INITIAL_COUNT;

            const getScrollDistance = () => {
                const count = getCount();

                /*
                 * Enough pinned scroll for each testimonial to get
                 * a clear active beat without making section feel slow.
                 */
                return Math.round(
                    Math.max(
                        window.innerHeight * 1.9,
                        count * window.innerHeight * 0.48,
                    ),
                );
            };

            const setActiveFromProgress = (
                progress: number,
            ) => {
                const count = getCount();

                const index = Math.min(
                    Math.floor(
                        Math.min(
                            progress,
                            0.999999,
                        ) * count,
                    ),
                    count - 1,
                );

                setScrollActiveId(
                    TESTIMONIALS[index].id,
                );
            };

            const trigger =
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top top',

                    end: () =>
                        `+=${getScrollDistance()}`,

                    pin: true,
                    pinSpacing: true,

                    /*
                     * Services section directly above has
                     * refreshPriority: 5, so Testimonials must
                     * measure after its pin spacer is finalized.
                     */
                    refreshPriority: 0,

                    invalidateOnRefresh: true,
                    anticipatePin: 1,

                    onUpdate: ({
                        progress,
                    }) => {
                        setActiveFromProgress(
                            progress,
                        );
                    },

                    onRefresh: ({
                        progress,
                    }) => {
                        setActiveFromProgress(
                            progress,
                        );
                    },

                    onEnter: () => {
                        setActiveFromProgress(0);
                    },

                    onLeaveBack: () => {
                        setScrollActiveId(
                            TESTIMONIALS[0].id,
                        );
                    },

                    onLeave: () => {
                        const count =
                            getCount();

                        setScrollActiveId(
                            TESTIMONIALS[
                                count - 1
                            ].id,
                        );
                    },
                });

            return () => {
                trigger.kill();
            };
        });

        /*
         * Mobile/tablet: keep normal document flow.
         * Still update active testimonial as rows cross viewport.
         * Avoid pinning a potentially tall text block on small screens.
         */
        mm.add('(max-width: 899px)', () => {
            const trigger =
                ScrollTrigger.create({
                    trigger: section,
                    start: 'top 75%',
                    end: 'bottom 25%',
                    refreshPriority: 0,
                    invalidateOnRefresh: true,

                    onUpdate: ({
                        progress,
                    }) => {
                        const count =
                            expandedRef.current
                                ? TESTIMONIALS.length
                                : INITIAL_COUNT;

                        const index =
                            Math.min(
                                Math.floor(
                                    Math.min(
                                        progress,
                                        0.999999,
                                    )
                                    * count,
                                ),
                                count - 1,
                            );

                        setScrollActiveId(
                            TESTIMONIALS[
                                index
                            ].id,
                        );
                    },
                });

            return () => {
                trigger.kill();
            };
        });

        return () => {
            mm.revert();
        };
    }, []);

    const extra = TESTIMONIALS.slice(INITIAL_COUNT);

    const handleExpand = () => {
        const next = !expanded;

        setExpanded(next);

        if (next) {
            requestAnimationFrame(() => setRevealed(true));
        } else {
            setRevealed(false);
        }

        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 520);
    };

    const renderTestimonial = (item: (typeof TESTIMONIALS)[number]) => (
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
            <List onMouseLeave={() => setHoverActiveId(null)}>
                {TESTIMONIALS.slice(0, INITIAL_COUNT).map(renderTestimonial)}

                {expanded && (
                    <RevealWrap show={revealed}>
                        {extra.map(renderTestimonial)}
                    </RevealWrap>
                )}
            </List>

            <ButtonWrap>
                <LoadMoreButton type="button" onClick={handleExpand} aria-expanded={expanded}>
                    {expanded ? 'Show less' : 'Read testimonials'}
                    <Chevron open={expanded}>▾</Chevron>
                </LoadMoreButton>
            </ButtonWrap>
        </Section>
    );
}
