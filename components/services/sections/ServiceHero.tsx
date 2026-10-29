'use client';

import Image from 'next/image';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { PrimaryButton, SecondaryButton } from '@/components/common/Button';
import { tokens } from '@/theme/theme';
import type { ServiceHeroData } from '@/data/services/types';
import Heading from '@/components/common/Heading';

interface ServiceHeroProps {
    data: ServiceHeroData;
}

const SERVICE_HERO_BACKGROUND = '/images/services/Main/hero-background.jpg';

const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    minHeight: 'clamp(620px, 78svh, 800px)',
    width: '100%',
    overflow: 'hidden',
    backgroundImage: `url('${SERVICE_HERO_BACKGROUND}')`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    '&::before': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '300px',
        backgroundImage: 'url("/images/services/faded-img.png")',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        pointerEvents: 'none',
        zIndex: 1,
    },

    [theme.breakpoints.down('md')]: {
        minHeight: 'auto',
    },
}));

const HeroContainer = styled(Container)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
    alignItems: 'center',
    gap: 'clamp(24px, 4vw, 72px)',
    paddingTop: 'clamp(88px, 9vw, 128px)',
    paddingBottom: 'clamp(32px, 4vw, 60px)',
    paddingLeft: 'clamp(24px, 3vw, 48px)',
    paddingRight: 'clamp(24px, 3vw, 48px)',

    [theme.breakpoints.down('lg')]: {
        gridTemplateColumns: 'minmax(0, 0.92fr) minmax(0, 1.08fr)',
        gap: '22px',
    },

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: '28px',
        padding: '64px 24px 48px',
    },

    [theme.breakpoints.down('sm')]: {
        paddingTop: '48px',
        paddingBottom: '32px',
    },
}));

const Content = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 2,
    maxWidth: '610px',

    [theme.breakpoints.down('md')]: {
        maxWidth: '680px',
    },
}));

const Eyebrow = styled(Typography)(({ theme }) => ({
    margin: '0 0 18px',
    fontFamily: tokens.font.body,
    fontSize: '11px',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '0.13em',
    textTransform: 'uppercase',
    color: tokens.color.uv300,

    [theme.breakpoints.down('sm')]: {
        marginBottom: '14px',
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    margin: 0,
    maxWidth: '660px',
    fontFamily: tokens.font.display,
    fontSize: 'clamp(48px, 5.2vw, 78px)',
    fontWeight: 700,
    lineHeight: 0.99,
    letterSpacing: '-0.045em',
    textTransform: 'uppercase',
    color: tokens.color.uv800,

    [theme.breakpoints.down('lg')]: {
        fontSize: 'clamp(44px, 5vw, 66px)',
    },

    [theme.breakpoints.down('md')]: {
        maxWidth: '620px',
        fontSize: 'clamp(42px, 8vw, 66px)',
    },

    [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(38px, 12vw, 54px)',
        lineHeight: 1.02,
    },
}));

const Description = styled(Typography)(({ theme }) => ({
    margin: 'clamp(22px, 2.1vw, 30px) 0 0',
    maxWidth: '590px',
    fontFamily: tokens.font.body,
    fontSize: 'clamp(15px, 1.15vw, 18px)',
    fontWeight: 400,
    lineHeight: 1.65,
    color: tokens.color.neutral700,

    [theme.breakpoints.down('md')]: {
        maxWidth: '640px',
    },

    [theme.breakpoints.down('sm')]: {
        marginTop: '18px',
        fontSize: '15px',
        lineHeight: 1.6,
    },
}));

const Actions = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '14px',
    marginTop: 'clamp(28px, 3vw, 38px)',

    [theme.breakpoints.down('sm')]: {
        alignItems: 'stretch',
        gap: '10px',
        marginTop: '26px',
    },
}));

const Visual = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    minWidth: 0,
    height: 'clamp(390px, 43vw, 620px)',

    [theme.breakpoints.down('lg')]: {
        height: 'clamp(360px, 42vw, 540px)',
    },

    [theme.breakpoints.down('md')]: {
        width: 'min(100%, 760px)',
        height: 'clamp(390px, 72vw, 620px)',
        marginInline: 'auto',
    },

    [theme.breakpoints.down('sm')]: {
        height: 'clamp(330px, 92vw, 500px)',
    },
}));

const HeroImage = styled(Image)({
    objectFit: 'contain',
    objectPosition: 'center',
    filter: 'drop-shadow(0 24px 34px rgba(7, 20, 99, 0.10))',
});

export default function ServiceHero({ data }: ServiceHeroProps) {
    return (
        <HeroSection component="section">
            <HeroContainer maxWidth="xl">
                <Content>
                    {data.eyebrow ? (
                        <Eyebrow component="p">
                            {data.eyebrow}
                        </Eyebrow>
                    ) : null}

                    <Heading variant="h1">
                        {data.title}
                    </Heading>
                    <Description component="p">
                        {data.description}
                    </Description>

                    <Actions>
                        <PrimaryButton
                            href={data.primaryCta.href}
                        >
                            {data.primaryCta.label}
                        </PrimaryButton>

                        <SecondaryButton
                            href={data.secondaryCta.href}
                        >
                            {data.secondaryCta.label}
                        </SecondaryButton>
                    </Actions>
                </Content>

                <Visual>
                    <HeroImage
                        src={data.image.src}
                        alt={data.image.alt}
                        fill
                        priority
                        sizes="(max-width: 959px) 92vw, (max-width: 1279px) 52vw, 720px"
                    />
                </Visual>
            </HeroContainer>
        </HeroSection>
    );
}
