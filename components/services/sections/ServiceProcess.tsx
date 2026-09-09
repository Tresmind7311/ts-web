'use client';

import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import Image from 'next/image';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/material/styles';

import type { ServiceProcessData } from '@/data/services/types';
import { tokens } from '@/theme/theme';

interface ServiceProcessProps {
    data: ServiceProcessData;
}

type SlidePosition =
    | 'active'
    | 'prev'
    | 'next'
    | 'far-prev'
    | 'far-next';

const cardRubber = keyframes`
    0% {
        transform:
            translateX(-50%)
            translateX(var(--slide-x))
            scale(var(--slide-scale));
    }

    35% {
        transform:
            translateX(-50%)
            translateX(var(--slide-x))
            scale(1.055, 0.965);
    }

    55% {
        transform:
            translateX(-50%)
            translateX(var(--slide-x))
            scale(0.975, 1.035);
    }

    72% {
        transform:
            translateX(-50%)
            translateX(var(--slide-x))
            scale(1.018, 0.988);
    }

    100% {
        transform:
            translateX(-50%)
            translateX(var(--slide-x))
            scale(1);
    }
`;

const foregroundRubber = keyframes`
    0% {
        transform: translateX(-50%) translateY(18px) scale(0.90);
        opacity: 0.72;
    }

    32% {
        transform: translateX(-50%) translateY(-14px) scale(1.065, 0.96);
        opacity: 1;
    }

    52% {
        transform: translateX(-50%) translateY(7px) scale(0.975, 1.045);
    }

    70% {
        transform: translateX(-50%) translateY(-4px) scale(1.025, 0.985);
    }

    100% {
        transform: translateX(-50%) translateY(0) scale(1);
        opacity: 1;
    }
`;

const numberPop = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.72);
    }

    55% {
        opacity: 1;
        transform: scale(1.09);
    }

    75% {
        transform: scale(0.96);
    }

    100% {
        opacity: 1;
        transform: scale(1);
    }
`;

const textReveal = keyframes`
    from {
        opacity: 0;
        transform: translateY(16px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const Section = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
    padding: '92px 0 120px',
    backgroundColor: tokens.color.neutral0,

    [theme.breakpoints.down('md')]: {
        padding: '76px 0 90px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '62px 0 72px',
    },
}));

const Header = styled(Container)({
    textAlign: 'center',
});

const Heading = styled(Typography)(({ theme }) => ({
    maxWidth: '680px',
    margin: '0 auto',
    fontFamily: tokens.font.display,
    fontSize: 'clamp(42px, 4vw, 60px)',
    fontWeight: 600,
    lineHeight: 1.02,
    letterSpacing: '-0.045em',

    background: `linear-gradient(
        90deg,
        ${tokens.color.uv800} 0%,
        ${tokens.color.uv300} 58%,
        ${tokens.color.uv300} 100%
    )`,
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [theme.breakpoints.down('sm')]: {
        fontSize: 'clamp(36px, 10vw, 46px)',
    },
}));

const Intro = styled(Typography)(({ theme }) => ({
    maxWidth: '850px',
    margin: '22px auto 0',
    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 1.55,
    color: tokens.color.ink900,

    [theme.breakpoints.down('sm')]: {
        maxWidth: '94%',
        marginTop: '16px',
        fontSize: '15px',
    },
}));

const ProcessArea = styled(Container)(({ theme }) => ({
    position: 'relative',
    marginTop: '36px',

    [theme.breakpoints.down('sm')]: {
        marginTop: '28px',
    },
}));

const NumberWrap = styled(Box)({
    position: 'relative',
    zIndex: 20,
    display: 'flex',
    justifyContent: 'center',
});

