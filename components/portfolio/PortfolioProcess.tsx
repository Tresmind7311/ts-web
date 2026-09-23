'use client';

import { useState } from 'react';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { tokens } from '@/theme/theme';

interface ProcessStep {
    number: '1' | '2' | '3' | '4';
    title: string;
    description: string;
}

const PROCESS_STEPS: ProcessStep[] = [
    {
        number: '1',
        title: 'Discover the Challenge',
        description:
            'We start by understanding your goals, users, and constraints so the design direction solves the right problem from the beginning.',
    },
    {
        number: '2',
        title: 'Shape the Strategy',
        description:
            'We define the structure, experience, and creative direction to turn early ideas into a focused, practical design foundation.',
    },
    {
        number: '3',
        title: 'From Vision to Design',
        description:
            'Turn your ideas into a clear, purposeful digital experience, designed around your goals, your users, and the way your business works.',
    },
    {
        number: '4',
        title: 'Refine and Deliver',
        description:
            'We polish the final experience, align every visual detail, and prepare the solution so it is ready to launch with confidence.',
    },
];

const Section = styled('section')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#021a87',
    backgroundImage: 'url("/footer-bg.jpg")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    borderRadius: '44px 44px 0 0',
    padding: '90px 80px 84px',

    [theme.breakpoints.down('lg')]: {
        padding: '80px 48px 76px',
        borderRadius: '36px 36px 0 0',
    },

    [theme.breakpoints.down('md')]: {
        padding: '64px 28px 64px',
        borderRadius: '28px 28px 0 0',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '48px 20px 48px',
        borderRadius: '24px 24px 0 0',
    },
}));

const Inner = styled(Box)({
    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',
});

const TopRow = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'end',
    gap: '28px',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        alignItems: 'start',
        gap: '26px',
    },
}));

const HeaderBlock = styled(Box)({
    maxWidth: '760px',
});

const Chip = styled(Box)({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '28px',
    padding: '6px 12px',
    borderRadius: '999px',
    background: 'rgba(255,255,255,0.94)',
    color: '#111',
    fontFamily: tokens.font.body,
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1,
});

const Heading = styled(Typography)(({ theme }) => ({
    marginTop: '28px',
    fontFamily: tokens.font.display,
    fontSize: '58px',
    fontWeight: 500,
    lineHeight: 1.04,
    letterSpacing: '-0.05em',
    color: tokens.color.neutral0,

    [theme.breakpoints.down('lg')]: {
        fontSize: '50px',
    },

    [theme.breakpoints.down('md')]: {
        marginTop: '22px',
        fontSize: '42px',
    },

    [theme.breakpoints.down('sm')]: {
        marginTop: '18px',
        fontSize: '34px',
        lineHeight: 1.08,
    },
}));

const Subcopy = styled(Typography)(({ theme }) => ({
    marginTop: '24px',
    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 1.5,
    color: 'rgba(255,255,255,0.66)',

    [theme.breakpoints.down('md')]: {
        fontSize: '17px',
    },

    [theme.breakpoints.down('sm')]: {
        marginTop: '18px',
        fontSize: '15px',
    },
}));

const Actions = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '18px',

    [theme.breakpoints.down('md')]: {
        justifyContent: 'flex-start',
    },

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        flexDirection: 'column',
        gap: '14px',
    },
}));

const ActionLink = styled(Link, {
    shouldForwardProp: (prop) => prop !== 'variantType',
})<{ variantType: 'solid' | 'outline' }>(({ theme, variantType }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '238px',
    minHeight: '60px',
    padding: '14px 26px',
    borderRadius: '12px',
    textDecoration: 'none',
    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 600,
    lineHeight: 1,
    transition: `
        background-color ${tokens.motion.base} ${tokens.motion.ease},
        color ${tokens.motion.base} ${tokens.motion.ease},
        border-color ${tokens.motion.base} ${tokens.motion.ease},
        transform ${tokens.motion.base} ${tokens.motion.ease}
    `,

    ...(variantType === 'solid'
        ? {
            background: 'rgba(255,255,255,0.96)',
            border: '1px solid rgba(255,255,255,0.96)',
            color: '#101010',
        }
        : {
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.9)',
            color: tokens.color.neutral0,
        }),

    '&:hover': {
        transform: 'translateY(-1px)',
    },

    '&:focus-visible': {
        outline: '2px solid rgba(255,255,255,0.9)',
        outlineOffset: '3px',
    },

    [theme.breakpoints.down('sm')]: {
        width: '100%',
        minWidth: 0,
        minHeight: '54px',
        fontSize: '17px',
    },

    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',

        '&:hover': {
            transform: 'none',
        },
    },
}));

