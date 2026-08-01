import { useState } from "react";
import { profile } from "@/data/portfolio";

/**
 * Portrait with a graceful monogram fallback: if the photo asset is missing
 * or fails to load, we render initials instead of a broken image frame.
 */
export function ProfilePhoto({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(!profile.photo);

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  if (failed) {
    return (
      <div
        aria-label={`Portrait placeholder for ${profile.name}`}
        role="img"
        className={`grid h-full w-full place-items-center bg-surface-2 ${className}`}
      >
        <span className="font-display text-6xl font-bold text-gradient">{initials}</span>
      </div>
    );
  }

  return (
    <img
      src={profile.photo}
      alt={`Portrait of ${profile.name}`}
      width={520}
      height={520}
      loading="eager"
      decoding="async"
      sizes="(max-width: 768px) 80vw, 340px"
      onError={() => setFailed(true)}
      className={`h-full w-full object-cover object-top ${className}`}
    />
  );
}