const StepNumber = styled(Box)({
    display: 'grid',
    placeItems: 'center',
    width: '100px',
    height: '100px',
    borderRadius: '50%',

    fontFamily: tokens.font.display,
    fontSize: '38px',
    fontWeight: 800,
    lineHeight: 1,
    color: tokens.color.neutral0,

    background: `linear-gradient(
        135deg,
        ${tokens.color.uv800} 5%,
        ${tokens.color.uv500} 58%,
        ${tokens.color.uv300} 100%
    )`,

    animation: `${numberPop} 650ms ${tokens.motion.ease} both`,
});

const CarouselViewport = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '390px',
    marginTop: '75px',

    touchAction: 'pan-y',

    [theme.breakpoints.down('lg')]: {
        height: '350px',
    },

    [theme.breakpoints.down('md')]: {
        height: '320px',
        marginTop: '28px',
    },

    [theme.breakpoints.down('sm')]: {
        height: '270px',
        marginTop: '24px',
    },
}));

const Slide = styled(Box)(({ theme }) => ({
    '--slide-x': '0px',
    '--slide-scale': '1',

    position: 'absolute',
    top: 0,
    left: '50%',
    zIndex: 1,

    width: '455px',
    height: '290px',

    opacity: 0,

    transform:
        'translateX(-50%) translateX(var(--slide-x)) scale(var(--slide-scale))',

    transition: [
        `transform 700ms ${tokens.motion.ease}`,
        `opacity 480ms ${tokens.motion.ease}`,
        `filter 480ms ${tokens.motion.ease}`,
    ].join(', '),

    willChange: 'transform, opacity',

    '&[data-position="active"]': {
        '--slide-x': '0px',
        '--slide-scale': '1',

        zIndex: 10,
        opacity: 1,
        filter: 'none',
    },

    '&[data-position="prev"]': {
        '--slide-x': '-430px',
        '--slide-scale': '0.72',

        zIndex: 4,
        opacity: 1,
        filter: 'saturate(0.92)',
        cursor: 'pointer',
    },

    '&[data-position="next"]': {
        '--slide-x': '430px',
        '--slide-scale': '0.72',

        zIndex: 4,
        opacity: 1,
        filter: 'saturate(0.92)',
        cursor: 'pointer',
    },

    '&[data-position="far-prev"]': {
        '--slide-x': '-680px',
        '--slide-scale': '0.58',
        opacity: 0,
        pointerEvents: 'none',
    },

    '&[data-position="far-next"]': {
        '--slide-x': '680px',
        '--slide-scale': '0.58',
        opacity: 0,
        pointerEvents: 'none',
    },

    '&[data-position="active"][data-animate="true"]': {
        animation: `${cardRubber} 780ms ${tokens.motion.ease} both`,
    },

    [theme.breakpoints.down('lg')]: {
        width: '410px',
        height: '260px',

        '&[data-position="prev"]': {
            '--slide-x': '-360px',
        },

        '&[data-position="next"]': {
            '--slide-x': '360px',
        },
    },

    [theme.breakpoints.down('md')]: {
        width: '360px',
        height: '230px',

        '&[data-position="prev"]': {
            '--slide-x': '-290px',
            '--slide-scale': '0.68',
        },

        '&[data-position="next"]': {
            '--slide-x': '290px',
            '--slide-scale': '0.68',
        },
    },

    [theme.breakpoints.down('sm')]: {
        width: '78vw',
        maxWidth: '330px',
        height: '220px',

        '&[data-position="prev"]': {
            '--slide-x': '-72vw',
            '--slide-scale': '0.72',
        },

        '&[data-position="next"]': {
            '--slide-x': '72vw',
            '--slide-scale': '0.72',
        },
    },

    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',

        '&[data-position="active"][data-animate="true"]': {
            animation: 'none',
        },
    },
}));

const Card = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'visible',
    borderRadius: '18px',

    [theme.breakpoints.down('sm')]: {
        borderRadius: '15px',
    },
}));

const BackgroundWrap = styled(Box)({
    position: 'absolute',
    inset: 0,
    overflow: 'hidden',
    borderRadius: 'inherit',
});

