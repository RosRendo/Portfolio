import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectDedicatedPage } from "@/components/projects/ProjectDedicatedPage";
import { projectsData } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projectsData.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);
  if (!project) {
    return { title: "Project Not Found — ROS RENDO" };
  }
  return {
    title: `${project.title} Case Study — ROS RENDO`,
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} — Full-Stack Case Study by ROS RENDO`,
      description: project.tagline,
      images: [{ url: project.image }],
    },
  };
}

async function ProjectContent({ params }: PageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDedicatedPage project={project} />;
}

export default function ProjectSlugPage({ params }: PageProps) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07080f]" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}
