import type { Project } from './types';

// Source: Monoblend response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf.
// Internal response has pending evidence and approval; image is conceptual, not client work.
export const monoblendCoffeeRoasterProject: Project = {
  slug: 'monoblend-coffee-roaster',
  title: 'Monoblend Coffee Roaster',
  categories: ['Development'],
  order: 4,
  seo: {
    title: 'Monoblend Coffee Roaster Case Study | Tresmind Solutions',
    description: 'Shopify theme customization and brand-focused storefront layouts for Monoblend Coffee Roaster.',
  },
  featuredImage: '/images/projects/monoblend-coffee-roaster/concept.svg',
  shortDescription: 'A customized Shopify storefront presentation for a specialty coffee brand.',
  hero: {
    image: '/images/projects/monoblend-coffee-roaster/concept.svg',
    imageAlt: 'Concept illustration of coffee packaging and a storefront layout; not Monoblend client work or a product screenshot',
  },
  overview: {
    description: 'Monoblend Coffee Roaster sought an e-commerce presentation with a distinct visual identity for specialty coffee. Tresmind customized a Shopify theme, developing brand-focused storefront sections and layouts with responsive presentation across desktop, tablet, and mobile.',
    client: 'Monoblend Coffee Roaster',
    role: 'Shopify theme customization and storefront frontend',
    liveUrl: 'https://monoblend.coffee/',
  },
  challenge: 'The client wanted a modern, interactive e-commerce experience that would give its coffee roasting brand a distinctive presentation. The response sheet identifies custom Shopify Liquid development, tailored visual layouts, and responsive behavior as project requirements.',
  solution: 'Tresmind used Shopify as the platform and customized a theme with Liquid, JavaScript, HTML, and CSS. The team developed custom storefront sections and layouts tailored to the brand, adjusted frontend components and styling, and worked on desktop, tablet, and mobile presentation.',
  gallery: [],
  results: [],
  technologies: ['Shopify', 'Liquid', 'JavaScript', 'HTML', 'CSS'],
  technologyGroups: [
    { title: 'Commerce platform', items: ['Shopify'] },
    { title: 'Theme customization', items: ['Liquid', 'JavaScript', 'HTML', 'CSS'] },
  ],
  features: [
    { title: 'Custom storefront sections', description: 'Shopify theme sections and layouts were tailored to the coffee roasting brand’s visual identity.' },
    { title: 'Frontend styling', description: 'Tresmind customized theme components and styling using Liquid, JavaScript, HTML, and CSS.' },
    { title: 'Responsive presentation', description: 'Storefront layouts were adapted for desktop, tablet, and mobile screens.' },
  ],
  architecture: [
    { title: 'Shopify storefront', description: 'Shopify provides the e-commerce platform for specialty coffee products.' },
    { title: 'Theme layer', description: 'Liquid theme customization and custom sections define brand-focused storefront layouts.' },
    { title: 'Frontend presentation', description: 'JavaScript, HTML, and CSS support customized components and responsive layouts.' },
  ],
  outcome: 'Tresmind delivered Shopify theme customization, custom brand-focused storefront sections and layouts, and responsive frontend presentation for Monoblend Coffee Roaster.',
};