const BackgroundImage = styled(Image)({
    objectFit: 'cover',
    objectPosition: 'center',
});

const BackgroundShade = styled(Box)({
    position: 'absolute',
    inset: 0,
    borderRadius: 'inherit',
    background:
        'linear-gradient(180deg, rgba(0, 64, 115, 0.02), rgba(0, 35, 80, 0.10))',
    pointerEvents: 'none',
});

const ForegroundWrap = styled(Box)(({ theme }) => ({
    position: 'absolute',
    zIndex: 3,

    left: '50%',
    bottom: '-4px',

    width: '76%',
    height: '132%',

    transform: 'translateX(-50%)',
    transformOrigin: '50% 82%',
    pointerEvents: 'none',

    [theme.breakpoints.down('sm')]: {
        width: '78%',
        height: '126%',
    },

    '[data-position="active"][data-animate="true"] &': {
        animation:
            `${foregroundRubber} 920ms ${tokens.motion.ease} 100ms both`,
    },

    '@media (prefers-reduced-motion: reduce)': {
        '[data-position="active"][data-animate="true"] &': {
            animation: 'none',
        },
    },
}));

const ForegroundImage = styled(Image)({
    objectFit: 'contain',
    objectPosition: 'center bottom',
});

const ActiveContent = styled(Box)(({ theme }) => ({
    position: 'relative',
    zIndex: 20,
    maxWidth: '720px',
    minHeight: '110px',
    margin: '-34px auto 0',
    textAlign: 'center',

    [theme.breakpoints.down('md')]: {
        marginTop: '-28px',
    },

    [theme.breakpoints.down('sm')]: {
        marginTop: '-16px',
        minHeight: '96px',
    },
}));

const ActiveContentInner = styled(Box)({
    animation: `${textReveal} 520ms ${tokens.motion.ease} both`,
});

const StepTitle = styled(Typography)(({ theme }) => ({
    margin: 0,
    fontFamily: tokens.font.display,
    fontSize: '32px',
    fontWeight: 700,
    lineHeight: 1.15,
    letterSpacing: '-0.025em',
    color: tokens.color.uv800,

    [theme.breakpoints.down('sm')]: {
        fontSize: '26px',
    },
}));

const StepDescription = styled(Typography)(({ theme }) => ({
    maxWidth: '600px',
    margin: '20px auto 0',
    fontFamily: tokens.font.body,
    fontSize: '17px',
    fontWeight: 400,
    lineHeight: 1.6,
    color: tokens.color.ink900,

    [theme.breakpoints.down('sm')]: {
        maxWidth: '92%',
        marginTop: '14px',
        fontSize: '15px',
    },
}));

function getPosition(
    index: number,
    activeIndex: number,
    total: number,
): SlidePosition {
    const forward =
        (index - activeIndex + total) % total;

    const backward =
        (activeIndex - index + total) % total;

    if (forward === 0) {
        return 'active';
    }

    if (forward === 1) {
        return 'next';
    }

    if (backward === 1) {
        return 'prev';
    }

    if (backward < forward) {
        return 'far-prev';
    }

    return 'far-next';
}

