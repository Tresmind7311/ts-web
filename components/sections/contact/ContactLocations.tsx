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

    [theme.breakpoints.down('sm')]: {
        paddingBottom: 0,
    },
}));

const MapFrame = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    aspectRatio: '2.6 / 1',
    overflow: 'hidden',
    borderRadius: '16px 16px 0 0',

    [theme.breakpoints.down('md')]: {
        aspectRatio: '16 / 8',
        borderRadius: '14px 14px 0 0',
    },

    [theme.breakpoints.down('sm')]: {
        aspectRatio: '4 / 3',
        borderRadius: '12px 12px 0 0',
    },
}));

const MapImage = styled(Image)(({ theme }) => ({
    objectFit: 'cover',
    objectPosition: 'center',

    [theme.breakpoints.down('sm')]: {
        objectPosition: '48% center',
    },
}));

export default function ContactLocations() {
    return (
        <Section
            id="contact-locations"
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
