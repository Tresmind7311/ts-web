'use client';

import ServiceCardsSection from '@/components/services/shared/ServiceCardsSection';
import type { ServiceCapabilitiesData } from '@/data/services/types';

interface ServiceCapabilitiesProps {
    data: ServiceCapabilitiesData;
}

export default function ServiceCapabilities({
    data,
}: ServiceCapabilitiesProps) {
    const initialVisibleCount = data.initialVisibleCount ?? 4;

    return (
        <ServiceCardsSection
            id="service-capabilities-heading"
            eyebrow={data.eyebrow}
            title={data.title}
            description={data.description}
            items={data.items}
            initialVisibleCount={initialVisibleCount}
            expandable={data.items.length > initialVisibleCount}
            columns={4}
            showTextLink={false}
        />
    );
}
