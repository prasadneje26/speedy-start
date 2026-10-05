import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { fallbackProfile, fallbackProjects, type Project } from "@/data/portfolio";

const PortfolioPayloadSchema = z.object({
  profile: z.record(z.any()).optional(),
  projects: z.array(z.record(z.any())).optional(),
});

const runtimeState = globalThis as typeof globalThis & {
  __portfolioAdminData?: {
    profile: typeof fallbackProfile;
    projects: Project[];
  };
};

runtimeState.__portfolioAdminData ??= {
  profile: fallbackProfile,
  projects: fallbackProjects,
};

export const Route = createFileRoute("/api/portfolio")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json(
          runtimeState.__portfolioAdminData ?? {
            profile: fallbackProfile,
            projects: fallbackProjects,
          },
        );
      },
      POST: async ({ request }) => {
        let body: unknown;

        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON body." }, { status: 400 });
        }

        const parsed = PortfolioPayloadSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid portfolio payload." }, { status: 400 });
        }

        const nextProfile = {
          ...fallbackProfile,
          ...(parsed.data.profile ?? {}),
        };

        const nextProjects = Array.isArray(parsed.data.projects)
          ? (parsed.data.projects as Project[])
          : fallbackProjects;

        runtimeState.__portfolioAdminData = {
          profile: nextProfile,
          projects: nextProjects,
        };

        return Response.json(runtimeState.__portfolioAdminData);
      },
      DELETE: async () => {
        runtimeState.__portfolioAdminData = {
          profile: fallbackProfile,
          projects: fallbackProjects,
        };

        return Response.json({ success: true });
      },
    },
  },
});
