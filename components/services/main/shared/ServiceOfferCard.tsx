'use client';

import ServiceContentCard from '@/components/services/shared/ServiceContentCard';
import type { ServiceData } from '@/data/services/types';

interface ServiceOfferCardProps {
    service: ServiceData;
}

export default function ServiceOfferCard({
    service,
}: ServiceOfferCardProps) {
    return (
        <ServiceContentCard
            item={{
                id: service.slug,
                title: service.name,
                description: service.listing.shortDescription,
                image: service.listing.offerImage,
                href: `/services/${service.slug}`,
            }}
            showTextLink
        />
    );
}
