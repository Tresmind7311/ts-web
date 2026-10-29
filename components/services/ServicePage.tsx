import ServiceHero from './sections/ServiceHero';
import ServiceCapabilities from './sections/ServiceCapabilities';

import type { ServiceData } from '@/data/services/types';
import ServiceShowcase from './sections/ServiceShowcase';
import ServiceProcess from './sections/ServiceProcess';
import ServiceEcosystemSection from './sections/ServiceEcosystemSection';
import ServiceFaq from './sections/ServiceFaq';
import MobileChildPage from './MobileChildPage';

interface ServicePageProps {
    service: ServiceData;
}

export default function ServicePage({
    service,
}: ServicePageProps) {
    if (service.detail) return <MobileChildPage page={service.detail} />;

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
            {service.process ? (
                <ServiceProcess data={service.process} />
            ) : null}
            {service.ecosystem && (
                <ServiceEcosystemSection data={service.ecosystem} />
            )}
            {service.faq && <ServiceFaq data={service.faq} />}
        </main>
    );
}
