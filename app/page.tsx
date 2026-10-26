import type { Metadata } from 'next';

import HeroSection from '@/components/sections/home/HeroSection';
import DeferredHomeSections from '@/components/sections/home/DeferredHomeSections';

export const metadata: Metadata = {
    title: 'Software & App Development Company | Tresmind Solutions',
    description:
        'Tresmind Solutions designs and builds mobile apps, AI tools, custom software and websites for businesses in the US, UK, Europe, Australia and the Gulf.',
    alternates: {
        canonical: 'https://tresmind.com/',
    },
    openGraph: {
        type: 'website',
        url: 'https://tresmind.com/',
        title: 'Software & App Development Company | Tresmind Solutions',
        description:
            'Tresmind Solutions designs and builds mobile apps, AI tools, custom software and websites for businesses in the US, UK, Europe, Australia and the Gulf.',
        siteName: 'Tresmind Solutions',
    },
};

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <DeferredHomeSections />
        </main>
    );
}
