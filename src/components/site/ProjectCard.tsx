import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="card-surface card-hover group flex flex-col p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow">{project.kind}</p>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>
      <h3 className="mt-3 text-xl font-bold">{project.title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-1.5">
        {project.stack.slice(0, 6).map((s) => (
          <span
            key={s}
            className="rounded-md border border-border bg-surface-2 px-2 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {s}
          </span>
        ))}
        {project.stack.length > 6 && (
          <span className="rounded-md px-2 py-1 font-mono text-[11px] text-muted-foreground">
            +{project.stack.length - 6}
          </span>
        )}
      </div>
    </Link>
  );
}
