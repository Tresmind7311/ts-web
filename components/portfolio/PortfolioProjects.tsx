'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { SecondaryButton } from '@/components/common/Button';
import { tokens } from '@/theme/theme';

type ProjectCategory =
    | 'Mobile Apps'
    | 'Web Applications'
    | 'SaaS Platforms'
    | 'UI/UX Design'
    | 'Other';

type FilterValue = 'All Projects' | ProjectCategory;

interface PortfolioProject {
    id: string;
    title: string;
    type: string;
    description: string;
    category: ProjectCategory;
    href: string;
    image: string;
}

const FILTERS: FilterValue[] = [
    'All Projects',
    'Mobile Apps',
    'Web Applications',
    'SaaS Platforms',
    'UI/UX Design',
    'Other',
];

const PROJECTS: PortfolioProject[] = [
    {
        id: 'fittrack',
        title: 'FitTrack',
        type: 'Health & Fitness Mobile App',
        description:
            'A feature-rich fitness tracking app with real-time workouts, progress analytics, and personal insights.',
        category: 'Mobile Apps',
        href: '/portfolio/fittrack',
        image: '/images/Portfolio/FitTrack.jpg',
    },
    {
        id: 'findash',
        title: 'FinDash',
        type: 'Financial Dashboard Platform',
        description:
            'A secure analytics platform that helps businesses visualize financial data and make informed decisions.',
        category: 'SaaS Platforms',
        href: '/portfolio/findash',
        image: '/images/Portfolio/FinDash.jpg',
    },
    {
        id: 'cozyliving',
        title: 'CozyLiving',
        type: 'E-commerce Web Application',
        description:
            'An elegant e-commerce experience built for home decor with a focus on usability and seamless shopping.',
        category: 'Web Applications',
        href: '/portfolio/cozyliving',
        image: '/images/Portfolio/CozyLiving.jpg',
    },
    {
        id: 'writemate-ai',
        title: 'WriteMate AI',
        type: 'AI SaaS Platform',
        description:
            'An AI-powered content generation platform that helps users create, edit, and optimize content.',
        category: 'SaaS Platforms',
        href: '/portfolio/writemate-ai',
        image: '/images/Portfolio/WriteMate-AI.jpg',
    },
    {
        id: 'quickbite',
        title: 'QuickBite',
        type: 'Food Delivery Mobile App',
        description:
            'A fast and intuitive food delivery app with real-time tracking, multiple payment options, and simple ordering.',
        category: 'Mobile Apps',
        href: '/portfolio/quickbite',
        image: '/images/Portfolio/QuickBite.jpg',
    },
    {
        id: 'skillbridge',
        title: 'SkillBridge',
        type: 'Online Learning Platform',
        description:
            'A learning platform offering courses, certificates, and progress tracking for students and professionals.',
        category: 'Web Applications',
        href: '/portfolio/skillbridge',
        image: '/images/Portfolio/SkillBridge.jpg',
    },
];

const INITIAL_VISIBLE_PROJECTS = 6;

const Section = styled('section')(({ theme }) => ({
    background: '#eff8fc',
    padding: '75px 40px 88px',

    [theme.breakpoints.down('md')]: {
        padding: '50px 24px 72px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '50px 16px 56px',
    },
}));

const Inner = styled(Box)(() => ({
    width: '100%',
    maxWidth: '1184px',
    margin: '0 auto',
}));

const Filters = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    marginBottom: '86px',

    [theme.breakpoints.down('md')]: {
        justifyContent: 'flex-start',
        marginBottom: '56px',
    },

    [theme.breakpoints.down('sm')]: {
        flexWrap: 'nowrap',
        overflowX: 'auto',
        marginInline: '-16px',
        paddingInline: '16px',
        paddingBottom: '6px',
        marginBottom: '40px',
        scrollbarWidth: 'none',

        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },
}));

const FilterButton = styled('button', {
    shouldForwardProp: (prop) => prop !== 'active',
})<{ active: boolean }>(({ active }) => ({
    flexShrink: 0,
    minHeight: '42px',
    padding: '8px 30px',
    border: `1px solid ${tokens.color.uv500}`,
    borderRadius: '13px',

    background: active
        ? `linear-gradient(
            110deg,
            ${tokens.color.uv800} 0%,
            ${tokens.color.uv300} 100%
        )`
        : 'transparent',

    color: active
        ? tokens.color.neutral0
        : tokens.color.ink900,

    fontFamily: tokens.font.body,
    fontSize: '16px',
    fontWeight: 600,
    lineHeight: 1,
    cursor: 'pointer',

    transition: `
        color ${tokens.motion.base} ${tokens.motion.ease},
        background ${tokens.motion.base} ${tokens.motion.ease},
        border-color ${tokens.motion.base} ${tokens.motion.ease}
    `,

    '&:hover': {
        borderColor: tokens.color.uv300,
    },

    '&:focus-visible': {
        outline: `2px solid ${tokens.color.uv300}`,
        outlineOffset: '3px',
    },
}));

const ProjectsGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '36px',
    alignItems: 'start',

    [theme.breakpoints.down('md')]: {
        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
        gap: '28px 24px',
    },

    [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        gap: '24px',
    },
}));

const ProjectColumn = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: '38px',
    minWidth: 0,

    [theme.breakpoints.down('lg')]: {
        gap: '28px',
    },

    /*
     * Below desktop, flatten the columns back into ProjectsGrid.
     * Card `order` restores the original project sequence.
     */
    [theme.breakpoints.down('md')]: {
        display: 'contents',
    },
}));

const Card = styled(Link)(({ theme }) => ({
    position: 'relative',
    display: 'block',
    minWidth: 0,
    height: '284px',
    color: 'inherit',
    textDecoration: 'none',
    borderRadius: '20px',
    backgroundImage: 'url("/images/Portfolio/card-bg.png")',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',

    overflow: 'hidden',
    isolation: 'isolate',

    transition: `
        height 360ms ${tokens.motion.ease},
        box-shadow 360ms ${tokens.motion.ease}
    `,

    [theme.breakpoints.up('sm')]: {
        '@media (hover: hover) and (pointer: fine)': {
            '&:hover': {
                height: '366px',
                boxShadow:
                    '0 12px 22px rgba(7, 20, 99, 0.16), 0 3px 6px rgba(7, 20, 99, 0.08)',
            },
        },

        '&:focus-visible': {
            height: '366px',
            boxShadow:
                '0 12px 22px rgba(7, 20, 99, 0.16), 0 3px 6px rgba(7, 20, 99, 0.08)',
        },
    },

    '&:focus-visible': {
        outline: `2px solid ${tokens.color.uv300}`,
        outlineOffset: '4px',
    },

    [theme.breakpoints.down('sm')]: {
        height: 'auto',
        minHeight: 0,
    },
}));

const ProjectImage = styled(Box)(({ theme }) => ({
    position: 'absolute',
    zIndex: 0,
    inset: '0 0 auto',
    height: '118px',

    opacity: 0,
    transform: 'translateY(-12px)',

    transition: `
        opacity 300ms ease,
        transform 360ms cubic-bezier(0.16, 1, 0.3, 1)
    `,

    [theme.breakpoints.up('sm')]: {
        '@media (hover: hover) and (pointer: fine)': {
            '.portfolio-project-card:hover &': {
                opacity: 1,
                transform: 'translateY(0)',
            },
        },

        '.portfolio-project-card:focus-visible &': {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },

    [theme.breakpoints.down('sm')]: {
        position: 'relative',
        inset: 'auto',
        width: '100%',
        height: '170px',
        opacity: 1,
        transform: 'none',
    },
}));

const Content = styled(Box)(({ theme }) => ({
    position: 'absolute',
    zIndex: 2,
    inset: 0,

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    padding: '52px 29px 28px',
    background: 'transparent',

    transition: `
        top 360ms ${tokens.motion.ease},
        border-radius 360ms ${tokens.motion.ease},
        padding 360ms ${tokens.motion.ease}
    `,

    '.portfolio-project-card:hover &, .portfolio-project-card:focus-visible &': {
        top: '98px',
        justifyContent: 'flex-start',
        paddingTop: '78px',
        borderRadius: '20px 20px 0 0',
    },

    '@media (hover: none)': {
        position: 'relative',
        inset: 'auto',
        minHeight: '284px',
    },

    [theme.breakpoints.down('sm')]: {
        padding: '44px 24px 26px',
    },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
    margin: 0,

    fontFamily: tokens.font.display,
    fontSize: '29px',
    fontWeight: 700,
    lineHeight: 1.16,
    letterSpacing: '-0.04em',

    background: `linear-gradient(
        90deg,
        ${tokens.color.uv800} 25%,
        ${tokens.color.uv300} 100%
    )`,
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    WebkitTextFillColor: 'transparent',

    [theme.breakpoints.down('lg')]: {
        fontSize: '26px',
    },

    [theme.breakpoints.down('sm')]: {
        fontSize: '25px',
    },
}));

const ProjectType = styled(Typography)({
    marginTop: '5px',
    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 400,
    lineHeight: 1.4,
    color: '#303030',
});

const Description = styled(Typography)({
    display: '-webkit-box',
    overflow: 'hidden',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 3,

    marginTop: '20px',

    fontFamily: tokens.font.body,
    fontSize: '17px',
    fontWeight: 400,
    lineHeight: 1.65,
    color: '#667895',
});

const ArrowCircle = styled(Box)(({ theme }) => ({
    position: 'absolute',
    zIndex: 5,
    top: '26px',
    right: '24px',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '44px',
    height: '44px',

    borderRadius: '50%',
    background: tokens.color.uv300,
    color: tokens.color.neutral0,

    transition: `
        opacity 180ms ease,
        transform 250ms ease
    `,

    [theme.breakpoints.up('sm')]: {
        '@media (hover: hover) and (pointer: fine)': {
            '.portfolio-project-card:hover &': {
                opacity: 0,
                transform: 'scale(0.82)',
            },
        },

        '.portfolio-project-card:focus-visible &': {
            opacity: 0,
            transform: 'scale(0.82)',
        },
    },

    [theme.breakpoints.down('sm')]: {
        display: 'none',
    },
}));

const LearnMore = styled(Box)(({ theme }) => ({
    position: 'absolute',
    zIndex: 6,
    top: '105px',
    right: '18px',

    display: 'flex',
    alignItems: 'center',
    gap: '10px',

    opacity: 0,
    transform: 'translateY(10px)',

    fontFamily: tokens.font.body,
    fontSize: '18px',
    fontWeight: 600,
    color: '#0475be',

    transition: `
        opacity 220ms ease 80ms,
        transform 300ms ${tokens.motion.ease} 60ms
    `,

    [theme.breakpoints.up('sm')]: {
        '@media (hover: hover) and (pointer: fine)': {
            '.portfolio-project-card:hover &': {
                opacity: 1,
                transform: 'translateY(0)',
            },
        },

        '.portfolio-project-card:focus-visible &': {
            opacity: 1,
            transform: 'translateY(0)',
        },
    },

    [theme.breakpoints.down('sm')]: {
        top: 'auto',
        right: '24px',
        bottom: '24px',

        opacity: 1,
        transform: 'none',

        fontSize: '17px',
    },
}));

const LearnMoreIcon = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '44px',
    height: '44px',

    borderRadius: '50%',
    background: tokens.color.uv300,
    color: tokens.color.neutral0,
});

