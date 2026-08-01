import type { ContributionDay } from "@/lib/coding.functions";

export function ContributionGrid({
  days,
  label,
}: {
  days: ContributionDay[];
  label: string;
}) {
  if (!days.length) return null;

  const weeks: ContributionDay[][] = [];
  for (let i = 0; i < days.length; i += 7) weeks.push(days.slice(i, i + 7));

  const tone = [
    "bg-secondary/60",
    "bg-primary/25",
    "bg-primary/45",
    "bg-primary/70",
    "bg-primary",
  ];

  return (
    <div className="min-w-0">
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-[3px]">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((d) => (
                <span
                  key={d.date}
                  title={`${d.count} on ${d.date}`}
                  className={`h-[10px] w-[10px] rounded-[2px] ${tone[Math.min(d.level, 4)]}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span>{label}</span>
        <span className="flex items-center gap-1.5">
          Less
          {tone.map((t) => (
            <span key={t} className={`h-[10px] w-[10px] rounded-[2px] ${t}`} />
          ))}
          More
        </span>
      </div>
    </div>
  );
}

export function StatTile({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/60 px-4 py-3">
      <p className="font-display text-2xl font-bold">{value}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
