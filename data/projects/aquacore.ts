import type { Project } from './types';

// Source: Project 07 response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf; integrations and languages pending verification.
export const aquaCoreProject: Project = {
  slug: 'aquacore', title: 'AquaCore', categories: ['Development'], order: 10,
  seo: { title: 'AquaCore Case Study | Tresmind Solutions', description: 'WordPress service-site rebuild from Figma concepts with Elementor layouts and contact forms.' },
  featuredImage: '/images/projects/aquacore/concept.svg',
  shortDescription: 'A WordPress service presentation rebuilt from Figma concepts.',
  hero: { image: '/images/projects/aquacore/concept.svg', imageAlt: 'Concept illustration of water services and page cards; not AquaCore client work' },
  overview: { description: 'AquaCore needed a refreshed site for temporary water solutions and event infrastructure. Tresmind’s project response describes a WordPress rebuild from Figma concepts with service layouts, forms, sliders, and multilingual tooling.', client: 'AquaCore', role: 'WordPress website rebuild and service-page presentation', liveUrl: 'https://aquacore.nl/' },
  challenge: 'The prior site needed an updated visual presentation and a way to serve an international audience seeking temporary water services.',
  solution: 'Tresmind rebuilt the site structure in Elementor from Figma concepts and created dedicated service layouts. The response also identifies Forminator forms, sliders, and GTranslate configuration.',
  gallery: [], results: [],
  technologies: ['Figma', 'WordPress', 'Elementor', 'Forminator', 'GTranslate'],
  technologyGroups: [{ title: 'Design and website', items: ['Figma', 'WordPress', 'Elementor'] }, { title: 'Forms and language', items: ['Forminator', 'GTranslate'] }],
  features: [
    { title: 'Service presentation', description: 'Elementor layouts present AquaCore’s temporary water and event infrastructure services.' },
    { title: 'Forms and sliders', description: 'The project response identifies Forminator forms and slider sections in the rebuild.' },
    { title: 'Language tooling', description: 'The response identifies GTranslate configuration; specific languages and translation QA remain undocumented.' },
  ],
  architecture: [
    { title: 'Figma concepts', description: 'Figma designs guided the website rebuild.' },
    { title: 'WordPress pages', description: 'Elementor composes service-page layouts and sections.' },
    { title: 'Visitor tools', description: 'The response identifies Forminator for forms and GTranslate for language options.' },
  ],
  outcome: 'Tresmind delivered a WordPress service-site rebuild with refreshed layouts and the form, slider, and language tooling described in the project response.',
};
