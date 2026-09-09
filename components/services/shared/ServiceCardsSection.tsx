'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/material/styles';

import ServiceContentCard, {
    type ServiceContentCardItem,
} from './ServiceContentCard';
import { tokens } from '@/theme/theme';

interface ServiceCardsSectionProps {
    id?: string;
    eyebrow?: string;
    title: string;
    description?: string;
    items: ServiceContentCardItem[];
    initialVisibleCount?: number;
    expandable?: boolean;
    columns?: 3 | 4;
    showTextLink?: boolean;
    backgroundImage?: string;
    marginTop?: string;
}

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(28px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Section = styled(Box)(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
    marginTop: 'var(--section-margin-top)',
    borderRadius: '58px 58px 0 0',
    backgroundImage: 'var(--section-background)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: tokens.color.neutral0,

    [theme.breakpoints.down('md')]: {
        borderRadius: '38px 38px 0 0',
    },

    [theme.breakpoints.down('sm')]: {
        borderRadius: '28px 28px 0 0',
    },
}));

const SectionContainer = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    paddingTop: '76px',
    paddingBottom: '72px',

    [theme.breakpoints.down('md')]: {
        paddingTop: '60px',
        paddingBottom: '58px',
    },

    [theme.breakpoints.down('sm')]: {
        paddingTop: '48px',
        paddingBottom: '44px',
    },
}));

const Header = styled(Box)({
    width: 'min(100%, 760px)',
    margin: '0 auto',
    textAlign: 'center',
});

const Eyebrow = styled(Typography)({
    fontFamily: tokens.font.body,
    fontSize: '12px',
    fontWeight: 600,
    lineHeight: 1,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: tokens.color.neutral0,
    opacity: 0.9,
});

const Heading = styled(Typography)(({ theme }) => ({
    marginTop: 'var(--heading-margin-top)',
    fontFamily: tokens.font.display,
    fontSize: 'clamp(38px, 4vw, 58px)',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.045em',
    color: tokens.color.neutral0,

    [theme.breakpoints.down('sm')]: {
        fontSize: '36px',
    },
}));

const Intro = styled(Typography)({
    maxWidth: '620px',
    margin: '16px auto 0',
    fontFamily: tokens.font.body,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.55,
    color: 'rgba(255,255,255,0.70)',
});

const Grid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--section-columns), minmax(0, 1fr))',
    gap: '24px',
    marginTop: '42px',

    [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        gap: '18px',
        marginTop: '32px',
    },
}));

const AnimatedCard = styled(Box)({
    minWidth: 0,
    opacity: 0,

    '&[data-visible="true"]': {
        animation: `${fadeUp} 720ms ${tokens.motion.ease} forwards`,
        animationDelay: 'var(--card-delay)',
    },

    '@media (prefers-reduced-motion: reduce)': {
        opacity: 1,

        '&[data-visible="true"]': {
            animation: 'none',
        },
    },
});

const ButtonWrap = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '34px',
});

const SeeMoreButton = styled(Button)({
    minWidth: '160px',
    minHeight: '48px',
    padding: '10px 28px',
    borderRadius: '10px',
    borderColor: tokens.color.neutral0,
    color: tokens.color.neutral0,
    fontFamily: tokens.font.body,
    fontSize: '15px',
    fontWeight: 500,
    textTransform: 'none',
    backgroundColor: 'transparent',

    '&:hover': {
        borderColor: tokens.color.neutral0,
        backgroundColor: 'rgba(255,255,255,0.10)',
        transform: 'translateY(-1px)',
    },
});

export default function ServiceCardsSection({
    id = 'service-cards-heading',
    eyebrow,
    title,
    description,
    items,
    initialVisibleCount,
    expandable = false,
    columns = 3,
    showTextLink = false,
    backgroundImage = '/footer-bg.jpg',
    marginTop = '4px',
}: ServiceCardsSectionProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const visibleCount = initialVisibleCount ?? items.length;
    const visibleItems = expandable && !expanded
        ? items.slice(0, visibleCount)
        : items;

    const canExpand =
        expandable &&
        !expanded &&
        items.length > visibleCount;

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) {
                    return;
                }

                setInView(true);
                observer.disconnect();
            },
            {
                threshold: 0.18,
            },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    return (
        <Section
            ref={sectionRef}
            component="section"
            aria-labelledby={id}
            style={
                {
                    '--section-background': `url('${backgroundImage}')`,
                    '--section-margin-top': marginTop,
                } as React.CSSProperties
            }
        >
            <SectionContainer maxWidth="xl">
                <Header>
                    {eyebrow ? (
                        <Eyebrow component="p">{eyebrow}</Eyebrow>
                    ) : null}

                    <Heading
                        id={id}
                        component="h2"
                        style={
                            {
                                '--heading-margin-top': eyebrow
                                    ? '16px'
                                    : '0px',
                            } as React.CSSProperties
                        }
                    >
                        {title}
                    </Heading>

                    {description ? (
                        <Intro component="p">{description}</Intro>
                    ) : null}
                </Header>

                <Grid
                    style={
                        {
                            '--section-columns': columns,
                        } as React.CSSProperties
                    }
                >
                    {visibleItems.map((item, index) => (
                        <AnimatedCard
                            key={item.id}
                            data-visible={
                                inView || expanded
                                    ? 'true'
                                    : 'false'
                            }
                            style={
                                {
                                    '--card-delay': `${index * 150}ms`,
                                } as React.CSSProperties
                            }
                        >
                            <ServiceContentCard
                                item={item}
                                showTextLink={showTextLink}
                            />
                        </AnimatedCard>
                    ))}
                </Grid>

                {canExpand ? (
                    <ButtonWrap>
                        <SeeMoreButton
                            variant="outlined"
                            onClick={() => setExpanded(true)}
                        >
                            See more
                        </SeeMoreButton>
                    </ButtonWrap>
                ) : null}
            </SectionContainer>
        </Section>
    );
}
