'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

/**
 * LenisProvider
 * ─────────────
 * Mount ONCE in app/layout.tsx, wrapping {children}. Renders nothing extra
 * — it only sets up smooth scrolling and keeps every existing ScrollTrigger
 * (Stats/Work/Animation sections) perfectly in sync with it.
 *
 * Nothing in any section file needs to change:
 *   - HeroSection's `window.addEventListener('scroll', ...)` still fires,
 *     because Lenis drives the real scroll position and dispatches native
 *     scroll events by default (autoRaf: false just means WE drive its
 *     internal raf loop via GSAP's ticker instead of Lenis' own — the
 *     resulting scroll behavior is unchanged from the outside).
 *   - StatsSection / WorkSection / AnimationSection already create their
 *     own ScrollTrigger instances via '@/lib/gsap' — lenis.on('scroll', ...)
 *     below is what keeps those triggers' scrub/pin math reading Lenis'
 *     smoothed position instead of lagging behind it.
 *   - window.scrollBy() / window.scrollTo() calls (drag-to-scroll in
 *     WorkSection and AnimationSection) keep working unchanged — Lenis
 *     listens to the resulting native scroll and stays in sync.
 */
export default function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,          // smoothing amount — matches typical Lenis defaults
            wheelMultiplier: 1,
            touchMultiplier: 1,
            autoRaf: false,      // we drive Lenis' loop below via GSAP's ticker
        });

        // Every scroll tick (smoothed by Lenis) tells every existing
        // ScrollTrigger to recompute — this is the one line that actually
        // links the two libraries together.
        lenis.on('scroll', ScrollTrigger.update);

        // Drive Lenis from GSAP's ticker instead of its own requestAnimationFrame
        // loop — keeps both libraries perfectly frame-synced with no drift.
        const update = (time: number) => {
            lenis.raf(time * 1000);
        };
        gsap.ticker.add(update);

        // GSAP's default lag-smoothing fights Lenis' own easing curve —
        // disabling it here (not in lib/gsap.ts) keeps this change isolated
        // to the Lenis integration only.
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(update);
            lenis.destroy();
        };
    }, []);

    return <>{children}</>;
}