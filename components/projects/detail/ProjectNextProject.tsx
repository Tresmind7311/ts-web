'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Project } from '@/data/projects/types';
import { tokens } from '@/theme/theme';

const Root = styled(Box)(({ theme }) => ({
  padding: '0 40px 96px',
  background: tokens.color.neutral0,
  [theme.breakpoints.down('md')]: {
    padding: '0 20px 64px',
  },
}));

const Inner = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
});

const Divider = styled(Box)({
  height: '1px',
  background: tokens.color.borderSubtle,
  marginBottom: '48px',
});

const CardLink = styled(Link)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  alignItems: 'center',
  gap: '32px',
  textDecoration: 'none',
  borderRadius: '20px',
  padding: '32px',
  background: 'radial-gradient(ellipse at 85% 65%, #dff6fd 0%, transparent 45%), #f3fdff',
  border: `1px solid ${tokens.color.borderSubtle}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: tokens.shadow.lg,
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
  color: tokens.color.neutral600,
  transition: 'all 0.3s ease',
});
const NextLabel = styled(Typography)(({ theme }) => ({ color: theme.palette.text.secondary, fontWeight: 700, letterSpacing: '0.1em', display: 'block', marginBottom: theme.spacing(2) }));
const CardContent = styled(Box)(({ theme }) => ({ display: 'flex', alignItems: 'center', gap: theme.spacing(3), flexWrap: 'wrap' }));
const NextImage = styled(Image)({ objectFit: 'cover' });
const NextTitle = styled(Typography)(({ theme }) => ({ fontWeight: 800, color: theme.palette.text.primary, marginBottom: theme.spacing(0.5) }));
const NextDescription = styled(Typography)(({ theme }) => ({ color: theme.palette.text.secondary, maxWidth: '400px' }));

interface Props {
  nextProject: Project;
}

export default function ProjectNextProject({ nextProject }: Props) {
  return (
    <Root>
      <Inner>
        <Divider />
        <NextLabel variant="overline">
          Next Project
        </NextLabel>
        <CardLink href={`/projects/${nextProject.slug}#case-study-top`}>
          <CardContent>
            <ImgWrap>
              <NextImage
                src={nextProject.featuredImage}
                alt={nextProject.title}
                fill
                sizes="220px"
              />
            </ImgWrap>
            <Box>
              <NextTitle variant="h5">
                {nextProject.title}
              </NextTitle>
              <NextDescription variant="body2">
                {nextProject.shortDescription}
              </NextDescription>
            </Box>
          </CardContent>
          <ArrowWrap className="next-arrow">
            <ArrowForwardIcon fontSize="large" />
          </ArrowWrap>
        </CardLink>
      </Inner>
    </Root>
  );
}
