import type { Project } from './types';

// Source: Project 11 response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf; clinical, pricing and workflow approval pending.
export const breakawayFunctionalMedicineProject: Project = {
  slug: 'breakaway-functional-medicine', title: 'Breakaway Functional Medicine', categories: ['Development'], order: 14,
  seo: { title: 'Breakaway Functional Medicine Case Study | Tresmind Solutions', description: 'WordPress healthcare marketing site presenting services, membership information, and contact paths.' },
  featuredImage: '/images/projects/breakaway-functional-medicine/hero.jpg',
  shortDescription: 'A WordPress site organizing healthcare services and membership information.',
  hero: { image: '/images/projects/breakaway-functional-medicine/hero.jpg', imageAlt: 'Breakaway Functional Medicine website displayed on a laptop mockup' },
  overview: { description: 'Tresmind’s response describes a WordPress-based website for a direct primary care practice. The work organized service and membership information alongside ways for visitors to contact the practice.', client: 'Breakaway Functional Medicine', role: 'WordPress healthcare website design and development', liveUrl: 'https://bfmedicine.com/' },
  challenge: 'The practice needed a website structure that could explain its service and membership model and make contact options easy to find.',
  solution: 'Tresmind designed and developed WordPress pages with PHP and MySQL, presenting service outlines, membership information, FAQs, and contact or consultation paths. The response identifies Yoast SEO; scheduling behavior and medical copy require separate verification.',
  gallery: ['/images/projects/breakaway-functional-medicine/gallery-01.jpg', '/images/projects/breakaway-functional-medicine/gallery-02.jpg'],
  galleryDimensions: [{ width: 4500, height: 3000 }, { width: 4500, height: 3000 }],
  galleryAlts: ['Breakaway Functional Medicine website layouts displayed on overlapping laptop mockups', 'Breakaway Functional Medicine provider page displayed on a laptop mockup'],
  results: [],
  technologies: ['WordPress', 'PHP', 'MySQL', 'Yoast SEO'],
  technologyGroups: [{ title: 'Website platform', items: ['WordPress', 'PHP', 'MySQL'] }, { title: 'Site configuration', items: ['Yoast SEO'] }],
  features: [
    { title: 'Service presentation', description: 'WordPress pages organize practice service information.' },
    { title: 'Membership information', description: 'The site structure presents membership details and FAQs; pricing and medical statements need client approval.' },
    { title: 'Contact paths', description: 'The response describes call, text, and consultation paths; functional scheduling has not been verified.' },
  ],
  architecture: [
    { title: 'WordPress pages', description: 'WordPress structures the practice’s marketing and service content.' },
    { title: 'Backend foundation', description: 'PHP and MySQL are identified in the project response.' },
    { title: 'Site configuration', description: 'The response identifies Yoast SEO configuration.' },
  ],
  outcome: 'Tresmind delivered a WordPress website organizing service, membership, and contact information for the practice. The source does not establish clinical outcomes or functioning booking integrations.',
};
