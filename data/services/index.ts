import { aiDevelopmentService } from './ai-development';
import { cloudConsultingService } from './cloud-consulting';
import { graphicDesigningService } from './graphic-designing';
import { mobileAppDevelopmentService } from './mobile-app-development';
import { softwareDevelopmentService } from './software-development';
import { webDevelopmentService } from './web-development';

import type { ServiceData } from './types';

export const services = {
    [mobileAppDevelopmentService.slug]: mobileAppDevelopmentService,
    [aiDevelopmentService.slug]: aiDevelopmentService,
    [softwareDevelopmentService.slug]: softwareDevelopmentService,
    [webDevelopmentService.slug]: webDevelopmentService,
    [graphicDesigningService.slug]: graphicDesigningService,
    [cloudConsultingService.slug]: cloudConsultingService,
} satisfies Record<string, ServiceData>;

export type ServiceSlug = keyof typeof services;

export const serviceList = Object.values(services).sort(
    (a, b) => a.listing.order - b.listing.order,
);

export function getServiceBySlug(slug: string): ServiceData | undefined {
    return services[slug as ServiceSlug];
}
