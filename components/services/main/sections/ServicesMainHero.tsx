'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { tokens } from '@/theme/theme';

const HeroSection = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    minHeight: 'clamp(430px, 42vw, 570px)',
    overflow: 'hidden',
    backgroundImage: "url('/images/services/Main/hero-background.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',

    [theme.breakpoints.down('md')]: {
        minHeight: '430px',
    },

    [theme.breakpoints.down('sm')]: {
        minHeight: '440px',
    },
}));

const HeroContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    paddingTop: 'clamp(72px, 7vw, 108px)',
    paddingBottom: 'clamp(120px, 11vw, 170px)',

    [theme.breakpoints.down('md')]: {
        paddingTop: '72px',
        paddingBottom: '120px',
    },

    [theme.breakpoints.down('sm')]: {
        paddingTop: '58px',
        paddingBottom: '96px',
    },
}));

const Content = styled(Box)(({ theme }) => ({
    width: 'min(100%, 850px)',
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
        width: 'min(100%, 720px)',
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    margin: 0,
    fontFamily: tokens.font.display,
    fontSize: 'clamp(42px, 4.5vw, 64px)',
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: '-0.045em',
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
        fontSize: 'clamp(38px, 11vw, 50px)',
    },
}));

const Description = styled(Typography)(({ theme }) => ({
    maxWidth: '780px',
    margin: 'clamp(18px, 1.8vw, 24px) auto 0',
    fontFamily: tokens.font.body,
    fontSize: 'clamp(16px, 1.35vw, 19px)',
    fontWeight: 400,
    lineHeight: 1.45,
    color: tokens.color.textmuted800,

    [theme.breakpoints.down('md')]: {
        maxWidth: '670px',
    },

    [theme.breakpoints.down('sm')]: {
        marginTop: '18px',
        fontSize: '15px',
        lineHeight: 1.55,
    },
}));

const Actions = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '18px',
    marginTop: 'clamp(28px, 2.8vw, 38px)',

    [theme.breakpoints.down('sm')]: {
        alignItems: 'stretch',
        gap: '10px',
        marginTop: '26px',
    },
}));

const PrimaryButton = styled(Button)(({ theme }) => ({
    minHeight: '54px',
    padding: '13px 28px',
    borderRadius: '11px',
    fontFamily: tokens.font.body,
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1,
    textTransform: 'none',
    color: tokens.color.neutral0,
    background: `linear-gradient(
        100deg,
        ${tokens.color.uv800} 0%,
        ${tokens.color.uv500} 64%,
        ${tokens.color.uv300} 100%
    )`,
    boxShadow: 'none',

    '&:hover': {
        background: `linear-gradient(
            100deg,
            ${tokens.color.uv800} 0%,
            ${tokens.color.uv500} 64%,
            ${tokens.color.uv300} 100%
        )`,
        boxShadow: '0 10px 28px rgba(7, 20, 99, 0.16)',
        transform: 'translateY(-1px)',
    },

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        minHeight: '50px',
        fontSize: '15px',
    },
}));

const SecondaryButton = styled(Button)(({ theme }) => ({
    minHeight: '54px',
    padding: '13px 28px',
    borderRadius: '11px',
    fontFamily: tokens.font.body,
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1,
    textTransform: 'none',
    color: tokens.color.uv800,
    borderColor: 'rgba(7, 20, 99, 0.55)',
    background: 'rgba(255, 255, 255, 0.35)',

    '&:hover': {
        borderColor: tokens.color.uv500,
        background: 'rgba(255, 255, 255, 0.60)',
    },

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        minHeight: '50px',
        fontSize: '15px',
    },
}));

export default function ServicesMainHero() {
    return (
        <HeroSection component="section">
            <HeroContainer maxWidth="xl">
                <Content>
                    <Title component="h1">
                        Our Services
                    </Title>

                    <Description component="p">
                        We bring innovation, strategy, and technology together to build
                        solutions that accelerate your business growth. Our services are
                        designed to unlock your digital potential, enhance efficiency, and
                        create lasting impact.
                    </Description>

                    <Actions>
                        <PrimaryButton
                            component="a"
                            href="#contact"
                            variant="contained"
                        >
                            Start Your Project
                        </PrimaryButton>

                        <SecondaryButton
                            component="a"
                            href="#contact"
                            variant="outlined"
                        >
                            Schedule a Consultation
                        </SecondaryButton>
                    </Actions>
                </Content>
            </HeroContainer>
        </HeroSection>
    );
}
