import { createServerFn } from "@tanstack/react-start";

const GITHUB_USER = "prasadneje26";
const LEETCODE_USER = "parshyaneje26";

export type ContributionDay = { date: string; count: number; level: number };

export type GithubStats = {
  login: string;
  name: string | null;
  avatar: string;
  bio: string | null;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  contributionsLastYear: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  calendar: ContributionDay[];
  repos: {
    name: string;
    description: string | null;
    url: string;
    language: string | null;
    stars: number;
    updatedAt: string;
  }[];
};

export type LeetcodeStats = {
  username: string;
  ranking: number | null;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  acceptanceRate: number | null;
  submissionsLastYear: number;
  currentStreak: number;
  longestStreak: number;
  activeDays: number;
  calendar: ContributionDay[];
};

function streaks(days: ContributionDay[]) {
  let longest = 0;
  let running = 0;
  for (const d of days) {
    running = d.count > 0 ? running + 1 : 0;
    if (running > longest) longest = running;
  }
  let current = 0;
  for (let i = days.length - 1; i >= 0; i -= 1) {
    if (days[i].count > 0) current += 1;
    else if (i !== days.length - 1) break;
  }
  return { current, longest };
}

function levelFor(count: number, max: number) {
  if (count <= 0) return 0;
  const ratio = count / Math.max(max, 1);
  if (ratio > 0.6) return 4;
  if (ratio > 0.3) return 3;
  if (ratio > 0.12) return 2;
  return 1;
}

export const getGithubStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<GithubStats | null> => {
    try {
      const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio" };
      const [userRes, reposRes, contribRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USER}`, { headers }),
        fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
          headers,
        }),
        fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`),
      ]);

      if (!userRes.ok) return null;
      const user = (await userRes.json()) as Record<string, never> & {
        login: string;
        name: string | null;
        avatar_url: string;
        bio: string | null;
        followers: number;
        following: number;
        public_repos: number;
      };

      const repos = reposRes.ok
        ? ((await reposRes.json()) as {
            name: string;
            description: string | null;
            html_url: string;
            language: string | null;
            stargazers_count: number;
            updated_at: string;
            fork: boolean;
          }[])
        : [];

      let calendar: ContributionDay[] = [];
      if (contribRes.ok) {
        const data = (await contribRes.json()) as {
          contributions: { date: string; count: number; level: number }[];
        };
        calendar = (data.contributions ?? []).slice(-371);
      }

      const { current, longest } = streaks(calendar);

      return {
        login: user.login,
        name: user.name,
        avatar: user.avatar_url,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        totalStars: repos.reduce((sum, r) => sum + r.stargazers_count, 0),
        contributionsLastYear: calendar.reduce((sum, d) => sum + d.count, 0),
        currentStreak: current,
        longestStreak: longest,
        activeDays: calendar.filter((d) => d.count > 0).length,
        calendar,
        repos: repos
          .filter((r) => !r.fork)
          .slice(0, 6)
          .map((r) => ({
            name: r.name,
            description: r.description,
            url: r.html_url,
            language: r.language,
            stars: r.stargazers_count,
            updatedAt: r.updated_at,
          })),
      };
    } catch {
      return null;
    }
  },
);

const LEETCODE_QUERY = `
query userProfile($username: String!, $year: Int) {
  matchedUser(username: $username) {
    username
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar(year: $year) { submissionCalendar streak totalActiveDays }
  }
  allQuestionsCount { difficulty count }
}`;

export const getLeetcodeStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<LeetcodeStats | null> => {
    try {
      const res = await fetch("https://leetcode.com/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Referer: "https://leetcode.com",
          "User-Agent": "Mozilla/5.0 portfolio",
        },
        body: JSON.stringify({
          query: LEETCODE_QUERY,
          variables: { username: LEETCODE_USER, year: new Date().getFullYear() },
        }),
      });
      if (!res.ok) return null;
      const json = (await res.json()) as {
        data?: {
          matchedUser: {
            username: string;
            profile: { ranking: number | null };
            submitStatsGlobal: { acSubmissionNum: { difficulty: string; count: number }[] };
            userCalendar: {
              submissionCalendar: string;
              streak: number;
              totalActiveDays: number;
            } | null;
          } | null;
          allQuestionsCount: { difficulty: string; count: number }[];
        };
      };

      const u = json.data?.matchedUser;
      if (!u) return null;

      const pick = (arr: { difficulty: string; count: number }[], d: string) =>
        arr.find((x) => x.difficulty === d)?.count ?? 0;

      const solved = u.submitStatsGlobal.acSubmissionNum;
      const totals = json.data?.allQuestionsCount ?? [];

      const rawCalendar: Record<string, number> = u.userCalendar?.submissionCalendar
        ? JSON.parse(u.userCalendar.submissionCalendar)
        : {};

      const byDate = new Map<string, number>();
      for (const [ts, count] of Object.entries(rawCalendar)) {
        const date = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
        byDate.set(date, (byDate.get(date) ?? 0) + Number(count));
      }

      const calendar: ContributionDay[] = [];
      const today = new Date();
      const max = Math.max(1, ...byDate.values());
      for (let i = 364; i >= 0; i -= 1) {
        const d = new Date(today);
        d.setDate(d.getDate() - i);
        const key = d.toISOString().slice(0, 10);
        const count = byDate.get(key) ?? 0;
        calendar.push({ date: key, count, level: levelFor(count, max) });
      }

      const { current, longest } = streaks(calendar);

      return {
        username: u.username,
        ranking: u.profile?.ranking ?? null,
        totalSolved: pick(solved, "All"),
        easySolved: pick(solved, "Easy"),
        mediumSolved: pick(solved, "Medium"),
        hardSolved: pick(solved, "Hard"),
        easyTotal: pick(totals, "Easy"),
        mediumTotal: pick(totals, "Medium"),
        hardTotal: pick(totals, "Hard"),
        acceptanceRate: null,
        submissionsLastYear: calendar.reduce((s, d) => s + d.count, 0),
        currentStreak: current,
        longestStreak: Math.max(longest, u.userCalendar?.streak ?? 0),
        activeDays: u.userCalendar?.totalActiveDays ?? calendar.filter((d) => d.count > 0).length,
        calendar,
      };
    } catch {
      return null;
    }
  },
);
