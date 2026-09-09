'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Project } from '@/data/projects/types';

const Root = styled(Box)(({ theme }) => ({
  padding: '0 40px 96px',
  background: '#fff',
  [theme.breakpoints.down('md')]: {
    padding: '0 20px 64px',
  },
}));

const Inner = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
});

const Divider = styled(Box)(({ theme }) => ({
  height: '1px',
  background: theme.palette.grey[200],
  marginBottom: '48px',
}));

const CardLink = styled(Link)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  gap: '32px',
  textDecoration: 'none',
  borderRadius: '20px',
  padding: '32px',
  background: theme.palette.grey[50],
  border: `1px solid ${theme.palette.grey[200]}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: '0 16px 48px rgba(0,0,0,0.1)',
    transform: 'translateY(-2px)',
  },
  '&:hover .next-arrow': {
    transform: 'translateX(6px)',
    color: theme.palette.primary.main,
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const ImgWrap = styled(Box)({
  position: 'relative',
  width: '220px',
  aspectRatio: '16 / 9',
  borderRadius: '12px',
  overflow: 'hidden',
  flexShrink: 0,
});

const ArrowWrap = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  color: 'rgba(0,0,0,0.3)',
  transition: 'all 0.3s ease',
});

interface Props {
  nextProject: Project;
}

export default function ProjectNextProject({ nextProject }: Props) {
  return (
    <Root>
      <Inner>
        <Divider />
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 2 }}
        >
          Next Project
        </Typography>
        <CardLink href={`/projects/${nextProject.slug}`}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <ImgWrap>
              <Image
                src={nextProject.featuredImage}
                alt={nextProject.title}
                fill
                style={{ objectFit: 'cover' }}
                sizes="220px"
              />
            </ImgWrap>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'text.primary', mb: 0.5 }}>
                {nextProject.title}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: '400px' }}>
                {nextProject.shortDescription}
              </Typography>
            </Box>
          </Box>
          <ArrowWrap className="next-arrow">
            <ArrowForwardIcon fontSize="large" />
          </ArrowWrap>
        </CardLink>
      </Inner>
    </Root>
  );
}
