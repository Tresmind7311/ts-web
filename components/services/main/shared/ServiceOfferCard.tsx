'use client';

import Image from 'next/image';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

import { tokens } from '@/theme/theme';
import type { ServiceData } from '@/data/services/types';

interface ServiceOfferCardProps {
    service: ServiceData;
}

const ImageWrap = styled(Box)({
    position: 'relative',
    width: '100%',
    aspectRatio: '16 / 7.2',
    marginTop: '22px',
    overflow: 'hidden',
    borderRadius: '18px',
    backgroundColor: tokens.color.neutral100,
});

const CardImage = styled(Image)({
    objectFit: 'cover',
    objectPosition: 'center',
    transition: `transform ${tokens.motion.slow} ${tokens.motion.ease}`,
});

const Arrow = styled(Box)({
    position: 'absolute',
    right: '14px',
    bottom: '14px',
    zIndex: 2,
    display: 'grid',
    placeItems: 'center',
    width: '46px',
    height: '46px',
    borderRadius: tokens.radius.full,
    backgroundColor: tokens.color.uv300,
    color: tokens.color.neutral0,
    fontFamily: tokens.font.body,
    fontSize: '25px',
    lineHeight: 1,
    transition: `transform ${tokens.motion.base} ${tokens.motion.ease}`,
});

const Card = styled(Link)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    minWidth: 0,
    height: '100%',
    padding: '26px 22px 22px',
    borderRadius: '22px',
    backgroundColor: tokens.color.neutral0,
    color: tokens.color.ink900,
    textDecoration: 'none',
    boxShadow: `0 10px 28px ${alpha(tokens.color.ink900, 0.08)}`,
    transition: [
        `transform ${tokens.motion.slow} ${tokens.motion.ease}`,
        `box-shadow ${tokens.motion.slow} ${tokens.motion.ease}`,
    ].join(', '),

    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: `0 22px 52px ${alpha(tokens.color.ink900, 0.16)}`,
    },

    [`&:hover ${ImageWrap}`]: {
        '& img': {
            transform: 'scale(1.035)',
        },
    },

    [`&:hover ${Arrow}`]: {
        transform: 'translate(3px, -3px)',
    },

    '&:focus-visible': {
        outline: `3px solid ${tokens.color.uv300}`,
        outlineOffset: '4px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '22px 18px 18px',
        borderRadius: '18px',
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    margin: 0,
    maxWidth: '240px',
    fontFamily: tokens.font.display,
    fontSize: 'clamp(22px, 1.75vw, 30px)',
    fontWeight: 700,
    lineHeight: 1.06,
    letterSpacing: '-0.035em',
    color: tokens.color.uv800,

    [theme.breakpoints.down('sm')]: {
        fontSize: '22px',
    },
}));

const Description = styled(Typography)({
    marginTop: '14px',
    fontFamily: tokens.font.body,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.55,
    color: tokens.color.neutral600,
});

const SeeMore = styled(Typography)({
    display: 'inline-block',
    width: 'fit-content',
    marginTop: '4px',
    fontFamily: tokens.font.body,
    fontSize: '13px',
    fontWeight: 500,
    lineHeight: 1.4,
    color: tokens.color.uv800,
    textDecoration: 'underline',
    textUnderlineOffset: '2px',
});

export default function ServiceOfferCard({
    service,
}: ServiceOfferCardProps) {
    return (
        <Card href={`/services/${service.slug}`}>
            <Title component="h3">{service.name}</Title>

            <Description component="p">
                {service.listing.shortDescription}
            </Description>

            <SeeMore component="span">See more</SeeMore>

            <ImageWrap>
                <CardImage
                    src={service.listing.offerImage.src}
                    alt={service.listing.offerImage.alt}
                    fill
                    sizes="(max-width: 959px) 90vw, 31vw"
                />
                <Arrow aria-hidden="true">↗</Arrow>
            </ImageWrap>
        </Card>
    );
}
