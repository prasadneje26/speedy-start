import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Github, ExternalLink, Flame, Star, Code2, RefreshCw } from "lucide-react";
import { SectionHeading } from "@/components/site/SectionHeading";
import { ContributionGrid, StatTile } from "@/components/site/ContributionGrid";
import { getGithubStats, getLeetcodeStats } from "@/lib/coding.functions";
import { profile } from "@/data/portfolio";

const title = "Coding Profiles — Prasad Neje's GitHub & LeetCode Activity";
const description =
  "Live GitHub and LeetCode dashboard for Prasad Neje: contribution streaks, daily activity heatmaps, repositories and problem-solving progress, updated in real time.";

export const Route = createFileRoute("/coding")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/coding" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/coding" }],
  }),
  component: Coding,
});

function Panel({
  children,
  loading,
  error,
}: {
  children: React.ReactNode;
  loading: boolean;
  error: boolean;
}) {
  if (loading)
    return (
      <div className="card-surface grid min-h-[280px] place-items-center p-6 text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <RefreshCw className="h-4 w-4 animate-spin" /> Fetching live data…
        </span>
      </div>
    );
  if (error)
    return (
      <div className="card-surface grid min-h-[280px] place-items-center p-6 text-center text-sm text-muted-foreground">
        Live data is temporarily unavailable. Try refreshing in a moment.
      </div>
    );
  return <>{children}</>;
}

function Coding() {
  const github = useServerFn(getGithubStats);
  const leetcode = useServerFn(getLeetcodeStats);

  const gh = useQuery({
    queryKey: ["github-stats"],
    queryFn: () => github(),
    staleTime: 5 * 60_000,
    refetchInterval: 5 * 60_000,
  });
  const lc = useQuery({
    queryKey: ["leetcode-stats"],
    queryFn: () => leetcode(),
    staleTime: 5 * 60_000,
    refetchInterval: 5 * 60_000,
  });

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <SectionHeading
        eyebrow="Coding profiles"
        title="My daily engineering journey, live"
        description="Real-time GitHub and LeetCode activity — contributions, streaks and problem-solving progress pulled straight from both platforms."
      />

      {/* GitHub */}
      <section className="mt-12">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-primary">
              <Github className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold">GitHub</h3>
              <p className="truncate text-xs text-muted-foreground">@{profile.githubUser}</p>
            </div>
          </div>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-xs font-semibold hover:border-primary/60"
          >
            Visit <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-5">
          <Panel loading={gh.isPending} error={gh.isError || (!gh.isPending && !gh.data)}>
            {gh.data && (
              <div className="card-surface p-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  <StatTile value={gh.data.contributionsLastYear} label="Contributions (1y)" />
                  <StatTile value={`${gh.data.currentStreak}d`} label="Current streak" />
                  <StatTile value={`${gh.data.longestStreak}d`} label="Longest streak" />
                  <StatTile value={gh.data.activeDays} label="Active days" />
                  <StatTile value={gh.data.publicRepos} label="Public repos" />
                  <StatTile value={gh.data.totalStars} label="Stars earned" />
                </div>

                <div className="mt-7">
                  <ContributionGrid
                    days={gh.data.calendar}
                    label="Contribution activity — last 12 months"
                  />
                </div>

                {gh.data.repos.length > 0 && (
                  <div className="mt-8">
                    <p className="eyebrow">Recently updated</p>
                    <div className="mt-4 grid gap-3 md:grid-cols-2">
                      {gh.data.repos.map((r) => (
                        <a
                          key={r.name}
                          href={r.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-xl border border-border bg-surface-2/50 p-4 transition-colors hover:border-primary/50"
                        >
                          <p className="truncate font-mono text-sm font-semibold text-primary">
                            {r.name}
                          </p>
                          <p className="mt-1.5 line-clamp-2 text-xs text-muted-foreground">
                            {r.description ?? "No description"}
                          </p>
                          <p className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                            {r.language && (
                              <span className="inline-flex items-center gap-1">
                                <Code2 className="h-3 w-3" /> {r.language}
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1">
                              <Star className="h-3 w-3" /> {r.stars}
                            </span>
                            <span>updated {r.updatedAt.slice(0, 10)}</span>
                          </p>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </Panel>
        </div>
      </section>

      {/* LeetCode */}
      <section className="mt-16">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-border bg-surface-2 text-primary">
              <Flame className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h3 className="truncate text-lg font-bold">LeetCode</h3>
              <p className="truncate text-xs text-muted-foreground">@{profile.leetcodeUser}</p>
            </div>
          </div>
          <a
            href={profile.leetcode}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-border px-3.5 py-2 text-xs font-semibold hover:border-primary/60"
          >
            Visit <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        <div className="mt-5">
          <Panel loading={lc.isPending} error={lc.isError || (!lc.isPending && !lc.data)}>
            {lc.data && (
              <div className="card-surface p-6">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                  <StatTile value={lc.data.totalSolved} label="Problems solved" />
                  <StatTile value={`${lc.data.currentStreak}d`} label="Current streak" />
                  <StatTile value={`${lc.data.longestStreak}d`} label="Longest streak" />
                  <StatTile value={lc.data.activeDays} label="Active days" />
                  <StatTile value={lc.data.submissionsLastYear} label="Submissions (1y)" />
                  <StatTile
                    value={lc.data.ranking ? `#${lc.data.ranking.toLocaleString()}` : "—"}
                    label="Global rank"
                  />
                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-3">
                  {[
                    { label: "Easy", solved: lc.data.easySolved, total: lc.data.easyTotal },
                    { label: "Medium", solved: lc.data.mediumSolved, total: lc.data.mediumTotal },
                    { label: "Hard", solved: lc.data.hardSolved, total: lc.data.hardTotal },
                  ].map((d) => (
                    <div key={d.label} className="rounded-xl border border-border bg-surface-2/50 p-4">
                      <div className="flex items-baseline justify-between">
                        <p className="text-sm font-semibold">{d.label}</p>
                        <p className="font-mono text-xs text-muted-foreground">
                          {d.solved} / {d.total || "—"}
                        </p>
                      </div>
                      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{
                            width: `${d.total ? Math.min(100, (d.solved / d.total) * 100) : 0}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7">
                  <ContributionGrid
                    days={lc.data.calendar}
                    label="Submission activity — last 12 months"
                  />
                </div>
              </div>
            )}
          </Panel>
        </div>
      </section>
    </div>
  );
}
