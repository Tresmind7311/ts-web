'use client';

import { useEffect, useRef } from 'react';
import type { Project } from '@/data/projects/types';
import ProjectHero from './detail/ProjectHero';
import ProjectOverview from './detail/ProjectOverview';
import ProjectChallenge from './detail/ProjectChallenge';
import ProjectGallery from './detail/ProjectGallery';
import ProjectResults from './detail/ProjectResults';
import ProjectTechStack from './detail/ProjectTechStack';
import ProjectNextProject from './detail/ProjectNextProject';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, styled } from '@mui/material/styles';
import Heading from '@/components/common/Heading';
import { tokens } from '@/theme/theme';
import { gsap } from '@/lib/gsap';

interface Props {
  project: Project;
  nextProject?: Project;
}

const Section = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ padding: `${theme.spacing(24)} 0`, backgroundColor: tokens.color.neutral0, [theme.breakpoints.down('md')]: { padding: `${theme.spacing(16)} 0` } }));
const CapabilitiesSection = styled(Section)({
  position: 'relative',
  isolation: 'isolate',
  backgroundColor: tokens.color.uv800,
  backgroundImage: "url('/footer-bg.jpg')",
  backgroundSize: '100% 100%',
  backgroundPosition: 'top',
  backgroundRepeat: 'no-repeat',
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    zIndex: -1,
    backgroundColor: alpha(tokens.color.uv800, 0.6),
  },
});
const ArchitectureSection = styled(Section)({ background: 'radial-gradient(ellipse at 85% 65%, #dff6fd 0%, transparent 45%), #f3fdff' });
const OutcomeSection = styled(Section)({ background: 'radial-gradient(ellipse at 85% 65%, #dff6fd 0%, transparent 45%), #f3fdff', color: tokens.color.ink900 });
const SectionHeading = styled(Heading)(({ theme }) => ({ width: 'fit-content', maxWidth: '100%', fontSize: 48, letterSpacing: '-0.04em', lineHeight: 1.5, textTransform: 'none', marginBottom: theme.spacing(7), [theme.breakpoints.down('md')]: { fontSize: 34 } }));
const CapabilitiesHeading = styled(SectionHeading)({ color: tokens.color.neutral0 });
const FeatureGrid = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: theme.spacing(7), [theme.breakpoints.down('md')]: { gridTemplateColumns: '1fr', gap: theme.spacing(4) } }));
const Feature = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  borderTop: `1px solid ${tokens.color.uv300}`, paddingTop: theme.spacing(3), paddingBottom: theme.spacing(2),
  '@media (hover: hover) and (pointer: fine)': {
    transition: `transform ${tokens.motion.slow} ${tokens.motion.ease}, border-color ${tokens.motion.slow} ${tokens.motion.ease}`,
    '&:hover': { transform: 'translateY(-4px)', borderColor: tokens.color.uv800 },
  },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
}));
const FeatureTitle = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({ color: tokens.color.neutral0, fontFamily: tokens.font.display, fontSize: 26, fontWeight: 700, marginBottom: theme.spacing(2), [theme.breakpoints.down('md')]: { fontSize: 22 } }));
const FeatureBody = styled(Typography)<{ component?: React.ElementType }>({ color: tokens.color.neutral0, lineHeight: 1.75, maxWidth: '62ch' });
const ArchitectureGrid = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: theme.spacing(3), [theme.breakpoints.down('lg')]: { gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }, [theme.breakpoints.down('sm')]: { gridTemplateColumns: '1fr' } }));
const ArchitectureCard = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({
  padding: theme.spacing(6), border: `1px solid ${tokens.color.borderSubtle}`,
  borderTop: `3px solid ${tokens.color.uv800}`, borderRadius: tokens.radius.lg, backgroundColor: tokens.color.neutral0,
  [theme.breakpoints.down('md')]: { padding: theme.spacing(5) },
  '@media (hover: hover) and (pointer: fine)': {
    transition: `transform ${tokens.motion.slow} ${tokens.motion.ease}, box-shadow ${tokens.motion.slow} ${tokens.motion.ease}, border-color ${tokens.motion.slow} ${tokens.motion.ease}`,
    '&:hover': { transform: 'translateY(-4px)', boxShadow: tokens.shadow.md, borderColor: tokens.color.uv300 },
  },
  '@media (prefers-reduced-motion: reduce)': { transition: 'none', '&:hover': { transform: 'none' } },
}));
const ArchitectureTitle = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({ fontFamily: tokens.font.display, fontSize: 22, fontWeight: 700, marginBottom: theme.spacing(3) }));
const ArchitectureBody = styled(Typography)<{ component?: React.ElementType }>({ color: tokens.color.neutral700, lineHeight: 1.7 });
const OutcomeContent = styled(Box)<{ component?: React.ElementType }>(({ theme }) => ({ borderLeft: `4px solid ${tokens.color.uv300}`, paddingLeft: theme.spacing(6), [theme.breakpoints.down('md')]: { paddingLeft: theme.spacing(3) } }));
const OutcomeTitle = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({ color: tokens.color.ink900, fontFamily: tokens.font.display, fontSize: 48, fontWeight: 700, letterSpacing: '-0.04em', marginBottom: theme.spacing(4), [theme.breakpoints.down('md')]: { fontSize: 34 } }));
const OutcomeBody = styled(Typography)<{ component?: React.ElementType }>(({ theme }) => ({ fontSize: 24, lineHeight: 1.65, maxWidth: '62ch', color: tokens.color.neutral700, [theme.breakpoints.down('md')]: { fontSize: 19 } }));

