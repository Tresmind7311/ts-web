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
};
