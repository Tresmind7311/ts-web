'use client';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Heading from '@/components/common/Heading';
import { tokens } from '@/theme/theme';
import type { Project } from '@/data/projects/types';

const Section = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ backgroundColor: tokens.color.neutral0, padding: `${theme.spacing(24)} 0`, [theme.breakpoints.down('md')]: { padding: `${theme.spacing(16)} 0` } }));
const SectionHeading = styled(Heading)(({ theme }) => ({ width: 'fit-content', maxWidth: '100%', fontSize: 48, letterSpacing: '-0.04em', lineHeight: 1.5, textTransform: 'none', marginBottom: theme.spacing(7), [theme.breakpoints.down('md')]: { fontSize: 34 } }));
const Grid = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: theme.spacing(4), [theme.breakpoints.down('md')]: { gap: theme.spacing(3) }, [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' } }));
const Group = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  background: 'radial-gradient(ellipse at 85% 65%, #dff6fd 0%, transparent 45%), #f3fdff', border: `1px solid ${tokens.color.borderSubtle}`,
  borderRadius: tokens.radius.lg, padding: theme.spacing(6),
  [theme.breakpoints.down('md')]: { padding: theme.spacing(5) },
  '@media (hover: hover) and (pointer: fine)': {
    transition: `transform ${tokens.motion.slow} ${tokens.motion.ease}, box-shadow ${tokens.motion.slow} ${tokens.motion.ease}, border-color ${tokens.motion.slow} ${tokens.motion.ease}`,
    '&:hover': { transform: 'translateY(-4px)', boxShadow: tokens.shadow.md, borderColor: tokens.color.uv300 },
  },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
}));
const GroupTitle = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({ fontFamily: tokens.font.display, fontSize: 22, fontWeight: 700, marginBottom: theme.spacing(3) }));
const Tags = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ display: 'flex', flexWrap: 'wrap', gap: theme.spacing(1), margin: 0, padding: 0, listStyle: 'none' }));
const Tag = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ border: `1px solid ${tokens.color.borderDefault}`, borderRadius: tokens.radius.full, padding: `${theme.spacing(1)} ${theme.spacing(2.5)}`, color: tokens.color.neutral700, backgroundColor: tokens.color.neutral0, fontSize: 14 }));

export default function ProjectTechStack({ project }: { project: Project }) {
  if (!project.technologies.length) return null;
  const groups = project.technologyGroups ?? [{ title: 'Technologies', items: project.technologies }];
  return (
    <Section component="section" aria-labelledby="project-technology-heading">
      <Container maxWidth="xl">
        <SectionHeading id="project-technology-heading" variant="h2" data-case-reveal>Technology behind the experience</SectionHeading>
        <Grid data-case-reveal>
          {groups.map(group => <Group key={group.title}>
            <GroupTitle component="h3">{group.title}</GroupTitle>
            <Tags component="ul">
              {group.items.map(item => <Tag component="li" key={item}>{item}</Tag>)}
            </Tags>
          </Group>)}
        </Grid>
      </Container>
    </Section>
  );
}
