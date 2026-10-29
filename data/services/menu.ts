// Only published pages have destinations. Other proposed pages remain visible without links.
type ServiceMenuCategory = (
    | { label: string; href: string }
    | { label: string }
) & { children: readonly (string | { label: string; href: string })[] };

export const serviceMenu: readonly ServiceMenuCategory[] = [
    { label: 'Mobile App Development', href: '/services/mobile-app-development', children: [
        { label: 'iOS App Development', href: '/services/mobile-app-development/ios-app-development' },
        { label: 'Android App Development', href: '/services/mobile-app-development/android-app-development' },
        { label: 'Cross-Platform App Development', href: '/services/mobile-app-development/cross-platform-app-development' },
    ] },
    { label: 'Custom Software Development', href: '/services/software-development', children: [
        { label: 'ERP Solutions', href: '/services/software-development/erp-solutions' },
        { label: 'CRM Solutions', href: '/services/software-development/crm-solutions' },
        { label: 'CMS Solutions', href: '/services/software-development/cms-solutions' },
    ] },
    { label: 'Web Development', href: '/services/web-development', children: [
        { label: 'Ecommerce Website Development', href: '/services/web-development/ecommerce-website-development' },
        { label: 'Web Application Development', href: '/services/web-development/web-application-development' },
    ] },
    { label: 'Artificial Intelligence', href: '/services/ai-development', children: [
        { label: 'Generative AI', href: '/services/ai-development/generative-ai' },
        { label: 'Natural Language Processing', href: '/services/ai-development/natural-language-processing' },
        { label: 'AI Agent Development', href: '/services/ai-development/ai-agent-development' },
    ] },
    { label: 'Cloud Services', href: '/services/cloud-consulting', children: [
        { label: 'Cloud Application Development', href: '/services/cloud-consulting/cloud-application-development' },
        { label: 'Cloud Migration', href: '/services/cloud-consulting/cloud-migration' },
        { label: 'Cloud Support & Maintenance', href: '/services/cloud-consulting/cloud-support-and-maintenance' },
    ] },
    { label: 'Graphic Design', href: '/services/graphic-designing', children: [] },
    { label: 'Staff Augmentation', href: '/services/staff-augmentation', children: [
        { label: 'Hire MERN Stack Developers', href: '/services/staff-augmentation/hire-mern-stack-developers' },
        { label: 'Hire Node.js Developers', href: '/services/staff-augmentation/hire-nodejs-developers' },
    ] },
    { label: 'Blockchain Development', href: '/services/blockchain-development', children: [
        { label: 'Metaverse Development', href: '/services/blockchain-development/metaverse-development' },
        { label: 'NFT Development', href: '/services/blockchain-development/nft-development' },
    ] },
    { label: 'Digital Marketing Services', href: '/services/digital-marketing', children: [
        { label: 'Search Engine Optimization', href: '/services/digital-marketing/search-engine-optimization' },
        { label: 'Answer Engine Optimization', href: '/services/digital-marketing/answer-engine-optimization' },
        { label: 'Generative Engine Optimization', href: '/services/digital-marketing/generative-engine-optimization' },
        { label: 'Social Media Marketing', href: '/services/digital-marketing/social-media-marketing' },
    ] },
];
