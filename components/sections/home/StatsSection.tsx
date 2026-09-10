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
   Reuses the same Stats-section frame sequence.
============================================ */

const FRAME_COUNT = 357;

const DESKTOP_FRAMES = generateFrameUrls(
    '/frames/Stats-section/desktop/stats_d_{n}.webp',
    1,
    FRAME_COUNT,
    5,
);

// Every 3rd desktop frame → ~119 frames for mobile.
// Same source files, no new assets required.
const MOBILE_FRAMES = DESKTOP_FRAMES.filter((_, i) => i % 6 === 0);

/*
 * Same tall-scroll + fixed-frame pattern as StatsSection.
 * 600vh gives ~126vh of virtual scroll per counter stage,
 * enough for a smooth full-viewport scroll-through.
 */
const SCROLL_HEIGHT = '600vh';

const STATS = {
    satisfaction: 98,
    projects: 150,
    countries: 12,
};

/* ============================================
   HELPERS  (identical to StatsSection)
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
        (progress - start)
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
   Background changed to #0F172A → #1E293B
   gradient per spec.
============================================ */

const ScrollContainer = styled(Box)({
    position: 'relative',
    width: '100%',
    height: SCROLL_HEIGHT,

    /*
     * Gradient visible before FixedFrame activates
     * and where canvas frames are transparent.
     */
    background:
        'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
});

/*
 * IMPORTANT:
 *
 * Same fixed-frame approach as StatsSection / HeroSection.
 * JS controls visibility; tall scroll container is the
 * active section.
 */
const FixedFrame = styled(Box)({
    position: 'fixed',

    top: 0,
    left: 0,

    width: '100%',
    height: '100vh',

    overflow: 'hidden',

    /*
     * Gradient background — visible during frame loads
     * and the initial intro stage before the canvas
     * fully paints.
     */
    background:
        'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',

    visibility: 'hidden',
    pointerEvents: 'none',

    zIndex: 1,
});

/* ============================================
   CANVAS  (identical to StatsSection)
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
   COMMON STAGE  (identical to StatsSection)
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
   INTRO  (identical to StatsSection)
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
   KEY FACTS  (identical to StatsSection)
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
   COUNTER STAGES
   All three counters are vertically centered so
   the Y travel (±100vh) is symmetric around the
   viewport midpoint — true scroll-through effect.

   Horizontal side is controlled by justifyContent:
     Counter1: left   (flex-start, default)
     Counter2: right  (flex-end)
     Counter3: left   (flex-start, default)

   overflow: hidden on FixedFrame clips the large
   Y translations cleanly.
============================================ */

/* Counter 1 — LEFT, vertically centered */
const Counter1Stage = styled(Stage)(
    ({ theme }) => ({
        display: 'flex',

        alignItems: 'center',

        paddingLeft:
            'clamp(32px, 9vw, 170px)',

        [theme.breakpoints.down('md')]: {
            padding: '0 24px',
        },
    }),
);

/* Counter 2 — RIGHT, vertically centered */
const Counter2Stage = styled(Stage)(
    ({ theme }) => ({
        display: 'flex',

        justifyContent: 'flex-end',
        alignItems: 'center',

        paddingRight:
            'clamp(32px, 9vw, 170px)',

        [theme.breakpoints.down('md')]: {
            justifyContent: 'flex-end',
            padding: '0 24px',
        },
    }),
);

/* Counter 3 — LEFT, vertically centered */
const Counter3Stage = styled(Stage)(
    ({ theme }) => ({
        display: 'flex',

        alignItems: 'center',

        paddingLeft:
            'clamp(32px, 9vw, 170px)',

        [theme.breakpoints.down('md')]: {
            padding: '0 24px',
        },
    }),
);

