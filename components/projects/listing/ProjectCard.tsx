'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import Link from 'next/link';
import { Project } from '@/data/projects/types';

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
  background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '24px',
});

const CategoryRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginBottom: '8px',
});

const CategoryTag = styled('span')({
  fontSize: '0.7rem',
  fontWeight: 600,
  color: 'rgba(255,255,255,0.85)',
  background: 'rgba(255,255,255,0.15)',
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
    <CardRoot href={`/projects/${project.slug}`}>
      <CardImg className="card-img">
        <Image
          src={project.featuredImage}
          alt={project.title}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </CardImg>
      <Overlay className="card-overlay">
        <CategoryRow>
          {project.categories.map((cat) => (
            <CategoryTag key={cat}>{cat}</CategoryTag>
          ))}
        </CategoryRow>
        <Typography
          variant="h6"
          sx={{ color: '#fff', fontWeight: 700, lineHeight: 1.25 }}
        >
          {project.title}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: 'rgba(255,255,255,0.75)', mt: 0.5, fontSize: '0.8rem' }}
        >
          {project.shortDescription}
        </Typography>
      </Overlay>
    </CardRoot>
  );
}
