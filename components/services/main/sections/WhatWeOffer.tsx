'use client';

import { useMemo } from 'react';

import ServiceCardsSection from '@/components/services/shared/ServiceCardsSection';
import type { ServiceContentCardItem } from '@/components/services/shared/ServiceContentCard';

import type { ServiceData } from '@/data/services/types';

interface WhatWeOfferProps {
    services: ServiceData[];
}

const INITIAL_SLUGS = [
    'mobile-app-development',
    'web-development',
    'graphic-designing',
];

export default function WhatWeOffer({
    services,
}: WhatWeOfferProps) {
    const items = useMemo<ServiceContentCardItem[]>(() => {
        const featured = INITIAL_SLUGS
            .map(slug =>
                services.find(
                    service => service.slug === slug,
                ),
            )
            .filter(
                (service): service is ServiceData =>
                    Boolean(service),
            );

        const featuredSlugs = new Set(
            featured.map(service => service.slug),
        );

        const remaining = services.filter(
            service =>
                !featuredSlugs.has(service.slug),
        );

        return [...featured, ...remaining].map(
            service => ({
                id: service.slug,
                title: service.name,
                description:
                    service.listing.shortDescription,
                image: service.listing.offerImage,
                href: `/services/${service.slug}`,
            }),
        );
    }, [services]);

    return (
        <ServiceCardsSection
            id="what-we-offer-heading"
            eyebrow="Our Services"
            title="What We Offer"
            description="Our services are designed to unlock your digital potential, enhance efficiency, and create lasting impact."
            items={items}
            initialVisibleCount={3}
            expandable
            columns={3}
            showTextLink
        />
    );
}