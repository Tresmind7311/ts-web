'use client';

import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import { tokens } from '@/theme/theme';
import type { ServiceData } from '@/data/services/types';

interface ServiceShowcaseCardProps {
    service: ServiceData;
    tilt: number;
}

const CardLink = styled(Link)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderRadius: '22px 22px 0 0',
    backgroundColor: tokens.color.neutral0,
    color: tokens.color.uv800,
    textDecoration: 'none',
    boxShadow: `0 3px 18px ${alpha(tokens.color.ink900, 0.12)}`,
    transform: 'rotate(var(--card-tilt))',
    transformOrigin: '50% 100%',
    transition: [
        `transform 360ms ${tokens.motion.ease}`,
        `box-shadow 360ms ${tokens.motion.ease}`,
    ].join(', '),
    willChange: 'transform',

    '&:hover': {
        zIndex: 50,
        transform: 'rotate(0deg) scale(1.06) translateY(-8px)',
        boxShadow: `0 20px 48px ${alpha(tokens.color.ink900, 0.22)}`,
    },

    '&:focus-visible': {
        zIndex: 50,
        outline: `3px solid ${tokens.color.uv300}`,
        outlineOffset: '3px',
        transform: 'rotate(0deg) scale(1.04) translateY(-6px)',
    },

    [theme.breakpoints.down('md')]: {
        minWidth: '280px',
        borderRadius: '20px',
        transform: 'none',

        '&:hover': {
            transform: 'scale(1.025)',
        },
    },
}));

const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: '12px',
    height: '112px',
    padding: '30px 22px 12px 30px',
    flexShrink: 0,

    [theme.breakpoints.down('xl')]: {
        height: '100px',
        padding: '24px 18px 10px 24px',
    },

    [theme.breakpoints.down('lg')]: {
        height: '90px',
        padding: '20px 14px 8px 18px',
    },

    [theme.breakpoints.down('md')]: {
        height: '94px',
        padding: '22px 18px 10px 20px',
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    margin: 0,
    maxWidth: '190px',
    fontFamily: tokens.font.display,
    fontWeight: 700,
    fontSize: 'clamp(22px, 1.55vw, 31px)',
    lineHeight: 0.96,
    letterSpacing: '-0.035em',
    color: tokens.color.uv800,

    [theme.breakpoints.down('lg')]: {
        fontSize: 'clamp(17px, 1.45vw, 24px)',
        maxWidth: '150px',
    },

    [theme.breakpoints.down('md')]: {
        fontSize: '22px',
        maxWidth: '175px',
    },
}));

const Arrow = styled(Box)(({ theme }) => ({
    display: 'grid',
    placeItems: 'center',
    flex: '0 0 auto',
    width: '48px',
    height: '48px',
    marginTop: '-2px',
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.color.uv800,
    color: tokens.color.neutral0,
    fontFamily: tokens.font.body,
    fontSize: '29px',
    fontWeight: 400,
    lineHeight: 1,

    [theme.breakpoints.down('xl')]: {
        width: '42px',
        height: '42px',
        fontSize: '25px',
    },

    [theme.breakpoints.down('lg')]: {
        width: '36px',
        height: '36px',
        fontSize: '22px',
    },
}));

const ImageWrap = styled(Box)({
    position: 'relative',
    flex: 1,
    minHeight: 0,
    width: '100%',
    overflow: 'hidden',
});

const ShowcaseImage = styled(Image)({
    objectFit: 'cover',
    objectPosition: 'center bottom',
});

export default function ServiceShowcaseCard({
    service,
    tilt,
}: ServiceShowcaseCardProps) {
    return (
        <CardLink
            href={`/services/${service.slug}`}
            aria-label={`View ${service.name}`}
            style={
                {
                    '--card-tilt': `${tilt}deg`,
                } as React.CSSProperties
            }
        >
            <Header>
                <Title component="h2">{service.name}</Title>
                <Arrow aria-hidden="true">→</Arrow>
            </Header>

            <ImageWrap>
                <ShowcaseImage
                    src={service.listing.showcaseImage.src}
                    alt={service.listing.showcaseImage.alt}
                    fill
                    priority
                    sizes="(max-width: 959px) 280px, 17vw"
                />
            </ImageWrap>
        </CardLink>
    );
}
