import type { Project } from './types';

// Source: Project 03 response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf; final evidence/sign-off pending.
export const thisIsWoodstockProject: Project = {
  slug: 'this-is-woodstock', title: 'This Is Woodstock', categories: ['Development'], order: 6,
  seo: { title: 'This Is Woodstock Case Study | Tresmind Solutions', description: 'WordPress podcast platform with structured episode content and reusable editorial templates.' },
  featuredImage: '/images/projects/this-is-woodstock/hero.jpg',
  shortDescription: 'A structured WordPress publishing experience for podcast episodes and related content.',
  hero: { image: '/images/projects/this-is-woodstock/hero.jpg', imageAlt: 'This Is Woodstock podcast homepage displayed on a laptop mockup' },
  overview: { description: 'Tresmind structured a WordPress podcast site around episodes and related editorial content. The project response describes custom post types, ACF relationships, and Elementor Pro templates for episodes, guests, brands, and glossary content.', client: 'This Is Woodstock', role: 'WordPress content modeling and podcast presentation', liveUrl: 'https://thisiswoodstock.ca/' },
  challenge: 'Podcast episodes, multimedia, guest biographies, and related brand links needed a more connected editorial workflow than fragmented content updates provided.',
  solution: 'Tresmind used WordPress custom post types and Advanced Custom Fields to relate podcast content, then built reusable Elementor Pro single and archive layouts for publication.',
  gallery: ['/images/projects/this-is-woodstock/gallery-01.jpg', '/images/projects/this-is-woodstock/gallery-02.jpg'],
  galleryDimensions: [{ width: 1999, height: 1333 }, { width: 1999, height: 1400 }],
  galleryAlts: ['This Is Woodstock website page displayed on a laptop mockup', 'This Is Woodstock community and editorial page displayed on a laptop mockup'],
  results: [],
  technologies: ['WordPress', 'Elementor Pro', 'Advanced Custom Fields', 'Forminator'],
  technologyGroups: [{ title: 'Content platform', items: ['WordPress', 'Advanced Custom Fields'] }, { title: 'Presentation and forms', items: ['Elementor Pro', 'Forminator'] }],
  features: [
    { title: 'Structured podcast content', description: 'Custom post types and ACF relationships organize episodes, guests, brands, and glossary content.' },
    { title: 'Reusable editorial layouts', description: 'Elementor Pro single and archive templates render related podcast content.' },
    { title: 'Listener paths', description: 'The response describes links to Spotify, Apple Podcasts, YouTube, and RSS alongside social sharing.' },
    { title: 'Forms and directories', description: 'The response describes Forminator form handling and interactive brand-directory filtering.' },
  ],
  architecture: [
    { title: 'Content records', description: 'WordPress custom post types separate podcast and related editorial content.' },
    { title: 'Relationships', description: 'ACF connects episodes with guests, brands, and other associated content.' },
    { title: 'Publication', description: 'Elementor Pro templates present single items and archives to readers.' },
  ],
  outcome: 'Tresmind delivered a WordPress podcast presentation with structured content relationships and reusable editorial layouts.',
};
