
import type { ServiceData } from './types';

export const webDevelopmentService: ServiceData = {
    slug: 'web-development',
    name: 'Web Development',

    seo: {
        title: 'Web Development Services | Tresmind',
        description:
            'We design and develop websites that help businesses present their services, connect with customers, and make everyday interactions easier.',
    },

    hero: {
        title: 'Web Development',
        description:
            'We design and develop websites that help businesses present their services, connect with customers, and make everyday interactions easier.',
        primaryCta: {
            label: 'Start Your Project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Schedule a Consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/web-development/WEB-DEVELOPMENT-hero-img.png',
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


    showcase: {
        title: 'Web Experiences Built Around Your Business',
        description:
            'From company websites to online stores and custom web applications, we build clear, responsive experiences around your content, customers, and goals.',
        columns: [
            {
                images: [
                    {
                        src: '/images/services/web-development/web-dev-1.png',
                        alt: 'Web development showcase 1',
                    },
                    {
                        src: '/images/services/web-development/web-dev-2.png',
                        alt: 'Web development showcase 2',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/web-development/web-dev-3.png',
                        alt: 'Web development showcase 3',
                    },
                    {
                        src: '/images/services/web-development/web-dev-4.png',
                        alt: 'Web development showcase 4',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/web-development/web-dev-5.png',
                        alt: 'Web development showcase 5',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/web-development/web-dev-6.png',
                        alt: 'Web development showcase 6',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/web-development/web-dev-7.png',
                        alt: 'Web development showcase 7',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/web-development/web-dev-8.png',
                        alt: 'Web development showcase 8',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/web-development/web-dev-9.png',
                        alt: 'Web development showcase 9',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/web-development/web-dev-10.png',
                        alt: 'Web development showcase 10',
                    },
                    {
                        src: '/images/services/web-development/web-dev-11.png',
                        alt: 'Web development showcase 11',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/web-development/web-dev-12.png',
                        alt: 'Web development showcase 12',
                    },
                    {
                        src: '/images/services/web-development/web-dev-13.png',
                        alt: 'Web development showcase 13',
                    },
                ],
            },
        ],
    },

    capabilities: {
        eyebrow: 'Our Expertise',
        title: 'What We Build',
        initialVisibleCount: 4,
        items: [
            {
                id: 'business-websites',
                title: 'Business Websites',
                description:
                    'Professional websites that communicate what you do and help visitors find the information they need.',
                image: {
                    src: '/images/services/web-development/what-we-build/Business-Websites.png',
                    alt: 'Business Websites',
                },
            },
            {
                id: 'ecommerce-websites',
                title: 'E-commerce Websites',
                description:
                    'Online stores that make it easy for customers to explore products, add items to their cart, and complete a purchase.',
                image: {
                    src: '/images/services/web-development/what-we-build/E-commerce-Websites.png',
                    alt: 'E-commerce Websites',
                },
            },
            {
                id: 'web-applications',
                title: 'Web Applications',
                description:
                    'Interactive tools and portals that let users book services, manage information, and complete tasks online.',
                image: {
                    src: '/images/services/web-development/what-we-build/web-applications.png',
                    alt: 'Web Applications',
                },
            },
            {
                id: 'cms-websites',
                title: 'CMS Websites',
                description:
                    'Flexible websites that let your team update pages, publish content, and manage information with ease.',
                image: {
                    src: '/images/services/web-development/what-we-build/CMS-Websites.png',
                    alt: 'CMS Websites',
                },
            },
        ],
    },

    process: {
        title: 'Our Development Process',
        description:
            'We plan the structure, design the experience, and build a website that works across devices and supports your business.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'discovery-planning',
                number: '01',
                title: 'Discovery & Planning',
                description:
                    'We define your goals, audience, content needs, and the pages and features your website requires.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery.png',
                    alt: 'Software requirements discovery',
                },
            },
        ],
    },

    ecosystem: {
        title: 'More Than Just a Website',
        description:
            'A useful website connects the visitor experience with what happens behind the scenes. We bring together content, code, integrations, and hosting so visitors can find what they need and take the next step.',
        flow:
            'User Experience → Content & CMS → Frontend & Backend → Integrations & Data → Hosting & Delivery',
        closingText: '',
        image: {
            src: '/images/services/web-development/web-development.png',
            alt: 'Connected website ecosystem',
        },
    },
};
