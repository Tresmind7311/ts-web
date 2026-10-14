
import type { ServiceData } from './types';

export const aiDevelopmentService: ServiceData = {
    slug: 'ai-development',
    name: 'AI Development',

    seo: {
        title: 'AI Development Services | Tresmind',
        description:
            'We design and build AI-powered tools that help businesses simplify tasks, use information more effectively, and create better digital experiences.',
    },

    hero: {
        title: 'AI Development',
        description:
            'We design and build AI-powered tools that help businesses simplify tasks, use information more effectively, and create better digital experiences.',
        primaryCta: {
            label: 'Start Your Project',
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


    showcase: {
        title: 'AI Experiences Built Around Real Needs',
        description:
            'From helpful assistants to connected business tools, we turn focused AI ideas into experiences people can use in their everyday work.',
        columns: [
            {
                images: [
                    {
                        src: '/images/services/ai-development/ai-development-1.png',
                        alt: 'AI development showcase 1',
                    },
                    {
                        src: '/images/services/ai-development/ai-development-2.png',
                        alt: 'AI development showcase 2',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/ai-development/ai-development-3.png',
                        alt: 'AI development showcase 3',
                    },
                    {
                        src: '/images/services/ai-development/ai-development-4.png',
                        alt: 'AI development showcase 4',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/ai-development/ai-development-5.png',
                        alt: 'AI development showcase 5',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/ai-development/ai-development-6.png',
                        alt: 'AI development showcase 6',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/ai-development/ai-development-7.png',
                        alt: 'AI development showcase 7',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/ai-development/ai-development-8.png',
                        alt: 'AI development showcase 8',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/ai-development/ai-development-9.png',
                        alt: 'AI development showcase 9',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/ai-development/ai-development-10.png',
                        alt: 'AI development showcase 10',
                    },
                    {
                        src: '/images/services/ai-development/ai-development-11.png',
                        alt: 'AI development showcase 11',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/ai-development/ai-development-12.png',
                        alt: 'AI development showcase 12',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/ai-development/ai-development-13.png',
                        alt: 'AI development showcase 13',
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
                id: 'ai-assistants',
                title: 'AI Assistants',
                description:
                    'Conversational tools that help users find information, get support, and complete common tasks.',
                image: {
                    src: '/images/services/ai-development/what-we-build/AI-Assistants.png',
                    alt: 'AI Assistants',
                },
            },
            {
                id: 'ai-powered-automation',
                title: 'AI-Powered Automation',
                description:
                    'Connected workflows that handle repetitive steps and help teams focus on work that needs their attention.',
                image: {
                    src: '/images/services/ai-development/what-we-build/AI-Powered-Automation.png',
                    alt: 'AI-Powered Automation',
                },
            },
            {
                id: 'machine-learning-solutions',
                title: 'Machine Learning Solutions',
                description:
                    'Data-driven tools designed to identify patterns and support more informed decisions.',
                image: {
                    src: '/images/services/ai-development/what-we-build/Machine-Learning-Solutions.png',
                    alt: 'Machine Learning Solutions',
                },
            },
            {
                id: 'ai-integration',
                title: 'AI Integration',
                description:
                    'AI capabilities connected to the websites, applications, and business systems you already use.',
                image: {
                    src: '/images/services/ai-development/what-we-build/AI-Integration.png',
                    alt: 'AI Integration',
                },
            },
        ],
    },

    process: {
        title: 'Our Development Process',
        description:
            'We start with a clear use case, then design, build, and evaluate the solution around the people who will use it.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'use-case-discovery',
                number: '01',
                title: 'Use Case Discovery',
                description:
                    'We identify the problem, available information, users, and outcome the tool should support.',
                backgroundImage: {
                    src: '/images/services/ai-development/what-we-build/AI-Assistants.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/ai-development/hero-img.png',
                    alt: 'AI use case discovery',
                },
            },
        ],
    },

    ecosystem: {
        title: 'More Than Just an AI Feature',
        description:
            'An AI tool needs a clear place in the workflow. We connect the user experience, relevant information, AI processing, and human review so its output can lead to a useful next step.',
        flow:
            'User Request → Relevant Data → AI Processing → Human Review → Action',
        closingText: '',
        image: {
            src: '/images/services/ai-development/AI-Feature.PNG',
            alt: 'Connected AI feature ecosystem',
        },
    },
};
