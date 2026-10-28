import type { ServiceData } from './types';

/**
 * Additional service landing pages linked from the Services mega menu.
 * Shared templates keep every route consistent, responsive and SEO-ready.
 * Existing six flagship service pages remain defined in their own files.
 */
const serviceDefinitions = [
    { slug: 'ios-app-development', name: 'iOS App Development', group: 'App Development', description: 'Build polished iPhone and iPad experiences with thoughtful UX, dependable integrations and a release plan designed around your business.', image: '/images/services/mobile-app-development/hero-img.png' },
    { slug: 'android-app-development', name: 'Android App Development', group: 'App Development', description: 'Launch Android applications designed for real-world devices, fast performance and the workflows your customers need every day.', image: '/images/services/mobile-app-development/Native-Android-Development.jpg' },
    { slug: 'cross-platform-app-development', name: 'Cross-Platform App Development', group: 'App Development', description: 'Reach iOS and Android users with a cohesive application experience, shared product logic and an efficient delivery roadmap.', image: '/images/services/mobile-app-development/Cross-Platform-Applications.jpg' },
    { slug: 'erp-solutions', name: 'ERP Solutions', group: 'Business Solutions', description: 'Connect finance, operations, inventory and reporting in a practical ERP experience built around the way your business works.', image: '/images/services/software-development/hero-image.png' },
    { slug: 'crm-solutions', name: 'CRM Solutions', group: 'Business Solutions', description: 'Give your sales and customer teams one clear view of leads, conversations and opportunities with a CRM shaped to your process.', image: '/images/services/software-development/Dashboard.png' },
    { slug: 'cms-solutions', name: 'CMS Solutions', group: 'Business Solutions', description: 'Manage digital content with flexible, secure content management experiences that help your team publish and update with confidence.', image: '/images/services/web-development/web-development.png' },
    { slug: 'ecommerce-website-development', name: 'Ecommerce Website Development', group: 'Web Development', description: 'Create a smooth online shopping journey with responsive storefronts, secure checkout, product management and integrations.', image: '/images/services/web-development/what-we-build/E-commerce-Websites.png' },
    { slug: 'web-application-development', name: 'Web Application Development', group: 'Web Development', description: 'Turn complex workflows into fast, intuitive web applications with maintainable architecture and room to grow.', image: '/images/services/web-development/WEB-DEVELOPMENT-hero-img.png' },
    { slug: 'generative-ai', name: 'Generative AI Development', group: 'AI Development', description: 'Put generative AI to work with grounded assistants, content workflows and practical integrations aligned with business outcomes.', image: '/AI.jpg' },
    { slug: 'natural-language-processing', name: 'Natural Language Processing', group: 'AI Development', description: 'Help software understand and work with language through document processing, classification, extraction and conversational interfaces.', image: '/AI.jpg' },
    { slug: 'ai-agent-development', name: 'AI Agent Development', group: 'AI Development', description: 'Design AI agents that can support defined workflows, connect to approved tools and keep people in control of important decisions.', image: '/AI.jpg' },
    { slug: 'cloud-application-development', name: 'Cloud Application Development', group: 'Cloud Solutions', description: 'Build cloud-ready applications with reliable deployment patterns, secure integrations and architecture that can scale with demand.', image: '/images/services/cloud-consulting/Cloud-computing-hero.png' },
    { slug: 'cloud-migration', name: 'Cloud Migration', group: 'Cloud Solutions', description: 'Plan and move workloads to the cloud with a clear migration path, careful validation and a focus on continuity.', image: '/images/services/cloud-consulting/what-we-build/Cloud-Migration.png' },
    { slug: 'cloud-support-maintenance', name: 'Cloud Support & Maintenance', group: 'Cloud Solutions', description: 'Keep cloud environments healthy with proactive maintenance, monitoring, cost reviews and a practical improvement backlog.', image: '/images/services/cloud-consulting/Cloud-computing-hero.png' },
    { slug: 'staff-augmentation', name: 'Staff Augmentation', group: 'Staff Augmentation', description: 'Add experienced technical talent to your team to accelerate delivery, close skill gaps and stay aligned with your existing workflow.', image: '/images/services/software-development/hero-image.png' },
    { slug: 'hire-mern-stack-developers', name: 'Hire MERN Stack Developers', group: 'Staff Augmentation', description: 'Extend your team with developers who can build full-stack products across MongoDB, Express, React and Node.js.', image: '/images/services/web-development/WEB-DEVELOPMENT-hero-img.png' },
    { slug: 'hire-nodejs-developers', name: 'Hire Node.js Developers', group: 'Staff Augmentation', description: 'Bring in Node.js expertise for APIs, backend services, integrations and event-driven applications.', image: '/images/services/software-development/hero-image.png' },
    { slug: 'blockchain-development', name: 'Blockchain Development', group: 'Blockchain & Emerging Tech', description: 'Explore blockchain product ideas with clear use cases, secure integrations and a delivery plan grounded in practical requirements.', image: '/images/services/software-development/Dashboard.png' },
    { slug: 'metaverse-development', name: 'Metaverse Development', group: 'Blockchain & Emerging Tech', description: 'Create interactive 3D and virtual experiences with purposeful journeys, accessible interfaces and a defined product objective.', image: '/images/services/graphic-designing/hero-img.png' },
    { slug: 'nft-development', name: 'NFT Development', group: 'Blockchain & Emerging Tech', description: 'Design NFT experiences and supporting web platforms with clear ownership flows, user onboarding and responsible security planning.', image: '/images/services/software-development/Dashboard.png' },
    { slug: 'digital-marketing', name: 'Digital Marketing', group: 'Digital Marketing', description: 'Bring your channels together with a measurable digital marketing plan built around your audience, offer and growth goals.', image: '/images/services/graphic-designing/graphic-designing-hero.png' },
    { slug: 'seo', name: 'Search Engine Optimization (SEO)', group: 'Digital Marketing', description: 'Improve technical health, content structure and search visibility with an SEO roadmap connected to meaningful business goals.', image: '/images/services/graphic-designing/graphic-designing-hero.png' },
    { slug: 'answer-engine-optimization', name: 'Answer Engine Optimization (AEO)', group: 'Digital Marketing', description: 'Structure useful, credible content so answer engines can better understand your expertise and surface relevant information.', image: '/images/services/graphic-designing/graphic-designing-hero.png' },
    { slug: 'generative-engine-optimization', name: 'Generative Engine Optimization (GEO)', group: 'Digital Marketing', description: 'Strengthen how your brand and content can be understood by generative search experiences through clarity, structure and trust.', image: '/images/services/graphic-designing/graphic-designing-hero.png' },
    { slug: 'social-media-marketing', name: 'Social Media Marketing', group: 'Digital Marketing', description: 'Build a consistent social presence with platform-aware content, campaign planning and performance measurement.', image: '/images/services/graphic-designing/graphic-designing-hero.png' },
] as const;

