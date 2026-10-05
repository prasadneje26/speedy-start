import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { deliverContactSubmission } from "@/lib/contact-delivery";

const ContactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});

const runtimeState = globalThis as typeof globalThis & {
  __portfolioContactSubmissions?: Array<{
    name: string;
    email: string;
    message: string;
    createdAt: string;
  }>;
};

runtimeState.__portfolioContactSubmissions ??= [];

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      GET: async () => {
        return Response.json({
          success: true,
          count: runtimeState.__portfolioContactSubmissions?.length ?? 0,
        });
      },
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json(
            { error: "Please provide a valid JSON request body." },
            { status: 400 },
          );
        }

        const parsed = ContactSchema.safeParse(body);

        if (!parsed.success) {
          return Response.json(
            { error: "Please provide a valid name, email and message." },
            { status: 400 },
          );
        }

        const payload = {
          ...parsed.data,
          createdAt: new Date().toISOString(),
        };

        runtimeState.__portfolioContactSubmissions ??= [];
        runtimeState.__portfolioContactSubmissions.push(payload);

        await deliverContactSubmission(payload);

        return Response.json({
          success: true,
          message: "Thanks — your message has been received.",
          submissionsCount: runtimeState.__portfolioContactSubmissions.length,
        });
      },
    },
  },
});
