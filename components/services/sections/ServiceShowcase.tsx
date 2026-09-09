'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/material/styles';

import type { ServiceShowcaseData } from '@/data/services/types';
import { tokens } from '@/theme/theme';

interface ServiceShowcaseProps {
    data: ServiceShowcaseData;
}

const imageReveal = keyframes`
    from {
        opacity: 0;
        transform: translateY(-38px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const contentReveal = keyframes`
    from {
        opacity: 0;
        transform: translateY(22px);
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
    paddingTop: 0,
    paddingBottom: '110px',

    [theme.breakpoints.down('md')]: {
        paddingBottom: '80px',
    },

    [theme.breakpoints.down('sm')]: {
        paddingBottom: '64px',
    },
}));

const CollageViewport = styled(Container)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',

    '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        zIndex: 20,
        width: 'clamp(55px, 7vw, 110px)',
        pointerEvents: 'none',
    },

    '&::before': {
        left: 0,
        background: `
            linear-gradient(
                90deg,
                ${tokens.color.neutral0} 0%,
                rgba(255, 255, 255, 0.92) 22%,
                rgba(255, 255, 255, 0.42) 62%,
                rgba(255, 255, 255, 0) 100%
            )
        `,
    },

    '&::after': {
        right: 0,
        background: `
            linear-gradient(
                270deg,
                ${tokens.color.neutral0} 0%,
                rgba(255, 255, 255, 0.92) 22%,
                rgba(255, 255, 255, 0.42) 62%,
                rgba(255, 255, 255, 0) 100%
            )
        `,
    },

    [theme.breakpoints.down('md')]: {
        '&::before, &::after': {
            width: '50px',
        },
    },

    [theme.breakpoints.down('sm')]: {
        '&::before, &::after': {
            width: '30px',
        },
    },
}));

const TopFade = styled(Box)(({ theme }) => ({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 15,
    height: '105px',
    pointerEvents: 'none',
    background: `
    linear-gradient(
        180deg,
        ${tokens.color.neutral0} 0%,
        rgba(255, 255, 255, 0.82) 20%,
        rgba(255, 255, 255, 0.38) 58%,
        rgba(255, 255, 255, 0) 100%
    )
`,

    [theme.breakpoints.down('md')]: {
        height: '85px',
    },

    [theme.breakpoints.down('sm')]: {
        height: '65px',
    },
}));

const CollageStage = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: 'repeat(9, 136px)',
    justifyContent: 'center',
    alignItems: 'start',
    gap: '12px',
    width: '100%',
    height: '445px',
    paddingInline: '6px',
    overflow: 'hidden',

    [theme.breakpoints.down('lg')]: {
        gap: '10px',
        height: '410px',
    },

    [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: '12px',
        height: '340px',
        paddingInline: '18px',
        overflowX: 'auto',
        overflowY: 'hidden',
        scrollSnapType: 'x proximity',
        scrollbarWidth: 'none',
        WebkitOverflowScrolling: 'touch',

        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },

    [theme.breakpoints.down('sm')]: {
        height: '285px',
        gap: '10px',
        paddingInline: '14px',
    },
}));

const Column = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    gap: '11px',
    transform: 'translateY(var(--column-offset))',

    [theme.breakpoints.down('md')]: {
        flex: '0 0 122px',
        scrollSnapAlign: 'start',
    },

    [theme.breakpoints.down('sm')]: {
        flexBasis: '102px',
        gap: '9px',
    },
}));

const PlaceholderCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    flexShrink: 0,
    width: '100%',
    aspectRatio: '0.82',
    borderRadius: '18px',
    backgroundColor: '#BFBFBF',
    opacity: 0.16,
    pointerEvents: 'none',

    [theme.breakpoints.down('sm')]: {
        borderRadius: '15px',
    },
}));

const ImageCard = styled(Box)(({ theme }) => ({
    position: 'relative',
    flexShrink: 0,
    width: '100%',
    aspectRatio: '0.82',
    overflow: 'hidden',
    borderRadius: '18px',
    backgroundColor: tokens.color.neutral100,
    opacity: 0,

    '&[data-visible="true"]': {
        animation: `${imageReveal} 700ms ${tokens.motion.ease} forwards`,
        animationDelay: 'var(--image-delay)',
    },

    [theme.breakpoints.down('sm')]: {
        borderRadius: '15px',
    },

    '@media (prefers-reduced-motion: reduce)': {
        opacity: 1,
        animation: 'none !important',
        transform: 'none',
    },
}));

