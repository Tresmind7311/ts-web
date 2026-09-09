'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
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

const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '16px',
  '& > *:first-of-type': {
    gridColumn: '1 / -1',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    '& > *:first-of-type': {
      gridColumn: 'auto',
    },
  },
}));

const ImgWrap = styled(Box)({
  position: 'relative',
  borderRadius: '16px',
  overflow: 'hidden',
  aspectRatio: '16 / 9',
  '&:hover img': {
    transform: 'scale(1.03)',
  },
  '& img': {
    transition: 'transform 0.4s ease',
  },
});

interface Props {
  project: Project;
}

export default function ProjectGallery({ project }: Props) {
  if (!project.gallery.length) return null;

  return (
    <Root>
      <Inner>
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 1 }}
        >
          Gallery
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, mb: 5, fontSize: { xs: '1.8rem', md: '2.2rem' } }}
        >
          Project Screens
        </Typography>
        <Grid>
          {project.gallery.map((src, i) => (
            <ImgWrap key={i}>
              <Image
                src={src}
                alt={`${project.title} screenshot ${i + 1}`}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </ImgWrap>
          ))}
        </Grid>
      </Inner>
    </Root>
  );
}
