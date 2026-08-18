/**
 * Central GSAP config — import from here, not directly from 'gsap'
 * so plugins register once and tree-shake cleanly.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Draggable } from 'gsap/Draggable';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Draggable);

    // Default ScrollTrigger settings
    ScrollTrigger.defaults({
        markers: process.env.NODE_ENV === 'development' ? false : false,
    });

    // Smooth scrub globally
    gsap.defaults({
        ease: 'power3.out',
        duration: 0.9,
    });
}

export { gsap, ScrollTrigger, ScrollToPlugin, Draggable };