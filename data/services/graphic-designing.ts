import type { ServiceData } from './types';

const imageBase = '/images/services/graphic-designing';

export const graphicDesigningService: ServiceData = {
    slug: 'graphic-designing',
    name: 'Graphic Designing',
    seo: {
        title: 'Graphic Design Services | Branding & Print | Tresmind',
        description:
            'Brand identity, logos, marketing and social graphics, print and packaging design that keep your business consistent and recognisable on every channel.',
    },
    hero: {
        title: 'Graphic design services',
        description:
            'We create visual designs that help your business communicate clearly and look consistent, from your logo to your latest campaign.',
        primaryCta: {
            label: 'Start your project',
            href: '#contact',
        },
        secondaryCta: {
            label: 'Book a consultation',
            href: '#contact',
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
    technologyStack: {
        title: "Design tools & deliverables",
        description: "A flexible design workflow that keeps visual systems consistent across digital and print touchpoints.",
        items: ["Figma","Adobe Illustrator","Adobe Photoshop","Brand systems","UI design","Social media assets","Print-ready artwork"],
    },

    showcase: {
        title: 'Visuals Built Around Your Brand',
        description:
            'From brand identities to campaign graphics and printed materials, we turn your message into designs that fit your business and every place your audience sees it.',
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
        title: 'What we design',
        description:
            'From brand identity to campaign graphics and print materials, we create designs that communicate your message clearly.',
        initialVisibleCount: 4,
        items: [
            {
                id: 'brand-identity',
                title: 'Brand Identity',
                description:
                    'Logos, colour palettes, typography and brand guidelines.',
                image: {
                    src: `${imageBase}/what-we-build/Brand-Identity.png`,
                    alt: 'Brand identity design',
                },
            },
            {
                id: 'marketing-social-graphics',
                title: 'Marketing & Social Graphics',
                description:
                    'Campaign visuals, social posts, ads and banners.',
                image: {
                    src: `${imageBase}/what-we-build/Marketing-Social-Graphics.png`,
                    alt: 'Marketing and social graphics',
                },
            },
            {
                id: 'print-packaging-design',
                title: 'Print & Packaging Design',
                description:
                    'Brochures, business cards, labels and packaging, ready for production.',
                image: {
                    src: `${imageBase}/what-we-build/Print-Packaging-Design.png`,
                    alt: 'Print and packaging design',
                },
            },
            {
                id: 'illustrations-custom-graphics',
                title: 'Illustrations & Custom Graphics',
                description:
                    'Original illustrations, icons and visual assets for your brand.',
                image: {
                    src: `${imageBase}/what-we-build/Illustrations-Custom-Graphics.png`,
                    alt: 'Illustrations and custom graphics',
                },
            },
        ],
    },
    process: {
        title: 'Our design process',
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
                    src: '/images/services/graphic-designing/graphic-designing-1.png',
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
                    src: '/images/services/graphic-designing/graphic-designing-2.png',
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
                    src: '/images/services/graphic-designing/graphic-designing-3.png',
                    alt: '',
                },
            },
            {
                id: 'final-files-guidelines',
                number: '04',
                title: 'Final files & guidelines',
                description: 'Prepare the agreed assets for handover.',
                backgroundImage: {
                    src: `${imageBase}/process-bg.png`,
                    alt: '',
                },
                foregroundImage: {
                    src: '/images/services/graphic-designing/graphic-designing-4.png',
                    alt: '',
                },
            },
        ],
    },
    ecosystem: {
        title: 'More Than Just a Visual',
        description:
            'Effective design connects how your brand looks with what it needs to say. We bring together your message, identity, layout and production needs, so every asset works where your audience sees it.',
        flow: 'Brand & Message → Visual Identity → Layout & Imagery → Production → Audience',
        closingText: '',
        image: {
            src: `${imageBase}/graphic-designing.png`,
            alt: 'Connected visual design ecosystem',
        },
    },
    faq: {
        title: 'Graphic design FAQs',
        items: [
            {
                question: 'Can you work with our existing brand?',
                answer: 'Yes. We design within your current guidelines, or help refresh them.',
            },
        ],
    },
};
