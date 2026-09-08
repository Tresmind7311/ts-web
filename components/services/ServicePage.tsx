import ServiceHero from './sections/ServiceHero';

import type { ServiceData } from '@/data/services/types';

interface ServicePageProps {
    service: ServiceData;
}

export default function ServicePage({ service }: ServicePageProps) {
    return (
        <main>
            <ServiceHero data={service.hero} />
        </main>
    );
}