export default function ProjectPage({ project, nextProject }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {
        const elements = gsap.utils.toArray<HTMLElement>('[data-case-reveal]');
        elements.forEach(element => {
          gsap.fromTo(element, { autoAlpha: 0, y: 24 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            ease: 'power2.out',
            delay: element.previousElementSibling?.hasAttribute('data-case-reveal') ? 0.12 : 0,
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          });
        });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  return (
    <Box ref={rootRef}>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectChallenge project={project} />
      {project.features && <CapabilitiesSection component="section" aria-labelledby="project-features-heading">
        <Container maxWidth="xl">
          <CapabilitiesHeading id="project-features-heading" variant="h2" gradient={false} data-case-reveal>
            Platform capabilities
          </CapabilitiesHeading>
          <FeatureGrid data-case-reveal>
            {project.features.map(feature => <Feature key={feature.title}>
              <FeatureTitle component="h3">{feature.title}</FeatureTitle>
              <FeatureBody>{feature.description}</FeatureBody>
            </Feature>)}
          </FeatureGrid>
        </Container>
      </CapabilitiesSection>}
      {project.architecture && <ArchitectureSection component="section" aria-labelledby="project-architecture-heading">
        <Container maxWidth="xl">
          <SectionHeading id="project-architecture-heading" variant="h2" data-case-reveal>
            Architecture at a glance
          </SectionHeading>
          <ArchitectureGrid data-case-reveal>
            {project.architecture.map(part => <ArchitectureCard key={part.title}>
              <ArchitectureTitle component="h3">{part.title}</ArchitectureTitle>
              <ArchitectureBody>{part.description}</ArchitectureBody>
            </ArchitectureCard>)}
          </ArchitectureGrid>
        </Container>
      </ArchitectureSection>}
      <ProjectGallery project={project} />
      <ProjectResults project={project} />
      <ProjectTechStack project={project} />
      {project.outcome && <OutcomeSection component="section" aria-labelledby="project-outcome-heading">
        <Container maxWidth="xl">
          <OutcomeContent data-case-reveal>
            <OutcomeTitle id="project-outcome-heading" component="h2">Delivered outcome</OutcomeTitle>
            <OutcomeBody>{project.outcome}</OutcomeBody>
          </OutcomeContent>
        </Container>
      </OutcomeSection>}
      {nextProject && <ProjectNextProject nextProject={nextProject} />}
    </Box>
  );
}
