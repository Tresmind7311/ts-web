'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Project } from '@/data/projects/types';
import { tokens } from '@/theme/theme';
import { alpha } from '@mui/material/styles';

const Root = styled(Box)(({ theme }) => ({
  padding: '96px 40px',
  background: tokens.color.uv800,
  [theme.breakpoints.down('md')]: {
    padding: '64px 20px',
  },
}));

const Inner = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
});

const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '24px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const StatCard = styled(Box)({
  background: alpha(tokens.color.neutral0, 0.06),
  border: `1px solid ${alpha(tokens.color.neutral0, 0.12)}`,
  borderRadius: '16px',
  padding: '32px 24px',
  textAlign: 'center',
  backdropFilter: 'blur(8px)',
  transition: 'background 0.3s ease',
  '&:hover': {
    background: alpha(tokens.color.neutral0, 0.1),
  },
});
const ResultsLabel = styled(Typography)(({ theme }) => ({ color: theme.palette.primary.light, fontWeight: 700, letterSpacing: '0.1em', display: 'block', marginBottom: theme.spacing(1) }));
const ResultsTitle = styled(Typography)(({ theme }) => ({ fontWeight: 800, color: tokens.color.neutral0, marginBottom: theme.spacing(6), fontSize: '2.2rem', [theme.breakpoints.down('md')]: { fontSize: '1.8rem' } }));
const StatValue = styled(Typography)(({ theme }) => ({ color: tokens.color.neutral0, fontWeight: 800, marginBottom: theme.spacing(1), fontSize: '2.4rem', [theme.breakpoints.down('md')]: { fontSize: '2rem' } }));
const StatLabel = styled(Typography)({ color: tokens.color.neutral0, fontSize: '0.85rem', lineHeight: 1.5 });

interface Props {
  project: Project;
}

export default function ProjectResults({ project }: Props) {
  if (!project.results.length) return null;

  return (
    <Root>
      <Inner>
        <ResultsLabel variant="overline">
          Results
        </ResultsLabel>
        <ResultsTitle variant="h3">
          Impact Delivered
        </ResultsTitle>
        <Grid>
          {project.results.map((r, i) => (
            <StatCard key={i}>
              <StatValue variant="h3">
                {r.value}
              </StatValue>
              <StatLabel variant="body2">
                {r.label}
              </StatLabel>
            </StatCard>
          ))}
        </Grid>
      </Inner>
    </Root>
  );
}
