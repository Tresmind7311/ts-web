
import type { ServiceData } from './types';

export const softwareDevelopmentService: ServiceData = {
    slug: 'software-development',
    name: 'Software Development',

    seo: {
        title: 'Custom Software Development Services | Tresmind',
        description:
            'Custom business software: dashboards, client portals, workflow systems and integrations designed around how your team works and built to grow with you.',
    },

    hero: {
        title: 'Custom software development',
        description:
            'We design and build custom software that organises information, simplifies operations and connects the tools your team relies on every day.',
        primaryCta: {
            label: 'Start your project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Book a consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/software-development/hero-image.png',
            alt: 'Custom business dashboard on laptop',
        },
    },

    listing: {
        shortDescription:
            'Custom business tools, dashboards and portals built around how your team works.',
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
            'Off-the-shelf tools rarely fit perfectly. We build software around your people, processes and data, so work moves faster with fewer spreadsheets and less duplicate entry.',
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
                    'Applications built for your specific processes, from job tracking to inventory and scheduling.',
                image: {
                    src: '/images/services/software-development/what-we-build/Custom-Business-Tools.png',
                    alt: 'Custom Business Tools',
                },
            },
            {
                id: 'dashboards-portals',
                title: 'Dashboards & Portals',
                description:
                    'Secure places where teams and customers can see information, manage requests and act on it.',
                image: {
                    src: '/images/services/software-development/what-we-build/Dashboards-Portals.png',
                    alt: 'Dashboards and Portals',
                },
            },
            {
                id: 'workflow-systems',
                title: 'Workflow Systems',
                description:
                    'Tools that organise tasks, approvals and handoffs across departments.',
                image: {
                    src: '/images/services/software-development/what-we-build/Workflow-Systems.png',
                    alt: 'Workflow Systems',
                },
            },
            {
                id: 'system-integrations',
                title: 'System Integrations',
                description:
                    'Connections between your existing apps (CRM, accounting, e-commerce) so data flows automatically.',
                image: {
                    src: '/images/services/software-development/what-we-build/System-Integrations.png',
                    alt: 'System Integrations',
                },
            },
        ],
    },

    process: {
        title: 'Our software development process',
        description:
            'We understand how your business works, plan the right solution, and develop software around your practical needs.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'requirements-discovery',
                number: '01',
                title: 'Requirements discovery',
                description:
                    'Goals, users, current processes and the problems to solve.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Software-DEVELOPMENT-1.png',
                    alt: 'Software requirements discovery',
                },
            },
            {
                id: 'solution-design',
                number: '02',
                title: 'Solution design',
                description: 'Structure, user flows and integration approach.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Software-DEVELOPMENT-2.png',
                    alt: '',
                },
            },
            {
                id: 'agile-development',
                number: '03',
                title: 'Agile development',
                description: 'Features built and reviewed in short iterations.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Software-DEVELOPMENT-3.png',
                    alt: '',
                },
            },
            {
                id: 'testing-qa',
                number: '04',
                title: 'Testing & QA',
                description: 'Functional, integration and usability checks.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Software-DEVELOPMENT-4.png',
                    alt: '',
                },
            },
            {
                id: 'deployment-support',
                number: '05',
                title: 'Deployment & support',
                description: 'Release preparation, handover and agreed next steps.',
                backgroundImage: {
                    src: '/images/services/software-development/Requirements-Discovery-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/software-development/Software-DEVELOPMENT-5.png',
                    alt: '',
                },
            },
        ],
    },

    ecosystem: {
        title: 'More Than Just a Dashboard',
        description:
            'Useful software connects what people see with the logic, integrations and data behind it, so your team moves from information to action.',
        flow:
            'Interface → Business Logic → Integrations → Data → Team',
        closingText: '',
        image: {
            src: '/images/services/software-development/Dashboard.png',
            alt: 'Connected software development ecosystem',
        },
    },
    faq: {
        title: 'Custom software FAQs',
        items: [
            {
                question: 'Should we build custom software or buy an existing tool?',
                answer: 'If an existing product fits most of your needs, we will say so. Custom software makes sense when your process is a competitive advantage or when existing tools force workarounds.',
            },
            {
                question: 'Can you work with our existing systems?',
                answer: 'Yes. Integration with the tools you already use is a core part of most projects.',
            },
        ],
    },
};
