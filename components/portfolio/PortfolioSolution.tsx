'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { gsap } from '@/lib/gsap';
import { tokens } from '@/theme/theme';

const SKILLS = [
    'Product Design',
    'Brand Identity Design',
    'UX Design',
    'Branding',
    'Packaging Design',
    'Figma',
    'Photoshop',
];

const EXPERIENCE = [
    {
        role: 'Freelance',
        company: 'GreenLeaf Co',
        period: 'Currently',
    },
    {
        role: 'Brand Designer',
        company: 'UrbanFit Studio',
        period: '2023-24',
    },
    {
        role: 'Package Designer',
        company: 'GreenK Studio',
        period: '2020-22',
    },
];

const Section = styled('section')(({ theme }) => ({
    position: 'relative',
    overflow: 'hidden',
    background: '#eff8fc',
    padding: '96px 40px 110px',

    [theme.breakpoints.down('md')]: {
        padding: '80px 24px 88px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '64px 20px 72px',
    },
}));

const Inner = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1.05fr) minmax(420px, 0.95fr)',
    alignItems: 'center',
    gap: '72px',

    width: '100%',
    maxWidth: '1280px',
    margin: '0 auto',

    [theme.breakpoints.down('lg')]: {
        gap: '48px',
    },

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
        gap: '64px',
    },

    [theme.breakpoints.down('sm')]: {
        gap: '48px',
    },
}));

const Content = styled(Box)({
    width: '100%',
    maxWidth: '620px',
});

const Title = styled(Typography)(({ theme }) => ({
    margin: 0,

    fontFamily: tokens.font.display,
    fontSize: '52px',
    fontWeight: 600,
    lineHeight: 1.12,
    letterSpacing: '-0.045em',
    color: tokens.color.uv800,

    [theme.breakpoints.down('lg')]: {
        fontSize: '46px',
    },

    [theme.breakpoints.down('md')]: {
        fontSize: '40px',
    },

    [theme.breakpoints.down('sm')]: {
        fontSize: '34px',
    },
}));

const Accent = styled('span')({
    color: tokens.color.uv300,
});

const Description = styled(Typography)(({ theme }) => ({
    maxWidth: '540px',
    marginTop: '30px',

    fontFamily: tokens.font.body,
    fontSize: '15px',
    fontWeight: 400,
    lineHeight: 1.55,
    color: tokens.color.ink900,

    [theme.breakpoints.down('sm')]: {
        marginTop: '24px',
        fontSize: '14px',
    },
}));

const Skills = styled(Box)({
    display: 'flex',
    flexWrap: 'wrap',
    gap: '12px',
    marginTop: '30px',
});

const Skill = styled('span')({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',

    minHeight: '34px',
    padding: '7px 12px',

    border: `1px solid ${tokens.color.uv800}`,
    borderRadius: tokens.radius.md,

    fontFamily: tokens.font.body,
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: 1,

    color: tokens.color.ink900,
    background: 'transparent',
});

const ExperienceList = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginTop: '48px',

    [theme.breakpoints.down('sm')]: {
        gap: '12px',
        marginTop: '40px',
    },
}));

const ExperienceRow = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1.1fr 1.45fr 0.8fr',
    alignItems: 'center',
    gap: '16px',

    minHeight: '42px',
    padding: '10px 14px',

    border: '1px solid rgba(7, 20, 99, 0.24)',
    borderRadius: tokens.radius.md,

    background: 'rgba(255, 255, 255, 0.14)',

    boxShadow:
        '0 5px 8px rgba(7, 20, 99, 0.12), 0 1px 2px rgba(7, 20, 99, 0.08)',

    fontFamily: tokens.font.body,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: 1.25,
    color: tokens.color.uv800,

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1.15fr 1.25fr auto',
        gap: '8px',
        padding: '10px 12px',
        fontSize: '11px',
    },
}));

const Company = styled('span')({
    color: '#087abc',
});

const Period = styled('span')({
    textAlign: 'right',
    whiteSpace: 'nowrap',
});

const Visual = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    aspectRatio: '1.35 / 1',

    willChange: 'transform',
    transformOrigin: 'center center',
    backfaceVisibility: 'hidden',

    [theme.breakpoints.down('md')]: {
        width: 'min(680px, 100%)',
        margin: '0 auto',
        aspectRatio: '1.4 / 1',
    },

    [theme.breakpoints.down('sm')]: {
        width: '115%',
        marginLeft: '-7.5%',
        aspectRatio: '1.25 / 1',
    },

    '@media (prefers-reduced-motion: reduce)': {
        willChange: 'auto',
        transform: 'none',
    },
}));

export default function PortfolioSolution() {
    const sectionRef = useRef<HTMLElement>(null);
    const visualRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const visual = visualRef.current;

        if (!section || !visual) {
            return;
        }

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            mm.add(
                {
                    desktop: '(min-width: 960px)',
                    mobile: '(max-width: 959px)',
                    reduceMotion:
                        '(prefers-reduced-motion: reduce)',
                },
                (context) => {
                    const {
                        desktop,
                        mobile,
                        reduceMotion,
                    } = context.conditions as {
                        desktop: boolean;
                        mobile: boolean;
                        reduceMotion: boolean;
                    };

                    if (reduceMotion) {
                        gsap.set(visual, {
                            scale: 1,
                            clearProps: 'willChange',
                        });

                        return;
                    }

                    const trigger = desktop
                        ? section
                        : visual;

                    const startScale = desktop
                        ? 1.32
                        : 1.18;

                    gsap.fromTo(
                        visual,
                        {
                            scale: startScale,
                        },
                        {
                            scale: 1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger,
                                start: desktop ? 'top 90%' : 'top 95%',
                                end: desktop ? 'top 5%' : 'top 25%',
                                scrub: 1,
                                invalidateOnRefresh: true,
                            },
                        },
                    );
                },
            );

            return () => {
                mm.revert();
            };
        }, section);

        return () => {
            ctx.revert();
        };
    }, []);

    return (
        <Section ref={sectionRef}>
            <Inner>
                <Content>
                    <Title component="h2">
                        Tresmind <Accent>Solution</Accent>
                    </Title>

                    <Description>
                        We design digital experiences that combine
                        strategy, design, and technology to help
                        brands grow, engage, and transform. From
                        product design to branding and visual
                        identity, we create solutions that leave a
                        lasting impact.
                    </Description>

                    <Skills>
                        {SKILLS.map((skill) => (
                            <Skill key={skill}>
                                {skill}
                            </Skill>
                        ))}
                    </Skills>

                    <ExperienceList>
                        {EXPERIENCE.map((item) => (
                            <ExperienceRow key={item.role}>
                                <span>{item.role}</span>

                                <Company>
                                    {item.company}
                                </Company>

                                <Period>
                                    {item.period}
                                </Period>
                            </ExperienceRow>
                        ))}
                    </ExperienceList>
                </Content>

                <Visual ref={visualRef}>
                    <Image
                        src="/images/Portfolio/TS-logo-large.png"
                        alt="Tresmind"
                        fill
                        sizes="(max-width: 959px) 100vw, 50vw"
                        style={{
                            objectFit: 'contain',
                        }}
                    />
                </Visual>
            </Inner>
        </Section>
    );
}