import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProjectCard } from "@/components/site/ProjectCard";
import { projects } from "@/data/portfolio";

const title = "Projects — AI, ML & Full-Stack Case Studies | Prasad Neje";
const description =
  "Detailed case studies of AI and full-stack projects by Prasad Neje: CAP counseling AI, Lawyer-AI 2.0, Rajmudra student platform and explainable deep learning.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://sentient-portfolio-hub.lovable.app/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sentient-portfolio-hub.lovable.app/projects" }],
  }),
  component: Projects,
});

function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Portfolio"
        title="Every project as a case study"
        description="Problem, approach, architecture and outcome — not just a list of technologies."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
