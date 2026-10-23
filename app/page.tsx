import type { Metadata } from 'next';

import HeroSection from '@/components/sections/home/HeroSection';
import DeferredHomeSections from '@/components/sections/home/DeferredHomeSections';

export const metadata: Metadata = {
    title: 'Software & App Development Company | Tresmind Solutions',
    description:
        'Tresmind Solutions designs and builds mobile apps, AI tools, custom software and websites for businesses in the US, UK, Europe, Australia and the Gulf.',
};

export default function HomePage() {
    return (
        <main>
            <HeroSection />
            <DeferredHomeSections />
        </main>
    );
}