const makeService = (
    definition: (typeof serviceDefinitions)[number],
    order: number,
): ServiceData => {
    const { slug, name, group, description, image } = definition;
    const imageAlt = `${name} service by Tresmind Solutions`;

    return {
        slug,
        name,
        seo: {
            title: `${name} Services | Tresmind Solutions`,
            description,
        },
        hero: {
            eyebrow: group,
            title: name,
            description,
            primaryCta: { label: 'Discuss your project', href: '/contact' },
            secondaryCta: { label: 'Explore our services', href: '/services' },
            image: { src: image, alt: imageAlt },
        },
        listing: {
            shortDescription: description,
            showcaseImage: { src: image, alt: imageAlt },
            offerImage: { src: image, alt: imageAlt },
            order: 20 + order,
        },
        capabilities: {
            eyebrow: 'How we help',
            title: `What we deliver in ${name.toLowerCase()}`,
            description: `A focused delivery approach for ${name.toLowerCase()}, from early discovery through launch and ongoing improvement.`,
            items: [
                {
                    id: `${slug}-strategy`,
                    title: 'Discovery & strategy',
                    description: `We clarify goals, users, constraints and success measures before recommending the right approach for ${name.toLowerCase()}.`,
                    image: { src: image, alt: imageAlt },
                },
                {
                    id: `${slug}-design-build`,
                    title: 'Design & development',
                    description: 'We turn the agreed scope into a clear, responsive experience with maintainable implementation and regular reviews.',
                    image: { src: image, alt: imageAlt },
                },
                {
                    id: `${slug}-launch-growth`,
                    title: 'Launch & improvement',
                    description: 'We validate the result, prepare a considered launch and identify the next improvements from real feedback.',
                    image: { src: image, alt: imageAlt },
                },
            ],
        },
        process: {
            title: 'A clear path from idea to impact',
            description: `Our process for ${name.toLowerCase()} keeps priorities visible, decisions collaborative and delivery focused on measurable outcomes.`,
            steps: [
                {
                    id: `${slug}-discover`,
                    number: '01',
                    title: 'Discover',
                    description: 'We align on your goals, audience, current challenges and the outcomes that matter most.',
                    backgroundImage: { src: image, alt: imageAlt },
                    foregroundImage: { src: image, alt: imageAlt },
                },
                {
                    id: `${slug}-plan`,
                    number: '02',
                    title: 'Plan & design',
                    description: 'We define the scope, user journeys, technical direction and a realistic delivery roadmap.',
                    backgroundImage: { src: image, alt: imageAlt },
                    foregroundImage: { src: image, alt: imageAlt },
                },
                {
                    id: `${slug}-build`,
                    number: '03',
                    title: 'Build & validate',
                    description: 'We develop in reviewable stages, test key journeys and keep stakeholders involved throughout.',
                    backgroundImage: { src: image, alt: imageAlt },
                    foregroundImage: { src: image, alt: imageAlt },
                },
                {
                    id: `${slug}-launch`,
                    number: '04',
                    title: 'Launch & evolve',
                    description: 'We prepare launch, share handover guidance and help identify opportunities for continued improvement.',
                    backgroundImage: { src: image, alt: imageAlt },
                    foregroundImage: { src: image, alt: imageAlt },
                },
            ],
        },
        faq: {
            title: `Frequently asked questions about ${name}`,
            items: [
                {
                    question: `What does your ${name.toLowerCase()} service include?`,
                    answer: `We begin with discovery and scope definition, then recommend the right combination of planning, design, implementation, testing and launch support for your requirements.`,
                },
                {
                    question: 'How do you estimate timelines and cost?',
                    answer: 'Timelines and budgets depend on scope, integrations, content, technical constraints and delivery priorities. After an initial discussion, we can outline the key phases and an estimate based on your needs.',
                },
                {
                    question: 'Can you work with our existing team or product?',
                    answer: 'Yes. We can collaborate with your in-house team and review existing systems, code or workflows before agreeing on responsibilities and the best way to move forward.',
                },
            ],
        },
    };
};

export const megaMenuServices: ServiceData[] = serviceDefinitions.map(makeService);
