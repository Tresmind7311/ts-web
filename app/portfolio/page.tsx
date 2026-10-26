import type { Metadata } from 'next';
import PortfolioPage from '@/components/portfolio/PortfolioPage';

export const metadata: Metadata = {
    title: 'Portfolio & Case Studies | Tresmind Solutions',
    description:
        'Explore apps, web platforms, SaaS dashboards and design projects built by Tresmind Solutions for startups and growing businesses around the world.',
    alternates: {
        canonical: 'https://tresmind.com/portfolio',
    },
    openGraph: {
        type: 'website',
        url: 'https://tresmind.com/portfolio',
        title: 'Portfolio & Case Studies | Tresmind Solutions',
        description:
            'Explore apps, web platforms, SaaS dashboards and design projects built by Tresmind Solutions for startups and growing businesses around the world.',
        siteName: 'Tresmind Solutions',
    },
};

export default function Page() {
    return <PortfolioPage />;
}
