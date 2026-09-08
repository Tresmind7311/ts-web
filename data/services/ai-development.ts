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
};
