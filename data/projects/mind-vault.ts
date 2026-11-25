import type { Project } from './types';

// Content sourced from Mind Vault - Case Study.docx. Visual is conceptual, not product UI.
export const mindVaultProject: Project = {
  slug: 'mind-vault',
  title: 'Mind Vault',
  categories: ['Development'],
  order: 1,
  seo: {
    title: 'Mind Vault Case Study | Tresmind Solutions',
    description: 'A connected digital resource library with a member portal, responsive PDF reader, administrator dashboard, and backend API built by Tresmind Solutions.',
  },
  featuredImage: '/images/projects/mind-vault/concept.svg',
  shortDescription: 'A connected digital resource library and reading experience for members and administrators.',
  hero: {
    image: '/images/projects/mind-vault/concept.svg',
    imageAlt: 'Concept illustration of a digital library and open book; not a Mind Vault product screenshot',
  },
  overview: {
    description: 'Mind Vault brings a digital resource catalogue and member reading experience together with tools to operate the platform. Tresmind delivered a member-facing web portal, a separate administrator dashboard, and a backend API managing users, resources, reading activity, and favorites.',
    client: 'Mind Vault',
    role: 'Member portal, administrator dashboard, backend API',
  },
  challenge: 'Members need to discover resources and read across screen sizes, while administrators need dependable content and account workflows. PDF resources also need page navigation, a page-turn experience, and saved reading progress connected through shared data and services.',
  solution: 'Tresmind connected the member portal and administrator dashboard through a shared API and MongoDB database. Amazon S3 stores resource PDFs and cover images, while the API manages catalogue metadata, accounts, favorites, orders, and reading activity.',
  gallery: [],
  results: [],
  technologies: ['Next.js', 'React', 'TypeScript', 'Material UI', 'Redux Toolkit', 'Recharts', 'NestJS', 'Node.js', 'REST API', 'JWT', 'MongoDB', 'Mongoose', 'Amazon S3', 'Mailchimp Transactional API', 'PDF.js', 'React PageFlip', 'LogRocket'],
  technologyGroups: [
    { title: 'Member portal', items: ['Next.js', 'React', 'TypeScript', 'Material UI', 'Redux Toolkit'] },
    { title: 'Admin dashboard', items: ['Next.js', 'React', 'TypeScript', 'Material UI', 'Redux Toolkit', 'Recharts'] },
    { title: 'Backend and data', items: ['NestJS', 'Node.js', 'TypeScript', 'REST API', 'JWT', 'MongoDB', 'Mongoose'] },
    { title: 'Integrations and reader', items: ['Amazon S3', 'Mailchimp Transactional API', 'PDF.js', 'React PageFlip', 'LogRocket'] },
  ],
  features: [
    { title: 'Resource discovery', description: 'Members browse and search the catalogue, filter by category and subcategory, switch between list and card layouts, and save favorites to a personal library.' },
    { title: 'Responsive PDF reading', description: 'A page-turn reader shows book-like spreads on larger screens and single pages with swipe navigation on mobile. Batch rendering and loading progress support reading; page and completion progress are saved to the member account.' },
    { title: 'Resource management', description: 'Administrators manage titles, authors, descriptions, categories, tags, covers, PDFs, download settings, and related video links. Short-lived pre-signed S3 URLs support direct PDF and image uploads.' },
    { title: 'Account onboarding', description: 'Registration, email verification, password setup and reset, and one-time-password sign-in support member access. Administrators manage roles and account status, resend invitations, and import users by CSV with processing feedback.' },
    { title: 'Reporting', description: 'Date-range reports cover new users and comparable-period growth, book orders, reading activity, recent resources, and category activity.' },
    { title: 'Operational visibility', description: 'LogRocket session and error monitoring links frontend reports with backend request logs through request identifiers and session links.' },
  ],
  architecture: [
    { title: 'Member experience', description: 'Catalogue discovery, favorites, personal library, responsive PDF reading, and progress tracking.' },
    { title: 'Administrator experience', description: 'Resource and account management, CSV onboarding, and date-filtered analytics.' },
    { title: 'Application API', description: 'NestJS services for authentication, users, books, favorites, orders, and reporting, with JWT authentication and role-based access controls.' },
    { title: 'Platform services', description: 'MongoDB stores platform records; Amazon S3 stores resource files; Mailchimp Transactional handles account email.' },
  ],
  outcome: 'Tresmind delivered a connected member portal, administrator dashboard, and backend supporting the resource lifecycle from upload and categorization through discovery, reading, and progress tracking. Members can return to their saved reading progress; administrators can manage content and accounts and review activity over a selected period.',
};
