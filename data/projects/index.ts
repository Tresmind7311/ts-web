import { Project } from './types';
import { greenHouseGardeningProject } from './green-house-gardening';
import { futureConstructionProject } from './future-construction';
import { globalIoProject } from './global-io';
import { musicDashboardProject } from './music-dashboard';
import { lifestyleProject } from './lifestyle';

const projectRegistry: Record<string, Project> = {
  [greenHouseGardeningProject.slug]: greenHouseGardeningProject,
  [futureConstructionProject.slug]: futureConstructionProject,
  [globalIoProject.slug]: globalIoProject,
  [musicDashboardProject.slug]: musicDashboardProject,
  [lifestyleProject.slug]: lifestyleProject,
};

/** All projects sorted by order */
export const projectList: Project[] = Object.values(projectRegistry).sort(
  (a, b) => a.order - b.order,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projectRegistry[slug];
}

export function getNextProject(slug: string): Project | undefined {
  const idx = projectList.findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;
  return projectList[(idx + 1) % projectList.length];
}

export const projectSlugs = projectList.map((p) => p.slug);
