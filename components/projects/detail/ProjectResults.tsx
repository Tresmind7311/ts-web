'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Project } from '@/data/projects/types';

const Root = styled(Box)(({ theme }) => ({
  padding: '96px 40px',
  background: 'linear-gradient(135deg, #060d2e 0%, #0d1b5e 100%)',
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
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '16px',
  padding: '32px 24px',
  textAlign: 'center',
  backdropFilter: 'blur(8px)',
  transition: 'background 0.3s ease',
  '&:hover': {
    background: 'rgba(255,255,255,0.1)',
  },
});

interface Props {
  project: Project;
}

export default function ProjectResults({ project }: Props) {
  if (!project.results.length) return null;

  return (
    <Root>
      <Inner>
        <Typography
          variant="overline"
          sx={{ color: 'primary.light', fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 1 }}
        >
          Results
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            color: '#fff',
            mb: 6,
            fontSize: { xs: '1.8rem', md: '2.2rem' },
          }}
        >
          Impact Delivered
        </Typography>
        <Grid>
          {project.results.map((r, i) => (
            <StatCard key={i}>
              <Typography
                variant="h3"
                sx={{ color: '#fff', fontWeight: 800, mb: 1, fontSize: { xs: '2rem', md: '2.4rem' } }}
              >
                {r.value}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5 }}
              >
                {r.label}
              </Typography>
            </StatCard>
          ))}
        </Grid>
      </Inner>
    </Root>
  );
}