const StepsDesktop = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'stretch',
    gap: '28px',
    marginTop: '92px',
    perspective: '1200px',

    [theme.breakpoints.down('lg')]: {
        gap: '18px',
    },

    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const StepButton = styled('button', {
    shouldForwardProp: (prop) =>
        prop !== 'active' &&
        prop !== 'stepOffset',
})<{
    active: boolean;
    stepOffset: number;
}>(({ active, stepOffset }) => {
    const rotateY =
        stepOffset < 0
            ? 8
            : stepOffset > 0
                ? -8
                : 0;

    return {
        position: 'relative',
        flexGrow: active ? 1.9 : 1,
        flexBasis: 0,
        minWidth: 0,
        minHeight: '250px',

        padding: 0,
        border: 0,
        background: 'transparent',
        color: 'inherit',

        textAlign: 'left',
        cursor: 'pointer',

        transformStyle: 'preserve-3d',

        transform: active
            ? 'translateY(-12px) scale(1.02)'
            : `translateY(14px) scale(0.94) rotateY(${rotateY}deg)`,

        opacity: active ? 1 : 0.66,

        transition: `
            flex-grow 500ms cubic-bezier(0.16, 1, 0.3, 1),
            transform 500ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity 350ms ease
        `,

        '&:focus-visible': {
            outline: '2px solid rgba(255,255,255,0.9)',
            outlineOffset: '8px',
            borderRadius: '4px',
        },

        '@media (prefers-reduced-motion: reduce)': {
            transition: 'none',
            transform: 'none',
        },
    };
});

const StepLine = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    position: 'relative',
    width: '100%',
    height: '2px',

    background: active
        ? tokens.color.neutral0
        : 'rgba(255,255,255,0.55)',

    overflow: 'hidden',

    '&::after': {
        content: '""',
        position: 'absolute',
        inset: 0,

        background: `linear-gradient(
            90deg,
            ${tokens.color.neutral0},
            ${tokens.color.uv300}
        )`,

        transform: active
            ? 'scaleX(1)'
            : 'scaleX(0)',

        transformOrigin: 'left center',

        transition:
            'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
    },

    '@media (prefers-reduced-motion: reduce)': {
        '&::after': {
            transition: 'none',
        },
    },
}));

const StepBody = styled(Box)({
    position: 'relative',
    minHeight: '220px',
    marginTop: '20px',
});

const StepNumber = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    position: 'absolute',
    top: 0,
    left: 0,

    fontFamily: tokens.font.display,
    fontSize: active ? '205px' : '190px',
    fontWeight: 300,
    lineHeight: 0.9,
    letterSpacing: '-0.075em',

    color: active
        ? tokens.color.neutral0
        : 'rgba(255,255,255,0.42)',

    transform: active
        ? 'translateX(4px)'
        : 'translateX(0)',

    transition: `
        color 400ms ease,
        font-size 500ms cubic-bezier(0.16, 1, 0.3, 1),
        transform 500ms cubic-bezier(0.16, 1, 0.3, 1)
    `,

    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
        transform: 'none',
    },
}));

const StepContent = styled(Box, {
    shouldForwardProp: (prop) =>
        prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    position: 'absolute',

    top: '50%',
    left: '150px',
    right: '18px',

    transform: active
        ? 'translate(0, -50%)'
        : 'translate(32px, -50%)',

    opacity: active ? 1 : 0,

    visibility: active
        ? 'visible'
        : 'hidden',

    transition: `
        opacity 300ms ease 120ms,
        transform 500ms cubic-bezier(0.16, 1, 0.3, 1),
        visibility 0ms linear ${active ? '0ms' : '500ms'}
    `,

    pointerEvents: 'none',

    '@media (prefers-reduced-motion: reduce)': {
        transition: 'none',
        transform: 'translate(0, -50%)',
    },
}));

const StepTitle = styled(Typography)({
    fontFamily: tokens.font.display,
    fontSize: '28px',
    fontWeight: 500,
    lineHeight: 1.15,
    color: tokens.color.neutral0,
});

