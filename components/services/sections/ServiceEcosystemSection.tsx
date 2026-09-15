'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import Heading from '@/components/common/Heading';
import { tokens } from '@/theme/theme';
import type { ServiceEcosystemData } from '@/data/services/types';

interface Props {
    data: ServiceEcosystemData;
}

const Section = styled('section')(({ theme }) => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: '#F3FDFF',

    [theme.breakpoints.down('md')]: {
        minHeight: 'auto',
    },
}));

const Background = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    minHeight: 'clamp(620px, 52vw, 820px)',

    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',

    display: 'flex',
    alignItems: 'center',

    [theme.breakpoints.down('md')]: {
        minHeight: '720px',
        alignItems: 'flex-start',
        backgroundPosition: '65% center',
    },

    [theme.breakpoints.down('sm')]: {
        minHeight: '760px',
        backgroundPosition: '72% center',
    },
}));

const Content = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,

    width: '100%',
    maxWidth: '1536px',
    margin: '0 auto',

    paddingLeft: 'clamp(40px, 5.5vw, 88px)',
    paddingRight: 'clamp(40px, 5.5vw, 88px)',

    [theme.breakpoints.down('md')]: {
        paddingTop: '64px',
        paddingLeft: '32px',
        paddingRight: '32px',
    },

    [theme.breakpoints.down('sm')]: {
        paddingTop: '48px',
        paddingLeft: '20px',
        paddingRight: '20px',
    },
}));

const Copy = styled(Box)(({ theme }) => ({
    width: 'min(47%, 650px)',

    [theme.breakpoints.down('md')]: {
        width: '55%',
    },

    [theme.breakpoints.down('sm')]: {
        width: '100%',
    },
}));

const Description = styled(Typography)(({ theme }) => ({
    marginTop: '32px',

    fontFamily: tokens.font.body,
    fontSize: 'clamp(16px, 1.35vw, 20px)',
    fontWeight: 400,
    lineHeight: 1.55,
    color: tokens.color.ink900,

    maxWidth: '640px',

    [theme.breakpoints.down('sm')]: {
        marginTop: '24px',
        fontSize: '16px',
        lineHeight: 1.6,
    },
}));

const Flow = styled(Typography)(({ theme }) => ({
    marginTop: '28px',

    fontFamily: tokens.font.body,
    fontSize: 'clamp(16px, 1.3vw, 20px)',
    fontWeight: 700,
    lineHeight: 1.5,
    color: tokens.color.ink900,

    [theme.breakpoints.down('sm')]: {
        marginTop: '24px',
        fontSize: '15px',
    },
}));

const ClosingText = styled(Typography)(({ theme }) => ({
    marginTop: '26px',

    fontFamily: tokens.font.body,
    fontSize: 'clamp(16px, 1.25vw, 19px)',
    fontWeight: 400,
    lineHeight: 1.55,
    color: tokens.color.ink900,

    [theme.breakpoints.down('sm')]: {
        marginTop: '22px',
        fontSize: '16px',
    },
}));

export default function ServiceEcosystemSection({ data }: Props) {
    return (
        <Section aria-labelledby="service-ecosystem-heading">
            <Background
                sx={{
                    backgroundImage: `url("${data.backgroundImage}")`,
                }}
            >
                <Content>
                    <Copy>
                        <Heading
                            id="service-ecosystem-heading"
                            variant="h2"
                            sx={{
                                maxWidth: '620px',
                            }}
                        >
                            {data.title}
                        </Heading>

                        <Description>
                            {data.description}
                        </Description>

                        <Flow>
                            {data.flow}
                        </Flow>

                        <ClosingText>
                            {data.closingText}
                        </ClosingText>
                    </Copy>
                </Content>
            </Background>
        </Section>
    );
}