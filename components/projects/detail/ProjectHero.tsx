'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Image from 'next/image';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Project } from '@/data/projects/types';

const HeroRoot = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '92vh',
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #060d2e 0%, #0d1b5e 60%, #1a2a7a 100%)',
  overflow: 'hidden',
  padding: '120px 40px 80px',
  [theme.breakpoints.down('md')]: {
    padding: '100px 20px 60px',
    minHeight: 'auto',
  },
}));

const Inner = styled(Box)(({ theme }) => ({
  maxWidth: '1200px',
  margin: '0 auto',
  width: '100%',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '60px',
  alignItems: 'center',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
    gap: '40px',
  },
}));

const CategoryRow = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  marginBottom: '20px',
});

const CategoryTag = styled('span')(({ theme }) => ({
  fontSize: '0.75rem',
  fontWeight: 600,
  color: theme.palette.primary.light,
  border: `1px solid ${theme.palette.primary.light}`,
  borderRadius: '999px',
  padding: '4px 14px',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: '3.5rem',
  lineHeight: 1.1,
  color: '#fff',
  marginBottom: '20px',
  [theme.breakpoints.down('md')]: {
    fontSize: '2.4rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const Desc = styled(Typography)({
  color: 'rgba(255,255,255,0.7)',
  fontSize: '1.05rem',
  lineHeight: 1.75,
  marginBottom: '36px',
  maxWidth: '480px',
});

const ImgWrap = styled(Box)(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  overflow: 'hidden',
  aspectRatio: '16 / 10',
  boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
  [theme.breakpoints.down('md')]: {
    aspectRatio: '16 / 9',
  },
}));

const GlowBlob = styled(Box)({
  position: 'absolute',
  width: '500px',
  height: '500px',
  borderRadius: '50%',
  background: 'radial-gradient(circle, rgba(21,101,192,0.25) 0%, transparent 70%)',
  top: '-100px',
  right: '-100px',
  pointerEvents: 'none',
});

interface Props {
  project: Project;
}

export default function ProjectHero({ project }: Props) {
  return (
    <HeroRoot>
      <GlowBlob />
      <Inner>
        <Box>
          <CategoryRow>
            {project.categories.map((cat) => (
              <CategoryTag key={cat}>{cat}</CategoryTag>
            ))}
          </CategoryRow>
          <Title variant="h1">{project.title}</Title>
          <Desc variant="body1">{project.shortDescription}</Desc>
          {project.overview.liveUrl && (
            <Button
              variant="contained"
              href={project.overview.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              endIcon={<OpenInNewIcon />}
              sx={{
                borderRadius: '999px',
                px: 3.5,
                py: 1.4,
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '0.95rem',
              }}
            >
              View Live Project
            </Button>
          )}
        </Box>
        <ImgWrap>
          <Image
            src={project.hero.image}
            alt={project.title}
            fill
            style={{ objectFit: 'cover' }}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </ImgWrap>
      </Inner>
    </HeroRoot>
  );
}
