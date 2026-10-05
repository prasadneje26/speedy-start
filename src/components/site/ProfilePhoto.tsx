import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

/**
 * Portrait with a graceful monogram fallback. We start on the monogram and only
 * swap in the photo once it has actually decoded, so a missing/404 asset never
 * renders a broken image frame (SSR markup would miss a client-side onError).
 */
export function ProfilePhoto({ className = "" }: { className?: string }) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!profile.photo) {
      setError(true);
      return;
    }
    const img = new Image();
    img.src = profile.photo;
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
  }, []);

  const initials = profile.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  // Show monogram if no photo, photo failed to load, or not yet loaded
  if (!profile.photo || error || !loaded) {
    return (
      <div
        aria-label={`Portrait placeholder for ${profile.name}`}
        role="img"
        className={`grid h-full w-full place-items-center bg-gradient-to-br from-orange-400 via-orange-500 to-red-600 ${className}`}
      >
        <span className="font-display text-6xl font-bold text-white drop-shadow-lg">
          {initials}
        </span>
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
      className={`h-full w-full object-cover object-center ${className}`}
    />
  );
}
