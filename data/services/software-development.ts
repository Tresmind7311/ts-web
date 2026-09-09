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
    capabilities: {
        eyebrow: 'Our Expertise',
        title: 'What We Build',
        description:
            'From native mobile applications to connected digital ecosystems, we build scalable experiences around real users and business goals.',
        initialVisibleCount: 4,
        items: [
            {
                id: 'native-android-development',
                title: 'Native Android Development',
                description:
                    'High-performance Android applications built around intuitive experiences, maintainable architecture and long-term scalability.',
                image: {
                    src: '/footer-bg.jpg',
                    alt: 'Native Android development',
                },
            },
            {
                id: 'cross-platform-applications',
                title: 'Cross-Platform Applications',
                description:
                    'Consistent mobile experiences designed to work efficiently across multiple platforms while maintaining strong performance and usability.',
                image: {
                    src: '/footer-bg.jpg',
                    alt: 'Cross-platform mobile application development',
                },
            },
            {
                id: 'api-backend-integration',
                title: 'API & Backend Integration',
                description:
                    'Reliable mobile applications connected with APIs, backend systems, databases and third-party services.',
                image: {
                    src: '/footer-bg.jpg',
                    alt: 'API and backend integration',
                },
            },
            {
                id: 'ui-ux-driven-development',
                title: 'UI/UX-Driven Development',
                description:
                    'User-focused mobile experiences where interface design, usability and engineering work together from the beginning.',
                image: {
                    src: '/footer-bg.jpg',
                    alt: 'Mobile application UI and UX development',
                },
            },
        ],
    },
};
