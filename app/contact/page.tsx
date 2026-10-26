import type { Metadata } from 'next';

import ContactPage from '@/components/sections/contact/ContactPage';

export const metadata: Metadata = {
    title: 'Contact Tresmind | Get a Quote for Your Project',
    description:
        'Tell us about your app, software, website or AI project. Tresmind Solutions works with businesses in the US, UK, Europe, Australia, UAE and Saudi Arabia.',
    alternates: {
        canonical: 'https://tresmind.com/contact',
    },
    openGraph: {
        type: 'website',
        url: 'https://tresmind.com/contact',
        title: 'Contact Tresmind | Get a Quote for Your Project',
        description:
            'Tell us about your app, software, website or AI project. Tresmind Solutions works with businesses in the US, UK, Europe, Australia, UAE and Saudi Arabia.',
        siteName: 'Tresmind Solutions',
    },
};

export default function Page() {
    return <ContactPage />;
}
