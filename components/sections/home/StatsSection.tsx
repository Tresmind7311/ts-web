'use client';

import {
    useEffect,
    useRef,
} from 'react';

import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import ImageSequenceCanvas from '@/components/canvas/ImageSequenceCanvas';
import { generateFrameUrls } from '@/lib/frameUtils';
import { tokens } from '@/theme/theme';

/* ============================================
   FRAME CONFIG
============================================ */

const FRAME_COUNT = 357;

const DESKTOP_FRAMES = generateFrameUrls(
    '/frames/Stats-section/desktop/stats_d_{n}.webp',
    1,
    FRAME_COUNT,
    5,
);

/*
 * Same structure as HeroSection:
 *
 * - tall normal document section
 * - full-screen fixed visual frame
 * - canvas progress comes from this container
 * - final frame naturally holds for the last viewport
 */
const SCROLL_HEIGHT = '600vh';

const STATS = {
    satisfaction: 98,
    projects: 150,
    countries: 12,
};

/* ============================================
   HELPERS
============================================ */

const clamp01 = (value: number) =>
    Math.max(
        0,
        Math.min(1, value),
    );

const smoothstep = (value: number) => {
    const t = clamp01(value);

    return (
        t * t * (3 - 2 * t)
    );
};

const rangeProgress = (
    progress: number,
    start: number,
    end: number,
) => {
    if (end <= start) {
        return progress >= end
            ? 1
            : 0;
    }

    return smoothstep(
        (
            progress - start
        )
        / (end - start),
    );
};

const stageOpacity = (
    progress: number,
    fadeInStart: number,
    fullStart: number,
    fullEnd: number,
    fadeOutEnd: number,
) => {
    if (
        progress <= fadeInStart
        || progress >= fadeOutEnd
    ) {
        return 0;
    }

    if (progress < fullStart) {
        return rangeProgress(
            progress,
            fadeInStart,
            fullStart,
        );
    }

    if (progress <= fullEnd) {
        return 1;
    }

    return (
        1
        - rangeProgress(
            progress,
            fullEnd,
            fadeOutEnd,
        )
    );
};

/* ============================================
   SECTION
============================================ */

const ScrollContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    height: SCROLL_HEIGHT,

    background:
        tokens.color.ink900,
});

/*
 * IMPORTANT:
 *
 * This intentionally follows the same approach
 * as HeroSection instead of position: sticky.
 *
 * JS controls visibility while the tall scroll
 * container is the active section.
 */
const FixedFrame = styled(Box)({
    position: 'fixed',

    top: 0,
    left: 0,

    width: '100%',
    height: '100vh',

    overflow: 'hidden',

    background:
        tokens.color.ink900,

    visibility: 'hidden',
    pointerEvents: 'none',

    zIndex: 1,
});

/* ============================================
   CANVAS
============================================ */

const CanvasLayer = styled(Box)({
    position: 'absolute',
    inset: 0,

    zIndex: 0,

    '& canvas': {
        display: 'block',

        width: '100%',
        height: '100%',
    },
});

const CanvasShade = styled(Box)({
    position: 'absolute',
    inset: 0,

    zIndex: 1,

    pointerEvents: 'none',

    background: [
        'linear-gradient(90deg, rgba(2,5,9,0.12) 0%, rgba(2,5,9,0.015) 50%, rgba(2,5,9,0.12) 100%)',
        'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 45%, rgba(0,0,0,0.12) 100%)',
    ].join(', '),
});

/* ============================================
   COMMON STAGE
============================================ */

const Stage = styled(Box)({
    position: 'absolute',
    inset: 0,

    zIndex: 2,

    opacity: 0,

    pointerEvents: 'none',

    willChange:
        'opacity, transform',
});

/* ============================================
   INTRO
============================================ */

const IntroStage = styled(Stage)({
    display: 'flex',

    alignItems: 'center',
    justifyContent: 'center',

    padding: '0 24px',

    textAlign: 'center',
});

