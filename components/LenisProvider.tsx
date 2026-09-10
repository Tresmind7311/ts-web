'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

        const init = (reducedMotion: boolean) => {
            const lenis = new Lenis({
                // lerp: 1 = instant scroll (no smoothing) when reduced motion is on.
                // Lenis still runs its RAF loop and fires the 'scroll' event,
                // so ScrollTrigger.update keeps receiving updates and pinned
                // sections behave correctly. Without this, Lenis changes its
                // internal behaviour under reduced motion in a way that breaks
                // the ScrollTrigger update chain and leaves sections stuck.
                lerp: reducedMotion ? 1 : 0.1,
                wheelMultiplier: 1,
                touchMultiplier: 1,
                autoRaf: false,
            });

            lenis.on('scroll', ScrollTrigger.update);

            const update = (time: number) => {
                lenis.raf(time * 1000);
            };
            gsap.ticker.add(update);

            // GSAP's default lag-smoothing fights Lenis' own easing curve —
            // disabling it here keeps this change isolated to the Lenis
            // integration only.
            gsap.ticker.lagSmoothing(0);

            return () => {
                gsap.ticker.remove(update);
                lenis.destroy();
            };
        };

        // Initialise with the current preference.
        let cleanup = init(mq.matches);

        // If the user toggles Reduce Motion while the page is open,
        // tear down the current Lenis instance and reinitialise with
        // the updated lerp value so the change takes effect immediately.
        const onChange = (e: MediaQueryListEvent) => {
            cleanup();
            cleanup = init(e.matches);
        };

        mq.addEventListener('change', onChange);

        return () => {
            mq.removeEventListener('change', onChange);
            cleanup();
        };
    }, []);

    return <>{children}</>;
}