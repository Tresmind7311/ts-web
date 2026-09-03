'use client';

import {
    useEffect,
    useRef,
    type PointerEvent as ReactPointerEvent,
} from 'react';

import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { tokens } from '@/theme/theme';

type ServicesOverviewSectionProps = {
    exploreHref?: string;
};

const clamp01 = (value: number) =>
    Math.max(0, Math.min(1, value));


const Section = styled('section')({
    position: 'relative',
    width: '100%',
    height: '100vh',
    background: tokens.color.neutral0,
});

const StickyViewport = styled(Box)({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    background: tokens.color.neutral0,
});

const Scene = styled(Box)({
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    willChange: 'transform, opacity',
});

const Grain = styled(Box)({
    position: 'absolute',
    inset: 0,
    zIndex: 0,
    pointerEvents: 'none',
    opacity: 0.16,
    backgroundImage: [
        'radial-gradient(circle at 8% 17%, rgba(18,18,26,0.20) 0 0.55px, transparent 0.75px)',
        'radial-gradient(circle at 79% 29%, rgba(18,18,26,0.14) 0 0.55px, transparent 0.8px)',
        'radial-gradient(circle at 33% 76%, rgba(18,18,26,0.12) 0 0.5px, transparent 0.8px)',
    ].join(','),
    backgroundSize: '83px 91px, 107px 103px, 127px 119px',
});

const baseWord = {
    position: 'absolute' as const,
    zIndex: 2,
    margin: 0,
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    lineHeight: 0.82,
    letterSpacing: '-0.055em',
    textTransform: 'uppercase' as const,
    whiteSpace: 'nowrap' as const,
    userSelect: 'none' as const,
    cursor: 'default',
    transition:
        'color 260ms ease, -webkit-text-stroke-color 260ms ease',
};

const FilledWord = styled('div')(({ theme }) => ({
    ...baseWord,
    color: tokens.color.ink900,

    '&:hover': {
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        backgroundImage:
            'radial-gradient(circle at var(--hover-x, 50%) 52%, #6f99c8 0%, #3f6796 25%, #1f3552 44%, #12121a 73%)',
    },

    [theme.breakpoints.down('sm')]: {
        letterSpacing: '-0.04em',
    },
}));

const OutlineWord = styled('div')(({ theme }) => ({
    ...baseWord,
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    WebkitTextStroke:
        `1.7px ${tokens.color.ink900}`,

    '&:hover': {
        WebkitTextStrokeColor: '#345a86',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        backgroundImage:
            'radial-gradient(circle at var(--hover-x, 50%) 52%, rgba(111,153,200,0.72) 0%, rgba(63,103,150,0.38) 35%, transparent 70%)',
    },

    [theme.breakpoints.down('md')]: {
        WebkitTextStrokeWidth: '1.35px',
    },
}));

const UIUX = styled(FilledWord)(({ theme }) => ({
    top: '9.5vh',
    left: '3.7vw',
    fontSize: 'clamp(58px, 6.2vw, 98px)',

    [theme.breakpoints.down('md')]: {
        top: '9vh',
        left: '5vw',
        fontSize: 'clamp(46px, 10vw, 76px)',
    },

    [theme.breakpoints.down('sm')]: {
        top: '8vh',
        left: '6vw',
        fontSize: 'clamp(42px, 13vw, 62px)',
    },
}));

const Web = styled(OutlineWord)(({ theme }) => ({
    top: '8vh',
    right: '11.2vw',
    fontSize: 'clamp(48px, 5.1vw, 80px)',
    letterSpacing: '-0.04em',

    [theme.breakpoints.down('md')]: {
        top: '10vh',
        right: '6vw',
        fontSize: 'clamp(42px, 8.2vw, 64px)',
    },

    [theme.breakpoints.down('sm')]: {
        top: '18vh',
        right: '7vw',
        fontSize: 'clamp(35px, 10.5vw, 52px)',
    },
}));

const BrandingGroup = styled(Box)(({ theme }) => ({
    position: 'absolute',
    zIndex: 3,
    top: '30.3vh',
    left: '8.7vw',
    '--hover-x': '50%',

    '&:hover .branding-main': {
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        backgroundImage:
            'radial-gradient(circle at var(--hover-x) 54%, #7da4d1 0%, #4d75a4 24%, #2d4b70 41%, #12121a 72%)',
    },

    '&:hover .branding-ai': {
        color: '#365b86',
    },

    [theme.breakpoints.down('md')]: {
        top: '30vh',
        left: '5.5vw',
    },

    [theme.breakpoints.down('sm')]: {
        top: '31vh',
        left: '5.5vw',
    },
}));

