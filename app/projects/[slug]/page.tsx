import { notFound } from "next/navigation";
import { projects, getProjectBySlug, getAdjacentProjects } from "@/data/projects";
import ProjectHero from "@/components/ProjectHero";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectNav from "@/components/ProjectNav";
import ScrollReveal from "@/components/ScrollReveal";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  return {
    title: project
      ? `${project.name} — Architecture Portfolio`
      : "Project Not Found",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const { prev, next } = getAdjacentProjects(slug);

  return (
    <PageTransition>
      <main>
        <ProjectHero project={project} />

        <section className="py-20 px-6">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal>
              <p className="text-text-body text-lg leading-relaxed">
                {project.description}
              </p>
            </ScrollReveal>
          </div>
        </section>

        <ProjectGallery gallery={project.gallery} />
        <ProjectNav prev={prev} next={next} />
        <Footer />
      </main>
    </PageTransition>
  );
}
