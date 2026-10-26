
import type { ServiceData } from './types';

export const webDevelopmentService: ServiceData = {
    slug: 'web-development',
    name: 'Web Development',

    seo: {
        title: 'Web Development Services | Websites & E-commerce',
        description:
            'Business websites, e-commerce stores, CMS sites and web applications: responsive, fast and easy for your team to update. Web development by Tresmind.',
    },

    hero: {
        title: 'Web development services',
        description:
            'We design and develop websites that present your services clearly, load quickly on every device and turn visitors into enquiries and sales.',
        primaryCta: {
            label: 'Start your project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Book a consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/web-development/WEB-DEVELOPMENT-hero-img.png',
            alt: 'Responsive website shown on desktop, tablet and phone',
        },
    },

    listing: {
        shortDescription:
            'Fast, responsive websites, online stores and web apps on a CMS your team can manage.',
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
            'From company websites to online stores and custom web applications, we build around your content, your customers and the actions you want them to take.',
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
                    'Clear, professional sites that explain what you do and make it easy to get in touch.',
                image: {
                    src: '/images/services/web-development/what-we-build/Business-Websites.png',
                    alt: 'Business Websites',
                },
            },
            {
                id: 'ecommerce-websites',
                title: 'E-commerce Websites',
                description:
                    'Online stores with easy product browsing, a smooth checkout and the integrations your operations need.',
                image: {
                    src: '/images/services/web-development/what-we-build/E-commerce-Websites.png',
                    alt: 'E-commerce Websites',
                },
            },
            {
                id: 'web-applications',
                title: 'Web Applications',
                description:
                    'Booking systems, portals and interactive tools that let users get things done online.',
                image: {
                    src: '/images/services/web-development/what-we-build/web-applications.png',
                    alt: 'Web Applications',
                },
            },
            {
                id: 'cms-websites',
                title: 'CMS Websites',
                description:
                    'Sites your team can update without a developer, from new pages to blog posts.',
                image: {
                    src: '/images/services/web-development/what-we-build/CMS-Websites.png',
                    alt: 'CMS Websites',
                },
            },
        ],
    },

    process: {
        title: 'Our web development process',
        description:
            'We plan the structure, design the experience, and build a website that works across devices and supports your business.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'discovery-planning',
                number: '01',
                title: 'Discovery & planning',
                description:
                    'goals, audience, content and features.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery.png',
                    alt: 'Software requirements discovery',
                },
            },
            {
                id: 'design',
                number: '02',
                title: 'Design',
                description: 'structure, wireframes and visual design.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery.png',
                    alt: '',
                },
            },
            {
                id: 'development',
                number: '03',
                title: 'Development',
                description: 'responsive front end and CMS or backend.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery.png',
                    alt: '',
                },
            },
            {
                id: 'testing',
                number: '04',
                title: 'Testing',
                description: 'browsers, devices, speed and accessibility basics.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery.png',
                    alt: '',
                },
            },
            {
                id: 'launch-care',
                number: '05',
                title: 'Launch & care',
                description: 'go-live, analytics and updates.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery.png',
                    alt: '',
                },
            },
        ],
    },

    ecosystem: {
        title: 'More Than Just a Website',
        description:
            'A good website connects what visitors see with content management, integrations and reliable hosting, so every enquiry and order reaches the right place.',
        flow:
            'User Experience → Content & CMS → Frontend & Backend → Integrations & Data → Hosting & Delivery',
        closingText: '',
        image: {
            src: '/images/services/web-development/web-development.png',
            alt: 'Connected website ecosystem',
        },
    },
    faq: {
        title: 'Web development FAQs',
        items: [
            {
                question: 'Will my website be mobile-friendly?',
                answer: 'Yes. Every site is designed and tested for phones, tablets and desktops.',
            },
            {
                question: 'Can you redesign my existing website?',
                answer: 'Yes. We review your current site and content first, then plan a redesign that keeps what works.',
            },
            {
                question: 'Do you build websites with SEO basics in place?',
                answer: 'Yes: clean page structure, titles and descriptions, fast loading and a sitemap.',
            },
        ],
    },
};
