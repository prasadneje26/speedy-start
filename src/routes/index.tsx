import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Download,
  Github,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Server,
} from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProfilePhoto } from "@/components/site/ProfilePhoto";
import { ResumeButton } from "@/components/site/ResumeButton";
import { profile, projects, research, skillGroups, stats } from "@/data/portfolio";


const marqueeItems = [
  "Python",
  "Machine Learning",
  "FastAPI",
  "React",
  "PostgreSQL",
  "LLM / GenAI",
  "C++",
  "Docker",
  "TypeScript",
];

const services = [
  {
    icon: Brain,
    title: "AI & Machine Learning",
    body: "Predictive models, explainable AI and LLM-powered assistants — from data pipeline to evaluated, deployed model.",
  },
  {
    icon: Server,
    title: "Backend & APIs",
    body: "FastAPI and Node microservices with PostgreSQL, auth, RBAC and clean, documented contracts.",
  },
  {
    icon: Layers,
    title: "Full-Stack Products",
    body: "React + TypeScript interfaces wired to real AI backends, shipped end to end with production polish.",
  },
];


const title = "Prasad Neje — AI Engineer, ML Engineer & GenAI Developer";
const description =
  "Portfolio of Prasad Vitthal Neje: AI/ML engineering projects, LLM-powered platforms, IEEE research and a built-in AI assistant that answers questions about his profile.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://sentient-portfolio-hub.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://sentient-portfolio-hub.lovable.app/" },
      { rel: "preload", as: "image", href: profile.photo, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.roles.join(", "),
          email: profile.email,
          address: profile.location,
          alumniOf: "Vishwakarma Institute of Technology, Pune",
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = projects.filter((p) => p.featured);

  return (
    <div>
      {/* Hero */}
      <section className="hero-bg relative overflow-hidden border-b border-border">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.9fr] md:py-24">
          <div className="min-w-0 animate-fade-up">
            <p className="font-display text-3xl font-medium text-foreground/90 sm:text-4xl">
              Hello <span className="text-primary">.</span>
            </p>
            <div className="mt-3 flex items-center gap-4">
              <span className="hidden h-px w-14 bg-primary sm:block" />
              <p className="font-display text-2xl text-muted-foreground sm:text-3xl">
                I&apos;m Prasad
              </p>
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-[1.05] sm:text-6xl">
              <span className="text-gradient">AI Engineer</span>
            </h1>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground">
              {profile.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get a project <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold transition-colors hover:border-primary/60"
              >
                <Download className="h-4 w-4" /> My Resume
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4" /> {profile.location}
              </span>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Mail className="h-4 w-4" /> {profile.email}
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Github className="h-4 w-4" /> GitHub
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-sm">
            <div className="portrait-ring absolute inset-0 rounded-full opacity-90 blur-[2px]" />
            <div className="absolute inset-[7%] overflow-hidden rounded-full border border-border bg-surface shadow-elevated">
              <ProfilePhoto />


            </div>
            <div className="glass absolute bottom-2 left-0 rounded-xl px-4 py-3 shadow-elevated animate-float">
              <p className="font-mono text-[11px] text-primary">CGPA</p>
              <p className="font-display text-xl font-bold">8.65 / 10</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech marquee */}
      <section className="overflow-hidden border-b border-border bg-surface/40 py-5">
        <div className="marquee-track gap-12 px-6">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="whitespace-nowrap font-display text-sm font-semibold uppercase tracking-[0.28em] text-muted-foreground"
            >
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Services + About */}
      <section className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-2">
        <div className="space-y-8">
          <h2 className="sr-only">What I do</h2>
          {services.map((s) => (
            <div key={s.title} className="flex items-start gap-5">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-base font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="min-w-0">
          <h2 className="text-3xl font-bold sm:text-4xl">About me</h2>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{profile.tagline} {profile.summary}</p>
          <div className="mt-9 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="min-w-0">
                <p className="font-display text-3xl font-bold">
                  {s.value}
                  <span className="text-primary">.</span>
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Skills */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading
          eyebrow="Capabilities"
          title="A stack built for shipping AI products"
          description="Not a badge wall — these are the tools behind the systems listed below."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g) => (
            <div key={g.category} className="card-surface card-hover p-6">
              <h3 className="text-base font-bold">{g.category}</h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((i) => (
                  <span
                    key={i}
                    className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects that solve real problems"
              description="Each case study covers the problem, the approach, the architecture and the outcome."
            />
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:opacity-80"
            >
              All projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Research */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <SectionHeading eyebrow="Research" title="Peer-reviewed & published with IEEE" />
        <div className="card-surface card-hover mt-8 p-7">
          <p className="eyebrow">{research.publisher}</p>
          <h3 className="mt-3 text-xl font-bold">{research.venue}</h3>
          <p className="mt-3 text-sm text-muted-foreground">{research.description}</p>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href={research.doiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-primary hover:opacity-80"
            >
              DOI: {research.doi} <ArrowRight className="h-3.5 w-3.5" />
            </a>
            <Link to="/research" className="text-sm font-semibold hover:text-primary">
              Read more about this IEEE research
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-8">
        <div className="hero-bg card-surface flex flex-wrap items-center justify-between gap-6 p-10">
          <div className="min-w-0">
            <h2 className="text-2xl font-bold sm:text-3xl">Let&apos;s build something intelligent</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Available for AI/ML internships, research work and freelance builds.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Get in touch <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
