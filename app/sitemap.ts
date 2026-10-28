import type { MetadataRoute } from 'next';
import { serviceList } from '@/data/services';

const origin = 'https://tresmind.com';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        '/',
        '/services',
        ...serviceList.map((service) => `/services/${service.slug}`),
        '/portfolio',
        '/contact',
        '/privacy-policy',
        '/terms-and-conditions',
    ].map((path) => ({ url: `${origin}${path}` }));
}
