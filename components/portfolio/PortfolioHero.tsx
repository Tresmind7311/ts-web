'use client';

import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import {
    PrimaryButton,
    SecondaryButton,
} from '@/components/common/Button';
import { tokens } from '@/theme/theme';

const Section = styled('section')(() => ({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    backgroundColor: '#eef8fc',
    backgroundImage:
        'url("/images/services/Main/hero-background.jpg")',
    backgroundPosition: 'center top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    paddingTop: '75px'
}));

const Content = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '760px',
    padding: '72px 24px 48px',
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
        padding: '56px 24px 40px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '40px 20px 32px',
    },
}));

const HeroHeading = styled(Heading)(({ theme }) => ({
    maxWidth: '680px',
    lineHeight: 1.08,

    [theme.breakpoints.down('sm')]: {
        lineHeight: 1.1,
    },
}));

const Description = styled(Typography)(({ theme }) => ({
    maxWidth: '600px',
    marginTop: tokens.space[4],
    fontFamily: tokens.font.body,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: tokens.color.ink900,

    [theme.breakpoints.down('sm')]: {
        maxWidth: '360px',
        marginTop: tokens.space[3],
        fontSize: '14px',
    },
}));

const Actions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: tokens.space[4],
    marginTop: tokens.space[8],

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        flexDirection: 'column',
        gap: tokens.space[3],
        marginTop: tokens.space[6],
    },
}));

const Visual = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    width: '100%',
    lineHeight: 0,

    [theme.breakpoints.down('sm')]: {
        width: '140%',
        marginLeft: '-20%',
    },
}));

export default function PortfolioHero() {
    return (
        <Section>
            <Content>
                <HeroHeading variant="h1">
                    BRANDING NEED
                    <br />
                    INDEED THAT YOU
                </HeroHeading>

                <Description>
                    Elevate your brand with custom identity and package design.
                    <br />
                    Showcase your story through bold visuals and strategic design
                    solutions.
                </Description>

                <Actions>
                    <PrimaryButton
                        href="/contact"
                        component="a"
                        sx={{
                            minHeight: '44px',
                            padding: '10px 20px',
                            fontSize: '16px',
                        }}
                    >
                        Start Your Project
                    </PrimaryButton>

                    <SecondaryButton
                        href="/contact"
                        component="a"
                        sx={{
                            minHeight: '44px',
                            padding: '10px 20px',
                            fontSize: '16px',
                        }}
                    >
                        Schedule a Consultation
                    </SecondaryButton>
                </Actions>
            </Content>

            <Visual>
                <Image
                    src="/images/Portfolio/portfolio-main-img.png"
                    alt=""
                    width={1440}
                    height={610}
                    sizes="100vw"
                    priority
                    style={{
                        display: 'block',
                        width: '100%',
                        height: 'auto',
                    }}
                />
            </Visual>
        </Section>
    );
}