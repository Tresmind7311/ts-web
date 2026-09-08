import type { ServiceData } from './types';

export const softwareDevelopmentService: ServiceData = {
    slug: 'software-development',
    name: 'Software Development',
    seo: {
        title: 'Software Development Services | Tresmind',
        description:
            'Build secure, scalable and maintainable software solutions with Tresmind, from product architecture and development through integration and long-term evolution.',
    },
    hero: {
        title: 'Software Development',
        description:
            'Tresmind Solutions builds reliable software products around real business workflows. We combine thoughtful architecture, modern engineering and practical product thinking to create systems that scale with your organization.',
        primaryCta: {
            label: 'Start Your Project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Schedule a Consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/software-development/hero-img.png',
            alt: 'Software development interface and engineering systems',
        },
    },
    listing: {
        shortDescription:
            'We create dependable software products and business systems with scalable architecture, clean integrations and maintainable engineering.',
        showcaseImage: {
            src: '/images/services/software-development/showcase-card.png',
            alt: 'Software development service illustration',
        },
        offerImage: {
            src: '/images/services/software-development/showcase-card.png',
            alt: 'Software engineering and development',
        },
        order: 3,
    },
};
