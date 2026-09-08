import type { ServiceData } from './types';

export const mobileAppDevelopmentService: ServiceData = {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    seo: {
        title: 'Mobile App Development Services | Tresmind',
        description:
            'Build fast, intuitive and scalable mobile applications with Tresmind. We create user-focused mobile experiences backed by thoughtful design and reliable engineering.',
    },
    hero: {
        title: 'Mobile App Development',
        description:
            'Tresmind Solutions creates powerful mobile experiences through strategy, product design and dependable engineering. We build intuitive applications designed around real users, business goals and long-term scalability.',
        primaryCta: {
            label: 'Start Your Project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Schedule a Consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/mobile-app-development/hero-img.png',
            alt: 'Mobile application development interface displayed across connected devices',
        },
    },
    listing: {
        shortDescription:
            'We design and develop intuitive mobile products that combine thoughtful user experience with reliable, scalable engineering.',
        showcaseImage: {
            src: '/images/services/mobile-app-development/showcase-card.png',
            alt: 'Mobile app development service illustration',
        },
        offerImage: {
            src: '/images/services/web-development/mobile-app-dev-offer.jpg',
            alt: 'Mobile application technology and development',
        },
        order: 1,
    },
};
