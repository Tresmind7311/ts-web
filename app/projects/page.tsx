import { Metadata } from 'next';
import { permanentRedirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Projects | Tresmind',
  description:
    'Project case studies are currently unavailable.',
  robots: { index: false },
};

export default function Page() {
  permanentRedirect('/portfolio');
}
