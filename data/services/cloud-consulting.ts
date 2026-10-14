import type { ServiceData } from './types';

export const cloudConsultingService: ServiceData = {
    slug: 'cloud-consulting',
    name: 'Cloud Consulting',
    seo: {
        title: 'Cloud Computing Services | Tresmind',
        description:
            'We plan, set up, and improve cloud environments that support your applications, organize your infrastructure, and help your business adapt as its needs change.',
    },
    hero: {
        title: 'Cloud Computing',
        description:
            'We plan, set up, and improve cloud environments that support your applications, organize your infrastructure, and help your business adapt as its needs change.',
        primaryCta: {
            label: 'Start Your Project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Schedule a Consultation',
            href: '#contact',
        },
        image: {
            src: '/images/services/cloud-consulting/Cloud-computing-hero.png',
            alt: 'Cloud computing infrastructure and services illustration',
        },
    },
    listing: {
        shortDescription:
            'We help businesses plan, set up, and improve cloud environments around their applications, infrastructure, and changing needs.',
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
    showcase: {
        title: 'Cloud Solutions Built Around Your Business',
        description:
            'From moving existing systems to the cloud to improving how your applications run, we shape your cloud setup around your workloads, team, and business goals.',
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
        title: 'What We Build',
        description:
            'Cloud environments and improvements built around your applications, security, performance, and operational needs.',
        initialVisibleCount: 4,
        items: [
            {
                id: 'cloud-infrastructure',
                title: 'Cloud Infrastructure',
                description:
                    'Cloud environments configured around your applications, storage needs, and day-to-day operations.',
                image: {
                    src: '/images/services/cloud-consulting/what-we-build/Cloud-Infrastructure.png',
                    alt: 'Cloud infrastructure',
                },
            },
            {
                id: 'cloud-migration',
                title: 'Cloud Migration',
                description:
                    'Planned transitions that move applications and data to the cloud while managing dependencies and disruption.',
                image: {
                    src: '/images/services/cloud-consulting/what-we-build/Cloud-Migration.png',
                    alt: 'Cloud migration',
                },
            },
            {
                id: 'cloud-security-backup',
                title: 'Cloud Security & Backup',
                description:
                    'Access controls, backup plans, and recovery arrangements that help protect your systems and information.',
                image: {
                    src: '/images/services/cloud-consulting/what-we-build/Cloud-Security-Backup.png',
                    alt: 'Cloud security and backup',
                },
            },
            {
                id: 'cloud-optimization',
                title: 'Cloud Optimization',
                description:
                    'Reviews and improvements that align cloud resources, performance, and costs with how your business uses them.',
                image: {
                    src: '/images/services/cloud-consulting/what-we-build/Cloud-Optimization.png',
                    alt: 'Cloud optimization',
                },
            },
        ],
    },
    process: {
        title: 'Our Implementation Process',
        description:
            'We assess your current systems, plan the cloud environment, and prepare it for practical, ongoing use.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'assessment-planning',
                number: '01',
                title: 'Assessment & Planning',
                description:
                    'We review your applications, infrastructure, and business needs to define the scope and priorities.',
                backgroundImage: {
                    src: '/images/services/cloud-consulting/process-bg.png',
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/cloud-consulting/Cloud-Computing-process.png',
                    alt: 'Cloud assessment and planning',
                },
            },
        ],
    },
    ecosystem: {
        title: 'More Than Just a Server',
        description:
            'A useful cloud environment connects the systems your business relies on. We bring together applications, infrastructure, data, security, and monitoring so your team can run and manage its services with a clear view of what happens behind the scenes.',
        flow:
            'Applications → Cloud Infrastructure → Data & Storage → Security & Recovery → Monitoring & Operations',
        closingText: '',
        image: {
            src: '/images/services/cloud-consulting/cloud-consulting.png',
            alt: 'Cloud applications, infrastructure, storage, security, and monitoring connected in one ecosystem',
        },
    },
};
