import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { skillGroups } from "@/data/portfolio";

const title = "Skills — Prasad Neje | AI, ML, Backend & Full-Stack Toolkit";
const description =
  "The complete technical toolkit Prasad Neje works with: machine learning, explainable AI, LLM/RAG pipelines, Python, C++, FastAPI, Node.js, React and PostgreSQL.";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/skills" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: Skills,
});

const focus = [
  {
    label: "AI / ML engineering",
    level: 88,
    note: "Model training, evaluation and interpretability.",
  },
  { label: "Backend & APIs", level: 85, note: "FastAPI, Express, PostgreSQL, auth and RBAC." },
  { label: "GenAI & RAG", level: 82, note: "LLM APIs, retrieval pipelines, grounded assistants." },
  {
    label: "Frontend engineering",
    level: 78,
    note: "React, TypeScript, Tailwind, data dashboards.",
  },
  {
    label: "DSA & problem solving",
    level: 80,
    note: "C++ data structures, algorithms, complexity.",
  },
];

function Skills() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Skills"
        title="The toolkit behind the work"
        description="From model training and explainability through to the APIs, databases and interfaces that put a model in front of real users."
      />

      <div className="mt-12 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
        <div className="card-surface p-6">
          <p className="eyebrow">Core focus areas</p>
          <div className="mt-6 space-y-6">
            {focus.map((f) => (
              <div key={f.label}>
                <div className="flex items-baseline justify-between gap-4">
                  <p className="text-sm font-semibold">{f.label}</p>
                  <span className="font-mono text-xs text-primary">{f.level}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary"
                    style={{ width: `${f.level}%` }}
                  />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">{f.note}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-6">
          <p className="eyebrow">How I apply them</p>
          <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
            <li className="border-l-2 border-primary/60 pl-4">
              Split ML inference away from transactional APIs so each side scales on its own terms.
            </li>
            <li className="border-l-2 border-primary/60 pl-4">
              Treat explainability and audit logging as product requirements, not afterthoughts.
            </li>
            <li className="border-l-2 border-primary/60 pl-4">
              Ground every LLM feature in a curated corpus, and let it refuse when it does not know.
            </li>
            <li className="border-l-2 border-primary/60 pl-4">
              Ship one API contract that both web and mobile clients can consume unchanged.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillGroups.map((group) => (
          <div key={group.category} className="card-surface p-6">
            <h3 className="text-base font-bold">{group.category}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="rounded-md border border-border bg-surface-2/60 px-2.5 py-1 font-mono text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
