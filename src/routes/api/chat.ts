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
        const parsed = BodySchema.safeParse(await request.json());
        if (!parsed.success) {
          return Response.json({ error: "Invalid request." }, { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) {
          return Response.json({ error: "Assistant is not configured." }, { status: 500 });
        }

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: "google/gemini-3.6-flash",
            messages: [
              { role: "system", content: assistantContext },
              ...parsed.data.messages,
            ],
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
