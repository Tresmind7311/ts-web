import type { ServiceData } from './types';

const imageBase = '/images/services/graphic-designing';

export const graphicDesigningService: ServiceData = {
    slug: 'graphic-designing',
    name: 'Graphic Designing',
    seo: {
        title: 'Graphic Designing Services | Tresmind',
        description:
            'We create visual designs that help businesses communicate clearly, present their brand consistently, and connect with their audience across print and digital platforms.',
    },
    hero: {
        title: 'Graphic Designing',
        description:
            'We create visual designs that help businesses communicate clearly, present their brand consistently, and connect with their audience across print and digital platforms.',
        primaryCta: {
            label: 'Start Your Project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Schedule a Consultation',
            href: '#contact',
        },
        image: {
            src: `${imageBase}/graphic-designing-hero.png`,
            alt: 'Graphic designing creative workspace and visual assets',
        },
    },
    listing: {
        shortDescription:
            'We create visual designs that help businesses communicate clearly and present their brand consistently across print and digital platforms.',
        showcaseImage: {
            src: `${imageBase}/showcase-card.png`,
            alt: 'Graphic designing service illustration',
        },
        offerImage: {
            src: `${imageBase}/graphic-designing-offer.jpg`,
            alt: 'Creative graphic design workspace',
        },
        order: 5,
    },
    showcase: {
        title: 'Visuals Built Around Your Brand',
        description:
            'From brand identities to campaign graphics and printed materials, we turn your message into designs that fit your business and the places your audience sees it.',
        columns: [
            {
                images: [
                    { src: `${imageBase}/graphic-designing-1.png`, alt: 'Graphic designing showcase 1' },
                    { src: `${imageBase}/graphic-designing-2.png`, alt: 'Graphic designing showcase 2' },
                ]
            },
            {
                placeholder: true, images: [
                    { src: `${imageBase}/graphic-designing-3.png`, alt: 'Graphic designing showcase 3' },
                    { src: `${imageBase}/graphic-designing-4.png`, alt: 'Graphic designing showcase 4' },
                ]
            },
            {
                images: [
                    { src: `${imageBase}/graphic-designing-5.png`, alt: 'Graphic designing showcase 5' },
                ]
            },
            {
                placeholder: true, images: [
                    { src: `${imageBase}/graphic-designing-6.png`, alt: 'Graphic designing showcase 6' },
                    { src: `${imageBase}/graphic-designing-7.png`, alt: 'Graphic designing showcase 7' },
                ]
            },
            {
                images: [
                    { src: `${imageBase}/graphic-designing-8.png`, alt: 'Graphic designing showcase 8' },
                ]
            },
            {
                placeholder: true, images: [
                    { src: `${imageBase}/graphic-designing-9.png`, alt: 'Graphic designing showcase 9' },
                    { src: `${imageBase}/graphic-designing-10.png`, alt: 'Graphic designing showcase 10' },
                ]
            },
            {
                images: [
                    { src: `${imageBase}/graphic-designing-11.png`, alt: 'Graphic designing showcase 11' },
                ]
            },
            {
                placeholder: true, images: [
                    { src: `${imageBase}/graphic-designing-12.png`, alt: 'Graphic designing showcase 12' },
                    { src: `${imageBase}/graphic-designing-13.png`, alt: 'Graphic designing showcase 13' },
                ]
            },
            {
                images: [
                    { src: `${imageBase}/graphic-designing-1.png`, alt: 'Graphic designing showcase 1' },
                ]
            },
        ],
    },
    capabilities: {
        eyebrow: 'Our Expertise',
        title: 'What We Build',
        description:
            'From brand identity to campaign graphics and print materials, we create designs that communicate your message clearly.',
        initialVisibleCount: 4,
        items: [
            {
                id: 'brand-identity',
                title: 'Brand Identity',
                description:
                    'Logos, color palettes, typography, and guidelines that give your business a consistent visual identity.',
                image: {
                    src: `${imageBase}/what-we-build/Brand-Identity.png`,
                    alt: 'Brand identity design',
                },
            },
            {
                id: 'marketing-social-graphics',
                title: 'Marketing & Social Graphics',
                description:
                    'Campaign visuals, social posts, ads, and banners that communicate your message across digital channels.',
                image: {
                    src: `${imageBase}/what-we-build/Marketing-Social-Graphics.png`,
                    alt: 'Marketing and social graphics',
                },
            },
            {
                id: 'print-packaging-design',
                title: 'Print & Packaging Design',
                description:
                    'Brochures, business cards, labels, and packaging designed around your content and production requirements.',
                image: {
                    src: `${imageBase}/what-we-build/Print-Packaging-Design.png`,
                    alt: 'Print and packaging design',
                },
            },
            {
                id: 'illustrations-custom-graphics',
                title: 'Illustrations & Custom Graphics',
                description:
                    'Original illustrations, icons, and visual assets that explain ideas and add character to your brand.',
                image: {
                    src: `${imageBase}/what-we-build/Illustrations-Custom-Graphics.png`,
                    alt: 'Illustrations and custom graphics',
                },
            },
        ],
    },
    process: {
        title: 'Our Development Process',
        description:
            'We understand your message, explore a visual direction, and refine the designs for their intended use.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'discovery-brief',
                number: '01',
                title: 'Discovery & Brief',
                description:
                    'We define your goals, audience, brand style, and the formats your designs need to work in.',
                backgroundImage: {
                    src: `${imageBase}/process-bg.png`,
                    alt: '',
                },
                foregroundImage: {
                    src: `${imageBase}/process-img.png`,
                    alt: 'Graphic design discovery and brief',
                },
            },
        ],
    },
    ecosystem: {
        title: 'More Than Just a Visual',
        description:
            'Effective design connects how your brand looks with what it needs to communicate. We bring together your message, visual identity, layout, and production needs so every asset works where your audience sees it.',
        flow: 'Brand & Message → Visual Identity → Layout & Imagery → Production → Audience',
        closingText: '',
        image: {
            src: `${imageBase}/graphic-designing.png`,
            alt: 'Connected visual design ecosystem',
        },
    },
};
