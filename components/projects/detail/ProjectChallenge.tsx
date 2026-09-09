'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Project } from '@/data/projects/types';

const Root = styled(Box)(({ theme }) => ({
  padding: '96px 40px',
  background: 'linear-gradient(135deg, #f0f4ff 0%, #e8edf8 100%)',
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
  gridTemplateColumns: '1fr 1fr',
  gap: '48px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: '40px',
  },
}));

const Card = styled(Box)<{ variant: 'challenge' | 'solution' }>(({ theme, variant }) => ({
  background: '#fff',
  borderRadius: '20px',
  padding: '40px',
  borderTop: `4px solid ${variant === 'challenge' ? '#ef5350' : theme.palette.primary.main}`,
  boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
}));

const IconCircle = styled(Box)<{ variant: 'challenge' | 'solution' }>(({ theme, variant }) => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.4rem',
  marginBottom: '20px',
  background:
    variant === 'challenge'
      ? 'rgba(239,83,80,0.1)'
      : `rgba(${theme.palette.primary.main},0.1)`,
}));

interface Props {
  project: Project;
}

export default function ProjectChallenge({ project }: Props) {
  return (
    <Root>
      <Inner>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, mb: 5, textAlign: 'center', fontSize: { xs: '1.8rem', md: '2.2rem' } }}
        >
          Challenge & Solution
        </Typography>
        <Grid>
          <Card variant="challenge">
            <IconCircle variant="challenge">⚡</IconCircle>
            <Typography
              variant="overline"
              sx={{ color: '#ef5350', fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 1 }}
            >
              The Challenge
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              What We Had to Solve
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              {project.challenge}
            </Typography>
          </Card>
          <Card variant="solution">
            <IconCircle variant="solution">✓</IconCircle>
            <Typography
              variant="overline"
              sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 1 }}
            >
              The Solution
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
              How We Built It
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>
              {project.solution}
            </Typography>
          </Card>
        </Grid>
      </Inner>
    </Root>
  );
}
