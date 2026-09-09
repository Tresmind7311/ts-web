'use client';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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

const TagsWrap = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
});

const Tag = styled(Box)(({ theme }) => ({
  padding: '10px 22px',
  borderRadius: '999px',
  border: `1.5px solid ${theme.palette.grey[300]}`,
  fontSize: '0.9rem',
  fontWeight: 600,
  color: theme.palette.text.primary,
  background: theme.palette.grey[50],
  transition: 'all 0.2s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
    color: theme.palette.primary.main,
    background: `${theme.palette.primary.main}0d`,
  },
}));

interface Props {
  project: Project;
}

export default function ProjectTechStack({ project }: Props) {
  if (!project.technologies.length) return null;

  return (
    <Root>
      <Inner>
        <Typography
          variant="overline"
          sx={{ color: 'primary.main', fontWeight: 700, letterSpacing: '0.1em', display: 'block', mb: 1 }}
        >
          Tech Stack
        </Typography>
        <Typography
          variant="h3"
          sx={{ fontWeight: 800, mb: 5, fontSize: { xs: '1.8rem', md: '2.2rem' } }}
        >
          Technologies Used
        </Typography>
        <TagsWrap>
          {project.technologies.map((tech) => (
            <Tag key={tech}>{tech}</Tag>
          ))}
        </TagsWrap>
      </Inner>
    </Root>
  );
}
