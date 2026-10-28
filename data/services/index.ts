import { aiDevelopmentService } from './ai-development';
import { cloudConsultingService } from './cloud-consulting';
import { graphicDesigningService } from './graphic-designing';
import { mobileAppDevelopmentService } from './mobile-app-development';
import { softwareDevelopmentService } from './software-development';
import { webDevelopmentService } from './web-development';
import { megaMenuServices } from './mega-menu-services';

import type { ServiceData } from './types';

export const services = {
    [mobileAppDevelopmentService.slug]: mobileAppDevelopmentService,
    [aiDevelopmentService.slug]: aiDevelopmentService,
    [softwareDevelopmentService.slug]: softwareDevelopmentService,
    [webDevelopmentService.slug]: webDevelopmentService,
    [graphicDesigningService.slug]: graphicDesigningService,
    [cloudConsultingService.slug]: cloudConsultingService,
    ...Object.fromEntries(megaMenuServices.map((service) => [service.slug, service])),
} satisfies Record<string, ServiceData>;

export type ServiceSlug = keyof typeof services;

export const serviceList = Object.values(services).sort(
    (a, b) => a.listing.order - b.listing.order,
);

export function getServiceBySlug(slug: string): ServiceData | undefined {
    return services[slug as ServiceSlug];
}


export const featuredServiceList = serviceList.filter((service) =>
    [
        'mobile-app-development',
        'ai-development',
        'software-development',
        'web-development',
        'graphic-designing',
        'cloud-consulting',
    ].includes(service.slug),
);