const BottomAction = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '112px',

    [theme.breakpoints.down('md')]: {
        marginTop: '72px',
    },

    [theme.breakpoints.down('sm')]: {
        marginTop: '48px',
    },
}));

export default function PortfolioProjects() {
    const [activeFilter, setActiveFilter] =
        useState<FilterValue>('All Projects');

    const [showAll, setShowAll] = useState(false);

    const filteredProjects = useMemo(() => {
        if (activeFilter === 'All Projects') {
            return PROJECTS;
        }

        return PROJECTS.filter(
            (project) => project.category === activeFilter,
        );
    }, [activeFilter]);

    const visibleProjects = showAll
        ? filteredProjects
        : filteredProjects.slice(0, INITIAL_VISIBLE_PROJECTS);

    const projectColumns: Array<
        Array<{
            project: PortfolioProject;
            order: number;
        }>
    > = [[], [], []];

    visibleProjects.forEach((project, index) => {
        projectColumns[index % 3].push({
            project,
            order: index,
        });
    });

    function handleFilterChange(filter: FilterValue) {
        setActiveFilter(filter);
        setShowAll(false);
    }

    return (
        <Section>
            <Inner>
                <Filters
                    role="group"
                    aria-label="Filter portfolio projects"
                >
                    {FILTERS.map((filter) => {
                        const active = activeFilter === filter;

                        return (
                            <FilterButton
                                key={filter}
                                type="button"
                                active={active}
                                aria-pressed={active}
                                onClick={() => handleFilterChange(filter)}
                            >
                                {filter}
                            </FilterButton>
                        );
                    })}
                </Filters>

                <ProjectsGrid>
                    {projectColumns.map((column, columnIndex) => (
                        <ProjectColumn key={columnIndex}>
                            {column.map(({ project, order }) => (
                                <Card
                                    key={project.id}
                                    href={project.href}
                                    className="portfolio-project-card"
                                    style={{ order }}
                                >
                                    <ProjectImage>
                                        <Image
                                            src={project.image}
                                            alt={`${project.title} project`}
                                            fill
                                            sizes="(max-width: 639px) 100vw, (max-width: 959px) 50vw, 33vw"
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </ProjectImage>

                                    <ArrowCircle aria-hidden="true">
                                        <ArrowForwardIcon />
                                    </ArrowCircle>

                                    <LearnMore>
                                        <LearnMoreIcon>
                                            <NorthEastIcon />
                                        </LearnMoreIcon>

                                        <span>Learn more</span>
                                    </LearnMore>

                                    <Content>
                                        <CardTitle>
                                            {project.title}
                                        </CardTitle>

                                        <ProjectType>
                                            {project.type}
                                        </ProjectType>

                                        <Description>
                                            {project.description}
                                        </Description>
                                    </Content>
                                </Card>
                            ))}
                        </ProjectColumn>
                    ))}
                </ProjectsGrid>

                <BottomAction>
                    <SecondaryButton
                        type="button"
                        onClick={() => setShowAll(true)}
                        sx={{
                            minHeight: '54px',
                            padding: '12px 28px',
                            borderRadius: '13px',
                            fontSize: '18px',
                        }}
                    >
                        View All Projects
                    </SecondaryButton>
                </BottomAction>
            </Inner>
        </Section>
    );
}