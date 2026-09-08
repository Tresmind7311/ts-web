'use client';

import { useEffect, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { gsap } from '@/lib/gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import type { ServicesBannerProps } from './types';

// ─── Brand gradient ───────────────────────────────────────────────────────────
const GRAD_START = '#071463';
const GRAD_END   = '#0DB0DC';
const GRAD       = `linear-gradient(95deg, ${GRAD_START} 0%, ${GRAD_END} 100%)`;
const TEXT_MUTED = '#525252';

// ─── Styles ───────────────────────────────────────────────────────────────────
const Root = styled('section')({
    position       : 'relative',
    width          : '100%',
    minHeight      : 'clamp(300px, 36vw, 480px)',
    padding        : 'clamp(64px, 9vw, 120px) clamp(20px, 6vw, 80px)',
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    overflow       : 'hidden',
    isolation      : 'isolate',
});

const Bg = styled('div')({
    position          : 'absolute',
    inset             : 0,
    zIndex            : -2,
    backgroundSize    : 'cover',
    backgroundPosition: 'center',
    backgroundRepeat  : 'no-repeat',
    transformOrigin   : 'center',
    willChange        : 'transform',
});

const Overlay = styled('div')({
    position     : 'absolute',
    inset        : 0,
    zIndex       : -1,
    pointerEvents: 'none',
});

const Inner = styled('div')({
    position       : 'relative',
    zIndex         : 1,
    display        : 'flex',
    flexDirection  : 'column',
    alignItems     : 'center',
    textAlign      : 'center',
    gap            : 'clamp(16px, 2.2vw, 24px)',
    width          : '100%',
    maxWidth       : '860px',
    margin         : '0 auto',
});

const Label = styled('span')({
    display       : 'inline-block',
    fontFamily    : 'var(--font-body)',
    fontSize      : 'clamp(11px, 0.85vw, 13px)',
    fontWeight    : 600,
    letterSpacing : '0.12em',
    textTransform : 'uppercase',
    color         : GRAD_START,
});

const Heading = styled('h2')({
    margin               : 0,
    fontFamily           : 'var(--font-display)',
    fontSize             : 'clamp(44px, 7.8vw, 100px)',
    fontWeight           : 800,
    lineHeight           : 1.0,
    letterSpacing        : '-0.025em',
    textTransform        : 'uppercase',
    paddingBottom        : '0.06em',  // prevents gradient clip on descenders
    background           : GRAD,
    WebkitBackgroundClip : 'text',
    WebkitTextFillColor  : 'transparent',
    backgroundClip       : 'text',
});

const Description = styled('p')({
    margin    : 0,
    fontFamily: 'var(--font-body)',
    fontSize  : 'clamp(15px, 1.25vw, 18px)',
    fontWeight: 400,
    lineHeight: 1.75,
    color     : TEXT_MUTED,
    maxWidth  : '600px',
    textAlign : 'center',
});

const Buttons = styled('div')({
    display        : 'flex',
    flexWrap       : 'wrap',
    gap            : 'clamp(12px, 1.8vw, 20px)',
    justifyContent : 'center',
    alignItems     : 'center',
    marginTop      : 'clamp(4px, 0.8vw, 8px)',

    '@media (max-width: 540px)': {
        flexDirection: 'column',
        width        : '100%',
        maxWidth     : '300px',
    },
});

const btnBase = {
    display        : 'inline-flex',
    alignItems     : 'center',
    justifyContent : 'center',
    padding        : 'clamp(12px, 1.4vw, 15px) clamp(24px, 3vw, 40px)',
    borderRadius   : '10px',
    fontFamily     : 'var(--font-body)',
    fontSize       : 'clamp(14px, 1.1vw, 15px)',
    fontWeight     : 600,
    letterSpacing  : '0.01em',
    lineHeight     : 1,
    textDecoration : 'none',
    cursor         : 'pointer',
    whiteSpace     : 'nowrap' as const,
    transition     : 'transform 220ms cubic-bezier(0.16,1,0.3,1), box-shadow 220ms cubic-bezier(0.16,1,0.3,1)',
    '@media (max-width: 540px)': { width: '100%' },
    '&:focus-visible': { outline: `2px solid ${GRAD_END}`, outlineOffset: '3px' },
    '@media (prefers-reduced-motion: reduce)': { transition: 'none' },
} as const;

const PrimaryBtn = styled('a')({
    ...btnBase,
    background: GRAD,
    color     : '#fff',
    border    : '2px solid transparent',
    boxShadow : `0 2px 14px ${alpha(GRAD_START, 0.22)}`,
    '&:hover' : {
        transform : 'translateY(-2px)',
        boxShadow : `0 6px 28px ${alpha(GRAD_START, 0.28)}, 0 2px 10px ${alpha(GRAD_END, 0.22)}`,
    },
    '&:active': { transform: 'translateY(0)' },
});

const SecondaryBtn = styled('a')({
    ...btnBase,
    background    : 'rgba(255,255,255,0.82)',
    color         : GRAD_START,
    border        : `1.5px solid ${alpha(GRAD_START, 0.22)}`,
    backdropFilter: 'blur(8px)',
    '&:hover'     : {
        background  : '#fff',
        borderColor : GRAD_END,
        color       : GRAD_END,
        transform   : 'translateY(-2px)',
        boxShadow   : `0 4px 18px ${alpha(GRAD_END, 0.14)}`,
    },
    '&:active': { transform: 'translateY(0)' },
});

// ─── Component ────────────────────────────────────────────────────────────────
export default function ServicesBanner({
    smallLabel,
    heading,
    description,
    backgroundImage,
    backgroundOverlay,
    primaryButton,
    secondaryButton,
    className,
    id,
}: ServicesBannerProps) {
    const rootRef    = useRef<HTMLElement>(null);
    const bgRef      = useRef<HTMLDivElement>(null);
    const labelRef   = useRef<HTMLSpanElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descRef    = useRef<HTMLParagraphElement>(null);
    const btnsRef    = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const reduceMotion =
            window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion) {
            [labelRef.current, headingRef.current, descRef.current, btnsRef.current]
                .forEach((el) => {
                    if (!el) return;
                    el.style.opacity   = '1';
                    el.style.transform = 'none';
                });
            return;
        }

        const ctx = gsap.context(() => {
            if (bgRef.current) {
                gsap.to(bgRef.current, {
                    scale          : 1.06,
                    duration       : 18,
                    ease           : 'sine.inOut',
                    yoyo           : true,
                    repeat         : -1,
                    transformOrigin: 'center center',
                });
            }

            const targets = [
                smallLabel ? labelRef.current : null,
                headingRef.current,
                descRef.current,
                btnsRef.current,
            ].filter((el): el is HTMLElement => el !== null);

            gsap.set(targets, { opacity: 0, y: 40 });

            const tl = gsap.timeline({
                paused  : true,
                defaults: { duration: 0.85, ease: 'power3.out' },
            });

            tl.to(targets, { opacity: 1, y: 0, stagger: 0.15 });

            ScrollTrigger.create({
                trigger: root,
                start  : 'top 82%',
                once   : true,
                onEnter: () => tl.play(),
            });
        }, root);

        return () => ctx.revert();
    }, [smallLabel]);

    const overlayOpacity = backgroundOverlay?.opacity ?? 0;
    const overlayColor   = backgroundOverlay?.color   ?? 'rgba(255,255,255,0)';

    return (
        <Root
            ref={rootRef}
            id={id}
            className={className}
            aria-label={heading}
        >
            <Bg
                ref={bgRef}
                style={{ backgroundImage: `url("${backgroundImage}")` }}
                aria-hidden="true"
            />

            {overlayOpacity > 0 && (
                <Overlay
                    style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
                    aria-hidden="true"
                />
            )}

            <Inner>
                {smallLabel && (
                    <Label ref={labelRef}>{smallLabel}</Label>
                )}

                <Heading ref={headingRef}>{heading}</Heading>

                <Description ref={descRef}>{description}</Description>

                <Buttons ref={btnsRef}>
                    <PrimaryBtn href={primaryButton.href}>
                        {primaryButton.text}
                    </PrimaryBtn>
                    <SecondaryBtn href={secondaryButton.href}>
                        {secondaryButton.text}
                    </SecondaryBtn>
                </Buttons>
            </Inner>
        </Root>
    );
}