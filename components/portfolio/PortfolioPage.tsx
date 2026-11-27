'use client';

import PortfolioHero from './PortfolioHero';
import PortfolioAbout from './PortfolioAbout';
import ProjectCard from '@/components/projects/listing/ProjectCard';
import { approvedProjects } from '@/data/projects';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { tokens } from '@/theme/theme';
import Heading from '@/components/common/Heading';
import TestimonialsSection from '@/components/sections/home/TestimonialsSection';
import { homeTestimonials } from '@/data/testimonials/home';

const CaseStudies = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
    padding: `${theme.spacing(16)} 0`,
    backgroundColor: tokens.color.neutral0,
    [theme.breakpoints.down('md')]: { padding: `${theme.spacing(10)} 0` },
}));
const CaseStudiesTitle = styled(Heading)(({ theme }) => ({
    fontSize: 56,
    marginBottom: theme.spacing(2),
    lineHeight: 1.5,
    textTransform: 'none',
    [theme.breakpoints.down('md')]: { fontSize: 36 },
    [theme.breakpoints.down('sm')]: { fontSize: 36 },
}));
const CaseStudiesIntro = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    maxWidth: 680,
    marginBottom: theme.spacing(5),
}));
const CaseStudiesGrid = styled(Box)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: theme.spacing(4),
    [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr' },
}));

export default function PortfolioPage() {
    return (
        <main>
            <PortfolioHero />
            <PortfolioAbout />
            <CaseStudies component="section" aria-labelledby="case-studies-heading">
                <Container maxWidth="xl">
                    <CaseStudiesTitle id="case-studies-heading" variant="h2">
                        Case studies
                    </CaseStudiesTitle>
                    <CaseStudiesIntro>
                        Explore Tresmind projects spanning digital products and customized storefronts.
                    </CaseStudiesIntro>
                    <CaseStudiesGrid>
                        {approvedProjects.map((project) => <ProjectCard key={project.slug} project={project} />)}
                    </CaseStudiesGrid>
                </Container>
            </CaseStudies>
            <TestimonialsSection testimonials={homeTestimonials} />
        </main>
    );
}
