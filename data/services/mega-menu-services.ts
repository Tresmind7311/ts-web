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

    // Reuse real project assets, but do not repeat one image across every card
    // and every process step on the same service page.
    const imagePools: Record<string, string[]> = {
        'App Development': [
            image,
            '/images/services/mobile-app-development/Native-Android-Development.jpg',
            '/images/services/mobile-app-development/Cross-Platform-Applications.jpg',
            '/images/services/mobile-app-development/hero-img.png',
        ],
        'Business Solutions': [
            image,
            '/images/services/software-development/hero-image.png',
            '/images/services/software-development/Dashboard.png',
            '/images/services/web-development/web-development.png',
        ],
        'Web Development': [
            image,
            '/images/services/web-development/what-we-build/E-commerce-Websites.png',
            '/images/services/web-development/WEB-DEVELOPMENT-hero-img.png',
            '/images/services/software-development/Dashboard.png',
        ],
        'AI Development': [
            image,
            '/images/services/ai-development/Requirements-Discovery.png',
            '/images/services/ai-development/ai-development-1.png',
            '/images/services/software-development/Dashboard.png',
        ],
        'Cloud Solutions': [
            image,
            '/images/services/cloud-consulting/Cloud-computing-hero.png',
            '/images/services/cloud-consulting/what-we-build/Cloud-Migration.png',
            '/images/services/software-development/Dashboard.png',
        ],
        'Staff Augmentation': [
            image,
            '/images/services/software-development/hero-image.png',
            '/images/services/software-development/Dashboard.png',
            '/images/services/web-development/WEB-DEVELOPMENT-hero-img.png',
        ],
        'Blockchain & Emerging Tech': [
            image,
            '/images/services/software-development/Dashboard.png',
            '/images/services/graphic-designing/hero-img.png',
            '/images/services/web-development/WEB-DEVELOPMENT-hero-img.png',
        ],
        'Digital Marketing': [
            image,
            '/images/services/graphic-designing/graphic-designing-hero.png',
            '/images/services/graphic-designing/hero-img.png',
            '/images/services/web-development/what-we-build/E-commerce-Websites.png',
        ],
    };
    const images = imagePools[group] ?? [image];
    const visual = (index: number) => {
        const src = images[index % images.length];
        return { src, alt: `${name} — ${['planning', 'design', 'implementation', 'delivery'][index % 4]}` };
    };

    const capabilityItems = [
        { key: 'strategy', title: 'Discovery & strategy', description: `We clarify goals, users, constraints and success measures before recommending the right approach for ${name.toLowerCase()}.` },
        { key: 'experience', title: 'User experience & planning', description: `We map key journeys, priorities and requirements so the solution fits real customer and team needs.` },
        { key: 'design', title: 'Design & prototyping', description: `We shape the interface and validate important decisions early, before investing in full implementation.` },
        { key: 'engineering', title: 'Development & integration', description: `We build the agreed scope and connect the systems, data and workflows needed for ${name.toLowerCase()}.` },
        { key: 'quality', title: 'Testing & quality', description: 'We check core journeys, accessibility, responsiveness, reliability and edge cases before release.' },
        { key: 'growth', title: 'Launch & improvement', description: 'We prepare the handover, monitor results and identify sensible improvements after launch.' },
    ];

    const processSteps = [
        { key: 'discover', number: '01', title: 'Discovery & goals', description: 'Align on business goals, audience, current challenges and measurable outcomes.' },
        { key: 'plan', number: '02', title: 'Planning & design', description: 'Define scope, user journeys, technical direction and a realistic delivery roadmap.' },
        { key: 'build', number: '03', title: 'Build & validate', description: 'Deliver in reviewable stages, test important journeys and keep stakeholders involved.' },
        { key: 'launch', number: '04', title: 'Launch & evolve', description: 'Prepare release, hand over documentation and plan ongoing improvements.' },
    ];

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
            offerImage: { src: images[1] ?? image, alt: `${name} delivery visual` },
            order: 20 + order,
        },
        showcase: {
            title: `A closer look at ${name.toLowerCase()}`,
            description: `Explore the planning, design and delivery work behind our ${name.toLowerCase()} service.`,
            columns: [
                { images: [{ src: images[0] ?? image, alt: `${name} — overview` }, { src: images[2] ?? image, alt: `${name} — delivery detail` }] },
                { images: [{ src: images[1] ?? image, alt: `${name} — planning and design` }] },
                { images: [{ src: images[3] ?? image, alt: `${name} — implementation` }, { src: images[0] ?? image, alt: `${name} — solution overview` }] },
            ],
        },
        capabilities: {
            eyebrow: 'How we help',
            title: `What we deliver in ${name.toLowerCase()}`,
            description: `A focused delivery approach for ${name.toLowerCase()}, from early discovery through launch and ongoing improvement.`,
            initialVisibleCount: 6,
            items: capabilityItems.map((item, index) => ({
                id: `${slug}-${item.key}`,
                title: item.title,
                description: item.description,
                image: { ...visual(index), alt: `${name}: ${item.title}` },
            })),
        },
        process: {
            title: `Our ${name.toLowerCase()} process`,
            description: `Our process for ${name.toLowerCase()} keeps priorities visible, decisions collaborative and delivery focused on measurable outcomes.`,
            steps: processSteps.map((step, index) => ({
                id: `${slug}-${step.key}`,
                number: step.number,
                title: step.title,
                description: step.description,
                backgroundImage: { src: images[(index + 1) % images.length] ?? image, alt: `${name} — ${step.title} background` },
                foregroundImage: { src: images[index % images.length] ?? image, alt: `${name} — ${step.title}` },
            })),
        },
        technologyStack: {
            title: `Tools and technologies for ${name.toLowerCase()}`,
            description: `We select the platforms, tools and integrations around your requirements, existing systems and long-term goals.`,
            items: group === 'App Development'
                ? ['iOS & Android', 'React Native / Flutter', 'API integration', 'Authentication', 'Analytics', 'App store release']
                : group === 'AI Development'
                    ? ['LLM integrations', 'Python', 'Data pipelines', 'Vector search', 'Evaluation & monitoring', 'Workflow automation']
                    : group === 'Cloud Solutions'
                        ? ['Cloud architecture', 'Migration planning', 'Identity & access', 'Monitoring', 'Backup & recovery', 'Cost optimization']
                        : group === 'Digital Marketing'
                            ? ['SEO & analytics', 'Content strategy', 'Campaign planning', 'Conversion tracking', 'Audience research', 'Performance reporting']
                            : group === 'Blockchain & Emerging Tech'
                                ? ['Solution architecture', 'Wallet integration', 'Smart contracts', 'Security review', 'Web platforms', 'Analytics']
                                : ['Responsive interfaces', 'API integration', 'Database design', 'Security practices', 'Automated testing', 'Monitoring & analytics'],
        },
        ecosystem: {
            title: `A connected ${name.toLowerCase()} workflow`,
            description: `A successful ${name.toLowerCase()} solution connects people, processes and technology instead of treating each part in isolation.`,
            flow: 'Discover → Plan → Design → Build → Validate → Improve',
            closingText: 'The result is a clearer delivery process, shared ownership and a foundation that can evolve with your business.',
            image: { src: images[2] ?? image, alt: `${name} connected workflow illustration` },
        },
        faq: {
            title: `Frequently asked questions about ${name}`,
            items: [
                { question: `What does your ${name.toLowerCase()} service include?`, answer: `We start with discovery and scope definition, then tailor planning, design, implementation, testing and launch support to your requirements.` },
                { question: 'How do you estimate timelines and cost?', answer: 'Timelines and budgets depend on scope, integrations, content, technical constraints and delivery priorities. After an initial discussion, we outline the phases and estimate.' },
                { question: 'Can you work with our existing team or product?', answer: 'Yes. We can collaborate with your in-house team and review existing systems, code or workflows before agreeing on responsibilities.' },
                { question: 'How do you keep quality on track?', answer: 'We agree acceptance criteria early, review work in stages and test key journeys before release.' },
                { question: 'What happens after launch?', answer: 'We can support handover, monitoring and a prioritized improvement plan based on usage and feedback.' },
            ],
        },
    };
};

export const megaMenuServices: ServiceData[] = serviceDefinitions.map(makeService);
