'use client';

import { useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SouthIcon from '@mui/icons-material/South';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { keyframes, styled } from '@mui/material/styles';

import { tokens } from '@/theme/theme';

interface RecentWork {
    id: string;
    title: string;
    image: string;
}

const RECENT_WORKS: RecentWork[] = [
    {
        id: 'follow-up-system',
        title: 'Turning New Leads Into a Follow-Up System.',
        image: '/images/Portfolio/carousel-card-1.jpg',
    },
    {
        id: 'ai-assistant',
        title: 'An AI Assistant That Handles the First Conversation.',
        image: '/images/Portfolio/carousel-card-2.jpg',
    },
    {
        id: 'connected-tools',
        title: 'Connecting the Tools Your Business Already Uses.',
        image: '/images/Portfolio/carousel-card-3.jpg',
    },
    {
        id: 'workflow',
        title: 'Replacing Up With A Workflow',
        image: '/images/Portfolio/carousel-card-4.jpg',
    },
];

const slideNext = keyframes`
    from {
        opacity: 0.75;
        transform: translateX(28px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const slidePrevious = keyframes`
    from {
        opacity: 0.75;
        transform: translateX(-28px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

const Section = styled('section')(({ theme }) => ({
    overflow: 'hidden',
    background: '#eff8fc',
    padding: '48px 40px 96px',

    [theme.breakpoints.down('md')]: {
        padding: '44px 24px 80px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '40px 0 64px',
    },
}));

const Inner = styled(Box)(({ theme }) => ({
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',

    [theme.breakpoints.down('sm')]: {
        paddingLeft: '20px',
    },
}));

const Header = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '28px',

    [theme.breakpoints.down('sm')]: {
        paddingRight: '20px',
        marginBottom: '22px',
    },
}));

const HeaderLabel = styled(Typography)({
    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 1,
    color: '#454545',
});

const DownIcon = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '22px',
    height: '22px',

    border: '2px solid #454545',
    borderRadius: '50%',

    color: '#454545',

    '& svg': {
        fontSize: '15px',
    },
});

const CarouselViewport = styled(Box)({
    width: '100%',
    overflow: 'hidden',
    touchAction: 'pan-y',
    userSelect: 'none',
});

const Track = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'direction',
})<{ direction: 1 | -1 }>(({ theme, direction }) => ({
    display: 'flex',
    alignItems: 'flex-start',

    width: 'max-content',
    gap: '16px',
    paddingRight: '24px',

    animation: `${direction === 1
            ? slideNext
            : slidePrevious
        } 360ms ${tokens.motion.ease}`,

    [theme.breakpoints.down('sm')]: {
        gap: '14px',
        paddingRight: '20px',
    },

    '@media (prefers-reduced-motion: reduce)': {
        animation: 'none',
    },
}));

const WorkCard = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'featured',
})<{ featured: boolean }>(({ theme, featured }) => ({
    position: 'relative',
    flex: '0 0 auto',

    width: featured ? '584px' : '306px',
    height: featured ? '380px' : '200px',

    overflow: 'hidden',

    border: `1px solid ${tokens.color.uv500}`,
    borderRadius: featured ? '20px' : '14px',

    background: '#111',

    transition: `
        width 360ms ${tokens.motion.ease},
        height 360ms ${tokens.motion.ease},
        border-radius 360ms ${tokens.motion.ease}
    `,

    [theme.breakpoints.down('lg')]: {
        width: featured ? '520px' : '290px',
    },

    [theme.breakpoints.down('md')]: {
        width: featured ? '460px' : '280px',
        height: featured ? '330px' : '190px',
    },

    [theme.breakpoints.down('sm')]: {
        width: featured
            ? 'calc(100vw - 56px)'
            : 'calc(76vw - 20px)',

        maxWidth: featured
            ? '420px'
            : '310px',

        height: featured
            ? '290px'
            : '210px',

        borderRadius: '16px',
    },

    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
    },
}));

const Media = styled(Box)({
    position: 'absolute',
    inset: 0,

    '&::after': {
        content: '""',

        position: 'absolute',
        zIndex: 1,
        inset: 0,

        background:
            'linear-gradient(180deg, rgba(0,0,0,0.32) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.38) 100%)',

        pointerEvents: 'none',
    },
});

