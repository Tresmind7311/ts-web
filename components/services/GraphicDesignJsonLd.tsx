const origin = 'https://tresmind.com';

export default function GraphicDesignJsonLd({ name, description, path, child }: {
    name: string; description: string; path: string; child?: boolean;
}) {
    const breadcrumbs = [
        { name: 'Home', item: origin },
        { name: 'Services', item: `${origin}/services` },
        { name: 'Graphic Design', item: `${origin}/services/graphic-designing` },
        ...(child ? [{ name, item: `${origin}${path}` }] : []),
    ];
    const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
            { '@type': 'Service', name, serviceType: name, description, url: `${origin}${path}`, provider: { '@type': 'Organization', name: 'Tresmind Solutions', url: origin } },
            { '@type': 'BreadcrumbList', itemListElement: breadcrumbs.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) },
        ],
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />;
}
