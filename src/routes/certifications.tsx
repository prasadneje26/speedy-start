import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { certifications, research } from "@/data/portfolio";

const title = "Certifications — Prasad Neje | AI Bootcamp, IEEE & Academics";
const description =
  "Verified credentials for Prasad Neje: 40-hour AI Bootcamp with VIT Pune, C-DAC ACTS and FutureSkills Prime, IEEE CCGE 2026 publication and academic scorecards.";

export const Route = createFileRoute("/certifications")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/certifications" },
    ],
    links: [
      { rel: "canonical", href: "/certifications" },
    ],
  }),
  component: Certifications,
});

function Certifications() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <SectionHeading
        eyebrow="Certifications"
        title="Credentials and recognition"
        description="Training programs, peer-reviewed publication and academic achievements that back up the work."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {certifications.map((c) => (
          <article key={c.title} className="card-surface flex flex-col p-6">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-surface-2 text-primary">
              <BadgeCheck className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-bold leading-snug">{c.title}</h3>
            <p className="mt-1.5 text-sm text-primary/90">{c.issuer}</p>
            <p className="mt-1 font-mono text-[11px] text-muted-foreground">
              {c.period} · {c.credential}
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-muted-foreground">
              {c.points.map((p) => (
                <li key={p} className="border-l-2 border-border pl-4">
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="card-surface mt-6 flex flex-wrap items-center justify-between gap-4 p-6">
        <div>
          <p className="eyebrow">Verify publication</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {research.venue} — DOI {research.doi}
          </p>
        </div>
        <a
          href={research.doiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
        >
          Open on IEEE <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
