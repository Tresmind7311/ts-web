// Only published pages have destinations. Other proposed pages remain visible without links.
export const serviceMenu = [
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
    { label: 'Web Development', href: '/services/web-development', children: ['Ecommerce Website Development', 'Web Application Development'] },
    { label: 'Artificial Intelligence', href: '/services/ai-development', children: ['Generative AI', 'Natural Language Processing', 'AI Agent Development'] },
    { label: 'Cloud Services', href: '/services/cloud-consulting', children: ['Cloud Application Development', 'Cloud Migration', 'Cloud Support & Maintenance'] },
    { label: 'Graphic Design', href: '/services/graphic-designing', children: [] },
    { label: 'Staff Augmentation', children: ['Hire MERN Stack Developers', 'Hire Node.js Developers'] },
    { label: 'Blockchain Development', children: ['Metaverse Development', 'NFT Development'] },
    { label: 'Digital Marketing Services', children: ['Search Engine Optimization', 'Answer Engine Optimization', 'Generative Engine Optimization', 'Social Media Marketing'] },
] as const;
