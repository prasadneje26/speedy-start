import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/portfolio";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div className="min-w-0">
          <p className="font-display text-lg font-bold">{profile.name}</p>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">{profile.tagline}</p>
        </div>
        <div>
          <p className="eyebrow">Navigate</p>
          <div className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-foreground">
              About
            </Link>
            <Link to="/skills" className="hover:text-foreground">
              Skills
            </Link>
            <Link to="/projects" className="hover:text-foreground">
              Projects
            </Link>
            <Link to="/experience" className="hover:text-foreground">
              Experience
            </Link>
            <Link to="/coding" className="hover:text-foreground">
              Coding
            </Link>
            <Link to="/research" className="hover:text-foreground">
              Research
            </Link>
            <Link to="/certifications" className="hover:text-foreground">
              Certifications
            </Link>
            <Link to="/blog" className="hover:text-foreground">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-foreground">
              Contact
            </Link>
          </div>
        </div>
        <div>
          <p className="eyebrow">Connect</p>
          <div className="mt-3 flex gap-2">
            {[
              { href: `mailto:${profile.email}`, Icon: Mail, label: "Email" },
              { href: profile.github, Icon: Github, label: "GitHub" },
              { href: profile.linkedin, Icon: Linkedin, label: "LinkedIn" },
            ].map(({ href, Icon, label }) => (
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
          </div>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name} · Built with React and a custom portfolio
        experience
      </div>
    </footer>
  );
}
