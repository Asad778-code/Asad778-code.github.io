import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

/** Starts inertia scrolling and keeps GSAP ScrollTrigger in sync. Returns a cleanup function. */
export function startSmoothScroll() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  const instance = new Lenis({ duration: 1.15, smoothWheel: true });
  lenis = instance;
  instance.on("scroll", ScrollTrigger.update);
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    instance.destroy();
    lenis = null;
  };
}

export const pauseScroll = (paused: boolean) => (paused ? lenis?.stop() : lenis?.start());

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: id === "home" ? 0 : -80, duration: 1.4 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}
