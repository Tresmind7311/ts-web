'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

import ContactFaq from './ContactFaq';
import ContactHero from './ContactHero';
import ContactLocations from './ContactLocations';
import ContactProcess from './ContactProcess';
import { tokens } from '@/theme/theme';

const MiddleSection = styled(Box)(({ theme }) => ({
    backgroundColor: tokens.color.neutral0,
    padding: '54px 0 58px',

    [theme.breakpoints.down('md')]: {
        padding: '46px 0 50px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '36px 0 42px',
    },
}));

const MiddleLayout = styled(Container)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
    alignItems: 'stretch',
    gap: '28px',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: '34px',
    },

    [theme.breakpoints.down('sm')]: {
        paddingInline: '16px',
    },
}));

export default function ContactPage() {
    return (
        <main>
            <ContactHero />

            <MiddleSection component="section" aria-label="Contact information and process">
                <MiddleLayout maxWidth="lg">
                    <ContactFaq />
                    <ContactProcess />
                </MiddleLayout>
            </MiddleSection>

            <ContactLocations />
        </main>
    );
}