const IntroInner = styled(Box)({
    width: '100%',

    maxWidth: '1040px',
});

const DecorLine = styled(Box)({
    width: 1,
    height: 58,

    margin:
        '0 auto 34px',

    background:
        alpha(
            tokens.color.neutral0,
            0.22,
        ),
});

/* ============================================
   KEY FACTS
============================================ */

const KeyFactsStage = styled(Stage)(
    ({ theme }) => ({
        display: 'flex',

        alignItems: 'center',

        padding:
            '0 clamp(28px, 9vw, 170px)',

        [theme.breakpoints.down('md')]: {
            alignItems: 'flex-end',

            padding:
                '0 24px clamp(70px, 12vh, 110px)',
        },
    }),
);

const KeyFactsInner = styled(Box)({
    maxWidth: '760px',
});

/* ============================================
   STATS POSITIONING
============================================ */

const SatisfactionStage = styled(Stage)(
    ({ theme }) => ({
        display: 'flex',

        alignItems: 'center',

        paddingLeft:
            'clamp(32px, 9vw, 170px)',

        [theme.breakpoints.down('md')]: {
            alignItems: 'flex-end',

            padding:
                '0 24px clamp(80px, 13vh, 120px)',
        },
    }),
);

const ProjectsStage = styled(Stage)(
    ({ theme }) => ({
        display: 'flex',

        justifyContent: 'flex-end',
        alignItems: 'flex-start',

        padding:
            'clamp(65px, 10vh, 110px) clamp(32px, 9vw, 170px)',

        [theme.breakpoints.down('md')]: {
            padding:
                '70px 24px 0',
        },
    }),
);

const CountriesStage = styled(Stage)(
    ({ theme }) => ({
        display: 'flex',

        justifyContent: 'flex-start',
        alignItems: 'flex-end',

        padding:
            '0 clamp(32px, 9vw, 170px) clamp(70px, 11vh, 110px)',

        [theme.breakpoints.down('md')]: {
            padding:
                '0 24px 70px',
        },
    }),
);

/* ============================================
   TYPOGRAPHY
============================================ */

const Eyebrow = styled(Typography)({
    marginBottom: '22px',

    fontFamily:
        'var(--font-body)',

    fontWeight: 700,

    fontSize: '12px',

    lineHeight: 1.2,

    letterSpacing:
        '0.14em',

    textTransform:
        'uppercase',

    color:
        tokens.color.uv300,
});

const IntroHeadline = styled('h2')(
    ({ theme }) => ({
        margin: 0,

        fontFamily:
            'var(--font-display)',

        fontWeight: 800,

        fontSize:
            'clamp(58px, 7.3vw, 118px)',

        lineHeight: 0.98,

        letterSpacing:
            '-0.045em',

        color:
            tokens.color.neutral0,

        [theme.breakpoints.down('md')]: {
            fontSize:
                'clamp(46px, 13vw, 76px)',
        },
    }),
);

const KeyFactsHeadline = styled('h2')(
    ({ theme }) => ({
        margin: 0,

        fontFamily:
            'var(--font-display)',

        fontWeight: 800,

        fontSize:
            'clamp(68px, 8vw, 132px)',

        lineHeight: 0.95,

        letterSpacing:
            '-0.05em',

        color:
            tokens.color.neutral0,

        [theme.breakpoints.down('md')]: {
            fontSize:
                'clamp(56px, 16vw, 90px)',
        },
    }),
);

const Body = styled('p')(
    ({ theme }) => ({
        margin:
            '38px auto 0',

        maxWidth: '820px',

        fontFamily:
            'var(--font-body)',

        fontWeight: 500,

        fontSize:
            'clamp(16px, 1.35vw, 22px)',

        lineHeight: 1.6,

        color:
            alpha(
                tokens.color.neutral0,
                0.60,
            ),

        [theme.breakpoints.down('md')]: {
            marginTop: '24px',

            fontSize: '15px',
        },
    }),
);

