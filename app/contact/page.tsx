import type { Metadata } from 'next';

import ContactPage from '@/components/sections/contact/ContactPage';

export const metadata: Metadata = {
    title: 'Contact',
    description: 'Get in touch with Tresmind Solutions.',
};

export default function Page() {
    return <ContactPage />;
}
