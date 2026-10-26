import type { ServiceData } from './types';

export const mobileAppDevelopmentService: ServiceData = {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    seo: {
        title: 'Mobile App Development Services | Tresmind Solutions',
        description:
            'Android and cross-platform mobile app development, from UX design and API integration to launch and support, for startups and businesses worldwide.',
    },
    hero: {
        title: 'Mobile app development services',
        description:
            'We design and build Android and cross-platform apps that people enjoy using, with the APIs, backend and analytics to support your business as it grows.',
        primaryCta: {
            label: 'Start your project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Book a consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/mobile-app-development/hero-img.png',
            alt: 'Mobile app screens designed by Tresmind',
        },
    },
    listing: {
        shortDescription:
            'Android and cross-platform apps with clean UX and reliable backends.',
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
    capabilities: {
        eyebrow: 'Our Expertise',
        title: 'What We Build',
        description:
            'From native mobile applications to connected digital ecosystems, we build scalable experiences around real users and business goals.',
        initialVisibleCount: 4,
        items: [
            {
                id: 'native-android-development',
                title: 'Native Android Development',
                description:
                    'Android apps built with modern tooling, clean architecture and attention to performance on a wide range of devices.',
                image: {
                    src: '/images/services/mobile-app-development/Native-Android-Development.jpg',
                    alt: 'Android app development',
                },
            },
            {
                id: 'cross-platform-applications',
                title: 'Cross-Platform Applications',
                description:
                    'One codebase for iOS and Android when speed to market matters, without compromising usability.',
                image: {
                    src: '/images/services/mobile-app-development/Cross-Platform-Applications.jpg',
                    alt: 'Cross-platform app on iPhone and Android',
                },
            },
            {
                id: 'api-backend-integration',
                title: 'API & Backend Integration',
                description:
                    'Apps connected securely to your APIs, databases, payment providers and third-party services.',
                image: {
                    src: '/images/services/mobile-app-development/API-Backend.jpg',
                    alt: 'Mobile app connected to backend APIs',
                },
            },
            {
                id: 'ui-ux-driven-development',
                title: 'UX/UI-Led Development',
                description:
                    'Design and engineering working together from the first wireframe, so what ships matches what was designed.',
                image: {
                    src: '/images/services/mobile-app-development/UI-UX-Driven.jpg',
                    alt: 'Mobile UI design wireframes',
                },
            },
        ],
    },

    showcase: {
        title: 'Mobile Experiences Built Around People',
        description:
            'Good apps start with the people who use them. We combine user research, interface design and solid engineering so your app is fast, easy to use and ready to scale.',
        columns: [
            {
                images: [
                    {
                        src: '/images/services/mobile-app-development/mob-dev-1.png',
                        alt: 'Mobile app development showcase 1',
                    },
                    {
                        src: '/images/services/mobile-app-development/mob-dev-2.png',
                        alt: 'Mobile app development showcase 2',
                    },
                ],
            },
            {
                placeholder: true,
                images: [
                    {
                        src: '/images/services/mobile-app-development/mob-dev-3.png',
                        alt: 'Mobile app development showcase 3',
                    },
                    {
                        src: '/images/services/mobile-app-development/mob-dev-4.png',
                        alt: 'Mobile app development showcase 4',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/mobile-app-development/mob-dev-5.png',
                        alt: 'Mobile app development showcase 5',
                    },
                ],
            },
            {
                placeholder: true,
                images: [
                    {
                        src: '/images/services/mobile-app-development/mob-dev-6.png',
                        alt: 'Mobile app development showcase 6',
                    },
                    {
                        src: '/images/services/mobile-app-development/mob-dev-7.png',
                        alt: 'Mobile app development showcase 7',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/mobile-app-development/mob-dev-8.png',
                        alt: 'Mobile app development showcase 8',
                    },
                ],
            },
            {
                placeholder: true,
                images: [
                    {
                        src: '/images/services/mobile-app-development/mob-dev-9.png',
                        alt: 'Mobile app development showcase 9',
                    },
                    {
                        src: '/images/services/mobile-app-development/mob-dev-10.png',
                        alt: 'Mobile app development showcase 10',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/mobile-app-development/mob-dev-11.png',
                        alt: 'Mobile app development showcase 11',
                    },
                ],
            },
            {
                placeholder: true,
                images: [
                    {
                        src: '/images/services/mobile-app-development/mob-dev-12.png',
                        alt: 'Mobile app development showcase 12',
                    },
                    {
                        src: '/images/services/mobile-app-development/mob-dev-13.png',
                        alt: 'Mobile app development showcase 13',
                    },
                ],
            },
            {
                images: [
                    {
                        src: '/images/services/mobile-app-development/mob-dev-1.png',
                        alt: 'Mobile app development showcase 1',
                    },
                ],
            },
        ],
    },

    process: {
        title: 'Our app development process',
        description:
            'A clear path from idea to app store, with reviews at every stage.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'discovery-planning',
                number: '01',
                title: 'Discovery & planning',
                description:
                    'goals, users, features and technical approach.',
                backgroundImage: {
                    src: '/images/services/mobile-app-development/process-bg.jpg',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/mobile-app-development/process-01.png',
                    alt: 'Discovery and planning process',
                },
            },
            {
                id: 'ux-ui-design',
                number: '02',
                title: 'UX & UI design',
                description:
                    'wireframes, prototypes and visual design you can test.',
                backgroundImage: {
                    src: '/images/services/mobile-app-development/process-bg.jpg',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/mobile-app-development/process-01.png',
                    alt: 'Application architecture and design',
                },
            },
            {
                id: 'development',
                number: '03',
                title: 'Development',
                description:
                    'app, backend and integrations built in short sprints.',
                backgroundImage: {
                    src: '/images/services/mobile-app-development/process-bg.jpg',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/mobile-app-development/process-01.png',
                    alt: 'Mobile application development',
                },
            },
            {
                id: 'testing',
                number: '04',
                title: 'Testing',
                description:
                    'functional, device and performance testing before release.',
                backgroundImage: {
                    src: '/images/services/mobile-app-development/process-bg.jpg',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/mobile-app-development/process-01.png',
                    alt: 'Application testing and optimization',
                },
            },
            {
                id: 'launch-support',
                number: '05',
                title: 'Launch & support',
                description:
                    'store submission, monitoring and updates.',
                backgroundImage: {
                    src: '/images/services/mobile-app-development/process-bg.jpg',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/mobile-app-development/process-01.png',
                    alt: 'Application deployment and support',
                },
            },
        ],
    },
    ecosystem: {
        title: 'More Than Just a Mobile Interface',

        description:
            'The screen is only part of the product. We connect the app to the APIs, backend services, databases and integrations behind it, so every layer works together.',

        flow:
            'Mobile App → APIs → Backend → Database → Integrations',

        closingText:
            'Every layer works together to create one seamless experience.',

        image: {
            src: '/images/services/mobile-app-development/mobile-ecosystem.png',
            alt: 'Connected mobile application ecosystem',
        },
    },
    faq: {
        title: 'Mobile app development FAQs',
        items: [
            {
                question: 'Do you build for iOS as well as Android?',
                answer: 'Yes. We build native Android apps and cross-platform apps that run on both iOS and Android.',
            },
            {
                question: 'How long does it take to build an app?',
                answer: 'It depends on features and integrations. After discovery we share a timeline with milestones before work begins.',
            },
            {
                question: 'Can you take over an existing app?',
                answer: 'Yes. We start with a code and architecture review, then agree on a plan for fixes and new features.',
            },
            {
                question: 'Do you help publish to the app stores?',
                answer: 'Yes. We prepare store listings and handle submission and review.',
            },
        ],
    },
};
