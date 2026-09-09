import { Project } from './types';

export const futureConstructionProject: Project = {
  slug: 'future-construction',
  title: 'Future Construction',
  categories: ['Design', 'Development'],
  order: 2,
  seo: {
    title: 'Future Construction — Tresmind',
    description:
      'A cinematic, futuristic website for a next-generation construction company showcasing AI-driven building solutions.',
  },
  featuredImage: '/images/projects/future-construction-featured.jpg',
  shortDescription:
    'A cinematic dark-theme website for a next-generation construction company pushing the boundaries of AI-driven building.',
  hero: {
    image: '/images/projects/future-construction-featured.jpg',
  },
  overview: {
    description:
      'Future Construction 20-45 is a forward-looking construction firm positioning itself at the intersection of architecture and artificial intelligence. Their website needed to communicate ambition, precision, and technological dominance — earning the trust of enterprise clients while conveying a bold vision of where construction is headed.',
    client: 'FutureConstruct Ltd.',
    timeline: '10 Weeks',
    role: 'UI/UX Design, Front-end Development, Motion Design',
    liveUrl: 'https://example.com/future-construction',
  },
  challenge:
    'Construction is a traditionally conservative industry. The client needed a site that broke that mold entirely — one that immediately communicated cutting-edge capability without feeling gimmicky or alienating to large B2B clients. The cinematic dark aesthetic had to feel earned, not decorative.',
  solution:
    'We built the site around a core narrative arc: humanity meets machine. Hero visuals feature high-fidelity 3D renders of robotic construction assistants alongside real project photography. A minimal but bold typography system keeps the interface disciplined, while carefully timed entrance animations give each section weight and presence.',
  gallery: [
    '/images/projects/future-construction-featured.jpg',
    '/images/projects/future-construction-featured.jpg',
    '/images/projects/future-construction-featured.jpg',
    '/images/projects/future-construction-featured.jpg',
  ],
  results: [
    { label: 'Enterprise Inquiries (Month 1)', value: '+120%' },
    { label: 'Avg. Time on Site', value: '3m 42s' },
    { label: 'Lead Conversion Rate', value: '8.4%' },
    { label: 'Awards', value: '2' },
  ],
  technologies: ['Figma', 'Next.js', 'TypeScript', 'MUI', 'GSAP'],
};
