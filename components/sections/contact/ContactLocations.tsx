'use client';

import Image from 'next/image';

import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

import { tokens } from '@/theme/theme';

const Section = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    backgroundColor: tokens.color.neutral0,
}));

const MapFrame = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    aspectRatio: '1440 / 811',
    overflow: 'hidden',

    [theme.breakpoints.down('md')]: {
        aspectRatio: '16 / 10',
    },

    [theme.breakpoints.down('sm')]: {
        aspectRatio: '4 / 3',
    },
}));

const MapImage = styled(Image)(({ theme }) => ({
    objectFit: 'cover',
    objectPosition: 'center',

    [theme.breakpoints.down('sm')]: {
        /*
         * Keeps main center marker visible while allowing
         * outer map to crop naturally on narrow screens.
         */
        objectPosition: '48% center',
    },
}));

export default function ContactLocations() {
    return (
        <Section
            component="section"
            aria-label="Our locations"
        >
            <MapFrame>
                <MapImage
                    src="/images/location-map.jpg"
                    alt="Map showing our locations"
                    fill
                    sizes="100vw"
                />
            </MapFrame>
        </Section>
    );
}