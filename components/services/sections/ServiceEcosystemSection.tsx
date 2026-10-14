'use client';

import Image from 'next/image';
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
    backgroundColor: '#D9F3FF',
}));

const Content = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1536px',
    margin: '0 auto',
    minHeight: 'clamp(620px, 52vw, 820px)',
    paddingLeft: 'clamp(40px, 5.5vw, 88px)',
    paddingRight: 'clamp(40px, 5.5vw, 88px)',
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    alignItems: 'center',
    gap: 'clamp(32px, 5vw, 80px)',

    [theme.breakpoints.down('md')]: {
        minHeight: 'auto',
        paddingTop: '64px',
        paddingBottom: '64px',
        paddingLeft: '32px',
        paddingRight: '32px',
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: 'minmax(0, 1fr)',
        gap: '32px',
        paddingTop: '48px',
        paddingBottom: '48px',
        paddingLeft: '20px',
        paddingRight: '20px',
    },
}));

const Copy = styled(Box)({
    minWidth: 0,
});

const Illustration = styled(Box)(({ theme }) => ({
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    '& img': {
        display: 'block',
        width: '100%',
        maxWidth: 'none',
        flexShrink: 0,
        objectFit: 'contain',
    },

    [theme.breakpoints.down('sm')]: {
        maxWidth: '560px',
        margin: '0 auto',
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
        <Section aria-labelledby="service-ecosystem-heading" sx={{ backgroundColor: data.backgroundColor ?? '#D9F3FF' }}>
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
                <Illustration>
                    <Image
                        src={data.image.src}
                        alt={data.image.alt}
                        width={1440}
                        height={756}
                        sizes="(max-width: 600px) 200vw, 100vw"
                    />
                </Illustration>
            </Content>
        </Section>
    );
}
