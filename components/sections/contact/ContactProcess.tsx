'use client';

import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';

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

const Section = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    borderRadius: '64px 64px 0 0',
    backgroundColor: tokens.color.uv800,
    backgroundImage: "url('/footer-bg.jpg')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    padding: '72px 0 92px',

    [theme.breakpoints.down('md')]: {
        borderRadius: '44px 44px 0 0',
        padding: '64px 0 76px',
        backgroundPosition: 'center center',
    },

    [theme.breakpoints.down('sm')]: {
        borderRadius: '30px 30px 0 0',
        padding: '48px 0 56px',
    },
}));

const Content = styled(Container)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,

    [theme.breakpoints.down('sm')]: {
        paddingInline: '18px',
    },
}));

const SectionHeading = styled(Heading)(({ theme }) => ({
    width: 'min(100%, 760px)',
    margin: '0 auto',
    textAlign: 'center',
    textTransform: 'none',
    lineHeight: 1.22,
    letterSpacing: '-0.04em',

    [theme.breakpoints.down('md')]: {
        width: 'min(100%, 680px)',
    },

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        lineHeight: 1.18,
    },
}));

const CardsGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '32px',
    width: '100%',
    marginTop: '66px',

    [theme.breakpoints.down('lg')]: {
        gap: '24px',
    },

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        marginTop: '52px',

        '& > :last-child': {
            gridColumn: '1 / -1',
            width: 'calc(50% - 12px)',
            justifySelf: 'center',
        },
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        gap: '18px',
        marginTop: '38px',

        '& > :last-child': {
            gridColumn: 'auto',
            width: '100%',
            justifySelf: 'stretch',
        },
    },
}));

const Card = styled(Box)(({ theme }) => ({
    minHeight: '224px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '20px 20px 18px',
    border: `1px solid ${alpha(tokens.color.ink900, 0.28)}`,
    borderRadius: '16px',
    backgroundColor: tokens.color.neutral0,

    [theme.breakpoints.down('lg')]: {
        minHeight: '214px',
    },

    [theme.breakpoints.down('sm')]: {
        minHeight: '196px',
        padding: '18px',
        borderRadius: '14px',
    },
}));

const IconImage = styled(Image)(({ theme }) => ({
    display: 'block',
    width: '58px',
    height: '58px',
    objectFit: 'contain',

    [theme.breakpoints.down('sm')]: {
        width: '52px',
        height: '52px',
    },
}));

const CardCopy = styled(Box)({
    width: '100%',
});

// const CardTitle = styled(Typography)(({ theme }) => ({
//     margin: 0,
//     fontFamily: tokens.font.display,
//     fontSize: '24px',
//     fontWeight: 700,
//     lineHeight: 1.2,
//     letterSpacing: '-0.025em',
//     color: tokens.color.uv800,

//     [theme.breakpoints.down('sm')]: {
//         fontSize: '21px',
//     },
// }));

const CardDescription = styled(Typography)(({ theme }) => ({
    marginTop: '4px',
    fontFamily: tokens.font.heroBody,
    fontSize: '20px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: '#000000CC',

    [theme.breakpoints.down('lg')]: {
        fontSize: '18px',
    },

    [theme.breakpoints.down('sm')]: {
        fontSize: '17px',
        lineHeight: 1.5,
    },
}));

const HEADING_GRADIENT = `linear-gradient(
    90deg,
    ${tokens.color.neutral0} 0%,
    ${tokens.color.uv300} 62%,
    ${tokens.color.uv300} 100%
)`;

export default function ContactProcess() {
    return (
        <Section
            component="section"
            aria-labelledby="contact-process-heading"
        >
            <Content maxWidth="lg">
                <SectionHeading
                    id="contact-process-heading"
                    variant="h2"
                    gradient={HEADING_GRADIENT}
                >
                    Let&apos;s turn your ideas into
                    <br />
                    powerful digital experiences.
                </SectionHeading>

                <CardsGrid>
                    {PROCESS_ITEMS.map((item) => (
                        <Card key={item.title}>
                            <IconImage
                                src="/images/send-icon.svg"
                                alt=""
                                width={58}
                                height={58}
                                aria-hidden="true"
                            />

                            <CardCopy>
                                <Heading variant="h4"
                                sx={{
                                    textTransform: 'capitalize'
                                }}>
                                    {item.title}
                                </Heading>

                                <CardDescription component="p">
                                    {item.description}
                                </CardDescription>
                            </CardCopy>
                        </Card>
                    ))}
                </CardsGrid>
            </Content>
        </Section>
    );
}
