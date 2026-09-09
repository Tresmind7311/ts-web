import type { ServiceData } from './types';

export const cloudConsultingService: ServiceData = {
    slug: 'cloud-consulting',
    name: 'Cloud Consulting',
    seo: {
        title: 'Cloud Consulting Services | Tresmind',
        description:
            'Plan, modernize and optimize cloud infrastructure with Tresmind through practical architecture, migration and scalability guidance.',
    },
    hero: {
        title: 'Cloud Consulting',
        description:
            'Tresmind Solutions helps teams design and evolve cloud infrastructure with performance, reliability and scale in mind. We support architecture planning, modernization and integration around your real operational requirements.',
        primaryCta: {
            label: 'Start Your Project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Schedule a Consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/cloud-consulting/hero-img.png',
            alt: 'Cloud infrastructure and connected server systems',
        },
    },
    listing: {
        shortDescription:
            'We help businesses plan, modernize and optimize cloud infrastructure for stronger reliability, scalability and operational efficiency.',
        showcaseImage: {
            src: '/images/services/cloud-consulting/showcase-card.png',
            alt: 'Cloud consulting service illustration',
        },
        offerImage: {
            src: '/images/services/cloud-consulting/offer-card.png',
            alt: 'Cloud infrastructure and consulting',
        },
        order: 6,
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
