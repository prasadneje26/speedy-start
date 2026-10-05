import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { assistantContext } from "@/data/portfolio";

const BodySchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      }),
    )
    .min(1)
    .max(20),
});

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request payload." }, { status: 400 });
        }

        const parsed = BodySchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }

        const key = process.env.OPENAI_API_KEY;
        if (!key) {
          return Response.json(
            {
              error:
                "The AI assistant is not configured. Add OPENAI_API_KEY to your environment, then restart the app.",
            },
            { status: 500 },
          );
        }

        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [{ role: "system", content: assistantContext }, ...parsed.data.messages],
          }),
        });

        if (!res.ok) {
          const detail = await res.text();
          console.error(`AI gateway error [${res.status}]: ${detail}`);
          const message =
            res.status === 429
              ? "Too many requests right now — please try again in a moment."
              : res.status === 402
                ? "The assistant is temporarily unavailable (usage limit reached)."
                : "The assistant could not respond right now.";
          return Response.json({ error: message }, { status: res.status });
        }

        const data = (await res.json()) as {
          choices?: Array<{ message?: { content?: string } }>;
        };
        const reply = data.choices?.[0]?.message?.content?.trim();
        if (!reply) {
          return Response.json({ error: "Empty response from the assistant." }, { status: 502 });
        }

        return Response.json({ reply });
      },
    },
  },
});
