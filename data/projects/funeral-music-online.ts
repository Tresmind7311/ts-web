import type { Project } from './types';

// Content sourced from funeral-music-online-case-study.docx. Visual is conceptual, not product UI.
export const funeralMusicOnlineProject: Project = {
  slug: 'funeral-music-online',
  title: 'Funeral Music Online',
  categories: ['Development'],
  order: 2,
  seo: {
    title: 'Funeral Music Online Case Study | Tresmind Solutions',
    description: 'A custom web platform connecting funeral tribute planning, media preparation, online payment, AV operator access, and service-day playback.',
  },
  featuredImage: '/images/projects/funeral-music-online/concept.svg',
  shortDescription: 'A connected digital experience for planning and presenting personal funeral tributes.',
  hero: {
    image: '/images/projects/funeral-music-online/concept.svg',
    imageAlt: 'Concept illustration of tribute media and service-day playback; not a Funeral Music Online product screenshot',
  },
  overview: {
    description: 'Funeral Music Online brings service planning, tribute media preparation, payment, AV-team access and service-day playback together in one web platform. The responsive experience serves families, administrators and AV operators.',
    client: 'Funeral Music Online',
    role: 'Custom web application design and development',
    liveUrl: 'https://funeralmusiconline.com/',
  },
  challenge: 'Preparing a tribute involves selecting a service package, sharing family and service details, choosing music and photos, arranging presentation media, completing payment and coordinating playback at the venue. The experience needed to carry those steps from online planning through to the AV operator’s service-day controls.',
  solution: 'Tresmind Solutions built a custom web platform connecting the customer order journey with media preparation and playback. Families can select a package, submit information and media, and pay online. Automated slideshow rendering prepares presentation media, while authorized AV operators access order media through a dedicated player.',
  gallery: [],
  results: [],
  technologies: ['Next.js', 'React', 'TypeScript', 'MySQL', 'Prisma ORM', 'AWS Amplify', 'Amazon S3', 'Amazon SQS', 'AWS Lambda', 'Amazon CloudFront', 'Amazon SES', 'FFmpeg', 'Stripe', 'QuickBooks Online'],
  technologyGroups: [
    { title: 'Application', items: ['Next.js', 'React', 'TypeScript'] },
    { title: 'Data', items: ['MySQL', 'Prisma ORM'] },
    { title: 'AWS services', items: ['AWS Amplify', 'Amazon S3', 'Amazon SQS', 'AWS Lambda', 'Amazon CloudFront', 'Amazon SES'] },
    { title: 'Media, payments and accounting', items: ['FFmpeg', 'Stripe', 'QuickBooks Online'] },
  ],
  features: [
    { title: 'Guided service and order setup', description: 'Customers choose a service package, provide service and memorial details, and submit tribute materials through a guided online flow. Administrators configure packages, forms and add-ons.' },
    { title: 'Photo slideshow creation', description: 'Families upload photographs and audio. A background workflow renders a Full HD 1920 × 1080 video with audio processing and job-progress handling.' },
    { title: 'Service-day media player', description: 'The custom player supports audio, video and slideshow playback, background music controls, fades, volume adjustment and AV synchronization controls for supported video workflows.' },
    { title: 'AV operator access', description: 'Administrators invite a music director or AV operator by email. The invited operator signs in to access media for the relevant service order.' },
    { title: 'Administration and media management', description: 'Staff manage service packages, registration forms, orders, and music or video library content through administration tools.' },
    { title: 'Payments and connected operations', description: 'Stripe processes online payments. Payment events feed order, receipt and invoice handling, with QuickBooks Online synchronization available for sales records.' },
  ],
  architecture: [
    { title: 'Customer journey', description: 'Families configure a service, provide details and tribute media, and complete online payment.' },
    { title: 'Media workflow', description: 'Photo and audio uploads enter a background slideshow-rendering workflow that uses FFmpeg to prepare Full HD video.' },
    { title: 'Administration', description: 'Staff manage packages, forms, orders and music or video library content.' },
    { title: 'Service-day playback', description: 'Invited AV operators access order media through a dedicated audio, video and slideshow player.' },
  ],
  outcome: 'The delivered platform provides an end-to-end workflow for preparing a funeral tribute: customers configure a service and submit details, music and photos; payment connects to order processing; slideshow creation runs as a background media job; and invited AV operators access order media in a dedicated playback experience. Administrators manage service offerings, forms and media-library content through the same platform.',
};
