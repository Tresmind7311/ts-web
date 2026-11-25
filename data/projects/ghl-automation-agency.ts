import type { Project } from './types';

// Source: Project 04 response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf; animation details/evidence pending.
export const ghlAutomationAgencyProject: Project = {
  slug: 'ghl-automation-agency', title: 'GHL Automation Agency', categories: ['Development'], order: 7,
  seo: { title: 'GHL Automation Agency Case Study | Tresmind Solutions', description: 'WordPress agency presentation with custom PHP shortcodes and interactive section layouts.' },
  featuredImage: '/images/projects/ghl-automation-agency/hero.png',
  shortDescription: 'A WordPress agency website with custom sections for automation services.',
  hero: { image: '/images/projects/ghl-automation-agency/hero.png', imageAlt: 'GHL Automation Agency website displayed on a desktop monitor mockup' },
  overview: { description: 'GHL Automation Agency needed a digital presentation for AI automation and GoHighLevel CRM services. The project response describes Elementor with an Astra Child Theme, custom PHP shortcodes, and interactive layouts.', client: 'GHL Automation Agency', role: 'WordPress frontend and interactive section development', liveUrl: 'https://ghlautomationagency.com/' },
  challenge: 'The agency wanted a service presentation that could explain complex automation offerings through custom layouts and interface motion.',
  solution: 'Tresmind combined Elementor and an Astra Child Theme with custom WordPress PHP shortcodes. The response describes a horizontal-scrolling “How We Work” section and stacking-card layout built with GSAP and ScrollTrigger.',
  gallery: ['/images/projects/ghl-automation-agency/gallery-01.png', '/images/projects/ghl-automation-agency/gallery-02.png'],
  galleryDimensions: [{ width: 5000, height: 3500 }, { width: 5000, height: 3500 }],
  galleryAlts: ['GHL Automation Agency homepage displayed on a desktop monitor mockup', 'GHL Automation Agency workflow diagram displayed on a laptop mockup'],
  results: [],
  technologies: ['WordPress', 'Elementor', 'Astra Child Theme', 'PHP', 'GSAP', 'ScrollTrigger'],
  technologyGroups: [{ title: 'Website platform', items: ['WordPress', 'Elementor', 'Astra Child Theme'] }, { title: 'Custom implementation', items: ['PHP', 'GSAP', 'ScrollTrigger'] }],
  features: [
    { title: 'Custom WordPress shortcodes', description: 'PHP shortcodes support custom content presentation within the WordPress site.' },
    { title: 'How We Work section', description: 'The response identifies a horizontal-scrolling section for the agency process.' },
    { title: 'Stacking cards', description: 'The response identifies animated stacking-card layouts using GSAP and ScrollTrigger.' },
  ],
  architecture: [
    { title: 'WordPress foundation', description: 'WordPress with an Astra Child Theme hosts the agency content.' },
    { title: 'Page composition', description: 'Elementor and PHP shortcodes support tailored section layouts.' },
    { title: 'Interface motion', description: 'The response identifies GSAP and ScrollTrigger for interactive section behavior.' },
  ],
  outcome: 'Tresmind delivered a responsive WordPress agency presentation with custom shortcodes and interactive section layouts described in the project response.',
};
