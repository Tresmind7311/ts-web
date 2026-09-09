import type { ServiceData } from './types';

export const aiDevelopmentService: ServiceData = {
    slug: 'ai-development',
    name: 'AI Development',
    seo: {
        title: 'AI Development Services | Tresmind',
        description:
            'Build intelligent, scalable AI solutions with Tresmind. We design and develop practical AI products, automation systems and custom intelligent experiences aligned with real business goals.',
    },
    hero: {
        title: 'AI Development',
        description:
            'Tresmind Solutions builds practical AI products that turn complex ideas into intelligent digital experiences. From custom AI workflows and automation to advanced product integrations, we create scalable solutions designed around real business needs.',
        primaryCta: {
            label: 'Start Your AI Project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Schedule a Consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/ai-development/hero-img.png',
            alt: 'Artificial intelligence development interface representing intelligent digital products and automation',
        },
    },
    listing: {
        shortDescription:
            'We build practical AI products, intelligent workflows and automation systems designed to solve real operational and product challenges.',
        showcaseImage: {
            src: '/images/services/ai-development/showcase-card.png',
            alt: 'Artificial intelligence development service illustration',
        },
        offerImage: {
            src: '/images/services/ai-development/hero-img.png',
            alt: 'Artificial intelligence technology and automation',
        },
        order: 2,
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
