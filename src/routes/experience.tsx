import { createFileRoute, Link } from "@tanstack/react-router";
import { GraduationCap, Briefcase, FlaskConical } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { experience, education, projects } from "@/data/portfolio";

const title = "Experience — Prasad Neje | AI Engineering Journey & Education";
const description =
  "Prasad Neje's engineering timeline: AI bootcamp training with C-DAC ACTS Pune, industry project work, IEEE research and B.Tech CSE (AI) at VIT Pune.";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  component: Experience,
});

function Experience() {
  const industry = projects.filter((p) => p.kind.includes("Industry") || p.featured).slice(0, 3);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <SectionHeading
        eyebrow="Experience"
        title="Training, building and publishing"
        description="A timeline of the programs, engagements and research work that shaped how I build AI systems."
      />

      <section className="mt-12">
        <p className="eyebrow flex items-center gap-2">
          <Briefcase className="h-3.5 w-3.5" /> Programs & engagements
        </p>
        <div className="mt-5 space-y-4">
          {experience.map((item) => (
            <div key={item.title} className="card-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
                  {item.period}
                </span>
              </div>
              <p className="mt-1 text-sm text-primary/90">{item.org}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {item.points.map((p) => (
                  <li key={p} className="border-l-2 border-border pl-4">
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="card-surface p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-lg font-bold">Research contributor — Explainable AI</h3>
              <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
                2025 — 2026
              </span>
            </div>
            <p className="mt-1 text-sm text-primary/90">
              IEEE CCGE 2026 · Published, DOI 10.1109/CCGE67142.2026.11581630
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="border-l-2 border-border pl-4">
                Applied attribution techniques to deep learning models and compared explanation
                consistency across methods.
              </li>
              <li className="border-l-2 border-border pl-4">
                Co-authored a peer-reviewed paper accepted and published by IEEE.
              </li>
            </ul>
            <Link
              to="/research"
              className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
            >
              Read the research →
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-14">
        <p className="eyebrow flex items-center gap-2">
          <FlaskConical className="h-3.5 w-3.5" /> Build experience
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          {industry.map((p) => (
            <Link
              key={p.slug}
              to="/projects/$slug"
              params={{ slug: p.slug }}
              className="card-surface p-5 transition-colors hover:border-primary/50"
            >
              <p className="font-mono text-[11px] uppercase tracking-wide text-primary">{p.kind}</p>
              <h3 className="mt-2 text-base font-bold">{p.title}</h3>
              <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">{p.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <p className="eyebrow flex items-center gap-2">
          <GraduationCap className="h-3.5 w-3.5" /> Education
        </p>
        <div className="mt-5 space-y-4">
          {education.map((e) => (
            <div key={e.institution} className="card-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-bold">{e.institution}</h3>
                <span className="font-mono text-xs text-muted-foreground">{e.period}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
              <p className="mt-2 text-sm font-semibold text-primary">{e.score}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
