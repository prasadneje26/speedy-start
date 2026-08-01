import { createFileRoute } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { education, experience, profile, softSkills } from "@/data/portfolio";

const title = "About Prasad Neje — AI & ML Engineering Journey";
const description =
  "Education, experience and working principles of Prasad Vitthal Neje, a CSE (AI) engineer at VIT Pune focused on machine learning and GenAI systems.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://sentient-portfolio-hub.lovable.app/about" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://sentient-portfolio-hub.lovable.app/about" }],
  }),
  component: About,
});

function About() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="About me"
        title="Curious about how intelligent systems solve real problems"
      />
      <div className="mt-8 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
        <div className="min-w-0 space-y-4 text-muted-foreground">
          <p>{profile.summary}</p>
          <p>
            My work sits at the intersection of applied machine learning and product engineering. I
            like problems where the model is only half the answer — the rest is data design, API
            boundaries, access control and an interface people actually trust.
          </p>
          <p>
            Recently I have been building LLM-powered platforms: a counseling engine for engineering
            admissions and a legal intelligence workspace, both with a FastAPI AI service behind a
            typed React frontend.
          </p>
        </div>
        <div className="card-surface h-fit p-6">
          <p className="eyebrow">Soft skills</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            {softSkills.map((s) => (
              <li key={s} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-20">
        <SectionHeading eyebrow="Education" title="Academic timeline" />
        <div className="mt-8 space-y-4">
          {education.map((e) => (
            <div
              key={e.institution}
              className="card-surface card-hover grid gap-3 p-6 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-center"
            >
              <p className="font-mono text-xs text-accent">{e.period}</p>
              <div className="min-w-0">
                <h3 className="text-base font-bold">{e.institution}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{e.detail}</p>
              </div>
              <p className="font-mono text-sm text-primary">{e.score}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-20">
        <SectionHeading eyebrow="Experience" title="Training & programs" />
        <div className="mt-8 space-y-4">
          {experience.map((x) => (
            <div key={x.title} className="card-surface p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-base font-bold">{x.title}</h3>
                <span className="font-mono text-xs text-accent">{x.period}</span>
              </div>
              <p className="mt-1 text-sm text-primary">{x.org}</p>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {x.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
