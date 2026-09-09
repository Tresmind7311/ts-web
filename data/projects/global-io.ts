import { Project } from './types';

export const globalIoProject: Project = {
  slug: 'global-io',
  title: 'Global.io',
  categories: ['Development'],
  order: 3,
  seo: {
    title: 'Global.io — Tresmind',
    description:
      'A real-time logistics and fleet analytics SaaS dashboard for global operations teams.',
  },
  featuredImage: '/images/projects/global-io/global-io.jpg',
  shortDescription:
    'A real-time logistics and fleet analytics SaaS dashboard empowering global operations teams with live intelligence.',
  hero: {
    image: '/images/projects/global-io/global-io.jpg',
  },
  overview: {
    description:
      'Global.io is a SaaS platform serving logistics managers who need instant visibility across distributed fleets and supply chains. The dashboard consolidates live GPS tracking, capacity metrics, route efficiency scores, and team communication into a single, information-dense interface — without overwhelming the user.',
    client: 'Global.io',
    timeline: '14 Weeks',
    role: 'Full-Stack Development, UX Design, Data Visualisation',
    liveUrl: 'https://example.com/global-io',
  },
  challenge:
    'Logistics dashboards are notoriously bloated. The Global.io team had outgrown their legacy tool and needed a complete rebuild that preserved all existing data relationships while delivering a dramatically faster, cleaner user experience — with zero downtime migration for their enterprise clients.',
  solution:
    'We redesigned the information hierarchy from first principles, prioritising the five most critical decision points for a logistics manager: fleet status, route deviations, capacity alerts, delivery ETAs, and team flags. A component-driven architecture allowed us to progressively migrate the legacy data layer behind the new UI, keeping the platform live throughout the build.',
  gallery: [
    '/images/projects/global-io/global-io.jpg',
    '/images/projects/global-io/global-io.jpg',
    '/images/projects/global-io/global-io.jpg',
    '/images/projects/global-io/global-io.jpg',
  ],
  results: [
    { label: 'Dashboard Load Time', value: '< 1.2s' },
    { label: 'Operator Efficiency Gain', value: '+47%' },
    { label: 'Support Tickets Reduced', value: '−61%' },
    { label: 'Active Enterprise Clients', value: '30+' },
  ],
  technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSocket', 'Chart.js', 'Docker'],
};
