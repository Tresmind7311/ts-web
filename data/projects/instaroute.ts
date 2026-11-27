import type { Project } from './types';

// Source: Project 06 response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf; design-acceptance evidence pending.
export const instaRouteProject: Project = {
  slug: 'instaroute', title: 'InstaRoute', categories: ['Development'], order: 9,
  seo: { title: 'InstaRoute Case Study | Tresmind Solutions', description: 'Figma-to-WordPress implementation with Elementor layouts for a fleet and livery platform.' },
  featuredImage: '/images/projects/instaroute/hero.png',
  shortDescription: 'A responsive WordPress presentation built from supplied Figma designs.',
  hero: { image: '/images/projects/instaroute/hero.png', imageAlt: 'InstaRoute platform homepage displayed on a desktop monitor mockup' },
  overview: { description: 'InstaRoute supplied Figma layouts, branding, and visual assets for a fleet management and livery operations platform. Tresmind translated those designs into WordPress page layouts using Elementor.', client: 'InstaRoute', role: 'Figma-to-WordPress frontend implementation', liveUrl: 'https://instaroute.com/' },
  challenge: 'The project required intricate Figma grids and visual styling to become usable WordPress layouts across screen sizes.',
  solution: 'Tresmind built Elementor page layouts from the supplied Figma designs, structured the platform information, and adapted the layouts for responsive presentation.',
  gallery: ['/images/projects/instaroute/gallery-01.png', '/images/projects/instaroute/gallery-02.png'],
  galleryDimensions: [{ width: 1999, height: 1400 }, { width: 1999, height: 1400 }],
  galleryAlts: ['InstaRoute dispatch board page displayed on a desktop monitor mockup', 'InstaRoute fleet operations blog displayed on a laptop mockup'],
  results: [],
  technologies: ['Figma', 'WordPress', 'Elementor'],
  technologyGroups: [{ title: 'Design source', items: ['Figma'] }, { title: 'Website implementation', items: ['WordPress', 'Elementor'] }],
  features: [
    { title: 'Design translation', description: 'Supplied Figma layouts and branding informed WordPress page composition.' },
    { title: 'Platform presentation', description: 'Custom Elementor layouts organize fleet management and livery operations information.' },
    { title: 'Responsive layouts', description: 'Page layouts were adapted for use across device sizes.' },
  ],
  architecture: [
    { title: 'Design handoff', description: 'Figma supplied layout structures, branding, and visual assets.' },
    { title: 'Page implementation', description: 'Elementor implements the WordPress page layouts.' },
    { title: 'Responsive presentation', description: 'Layout grids and styling adapt across screen sizes.' },
  ],
  outcome: 'Tresmind delivered a responsive WordPress site that presents InstaRoute’s fleet and livery platform through layouts built from the supplied Figma designs.',
};
