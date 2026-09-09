import ServiceHero from './sections/ServiceHero';
import ServiceCapabilities from './sections/ServiceCapabilities';

import type { ServiceData } from '@/data/services/types';
import ServiceShowcase from './sections/ServiceShowcase';

interface ServicePageProps {
    service: ServiceData;
}

export default function ServicePage({
    service,
}: ServicePageProps) {
    return (
        <main>
            <ServiceHero data={service.hero} />
            {service.showcase ? (
                <ServiceShowcase data={service.showcase} />
            ) : null}
            {service.capabilities ? (
                <ServiceCapabilities
                    data={service.capabilities}
                />
            ) : null}
        </main>
    );
}