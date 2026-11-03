import type { ChildPage } from './mobile-children';

export const graphicDesignChildList: (ChildPage & { processForegroundImage?: { src: string; alt: string } })[] = [
    {
        slug: '2d-3d-animation', name: '2D/3D Animation',
        seo: { title: '2D & 3D Animation Services | Explainer & Motion | Tresmind', description: '2D and 3D animation services: explainer videos, motion graphics, animated product demos and UI animations that make complex ideas easy to follow.' },
        hero: { title: '2D and 3D animation services', description: 'Explore animation for ideas, products and processes: explainers, motion graphics and 3D product sequences for websites, ads and presentations.', cta: 'Plan my animation' },
        introduction: { title: 'Motion that explains and engages', text: 'Animation can show how a product works, how a service flows or why an idea matters. This page covers movement and storytelling. For still product images or static 3D files, explore 3D Modeling.', image: { src: '/Motion-Graphics.jpg', alt: 'Motion editing workspace with video timeline on monitors' } },
        capabilitiesDescription: 'Animation options to discuss against your message, audience and channels.',
        cards: [
            { title: 'Explainer videos', description: '2D animation that explains a product, service or process.', image: { src: '/images/services/graphic-designing/graphic-designing-10.png', alt: 'Illustrated presenter beside a screen and chart' } },
            { title: 'Motion graphics', description: 'Animated typography, data visuals, social clips and presentation sequences.', image: { src: '/images/services/graphic-designing/graphic-designing-offer.jpg', alt: 'Creative editing workspace with video and design screens' } },
            { title: '3D product animation', description: 'Exploded views, assembly sequences and feature walk-throughs of physical products.', image: { src: '/images/services/graphic-designing/graphic-designing-7.png', alt: 'Product bottle shown in a styled visual mockup' } },
            { title: 'Logo and UI animation', description: 'Logo reveals and interface motion for apps and websites.', image: { src: '/images/services/graphic-designing/showcase-card.png', alt: 'Illustration of a design editor with a pen tool' } },
        ],
        deliverables: ['Script and storyboard for review, when included in scope', 'Style frames before full animation', 'Video exports in agreed lengths and aspect ratios', 'Platform versions and captions where agreed'],
        useCases: { title: 'Where animation works well', items: ['Website and landing-page explainers', 'Product demos for launches and presentations', 'Social clips and ads in platform-specific formats', 'Internal training and onboarding videos'] },
        explainer: { title: '2D or 3D animation: how to choose', text: '2D works well for concepts, services and software explained through icons, diagrams or characters. 3D suits physical products where form, parts and camera movement matter. Some projects combine both. Choose the approach after reviewing the message, audience, references and where the animation will play.', image: { src: '/images/services/graphic-designing/graphic-designing-hero.png', alt: 'Illustrated graphic design workspace with digital visual elements' } },
        process: ['Script: define message, length and key scenes', 'Storyboard: plan scenes and timing', 'Style frames: agree the look before animation', 'Animation: develop and review the motion', 'Delivery: export agreed versions for their channels'],
        processImage: { src: '/images/services/graphic-designing/graphic-designing-offer.jpg', alt: '' },
        why: { title: 'Why choose Tresmind for animation', text: 'A clear script, storyboard and style direction help establish the intended result before production. Agree review points, formats and reusable assets during project scoping.', image: { src: '/images/services/graphic-designing/Visual.jpg', alt: 'Illustrated stages of a visual design workflow' } },
        faq: {
            title: '2D/3D Animation FAQs', items: [
                { question: 'How long does an explainer video take?', answer: 'Timing depends on length, style, source assets and review scope. Agree a schedule during scoping.' },
                { question: 'Do you write the script?', answer: 'Script writing or refinement can be included after the brief and scope are agreed.' },
                { question: 'Can you add voice-over and music?', answer: 'Discuss voice, music and licensing requirements during scoping.' },
                { question: 'Can animations be used on our website without slowing it down?', answer: 'Web delivery needs suitable video or animation formats, file sizes and loading behavior for the page.' },
                { question: 'What is the difference between 3D animation and 3D modeling?', answer: '3D modeling creates an asset or still render. Animation adds movement, camera paths and timing.' },
                { question: 'Can we get versions for different social platforms?', answer: 'Agree aspect ratios, captions and export formats before production.' },
            ]
        },
        closing: { title: 'Have a story to animate?', text: 'Share your message and audience so an animation approach can be scoped.' },
    },
    {
        slug: '3d-modeling', name: '3D Modeling',
        seo: { title: '3D Modeling & Product Rendering Services | Tresmind', description: 'Explore 3D modeling and rendering for products, packaging, interiors and ecommerce, including web-ready models for interactive viewers.' },
        hero: { title: '3D modeling and rendering services', description: 'Explore 3D models and still renders for products, packaging and spaces, from ecommerce images to interactive web assets.', cta: 'Request 3D visuals' },
        introduction: { title: 'Product visuals without a photo shoot', text: '3D modeling can show products before manufacture and create consistent images across variants. This service focuses on static models and still images. For moving sequences, see 2D/3D Animation; for explorable virtual spaces, see Metaverse Development.', image: { src: '/images/services/graphic-designing/graphic-designing-9.png', alt: 'Colourful product packaging mockups' } },
        capabilitiesDescription: 'Static 3D assets and rendering needs to define in a project brief.',
        cards: [
            { title: 'Product modeling', description: 'Models of physical products from CAD files, drawings or reference photos.', image: { src: '/images/services/graphic-designing/graphic-designing-7.png', alt: 'Product bottle in a styled mockup' } },
            { title: 'Photorealistic renders', description: 'Studio, lifestyle and detail images with planned materials and lighting.', image: { src: '/images/services/graphic-designing/graphic-designing-4.png', alt: 'Dark stationery mockup shown at an angle' } },
            { title: 'Packaging visualisation', description: 'Mock-ups of boxes, bottles and labels for review and pre-launch materials.', image: { src: '/images/services/graphic-designing/what-we-build/Print-Packaging-Design.png', alt: 'Box and printed packaging design mockup' } },
            { title: 'Web-ready 3D assets', description: 'Optimised models for viewers, configurators or AR previews where required.', image: { src: '/images/services/graphic-designing/showcase-card.png', alt: 'Illustration of a digital design editor' } },
        ],
        deliverables: ['3D model files in agreed formats', 'Still renders at agreed resolution', 'Colour and material variants where scoped', 'Optimised web versions and source files where scoped'],
        useCases: { title: 'Common 3D modeling projects', items: ['Ecommerce catalogues with product variants', 'Manufacturer catalogues and pre-production visuals', 'Packaging reviews and retailer presentations', 'Interior and property visuals for planned spaces'] },
        explainer: { title: 'Accuracy, realism and file formats', text: 'CAD files, drawings, measurements and reference photos determine the detail a model can support. Materials and lighting shape the render; web viewers may need lighter geometry and textures. Agree the output formats and intended uses before production. Navigable environments, avatars and multi-user spaces belong to Metaverse Development.', image: { src: '/images/services/graphic-designing/graphic-designing-7.png', alt: 'Bottle product visual used as an illustrative reference' } },
        process: ['Brief and references: gather files and intended uses', 'Modeling: define geometry and detail', 'Materials and lighting: plan finishes and scene', 'Rendering: review stills and variants', 'Delivery: provide agreed renders and files'],
        processImage: { src: '/images/services/graphic-designing/graphic-designing-offer.jpg', alt: '' },
        why: { title: 'Why Tresmind for 3D modeling', text: 'Define the intended use early, including image dimensions and any web viewer requirements. This keeps static asset scope separate from animation and immersive development.', image: { src: '/images/services/graphic-designing/Visual.jpg', alt: 'Illustration of a visual design workflow and production stages' } },
        faq: {
            title: '3D Modeling FAQs', items: [
                { question: 'What do you need to start a 3D model?', answer: 'CAD files, drawings, dimensions and clear reference photos help establish the required accuracy.' },
                { question: 'Can you render products in different colours?', answer: 'Colour and material variants can be scoped from the same model.' },
                { question: 'Are renders suitable for marketplaces?', answer: 'Image dimensions and background rules should be checked against each marketplace before export.' },
                { question: 'Can customers rotate the product on our website?', answer: 'An interactive viewer needs a suitable model format and web implementation, which should be scoped separately.' },
                { question: 'How is this different from 3D animation?', answer: 'Modeling produces an asset and still images. Animation adds motion and timed sequences.' },
                { question: 'How long does a product model take?', answer: 'Timing depends on complexity, references and output requirements.' },
            ]
        },
        closing: { title: 'Need product visuals?', text: 'Share your product references and intended uses to discuss an approach.' },
    },
    {
        slug: 'complete-branding', name: 'Complete Branding',
        seo: { title: 'Complete Branding Services | Brand Identity | Tresmind', description: 'Explore complete branding: positioning, visual identity, tone of voice and brand guidelines, with rollout across selected touchpoints.' },
        hero: { title: 'Complete branding services', description: 'Build a connected identity across positioning, visual design, voice and guidelines so your business looks and sounds consistent.', cta: 'Start my branding project' },
        introduction: { title: 'More than a logo', text: 'A logo is one part of a brand. Complete branding connects audience, positioning, colours, typography, imagery and language into a usable system. If you only need a mark within an existing identity, explore logo design on the Graphic Design page.', image: { src: '/Brand-Identity.jpg', alt: 'Blue brand identity applied to stationery and packaging' } },
        capabilitiesDescription: 'Areas that can form a complete brand identity.',
        cards: [
            { title: 'Brand strategy', description: 'Audience, positioning, values and messaging to guide the identity.', image: { src: '/images/services/graphic-designing/graphic-designing-5.png', alt: 'Brand direction boards with typography and visual references' } },
            { title: 'Visual identity', description: 'Logo suite, colours, typography, iconography and image style.', image: { src: '/images/services/graphic-designing/graphic-designing-1.png', alt: 'Visual identity samples across stationery and packaging' } },
            { title: 'Verbal identity', description: 'Tone of voice, tagline directions and key messages.', image: { src: '/images/services/graphic-designing/graphic-designing-11.png', alt: 'Brand message layouts and visual direction board' } },
            { title: 'Brand guidelines and rollout', description: 'Usage rules and application across agreed touchpoints.', image: { src: '/images/services/graphic-designing/graphic-designing-8.png', alt: 'Brand icon system and glyph library' } },
        ],
        deliverables: ['Brand strategy summary', 'Logo suite and agreed identity elements', 'Tone of voice guidance', 'Brand guidelines document', 'Templates for agreed touchpoints where scoped'],
        useCases: { title: 'When companies invest in branding', items: ['New businesses preparing for launch', 'Inconsistent visuals across channels', 'Mergers, spin-offs and new product lines', 'Businesses entering new markets'] },
        explainer: { title: 'What a brand guidelines document includes', text: 'Guidelines can define logo usage, colour values, typography, image style, layout examples and tone of voice. The exact contents depend on where the identity will be used. Agree rollout priorities and formats so teams can apply the system consistently.', image: { src: '/Brand-Identity.jpg', alt: 'Blue brand identity system applied to printed and digital materials' } },
        process: ['Discovery: define audience and business context', 'Strategy: agree positioning, values and messages', 'Identity design: review and refine directions', 'Guidelines: document usage rules and examples', 'Rollout: apply the identity to agreed touchpoints'],
        processImage: { src: '/Brand-Identity.jpg', alt: '' },
        processForegroundImage: { src: '/images/services/graphic-designing/process-img.png', alt: 'Illustration of a design checklist and linked visual elements' },
        why: { title: 'Why Tresmind for branding', text: 'Branding connects strategy to practical use across websites, campaigns and materials. Agree the identity scope and priority touchpoints before design begins.', image: { src: '/images/services/graphic-designing/Visual.jpg', alt: 'Visual design workflow illustration with identity and print elements' } },
        faq: {
            title: 'Complete Branding FAQs', items: [
                { question: 'What is the difference between branding and logo design?', answer: 'Logo design creates a mark. Branding defines a wider identity, voice and usage system.' },
                { question: 'How long does a branding project take?', answer: 'Timing depends on research depth, scope and review stages.' },
                { question: 'Do you offer rebranding?', answer: 'A rebrand can assess which existing elements to keep, evolve or replace. Agree the scope after reviewing the current identity.' },
                { question: 'Can you create a bilingual English and Arabic identity?', answer: 'Bilingual typography and right-to-left layout requirements need a separate capability and scope review.' },
                { question: 'Do you check trademark availability?', answer: 'Formal trademark clearance requires qualified legal advice.' },
                { question: 'Can you apply the new brand to our website?', answer: 'Website rollout can be scoped alongside the identity work.' },
            ]
        },
        closing: { title: 'Ready to define your brand?', text: 'Tell us where your business is heading so the right identity scope can be discussed.' },
    },
];
