import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

/**
 * Portrait with a graceful monogram fallback. We start on the monogram and only
 * swap in the photo once it has actually decoded, so a missing/404 asset never
 * renders a broken image frame (SSR markup would miss a client-side onError).
 */
export function ProfilePhoto({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!profile.photo) return;
    const img = new Image();
    img.src = profile.photo;
    img.onload = () => setLoaded(true);
  }, []);

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  if (!loaded) {
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
