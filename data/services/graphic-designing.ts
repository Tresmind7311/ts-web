import type { ServiceData } from './types';

const imageBase = '/images/services/graphic-designing';

export const graphicDesigningService: ServiceData = {
    slug: 'graphic-designing',
    name: 'Graphic Designing',
    seo: {
        title: 'Graphic Design Services | Logos, UI/UX & Print | Tresmind',
        description:
            'Graphic design services for logos, UI/UX, marketing graphics, print and packaging, plus branding, 3D modeling and animation for growing businesses.',
    },
    hero: {
        title: 'Graphic design services',
        description:
            'We design the everyday visuals your business relies on, from logos and app screens to ads, brochures and packaging, so every touchpoint looks clear and consistent.',
        primaryCta: {
            label: 'Start a design project',
            href: '/contact',
        },
        secondaryCta: {
            label: 'Discuss your project',
            href: '/contact',
        },
        image: {
            src: `${imageBase}/graphic-designing-hero.png`,
            alt: 'Brand identity and graphic design samples',
        },
    },
    listing: {
        shortDescription:
            'Brand identities, campaign graphics and print design that stay consistent everywhere.',
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
        title: 'Design that works where your audience sees it',
        description:
            'Good design is practical. A logo must read at small sizes, an app screen must guide users, and a brochure must print correctly. This page covers individual design assets. For a full identity system, see Complete Branding; for static product assets, see 3D Modeling; for motion, see 2D/3D Animation.',
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
        eyebrow: 'Graphic Design',
        title: 'What we design',
        description:
            'Logos, interfaces, campaign graphics and print materials for everyday business use.',
        initialVisibleCount: 4,
        items: [
            {
                id: 'logo-design',
                title: 'Logo Design',
                description:
                    'A logo and variations for use across web, print and social.',
                image: {
                    src: `${imageBase}/what-we-build/Brand-Identity.png`,
                    alt: 'Logo and brand identity design',
                },
            },
            {
                id: 'ui-ux-design',
                title: 'UI/UX Design',
                description: 'Interface and user-journey design for websites and mobile apps, scoped to product needs.',
            },
            {
                id: 'marketing-social-graphics',
                title: 'Marketing & Social Graphics',
                description:
                    'Ads, banners, social posts, presentations and email graphics aligned to your brand.',
                image: {
                    src: `${imageBase}/what-we-build/Marketing-Social-Graphics.png`,
                    alt: 'Marketing and social graphics',
                },
            },
            {
                id: 'print-packaging-design',
                title: 'Print & Packaging Design',
                description:
                    'Brochures, business cards, signage, labels and packaging prepared for the intended format.',
                image: {
                    src: `${imageBase}/what-we-build/Print-Packaging-Design.png`,
                    alt: 'Print and packaging design',
                },
            },
        ],
    },
    process: {
        title: 'Our process',
        description:
            'We understand your message, explore a visual direction, and refine the designs for their intended use.',
        autoplayMs: 3500,
        steps: [
            {
                id: 'discovery-brief',
                number: '01',
                title: 'Discovery & brief',
                description:
                    'Goals, audience, visual direction and intended use.',
                backgroundImage: {
                    src: `${imageBase}/process-bg.png`,
                    alt: '',
                },
                foregroundImage: {
                    src: `${imageBase}/process-img.png`,
                    alt: 'Graphic design discovery and brief',
                },
            },
            {
                id: 'concepts',
                number: '02',
                title: 'Concepts',
                description: 'Visual directions to review against the brief.',
                backgroundImage: {
                    src: `${imageBase}/process-bg.png`,
                    alt: '',
                },
                foregroundImage: {
                    src: `${imageBase}/process-img.png`,
                    alt: '',
                },
            },
            {
                id: 'refinement',
                number: '03',
                title: 'Refinement',
                description: 'Adjust the selected direction for its intended use.',
                backgroundImage: {
                    src: `${imageBase}/process-bg.png`,
                    alt: '',
                },
                foregroundImage: {
                    src: `${imageBase}/process-img.png`,
                    alt: '',
                },
            },
            {
                id: 'production',
                number: '04',
                title: 'Production',
                description: 'Prepare final artwork for each agreed format.',
                backgroundImage: {
                    src: `${imageBase}/process-bg.png`,
                    alt: '',
                },
                foregroundImage: {
                    src: `${imageBase}/process-img.png`,
                    alt: '',
                },
            },
            {
                id: 'handover', number: '05', title: 'Handover',
                description: 'Organise agreed files and usage notes.',
                backgroundImage: { src: `${imageBase}/process-bg.png`, alt: '' },
                foregroundImage: { src: `${imageBase}/process-img.png`, alt: '' },
            },
        ],
    },
    ecosystem: {
        title: 'Why work with Tresmind on design',
        description:
            'Design should connect your message, identity, layout and production needs. Agree the formats, feedback stages and final files early so assets can be used across the intended touchpoints.',
        flow: 'Brand & Message → Visual Identity → Layout & Imagery → Production → Audience',
        closingText: '',
        image: {
            src: `${imageBase}/graphic-designing.png`,
            alt: 'Connected visual design ecosystem',
        },
    },
    faq: {
        title: 'Graphic Design Services FAQs',
        items: [
            {
                question: 'Can you work with our existing brand?',
                answer: 'Yes. We design within your current guidelines, or help refresh them.',
            },
            { question: 'What files will I receive?', answer: 'File formats depend on the agreed use. Confirm print, digital and editable source files during scoping.' },
            { question: 'How many revisions are included?', answer: 'Agree the review rounds and any additional revisions in the project scope.' },
            { question: 'Do you design for print as well as digital?', answer: 'Print and digital artwork have different production requirements. Share printer specifications where available.' },
            { question: 'Do I need a logo or complete branding?', answer: 'A logo is one asset. Complete branding also defines positioning, voice and a wider identity system.' },
        ],
    },
};