const KeyFactsBody = styled(Body)({
    margin:
        '40px 0 0',

    maxWidth: '600px',
});

/* ============================================
   STAT TYPOGRAPHY
============================================ */

const StatWrap = styled(Box)({
    display:
        'inline-flex',

    flexDirection:
        'column',
});

const StatNumber = styled('div')(
    ({ theme }) => ({
        display: 'flex',

        alignItems:
            'flex-start',

        fontFamily:
            'var(--font-display)',

        fontWeight: 800,

        fontVariantNumeric:
            'tabular-nums',

        fontSize:
            'clamp(118px, 15vw, 238px)',

        lineHeight: 0.78,

        letterSpacing:
            '-0.065em',

        color:
            tokens.color.neutral0,

        textShadow: [
            `0 0 8px ${alpha(tokens.color.neutral50, 0.35)}`,
            `0 0 20px ${alpha(tokens.color.neutral50, 0.28)}`,
            `0 0 42px ${alpha(tokens.color.neutral50, 0.18)}`,
            `0 0 70px ${alpha(tokens.color.neutral50, 0.10)}`,
        ].join(', '),

        [theme.breakpoints.down('md')]: {
            fontSize:
                'clamp(88px, 27vw, 150px)',
        },
    }),
);

const Accent = styled('span')(
    ({ theme }) => ({
        marginLeft:
            '7px',

        fontSize:
            '0.42em',

        lineHeight: 1.1,

        color:
            tokens.color.uv300,

        [theme.breakpoints.down('md')]: {
            marginLeft:
                '4px',
        },
    }),
);

const StatLabel = styled(Typography)({
    marginTop: '34px',

    fontFamily:
        'var(--font-body)',

    fontWeight: 700,

    fontSize: '12px',

    lineHeight: 1.2,

    letterSpacing:
        '0.14em',

    textTransform:
        'uppercase',

    color:
        alpha(
            tokens.color.neutral0,
            0.48,
        ),
});

/* ============================================
   COMPONENT
============================================ */

