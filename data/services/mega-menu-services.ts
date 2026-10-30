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

    const contentByGroup: Record<string, { capabilities: Array<{ key: string; title: string; description: string }>; process: Array<{ key: string; number: string; title: string; description: string }> }> = {
        'App Development': {
            capabilities: [
                { key: 'product', title: 'Product discovery & roadmap', description: 'Prioritize user needs, platform requirements and a realistic first release before development begins.' },
                { key: 'ux', title: 'Mobile UX & interface design', description: 'Map intuitive mobile journeys, accessible interactions and interface patterns that feel natural on the target devices.' },
                { key: 'architecture', title: 'App architecture & APIs', description: 'Plan app structure, authentication, API contracts, offline states and secure data exchange.' },
                { key: 'engineering', title: 'Native & cross-platform builds', description: 'Implement the app for the selected platforms with reusable components and maintainable code.' },
                { key: 'qa', title: 'Device testing & performance', description: 'Validate layouts, permissions, loading states, crashes and performance across representative devices.' },
                { key: 'release', title: 'Store release & iteration', description: 'Prepare store assets, release checks, analytics and a post-launch improvement backlog.' },
            ],
            process: [
                { key: 'discover', number: '01', title: 'Product discovery', description: 'Confirm user needs, platform scope, must-have features and launch success measures.' },
                { key: 'prototype', number: '02', title: 'UX & prototype', description: 'Validate navigation, key screens and important mobile interactions before full build.' },
                { key: 'engineer', number: '03', title: 'Build & device QA', description: 'Develop in reviewable increments and test integrations, devices and release-critical flows.' },
                { key: 'release', number: '04', title: 'Release & improve', description: 'Prepare the store submission, monitor feedback and prioritize the next improvements.' },
            ],
        },
        'Business Solutions': {
            capabilities: [
                { key: 'workflow', title: 'Workflow & requirements mapping', description: 'Map how teams currently handle records, approvals, reporting and handoffs to identify the right system scope.' },
                { key: 'data', title: 'Data model & migration planning', description: 'Define core entities, permissions, data quality rules and a safe approach to importing existing information.' },
                { key: 'configuration', title: 'System configuration & UX', description: 'Shape dashboards, roles, forms and workflows around how your team actually works.' },
                { key: 'integration', title: 'Business system integrations', description: 'Connect relevant finance, sales, inventory, content and communication tools through reliable integrations.' },
                { key: 'security', title: 'Access control & validation', description: 'Test role permissions, critical workflows, reporting accuracy and recovery paths before rollout.' },
                { key: 'adoption', title: 'Rollout & team enablement', description: 'Prepare documentation, team onboarding and a phased adoption plan to make the new system useful.' },
            ],
            process: [
                { key: 'audit', number: '01', title: 'Process discovery', description: 'Review current systems, pain points, data sources and the outcomes teams need.' },
                { key: 'model', number: '02', title: 'Solution blueprint', description: 'Agree on workflows, data structure, roles, reports and integration boundaries.' },
                { key: 'configure', number: '03', title: 'Configure & validate', description: 'Build and integrate the solution, then validate representative real-world scenarios.' },
                { key: 'adopt', number: '04', title: 'Rollout & optimize', description: 'Support adoption, monitor usage and refine workflows based on team feedback.' },
            ],
        },
        'Web Development': {
            capabilities: [
                { key: 'strategy', title: 'Website strategy & structure', description: 'Plan audience journeys, page hierarchy, conversion goals and the content needed to support them.' },
                { key: 'design', title: 'Responsive UI & UX', description: 'Create a consistent visual system with accessible layouts and clear actions across desktop and mobile.' },
                { key: 'frontend', title: 'Frontend development', description: 'Build fast, maintainable interfaces with reusable components and responsive behavior.' },
                { key: 'backend', title: 'CMS, commerce & integrations', description: 'Connect content management, product catalogs, checkout, APIs and business tools where required.' },
                { key: 'performance', title: 'SEO, speed & quality', description: 'Improve semantic structure, loading performance, accessibility and key user journeys.' },
                { key: 'growth', title: 'Launch & conversion improvement', description: 'Validate analytics and forms, support launch and use real behavior to guide future improvements.' },
            ],
            process: [
                { key: 'discover', number: '01', title: 'Goals & site structure', description: 'Define audiences, conversion goals, content requirements and the page architecture.' },
                { key: 'design', number: '02', title: 'Design & prototype', description: 'Establish the visual system and validate important pages and responsive layouts.' },
                { key: 'develop', number: '03', title: 'Develop & integrate', description: 'Build the site, connect CMS or commerce features and test performance across devices.' },
                { key: 'launch', number: '04', title: 'Launch & optimize', description: 'Check analytics, redirects, forms and SEO essentials before release and ongoing iteration.' },
            ],
        },
        'AI Development': {
            capabilities: [
                { key: 'usecase', title: 'Use-case & data assessment', description: 'Identify a valuable workflow, available data, risk boundaries and measurable acceptance criteria.' },
                { key: 'architecture', title: 'AI solution architecture', description: 'Choose suitable models, retrieval patterns and integrations based on accuracy, latency and cost.' },
                { key: 'grounding', title: 'Knowledge & retrieval setup', description: 'Prepare source data, permissions and retrieval so responses can be grounded in approved information.' },
                { key: 'integration', title: 'Workflow & tool integration', description: 'Connect AI capabilities to approved business tools while keeping important actions reviewable.' },
                { key: 'evaluation', title: 'Evaluation & guardrails', description: 'Test representative cases, factuality, fallback behavior, privacy and unsafe or out-of-scope requests.' },
                { key: 'monitoring', title: 'Deployment & monitoring', description: 'Track quality, usage and cost, then refine prompts, retrieval and workflows from observed results.' },
            ],
            process: [
                { key: 'scope', number: '01', title: 'Use case & data audit', description: 'Agree on the target workflow, success measures, source data and risk boundaries.' },
                { key: 'prototype', number: '02', title: 'Prototype & evaluate', description: 'Test model and retrieval options against realistic examples before committing to production.' },
                { key: 'integrate', number: '03', title: 'Integrate with guardrails', description: 'Connect the workflow, permissions, monitoring and human review where decisions matter.' },
                { key: 'improve', number: '04', title: 'Deploy & improve', description: 'Measure quality, cost and adoption, then improve using feedback and evaluation results.' },
            ],
        },
        'Cloud Solutions': {
            capabilities: [
                { key: 'assessment', title: 'Cloud readiness assessment', description: 'Review workloads, dependencies, security needs and operating constraints before selecting a migration path.' },
                { key: 'architecture', title: 'Cloud architecture & networking', description: 'Plan environments, network boundaries, identity, resilience and deployment patterns.' },
                { key: 'migration', title: 'Migration & modernization', description: 'Move workloads in controlled phases with validation, rollback planning and continuity in mind.' },
                { key: 'automation', title: 'Infrastructure automation', description: 'Standardize repeatable environments, configuration and deployment workflows.' },
                { key: 'observability', title: 'Monitoring & reliability', description: 'Establish actionable logs, metrics, alerts, backups and recovery procedures.' },
                { key: 'optimization', title: 'Cost & performance optimization', description: 'Review resource usage, scaling behavior and cloud spend to prioritize sustainable improvements.' },
            ],
            process: [
                { key: 'assess', number: '01', title: 'Assess workloads', description: 'Inventory applications, dependencies, risks and service requirements.' },
                { key: 'architect', number: '02', title: 'Plan target architecture', description: 'Define migration waves, security controls, recovery and rollback strategies.' },
                { key: 'migrate', number: '03', title: 'Migrate & validate', description: 'Move workloads in controlled stages and test performance, data integrity and access.' },
                { key: 'operate', number: '04', title: 'Monitor & optimize', description: 'Set up observability, cost reviews and a practical reliability improvement cycle.' },
            ],
        },
        'Staff Augmentation': {
            capabilities: [
                { key: 'needs', title: 'Skills & delivery needs', description: 'Clarify the role, technical skills, collaboration style and outcomes the team needs to deliver.' },
                { key: 'matching', title: 'Engineer matching', description: 'Match relevant experience to your stack, project stage and team working practices.' },
                { key: 'onboarding', title: 'Team onboarding', description: 'Align access, code standards, communication routines and the first delivery milestones.' },
                { key: 'delivery', title: 'Embedded delivery support', description: 'Collaborate within your existing planning, review and release workflows.' },
                { key: 'visibility', title: 'Progress & quality reviews', description: 'Keep work visible through agreed tasks, code reviews, demos and regular feedback.' },
                { key: 'scale', title: 'Flexible team scaling', description: 'Review priorities and adjust capacity as project needs and delivery phases change.' },
            ],
            process: [
                { key: 'brief', number: '01', title: 'Define the role', description: 'Confirm responsibilities, stack, seniority, time zone and delivery expectations.' },
                { key: 'match', number: '02', title: 'Match & interview', description: 'Review relevant experience and validate technical and collaboration fit.' },
                { key: 'onboard', number: '03', title: 'Onboard to your team', description: 'Set up tools, access, code practices and a clear first milestone.' },
                { key: 'deliver', number: '04', title: 'Review & scale', description: 'Track outcomes and adjust capacity as your roadmap evolves.' },
            ],
        },
        'Blockchain & Emerging Tech': {
            capabilities: [
                { key: 'usecase', title: 'Use-case validation', description: 'Check whether distributed or immersive technology adds real value to the intended user journey.' },
                { key: 'architecture', title: 'Product & system architecture', description: 'Define the user experience, platform boundaries, integrations and operational model.' },
                { key: 'experience', title: 'Wallet & interaction design', description: 'Make onboarding, ownership, identity and interactive experiences understandable to users.' },
                { key: 'engineering', title: 'Platform & contract development', description: 'Implement the agreed product features with attention to maintainability and security.' },
                { key: 'security', title: 'Testing & security review', description: 'Test edge cases, permissions, transaction flows and recovery behavior before release.' },
                { key: 'launch', title: 'Launch & ecosystem support', description: 'Prepare documentation, monitoring and a roadmap for measured post-launch improvements.' },
            ],
            process: [
                { key: 'validate', number: '01', title: 'Validate the use case', description: 'Define user value, constraints, risks and the smallest useful product scope.' },
                { key: 'design', number: '02', title: 'Design the experience', description: 'Map onboarding, interaction flows, architecture and security requirements.' },
                { key: 'build', number: '03', title: 'Build & test', description: 'Implement the product and validate important flows and failure scenarios.' },
                { key: 'launch', number: '04', title: 'Launch responsibly', description: 'Prepare monitoring, documentation and a controlled plan for future iterations.' },
            ],
        },
        'Digital Marketing': {
            capabilities: [
                { key: 'research', title: 'Audience & search research', description: 'Understand customer intent, competitive context and the questions your content needs to answer.' },
                { key: 'strategy', title: 'Channel & content strategy', description: 'Prioritize channels and content themes around business goals, audience needs and available resources.' },
                { key: 'technical', title: 'Technical & on-page optimization', description: 'Improve crawlability, page structure, metadata, internal links and the clarity of key landing pages.' },
                { key: 'campaigns', title: 'Campaign & creative execution', description: 'Plan consistent messaging, channel-specific creative and campaigns with clear calls to action.' },
                { key: 'measurement', title: 'Analytics & attribution', description: 'Set up meaningful conversion events and reporting to understand which activity contributes to outcomes.' },
                { key: 'iteration', title: 'Test & optimize', description: 'Use performance signals to refine content, targeting, landing pages and campaign spend.' },
            ],
            process: [
                { key: 'audit', number: '01', title: 'Audit & research', description: 'Review the current presence, audience, competitors and measurable business goals.' },
                { key: 'plan', number: '02', title: 'Strategy & priorities', description: 'Choose channels, content themes, campaign objectives and tracking requirements.' },
                { key: 'execute', number: '03', title: 'Launch & measure', description: 'Publish, run campaigns and monitor agreed performance indicators.' },
                { key: 'optimize', number: '04', title: 'Learn & improve', description: 'Use results to refine creative, content, targeting and conversion journeys.' },
            ],
        },
    };
    const selectedContent = contentByGroup[group];
    const capabilityItems = selectedContent.capabilities;
    const processSteps = selectedContent.process;

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
