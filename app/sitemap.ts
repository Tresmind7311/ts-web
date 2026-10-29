import type { MetadataRoute } from 'next';
import { childServicePages } from '@/data/services/child-pages';

const origin = 'https://tresmind.com';

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        '/',
        '/services',
        '/services/mobile-app-development',
        '/services/ai-development',
        '/services/software-development',
        '/services/web-development',
        '/services/graphic-designing',
        '/services/cloud-consulting',
        '/portfolio',
        '/contact',
        '/privacy-policy',
        '/terms-and-conditions',
        ...childServicePages.map(page => `${page.parentPath}/${page.slug}`),
    ].map((path) => ({ url: `${origin}${path}` }));
}
