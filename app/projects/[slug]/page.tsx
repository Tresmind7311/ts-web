import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectPage from '@/components/projects/ProjectPage';
import { getApprovedProjectBySlug, getNextApprovedProject } from '@/data/projects';

type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getApprovedProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.seo.title,
    description: project.seo.description,
    alternates: { canonical: `https://tresmind.com/projects/${slug}` },
    robots: { index: false, follow: true },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getApprovedProjectBySlug(slug);
  if (!project) notFound();
  return <main id="case-study-top"><ProjectPage project={project} nextProject={getNextApprovedProject(slug)} /></main>;
}
