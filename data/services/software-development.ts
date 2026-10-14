
import type { ServiceData } from './types';

export const softwareDevelopmentService: ServiceData = {
    slug: 'software-development',
    name: 'Software Development',

    seo: {
        title: 'Software Development Services | Tresmind',
        description:
            'We design and develop custom software that helps businesses organize information, simplify operations, and connect the tools their teams use every day.',
    },

    hero: {
        title: 'Software Development',
        description:
            'We design and develop custom software that helps businesses organize information, simplify operations, and connect the tools their teams use every day.',
        primaryCta: {
            label: 'Start Your Project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Schedule a Consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/software-development/hero-image.png',
            alt: 'Software development interface and engineering systems',
        },
    },

    listing: {
        shortDescription:
            'We create dependable software products and business systems with scalable architecture, clean integrations and maintainable engineering.',
        showcaseImage: {
            src: '/images/services/software-development/showcase-card.png',
            alt: 'Software development service illustration',
        },
        offerImage: {
            src: '/images/services/software-development/showcase-card.png',
            alt: 'Software engineering and development',
        },
        order: 3,
    },

    showcase: {
        title: 'Software Shaped Around Your Workflow',
        description:
            'From business tools to customer portals, we build software around the people, processes, and tasks that keep your business moving.',
        columns: [
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-1.png',
                        alt: 'Custom software development showcase',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-2.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-3.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-4.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-5.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-6.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-7.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-8.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-9.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-10.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-11.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-12.png',
                        alt: 'Business software applications',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/software-development/Software-DEVELOPMENT-13.png',
                        alt: 'Business software applications',
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
                id: 'custom-business-tools',
                title: 'Custom Business Tools',
                description:
                    'Purpose-built applications that simplify daily tasks and support the way your team works.',
                image: {
                    src: '/images/services/software-development/what-we-build/Custom-Business-Tools.png',
                    alt: 'Custom Business Tools',
                },
            },
            {
                id: 'dashboards-portals',
                title: 'Dashboards & Portals',
                description:
                    'Clear interfaces where teams and customers can access information, manage activity, and take action.',
                image: {
                    src: '/images/services/software-development/what-we-build/Dashboards-Portals.png',
                    alt: 'Dashboards and Portals',
                },
            },
            {
                id: 'workflow-systems',
                title: 'Workflow Systems',
                description:
                    'Connected tools that organize tasks, approvals, and handoffs across your business.',
                image: {
                    src: '/images/services/software-development/what-we-build/Workflow-Systems.png',
                    alt: 'Workflow Systems',
                },
            },
            {
                id: 'system-integrations',
                title: 'System Integrations',
                description:
                    'Connections between existing applications that keep information moving and reduce duplicate work.',
                image: {
                    src: '/images/services/software-development/what-we-build/System-Integrations.png',
                    alt: 'System Integrations',
                },
            },
        ],
    },

    process: {
        title: 'Our Development Process',
        description:
            'We understand how your business works, plan the right solution, and develop software around your practical needs.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'requirements-discovery',
                number: '01',
                title: 'Requirements Discovery',
                description:
                    'We define your goals, users, current processes, and the problems your software needs to solve.',
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
        title: 'More Than Just a Dashboard',
        description:
            'Useful software connects what people see with what happens behind the scenes. We bring together the interface, business logic, integrations, and data so your team can move from information to action.',
        flow:
            'Interface → Business Logic → Integrations → Data → Team',
        closingText: '',
        image: {
            src: '/images/services/software-development/Dashboard.png',
            alt: 'Connected software development ecosystem',
        },
    },
};
