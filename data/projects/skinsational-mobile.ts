import type { Project } from './types';

// Source: Project 05 response sheet in Tresmind_Case_Study_Content_Requirements.docx.pdf; commerce/CPT scope pending verification.
export const skinsationalMobileProject: Project = {
  slug: 'skinsational-mobile', title: 'Skinsational Mobile', categories: ['Development'], order: 8,
  seo: { title: 'Skinsational Mobile Case Study | Tresmind Solutions', description: 'WordPress skincare storefront redesign with WooCommerce product presentation and purchasing flow.' },
  featuredImage: '/images/projects/skinsational-mobile/hero.jpg',
  shortDescription: 'A refreshed skincare storefront and product purchasing experience.',
  hero: { image: '/images/projects/skinsational-mobile/hero.jpg', imageAlt: 'Skinsational Mobile treatments page displayed on a laptop mockup' },
  overview: { description: 'Tresmind’s project response describes a redesign of the Skinsational Mobile skincare site, with refreshed core layouts, WooCommerce product presentation, and structured WordPress content management.', client: 'Skinsational Mobile', role: 'WordPress redesign and WooCommerce storefront work', liveUrl: 'https://skinsationalmobile.com/' },
  challenge: 'The skincare site needed updated presentation and a product purchasing path alongside manageable content layouts for its team.',
  solution: 'Tresmind redesigned core WordPress layouts, used Elementor and WordPress templates for content presentation, and integrated WooCommerce for product display, catalogue management, and purchasing.',
  gallery: ['/images/projects/skinsational-mobile/gallery-01.jpg', '/images/projects/skinsational-mobile/gallery-02.jpg'],
  galleryDimensions: [{ width: 4500, height: 4000 }, { width: 4608, height: 3456 }],
  galleryAlts: ['Skinsational Mobile homepage displayed with an extended page layout mockup', 'Skinsational Mobile treatment images displayed on a laptop mockup'],
  results: [],
  technologies: ['WordPress', 'WooCommerce', 'Elementor'],
  technologyGroups: [{ title: 'Content and design', items: ['WordPress', 'Elementor'] }, { title: 'Commerce', items: ['WooCommerce'] }],
  features: [
    { title: 'Storefront redesign', description: 'Core site layouts and interface styling were refreshed for the skincare brand.' },
    { title: 'Product catalogue', description: 'WooCommerce supports skincare product display and catalogue administration.' },
    { title: 'Purchasing flow', description: 'The response describes a core WooCommerce purchasing path for skincare products.' },
    { title: 'Structured content', description: 'WordPress custom post types and dynamic templates support dashboard-managed content; the response does not specify exact post types.' },
  ],
  architecture: [
    { title: 'WordPress content', description: 'WordPress hosts site content and dashboard workflows.' },
    { title: 'Dynamic presentation', description: 'Elementor and WordPress templates render managed content.' },
    { title: 'Product commerce', description: 'WooCommerce handles the product catalogue and purchasing flow described in the response.' },
  ],
  outcome: 'Tresmind delivered redesigned WordPress layouts, a skincare product catalogue, and a WooCommerce purchasing path described in the project response.',
};
