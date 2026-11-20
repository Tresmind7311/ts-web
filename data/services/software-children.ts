import type { ChildPage } from './mobile-children';

export const softwareChildren = {
    'erp-solutions': {
        slug: 'erp-solutions',
        name: 'ERP Solutions',
        seo: {
            title: 'Custom ERP Software Development | Tresmind Solutions',
            description: 'Custom ERP development and ERP integration that connects finance, inventory, purchasing and operations in one system built around your processes.',
        },
        hero: {
            title: 'Custom ERP solutions',
            description: 'Explore ERP approaches for connecting finance, inventory, purchasing, production and other operational workflows.',
            cta: 'Talk about ERP',
            image: { src: '/images/services/software-development/erp-solutions/erp-hero.png', alt: 'ERP dashboard connecting finance, inventory, purchasing, and operations' },
        },
        introduction: {
            title: 'One system for how your operations really run',
            text: 'ERP systems bring back-office processes into a shared system. Depending on business needs, a project may involve configuring an existing platform, connecting specialist tools, or planning a tailored solution.',
        },
        showcaseImages: [0, 1, 2, 3].map(column => {
            const start = column === 0 ? 1 : 5 + 3 * (column - 1);
            return Array.from({ length: column === 0 ? 4 : 3 }, (_, index) => {
                const imageNumber = start + index;
                return {
                    src: `/images/services/software-development/erp-solutions/erp-${imageNumber}.jpg`,
                    alt: `ERP solution dashboard and operational workflow concept ${imageNumber}`,
                };
            });
        }),
        capabilitiesDescription: 'Explore operational modules, integrations and information flows that may be part of an ERP project.',
        cards: [
            { title: 'Custom ERP modules', description: 'Explore inventory, procurement, production planning, warehouse and HR workflows.', image: { src: '/images/services/software-development/erp-solutions/erp-capability-1.jpg', alt: 'Custom ERP modules for inventory, procurement, and operations' } },
            { title: 'ERP customisation', description: 'Consider how fields, workflows and reports could be adapted to a business process.', image: { src: '/images/services/software-development/erp-solutions/erp-capability-2.jpg', alt: 'ERP fields, workflows, and reports tailored to business processes' } },
            { title: 'ERP integration', description: 'Map connections between ERP systems and accounting, commerce, CRM, payroll or logistics tools.', image: { src: '/images/services/software-development/erp-solutions/erp-capability-3.jpg', alt: 'ERP integrations with accounting, commerce, and CRM systems' } },
            { title: 'Data migration', description: 'Plan how records from spreadsheets or legacy systems could be checked and moved.', image: { src: '/images/services/software-development/erp-solutions/erp-capability-4.jpg', alt: 'Business data migration from spreadsheets and legacy systems' } },
        ],
        deliverables: ['Process maps and solution design', 'Configured or custom module scope', 'Integration requirements', 'Data migration and reconciliation plan', 'Training and administration requirements'],
        useCases: {
            title: 'Typical ERP projects',
            items: ['Distributors tracking stock across warehouses', 'Manufacturers planning production and purchasing', 'Service businesses connecting projects, time and invoicing', 'Businesses reviewing disconnected tools and spreadsheets'],
        },
        explainer: {
            title: 'Build, customise or integrate?',
            text: 'Configuring an established platform may fit standard workflows. Connecting specialist tools can be suitable when a full ERP is unnecessary. A tailored system may warrant evaluation for distinctive operations. Compare ownership, licence, training, support and future change costs before selecting an approach.',
            image: { src: '/images/services/software-development/erp-solutions/erp-explainer.jpg', alt: 'ERP planning illustration comparing building, customising, and integrating business systems' },
        },
        process: ['Map how orders, stock and finances move today', 'Compare configuration, integration and tailored options', 'Plan modules and rollout phases', 'Define migration, reconciliation and user testing', 'Prepare training and ongoing change requirements'],
        processForegroundImages: [1, 2, 3, 4, 5].map(step => ({
            src: `/images/services/software-development/erp-solutions/erp-process-foreground-${step}.png`,
            alt: `ERP process step ${step}: ${[
                'Map orders, inventory, and finance workflows',
                'Compare ERP configuration, integration, and custom development',
                'Plan ERP modules and rollout phases',
                'Plan data migration, reconciliation, and user testing',
                'Prepare training and ongoing ERP changes',
            ][step - 1]}`,
        })),
        why: {
            title: 'Planning ERP around real processes',
            text: 'An ERP evaluation should involve the people who manage finance and operations. Document workflows, rollout needs and access requirements before agreeing a solution scope.',
            image: { src: '/images/services/software-development/erp-solutions/erp-ecosystem.png', alt: 'ERP ecosystem connecting finance, inventory, purchasing, and operations' },
        },
        faq: { title: 'ERP Solutions FAQs', items: [
            { question: 'Should we customise an existing ERP or build our own?', answer: 'Compare how well established platforms fit the workflows with the cost and maintenance of a tailored system.' },
            { question: 'Can an ERP connect to an online store?', answer: 'It may be possible to connect orders, stock and customer records. The platforms and data flows need to be reviewed first.' },
            { question: 'How is existing data handled?', answer: 'Plan data mapping, cleanup, test imports and reconciliation with the people responsible for the records.' },
            { question: 'Is an ERP different from a CRM?', answer: 'ERP focuses on internal operations such as inventory and finance; CRM focuses on leads, customers and sales. The two may be connected.' },
            { question: 'Can an ERP be rolled out one department at a time?', answer: 'A phased rollout can be considered when dependencies, training and handoffs between departments are understood.' },
            { question: 'Can staff use an ERP on mobile devices?', answer: 'Mobile access depends on the selected platform and workflows. Identify tasks, devices and access needs during planning.' },
        ] },
        closing: { title: 'Outgrowing your spreadsheets?', text: 'Share how your operations work today to discuss an ERP approach.' },
    },
    'crm-solutions': {
        slug: 'crm-solutions',
        name: 'CRM Solutions',
        seo: {
            title: 'Custom CRM Development & Integration | Tresmind',
            description: 'Custom CRM development, CRM customisation and integrations that give sales and support teams a clear view of every lead, deal and customer.',
        },
        hero: {
            title: 'Custom CRM solutions',
            description: 'Explore CRM approaches for organising leads, sales activity and customer conversations across teams.',
            cta: 'Talk about CRM',
            image: { src: '/images/services/software-development/crm-solutions/crm-hero.png', alt: 'CRM dashboard showing customer records, sales activity, and team conversations' },
        },
        introduction: {
            title: 'Customer relationships, organised',
            text: 'A CRM can bring customer records and sales activity together. Planning should consider the existing process, data quality, integrations and the information each team needs.',
        },
        showcaseImages: [0, 1, 2, 3].map(column => {
            const start = column === 0 ? 1 : 5 + 3 * (column - 1);
            return Array.from({ length: column === 0 ? 4 : 3 }, (_, index) => {
                const imageNumber = start + index;
                return {
                    src: `/images/services/software-development/crm-solutions/crm-${imageNumber}.jpg`,
                    alt: `CRM customer relationship and sales workflow concept ${imageNumber}`,
                };
            });
        }),
        capabilitiesDescription: 'Explore customer records, sales workflows and integrations that may be part of a CRM project.',
        cards: [
            { title: 'Custom CRM builds', description: 'Map pipeline, products and team roles before considering a focused CRM.', image: { src: '/images/services/software-development/crm-solutions/crm-capability-1.jpg', alt: 'CRM illustration with analytics, contacts, settings, and revenue symbols' } },
            { title: 'CRM customisation', description: 'Review how objects, workflows and dashboards may fit an existing platform.', image: { src: '/images/services/software-development/crm-solutions/crm-capability-2.jpg', alt: 'Person reviewing a customised CRM dashboard on a desktop monitor' } },
            { title: 'Integrations and automation', description: 'Identify possible connections to email, forms, telephony, billing and marketing tools.', image: { src: '/images/services/software-development/crm-solutions/crm-capability-3.jpg', alt: 'CRM integration dashboard connecting email, forms, billing, and marketing tools' } },
            { title: 'Customer portals', description: 'Define self-service needs for orders, tickets or shared documents.', image: { src: '/images/services/software-development/crm-solutions/crm-capability-4.jpg', alt: 'Customer portal dashboard showing orders, support tickets, and shared documents' } },
        ],
        deliverables: ['Sales process and data model', 'Pipeline and dashboard requirements', 'Form, email and calendar integration scope', 'Contact and deal history migration plan', 'User guides and training requirements'],
        useCases: {
            title: 'Common CRM projects',
            items: ['B2B sales with longer cycles and several decision-makers', 'Teams tracking proposals, renewals and account activity', 'Support teams connecting ticket and customer history', 'Businesses moving from inboxes or spreadsheets to a pipeline'],
        },
        explainer: {
            title: 'Designing a CRM your team will use',
            text: 'Start with the decisions teams make and the information they need. Reduce unnecessary fields, consider where data capture can be streamlined, and define permissions and reporting before choosing or adapting a platform.',
            image: { src: '/images/services/software-development/crm-solutions/crm-explainer.jpg', alt: 'Team planning CRM needs, user roles, reporting, and platform choice at a whiteboard' },
        },
        process: ['Review sales stages, roles and reporting needs', 'Compare platform customisation with a tailored system', 'Define workflows, automations and integrations', 'Plan contact and deal data cleanup and import', 'Gather user feedback and refine the rollout plan'],
        processForegroundImages: [1, 2, 3, 4, 5].map(step => ({
            src: `/images/services/software-development/crm-solutions/crm-process-foreground-${step}.png`,
            alt: `CRM process step ${step}: ${[
                'Review sales stages, user roles, and reporting needs',
                'Compare CRM customisation with a tailored system',
                'Define CRM workflows, automations, and integrations',
                'Plan customer data cleanup and import',
                'Gather user feedback and refine the CRM rollout',
            ][step - 1]}`,
        })),
        why: {
            title: 'Planning a CRM for adoption',
            text: 'A CRM plan should fit the daily work of sales and support teams. Map manual steps, reporting needs and customer data handling before agreeing a project scope.',
            image: { src: '/images/services/software-development/crm-solutions/crm-ecosystem.png', alt: 'Layered CRM ecosystem illustration linking data, workflows, integrations, reporting, and approvals' },
        },
        faq: { title: 'CRM Solutions FAQs', items: [
            { question: 'Do we need a custom CRM or an off-the-shelf platform?', answer: 'Compare how well existing platforms support the sales process with the cost and maintenance of a custom system.' },
            { question: 'Can website forms connect to a CRM?', answer: 'This depends on the form and CRM systems. Define lead fields, source tracking and assignment rules during integration planning.' },
            { question: 'Can existing contacts be transferred?', answer: 'Plan data review, deduplication, field mapping and test imports before moving contact and deal history.' },
            { question: 'How is a CRM different from an ERP?', answer: 'CRM focuses on customers, leads and sales activity. ERP focuses on internal operations such as stock and finance.' },
            { question: 'Can a CRM record consent preferences?', answer: 'Consent and preference requirements should be defined with the organisation’s legal and privacy advisers.' },
            { question: 'Can a CRM support multiple regions and currencies?', answer: 'Requirements depend on the selected platform and reporting needs; define regions, time zones and currency handling early.' },
        ] },
        closing: { title: 'Losing track of leads?', text: 'Describe your sales process and customer data needs to discuss a CRM approach.' },
    },
    'cms-solutions': {
        slug: 'cms-solutions',
        name: 'CMS Solutions',
        seo: {
            title: 'CMS Development Services | Headless & Custom CMS',
            description: 'Headless, custom and WordPress CMS development so marketing teams can publish content across websites and apps without waiting on developers.',
        },
        hero: {
            title: 'CMS development solutions',
            description: 'Explore content management approaches for publishing and maintaining content across digital channels.',
            cta: 'Discuss your CMS',
            image: { src: '/images/services/software-development/cms-solutions/cms-hero.png', alt: 'CMS dashboard on a laptop linked to media, publishing, integrations, and content analytics' },
        },
        introduction: {
            title: 'Content your team controls',
            text: 'A content management system can help editors maintain structured content and publishing workflows. Platform choice depends on channels, content models, governance and the team that will maintain it.',
        },
        showcaseImages: [0, 1, 2, 3].map(column => {
            const start = column === 0 ? 1 : 5 + 3 * (column - 1);
            return Array.from({ length: column === 0 ? 4 : 3 }, (_, index) => {
                const imageNumber = start + index;
                return {
                    src: `/images/services/software-development/cms-solutions/cms-${imageNumber}.jpg`,
                    alt: `CMS content publishing and editorial workflow concept ${imageNumber}`,
                };
            });
        }),
        capabilitiesDescription: 'Explore content platforms, editor workflows and publishing channels for a CMS project.',
        cards: [
            { title: 'Headless CMS', description: 'Consider structured content delivered through APIs to websites, apps or other channels.', image: { src: '/images/services/software-development/cms-solutions/cms-capability-1.jpg', alt: 'CMS illustration with web content, media, email, and settings' } },
            { title: 'WordPress development', description: 'Review themes, blocks and editorial needs for a familiar content platform.', image: { src: '/images/services/software-development/cms-solutions/cms-capability-2.jpg', alt: 'Person editing website content on a laptop' } },
            { title: 'Custom CMS', description: 'Define content tools for catalogues, documentation or multi-brand requirements.', image: { src: '/images/services/software-development/cms-solutions/cms-capability-3.jpg', alt: 'Content dashboard with charts displayed on desktop and mobile screens' } },
            { title: 'CMS migration', description: 'Plan content transfer, URL mapping and redirect requirements between platforms.', image: { src: '/images/services/software-development/cms-solutions/cms-capability-4.jpg', alt: 'CMS illustration connecting devices and a website' } },
        ],
        deliverables: ['Content model and editor workflow', 'Role and permission requirements', 'Front-end integration and preview scope', 'Content migration and URL map', 'Editor training and documentation requirements'],
        useCases: {
            title: 'Where a CMS can help',
            items: ['Teams publishing campaign pages regularly', 'Organisations sharing content across websites and apps', 'Multi-language or multi-region publishing', 'Teams reviewing an ageing content platform'],
        },
        explainer: {
            title: 'Traditional, headless or custom?',
            text: 'Traditional platforms combine content management and page presentation. Headless platforms deliver structured content to separate front ends. A custom CMS may suit specialised content rules. Compare editor needs, channels, security, hosting and maintenance skills before choosing.',
            image: { src: '/images/services/software-development/cms-solutions/cms-explainer.jpg', alt: 'Team comparing traditional, headless, and custom CMS options on a whiteboard' },
        },
        process: ['Audit content types, editors, languages and channels', 'Model reusable content fields and components', 'Plan platform setup and front-end integration', 'Map migration, URLs and redirects', 'Define editor guidance and handover needs'],
        processForegroundImages: [1, 2, 3, 4, 5].map(step => ({
            src: `/images/services/software-development/cms-solutions/cms-process-foreground-${step}.png`,
            alt: [
                'CMS content audit illustration with users, media, languages, and devices',
                'CMS content model illustration with fields, media, and reusable components',
                'CMS integration illustration with code, settings, and website previews',
                'CMS migration illustration with content transfer, routes, and links',
                'CMS editor handover illustration with guides, checklists, and training',
            ][step - 1],
        })),
        why: {
            title: 'Planning a CMS for editors',
            text: 'An effective CMS plan considers the people who create and approve content. Define content models, permissions, previews and publishing responsibilities before selecting an implementation approach.',
            image: { src: '/images/services/software-development/cms-solutions/cms-ecosystem.png', alt: 'Layered CMS illustration linking editors, content workflows, approvals, access controls, and publishing' },
        },
        faq: { title: 'CMS Solutions FAQs', items: [
            { question: 'What is a headless CMS?', answer: 'It stores structured content and delivers it through an API so that it can be presented by one or more separate front ends.' },
            { question: 'Is WordPress still a good choice?', answer: 'It can suit many sites. Multi-channel publishing or specialised content rules may call for comparing other approaches too.' },
            { question: 'Will a CMS migration affect search rankings?', answer: 'Migrations carry risk. URL mapping, redirects and metadata checks can help manage it, but outcomes cannot be guaranteed.' },
            { question: 'How is this different from web development?', answer: 'Web development covers the broader website. CMS work focuses on content modelling, editor experience, publishing workflows and platform integration.' },
            { question: 'Can a CMS support multiple languages?', answer: 'Language fields and translation workflows can be planned around the content and review process.' },
            { question: 'Can marketing create pages without developers?', answer: 'Reusable page sections can give editors controlled page-building options when the platform and project scope support them.' },
        ] },
        closing: { title: 'Is your CMS slowing you down?', text: 'Tell us what you publish and where to discuss a content platform approach.' },
    },
} satisfies Record<string, ChildPage>;

export type SoftwareChildSlug = keyof typeof softwareChildren;
export const softwareChildList = Object.values(softwareChildren);
export const getSoftwareChild = (parent: string, child: string) =>
    parent === 'software-development' ? softwareChildren[child as SoftwareChildSlug] : undefined;
