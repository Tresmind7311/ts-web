import type { ServiceData } from './types';

export const webDevelopmentService: ServiceData = {
    slug: 'web-development',
    name: 'Web Development',
    seo: {
        title: 'Web Development Services | Tresmind',
        description:
            'Create fast, responsive and scalable web experiences with Tresmind using modern frontend, backend and CMS technologies.',
    },
    hero: {
        title: 'Web Development',
        description:
            'Tresmind Solutions creates modern web experiences that combine performance, usability and strong engineering. From marketing websites to complex web platforms, we build responsive products designed to perform across devices.',
        primaryCta: {
            label: 'Start Your Project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Schedule a Consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/web-development/hero-img.png',
            alt: 'Modern web development interface across digital devices',
        },
    },
    listing: {
        shortDescription:
            'We build responsive, high-performance websites and web applications with modern technology, thoughtful UX and scalable foundations.',
        showcaseImage: {
            src: '/images/services/web-development/showcase-card.png',
            alt: 'Web development service illustration',
        },
        offerImage: {
            src: '/images/services/web-development/web-development-offer.jpg',
            alt: 'Web design and development workspace',
        },
        order: 4,
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
