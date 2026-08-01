import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card-surface card-hover group relative flex flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <p className="eyebrow">{project.kind}</p>
        <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
      </div>

      <h3 className="mt-3 text-xl font-bold">
        {/* Stretched link: whole card opens the case study, nested links stay clickable */}
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="after:absolute after:inset-0 after:content-['']"
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>

      {project.outcomes[0] && (
        <p className="mt-3 border-l-2 border-primary/60 pl-3 text-sm text-foreground/80">
          {project.outcomes[0]}
        </p>
      )}

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

      <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-border pt-4 text-sm">
        <Link
          to="/projects/$slug"
          params={{ slug: project.slug }}
          className="relative z-10 font-semibold text-primary hover:underline"
        >
          Read case study
        </Link>
        {project.repo && (
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            className="relative z-10 inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" /> Source
          </a>
        )}
      </div>
    </article>
  );
}
