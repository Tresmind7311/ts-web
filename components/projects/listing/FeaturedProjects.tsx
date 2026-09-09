'use client';

import { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ProjectCard from './ProjectCard';
import ProjectFilters from './ProjectFilters';
import { projectList } from '@/data/projects';
import { ProjectCategory } from '@/data/projects/types';
import { Container } from '@mui/material';

/* ─── layout ──────────────────────────────────────────────── */

const Section = styled(Box)(({ theme }) => ({
  padding: '80px 40px',
  background: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: '60px 20px',
  },
}));

const Inner = styled(Container)(({ theme }) => ({
  // maxWidth: '1200px',
  // margin: '0 auto',
}));

const Header = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  alignItems: 'flex-start',
  gap: '24px',
  marginBottom: '32px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: '16px',
  },
}));

const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

/* ─── CTA card ─────────────────────────────────────────────── */

const CtaCard = styled(Link)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '36px',
  borderRadius: '16px',
  background: 'linear-gradient(135deg, #0d1b5e 0%, #1565C0 100%)',
  textDecoration: 'none',
  aspectRatio: '16 / 10',
  position: 'relative',
  overflow: 'hidden',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 20px 48px rgba(21,101,192,0.35)',
  },
  '&:hover .cta-arrow': {
    transform: 'translateX(6px)',
  },
}));

const ArrowCircle = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: '28px',
  right: '28px',
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: '2px solid rgba(255,255,255,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#fff',
  transition: 'transform 0.3s ease',
}));

/* ─── heading ─────────────────────────────────────────────── */

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '2.4rem',
  lineHeight: 1.1,
  '& span': { color: theme.palette.primary.main },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.8rem',
  },
}));

/* ─── component ────────────────────────────────────────────── */

export default function FeaturedProjects() {
  const [activeFilters, setActiveFilters] = useState<ProjectCategory[]>([]);

  const filtered = useMemo(() => {
    if (activeFilters.length === 0) return projectList;
    return projectList.filter((p) =>
      activeFilters.some((cat) => p.categories.includes(cat)),
    );
  }, [activeFilters]);

  return (
    <Section>
      <Inner maxWidth="xl">
        {/* ── header row ── */}
        <Header>
          <Box>
            <Heading variant="h2">
              <span>FEATURED</span> PROJECTS
            </Heading>
            <Box sx={{ mt: 2 }}>
              <ProjectFilters active={activeFilters} onChange={setActiveFilters} />
            </Box>
          </Box>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', lineHeight: 1.7, pt: { md: 0.5 } }}
          >
            We design, build and support websites and apps for clients worldwide. We make
            your business stand out.
          </Typography>
        </Header>

        {/* ── grid ── */}
        <Grid>
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}

          {/* CTA card — always at bottom-right */}
          <CtaCard href="/projects">
            <Typography
              variant="h4"
              sx={{ color: '#fff', fontWeight: 600, lineHeight: 1.2,
                fontSize:'55px'
               }}
            >
              See Our <br></br>More Projects
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: 'rgba(255,255,255,0.7)', mt: 1.5, maxWidth: '240px' }}
            >
              Lorem ipsum dolor sit amet consectetur. Mol estie duis enim id nunc tempor
              feu a.
            </Typography>
            <ArrowCircle className="cta-arrow">
              <ArrowForwardIcon fontSize="small" />
            </ArrowCircle>
          </CtaCard>
        </Grid>
      </Inner>
    </Section>
  );
}
