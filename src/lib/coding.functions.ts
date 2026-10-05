import { createServerFn } from "@tanstack/react-start";

const GITHUB_USER = "prasadneje26";
const LEETCODE_USER = "parshyaneje26";
const ALFA_LEETCODE_API = "https://alfa-leetcode-api.onrender.com";

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

  // Current streak: count backwards, skipping today if it has no activity yet
  let current = 0;
  const today = new Date().toISOString().slice(0, 10);
  let i = days.length - 1;

  // Skip today if no contributions yet (it's still in progress)
  if (i >= 0 && days[i].date === today && days[i].count === 0) {
    i -= 1;
  }

  while (i >= 0 && days[i].count > 0) {
    current += 1;
    i -= 1;
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
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const headers: Record<string, string> = {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-site",
        "X-GitHub-Api-Version": "2022-11-28",
      };
      if (process.env.GITHUB_TOKEN) {
        headers["Authorization"] = `Bearer ${process.env.GITHUB_TOKEN}`;
      }

      const [userRes, reposRes, contribRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USER}`, {
          headers,
          signal: controller.signal,
        }),
        fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
          headers,
          signal: controller.signal,
        }),
        fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}?y=last`, {
          headers: { "User-Agent": "portfolio-site" },
          signal: controller.signal,
        }),
      ]).finally(() => clearTimeout(timeout));

      if (!userRes.ok) {
        console.error(`GitHub user API error: ${userRes.status}`);
        return null;
      }

      const user = (await userRes.json()) as {
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
        // Take the last 371 days (53 weeks × 7) for a full-year heatmap
        calendar = (data.contributions ?? []).slice(-371);
      } else {
        console.error(`GitHub contributions API error: ${contribRes.status}`);
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
    } catch (err) {
      console.error("getGithubStats failed:", err);
      return null;
    }
  },
);

// Fetch calendar for one year from LeetCode
const LEETCODE_QUERY = `
query userProfile($username: String!, $year: Int!) {
  matchedUser(username: $username) {
    username
    profile { ranking }
    submitStatsGlobal { acSubmissionNum { difficulty count } }
    userCalendar(year: $year) { submissionCalendar streak totalActiveDays }
  }
  allQuestionsCount { difficulty count }
}`;

async function fetchLeetcodeYear(
  username: string,
  year: number,
  signal: AbortSignal,
): Promise<{
  matchedUser: {
    username: string;
    profile: { ranking: number | null };
    submitStatsGlobal: { acSubmissionNum: { difficulty: string; count: number }[] };
    userCalendar: { submissionCalendar: string; streak: number; totalActiveDays: number } | null;
  } | null;
  allQuestionsCount: { difficulty: string; count: number }[];
} | null> {
  const res = await fetch("https://leetcode.com/graphql/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Referer: "https://leetcode.com/",
      Origin: "https://leetcode.com",
      "X-Requested-With": "XMLHttpRequest",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    },
    body: JSON.stringify({
      query: LEETCODE_QUERY,
      variables: { username, year },
    }),
    signal,
  });

  if (!res.ok) {
    console.error(`LeetCode GraphQL error for year ${year}: ${res.status}`);
    return null;
  }

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
    errors?: { message: string }[];
  };

  if (json.errors) {
    console.error("LeetCode GraphQL errors:", json.errors);
    return null;
  }

  return json.data ?? null;
}

type AlfaLeetcodeProfile = {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalEasy: number;
  totalMedium: number;
  totalHard: number;
  ranking: number | null;
  submissionCalendar: Record<string, number>;
};

async function fetchAlfaLeetcodeProfile(
  username: string,
  signal: AbortSignal,
): Promise<AlfaLeetcodeProfile | null> {
  const res = await fetch(`${ALFA_LEETCODE_API}/${username}/profile`, {
    headers: { "User-Agent": "portfolio-site", Accept: "application/json" },
    signal,
  });

  if (!res.ok) {
    console.error(`alfa-leetcode-api profile error: ${res.status}`);
    return null;
  }

  const data = (await res.json()) as AlfaLeetcodeProfile & {
    submissionCalendar?: Record<string, number> | string;
  };

  if (typeof data.submissionCalendar === "string") {
    try {
      data.submissionCalendar = JSON.parse(data.submissionCalendar) as Record<string, number>;
    } catch {
      data.submissionCalendar = {};
    }
  }

  return data;
}

function calendarFromSubmissionMap(
  byDate: Map<string, number>,
  now = new Date(),
): ContributionDay[] {
  const calendar: ContributionDay[] = [];
  const max = byDate.size > 0 ? Math.max(1, ...byDate.values()) : 1;

  for (let i = 364; i >= 0; i -= 1) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const count = byDate.get(key) ?? 0;
    calendar.push({ date: key, count, level: levelFor(count, max) });
  }

  return calendar;
}

