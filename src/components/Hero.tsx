import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ROLES } from "../data";
import { BgVideo, GradientButton, scrollToId } from "./ui";

const NAV = [
  { label: "Home", id: "home" },
  { label: "Work", id: "work" },
  { label: "Services", id: "services" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.id); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <nav aria-label="Main" className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${scrolled ? "shadow-md shadow-black/10" : ""}`}>
        <button type="button" onClick={() => scrollToId("home")} aria-label="Asad Ali, back to top" className="group relative w-9 h-9 rounded-full p-[2px] transition-transform duration-300 hover:scale-110">
          <span className="absolute inset-0 rounded-full bg-[linear-gradient(90deg,#89AACC,#4E85BF)] group-hover:bg-[linear-gradient(270deg,#89AACC,#4E85BF)]" aria-hidden />
          <span className="relative flex w-full h-full items-center justify-center rounded-full bg-bg font-display italic text-[13px]">AA</span>
        </button>
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" aria-hidden />
        {NAV.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => scrollToId(n.id)}
            aria-current={active === n.id ? "true" : undefined}
            className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors ${active === n.id ? "text-text-primary bg-stroke/50" : "text-muted hover:text-text-primary hover:bg-stroke/50"}`}
          >
            {n.label}
          </button>
        ))}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" aria-hidden />
        <button type="button" onClick={() => scrollToId("contact")} className="group relative rounded-full">
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-surface backdrop-blur-md text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2">
            Say hi <span aria-hidden>↗</span>
          </span>
        </button>
      </nav>
    </header>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [role, setRole] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRole((r) => (r + 1) % ROLES.length), 2000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".name-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 })
        .fromTo(".blur-in", { opacity: 0, filter: "blur(10px)", y: 20 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.1 }, 0.3);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="home" ref={root} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <BgVideo />
      <div className="absolute inset-0 bg-black/20" aria-hidden />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" aria-hidden />

      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-24 pb-28">
        <h1 className="name-reveal opacity-0 text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">Asad Ali</h1>
        <p className="blur-in opacity-0 text-base md:text-xl text-muted mb-5">
          <span key={role} className="font-display italic text-text-primary animate-role-fade-in inline-block">{ROLES[role]}</span>
        </p>
        <p className="blur-in opacity-0 text-sm md:text-base text-muted max-w-md mb-12">
          I build websites in Framer, Webflow and WordPress, and test every page before it reaches you.
        </p>
        <div className="blur-in opacity-0 inline-flex flex-wrap justify-center gap-4">
          <GradientButton variant="solid" onClick={() => scrollToId("work")}>See works</GradientButton>
          <GradientButton onClick={() => scrollToId("contact")}>Reach out...</GradientButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3" aria-hidden>
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <span className="relative w-px h-10 bg-stroke overflow-hidden">
          <span className="absolute inset-x-0 top-0 h-1/2 bg-text-primary animate-scroll-down" />
        </span>
      </div>
    </section>
  );
}