const StepDescription = styled(Typography)({
    marginTop: '12px',
    fontFamily: tokens.font.body,
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: 1.35,
    color: 'rgba(255,255,255,0.62)',
});

const StepsMobile = styled(Box)(({ theme }) => ({
    display: 'none',

    [theme.breakpoints.down('md')]: {
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        marginTop: '44px',
    },
}));

const MobileStep = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    borderTop: '1px solid rgba(255,255,255,0.88)',
    paddingTop: '14px',
    opacity: active ? 1 : 0.92,
}));

const MobileStepButton = styled('button')({
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    width: '100%',
    padding: 0,
    border: 0,
    background: 'transparent',
    textAlign: 'left',
    cursor: 'pointer',
});

const MobileStepNumber = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    minWidth: '56px',
    fontFamily: tokens.font.display,
    fontSize: '72px',
    fontWeight: 300,
    lineHeight: 0.85,
    letterSpacing: '-0.06em',
    color: active
        ? 'rgba(255,255,255,1)'
        : 'rgba(255,255,255,0.48)',
}));

const MobileStepText = styled(Box)({
    flex: 1,
    minWidth: 0,
});

const MobileStepTitle = styled(Typography)({
    fontFamily: tokens.font.display,
    fontSize: '24px',
    fontWeight: 500,
    lineHeight: 1.15,
    color: tokens.color.neutral0,
});

const MobileStepDescription = styled(Typography)({
    marginTop: '10px',
    fontFamily: tokens.font.body,
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1.45,
    color: 'rgba(255,255,255,0.64)',
});

export default function PortfolioProcess() {
    const [activeStep, setActiveStep] = useState(2);

    return (
        <Section>
            <Inner>
                <TopRow>
                    <HeaderBlock>
                        <Chip>◉ Design process</Chip>

                        <Heading component="h2">
                            From Challenge to Solution
                        </Heading>

                        <Subcopy>
                            crafting bold visuals that inspire and elevate
                            brands with thought process.
                        </Subcopy>
                    </HeaderBlock>

                    <Actions>
                        <ActionLink
                            href="/contact"
                            variantType="solid"
                        >
                            Book a Free Call
                        </ActionLink>

                        <ActionLink
                            href="/portfolio"
                            variantType="outline"
                        >
                            See Projects
                        </ActionLink>
                    </Actions>
                </TopRow>

                <StepsDesktop>
                    {PROCESS_STEPS.map((step, index) => {
                        const active =
                            activeStep === index;

                        return (
                            <StepButton
                                key={step.number}
                                type="button"
                                active={active}
                                stepOffset={
                                    index - activeStep
                                }
                                onMouseEnter={() =>
                                    setActiveStep(index)
                                }
                                onFocus={() =>
                                    setActiveStep(index)
                                }
                                onClick={() =>
                                    setActiveStep(index)
                                }
                                aria-pressed={active}
                            >
                                <StepLine
                                    active={active}
                                />

                                <StepBody>
                                    <StepNumber
                                        active={active}
                                    >
                                        {step.number}
                                    </StepNumber>

                                    <StepContent
                                        active={active}
                                    >
                                        <StepTitle>
                                            {step.title}
                                        </StepTitle>

                                        <StepDescription>
                                            {step.description}
                                        </StepDescription>
                                    </StepContent>
                                </StepBody>
                            </StepButton>
                        );
                    })}
                </StepsDesktop>

                <StepsMobile>
                    {PROCESS_STEPS.map((step, index) => {
                        const active = activeStep === index;

                        return (
                            <MobileStep
                                key={step.number}
                                active={active}
                            >
                                <MobileStepButton
                                    type="button"
                                    onClick={() => setActiveStep(index)}
                                    onFocus={() => setActiveStep(index)}
                                    aria-expanded={active}
                                >
                                    <MobileStepNumber active={active}>
                                        {step.number}
                                    </MobileStepNumber>

                                    <MobileStepText>
                                        <MobileStepTitle>
                                            {step.title}
                                        </MobileStepTitle>

                                        {active && (
                                            <MobileStepDescription>
                                                {step.description}
                                            </MobileStepDescription>
                                        )}
                                    </MobileStepText>
                                </MobileStepButton>
                            </MobileStep>
                        );
                    })}
                </StepsMobile>
            </Inner>
        </Section>
    );
}