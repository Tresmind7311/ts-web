import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Fade up on scroll ────────────────────────────────────────────
export function useFadeUp(
    ref: RefObject<HTMLElement | null>,
    options?: {
        y?: number;
        duration?: number;
        delay?: number;
        stagger?: number;
        scrub?: boolean;
    }
) {
    useEffect(() => {
        if (!ref.current) return;

        const targets = ref.current.querySelectorAll('[data-fade]');
        const els = targets.length ? targets : [ref.current];

        const ctx = gsap.context(() => {
            gsap.fromTo(
                els,
                { opacity: 0, y: options?.y ?? 40 },
                {
                    opacity: 1,
                    y: 0,
                    duration: options?.duration ?? 0.9,
                    delay: options?.delay ?? 0,
                    stagger: options?.stagger ?? 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }, ref);

        return () => ctx.revert();
    }, [ref, options]);
}

// ─── Horizontal scroll pinning ────────────────────────────────────
export function usePinHorizontal(
    containerRef: RefObject<HTMLElement | null>,
    trackRef: RefObject<HTMLElement | null>
) {
    useEffect(() => {
        if (!containerRef.current || !trackRef.current) return;

        const ctx = gsap.context(() => {
            const totalWidth =
                trackRef.current!.scrollWidth - containerRef.current!.offsetWidth;

            gsap.to(trackRef.current, {
                x: -totalWidth,
                ease: 'none',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top top',
                    end: () => `+=${totalWidth}`,
                    pin: true,
                    scrub: 1,
                    anticipatePin: 1,
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, [containerRef, trackRef]);
}

// ─── Text split reveal ────────────────────────────────────────────
export function useTextReveal(ref: RefObject<HTMLElement | null>) {
    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(async () => {
            const { SplitText } = await import('gsap/SplitText');
            gsap.registerPlugin(SplitText);

            const split = new SplitText(ref.current!, { type: 'lines,words' });

            gsap.fromTo(
                split.words,
                { opacity: 0, y: '110%' },
                {
                    opacity: 1,
                    y: '0%',
                    duration: 0.7,
                    stagger: 0.05,
                    ease: 'power4.out',
                    scrollTrigger: {
                        trigger: ref.current,
                        start: 'top 80%',
                    },
                }
            );
        }, ref);

        return () => ctx.revert();
    }, [ref]);
}

// ─── Parallax ─────────────────────────────────────────────────────
export function useParallax(
    ref: RefObject<HTMLElement | null>,
    speed = 0.3
) {
    useEffect(() => {
        if (!ref.current) return;

        const ctx = gsap.context(() => {
            gsap.to(ref.current, {
                yPercent: speed * 100 * -1,
                ease: 'none',
                scrollTrigger: {
                    trigger: ref.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
            });
        }, ref);

        return () => ctx.revert();
    }, [ref, speed]);
}

export { ScrollTrigger };