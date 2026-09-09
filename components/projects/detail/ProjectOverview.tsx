'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Project } from '@/data/projects/types';

const Root = styled(Box)(({ theme }) => ({
  padding: '96px 40px',
  background: '#fff',
  [theme.breakpoints.down('md')]: {
    padding: '64px 20px',
  },
}));

const Inner = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
});

const Eyebrow = styled(Typography)(({ theme }) => ({
  fontSize: '0.8rem',
  fontWeight: 700,
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: theme.palette.primary.main,
  marginBottom: '12px',
}));

const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1.6fr 1fr',
  gap: '60px',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: '40px',
  },
}));

const MetaPanel = styled(Box)(({ theme }) => ({
  background: theme.palette.grey[50],
  borderRadius: '16px',
  padding: '32px',
  border: `1px solid ${theme.palette.grey[200]}`,
}));

const MetaRow = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  paddingBottom: '20px',
  marginBottom: '20px',
  borderBottom: '1px solid rgba(0,0,0,0.07)',
  '&:last-child': {
    borderBottom: 'none',
    paddingBottom: 0,
    marginBottom: 0,
  },
});

const MetaLabel = styled(Typography)({
  fontSize: '0.72rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: 'rgba(0,0,0,0.4)',
});

const MetaValue = styled(Typography)({
  fontSize: '0.95rem',
  fontWeight: 600,
  color: 'rgba(0,0,0,0.85)',
});

const LiveLink = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontSize: '0.9rem',
  fontWeight: 600,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': { textDecoration: 'underline' },
}));

interface Props {
  project: Project;
}

export default function ProjectOverview({ project }: Props) {
  const { overview } = project;
  return (
    <Root>
      <Inner>
        <Eyebrow>Project Overview</Eyebrow>
        <Typography variant="h3" sx={{ fontWeight: 800, mb: 4, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
          About the Project
        </Typography>
        <Grid>
          <Typography
            variant="body1"
            sx={{ color: 'text.secondary', lineHeight: 1.85, fontSize: '1.05rem' }}
          >
            {overview.description}
          </Typography>
          <MetaPanel>
            <MetaRow>
              <MetaLabel>Client</MetaLabel>
              <MetaValue>{overview.client}</MetaValue>
            </MetaRow>
            <MetaRow>
              <MetaLabel>Timeline</MetaLabel>
              <MetaValue>{overview.timeline}</MetaValue>
            </MetaRow>
            <MetaRow>
              <MetaLabel>Our Role</MetaLabel>
              <MetaValue>{overview.role}</MetaValue>
            </MetaRow>
            {overview.liveUrl && (
              <MetaRow>
                <MetaLabel>Live URL</MetaLabel>
                <LiveLink href={overview.liveUrl} target="_blank" rel="noopener noreferrer">
                  Visit Site <OpenInNewIcon sx={{ fontSize: '0.85rem' }} />
                </LiveLink>
              </MetaRow>
            )}
          </MetaPanel>
        </Grid>
      </Inner>
    </Root>
  );
}
