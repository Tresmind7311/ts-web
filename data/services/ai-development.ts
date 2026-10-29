
import type { ServiceData } from './types';

export const aiDevelopmentService: ServiceData = {
    slug: 'ai-development',
    name: 'AI Development',

    seo: {
        title: 'AI Development Services for Business | Tresmind',
        description:
            'AI assistants, workflow automation, machine learning and AI integration, designed around real use cases and built to fit the tools your business already uses.',
    },

    hero: {
        title: 'AI development services',
        description:
            'We design and build practical AI tools (assistants, automations and integrations) that help your team save time and make better use of the information it already has.',
        primaryCta: {
            label: 'Start your project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Book a consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/ai-development/hero-img.png',
            alt: 'AI assistant and automation workflow interface',
        },
    },

    listing: {
        shortDescription:
            'Practical AI assistants, automation and integrations that fit real workflows.',
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


    technologyStack: {
        title: "AI & machine learning stack",
        description: "Practical AI technologies selected around your data, security requirements and product goals.",
        items: ["Python","LLM APIs","Retrieval-augmented generation","Vector databases","Machine learning","Workflow automation","Model evaluation"],
    },

    showcase: {
        title: 'AI Experiences Built Around Real Needs',
        description:
            'We start with a specific problem, not a technology. From customer-support assistants to internal automation, we build AI features people actually use in their daily work.',
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
                    'Chat and voice assistants that answer questions, guide users and complete routine tasks, using your own content and data.',
                image: {
                    src: '/images/services/ai-development/what-we-build/AI-Assistants.png',
                    alt: 'AI Assistants',
                },
            },
            {
                id: 'ai-powered-automation',
                title: 'AI-Powered Automation',
                description:
                    'Workflows that handle repetitive steps such as sorting, summarising and routing, so people focus on decisions.',
                image: {
                    src: '/images/services/ai-development/what-we-build/AI-Powered-Automation.png',
                    alt: 'AI-Powered Automation',
                },
            },
            {
                id: 'machine-learning-solutions',
                title: 'Machine Learning Solutions',
                description:
                    'Models that find patterns in your data to support forecasting, classification and recommendations.',
                image: {
                    src: '/images/services/ai-development/what-we-build/Machine-Learning-Solutions.png',
                    alt: 'Machine Learning Solutions',
                },
            },
            {
                id: 'ai-integration',
                title: 'AI Integration',
                description:
                    'AI capabilities added to the websites, apps and business systems you already run.',
                image: {
                    src: '/images/services/ai-development/what-we-build/AI-Integration.png',
                    alt: 'AI Integration',
                },
            },
        ],
    },

    process: {
        title: 'Our AI development process',
        description:
            'Start with a clear use case, prove it works, then scale it.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'use-case-discovery',
                number: '01',
                title: 'Use-case discovery',
                description:
                    'problem, users, data and success measures.',
                backgroundImage: {
                    src: '/images/services/ai-development/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/ai-development/ai-development-1.png',
                    alt: 'AI use case discovery',
                },
            },
            {
                id: 'prototype',
                number: '02',
                title: 'Prototype',
                description:
                    'a working proof of concept on real examples.',
                backgroundImage: {
                    src: '/images/services/ai-development/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/ai-development/ai-development-2.png',
                    alt: 'AI use case discovery',
                },
            },
            {
                id: 'build-integrate',
                number: '03',
                title: 'Build & integrate',
                description:
                    'production-ready solution connected to your systems.',
                backgroundImage: {
                    src: '/images/services/ai-development/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/ai-development/ai-development-3.png',
                    alt: 'AI use case discovery',
                },
            },
            {
                id: 'evaluate',
                number: '04',
                title: 'Evaluate',
                description: 'accuracy, safety and human-review checks.',
                backgroundImage: {
                    src: '/images/services/ai-development/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/ai-development/ai-development-4.png',
                    alt: '',
                },
            },
            {
                id: 'launch-improve',
                number: '05',
                title: 'Launch & improve',
                description: 'monitoring and ongoing refinement.',
                backgroundImage: {
                    src: '/images/services/ai-development/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/ai-development/ai-development-5.png',
                    alt: '',
                },
            },
        ],
    },

    ecosystem: {
        title: 'More Than Just an AI Feature',
        description:
            'AI is only useful when it fits the workflow. We connect the user request, the right data, the AI step and human review, so each output leads to a sensible next action.',
        flow:
            'User Request → Relevant Data → AI Processing → Human Review → Action',
        closingText: '',
        image: {
            src: '/images/services/ai-development/AI-Feature.PNG',
            alt: 'Connected AI feature ecosystem',
        },
    },
    faq: {
        title: 'AI development FAQs',
        items: [
            {
                question: 'Can you add AI to our existing product?',
                answer: 'Yes. We review your product and workflows, identify where AI adds value, and integrate it with a clear plan.',
            },
            {
                question: 'Which AI models do you use?',
                answer: 'We choose based on the task, data sensitivity and cost, and we explain the trade-offs before building.',
            },
            {
                question: 'Do we need a lot of data to start?',
                answer: 'Not always. Many assistants and automations work with your existing documents and systems.',
            },
        ],
    },
};
