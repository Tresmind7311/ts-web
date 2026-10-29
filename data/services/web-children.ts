import type { ChildPage } from './mobile-children';

export const webChildren = {
    'ecommerce-website-development': {
        slug: 'ecommerce-website-development',
        name: 'Ecommerce Website Development',
        seo: { title: 'Ecommerce Website Development | Tresmind Solutions', description: 'Plan an ecommerce website with product browsing, checkout, payments, shipping and inventory integrations tailored to your store.' },
        hero: { title: 'Ecommerce website development', description: 'Plan an online store that makes products easy to find and connects checkout with the operations behind it.', cta: 'Plan my store' },
        introduction: { title: 'Online stores built to sell', text: 'A store brings product data, search, checkout, payments, shipping, taxes and stock together. Platform choice and mobile experience should follow your catalogue, markets and operational needs.' },
        capabilitiesDescription: 'Explore the store models and workflows that fit your products and customers.',
        cards: [
            { title: 'Shopify stores', description: 'Consider managed commerce, themes, apps and checkout requirements.', image: { src: '/images/services/web-development/what-we-build/E-commerce-Websites.png', alt: 'Ecommerce website illustration' } },
            { title: 'WooCommerce stores', description: 'Explore a WordPress-based store with control over hosting and content.', image: { src: '/images/services/web-development/what-we-build/CMS-Websites.png', alt: 'Content management website illustration' } },
            { title: 'Headless commerce', description: 'Assess a custom storefront connected to a commerce backend when the experience calls for it.', image: { src: '/images/services/web-development/what-we-build/web-applications.png', alt: 'Web application illustration' } },
            { title: 'B2B and wholesale', description: 'Define customer pricing, bulk orders and account approval workflows.', image: { src: '/images/services/web-development/what-we-build/Business-Websites.png', alt: 'Business website illustration' } },
        ],
        deliverables: ['Store UX and key template requirements', 'Product and collection setup scope', 'Payment, shipping and tax requirements', 'Inventory or fulfilment integration plan', 'Analytics and conversion tracking requirements'],
        useCases: { title: 'Store projects we can help with', items: ['A brand planning its first direct-to-consumer store', 'A retailer moving beyond a marketplace', 'A store reviewing a slow or complex platform', 'A business planning sales across currencies and regions'] },
        explainer: { title: 'Selling across borders', text: 'Markets can differ in tax, duties, shipping, payment methods and language. Define the target regions and checkout requirements early; confirm final tax and legal settings with your advisers.' },
        process: ['Map catalogue, payments, shipping, taxes and integrations', 'Design product, collection, cart and checkout journeys', 'Build the store and agreed operational connections', 'Test orders, refunds, tax and shipping scenarios', 'Plan launch, analytics and improvement priorities'],
        why: { title: 'Planning the whole store', text: 'Store planning should include how orders reach fulfilment, how stock changes and how returns are handled, alongside the customer experience.' },
        faq: { title: 'Ecommerce Website Development FAQs', items: [
            { question: 'Shopify or WooCommerce: which should we choose?', answer: 'Compare a managed platform with the hosting and content control of WordPress against your catalogue, integrations and maintenance needs.' },
            { question: 'Can you migrate our existing store?', answer: 'Migration scope should cover products, customers, order history and redirects after the source platform and data are reviewed.' },
            { question: 'Do you support multiple currencies and languages?', answer: 'Define markets, currencies, languages and platform capabilities during planning before selecting an approach.' },
            { question: 'Can the store sync with our inventory system?', answer: 'Review the inventory platform and the required order and stock flows to assess an integration.' },
            { question: 'Will the store be fast on mobile?', answer: 'Set mobile performance goals and test images, scripts, themes and checkout on the devices that matter to your customers.' },
            { question: 'Can you improve our existing store instead of rebuilding?', answer: 'An audit of speed, user journeys and integrations can help decide whether targeted changes or a rebuild makes sense.' },
        ] },
        closing: { title: 'Ready to sell online?', text: 'Tell us about your products, customers and markets to begin scoping the store.' },
    },
    'web-application-development': {
        slug: 'web-application-development',
        name: 'Web Application Development',
        seo: { title: 'Web Application Development Services | Tresmind', description: 'Plan a web application for SaaS, portals, dashboards or booking, with clear user journeys, access controls, integrations and deployment needs.' },
        hero: { title: 'Web application development', description: 'Plan a browser-based product for the tasks your users need to complete, from portals and booking to dashboards and SaaS.', cta: 'Scope my web app' },
        introduction: { title: 'Software that runs in the browser', text: 'A web application can manage accounts, permissions and data as well as present information. Define the user journeys, security needs and integrations before choosing architecture or hosting.' },
        capabilitiesDescription: 'Explore common browser-based products and the requirements behind them.',
        cards: [
            { title: 'SaaS products', description: 'Plan subscriptions, user roles and administration around a focused product scope.', image: { src: '/images/services/web-development/what-we-build/web-applications.png', alt: 'Web application illustration' } },
            { title: 'Portals and dashboards', description: 'Define access to data and documents for clients, partners or staff.', image: { src: '/images/services/software-development/what-we-build/Dashboards-Portals.png', alt: 'Business dashboard illustration' } },
            { title: 'Progressive web apps', description: 'Assess installation and offline use where the user journey requires them.', image: { src: '/images/services/web-development/web-dev-4.png', alt: 'Web interface illustration' } },
            { title: 'Booking and marketplaces', description: 'Map scheduling, listings, payments and the needs of each user group.', image: { src: '/images/services/web-development/what-we-build/Business-Websites.png', alt: 'Business website illustration' } },
        ],
        deliverables: ['Product scope and user journeys', 'Architecture and API requirements', 'Responsive application and admin scope', 'Testing and deployment requirements', 'Hosting, monitoring and handover plan'],
        useCases: { title: 'Who web apps can serve', items: ['Founders validating a SaaS idea', 'Companies planning a client-facing portal', 'Teams modernising a legacy web system', 'Service businesses needing online booking and payments'] },
        explainer: { title: 'Building an MVP that can grow', text: 'Start with the smallest useful version of the core journeys. Plan the data model, access controls and hosting with later changes in mind, then prioritize further features using user feedback.' },
        process: ['Identify users, core journeys and MVP scope', 'Plan data, APIs, authentication and hosting', 'Build and review the agreed features in stages', 'Test access controls, functionality and performance', 'Prepare deployment, monitoring and the next roadmap'],
        why: { title: 'Planning for maintainability', text: 'Documented APIs, test requirements and clear deployment ownership help a future team understand and maintain the application. Agree these expectations in the project scope.' },
        faq: { title: 'Web Application Development FAQs', items: [
            { question: 'What is the difference between a website and a web app?', answer: 'A website mainly presents information; a web app lets people manage data or complete tasks in a browser.' },
            { question: 'Can you build an MVP first?', answer: 'Define a focused first version around the most important user journey, then use feedback to decide what comes next.' },
            { question: 'Who owns the code?', answer: 'Code ownership and handover terms should be stated in the agreement and statement of work before development starts.' },
            { question: 'Can you take over an existing web app?', answer: 'Review the code, dependencies, security and deployment setup before proposing changes.' },
            { question: 'Will the app work on mobile?', answer: 'Responsive and offline or installable behavior should be defined against the devices and tasks your users need.' },
            { question: 'Can you integrate the app with our other systems?', answer: 'List the systems, APIs, data flows and reliability requirements so integration feasibility can be assessed.' },
        ] },
        closing: { title: 'Have a web app idea?', text: 'Tell us what users need to do so the first version can be scoped.' },
    },
} satisfies Record<string, ChildPage>;

export const webChildList: ChildPage[] = Object.values(webChildren);
