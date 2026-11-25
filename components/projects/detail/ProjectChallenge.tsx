'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Heading from '@/components/common/Heading';
import { tokens } from '@/theme/theme';
import type { Project } from '@/data/projects/types';

const Section = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ background: 'radial-gradient(ellipse at 85% 65%, #dff6fd 0%, transparent 45%), #f3fdff', padding: `${theme.spacing(24)} 0`, [theme.breakpoints.down('md')]: { padding: `${theme.spacing(16)} 0` } }));
const SectionHeading = styled(Heading)(({ theme }) => ({ width: 'fit-content', maxWidth: '100%', fontSize: 48, letterSpacing: '-0.04em', lineHeight: 1.5, textTransform: 'none', marginBottom: theme.spacing(10), [theme.breakpoints.down('md')]: { fontSize: 34, marginBottom: theme.spacing(6) } }));
const Grid = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: theme.spacing(5), [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: theme.spacing(3) } }));
const Card = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  backgroundColor: tokens.color.neutral0, border: `1px solid ${tokens.color.borderSubtle}`,
  borderTop: `3px solid ${tokens.color.uv800}`, borderRadius: tokens.radius.lg, padding: theme.spacing(8),
  [theme.breakpoints.down('md')]: { padding: theme.spacing(5) },
  '@media (hover: hover) and (pointer: fine)': {
    transition: `transform ${tokens.motion.slow} ${tokens.motion.ease}, box-shadow ${tokens.motion.slow} ${tokens.motion.ease}, border-color ${tokens.motion.slow} ${tokens.motion.ease}`,
    '&:hover': { transform: 'translateY(-4px)', boxShadow: tokens.shadow.md, borderColor: tokens.color.uv300 },
  },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
}));
const SolutionCard = styled(Card)({ backgroundColor: tokens.color.uv800, color: tokens.color.neutral0, border: `1px solid ${tokens.color.uv800}`, borderTop: `3px solid ${tokens.color.uv300}`, '@media (hover: hover) and (pointer: fine)': { '&:hover': { borderColor: tokens.color.uv300 } } });
const CardTitle = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({ fontFamily: tokens.font.display, fontSize: 36, fontWeight: 700, marginBottom: theme.spacing(4), [theme.breakpoints.down('md')]: { fontSize: 28 } }));
const SolutionTitle = styled(CardTitle)({ color: tokens.color.neutral0 });
const CardBody = styled(Typography)<{ component?: React.ElementType }>({ color: tokens.color.neutral700, fontSize: 18, lineHeight: 1.75, maxWidth: '60ch' });
const SolutionBody = styled(CardBody)({ color: tokens.color.neutral0 });

export default function ProjectChallenge({ project }: { project: Project }) {
  return (
    <Section component="section" aria-labelledby="project-challenge-heading">
      <Container maxWidth="xl">
        <SectionHeading id="project-challenge-heading" variant="h2" data-case-reveal>The problem and the response</SectionHeading>
        <Grid>
          <Card data-case-reveal>
            <CardTitle component="h3">The challenge</CardTitle>
            <CardBody>{project.challenge}</CardBody>
          </Card>
          <SolutionCard data-case-reveal>
            <SolutionTitle component="h3">The solution</SolutionTitle>
            <SolutionBody>{project.solution}</SolutionBody>
          </SolutionCard>
        </Grid>
      </Container>
    </Section>
  );
}
