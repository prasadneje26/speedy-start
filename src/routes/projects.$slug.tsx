import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { projects, type Project } from "@/data/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.project.title} — Case Study | Prasad Neje`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.project.summary },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.project.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `https://sentient-portfolio-hub.lovable.app/projects/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `https://sentient-portfolio-hub.lovable.app/projects/${params.slug}` }],
    };
  },
  component: ProjectDetail,
});

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="card-surface p-6">
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectDetail() {
  const { project } = Route.useLoaderData() as { project: Project };

  return (
    <article className="mx-auto max-w-4xl px-5 py-16">
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All projects
      </Link>

      <p className="eyebrow mt-8">{project.kind}</p>
      <h1 className="mt-3 text-3xl font-bold sm:text-5xl">{project.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{project.summary}</p>

      <div className="mt-6 flex flex-wrap gap-1.5">
        {project.stack.map((s) => (
          <span
            key={s}
            className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
      </div>

      <div className="card-surface mt-10 p-6">
        <p className="eyebrow">The problem</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
      </div>

      <div className="mt-5 grid gap-5">
        <Block title="Approach" items={project.approach} />
        <Block title="Architecture" items={project.architecture} />
        <Block title="Outcome" items={project.outcomes} />
      </div>
    </article>
  );
}
