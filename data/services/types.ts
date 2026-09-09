export interface ServiceHeroData {
    eyebrow?: string;
    title: string;
    description: string;
    primaryCta: {
        label: string;
        href: string;
    };
    secondaryCta: {
        label: string;
        href: string;
    };
    image: {
        src: string;
        alt: string;
    };
}

export interface ServiceSeoData {
    title: string;
    description: string;
}

export interface ServiceListingData {
    shortDescription: string;
    showcaseImage: {
        src: string;
        alt: string;
    };
    offerImage: {
        src: string;
        alt: string;
    };
    order: number;
}

export interface ServiceCapabilityItem {
    id: string;
    title: string;
    description: string;
    image: {
        src: string;
        alt: string;
    };
    href?: string;
}

export interface ServiceCapabilitiesData {
    eyebrow?: string;
    title: string;
    description?: string;
    items: ServiceCapabilityItem[];
    initialVisibleCount?: number;
}

export interface ServiceData {
    slug: string;
    name: string;
    seo: ServiceSeoData;
    hero: ServiceHeroData;
    listing: ServiceListingData;

    showcase?: ServiceShowcaseData;
    capabilities?: ServiceCapabilitiesData;
}

export interface ServiceShowcaseImage {
    src: string;
    alt: string;
}

export interface ServiceShowcaseColumn {
    images: ServiceShowcaseImage[];
}

export interface ServiceShowcaseData {
    title: string;
    description: string;
    placeholder?: boolean;
    columns: ServiceShowcaseColumn[];
}