const CardTitle = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'featured',
})<{ featured: boolean }>(({ theme, featured }) => ({
    position: 'absolute',
    zIndex: 2,

    top: featured ? '30px' : '16px',
    left: featured ? '24px' : '14px',

    maxWidth: featured
        ? '310px'
        : '220px',

    fontFamily: tokens.font.display,
    fontSize: featured ? '28px' : '15px',
    fontWeight: 700,
    lineHeight: featured ? 1.22 : 1.08,
    letterSpacing: '-0.035em',

    color: tokens.color.neutral0,

    transition: `
        top 360ms ${tokens.motion.ease},
        left 360ms ${tokens.motion.ease},
        font-size 360ms ${tokens.motion.ease}
    `,

    [theme.breakpoints.down('md')]: {
        fontSize: featured
            ? '25px'
            : '14px',
    },

    [theme.breakpoints.down('sm')]: {
        top: '20px',
        left: '18px',

        maxWidth: featured
            ? '250px'
            : '220px',

        fontSize: featured
            ? '23px'
            : '16px',
    },

    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
    },
}));

const CardArrow = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'featured',
})<{ featured: boolean }>(({ theme, featured }) => ({
    position: 'absolute',
    zIndex: 2,

    left: featured ? '24px' : '14px',
    bottom: featured ? '28px' : '14px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: featured ? '62px' : '34px',
    height: featured ? '62px' : '34px',

    borderRadius: '50%',

    background: tokens.color.neutral0,
    color: '#111',

    transition: `
        width 360ms ${tokens.motion.ease},
        height 360ms ${tokens.motion.ease},
        left 360ms ${tokens.motion.ease},
        bottom 360ms ${tokens.motion.ease}
    `,

    '& svg': {
        fontSize: featured
            ? '38px'
            : '22px',

        transition: `font-size 360ms ${tokens.motion.ease}`,
    },

    [theme.breakpoints.down('sm')]: {
        left: '18px',
        bottom: '18px',

        width: featured
            ? '48px'
            : '40px',

        height: featured
            ? '48px'
            : '40px',

        '& svg': {
            fontSize: featured
                ? '30px'
                : '25px',
        },
    },

    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',

        '& svg': {
            transition: 'none',
        },
    },
}));

const Controls = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    gap: '10px',
    marginTop: '20px',

    [theme.breakpoints.down('sm')]: {
        paddingRight: '20px',
        marginTop: '22px',
    },
}));

const NavButton = styled('button')({
    display: 'flex',
    flex: '0 0 auto',
    alignItems: 'center',
    justifyContent: 'center',

    width: '42px',
    height: '42px',

    padding: 0,
    border: 0,
    borderRadius: '50%',

    background: tokens.color.uv500,
    color: tokens.color.neutral0,

    cursor: 'pointer',

    transition: `
        transform ${tokens.motion.base} ${tokens.motion.ease},
        background-color ${tokens.motion.base} ${tokens.motion.ease}
    `,

    '&:hover': {
        transform: 'translateY(-1px)',
        background: tokens.color.uv300,
    },

    '&:active': {
        transform: 'translateY(1px)',
    },

    '& svg': {
        fontSize: '27px',
    },

    '&:focus-visible': {
        outline: `2px solid ${tokens.color.uv800}`,
        outlineOffset: '3px',
    },

    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',

        '&:hover, &:active': {
            transform: 'none',
        },
    },
});

const ProgressTrack = styled(Box)(({ theme }) => ({
    position: 'relative',

    width: '340px',
    height: '3px',

    marginLeft: '12px',
    overflow: 'hidden',

    background: '#aeb7ba',

    [theme.breakpoints.down('md')]: {
        width: '280px',
    },

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        maxWidth: '180px',
        marginLeft: '4px',
    },
}));

const ProgressIndicator = styled(Box)({
    position: 'absolute',

    top: 0,
    bottom: 0,
    left: 0,

    width: `${100 / RECENT_WORKS.length}%`,

    background: tokens.color.uv500,

    transition: `transform 360ms ${tokens.motion.ease}`,

    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
    },
});

