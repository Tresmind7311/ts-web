'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { tokens } from '@/theme/theme';
import type { Project } from '@/data/projects/types';

const Hero = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  backgroundColor: tokens.color.uv800, color: tokens.color.neutral0, overflow: 'hidden',
  paddingTop: theme.spacing(30), paddingBottom: theme.spacing(24),
  [theme.breakpoints.down('md')]: { paddingTop: theme.spacing(24), paddingBottom: theme.spacing(16) },
}));
const Layout = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  display: 'grid', gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)', gap: theme.spacing(8), alignItems: 'center',
  [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: theme.spacing(7) },
}));
const Eyebrow = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({ color: tokens.color.uv300, fontSize: 15, fontWeight: 600, marginBottom: theme.spacing(4) }));
const Title = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({
  color: tokens.color.neutral0, fontFamily: tokens.font.display, fontSize: 'clamp(5rem, 7vw, 8rem)',
  fontWeight: 700, letterSpacing: '-0.065em', lineHeight: 1.02, marginBottom: theme.spacing(4),
  [theme.breakpoints.down('md')]: { fontSize: 'clamp(3.5rem, 13vw, 5.5rem)' },
}));
const Description = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({
  fontSize: 25, lineHeight: 1.5, maxWidth: '36ch', color: tokens.color.neutral0,
  [theme.breakpoints.down('md')]: { fontSize: 19 },
}));
const Categories = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(1.5), marginTop: theme.spacing(6) }));
const Category = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({
  color: tokens.color.neutral0, border: `1px solid ${tokens.color.uv300}`, borderRadius: tokens.radius.full,
  padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`, fontSize: 14,
}));
const Visual = styled(Box)<{ component?: React.ElementType }>({ position: 'relative', aspectRatio: '8 / 5', borderRadius: tokens.radius.xl, overflow: 'hidden', border: `1px solid ${tokens.color.uv300}`, boxShadow: tokens.shadow.lg });
const VisualImage = styled(Image)({ objectFit: 'cover' });

export default function ProjectHero({ project }: { project: Project }) {
  return (
    <Hero component="section">
      <Container maxWidth="xl">
        <Layout>
          <Box data-case-reveal>
            <Eyebrow component="p">Tresmind case study</Eyebrow>
            <Title component="h1">
              {project.title}
            </Title>
            <Description>
              {project.shortDescription}
            </Description>
            <Categories>
              {project.categories.map(category => <Category key={category} component="span">{category}</Category>)}
            </Categories>
          </Box>
          <Visual data-case-reveal>
            <VisualImage src={project.hero.image} alt={project.hero.imageAlt ?? project.title} fill priority sizes="(max-width: 959px) 100vw, 55vw" />
          </Visual>
        </Layout>
      </Container>
    </Hero>
  );
}
