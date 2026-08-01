import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <p className="eyebrow">/ {eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-muted-foreground">{description}</p>}
    </div>
  );
}
