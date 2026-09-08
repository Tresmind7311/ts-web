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
};
