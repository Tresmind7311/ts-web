import type { Metadata } from 'next';

import ServicesMainPage from '@/components/services/main/ServicesMainPage';

export const metadata: Metadata = {
    title: 'IT & Technology Services for Businesses | Tresmind',
    description:
        'Mobile apps, AI development, custom software, web development, graphic design and cloud consulting: one team, from first idea to launch and beyond.',
    alternates: {
        canonical: 'https://tresmind.com/services',
    },
    openGraph: {
        type: 'website',
        url: 'https://tresmind.com/services',
        title: 'IT & Technology Services for Businesses | Tresmind',
        description:
            'Mobile apps, AI development, custom software, web development, graphic design and cloud consulting: one team, from first idea to launch and beyond.',
        siteName: 'Tresmind Solutions',
    },
};

export default function ServicesPage() {
    return <ServicesMainPage />;
}