function mergeSubmissionCalendars(
  ...sources: Array<Record<string, number> | string | undefined>
): Map<string, number> {
  const byDate = new Map<string, number>();

  for (const source of sources) {
    if (!source) continue;

    const parsed =
      typeof source === "string" ? (JSON.parse(source) as Record<string, number>) : source;

    for (const [ts, count] of Object.entries(parsed)) {
      const date = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
      byDate.set(date, (byDate.get(date) ?? 0) + Number(count));
    }
  }

  return byDate;
}

async function fetchLeetcodeViaAlfa(
  username: string,
  signal: AbortSignal,
): Promise<LeetcodeStats | null> {
  const now = new Date();
  const currentYear = now.getFullYear();
  const prevYear = currentYear - 1;

  const [profileRes, calendarCurrentRes, calendarPrevRes] = await Promise.all([
    fetchAlfaLeetcodeProfile(username, signal),
    fetch(`${ALFA_LEETCODE_API}/${username}/calendar?year=${currentYear}`, {
      headers: { "User-Agent": "portfolio-site", Accept: "application/json" },
      signal,
    }),
    fetch(`${ALFA_LEETCODE_API}/${username}/calendar?year=${prevYear}`, {
      headers: { "User-Agent": "portfolio-site", Accept: "application/json" },
      signal,
    }),
  ]);

  if (!profileRes) return null;

  const calendarPayloads: Array<Record<string, number> | string | undefined> = [
    profileRes.submissionCalendar,
  ];

  if (calendarCurrentRes.ok) {
    const current = (await calendarCurrentRes.json()) as { submissionCalendar?: string };
    calendarPayloads.push(current.submissionCalendar);
  }

  if (calendarPrevRes.ok) {
    const prev = (await calendarPrevRes.json()) as { submissionCalendar?: string };
    calendarPayloads.push(prev.submissionCalendar);
  }

  const byDate = mergeSubmissionCalendars(...calendarPayloads);
  const calendar = calendarFromSubmissionMap(byDate, now);
  const { current, longest } = streaks(calendar);

  return {
    username,
    ranking: profileRes.ranking ?? null,
    totalSolved: profileRes.totalSolved,
    easySolved: profileRes.easySolved,
    mediumSolved: profileRes.mediumSolved,
    hardSolved: profileRes.hardSolved,
    easyTotal: profileRes.totalEasy,
    mediumTotal: profileRes.totalMedium,
    hardTotal: profileRes.totalHard,
    acceptanceRate: null,
    submissionsLastYear: calendar.reduce((s, d) => s + d.count, 0),
    currentStreak: current,
    longestStreak: longest,
    activeDays: calendar.filter((d) => d.count > 0).length,
    calendar,
  };
}

export const getLeetcodeStats = createServerFn({ method: "GET" }).handler(
  async (): Promise<LeetcodeStats | null> => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      try {
        const alfa = await fetchLeetcodeViaAlfa(LEETCODE_USER, controller.signal);
        if (alfa) return alfa;
      } catch (err) {
        console.error("alfa-leetcode-api failed:", err);
      }

      // Fallback to direct GraphQL when the wrapper API is unavailable.
      const now = new Date();
      const currentYear = now.getFullYear();
      const prevYear = currentYear - 1;

      const [currentData, prevData] = await Promise.all([
        fetchLeetcodeYear(LEETCODE_USER, currentYear, controller.signal),
        fetchLeetcodeYear(LEETCODE_USER, prevYear, controller.signal),
      ]);

      if (!currentData?.matchedUser) {
        console.error("LeetCode: no matched user in response");
        return null;
      }

      const u = currentData.matchedUser;

      const pick = (arr: { difficulty: string; count: number }[], d: string) =>
        arr.find((x) => x.difficulty === d)?.count ?? 0;

      const solved = u.submitStatsGlobal.acSubmissionNum;
      const totals = currentData.allQuestionsCount ?? [];

      const byDate = new Map<string, number>();

      const addCalendar = (raw: string | undefined) => {
        if (!raw) return;
        const parsed: Record<string, number> = JSON.parse(raw);
        for (const [ts, count] of Object.entries(parsed)) {
          const date = new Date(Number(ts) * 1000).toISOString().slice(0, 10);
          byDate.set(date, (byDate.get(date) ?? 0) + Number(count));
        }
      };

      addCalendar(prevData?.matchedUser?.userCalendar?.submissionCalendar);
      addCalendar(u.userCalendar?.submissionCalendar);

      const calendar: ContributionDay[] = [];
      const max = byDate.size > 0 ? Math.max(1, ...byDate.values()) : 1;
      for (let i = 364; i >= 0; i -= 1) {
        const d = new Date(now);
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
        currentStreak: Math.max(current, u.userCalendar?.streak ?? 0),
        longestStreak: longest,
        activeDays: u.userCalendar?.totalActiveDays ?? calendar.filter((d) => d.count > 0).length,
        calendar,
      };
    } catch (err) {
      console.error("getLeetcodeStats failed:", err);
      return null;
    } finally {
      clearTimeout(timeout);
    }
  },
);
