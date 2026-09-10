'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export default function LenisProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        const mq = window.matchMedia('(prefers-reduced-motion: reduce)');

        const init = (reducedMotion: boolean) => {
            const lenis = new Lenis({
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

            // Cap lag smoothing at 500ms threshold / 33ms max delta.
            // Previously set to lagSmoothing(0) which disabled it entirely —
            // that caused GSAP and Lenis to burst through all missed frames
            // simultaneously after an iOS Safari tab background/foreground
            // event, producing a frame spike on resume.
            // The 500/33 cap (GSAP's own default) prevents the burst while
            // still allowing Lenis' easing curve to run normally during scroll.
            gsap.ticker.lagSmoothing(500, 33);

            return () => {
                gsap.ticker.remove(update);
                lenis.destroy();
            };
        };

        let cleanup = init(mq.matches);

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