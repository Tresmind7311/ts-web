'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/material/styles';

import ServiceOfferCard from '@/components/services/main/shared/ServiceOfferCard';
import type { ServiceData } from '@/data/services/types';
import { tokens } from '@/theme/theme';

interface WhatWeOfferProps {
    services: ServiceData[];
}

const INITIAL_SLUGS = [
    'mobile-app-development',
    'web-development',
    'graphic-designing',
];

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
    marginTop: '4px',
    borderRadius: '58px 58px 0 0',
    backgroundImage: "url('/footer-bg.jpg')",
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
    marginTop: '16px',
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
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '24px',
    marginTop: '42px',

    [theme.breakpoints.down('md')]: {
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

export default function WhatWeOffer({
    services,
}: WhatWeOfferProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.18,
            },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    const orderedServices = useMemo(() => {
        const featured = INITIAL_SLUGS
            .map(slug => services.find(service => service.slug === slug))
            .filter((service): service is ServiceData => Boolean(service));

        const featuredSlugs = new Set(featured.map(service => service.slug));

        const remaining = services.filter(
            service => !featuredSlugs.has(service.slug),
        );

        return [...featured, ...remaining];
    }, [services]);

    const visibleServices = expanded
        ? orderedServices
        : orderedServices.slice(0, 3);

    return (
        <Section
            ref={sectionRef}
            component="section"
            aria-labelledby="what-we-offer-heading"
        >
            <SectionContainer maxWidth="xl">
                <Header>
                    <Eyebrow component="p">
                        Our Services
                    </Eyebrow>

                    <Heading
                        id="what-we-offer-heading"
                        component="h2"
                    >
                        What We Offer
                    </Heading>

                    <Intro component="p">
                        Our services are designed to unlock your digital potential,
                        enhance efficiency, and create lasting impact.
                    </Intro>
                </Header>

                <Grid>
                    {visibleServices.map((service, index) => (
                        <AnimatedCard
                            key={service.slug}
                            data-visible={inView || expanded ? 'true' : 'false'}
                            style={
                                {
                                    '--card-delay': `${index * 150}ms`,
                                } as React.CSSProperties
                            }
                        >
                            <ServiceOfferCard service={service} />
                        </AnimatedCard>
                    ))}
                </Grid>

                {!expanded && orderedServices.length > 3 ? (
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
