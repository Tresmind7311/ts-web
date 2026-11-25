import { Project } from './types';
import { greenHouseGardeningProject } from './green-house-gardening';
import { futureConstructionProject } from './future-construction';
import { globalIoProject } from './global-io';
import { musicDashboardProject } from './music-dashboard';
import { lifestyleProject } from './lifestyle';
import { mindVaultProject } from './mind-vault';
import { funeralMusicOnlineProject } from './funeral-music-online';
import { eternaGoodsProject } from './eterna-goods';
import { monoblendCoffeeRoasterProject } from './monoblend-coffee-roaster';
import { aumeOrganicsProject } from './aume-organics';
import { thisIsWoodstockProject } from './this-is-woodstock';
import { ghlAutomationAgencyProject } from './ghl-automation-agency';
import { skinsationalMobileProject } from './skinsational-mobile';
import { instaRouteProject } from './instaroute';
import { aquaCoreProject } from './aquacore';
import { silverStreakSeniorServicesProject } from './silver-streak-senior-services';
import { szaltyProject } from './szalty';
import { sourceOneHomesProject } from './source-one-homes';
import { breakawayFunctionalMedicineProject } from './breakaway-functional-medicine';

const draftProjects: Project[] = [
  greenHouseGardeningProject,
  futureConstructionProject,
  globalIoProject,
  musicDashboardProject,
  lifestyleProject,
];

export const approvedProjects: Project[] = [
  mindVaultProject,
  funeralMusicOnlineProject,
  eternaGoodsProject,
  monoblendCoffeeRoasterProject,
  aumeOrganicsProject,
  thisIsWoodstockProject,
  ghlAutomationAgencyProject,
  skinsationalMobileProject,
  instaRouteProject,
  aquaCoreProject,
  silverStreakSeniorServicesProject,
  szaltyProject,
  sourceOneHomesProject,
  breakawayFunctionalMedicineProject,
];

/** All projects sorted by order */
export const projectList: Project[] = [...draftProjects, ...approvedProjects].sort(
  (a, b) => a.order - b.order,
);

export function getProjectBySlug(slug: string): Project | undefined {
  return projectList.find((project) => project.slug === slug);
}

export function getApprovedProjectBySlug(slug: string): Project | undefined {
  return approvedProjects.find((project) => project.slug === slug);
}

export function getNextApprovedProject(slug: string): Project | undefined {
  const index = approvedProjects.findIndex((project) => project.slug === slug);
  return index === -1 ? undefined : approvedProjects[index + 1];
}

export function getNextProject(slug: string): Project | undefined {
  const idx = projectList.findIndex((p) => p.slug === slug);
  if (idx === -1) return undefined;
  return projectList[(idx + 1) % projectList.length];
}

export const projectSlugs = projectList.map((p) => p.slug);