/* ============================================
   TYPOGRAPHY  (identical to StatsSection)
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
   STAT TYPOGRAPHY  (identical to StatsSection)
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

    const counter1Ref =
        useRef<HTMLDivElement>(null);

    const counter2Ref =
        useRef<HTMLDivElement>(null);

    const counter3Ref =
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

        const counter1 =
            counter1Ref.current;

        const counter2 =
            counter2Ref.current;

        const counter3 =
            counter3Ref.current;

        if (
            !container
            || !frame
            || !intro
            || !keyFacts
            || !counter1
            || !counter2
            || !counter3
        ) {
            return;
        }

        /*
         * setStage is used for Intro and KeyFacts
         * which use the same small drift as StatsSection.
         */
        const setStage = (
            element: HTMLElement,
            opacity: number,
            y: number,
            scale = 1,
        ) => {
            element.style.opacity =
                String(
                    clamp01(opacity),
                );

            element.style.transform =
                `translate3d(0, ${y}px, 0) scale(${scale})`;
        };

        /*
         * setCounterStage is used for the three scroll-
         * through counters. Y can be a large positive
         * (entering from below) or large negative (exiting
         * above) value — FixedFrame's overflow: hidden clips
         * it at the viewport boundary automatically.
         */
        const setCounterStage = (
            element: HTMLElement,
            opacity: number,
            yPx: number,
        ) => {
            element.style.opacity =
                String(
                    clamp01(opacity),
                );

            element.style.transform =
                `translate3d(0, ${yPx}px, 0)`;
        };

        const renderContent = (
            progress: number,
        ) => {
            const p =
                clamp01(progress);

            /*
             * vhPx is the full viewport height in px.
             * Counters travel ±vhPx, giving a true
             * full-screen vertical scroll-through.
             */
            const vhPx =
                window.innerHeight;

            /* ----------------------------
               01 INTRO
               Identical to StatsSection.
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
               Identical to StatsSection.
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
               03 COUNTER 1 — LEFT
               Satisfaction (98%)
               Window: 0.35 → 0.58
               Center: 0.465

               Y at entry:  +vhPx (below viewport)
               Y at center: 0     (viewport center)
               Y at exit:   -vhPx (above viewport)

               Counter counts from 0 → 98
               while counter is near center.
            ---------------------------- */

            const SAT_ENTRY = 0.35;
            const SAT_CENTER = 0.465;
            const SAT_EXIT = 0.58;

            const satOpacity =
                stageOpacity(
                    p,

                    SAT_ENTRY,
                    SAT_ENTRY + 0.03,

                    SAT_EXIT - 0.03,
                    SAT_EXIT,
                );

            const satY =
                p < SAT_CENTER
                    ? (
                        1
                        - rangeProgress(
                            p,
                            SAT_ENTRY,
                            SAT_CENTER,
                        )
                    ) * vhPx
                    : -rangeProgress(
                        p,
                        SAT_CENTER,
                        SAT_EXIT,
                    ) * vhPx;

            setCounterStage(
                counter1,
                satOpacity,
                satY,
            );

            const satCounter =
                rangeProgress(
                    p,

                    SAT_ENTRY + 0.05,
                    SAT_CENTER + 0.04,
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
                            * satCounter,
                        ),
                    );
            }

            /* ----------------------------
               04 COUNTER 2 — RIGHT
               Projects (150+)
               Window: 0.55 → 0.78
               Center: 0.665

               Overlaps Counter 1 exit by 0.03
               but they are on opposite sides
               so no visual collision.

               Y travel identical pattern.
               Counter counts 0 → 150.
            ---------------------------- */

            const PROJ_ENTRY = 0.37;
            const PROJ_CENTER = 0.485;
            const PROJ_EXIT = 0.60;

            const projOpacity =
                stageOpacity(
                    p,

                    PROJ_ENTRY,
                    PROJ_ENTRY + 0.03,

                    PROJ_EXIT - 0.03,
                    PROJ_EXIT,
                );

            const projY =
                p < PROJ_CENTER
                    ? (
                        1
                        - rangeProgress(
                            p,
                            PROJ_ENTRY,
                            PROJ_CENTER,
                        )
                    ) * vhPx
                    : -rangeProgress(
                        p,
                        PROJ_CENTER,
                        PROJ_EXIT,
                    ) * vhPx;

            setCounterStage(
                counter2,
                projOpacity,
                projY,
            );

            const projCounter =
                rangeProgress(
                    p,

                    PROJ_ENTRY + 0.05,
                    PROJ_CENTER + 0.04,
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
                            * projCounter,
                        ),
                    );
            }

            /* ----------------------------
               05 COUNTER 3 — LEFT
               Countries (12+)
               Window: 0.75 → 0.98
               Center: 0.865

               Last counter exits near end
               of scroll (0.98).
               Counter counts 0 → 12.
            ---------------------------- */

            const CTRY_ENTRY = 0.58;
            const CTRY_CENTER = 0.695;
            const CTRY_EXIT = 0.98;

            const ctryOpacity =
                stageOpacity(
                    p,

                    CTRY_ENTRY,
                    CTRY_ENTRY + 0.03,

                    CTRY_EXIT - 0.03,
                    CTRY_EXIT,
                );

            const ctryY =
                p < CTRY_CENTER
                    ? (
                        1
                        - rangeProgress(
                            p,
                            CTRY_ENTRY,
                            CTRY_CENTER,
                        )
                    ) * vhPx
                    : -rangeProgress(
                        p,
                        CTRY_CENTER,
                        CTRY_EXIT,
                    ) * vhPx;

            setCounterStage(
                counter3,
                ctryOpacity,
                ctryY,
            );

            const ctryCounter =
                rangeProgress(
                    p,

                    CTRY_ENTRY + 0.05,
                    CTRY_CENTER + 0.04,
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
                            * ctryCounter,
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
             * Identical visibility logic as StatsSection.
             * FixedFrame is active only while the section
             * occupies the scroll position.
             */
            const hasStarted =
                rect.top <= 0;

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

            if (scrollable <= 0) {
                return;
            }

            /*
             * Identical progress source of truth as
             * StatsSection and HeroSection.
             */
            const progress =
                clamp01(
                    -rect.top
                    / scrollable,
                );

            renderContent(progress);
        };

        window.addEventListener(
            'scroll',
            onScroll,
            { passive: true },
        );

        window.addEventListener(
            'resize',
            onScroll,
            { passive: true },
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
            id="news"
        >
            <FixedFrame
                ref={frameRef}
            >
                <CanvasLayer>
                    <ImageSequenceCanvas
                        desktopFrames={DESKTOP_FRAMES}
                        mobileFrames={MOBILE_FRAMES}
                        containerRef={scrollRef}
                        objectFit="cover"
                        mouseInteraction={false}
                    />
                </CanvasLayer>

                <CanvasShade />

                <IntroStage ref={introRef}>
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

                <KeyFactsStage ref={keyFactsRef}>
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

                <Counter1Stage ref={counter1Ref}>
                    <StatWrap>
                        <StatNumber>
                            <span ref={satisfactionNumberRef}>
                                0
                            </span>
                            <Accent>%</Accent>
                        </StatNumber>
                        <StatLabel>
                            Client Satisfaction
                        </StatLabel>
                    </StatWrap>
                </Counter1Stage>

                <Counter2Stage ref={counter2Ref}>
                    <StatWrap>
                        <StatNumber>
                            <span ref={projectsNumberRef}>
                                0
                            </span>
                            <Accent>+</Accent>
                        </StatNumber>
                        <StatLabel sx={{ textAlign: 'right' }}>
                            Projects Delivered
                        </StatLabel>
                    </StatWrap>
                </Counter2Stage>

                <Counter3Stage ref={counter3Ref}>
                    <StatWrap>
                        <StatNumber>
                            <span ref={countriesNumberRef}>
                                0
                            </span>
                            <Accent>+</Accent>
                        </StatNumber>
                        <StatLabel>
                            Countries Served
                        </StatLabel>
                    </StatWrap>
                </Counter3Stage>
            </FixedFrame>
        </ScrollContainer>
    );
}