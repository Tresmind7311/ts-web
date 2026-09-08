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

export interface ServiceData {
    slug: string;
    name: string;
    seo: ServiceSeoData;
    hero: ServiceHeroData;
    listing: ServiceListingData;
}
