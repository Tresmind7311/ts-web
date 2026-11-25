import type { Project } from './types';

// Source: Project 02 response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf; final evidence/sign-off pending.
export const aumeOrganicsProject: Project = {
  slug: 'aume-organics', title: 'Aumé Organics', categories: ['Development'], order: 5,
  seo: { title: 'Aumé Organics Case Study | Tresmind Solutions', description: 'Shopify organic-food storefront with product presentation, brand storytelling, and commerce flow.' },
  featuredImage: '/images/projects/aume-organics/concept.svg',
  shortDescription: 'A Shopify storefront presenting organic food products and their brand story.',
  hero: { image: '/images/projects/aume-organics/concept.svg', imageAlt: 'Concept illustration of organic food packaging and storefront cards; not Aumé Organics client work' },
  overview: { description: 'Tresmind worked on a Shopify storefront for Aumé Organics, organizing its organic-food catalogue and brand-focused product presentation. The project response identifies Shopify Dawn as the theme foundation, with Liquid, HTML, CSS, and JavaScript customization.', client: 'Aumé Organics', role: 'Shopify storefront and theme customization', liveUrl: 'https://aumeorganics.com/' },
  challenge: 'The client needed a storefront for US customers that presented organic foods through product information and a clear brand narrative while supporting a straightforward shopping flow.',
  solution: 'Tresmind built out the Shopify storefront, styled the theme with Liquid, HTML, CSS, and JavaScript, and organized the core product catalogue for Himalayan Clear Honey and A2 Bilona Ghee.',
  gallery: [], results: [],
  technologies: ['Shopify', 'Dawn', 'Liquid', 'HTML', 'CSS', 'JavaScript'],
  technologyGroups: [{ title: 'Commerce platform', items: ['Shopify', 'Dawn'] }, { title: 'Theme frontend', items: ['Liquid', 'HTML', 'CSS', 'JavaScript'] }],
  features: [
    { title: 'Product catalogue', description: 'Structured catalogue presentation for Himalayan Clear Honey and A2 Bilona Ghee.' },
    { title: 'Brand storytelling', description: 'Product sections present the brand’s purity and heritage narrative.' },
    { title: 'Shopping flow', description: 'Responsive product presentation connects to Shopify cart and checkout.' },
  ],
  architecture: [
    { title: 'Shopify storefront', description: 'Shopify provides the product catalogue, cart, and checkout.' },
    { title: 'Theme presentation', description: 'Dawn-based Liquid customization supports product and brand sections.' },
    { title: 'Frontend styling', description: 'HTML, CSS, and JavaScript shape responsive layouts and presentation.' },
  ],
  outcome: 'Tresmind delivered a Shopify storefront with a structured organic-food catalogue, brand-focused product sections, and a responsive shopping path.',
};
