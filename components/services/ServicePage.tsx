import ServiceHero from './sections/ServiceHero';
import ServiceCapabilities from './sections/ServiceCapabilities';

import type { ServiceData } from '@/data/services/types';
import ServiceShowcase from './sections/ServiceShowcase';
import ServiceProcess from './sections/ServiceProcess';
import TestimonialsSection from '../sections/home/TestimonialsSection';
import { serviceTestimonials } from '@/data/testimonials/serviceTestimonials';
import ServiceEcosystemSection from './sections/ServiceEcosystemSection';

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
            {service.process ? (
                <ServiceProcess data={service.process} />
            ) : null}
            {service.ecosystem && (
                <ServiceEcosystemSection data={service.ecosystem} />
            )}
            <TestimonialsSection testimonials={serviceTestimonials} />
        </main>
    );
}