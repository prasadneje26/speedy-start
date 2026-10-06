import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/portfolio";
import { ResumeButton } from "@/components/site/ResumeButton";
import { ThemeToggle } from "@/components/site/ThemeToggle";

const socials = [
  { href: `mailto:${profile.email}`, Icon: Mail, label: "Email Prasad Neje" },
  { href: profile.github, Icon: Github, label: "GitHub profile" },
  { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn profile" },
] as const;

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/skills", label: "Skills" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/coding", label: "Coding" },
  { to: "/research", label: "Research" },
  { to: "/certifications", label: "Certifications" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 glass">
      <nav className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary font-mono text-sm font-bold text-primary-foreground">
            PN
          </span>
          <span className="truncate font-display text-sm font-bold tracking-tight sm:text-base">
            {profile.shortName}
          </span>
        </Link>

        <div className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground bg-secondary/70" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="rounded-md px-2.5 py-1.5 text-[13px] transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
          <span className="mx-2 h-5 w-px bg-border" />
          {socials.map(({ href, Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              title={label}
              className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary/70 hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
          <ThemeToggle className="ml-1.5 h-8 w-8" />
          <ResumeButton variant="compact" label="Resume" className="ml-2" />
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-border"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border px-5 py-3 lg:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <ResumeButton
              variant="primary"
              label="View Resume"
              className="mt-1 w-full py-2.5"
              onClick={() => setOpen(false)}
            />
            <div className="mt-3 flex items-center gap-2 border-t border-border pt-3">
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
              <ThemeToggle className="ml-auto" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
