import type { ServiceData } from './types';
import { staffParent, staffChildList, blockchainParent, blockchainChildList } from './staff-blockchain-pages';
import { digitalMarketingParent, digitalMarketingChildList } from './digital-marketing-pages';

const decorativeImage = {
    src: '/images/services/Main/hero-background.jpg',
    alt: '',
};

export const staffAugmentationService: ServiceData = {
    slug: 'staff-augmentation',
    name: staffParent.name,
    seo: staffParent.seo,
    hero: {
        title: staffParent.hero.title,
        description: staffParent.hero.description,
        primaryCta: { label: staffParent.hero.cta, href: '/contact' },
        secondaryCta: { label: 'Contact us', href: '/contact' },
        image: decorativeImage,
    },
    listing: {
        shortDescription: 'Explore developer and design capacity for your team.',
        showcaseImage: decorativeImage,
        offerImage: decorativeImage,
        order: 7,
    },
    detail: {
        ...staffParent,
        parentName: 'Services',
        parentPath: '/services',
        related: staffChildList.map(page => ({ label: page.name, href: `/services/staff-augmentation/${page.slug}` })),
    },
};

export const blockchainDevelopmentService: ServiceData = {
    slug: 'blockchain-development',
    name: blockchainParent.name,
    seo: blockchainParent.seo,
    hero: {
        title: blockchainParent.hero.title,
        description: blockchainParent.hero.description,
        primaryCta: { label: blockchainParent.hero.cta, href: '/contact' },
        secondaryCta: { label: 'Contact us', href: '/contact' },
        image: decorativeImage,
    },
    listing: {
        shortDescription: 'Assess blockchain ideas, smart contracts and digital ownership.',
        showcaseImage: decorativeImage,
        offerImage: decorativeImage,
        order: 8,
    },
    detail: {
        ...blockchainParent,
        parentName: 'Services',
        parentPath: '/services',
        related: blockchainChildList.map(page => ({ label: page.name, href: `/services/blockchain-development/${page.slug}` })),
    },
};

export const digitalMarketingService: ServiceData = {
    slug: 'digital-marketing',
    name: digitalMarketingParent.name,
    seo: digitalMarketingParent.seo,
    hero: {
        title: digitalMarketingParent.hero.title,
        description: digitalMarketingParent.hero.description,
        primaryCta: { label: digitalMarketingParent.hero.cta, href: '/contact' },
        secondaryCta: { label: 'Contact us', href: '/contact' },
        image: decorativeImage,
    },
    listing: {
        shortDescription: 'Plan visibility across search, AI answers and social channels.',
        showcaseImage: decorativeImage,
        offerImage: decorativeImage,
        order: 9,
    },
    detail: {
        ...digitalMarketingParent,
        parentName: 'Services',
        parentPath: '/services',
        related: digitalMarketingChildList.map(page => ({ label: page.name, href: `/services/digital-marketing/${page.slug}` })),
    },
};
