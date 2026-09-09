import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getNextProject, projectSlugs } from '@/data/projects';
import ProjectPage from '@/components/projects/ProjectPage';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.seo.title,
    description: project.seo.description,
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const nextProject = getNextProject(slug);

  return <ProjectPage project={project} nextProject={nextProject} />;
}