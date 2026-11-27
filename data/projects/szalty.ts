import type { Project } from './types';

// Source: Project 09 response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf; app-function claims and approval pending.
export const szaltyProject: Project = {
  slug: 'szalty', title: 'Szalty', categories: ['Development'], order: 12,
  seo: { title: 'Szalty Case Study | Tresmind Solutions', description: 'Figma-to-WordPress marketing site for a social nutrition brand using Elementor layouts.' },
  featuredImage: '/images/projects/szalty/hero.jpg',
  shortDescription: 'A responsive WordPress marketing presence built from Figma designs.',
  hero: { image: '/images/projects/szalty/hero.jpg', imageAlt: 'Szalty website pages displayed across overlapping laptop screens' },
  overview: { description: 'Tresmind translated supplied Figma designs into a WordPress marketing website for Szalty’s social nutrition brand. The response identifies Elementor layouts, navigation, content presentation, and RankMath SEO configuration.', client: 'Szalty', role: 'Figma-to-WordPress marketing website', liveUrl: 'https://szalty.com/' },
  challenge: 'The brand needed its sport-tech visual identity and content translated from Figma into a responsive marketing website.',
  solution: 'Tresmind built WordPress pages with Elementor from the Figma designs, organized navigation and content, and configured RankMath SEO according to the response.',
  gallery: ['/images/projects/szalty/gallery-01.jpg'],
  galleryDimensions: [{ width: 1999, height: 1500 }],
  galleryAlts: ['Szalty homepage and extended website layout displayed on a laptop mockup'],
  results: [],
  technologies: ['Figma', 'WordPress', 'Elementor', 'RankMath SEO', 'MySQL'],
  technologyGroups: [{ title: 'Design and pages', items: ['Figma', 'WordPress', 'Elementor'] }, { title: 'Configuration and data', items: ['RankMath SEO', 'MySQL'] }],
  features: [
    { title: 'Figma-based layouts', description: 'Elementor page templates reflect the supplied sport-tech design direction.' },
    { title: 'Responsive presentation', description: 'Marketing content and navigation adapt across screen sizes.' },
    { title: 'SEO configuration', description: 'The response identifies RankMath SEO configuration for the WordPress site.' },
  ],
  architecture: [
    { title: 'Design source', description: 'Figma provided the marketing-site visual direction.' },
    { title: 'WordPress presentation', description: 'Elementor composes responsive website pages.' },
    { title: 'Site configuration', description: 'RankMath SEO and MySQL are identified in the response.' },
  ],
  outcome: 'Tresmind delivered a responsive WordPress marketing website based on the supplied Figma designs. The source does not establish delivery of nutrition tracking or social-platform application features.',
};