const Branding = styled('div')(({ theme }) => ({
    position: 'relative',
    margin: 0,
    color: tokens.color.ink900,
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: 'clamp(106px, 11.1vw, 176px)',
    lineHeight: 0.78,
    letterSpacing: '-0.072em',
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    cursor: 'default',

    [theme.breakpoints.down('md')]: {
        fontSize: 'clamp(82px, 17vw, 132px)',
    },

    [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(62px, 18.5vw, 94px)',
        letterSpacing: '-0.06em',
    },
}));

const AI = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: '57.2%',
    top: '-0.52em',
    color: tokens.color.ink900,
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '0.31em',
    lineHeight: 1,
    letterSpacing: '-0.04em',
    textTransform: 'uppercase',
    transition: 'color 260ms ease',

    [theme.breakpoints.down('sm')]: {
        top: '-0.6em',
    },
}));

const Motion = styled(FilledWord)(({ theme }) => ({
    top: '36.2vh',
    right: '3.9vw',
    fontSize: 'clamp(66px, 7.1vw, 112px)',

    [theme.breakpoints.down('md')]: {
        top: '46vh',
        right: '5vw',
        fontSize: 'clamp(55px, 12vw, 92px)',
    },

    [theme.breakpoints.down('sm')]: {
        top: '47.5vh',
        right: '5.5vw',
        fontSize: 'clamp(44px, 13vw, 68px)',
    },
}));

const Strategy = styled(FilledWord)(({ theme }) => ({
    top: '65.2vh',
    left: '14.7vw',
    fontSize: 'clamp(76px, 8.1vw, 128px)',

    [theme.breakpoints.down('md')]: {
        top: '63.5vh',
        left: '7vw',
        fontSize: 'clamp(65px, 14vw, 108px)',
    },

    [theme.breakpoints.down('sm')]: {
        top: '61vh',
        left: '6vw',
        fontSize: 'clamp(50px, 15.5vw, 78px)',
    },
}));

const Products = styled(OutlineWord)(({ theme }) => ({
    top: '74.2vh',
    right: '6.1vw',
    fontSize: 'clamp(50px, 5vw, 80px)',
    letterSpacing: '-0.045em',

    [theme.breakpoints.down('md')]: {
        top: '76vh',
        right: '6vw',
        fontSize: 'clamp(43px, 9vw, 70px)',
    },

    [theme.breakpoints.down('sm')]: {
        top: '74vh',
        right: '5.5vw',
        fontSize: 'clamp(35px, 10.5vw, 54px)',
    },
}));

const SupportingCopy = styled('p')(({ theme }) => ({
    position: 'absolute',
    zIndex: 3,
    left: '3vw',
    bottom: '4.9vh',
    width: '245px',
    margin: 0,
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: 'clamp(12px, 1.05vw, 16px)',
    lineHeight: 1.55,
    color: alpha(tokens.color.ink900, 0.53),

    [theme.breakpoints.down('md')]: {
        left: '5vw',
        bottom: '5vh',
        width: '220px',
        fontSize: '12px',
    },

    [theme.breakpoints.down('sm')]: {
        left: '6vw',
        bottom: '4vh',
        width: '46vw',
        fontSize: '10px',
        lineHeight: 1.45,
    },
}));

