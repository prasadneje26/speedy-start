import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Brain,
  Briefcase,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Server,
} from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ProfilePhoto } from "@/components/site/ProfilePhoto";
import { ResumeButton } from "@/components/site/ResumeButton";
import { SlideSection } from "@/components/site/SlideSection";
import { useHomeScrollSnap } from "@/hooks/use-home-scroll-snap";
import {
  profile,
  projects,
  research,
  skillGroups,
  stats,
  experience,
  education,
} from "@/data/portfolio";

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

const title = "Prasad Neje — AI Engineer & GenAI Developer Portfolio";
const description =
  "Prasad Neje builds ML models, LLM-powered products and FastAPI/React systems end to end. Case studies, IEEE research, coding profiles and CV — plus an AI assistant that answers questions about him.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      {
        name: "keywords",
        content:
          "Prasad Neje, AI engineer, machine learning engineer, GenAI developer, LLM, FastAPI, React, VIT Pune, portfolio",
      },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:site_name", content: profile.shortName },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          alternateName: profile.shortName,
          jobTitle: profile.roles.join(", "),
          description: profile.summary,
          email: `mailto:${profile.email}`,
          telephone: profile.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Pune",
            addressRegion: "Maharashtra",
            addressCountry: "IN",
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Vishwakarma Institute of Technology, Pune",
          },
          knowsAbout: [
            "Machine Learning",
            "Explainable AI",
            "Large Language Models",
            "RAG Pipelines",
            "FastAPI",
            "React",
          ],
          sameAs: [profile.github, profile.linkedin, profile.leetcode],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  useHomeScrollSnap();
  const featured = projects.filter((p) => p.featured);

  return (
    <div className="overflow-x-hidden">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <SlideSection id="hero" className="hero-bg border-b border-border">
        <div className="mx-auto grid max-w-6xl flex-1 items-center gap-12 px-5 py-16 md:grid-cols-[1fr_0.9fr] md:py-24">
          <div className="min-w-0">
            <p
              className="animate-fade-up font-display text-3xl font-medium text-foreground/90 sm:text-4xl"
              style={{ animationDelay: "0ms" }}
            >
              Hello <span className="text-primary">.</span>
            </p>
            <div
              className="animate-fade-up mt-3 flex items-center gap-4"
              style={{ animationDelay: "80ms" }}
            >
              <span className="hidden h-px w-14 bg-primary sm:block" />
              <p className="font-display text-2xl text-muted-foreground sm:text-3xl">
                I&apos;m Prasad
              </p>
            </div>
            <h1
              className="animate-fade-up mt-4 text-4xl font-bold leading-[1.05] sm:text-6xl"
              style={{ animationDelay: "160ms" }}
            >
              <span className="text-gradient">AI Engineer</span>
              <span className="mt-2 block text-xl font-semibold text-foreground/80 sm:text-2xl">
                building ML systems, LLM products and the APIs behind them
              </span>
            </h1>
            <p
              className="animate-fade-up mt-5 max-w-lg text-base leading-relaxed text-muted-foreground"
              style={{ animationDelay: "240ms" }}
            >
              {profile.summary}
            </p>
            <p
              className="animate-fade-up mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground"
              style={{ animationDelay: "300ms" }}
            >
              Currently open to AI/ML engineering internships and freelance builds — from a first
              trained model to a deployed, explainable product.
            </p>

            <div
              className="animate-fade-up mt-8 flex flex-wrap gap-3"
              style={{ animationDelay: "380ms" }}
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-semibold hover:border-primary/60 hover:text-foreground"
              >
                Contact Me
              </Link>
              <ResumeButton variant="outline" />
            </div>

            <div
              className="animate-fade-up mt-8 flex flex-wrap items-center gap-4 text-sm text-muted-foreground"
              style={{ animationDelay: "460ms" }}
            >
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

          <div
            className="slide-parallax animate-fade-up relative mx-auto aspect-square w-full max-w-sm"
            style={{ animationDelay: "200ms" }}
          >
            <div className="portrait-ring absolute inset-0 rounded-full opacity-90 blur-[2px]" />
            <div className="absolute inset-[7%] overflow-hidden rounded-full border border-border bg-surface shadow-elevated">
              <ProfilePhoto />
            </div>
          </div>
        </div>
      </SlideSection>

      {/* ── Tech marquee ─────────────────────────────────────────────────── */}
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

      {/* ── About ────────────────────────────────────────────────────────── */}
      <SlideSection id="about" snap={false} className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-20 md:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div
            className="reveal-scale relative mx-auto aspect-square w-full max-w-xs"
            style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
          >
            <div className="portrait-ring absolute inset-0 rounded-3xl opacity-80 blur-[1px]" />
            <div className="absolute inset-[5%] overflow-hidden rounded-2xl border border-border bg-surface shadow-elevated">
              <ProfilePhoto />
            </div>
          </div>

          <div className="min-w-0">
            <h2
              className="reveal text-3xl font-bold sm:text-4xl"
              style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            >
              About me
            </h2>
            <p
              className="reveal mt-5 text-sm leading-relaxed text-muted-foreground"
              style={{ "--reveal-delay": "160ms" } as React.CSSProperties}
            >
              {profile.tagline} {profile.summary}
            </p>

            <div className="mt-9 space-y-6">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  className="reveal flex items-start gap-5"
                  style={{ "--reveal-delay": `${220 + i * 100}ms` } as React.CSSProperties}
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div
              className="reveal mt-9 grid grid-cols-2 gap-6 sm:grid-cols-4"
              style={{ "--reveal-delay": "520ms" } as React.CSSProperties}
            >
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
        </div>
      </SlideSection>

      {/* ── Skills ───────────────────────────────────────────────────────── */}
      <SlideSection id="skills" snap={false}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="reveal">
            <SectionHeading
              eyebrow="Capabilities"
              title="A stack built for shipping AI products"
              description="Not a badge wall — these are the tools behind the systems listed below."
            />
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {skillGroups.map((g, i) => (
              <div
                key={g.category}
                className="reveal-scale card-surface card-hover p-6"
                style={{ "--reveal-delay": `${80 + i * 80}ms` } as React.CSSProperties}
              >
                <h3 className="text-base font-bold">{g.category}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-md border border-border bg-surface-2 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </SlideSection>

      {/* ── Projects ─────────────────────────────────────────────────────── */}
      <SlideSection id="projects" snap={false} className="border-y border-border bg-surface/40">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="reveal flex flex-wrap items-end justify-between gap-4">
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
            {featured.map((p, i) => (
              <div
                key={p.slug}
                className="reveal-scale"
                style={{ "--reveal-delay": `${120 + i * 120}ms` } as React.CSSProperties}
              >
                <ProjectCard project={p} />
              </div>
            ))}
          </div>
        </div>
      </SlideSection>

      {/* ── Experience ───────────────────────────────────────────────────── */}
      <SlideSection id="experience" snap={false}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="reveal">
            <SectionHeading
              eyebrow="Experience"
              title="Training, building and publishing"
              description="Programs, industry work and peer-reviewed research that shaped how I build AI systems."
            />
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {experience.map((item, i) => (
              <div
                key={item.title}
                className="reveal card-surface card-hover p-6"
                style={{ "--reveal-delay": `${100 + i * 100}ms` } as React.CSSProperties}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  <span className="rounded-md bg-primary/10 px-2.5 py-1 font-mono text-xs text-primary">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 text-sm text-primary/90">{item.org}</p>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {item.points.slice(0, 2).map((p) => (
                    <li key={p} className="border-l-2 border-border pl-4">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div
              className="reveal card-surface card-hover p-6"
              style={{ "--reveal-delay": "220ms" } as React.CSSProperties}
            >
              <p className="eyebrow flex items-center gap-2">
                <Briefcase className="h-3.5 w-3.5" /> Research
              </p>
              <h3 className="mt-3 text-lg font-bold">{research.venue}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{research.description}</p>
              <Link
                to="/research"
                className="relative z-10 mt-4 inline-flex text-sm font-semibold text-primary hover:opacity-80"
              >
                Read IEEE research <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
              </Link>
            </div>

            <div
              className="reveal card-surface card-hover p-6"
              style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
            >
              <p className="eyebrow flex items-center gap-2">
                <GraduationCap className="h-3.5 w-3.5" /> Education
              </p>
              <h3 className="mt-3 text-lg font-bold">{education[0]?.institution}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{education[0]?.detail}</p>
              <p className="mt-3 font-mono text-xs text-primary">{education[0]?.score}</p>
              <Link
                to="/experience"
                className="relative z-10 mt-4 inline-flex text-sm font-semibold text-primary hover:opacity-80"
              >
                Full timeline <ArrowRight className="ml-1 inline h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </SlideSection>

      {/* ── Contact ──────────────────────────────────────────────────────── */}
      <SlideSection id="contact">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <div className="reveal hero-bg card-surface grid gap-8 p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">
            <div className="min-w-0">
              <p className="eyebrow">Contact</p>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Let&apos;s build something intelligent
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Available for AI/ML internships, research work and freelance builds. I read every
                message.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-4 w-4 shrink-0 text-primary" /> {profile.email}
                </a>
                <a
                  href={`tel:${profile.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
                >
                  <Phone className="h-4 w-4 shrink-0 text-primary" /> {profile.phone}
                </a>
                <p className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" /> {profile.location}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Get in touch <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/coding"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:border-primary/60"
              >
                View coding profiles
              </Link>
              <ResumeButton variant="outline" className="w-full" />
            </div>
          </div>
        </div>
      </SlideSection>
    </div>
  );
}
