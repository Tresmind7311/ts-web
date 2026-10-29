import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import MobileChildPage from '@/components/services/MobileChildPage';
import { childServicePages, getChildServicePage } from '@/data/services/child-pages';

type Props = { params: Promise<{ slug: string; child: string }> };

export function generateStaticParams() {
    return childServicePages.map(page => ({
        slug: page.parentPath.split('/').at(-1)!,
        child: page.slug,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug, child } = await params;
    const page = getChildServicePage(slug, child);
    if (!page) notFound();

    const url = `https://tresmind.com/services/${slug}/${child}`;
    return {
        title: page.seo.title,
        description: page.seo.description,
        alternates: { canonical: url },
        openGraph: {
            type: 'website',
            url,
            title: page.seo.title,
            description: page.seo.description,
            siteName: 'Tresmind Solutions',
        },
    };
}

export default async function ChildServiceRoute({ params }: Props) {
    const { slug, child } = await params;
    const page = getChildServicePage(slug, child);
    if (!page) notFound();
    return <MobileChildPage page={page} />;
}
