import type { Project } from './types';

// Source: Project 10 response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf; theme, callback, performance and approval evidence pending.
export const sourceOneHomesProject: Project = {
  slug: 'source-one-homes', title: 'Source One Homes', categories: ['Development'], order: 13,
  seo: { title: 'Source One Homes Case Study | Tresmind Solutions', description: 'WordPress residential-construction portfolio with project galleries and contact presentation.' },
  featuredImage: '/images/projects/source-one-homes/hero.jpg',
  shortDescription: 'A residential-construction portfolio with project galleries and contact paths.',
  hero: { image: '/images/projects/source-one-homes/hero.jpg', imageAlt: 'Source One Homes website and project imagery arranged in a design mockup' },
  overview: { description: 'Source One Homes needed a portfolio presentation for residential construction and remodeling. The project response describes WordPress work with PHP, MySQL, Elementor extensions, project galleries, and contact forms; the exact theme approach still needs verification.', client: 'Source One Homes', role: 'WordPress portfolio and contact presentation', liveUrl: 'https://sourceonehomes.com/' },
  challenge: 'The site needed a clear way to present residential project work and give prospective clients a route to contact the business.',
  solution: 'Tresmind organized construction and remodeling examples into a WordPress project gallery and added contact-form presentation. The response also describes Elementor extensions, but does not provide implementation evidence for the theme approach or callback workflow.',
  gallery: ['/images/projects/source-one-homes/gallery-01.jpg'],
  galleryDimensions: [{ width: 6000, height: 4500 }],
  galleryAlts: ['Source One Homes website layout displayed across a laptop and extended page mockup'],
  results: [],
  technologies: ['WordPress', 'PHP', 'MySQL', 'Elementor'],
  technologyGroups: [{ title: 'Website platform', items: ['WordPress', 'PHP', 'MySQL'] }, { title: 'Page presentation', items: ['Elementor'] }],
  features: [
    { title: 'Residential project gallery', description: 'Gallery content presents remodels, new construction, landscapes, garages, and casitas as described in the response.' },
    { title: 'Portfolio presentation', description: 'WordPress pages organize construction and remodeling work for browsing.' },
    { title: 'Contact path', description: 'The response identifies contact forms; callback-request behavior still needs verification.' },
  ],
  architecture: [
    { title: 'WordPress content', description: 'WordPress manages the portfolio presentation.' },
    { title: 'Project gallery', description: 'Gallery layouts group residential construction examples.' },
    { title: 'Contact presentation', description: 'Forms provide the contact path identified in the response.' },
  ],
  outcome: 'Tresmind delivered a WordPress residential-construction portfolio with project galleries and contact-form presentation described in the response.',
};
