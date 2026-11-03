import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ServicePage from '@/components/services/ServicePage';
import GraphicDesignJsonLd from '@/components/services/GraphicDesignJsonLd';
import { getServiceBySlug, serviceList } from '@/data/services';

interface ServiceRouteProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return serviceList.map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({
    params,
}: ServiceRouteProps): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        return {};
    }

    return {
        title: service.seo.title,
        description: service.seo.description,
        alternates: {
            canonical: `https://tresmind.com/services/${service.slug}`,
        },
        openGraph: {
            type: 'website',
            url: `https://tresmind.com/services/${service.slug}`,
            title: service.seo.title,
            description: service.seo.description,
            siteName: 'Tresmind Solutions',
        },
    };
}

export default async function ServiceRoute({ params }: ServiceRouteProps) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    return <>
        {slug === 'graphic-designing' && <GraphicDesignJsonLd name="Graphic Design" description={service.seo.description} path="/services/graphic-designing" />}
        <ServicePage service={service} />
    </>;
}
