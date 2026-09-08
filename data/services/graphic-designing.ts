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
            src: '/images/services/graphic-designing/offer-card.png',
            alt: 'Creative graphic design workspace',
        },
        order: 5,
    },
};
