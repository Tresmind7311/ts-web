import { Project } from './types';

export const lifestyleProject: Project = {
  slug: 'lifestyle',
  title: 'Lifestyle',
  categories: ['Design', 'Digital Marketing'],
  order: 5,
  seo: {
    title: 'Lifestyle — Tresmind',
    description:
      'An editorial fashion and lifestyle platform blending content, commerce, and community for a modern audience.',
  },
  featuredImage: '/images/projects/lifestyle/lifestyle.jpg',
  shortDescription:
    'An editorial fashion platform blending content, commerce, and community for a modern lifestyle audience.',
  hero: {
    image: '/images/projects/lifestyle/lifestyle.jpg',
  },
  overview: {
    description:
      'Lifestyle is an editorial fashion and culture platform targeting millennial and Gen-Z audiences. The project required a seamless blend of editorial content, product discovery, and social proof — delivering a high-end magazine experience with the conversion efficiency of a modern e-commerce store. The brand identity centres on accessibility: making quality fashion feel inclusive, not exclusive.',
    client: 'Lifestyle Brand',
    timeline: '10 Weeks',
    role: 'Brand Identity, UI/UX Design, Digital Marketing Strategy',
    liveUrl: 'https://example.com/lifestyle',
  },
  challenge:
    'The client was transitioning from a purely editorial blog to a commerce-enabled platform. The challenge was preserving the authentic, editorial voice that had built their community of 25K followers, while introducing product pages, collections, and a purchase flow that felt native — not bolted on.',
  solution:
    'We kept the editorial grid as the primary visual language across both content and product pages, so switching between an article and a shop collection felt seamless. A "Summer Collection" hero module set the seasonal narrative, driving users naturally from editorial inspiration into the product funnel. Social proof metrics (25K followers, 13K saves, 18K shares) were surfaced subtly throughout to reinforce trust without disrupting the reading experience.',
  gallery: [
    '/images/projects/lifestyle/lifestyle.jpg',
    '/images/projects/lifestyle/lifestyle.jpg',
    '/images/projects/lifestyle/lifestyle.jpg',
    '/images/projects/lifestyle/lifestyle.jpg',
  ],
  results: [
    { label: 'Community Followers', value: '25K+' },
    { label: 'Content Saves', value: '13K' },
    { label: 'Social Shares', value: '18K' },
    { label: 'Commerce Revenue (Month 1)', value: '+210%' },
  ],
  technologies: ['Next.js', 'Shopify', 'Figma', 'Adobe CC', 'Meta Ads'],
};
