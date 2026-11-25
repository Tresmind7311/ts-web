'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects/types';
import { tokens } from '@/theme/theme';
import { alpha } from '@mui/material/styles';

const CardRoot = styled(Link)({
  display: 'block',
  borderRadius: '16px',
  overflow: 'hidden',
  position: 'relative',
  textDecoration: 'none',
  cursor: 'pointer',
  aspectRatio: '16 / 10',
  '&:hover .card-overlay': {
    opacity: 1,
  },
  '&:hover .card-img': {
    transform: 'scale(1.04)',
  },
});

const CardImg = styled(Box)({
  position: 'absolute',
  inset: 0,
  transition: 'transform 0.4s ease',
});

const Overlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: `linear-gradient(to top, ${alpha(tokens.color.ink900, 0.8)} 0%, ${alpha(tokens.color.ink900, 0.1)} 60%)`,
  opacity: 1,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '24px',
});
const CardImage = styled(Image)({ objectFit: 'cover' });
const CardTitle = styled(Typography)({ color: tokens.color.neutral0, fontWeight: 700, lineHeight: 1.25 });
const CardDescription = styled(Typography)({ color: tokens.color.neutral0, marginTop: 4, fontSize: '0.8rem' });

const CategoryRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginBottom: '8px',
});

const CategoryTag = styled('span')({
  fontSize: '0.7rem',
  fontWeight: 600,
  color: tokens.color.neutral0,
  background: alpha(tokens.color.uv800, 0.75),
  borderRadius: '999px',
  padding: '3px 10px',
  backdropFilter: 'blur(4px)',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
});

interface Props {
  project: Project;
}

export default function ProjectCard({ project }: Props) {
  return (
    <CardRoot href={`/projects/${project.slug}#case-study-top`}>
      <CardImg className="card-img">
        <CardImage
          src={project.featuredImage}
          alt={project.hero.imageAlt ?? project.title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </CardImg>
      <Overlay className="card-overlay">
        <CategoryRow>
          {project.categories.map((cat) => (
            <CategoryTag key={cat}>{cat}</CategoryTag>
          ))}
        </CategoryRow>
        <CardTitle variant="h6">
          {project.title}
        </CardTitle>
        <CardDescription variant="body2">
          {project.shortDescription}
        </CardDescription>
      </Overlay>
    </CardRoot>
  );
}
