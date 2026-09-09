import type { ServiceData } from './types';

export const graphicDesigningService: ServiceData = {
    slug: 'graphic-designing',
    name: 'Graphic Designing',
    seo: {
        title: 'Graphic Designing Services | Tresmind',
        description:
            'Create clear, memorable and consistent visual communication with Tresmind across digital products, campaigns and brand experiences.',
    },
    hero: {
        title: 'Graphic Designing',
        description:
            'Tresmind Solutions turns ideas into clear, memorable visual communication. We create digital and brand design systems that balance creativity, consistency and practical business goals across every customer touchpoint.',
        primaryCta: {
            label: 'Start Your Project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Schedule a Consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/graphic-designing/hero-img.png',
            alt: 'Graphic design tools and visual design interface',
        },
    },
    listing: {
        shortDescription:
            'We create visual systems, digital assets and brand-led design that communicate clearly and stay consistent across every touchpoint.',
        showcaseImage: {
            src: '/images/services/graphic-designing/showcase-card.png',
            alt: 'Graphic designing service illustration',
        },
        offerImage: {
            src: '/images/services/graphic-designing/graphic-designing-offer.jpg',
            alt: 'Creative graphic design workspace',
        },
        order: 5,
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