export default function StatsSection() {
    const scrollRef =
        useRef<HTMLDivElement>(null);

    const frameRef =
        useRef<HTMLDivElement>(null);

    const introRef =
        useRef<HTMLDivElement>(null);

    const keyFactsRef =
        useRef<HTMLDivElement>(null);

    const satisfactionRef =
        useRef<HTMLDivElement>(null);

    const projectsRef =
        useRef<HTMLDivElement>(null);

    const countriesRef =
        useRef<HTMLDivElement>(null);

    const satisfactionNumberRef =
        useRef<HTMLSpanElement>(null);

    const projectsNumberRef =
        useRef<HTMLSpanElement>(null);

    const countriesNumberRef =
        useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const container =
            scrollRef.current;

        const frame =
            frameRef.current;

        const intro =
            introRef.current;

        const keyFacts =
            keyFactsRef.current;

        const satisfaction =
            satisfactionRef.current;

        const projects =
            projectsRef.current;

        const countries =
            countriesRef.current;

        if (
            !container
            || !frame
            || !intro
            || !keyFacts
            || !satisfaction
            || !projects
            || !countries
        ) {
            return;
        }

        const setStage = (
            element:
                HTMLElement,

            opacity:
                number,

            y:
                number,

            scale = 1,
        ) => {
            element.style.opacity =
                String(
                    clamp01(
                        opacity,
                    ),
                );

            element.style.transform =
                `translate3d(0, ${y}px, 0) scale(${scale})`;
        };

        const renderContent = (
            progress:
                number,
        ) => {
            const p =
                clamp01(
                    progress,
                );

            /* ----------------------------
               01 INTRO
            ---------------------------- */

            const introOpacity =
                stageOpacity(
                    p,

                    0.00,
                    0.015,

                    0.145,
                    0.205,
                );

            setStage(
                intro,

                introOpacity,

                (
                    1
                    - introOpacity
                ) * 24,

                0.985
                + introOpacity
                * 0.015,
            );

            /* ----------------------------
               02 KEY FACTS
            ---------------------------- */

            const keyFactsOpacity =
                stageOpacity(
                    p,

                    0.17,
                    0.215,

                    0.325,
                    0.39,
                );

            setStage(
                keyFacts,

                keyFactsOpacity,

                (
                    1
                    - keyFactsOpacity
                ) * 30,
            );

            /* ----------------------------
               03 98%
            ---------------------------- */

            const satisfactionOpacity =
                stageOpacity(
                    p,

                    0.35,
                    0.405,

                    0.52,
                    0.59,
                );

            setStage(
                satisfaction,

                satisfactionOpacity,

                (
                    1
                    - satisfactionOpacity
                ) * 34,
            );

            const satisfactionCounter =
                rangeProgress(
                    p,

                    0.405,
                    0.515,
                );

            if (
                satisfactionNumberRef.current
            ) {
                satisfactionNumberRef
                    .current
                    .textContent =
                    String(
                        Math.round(
                            STATS.satisfaction
                            * satisfactionCounter,
                        ),
                    );
            }

            /* ----------------------------
               04 150+

               This remains visible through
               the final countries phase.
            ---------------------------- */

            const projectsOpacity =
                rangeProgress(
                    p,

                    0.56,
                    0.63,
                );

            setStage(
                projects,

                projectsOpacity,

                (
                    1
                    - projectsOpacity
                ) * -34,
            );

            const projectsCounter =
                rangeProgress(
                    p,

                    0.60,
                    0.71,
                );

            if (
                projectsNumberRef.current
            ) {
                projectsNumberRef
                    .current
                    .textContent =
                    String(
                        Math.round(
                            STATS.projects
                            * projectsCounter,
                        ),
                    );
            }

            /* ----------------------------
               05 12+
            ---------------------------- */

            const countriesOpacity =
                rangeProgress(
                    p,

                    0.74,
                    0.81,
                );

            setStage(
                countries,

                countriesOpacity,

                (
                    1
                    - countriesOpacity
                ) * 34,
            );

            const countriesCounter =
                rangeProgress(
                    p,

                    0.78,
                    0.90,
                );

            if (
                countriesNumberRef.current
            ) {
                countriesNumberRef
                    .current
                    .textContent =
                    String(
                        Math.round(
                            STATS.countries
                            * countriesCounter,
                        ),
                    );
            }
        };

        const onScroll = () => {
            const rect =
                container
                    .getBoundingClientRect();

            const scrollable =
                container.offsetHeight
                - window.innerHeight;

            /*
             * Same fixed-frame idea as HeroSection.
             *
             * Because StatsSection lives in the middle
             * of the page, we also hide it BEFORE its
             * top reaches the viewport.
             */
            const hasStarted =
                rect.top <= 0;

            /*
             * IMPORTANT:
             *
             * The next section starts entering the viewport when the
             * StatsSection bottom reaches the viewport bottom — NOT when
             * it reaches viewport top.
             *
             * Old:
             *     rect.bottom <= 0
             *
             * That kept this position:fixed frame alive for one extra
             * viewport and caused it to paint over TestimonialsSection.
             *
             * Correct exit:
             *     rect.bottom <= window.innerHeight
             */
            const hasEnded =
                rect.bottom <= window.innerHeight;

            const active =
                hasStarted
                && !hasEnded;

            frame.style.visibility =
                active
                    ? 'visible'
                    : 'hidden';

            frame.style.pointerEvents =
                active
                    ? ''
                    : 'none';

            if (
                scrollable <= 0
            ) {
                return;
            }

            /*
             * Identical source of truth as canvas:
             *
             * container top
             * +
             * container scrollable distance
             */
            const progress =
                clamp01(
                    -rect.top
                    / scrollable,
                );

            renderContent(
                progress,
            );
        };

        window.addEventListener(
            'scroll',
            onScroll,
            {
                passive: true,
            },
        );

        window.addEventListener(
            'resize',
            onScroll,
            {
                passive: true,
            },
        );

        onScroll();

        return () => {
            window.removeEventListener(
                'scroll',
                onScroll,
            );

            window.removeEventListener(
                'resize',
                onScroll,
            );
        };
    }, []);

    return (
        <ScrollContainer
            ref={scrollRef}
            id="studio"
        >
            <FixedFrame
                ref={frameRef}
            >
                {/* =================================
                    FULL SECTION SCROLL CANVAS
                ================================= */}

                <CanvasLayer>
                    <ImageSequenceCanvas
                        desktopFrames={
                            DESKTOP_FRAMES
                        }

                        containerRef={
                            scrollRef
                        }

                        objectFit="cover"

                        mouseInteraction={
                            false
                        }
                    />
                </CanvasLayer>

                <CanvasShade />

                {/* =================================
                    01 INTRO
                ================================= */}

                <IntroStage
                    ref={introRef}
                >
                    <IntroInner>
                        <DecorLine />

                        <Eyebrow>
                            Chapter 01 — The Prism
                        </Eyebrow>

                        <IntroHeadline>
                            One idea, a
                            <br />
                            thousand facets.
                        </IntroHeadline>

                        <Body>
                            We are Tresmind Solutions —
                            a creative technology studio.
                            Strategy, design, and
                            engineering pass through a
                            single lens until your idea
                            becomes an experience people
                            feel.
                        </Body>
                    </IntroInner>
                </IntroStage>

                {/* =================================
                    02 KEY FACTS
                ================================= */}

                <KeyFactsStage
                    ref={keyFactsRef}
                >
                    <KeyFactsInner>
                        <Eyebrow>
                            Chapter 02 — In Numbers
                        </Eyebrow>

                        <KeyFactsHeadline>
                            Key Facts
                        </KeyFactsHeadline>

                        <KeyFactsBody>
                            A decade of light, measured.
                            What remains when the noise
                            burns away.
                        </KeyFactsBody>
                    </KeyFactsInner>
                </KeyFactsStage>

                {/* =================================
                    03 SATISFACTION
                ================================= */}

                <SatisfactionStage
                    ref={satisfactionRef}
                >
                    <StatWrap>
                        <StatNumber>
                            <span
                                ref={
                                    satisfactionNumberRef
                                }
                            >
                                0
                            </span>

                            <Accent>
                                %
                            </Accent>
                        </StatNumber>

                        <StatLabel>
                            Client Satisfaction
                        </StatLabel>
                    </StatWrap>
                </SatisfactionStage>

                {/* =================================
                    04 PROJECTS
                ================================= */}

                <ProjectsStage
                    ref={projectsRef}
                >
                    <StatWrap>
                        <StatNumber>
                            <span
                                ref={
                                    projectsNumberRef
                                }
                            >
                                0
                            </span>

                            <Accent>
                                +
                            </Accent>
                        </StatNumber>

                        <StatLabel
                            sx={{
                                textAlign:
                                    'right',
                            }}
                        >
                            Projects Delivered
                        </StatLabel>
                    </StatWrap>
                </ProjectsStage>

                {/* =================================
                    05 COUNTRIES
                ================================= */}

                <CountriesStage
                    ref={countriesRef}
                >
                    <StatWrap>
                        <StatNumber>
                            <span
                                ref={
                                    countriesNumberRef
                                }
                            >
                                0
                            </span>

                            <Accent>
                                +
                            </Accent>
                        </StatNumber>

                        <StatLabel>
                            Countries Served
                        </StatLabel>
                    </StatWrap>
                </CountriesStage>
            </FixedFrame>
        </ScrollContainer>
    );
}
