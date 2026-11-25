export type ProjectCategory = 'Design' | 'Development' | 'Digital Marketing' | 'SEO';

export interface ProjectResult {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  title: string;
  categories: ProjectCategory[];
  order: number;
  seo: {
    title: string;
    description: string;
  };
  featuredImage: string;
  shortDescription: string;
  hero: {
    image: string;
    imageAlt?: string;
  };
  overview: {
    description: string;
    client: string;
    timeline?: string;
    role: string;
    liveUrl?: string;
  };
  challenge: string;
  solution: string;
  gallery: string[];
  galleryDimensions?: { width: number; height: number }[];
  galleryAlts?: string[];
  results: ProjectResult[];
  technologies: string[];
  technologyGroups?: { title: string; items: string[] }[];
  features?: { title: string; description: string }[];
  architecture?: { title: string; description: string }[];
  outcome?: string;
}
