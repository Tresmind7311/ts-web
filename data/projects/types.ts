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
  };
  overview: {
    description: string;
    client: string;
    timeline: string;
    role: string;
    liveUrl?: string;
  };
  challenge: string;
  solution: string;
  gallery: string[];
  results: ProjectResult[];
  technologies: string[];
}
