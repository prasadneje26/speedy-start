import { createFileRoute, Link } from "@tanstack/react-router";
import { SectionHeading } from "@/components/site/SectionHeading";
import { posts } from "@/data/portfolio";

const title = "Blog — Prasad Neje | Notes on AI Engineering & Architecture";
const description =
  "Essays by Prasad Neje on ML system architecture, explainable AI, retrieval-augmented assistants and shipping AI products end to end.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://sentient-portfolio-hub.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://sentient-portfolio-hub.lovable.app/blog" }],
  }),
  component: Blog,
});

function Blog() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <SectionHeading
        eyebrow="Blog"
        title="Notes from building AI systems"
        description="Short, practical write-ups on the architecture decisions and trade-offs behind my projects."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to="/blog/$slug"
            params={{ slug: post.slug }}
            className="card-surface flex flex-col p-6 transition-colors hover:border-primary/50"
          >
            <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
              <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary">{post.tag}</span>
              <span>{post.date}</span>
              <span>{post.readingTime}</span>
            </div>
            <h2 className="mt-4 text-lg font-bold leading-snug">{post.title}</h2>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.excerpt}</p>
            <span className="mt-4 text-sm font-semibold text-primary">Read article →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
