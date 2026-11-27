import type { Project } from './types';

// Source: Project 08 response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf; sensitive claims and approval pending.
export const silverStreakSeniorServicesProject: Project = {
  slug: 'silver-streak-senior-services', title: 'Silver Streak Senior Services', categories: ['Development'], order: 11,
  seo: { title: 'Silver Streak Senior Services Case Study | Tresmind Solutions', description: 'WordPress senior-services directory with geographically organized resources and member-facing features.' },
  featuredImage: '/images/projects/silver-streak-senior-services/hero.jpg',
  shortDescription: 'A senior-services directory with organized resources and member-facing features.',
  hero: { image: '/images/projects/silver-streak-senior-services/hero.jpg', imageAlt: 'Silver Streak senior resource pages displayed around a laptop mockup' },
  overview: { description: 'The project response describes a senior-services directory, an educational resource library organized by geography, and a membership area. Tresmind used WordPress, PHP, and MySQL for the directory and content structure.', client: 'Silver Streak Senior Services', role: 'WordPress directory and resource-library development', liveUrl: 'https://silverstreakhelp.com/' },
  challenge: 'Families needed a way to browse senior-service information and educational resources across locations within a single site.',
  solution: 'Tresmind built a WordPress-based directory structure with PHP and MySQL, organized resources by geography, and provided member-facing site features described in the response.',
  gallery: ['/images/projects/silver-streak-senior-services/gallery-01.jpg'],
  galleryDimensions: [{ width: 1999, height: 1333 }],
  galleryAlts: ['Silver Streak resource directory and article pages displayed with a laptop mockup'],
  results: [],
  technologies: ['WordPress', 'PHP', 'MySQL', 'Tailwind CSS', 'JavaScript', 'jQuery'],
  technologyGroups: [{ title: 'Content and data', items: ['WordPress', 'PHP', 'MySQL'] }, { title: 'Frontend', items: ['Tailwind CSS', 'JavaScript', 'jQuery'] }],
  features: [
    { title: 'Service directory', description: 'Directory content organizes senior-service listings for browsing.' },
    { title: 'Geographic resources', description: 'An educational resource library groups information by location.' },
    { title: 'Membership area', description: 'The response identifies a member-facing dashboard; its access and security properties remain unverified.' },
  ],
  architecture: [
    { title: 'WordPress content', description: 'WordPress manages directory and resource content.' },
    { title: 'Directory data', description: 'PHP and MySQL support the custom directory structure described in the response.' },
    { title: 'Frontend', description: 'Tailwind CSS, JavaScript, and jQuery are listed in the project response.' },
  ],
  outcome: 'Tresmind delivered a senior-services directory and geographically organized resource presentation with member-facing features described in the response.',
};
