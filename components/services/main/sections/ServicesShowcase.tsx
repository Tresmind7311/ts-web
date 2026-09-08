'use client';

import Box from '@mui/material/Box';
import { keyframes, styled } from '@mui/material/styles';

import ServiceShowcaseCard from '@/components/services/main/shared/ServiceShowcaseCard';
import type { ServiceData } from '@/data/services/types';

interface ServicesShowcaseProps {
    services: ServiceData[];
}

const CARD_TILTS = [-2.2, -0.7, 2.1, -0.9, 1.5, 2.7];
const CARD_OFFSETS = [18, 9, 0, 10, 0, 12];

const cardIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(34px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Section = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 10,
    width: '100%',
    marginTop: '-122px',
    padding: '0 10px',
    overflow: 'visible',

    [theme.breakpoints.down('lg')]: {
        marginTop: '-100px',
        paddingInline: '8px',
    },

    [theme.breakpoints.down('md')]: {
        marginTop: '-54px',
        padding: '0 16px 24px',
    },
}));

const Track = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
    alignItems: 'start',
    width: '100%',
    maxWidth: '1920px',
    minHeight: '405px',
    margin: '0 auto',
    overflow: 'visible',

    [theme.breakpoints.down('xl')]: {
        minHeight: '355px',
    },

    [theme.breakpoints.down('lg')]: {
        minHeight: '315px',
    },

    [theme.breakpoints.down('md')]: {
        display: 'flex',
        gap: '14px',
        minHeight: 0,
        overflowX: 'auto',
        overflowY: 'visible',
        padding: '10px 2px 26px',
        scrollSnapType: 'x mandatory',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',

        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
}));

const tokensEase = 'cubic-bezier(0.16, 1, 0.3, 1)';

const Item = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 1,
    height: '390px',
    marginTop: 'var(--card-offset)',
    marginLeft: '-1px',
    opacity: 0,
    animation: `${cardIn} 680ms ${tokensEase} forwards`,
    animationDelay: 'var(--card-delay)',

    '&:hover': {
        zIndex: 30,
    },

    [theme.breakpoints.down('xl')]: {
        height: '345px',
    },

    [theme.breakpoints.down('lg')]: {
        height: '305px',
    },

    [theme.breakpoints.down('md')]: {
        flex: '0 0 280px',
        height: '350px',
        marginTop: 0,
        marginLeft: 0,
        scrollSnapAlign: 'start',
    },

    '@media (prefers-reduced-motion: reduce)': {
        opacity: 1,
        animation: 'none',
    },
}));

export default function ServicesShowcase({
    services,
}: ServicesShowcaseProps) {
    return (
        <Section component="section" aria-label="Service categories">
            <Track>
                {services.map((service, index) => (
                    <Item
                        key={service.slug}
                        style={
                            {
                                '--card-delay': `${80 + index * 130}ms`,
                                '--card-offset': `${CARD_OFFSETS[index] ?? 0}px`,
                            } as React.CSSProperties
                        }
                    >
                        <ServiceShowcaseCard
                            service={service}
                            tilt={CARD_TILTS[index] ?? 0}
                        />
                    </Item>
                ))}
            </Track>
        </Section>
    );
}
