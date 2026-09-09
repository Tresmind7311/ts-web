import { Project } from '@/data/projects/types';
import ProjectHero from './detail/ProjectHero';
import ProjectOverview from './detail/ProjectOverview';
import ProjectChallenge from './detail/ProjectChallenge';
import ProjectGallery from './detail/ProjectGallery';
import ProjectResults from './detail/ProjectResults';
import ProjectTechStack from './detail/ProjectTechStack';
import ProjectNextProject from './detail/ProjectNextProject';

interface Props {
  project: Project;
  nextProject?: Project;
}

export default function ProjectPage({ project, nextProject }: Props) {
  return (
    <>
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectChallenge project={project} />
      <ProjectGallery project={project} />
      <ProjectResults project={project} />
      <ProjectTechStack project={project} />
      {nextProject && <ProjectNextProject nextProject={nextProject} />}
    </>
  );
}
