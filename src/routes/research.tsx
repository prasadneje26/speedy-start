import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { research } from "@/data/portfolio";

const title = "Research & Publications — IEEE CCGE 2026 | Prasad Neje";
const description =
  "IEEE-published research by Prasad Neje, presented at the 2026 2nd International Conference on Computing, Communication and Green Engineering (CCGE).";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://sentient-portfolio-hub.lovable.app/research" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sentient-portfolio-hub.lovable.app/research" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ScholarlyArticle",
          headline: research.venue,
          publisher: research.publisher,
          identifier: research.doi,
        }),
      },
    ],
  }),
  component: Research,
});

function Research() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <SectionHeading
        eyebrow="Research"
        title="Publications"
        description="Peer-reviewed work in applied computing and intelligent systems."
      />
      <div className="card-surface mt-10 p-7">
        <p className="eyebrow">{research.publisher}</p>
        <h2 className="mt-3 text-2xl font-bold">{research.title}</h2>
        <p className="mt-3 text-sm text-primary">{research.venue}</p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{research.description}</p>
        <a
          href={research.doiUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 font-mono text-xs transition-colors hover:border-primary/50"
        >
          DOI {research.doi} <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>

      <div className="card-surface mt-6 p-7">
        <p className="eyebrow">Research interests</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "Explainable & trustworthy AI",
            "LLM applications and retrieval-augmented systems",
            "Predictive modelling on real-world tabular data",
            "AI systems engineering and deployment",
          ].map((r) => (
            <div key={r} className="rounded-lg border border-border bg-surface-2 px-4 py-3 text-sm">
              {r}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
