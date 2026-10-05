import { useEffect } from "react";

/** Enables scroll-snap on the homepage only; removed on unmount. */
export function useHomeScrollSnap() {
  useEffect(() => {
    document.documentElement.classList.add("home-scroll-snap");
    return () => document.documentElement.classList.remove("home-scroll-snap");
  }, []);
}
