import { createFileRoute } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { SectionHeading } from "@/components/site/SectionHeading";
import { profile } from "@/data/portfolio";

const title = "Contact Prasad Neje — AI Engineer";
const description =
  "Get in touch with Prasad Vitthal Neje for AI/ML internships, research collaborations and freelance engineering work.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/contact" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong while sending your message.");
      }

      setForm({ name: "", email: "", message: "" });
      toast.success(data.message ?? "Thanks — your message has been received.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong while sending your message.";

      const subject = encodeURIComponent(`Portfolio enquiry from ${parsed.data.name}`);
      const body = encodeURIComponent(
        `${parsed.data.message}\n\n— ${parsed.data.name} (${parsed.data.email})`,
      );

      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const field =
    "w-full rounded-lg border border-border bg-surface-2 px-3.5 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-primary/60";

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Contact"
        title="Let's talk"
        description="Internships, research collaborations or a project idea — I read every message."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="card-surface h-fit p-6">
          <p className="eyebrow">Direct</p>
          <div className="mt-4 space-y-3 text-sm">
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
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
            >
              <Github className="h-4 w-4 shrink-0 text-primary" /> GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground"
            >
              <Linkedin className="h-4 w-4 shrink-0 text-primary" /> LinkedIn
            </a>
          </div>
        </div>

        <form onSubmit={submit} className="card-surface space-y-4 p-6">
          <div>
            <label htmlFor="name" className="text-xs text-muted-foreground">
              Name
            </label>
            <input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              maxLength={100}
              className={`mt-1.5 ${field}`}
              placeholder="Your name"
            />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="text-xs text-muted-foreground">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              maxLength={255}
              className={`mt-1.5 ${field}`}
              placeholder="you@company.com"
            />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="text-xs text-muted-foreground">
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              maxLength={1000}
              className={`mt-1.5 ${field}`}
              placeholder="Tell me about the role or project…"
            />
            {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send message"} <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
