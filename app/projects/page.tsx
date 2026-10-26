import { Metadata } from 'next';
import ProjectsPage from '@/components/projects/ProjectsPage';

export const metadata: Metadata = {
  title: 'Projects | Tresmind',
  description:
    'Project case studies are currently unavailable.',
  robots: { index: false },
};

export default function Page() {
  return <ProjectsPage />;
}