export default function ServiceProcess({
    data,
}: ServiceProcessProps) {
    const sectionRef = useRef<HTMLElement | null>(null);

    const [activeIndex, setActiveIndex] = useState(0);
    const [inView, setInView] = useState(false);
    const [paused, setPaused] = useState(false);
    const [reduceMotion, setReduceMotion] = useState(false);

    const pointerStartX = useRef<number | null>(null);

    const total = data.steps.length;
    const autoplayMs = Math.max(data.autoplayMs ?? 3500, 2500);

    const goNext = useCallback(() => {
        setActiveIndex(current =>
            (current + 1) % total,
        );
    }, [total]);

    const goPrevious = useCallback(() => {
        setActiveIndex(current =>
            (current - 1 + total) % total,
        );
    }, [total]);

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        );

        const updatePreference = () => {
            setReduceMotion(mediaQuery.matches);
        };

        updatePreference();

        mediaQuery.addEventListener(
            'change',
            updatePreference,
        );

        return () => {
            mediaQuery.removeEventListener(
                'change',
                updatePreference,
            );
        };
    }, []);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                setInView(entry.isIntersecting);
            },
            {
                threshold: 0.25,
            },
        );

        observer.observe(section);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (
            !inView ||
            paused ||
            reduceMotion ||
            total <= 1
        ) {
            return;
        }

        const timer = window.setInterval(
            goNext,
            autoplayMs,
        );

        return () => window.clearInterval(timer);
    }, [
        autoplayMs,
        goNext,
        inView,
        paused,
        reduceMotion,
        total,
    ]);

    if (total === 0) {
        return null;
    }

    const activeStep = data.steps[activeIndex];

    const handlePointerDown = (
        event: React.PointerEvent<HTMLDivElement>,
    ) => {
        pointerStartX.current = event.clientX;
    };

    const handlePointerUp = (
        event: React.PointerEvent<HTMLDivElement>,
    ) => {
        if (pointerStartX.current === null) {
            return;
        }

        const distance =
            event.clientX - pointerStartX.current;

        pointerStartX.current = null;

        if (Math.abs(distance) < 45) {
            return;
        }

        if (distance < 0) {
            goNext();
        } else {
            goPrevious();
        }
    };

    return (
        <Section
            ref={sectionRef}
            component="section"
            aria-labelledby="service-process-heading"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
        >
            <Header maxWidth="lg">
                <Heading
                    id="service-process-heading"
                    component="h2"
                >
                    {data.title}
                </Heading>

                <Intro component="p">
                    {data.description}
                </Intro>
            </Header>

            <ProcessArea maxWidth="lg">
                <NumberWrap>
                    <StepNumber key={activeStep.id}>
                        {activeStep.number}
                    </StepNumber>
                </NumberWrap>

                <CarouselViewport
                    onPointerDown={handlePointerDown}
                    onPointerUp={handlePointerUp}
                    onPointerCancel={() => {
                        pointerStartX.current = null;
                    }}
                >
                    {data.steps.map((step, index) => {
                        const position = getPosition(
                            index,
                            activeIndex,
                            total,
                        );

                        return (
                            <Slide
                                key={step.id}
                                data-position={position}
                                data-animate={
                                    position === 'active'
                                        ? 'true'
                                        : 'false'
                                }
                                aria-hidden={
                                    position !== 'active'
                                }
                                onClick={() => {
                                    if (
                                        position === 'prev' ||
                                        position === 'next'
                                    ) {
                                        setActiveIndex(index);
                                    }
                                }}
                            >
                                <Card>
                                    <BackgroundWrap>
                                        <BackgroundImage
                                            src={
                                                step.backgroundImage
                                                    .src
                                            }
                                            alt={
                                                step.backgroundImage
                                                    .alt
                                            }
                                            fill
                                            sizes="(max-width: 600px) 78vw, (max-width: 960px) 360px, 455px"
                                        />

                                        <BackgroundShade />
                                    </BackgroundWrap>

                                    <ForegroundWrap>
                                        <ForegroundImage
                                            src={
                                                step.foregroundImage
                                                    .src
                                            }
                                            alt={
                                                step.foregroundImage
                                                    .alt
                                            }
                                            fill
                                            sizes="(max-width: 600px) 65vw, (max-width: 960px) 300px, 360px"
                                        />
                                    </ForegroundWrap>
                                </Card>
                            </Slide>
                        );
                    })}
                </CarouselViewport>

                <ActiveContent>
                    <ActiveContentInner
                        key={activeStep.id}
                    >
                        <StepTitle component="h3">
                            {activeStep.title}
                        </StepTitle>

                        <StepDescription component="p">
                            {activeStep.description}
                        </StepDescription>
                    </ActiveContentInner>
                </ActiveContent>
            </ProcessArea>
        </Section>
    );
}