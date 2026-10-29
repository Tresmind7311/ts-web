'use client';

import { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/material/styles';

import { SecondaryButton } from '@/components/common/Button';
import ServiceContentCard, {
    type ServiceContentCardItem,
} from './ServiceContentCard';
import { tokens } from '@/theme/theme';
import Heading from '@/components/common/Heading';

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
    textLinkLabel?: string;
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
    borderRadius: '36px 36px 0 0',
    backgroundImage: 'var(--section-background)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: tokens.color.neutral0,

    [theme.breakpoints.down('md')]: {
        borderRadius: '20px 20px 0 0',
    },

    [theme.breakpoints.down('sm')]: {
        borderRadius: '28px 28px 0 0',
    },
}));

const SectionContainer = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    paddingTop: 'clamp(48px, 5.5vw, 76px)',
    paddingBottom: 'clamp(48px, 5.5vw, 72px)',

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
    fontFamily: tokens.font.display,
    fontSize: 'clamp(12px, 1.2vw, 16px)',
    fontWeight: 700,
    lineHeight: 1.3,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: tokens.color.neutral0,
    opacity: 0.9,
});

// const Heading = styled(Typography)(({ theme }) => ({
//     marginTop: 'var(--heading-margin-top)',
//     fontFamily: tokens.font.display,
//     fontSize: 'clamp(38px, 4vw, 58px)',
//     fontWeight: 700,
//     lineHeight: 1,
//     letterSpacing: '-0.045em',
//     color: tokens.color.neutral0,

//     [theme.breakpoints.down('sm')]: {
//         fontSize: '36px',
//     },
// }));

const Intro = styled(Typography)({
    maxWidth: '620px',
    margin: '16px auto 0',
    fontFamily: tokens.font.heroBody,
    fontSize: 'clamp(15px, 1.25vw, 18px)',
    fontWeight: 400,
    lineHeight: 1.65,
    color: 'rgba(255, 255, 255, 0.65)',
});

const Grid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(var(--section-columns), minmax(0, 1fr))',
    gap: 'clamp(16px, 1.8vw, 24px)',
    marginTop: 'clamp(26px, 3vw, 40px)',

    [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '18px',
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        gap: '16px',
        marginTop: '26px',
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
    textLinkLabel,
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
            <SectionContainer maxWidth='xl'>
                <Header>
                    {eyebrow ? (
                        <Eyebrow component="p">{eyebrow}</Eyebrow>
                    ) : null}

                    <Heading
                        id={id}
                        variant="h2"
                        gradient={false}
                        sx={{
                            color: tokens.color.neutral0,
                            fontWeight: '500'
                        }}
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
                                textLinkLabel={textLinkLabel}
                            />
                        </AnimatedCard>
                    ))}
                </Grid>

                {canExpand ? (
                    <ButtonWrap>
                        <SecondaryButton
                            textColor="#FFFFFF"
                            borderColor="#FFFFFF"
                            onClick={() => setExpanded(true)}
                        >
                            See more
                        </SecondaryButton>
                    </ButtonWrap>
                ) : null}
            </SectionContainer>
        </Section>
    );
}
