import type { MetadataRoute } from 'next';

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
    ].map((path) => ({ url: `${origin}${path}` }));
}