function wrapIndex(index: number) {
    return (
        (index + RECENT_WORKS.length) %
        RECENT_WORKS.length
    );
}

export default function PortfolioRecentWorks() {
    const [activeIndex, setActiveIndex] =
        useState(0);

    const [direction, setDirection] =
        useState<1 | -1>(1);

    const pointerStartX = useRef<number | null>(
        null,
    );

    const orderedWorks = useMemo(
        () =>
            RECENT_WORKS.map(
                (_, offset) =>
                    RECENT_WORKS[
                    wrapIndex(
                        activeIndex + offset,
                    )
                    ],
            ),
        [activeIndex],
    );

    function changeProject(
        nextDirection: 1 | -1,
    ) {
        setDirection(nextDirection);

        setActiveIndex((current) =>
            wrapIndex(
                current + nextDirection,
            ),
        );
    }

    function handlePointerDown(
        event: React.PointerEvent<HTMLDivElement>,
    ) {
        pointerStartX.current =
            event.clientX;
    }

    function handlePointerUp(
        event: React.PointerEvent<HTMLDivElement>,
    ) {
        const start =
            pointerStartX.current;

        pointerStartX.current = null;

        if (start === null) {
            return;
        }

        const distance =
            event.clientX - start;

        if (Math.abs(distance) < 50) {
            return;
        }

        changeProject(
            distance < 0 ? 1 : -1,
        );
    }

    function handlePointerCancel() {
        pointerStartX.current = null;
    }

    return (
        <Section>
            <Inner>
                <Header>
                    <HeaderLabel>
                        Recent Works
                    </HeaderLabel>

                    <DownIcon aria-hidden="true">
                        <SouthIcon />
                    </DownIcon>
                </Header>

                <CarouselViewport
                    onPointerDown={
                        handlePointerDown
                    }
                    onPointerUp={handlePointerUp}
                    onPointerCancel={
                        handlePointerCancel
                    }
                >
                    <Track
                        key={activeIndex}
                        direction={direction}
                    >
                        {orderedWorks.map(
                            (work, index) => {
                                const featured =
                                    index === 0;

                                return (
                                    <WorkCard
                                        key={
                                            work.id
                                        }
                                        component="article"
                                        featured={
                                            featured
                                        }
                                    >
                                        <Media>
                                            <Image
                                                src={
                                                    work.image
                                                }
                                                alt={
                                                    work.title
                                                }
                                                fill
                                                priority={
                                                    featured
                                                }
                                                sizes={
                                                    featured
                                                        ? '(max-width: 639px) calc(100vw - 56px), 584px'
                                                        : '(max-width: 639px) 76vw, 306px'
                                                }
                                                style={{
                                                    objectFit:
                                                        'cover',
                                                }}
                                                draggable={
                                                    false
                                                }
                                            />
                                        </Media>

                                        <CardTitle
                                            featured={
                                                featured
                                            }
                                        >
                                            {
                                                work.title
                                            }
                                        </CardTitle>

                                        <CardArrow
                                            featured={
                                                featured
                                            }
                                            aria-hidden="true"
                                        >
                                            <ArrowForwardIcon />
                                        </CardArrow>
                                    </WorkCard>
                                );
                            },
                        )}
                    </Track>
                </CarouselViewport>

                <Controls>
                    <NavButton
                        type="button"
                        aria-label="Previous work"
                        onClick={() =>
                            changeProject(-1)
                        }
                    >
                        <ArrowBackIcon />
                    </NavButton>

                    <NavButton
                        type="button"
                        aria-label="Next work"
                        onClick={() =>
                            changeProject(1)
                        }
                    >
                        <ArrowForwardIcon />
                    </NavButton>

                    <ProgressTrack
                        aria-hidden="true"
                    >
                        <ProgressIndicator
                            style={{
                                transform: `translateX(${activeIndex *
                                    100
                                    }%)`,
                            }}
                        />
                    </ProgressTrack>
                </Controls>
            </Inner>
        </Section>
    );
}