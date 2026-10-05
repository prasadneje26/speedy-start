import { useEffect, useRef } from "react";

const REVEAL_SELECTOR =
  ".reveal, .reveal-left, .reveal-right, .reveal-fade, .reveal-scale, .section-slide, .slide-section";

/**
 * useReveal — attaches IntersectionObserver to the ref element itself
 * AND all reveal-class children inside it.
 *
 * When a child (or the element itself) scrolls into view it gets
 * the `is-visible` class, which triggers the CSS transition.
 *
 * Pass threshold / rootMargin to tune when the trigger fires.
 */
export function useReveal(options?: { threshold?: number; rootMargin?: string; once?: boolean }) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { threshold = 0.1, rootMargin = "0px 0px -60px 0px", once = true } = options ?? {};

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            entry.target.classList.remove("is-visible");
          }
        }
      },
      { threshold, rootMargin },
    );

    // Observe the section wrapper itself (section-slide)
    observer.observe(el);

    // Also observe all reveal children inside this section
    const children = el.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ref;
}
