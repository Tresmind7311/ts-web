import { Project } from './types';

export const greenHouseGardeningProject: Project = {
  slug: 'green-house-gardening',
  title: 'Green House Gardening',
  categories: ['Design'],
  order: 1,
  seo: {
    title: 'Green House Gardening — Tresmind',
    description:
      'A vibrant illustrated web experience for a gardening platform — helping users plan, grow, and manage their home gardens.',
  },
  featuredImage: '/images/projects/green-house-gardening/green-house-gardening-featured.jpg',
  shortDescription:
    'A vibrant illustrated platform that helps users plan and manage their home gardens with ease.',
  hero: {
    image: '/images/projects/green-house-gardening/green-house-gardening-featured.jpg',
  },
  overview: {
    description:
      'Green House Gardening is a consumer web platform built around the joy of home gardening. The project called for a warm, illustrated visual language that appeals to hobbyist gardeners of all ages — paired with a clean, intuitive information architecture so users can explore plant care guides, seasonal schedules, and community tips without friction.',
    client: 'GreenHouse Co.',
    timeline: '8 Weeks',
    role: 'UI/UX Design, Illustration Direction, Front-end Development',
    liveUrl: 'https://example.com/green-house-gardening',
  },
  challenge:
    'The client needed a digital home for their gardening brand that felt approachable and playful — distinct from the sterile, text-heavy gardening sites that dominated the space. The challenge was to build a visual identity flexible enough to carry an illustrated style across product pages, tutorials, and a seasonal blog without feeling inconsistent.',
  solution:
    'We developed a custom illustration system built on a consistent character and scene vocabulary, ensuring visual harmony across every page. A modular component library allowed the team to assemble new content pages quickly while maintaining the illustrated aesthetic. Animation was kept subtle — enough to bring the illustrations to life without distracting from the content.',
  gallery: [
    '/images/projects/green-house-gardening/green-house-gardening-featured.jpg',
    '/images/projects/green-house-gardening/green-house-gardening-featured.jpg',
    '/images/projects/green-house-gardening/green-house-gardening-featured.jpg',
    '/images/projects/green-house-gardening/green-house-gardening-featured.jpg',
  ],
  results: [
    { label: 'Increase in User Engagement', value: '+64%' },
    { label: 'Bounce Rate Reduction', value: '−38%' },
    { label: 'Pages per Session', value: '4.2' },
    { label: 'Client Satisfaction', value: '5 / 5' },
  ],
  technologies: ['Figma', 'Adobe Illustrator', 'React', 'Next.js', 'MUI'],
};
