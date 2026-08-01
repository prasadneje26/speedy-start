import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { posts } from "@/data/portfolio";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    const t = loaderData ? `${loaderData.title} — Prasad Neje` : "Article — Prasad Neje";
    const d = loaderData?.excerpt ?? "An article by Prasad Neje on AI engineering.";
    const url = `https://sentient-portfolio-hub.lovable.app/blog/${params.slug}`;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-3xl px-5 py-24" role="alert">
      {error.message}
    </div>
  ),
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-5 py-24">
      <p className="text-muted-foreground">That article does not exist.</p>
      <Link to="/blog" className="mt-4 inline-block font-semibold text-primary">
        Back to blog
      </Link>
    </div>
  ),
  component: Post,
});

function Post() {
  const post = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> All articles
      </Link>

      <div className="mt-8 flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
        <span className="rounded-md bg-primary/10 px-2 py-0.5 text-primary">{post.tag}</span>
        <span>{post.date}</span>
        <span>{post.readingTime}</span>
      </div>

      <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>

      <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-muted-foreground">
        {post.body.map((p: string) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </article>
  );
}
