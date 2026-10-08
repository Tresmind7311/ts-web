'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { gsap } from '@/lib/gsap';
// The map silhouette is extracted from the supplied Contact PDF.
const Map = styled('div')(({ theme }) => ({
    position: 'absolute', 
    inset: '0 0 auto', 
    height: 590, 
    pointerEvents: 'none', 
    backgroundImage: "url('/images/contact-world-map.png')", 
    backgroundSize: '100% auto', 
    backgroundPosition: 'center', 
    backgroundRepeat: 'no-repeat', [theme.breakpoints.down('md')]: {
        height: 540, backgroundSize: 'auto 100%'
    }, [theme.breakpoints.down('sm')]: {
        height: 520, backgroundSize: 'auto 90%', opacity: 0.7
    }
}));
const Marker = styled('div')(({ theme }) => ({
    position: 'absolute', width: 66, '& img': {
        display: 'block', width: '100%', height: 'auto'
    }, [theme.breakpoints.down('sm')]: {
        width: 40
    }
}));
const positions = [
    {
        left: '15%', top: '15%'
    },
    {
        left: '83%', top: '7%'
    },
    {
        left: '23%', top: '55%'
    },
    {
        left: '81%', top: '74%'
    }
];
export default function ContactLocations() {
    const mapRef = useRef<HTMLDivElement>(null);
    const played = useRef(false);
    useEffect(() => {
        const media = gsap.matchMedia();
        media.add({
            reduced: '(prefers-reduced-motion: reduce)', animated: '(prefers-reduced-motion: no-preference)'
        }, (context) => {
            if (context.conditions?.reduced) {
                played.current = true;
                return;
            }
            if (played.current)
                return;
            const markers = mapRef.current?.querySelectorAll('[data-contact-marker]');
            if (!markers?.length)
                return;
            gsap.from(markers, {
                autoAlpha: 0, scale: 0.45, y: 24, duration: 0.65, stagger: 0.18, ease: 'back.out(1.5)', onComplete: () => { played.current = true; }, scrollTrigger: {
                    trigger: mapRef.current, start: 'top 90%', once: true
                }
            });
        });
        return () => media.revert();
    }, []);
    return <Map id="contact-locations" ref={mapRef} aria-hidden="true">{positions.map((position, index) => <Marker key={index} style={position}><div data-contact-marker><Image src="/images/contact-location-icon.png" alt="" width={66} height={80}/></div></Marker>)}</Map>;
}
