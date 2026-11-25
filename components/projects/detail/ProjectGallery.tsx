'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Heading from '@/components/common/Heading';
import { Project } from '@/data/projects/types';
import { tokens } from '@/theme/theme';

const Root = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  padding: `${theme.spacing(24)} 0`,
  background: tokens.color.neutral0,
  [theme.breakpoints.down('md')]: { padding: `${theme.spacing(16)} 0` },
}));

const Grid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  alignItems: 'start',
  gap: theme.spacing(4),
  '& > *:first-of-type': {
    gridColumn: '1 / -1',
  },
  '& > *:last-child:nth-child(even)': {
    gridColumn: '1 / -1',
  },
  '&[data-count="1"] > *': {
    maxWidth: theme.breakpoints.values.lg,
    justifySelf: 'center',
  },
  '&[data-count="2"]': {
    '& > *:first-of-type, & > *:last-child': {
      gridColumn: 'auto',
    },
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
    '& > *, & > *:first-of-type, & > *:last-child:nth-child(even)': {
      gridColumn: 'auto',
    },
  },
}));

const ImgWrap = styled(Box)({
  minWidth: 0,
  borderRadius: tokens.radius.xl,
  overflow: 'hidden',
  '@media (hover: hover) and (pointer: fine)': {
    transition: `transform ${tokens.motion.slow} ${tokens.motion.ease}`,
    '&:hover': { transform: 'translateY(-3px)' },
  },
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:hover': { transform: 'none' },
  },
});
const GalleryLabel = styled(Typography)(({ theme }) => ({ color: theme.palette.primary.main, fontWeight: 700, letterSpacing: '0.1em', display: 'block', marginBottom: theme.spacing(1) }));
const GalleryTitle = styled(Heading)(({ theme }) => ({ width: 'fit-content', maxWidth: '100%', fontSize: 48, lineHeight: 1.5, textTransform: 'none', marginBottom: theme.spacing(7), [theme.breakpoints.down('md')]: { fontSize: 34 } }));
const GalleryImage = styled(Image)({ display: 'block', width: '100%', height: 'auto' });

interface Props {
  project: Project;
}

export default function ProjectGallery({ project }: Props) {
  if (!project.gallery.length) return null;

  return (
    <Root component="section" aria-labelledby="project-gallery-heading">
      <Container maxWidth="xl">
        <GalleryLabel variant="overline">
          Gallery
        </GalleryLabel>
        <GalleryTitle id="project-gallery-heading" variant="h2">
          Project Screens
        </GalleryTitle>
        <Grid data-count={project.gallery.length}>
          {project.gallery.map((src, i) => {
            const fullWidth = project.gallery.length !== 2 && (i === 0 || (i === project.gallery.length - 1 && project.gallery.length % 2 === 0));
            return (
              <ImgWrap key={src}>
                <GalleryImage
                  src={src}
                  alt={project.galleryAlts?.[i] ?? `${project.title} project image ${i + 1}`}
                  width={project.galleryDimensions?.[i]?.width ?? 1200}
                  height={project.galleryDimensions?.[i]?.height ?? 900}
                  sizes={fullWidth ? '(max-width: 600px) 100vw, (max-width: 1536px) 90vw, 1536px' : '(max-width: 600px) 100vw, (max-width: 1536px) 55vw, 900px'}
                />
              </ImgWrap>
            );
          })}
        </Grid>
      </Container>
    </Root>
  );
}
