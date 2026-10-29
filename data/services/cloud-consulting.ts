import type { ServiceData } from './types';

export const cloudConsultingService: ServiceData = {
    slug: 'cloud-consulting',
    name: 'Cloud Consulting',
    seo: {
        title: 'Cloud Consulting Services | Migration & Security',
        description:
            'Cloud consulting for growing businesses: infrastructure setup, cloud migration, security and backup, and cost optimisation, planned around your applications.',
    },
    hero: {
        title: 'Cloud consulting services',
        description:
            'We plan, set up and improve cloud environments that keep your applications reliable, your data protected and your costs under control.',
        primaryCta: {
            label: 'Start your project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Book a consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/cloud-consulting/Cloud-computing-hero.png',
            alt: 'Cloud infrastructure architecture diagram',
        },
    },
    listing: {
        shortDescription:
            'Cloud infrastructure, migration, security and cost optimization.',
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
    technologyStack: {
        title: "Cloud platforms & practices",
        description: "Cloud architecture and operations focused on reliability, security, scaling and cost visibility.",
        items: ["AWS","Microsoft Azure","Cloud migration","Identity & access","Monitoring","Backup & recovery","Cost optimization"],
    },

    showcase: {
        title: 'Cloud Solutions Built Around Your Business',
        description:
            'Whether you are moving to the cloud for the first time or improving an existing setup, we shape the environment around your workloads, team and goals.',
        columns: [
            {
                images: [
                    { src: '/images/services/cloud-consulting/Cloud-computing-1.png', alt: 'Cloud computing showcase 1' },
                    { src: '/images/services/cloud-consulting/Cloud-computing-2.png', alt: 'Cloud computing showcase 2' },
                ]
            },
            {
                placeholder: true, images: [
                    { src: '/images/services/cloud-consulting/Cloud-computing-3.png', alt: 'Cloud computing showcase 3' },
                    { src: '/images/services/cloud-consulting/Cloud-computing-4.png', alt: 'Cloud computing showcase 4' },
                ]
            },
            {
                images: [
                    { src: '/images/services/cloud-consulting/Cloud-computing-5.png', alt: 'Cloud computing showcase 5' },
                ]
            },
            {
                placeholder: true, images: [
                    { src: '/images/services/cloud-consulting/Cloud-computing-6.png', alt: 'Cloud computing showcase 6' },
                    { src: '/images/services/cloud-consulting/Cloud-computing-7.png', alt: 'Cloud computing showcase 7' },
                ]
            },
            {
                images: [
                    { src: '/images/services/cloud-consulting/Cloud-computing-8.png', alt: 'Cloud computing showcase 8' },
                ]
            },
            {
                placeholder: true, images: [
                    { src: '/images/services/cloud-consulting/Cloud-computing-9.png', alt: 'Cloud computing showcase 9' },
                    { src: '/images/services/cloud-consulting/Cloud-computing-10.png', alt: 'Cloud computing showcase 10' },
                ]
            },
            {
                images: [
                    { src: '/images/services/cloud-consulting/Cloud-computing-11.png', alt: 'Cloud computing showcase 11' },
                ]
            },
            {
                placeholder: true, images: [
                    { src: '/images/services/cloud-consulting/Cloud-computing-12.png', alt: 'Cloud computing showcase 12' },
                    { src: '/images/services/cloud-consulting/Cloud-computing-13.png', alt: 'Cloud computing showcase 13' },
                ]
            },
            {
                images: [
                    { src: '/images/services/cloud-consulting/Cloud-computing-1.png', alt: 'Cloud computing showcase 1' },
                ]
            },
        ],
    },
    capabilities: {
        eyebrow: 'Our Expertise',
        title: 'What we do',
        description:
            'Cloud environments and improvements built around your applications, security, performance, and operational needs.',
        initialVisibleCount: 4,
        items: [
            {
                id: 'cloud-infrastructure',
                title: 'Cloud Infrastructure',
                description:
                    'Environments configured for your applications, storage and day-to-day operations.',
                image: {
                    src: '/images/services/cloud-consulting/what-we-build/Cloud-Infrastructure.png',
                    alt: 'Cloud infrastructure',
                },
            },
            {
                id: 'cloud-migration',
                title: 'Cloud Migration',
                description:
                    'Planned moves of applications and data to the cloud with minimal disruption.',
                image: {
                    src: '/images/services/cloud-consulting/what-we-build/Cloud-Migration.png',
                    alt: 'Cloud migration',
                },
            },
            {
                id: 'cloud-security-backup',
                title: 'Cloud Security & Backup',
                description:
                    'Access controls, backups and recovery plans that protect your systems.',
                image: {
                    src: '/images/services/cloud-consulting/what-we-build/Cloud-Security-Backup.png',
                    alt: 'Cloud security and backup',
                },
            },
            {
                id: 'cloud-optimization',
                title: 'Cloud Optimisation',
                description:
                    'Reviews that align performance and spend with how you actually use the cloud.',
                image: {
                    src: '/images/services/cloud-consulting/what-we-build/Cloud-Optimization.png',
                    alt: 'Cloud optimization',
                },
            },
        ],
    },
    process: {
        title: 'Our implementation process',
        description:
            'We assess your current systems, plan the cloud environment, and prepare it for practical, ongoing use.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'assessment-planning',
                number: '01',
                title: 'Assessment & planning',
                description:
                    'Applications, infrastructure, scope and priorities.',
                backgroundImage: {
                    src: '/images/services/cloud-consulting/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/cloud-consulting/Cloud-computing-1.png',
                    alt: 'Cloud assessment and planning',
                },
            },
            {
                id: 'architecture-design',
                number: '02',
                title: 'Architecture design',
                description: 'Plan the environment around workloads and data.',
                backgroundImage: {
                    src: '/images/services/cloud-consulting/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/cloud-consulting/Cloud-computing-2.png',
                    alt: '',
                },
            },
            {
                id: 'setup-migration',
                number: '03',
                title: 'Setup or migration',
                description: 'Configure infrastructure or move applications and data.',
                backgroundImage: {
                    src: '/images/services/cloud-consulting/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/cloud-consulting/Cloud-computing-3.png',
                    alt: '',
                },
            },
            {
                id: 'security-testing',
                number: '04',
                title: 'Security & testing',
                description: 'Review access, backups and application behaviour.',
                backgroundImage: {
                    src: '/images/services/cloud-consulting/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/cloud-consulting/Cloud-computing-4.png',
                    alt: '',
                },
            },
            {
                id: 'handover-support',
                number: '05',
                title: 'Handover & ongoing support',
                description: 'Documentation, handover and agreed next steps.',
                backgroundImage: {
                    src: '/images/services/cloud-consulting/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/cloud-consulting/Cloud-computing-5.png',
                    alt: '',
                },
            },
        ],
    },
    ecosystem: {
        title: 'More Than Just a Server',
        description:
            'A dependable cloud environment brings together applications, infrastructure, data, security and monitoring, so your team always knows what is running and why.',
        flow:
            'Applications → Cloud Infrastructure → Data & Storage → Security & Recovery → Monitoring & Operations',
        closingText: '',
        image: {
            src: '/images/services/cloud-consulting/cloud-consulting.png',
            alt: 'Cloud applications, infrastructure, storage, security, and monitoring connected in one ecosystem',
        },
    },
    faq: {
        title: 'Cloud consulting FAQs',
        items: [
            {
                question: 'Will migrating cause downtime?',
                answer: 'We plan migrations to minimise disruption and agree on cut-over windows with you in advance.',
            },
            {
                question: 'Can you reduce our cloud bill?',
                answer: 'A cost review often finds unused or oversized resources. We report the findings before changing anything.',
            },
        ],
    },
};