const CardImage = styled(Image)({
    objectFit: 'cover',
    objectPosition: 'center',
});

const ContentContainer = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 25,
    marginTop: '50px',
    textAlign: 'center',
    opacity: 0,

    '&[data-visible="true"]': {
        animation: `${contentReveal} 720ms ${tokens.motion.ease} 700ms forwards`,
    },

    [theme.breakpoints.down('md')]: {
        marginTop: '8px',
    },

    '@media (prefers-reduced-motion: reduce)': {
        opacity: 1,
        animation: 'none !important',
    },
}));

const Heading = styled(Typography)(({ theme }) => ({
    width: 'min(100%, 700px)',
    margin: '0 auto',
    fontFamily: tokens.font.display,
    fontSize: 'clamp(42px, 3.6vw, 58px)',
    fontWeight: 700,
    lineHeight: 1.1,
    letterSpacing: '-0.045em',

    background: `linear-gradient(
        90deg,
        ${tokens.color.uv800} 0%,
        ${tokens.color.uv500} 56%,
        ${tokens.color.uv300} 100%
    )`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    color: 'transparent',

    [theme.breakpoints.down('md')]: {
        width: 'min(100%, 620px)',
        fontSize: 'clamp(38px, 7vw, 52px)',
    },

    [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(32px, 9.5vw, 42px)',
        lineHeight: 1.08,
    },
}));

const Description = styled(Typography)(({ theme }) => ({
    maxWidth: '620px',
    margin: '22px auto 0',
    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 1.55,
    color: tokens.color.neutral700,

    [theme.breakpoints.down('md')]: {
        maxWidth: '580px',
        fontSize: '16px',
    },

    [theme.breakpoints.down('sm')]: {
        maxWidth: '92%',
        marginTop: '16px',
        fontSize: '15px',
    },
}));

/*
 * Desktop Figma composition.
 * Values intentionally alternate columns vertically.
 */
const COLUMN_OFFSETS = [
    '158px',
    '-44px',
    '68px',
    '-38px',
    '148px',
    '-42px',
    '158px',
    '-36px',
    '164px',
];

const COLUMN_STAGGER = 160;
const IMAGE_STAGGER = 90;

export default function ServiceShowcase({
    data,
}: ServiceShowcaseProps) {
    const sectionRef = useRef<HTMLElement | null>(null);
    const [inView, setInView] = useState(false);

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
            aria-labelledby="service-showcase-heading"
        >
            <CollageViewport
                maxWidth="lg"
                disableGutters
            >
                <TopFade aria-hidden="true" />

                <CollageStage>
                    {data.columns.map((column, columnIndex) => (
                        <Column
                            key={columnIndex}
                            style={
                                {
                                    '--column-offset':
                                        COLUMN_OFFSETS[columnIndex] ?? '0px',
                                } as React.CSSProperties
                            }
                        >
                            {column.placeholder ? (
                                <PlaceholderCard aria-hidden="true" />
                            ) : null}

                            {column.images.map((image, imageIndex) => {
                                const delay =
                                    columnIndex * COLUMN_STAGGER +
                                    imageIndex * IMAGE_STAGGER;

                                return (
                                    <ImageCard
                                        key={`${image.src}-${columnIndex}-${imageIndex}`}
                                        data-visible={
                                            inView ? 'true' : 'false'
                                        }
                                        style={
                                            {
                                                '--image-delay': `${delay}ms`,
                                            } as React.CSSProperties
                                        }
                                    >
                                        <CardImage
                                            src={image.src}
                                            alt={image.alt}
                                            fill
                                            sizes="(max-width: 600px) 102px, (max-width: 960px) 122px, 130px"
                                        />
                                    </ImageCard>
                                );
                            })}
                        </Column>
                    ))}
                </CollageStage>
            </CollageViewport>

            <ContentContainer
                maxWidth="lg"
                data-visible={inView ? 'true' : 'false'}
            >
                <Heading
                    id="service-showcase-heading"
                    component="h2"
                >
                    {data.title}
                </Heading>

                <Description component="p">
                    {data.description}
                </Description>
            </ContentContainer>
        </Section>
    );
}