import { Metadata } from 'next';
import ProjectsPage from '@/components/projects/ProjectsPage';

export const metadata: Metadata = {
  title: 'Featured Projects — Tresmind',
  description:
    'We design, build and support websites and apps for clients worldwide. Explore our featured work.',
};

export default function Page() {
  return <ProjectsPage />;
}
