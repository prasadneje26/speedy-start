import { useEffect, useRef, type ReactNode, type RefObject } from "react";
import { useReveal } from "@/hooks/use-reveal";

type SlideSectionProps = {
  id?: string;
  className?: string;
  children: ReactNode;
  /** Pin section to at least one viewport height (default true). */
  snap?: boolean;
  /** Disable scroll-linked parallax (e.g. hero on first paint). */
  parallax?: boolean;
};

/**
 * Full-viewport slide section with scroll-driven enter/exit motion.
 * Pairs with `.home-scroll-snap` on `<html>` for proximity snapping.
 */
export function SlideSection({
  id,
  className = "",
  children,
  snap = true,
  parallax = true,
}: SlideSectionProps) {
  const sectionRef = useReveal({ threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!parallax) return;

    const section = (sectionRef as RefObject<HTMLElement>).current;
    const inner = innerRef.current;
    if (!section || !inner) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const enter = Math.min(1, Math.max(0, 1 - rect.top / vh));
      const exit = Math.min(1, Math.max(0, -rect.top / (vh * 0.9)));

      section.style.setProperty("--slide-enter", enter.toFixed(3));
      section.style.setProperty("--slide-exit", exit.toFixed(3));
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [parallax, sectionRef]);

  return (
    <section
      id={id}
      ref={sectionRef as RefObject<HTMLElement>}
      className={`slide-section ${snap ? "slide-section--snap" : ""} ${className}`}
    >
      <div ref={innerRef} className="slide-section__inner">
        {children}
      </div>
    </section>
  );
}
