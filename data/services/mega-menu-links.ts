import { megaMenuServices } from './mega-menu-services';

const additionalCategories = [
    { title: 'App Development', description: 'Mobile products for every platform.', href: '/services/ios-app-development' },
    { title: 'Business Solutions', description: 'Connect teams, data and workflows.', href: '/services/erp-solutions' },
    { title: 'Web Development', description: 'Modern stores and web applications.', href: '/services/ecommerce-website-development' },
    { title: 'AI Development', description: 'Useful intelligence for real workflows.', href: '/services/generative-ai' },
    { title: 'Cloud Solutions', description: 'Reliable, scalable cloud foundations.', href: '/services/cloud-application-development' },
    { title: 'Staff Augmentation', description: 'Extend your team with the right skills.', href: '/services/staff-augmentation' },
    { title: 'Blockchain & Emerging Tech', description: 'Explore new digital possibilities.', href: '/services/blockchain-development' },
    { title: 'Digital Marketing', description: 'Build reach and lasting visibility.', href: '/services/digital-marketing' },
].map((category) => ({
    ...category,
    services: megaMenuServices
        .filter((service) => service.hero.eyebrow === category.title)
        .map((service) => ({ slug: service.slug, name: service.name })),
}));

const coreServices = {
    title: 'Core Services',
    description: 'Our established end-to-end capabilities.',
    href: '/services',
    services: [
        { slug: 'mobile-app-development', name: 'Mobile App Development' },
        { slug: 'ai-development', name: 'AI Development' },
        { slug: 'software-development', name: 'Software Development' },
        { slug: 'web-development', name: 'Web Development' },
        { slug: 'graphic-designing', name: 'Graphic Design' },
        { slug: 'cloud-consulting', name: 'Cloud Consulting' },
    ],
};

export const serviceMenuCategories = [...additionalCategories, coreServices];
