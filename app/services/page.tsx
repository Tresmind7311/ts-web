import type { Metadata } from 'next';

import ServicesMainPage from '@/components/services/main/ServicesMainPage';

export const metadata: Metadata = {
    title: 'Our Services | Tresmind',
    description:
        'Explore Tresmind services across mobile apps, AI, software, web, graphic design and cloud consulting.',
};

export default function ServicesPage() {
    return <ServicesMainPage />;
}
