'use client';

import Image from 'next/image';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import { tokens } from '@/theme/theme';

const PROCESS_ITEMS = [
    {
        title: 'Understand',
        description: 'We learn about your goals, challenges, and expectations.',
    },
    {
        title: 'Plan',
        description: 'We create a strategy and roadmap tailored to your needs.',
    },
    {
        title: 'Deliver',
        description: 'We design, build, and deliver solutions that drive real results.',
    },
] as const;

const Card = styled(Box)(({ theme }) => ({
    position: 'relative',
    minHeight: '100%',
    overflow: 'hidden',
    borderRadius: '28px',
    backgroundColor: tokens.color.uv800,

    [theme.breakpoints.down('md')]: {
        minHeight: '500px',
    },

    [theme.breakpoints.down('sm')]: {
        minHeight: '460px',
        borderRadius: '22px',
    },
}));

const BackgroundImage = styled(Image)(({ theme }) => ({
    objectFit: 'cover',
    objectPosition: 'center right',

    [theme.breakpoints.down('sm')]: {
        objectPosition: '58% center',
    },
}));

const Overlay = styled(Box)(({ theme }) => ({
    position: 'absolute',
    inset: 0,
    zIndex: 1,
    background: `linear-gradient(
        90deg,
        rgba(7, 20, 99, 0.98) 0%,
        rgba(7, 20, 99, 0.92) 38%,
        rgba(7, 20, 99, 0.50) 67%,
        rgba(7, 20, 99, 0.10) 100%
    )`,

    [theme.breakpoints.down('sm')]: {
        background: `linear-gradient(
            90deg,
            rgba(7, 20, 99, 0.97) 0%,
            rgba(7, 20, 99, 0.86) 58%,
            rgba(7, 20, 99, 0.36) 100%
        )`,
    },
}));

const Content = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 2,
    width: '62%',
    minHeight: '100%',
    padding: '42px 34px 38px',

    [theme.breakpoints.down('lg')]: {
        width: '68%',
        padding: '36px 30px',
    },

    [theme.breakpoints.down('sm')]: {
        width: '78%',
        padding: '30px 22px',
    },
}));

const ProcessHeading = styled(Heading)(({ theme }) => ({
    color: tokens.color.neutral0,
    textTransform: 'none',
    fontSize: 'clamp(30px, 3vw, 42px)',
    fontWeight: 700,
    lineHeight: 1.16,
    letterSpacing: '-0.04em',

    [theme.breakpoints.down('sm')]: {
        fontSize: '30px',
    },
}));

const Items = styled(Box)({
    display: 'grid',
    gap: '24px',
    marginTop: '44px',
});

const ItemTitle = styled(Typography)({
    fontFamily: tokens.font.display,
    fontSize: '15px',
    fontWeight: 700,
    lineHeight: 1.3,
    color: tokens.color.neutral0,
});

const ItemDescription = styled(Typography)({
    maxWidth: '230px',
    marginTop: '4px',
    fontFamily: tokens.font.body,
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: 'rgba(255, 255, 255, 0.9)',
});

export default function ContactProcess() {
    return (
        <Card aria-labelledby="contact-process-heading">
            <BackgroundImage
                src="/images/contact-process-building.jpg"
                alt="Modern office buildings"
                fill
                sizes="(max-width: 959px) 100vw, 50vw"
            />

            <Overlay aria-hidden="true" />

            <Content>
                <ProcessHeading
                    id="contact-process-heading"
                    variant="h2"
                    gradient={false}
                >
                    Let&apos;s turn your ideas into powerful digital experiences.
                </ProcessHeading>

                <Items>
                    {PROCESS_ITEMS.map((item) => (
                        <Box key={item.title}>
                            <ItemTitle component="h3">
                                {item.title}
                            </ItemTitle>
                            <ItemDescription component="p">
                                {item.description}
                            </ItemDescription>
                        </Box>
                    ))}
                </Items>
            </Content>
        </Card>
    );
}
