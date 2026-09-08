'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/material/styles';

import { tokens } from '@/theme/theme';

const CUSTOMERS = [
    {
        name: 'Google',
        src: '/images/services/main/google.svg',
        width: 210,
        height: 72,
    },
    {
        name: 'Dribbble',
        src: '/images/services/main/dribbble.svg',
        width: 210,
        height: 72,
    },
    {
        name: 'LinkedIn',
        src: '/images/services/main/linkedin.svg',
        width: 210,
        height: 72,
    },
    {
        name: 'Amazon',
        src: '/images/services/main/amazon.svg',
        width: 210,
        height: 72,
    },
    {
        name: 'Medium',
        src: '/images/services/main/medium.svg',
        width: 210,
        height: 72,
    },
    {
        name: 'Spotify',
        src: '/images/services/main/spotify.svg',
        width: 210,
        height: 72,
    },
] as const;

const fadeUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(18px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Section = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: tokens.color.neutral0,
    borderTop: `3px solid ${tokens.color.uv300}`,

    [theme.breakpoints.down('sm')]: {
        borderTopWidth: '2px',
    },
}));

const SectionContainer = styled(Container)(({ theme }) => ({
    paddingTop: '86px',
    paddingBottom: '96px',

    [theme.breakpoints.down('md')]: {
        paddingTop: '68px',
        paddingBottom: '72px',
    },

    [theme.breakpoints.down('sm')]: {
        paddingTop: '52px',
        paddingBottom: '58px',
    },
}));

const Heading = styled(Typography)(({ theme }) => ({
    margin: 0,
    textAlign: 'center',
    fontFamily: tokens.font.display,
    fontSize: 'clamp(36px, 4vw, 58px)',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.04em',
    textTransform: 'uppercase',
    background: `linear-gradient(
        90deg,
        ${tokens.color.uv800} 0%,
        ${tokens.color.uv500} 58%,
        ${tokens.color.uv300} 100%
    )`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',

    [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(32px, 10vw, 42px)',
    },
}));

const LogoGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    alignItems: 'center',
    gap: '34px',
    marginTop: '66px',

    [theme.breakpoints.down('lg')]: {
        gap: '26px',
    },

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        rowGap: '46px',
        marginTop: '54px',
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        columnGap: '20px',
        rowGap: '34px',
        marginTop: '42px',
    },
}));

const LogoItem = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 0,
    minHeight: '72px',
    opacity: 0,
    animation: 'none',

    '&[data-visible="true"]': {
        animation: `${fadeUp} 650ms ${tokens.motion.ease} forwards`,
        animationDelay: 'var(--logo-delay)',
    },

    '@media (prefers-reduced-motion: reduce)': {
        opacity: 1,

        '&[data-visible="true"]': {
            animation: 'none',
        },
    },
});

const LogoFrame = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    maxWidth: '210px',
    height: '110px',
    transition: [
        `transform ${tokens.motion.base} ${tokens.motion.ease}`,
        `opacity ${tokens.motion.base} ${tokens.motion.ease}`,
    ].join(', '),

    '&:hover': {
        transform: 'translateY(-3px) scale(1.03)',
        opacity: 0.88,
    },

    [theme.breakpoints.down('lg')]: {
        maxWidth: '180px',
        height: '58px',
    },

    [theme.breakpoints.down('sm')]: {
        maxWidth: '150px',
        height: '50px',
    },
}));

const CustomerLogo = styled(Image)({
    objectFit: 'contain',
    objectPosition: 'center',
});

export default function TrustedCustomers() {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

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
                threshold: 0.2,
            },
        );

        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    return (
        <Section
            ref={sectionRef}
            component="section"
            aria-labelledby="trusted-customers-heading"
        >
            <SectionContainer maxWidth="xl">
                <Heading
                    id="trusted-customers-heading"
                    component="h2"
                >
                    Trusted Customers
                </Heading>

                <LogoGrid>
                    {CUSTOMERS.map((customer, index) => (
                        <LogoItem
                            key={customer.name}
                            data-visible={inView ? 'true' : 'false'}
                            style={
                                {
                                    '--logo-delay': `${index * 110}ms`,
                                } as React.CSSProperties
                            }
                        >
                            <LogoFrame>
                                <CustomerLogo
                                    src={customer.src}
                                    alt={customer.name}
                                    fill
                                    sizes="(max-width: 639px) 150px, (max-width: 1279px) 180px, 210px"
                                />
                            </LogoFrame>
                        </LogoItem>
                    ))}
                </LogoGrid>
            </SectionContainer>
        </Section>
    );
}