const BrandCaption = styled('p')(({ theme }) => ({
    position: 'absolute',
    zIndex: 3,
    left: '35.5vw',
    bottom: '15vh',
    margin: 0,
    fontFamily: 'var(--font-body)',
    fontWeight: 500,
    fontSize: 'clamp(10px, 0.82vw, 13px)',
    lineHeight: 1.4,
    color: alpha(tokens.color.ink900, 0.35),
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('md')]: {
        left: '30vw',
        bottom: '13.5vh',
        fontSize: '10px',
    },

    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const ExploreLink = styled('a')(({ theme }) => ({
    position: 'absolute',
    zIndex: 5,
    right: '3vw',
    bottom: '4.7vh',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    paddingBottom: '7px',
    color: tokens.color.ink900,
    borderBottom:
        `1px solid ${alpha(tokens.color.ink900, 0.52)}`,
    fontFamily: 'var(--font-body)',
    fontWeight: 700,
    fontSize: '11px',
    lineHeight: 1,
    letterSpacing: '0.10em',
    textTransform: 'uppercase',
    textDecoration: 'none',

    '& span': {
        display: 'inline-block',
        fontSize: '12px',
        transform: 'translateY(-1px)',
        transition: 'transform 220ms ease',
    },

    '&:hover span': {
        transform: 'translate(3px, -4px)',
    },

    '&:focus-visible': {
        outline:
            `2px solid ${tokens.color.ink900}`,
        outlineOffset: '5px',
    },

    [theme.breakpoints.down('md')]: {
        right: '5vw',
        bottom: '5vh',
    },

    [theme.breakpoints.down('sm')]: {
        right: '6vw',
        bottom: '4.3vh',
        fontSize: '9px',
        gap: '5px',
        paddingBottom: '5px',
    },
}));

const ShadeSweep = styled(Box)({
    position: 'absolute',
    zIndex: 7,
    top: 0,
    left: 0,
    width: '165%',
    height: '100%',
    pointerEvents: 'none',
    willChange: 'transform',
    transform: 'translate3d(100%, 0, 0)',
    background:
        'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.08) 25%, rgba(255,255,255,0.48) 57%, rgba(255,255,255,0.91) 82%, rgba(255,255,255,0.985) 100%)',
});

const EndWash = styled(Box)({
    position: 'absolute',
    zIndex: 8,
    inset: 0,
    pointerEvents: 'none',
    opacity: 0,
    willChange: 'opacity',
    background: 'rgba(255,255,255,0.86)',
});

function setHoverX(
    event:
        ReactPointerEvent<HTMLElement>,
) {
    const rect =
        event.currentTarget
            .getBoundingClientRect();

    if (rect.width <= 0) {
        return;
    }

    const x =
        ((event.clientX - rect.left)
            / rect.width)
        * 100;

    event.currentTarget.style.setProperty(
        '--hover-x',
        `${clamp01(x / 100) * 100}%`,
    );
}

export default function ServicesOverviewSection({
    exploreHref = '/services',
}: ServicesOverviewSectionProps) {
    const sectionRef =
        useRef<HTMLElement>(null);

    const sceneRef =
        useRef<HTMLDivElement>(null);

    const shadeRef =
        useRef<HTMLDivElement>(null);

    const endWashRef =
        useRef<HTMLDivElement>(null);

    const uiuxRef =
        useRef<HTMLDivElement>(null);

    const webRef =
        useRef<HTMLDivElement>(null);

    const brandingRef =
        useRef<HTMLDivElement>(null);

    const motionRef =
        useRef<HTMLDivElement>(null);

    const strategyRef =
        useRef<HTMLDivElement>(null);

    const productsRef =
        useRef<HTMLDivElement>(null);

    const supportingCopyRef =
        useRef<HTMLParagraphElement>(null);

    const brandCaptionRef =
        useRef<HTMLParagraphElement>(null);

    const exploreLinkRef =
        useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const scene = sceneRef.current;
        const shade = shadeRef.current;
        const endWash = endWashRef.current;

        const uiux = uiuxRef.current;
        const web = webRef.current;
        const branding = brandingRef.current;
        const motion = motionRef.current;
        const strategy = strategyRef.current;
        const products = productsRef.current;
        const supportingCopy = supportingCopyRef.current;
        const brandCaption = brandCaptionRef.current;
        const exploreLink = exploreLinkRef.current;

        if (
            !section
            || !scene
            || !shade
            || !endWash
            || !uiux
            || !web
            || !branding
            || !motion
            || !strategy
            || !products
            || !supportingCopy
            || !brandCaption
            || !exploreLink
        ) {
            return;
        }

        const reduceMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        if (reduceMotion) {
            return;
        }

        const ctx = gsap.context(() => {
            gsap.set(shade, {
                xPercent: 105,
            });

            gsap.set(endWash, {
                opacity: 0,
            });

            gsap.set(scene, {
                yPercent: 0,
                opacity: 1,
            });

            /*
             * Every service item starts hidden.
             * Scroll reveals them one-by-one.
             */
            gsap.set(
                [
                    uiux,
                    web,
                    branding,
                    motion,
                    strategy,
                    products,
                    supportingCopy,
                    brandCaption,
                    exploreLink,
                ],
                {
                    opacity: 0,
                    filter: 'blur(10px)',
                    willChange:
                        'transform, opacity, filter',
                },
            );

            gsap.set(uiux, {
                x: -34,
                y: 22,
                scale: 0.94,
            });

            gsap.set(web, {
                x: 34,
                y: 18,
                scale: 0.94,
            });

            gsap.set(branding, {
                y: 44,
                scale: 0.955,
            });

            gsap.set(motion, {
                x: 40,
                y: 24,
                scale: 0.95,
            });

            gsap.set(strategy, {
                x: -38,
                y: 28,
                scale: 0.95,
            });

            gsap.set(products, {
                x: 38,
                y: 24,
                scale: 0.95,
            });

            gsap.set(
                [
                    supportingCopy,
                    brandCaption,
                    exploreLink,
                ],
                {
                    y: 20,
                },
            );

            const timeline = gsap.timeline({
                defaults: {
                    ease: 'none',
                },
                scrollTrigger: {
                    trigger: section,
                    start: 'top top',

                    /*
                     * Extra scroll room is intentional:
                     * each service gets its own reveal beat,
                     * then shade + ending run afterwards.
                     */
                    end: () =>
                        `+=${Math.round(
                            window.innerHeight
                            * 3.5,
                        )}`,

                    pin: true,
                    pinSpacing: true,
                    scrub: 0.7,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                    refreshPriority: 5,
                },
            });

            const reveal = (
                target: HTMLElement,
                position: number,
                duration = 0.09,
            ) => {
                timeline.to(
                    target,
                    {
                        x: 0,
                        y: 0,
                        scale: 1,
                        opacity: 1,
                        filter: 'blur(0px)',
                        duration,
                        ease:
                            'power2.out',
                    },
                    position,
                );
            };

            /*
             * Reveal order:
             * UI/UX → WEB → BRANDING → MOTION →
             * STRATEGY → PRODUCTS → supporting text / CTA
             */
            reveal(
                uiux,
                0.00,
                0.085,
            );

            reveal(
                web,
                0.085,
                0.08,
            );

            reveal(
                branding,
                0.165,
                0.11,
            );

            reveal(
                motion,
                0.275,
                0.085,
            );

            reveal(
                strategy,
                0.36,
                0.085,
            );

            reveal(
                products,
                0.445,
                0.085,
            );

            reveal(
                supportingCopy,
                0.53,
                0.07,
            );

            reveal(
                brandCaption,
                0.565,
                0.07,
            );

            reveal(
                exploreLink,
                0.60,
                0.07,
            );

            /*
             * Small hold after all content is visible.
             * Then reference-style shade starts.
             */
            timeline.to(
                shade,
                {
                    xPercent: -22,
                    duration: 0.235,
                    ease:
                        'power1.inOut',
                },
                0.665,
            );

            /*
             * Final washed-out reference state.
             */
            timeline.to(
                endWash,
                {
                    opacity: 0.86,
                    duration: 0.14,
                    ease:
                        'power1.in',
                },
                0.86,
            );

            timeline.to(
                scene,
                {
                    yPercent: -16,
                    opacity: 0.58,
                    duration: 0.14,
                    ease:
                        'power1.in',
                },
                0.86,
            );
        }, section);

        const refreshId =
            window.requestAnimationFrame(
                () => {
                    ScrollTrigger.refresh();
                },
            );

        return () => {
            window.cancelAnimationFrame(
                refreshId,
            );

            ctx.revert();
        };
    }, []);

    return (
        <Section
            ref={sectionRef}
            id="services"
        >
            <StickyViewport>
                <Scene ref={sceneRef}>
                    <Grain />

                    <UIUX
                        ref={uiuxRef}
                        onPointerMove={
                            setHoverX
                        }
                    >
                        UI/UX
                    </UIUX>

                    <Web
                        ref={webRef}
                        onPointerMove={
                            setHoverX
                        }
                    >
                        WEB
                    </Web>

                    <BrandingGroup
                        ref={brandingRef}
                        onPointerMove={
                            setHoverX
                        }
                    >
                        <Branding className="branding-main">
                            BRANDING
                            <AI className="branding-ai">
                                AI
                            </AI>
                        </Branding>
                    </BrandingGroup>

                    <Motion
                        ref={motionRef}
                        onPointerMove={
                            setHoverX
                        }
                    >
                        MOTION
                    </Motion>

                    <Strategy
                        ref={strategyRef}
                        onPointerMove={
                            setHoverX
                        }
                    >
                        STRATEGY
                    </Strategy>

                    <Products
                        ref={productsRef}
                        onPointerMove={
                            setHoverX
                        }
                    >
                        PRODUCTS
                    </Products>

                    <SupportingCopy
                        ref={supportingCopyRef}
                    >
                        We transform ambitious
                        ideas into meaningful
                        digital experiences.
                    </SupportingCopy>

                    <BrandCaption
                        ref={brandCaptionRef}
                    >
                        Identities built to
                        outlast trends —
                        strategic, systematic,
                        alive.
                    </BrandCaption>

                    <ExploreLink
                        ref={exploreLinkRef}
                        href={exploreHref}
                    >
                        Explore services
                        <span
                            aria-hidden="true"
                        >
                            ↗
                        </span>
                    </ExploreLink>
                </Scene>

                <ShadeSweep
                    ref={shadeRef}
                />

                <EndWash
                    ref={endWashRef}
                />
            </StickyViewport>
        </Section>
    );
}
