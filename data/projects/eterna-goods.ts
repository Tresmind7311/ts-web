import type { Project } from './types';

// Content sourced from ETERNA_GOODS_CASE_STUDY.docx. Visual is conceptual, not product UI.
export const eternaGoodsProject: Project = {
  slug: 'eterna-goods',
  title: 'Eterna Goods Custom Calendar',
  categories: ['Development'],
  order: 3,
  seo: {
    title: 'Eterna Goods Custom Calendar Case Study | Tresmind Solutions',
    description: 'A personalized 365-day photo calendar builder connecting customer creation, Shopify checkout, print-file processing, and fulfillment.',
  },
  featuredImage: '/images/projects/eterna-goods/concept.svg',
  shortDescription: 'A personalized photo calendar experience connected to Shopify checkout and print fulfillment.',
  hero: {
    image: '/images/projects/eterna-goods/concept.svg',
    imageAlt: 'Concept illustration of a photo calendar and print workflow; not an Eterna Goods product screenshot',
  },
  overview: {
    description: 'Eterna Goods customers create a personalized 365-day photo calendar through a guided builder, then preview it before Shopify checkout. An operations portal and asynchronous processing pipeline prepare print files and pass order information to fulfillment.',
    client: 'Eterna Goods',
    role: 'Customer calendar builder, admin portal, backend and print-processing workflow',
  },
  challenge: 'A personalized calendar can contain hundreds of family photos, each with its own placement and crop. Customers need a clear way to create and review the calendar, while the platform must securely handle large photo collections, produce print-ready output, and connect each finished design to the correct Shopify order and fulfillment files.',
  solution: 'Tresmind Solutions delivered a connected customer, admin, and backend system. The Shopify storefront provides the entry point and checkout. The customer app manages calendar creation and preview, while backend services coordinate user data, images, background jobs, order processing, and fulfillment.',
  gallery: [],
  results: [],
  technologies: ['Next.js', 'React', 'TypeScript', 'Material UI', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', 'Redis', 'Bull', 'Socket.IO', 'Shopify', 'AWS S3', 'Amazon SQS', 'AWS Lambda', 'AWS Amplify', 'Amazon EC2', 'Sharp', 'Puppeteer Core', 'Chromium', 'pdf-lib', 'Google Photos Picker'],
  technologyGroups: [
    { title: 'Customer and admin apps', items: ['Next.js', 'React', 'TypeScript', 'Material UI', 'Redux Toolkit', 'Socket.IO', 'Google Photos Picker'] },
    { title: 'Backend and data', items: ['Node.js', 'Express', 'MongoDB Atlas', 'Mongoose', 'Redis', 'Bull'] },
    { title: 'Commerce and cloud', items: ['Shopify', 'AWS S3', 'Amazon SQS', 'AWS Lambda', 'AWS Amplify', 'Amazon EC2'] },
    { title: 'Image and document processing', items: ['Sharp', 'Puppeteer Core', 'Chromium', 'pdf-lib'] },
  ],
  features: [
    { title: 'Guided calendar creation', description: 'Customers choose a start date and layout, add device photos or Google Photos, place images on individual dates, reorder or shuffle assignments, use autofill, and crop each date independently.' },
    { title: 'Private web and print images', description: 'Originals upload to private S3 through short-lived backend-issued links. Lambda creates separate web and print versions plus a CMYK-oriented production version; authorized short-lived links serve private images.' },
    { title: 'Focused previews', description: 'Bounded browser-memory caches reuse calendar reads and crop previews. The flip-through preview prepares the active page’s print image as needed.' },
    { title: 'Background jobs with progress', description: 'Redis-backed Bull queues handle autofill, shuffle, and order tasks. Workers publish progress through Redis Pub/Sub, and Socket.IO sends authorized updates to the customer session.' },
    { title: 'Shopify to print fulfillment', description: 'Shopify order events start an SQS-backed PDF job. Lambda creates the print-ready PDF in S3; the backend generates an order CSV and transfers both files to fulfillment over SFTP.' },
    { title: 'Admin operations', description: 'Staff monitor orders and processing stages, manage reusable cover and photo galleries, view dashboard reports, and retry eligible failed or stuck processing stages.' },
  ],
  architecture: [
    { title: 'Customer experience', description: 'Shopify storefront leads into the Next.js calendar builder for photo placement, per-date crops, and preview before checkout.' },
    { title: 'Backend and media', description: 'Node.js services and MongoDB Atlas coordinate calendar data. Private S3 stores photos; Lambda creates web, print, and CMYK-oriented image versions.' },
    { title: 'Background processing', description: 'Redis and Bull run calendar tasks with Socket.IO progress. Shopify order events trigger SQS and Lambda print-ready PDF generation.' },
    { title: 'Fulfillment and operations', description: 'The backend creates an order CSV and sends it with the PDF by SFTP. Admin tools track stages, galleries, and retry controls.' },
  ],
  outcome: 'Eterna Goods has an end-to-end digital workflow for creating personalized photo calendars: customers design and preview calendars in the browser, Shopify handles checkout, AWS services process and store the print files, and the backend delivers order files to fulfillment. The admin portal provides visibility into galleries, orders, processing stages, and retries.',
};
