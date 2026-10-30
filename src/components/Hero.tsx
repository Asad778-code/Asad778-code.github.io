import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LINKS } from "../data";
import { GradientButton, SpinBadge, scrollToId } from "./ui";

const NAV = [
  { label: "Home", id: "home" },
  { label: "Work", id: "work" },
  { label: "What I do", id: "services" },
  { label: "About", id: "about" },
];

export function Navbar() {
  const scrolledRef = useRef(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = headerRef.current?.querySelector("nav");
    const onScroll = () => {
      const s = window.scrollY > 100;
      if (s !== scrolledRef.current) {
        scrolledRef.current = s;
        nav?.classList.toggle("shadow-lg", s);
        nav?.classList.toggle("shadow-black/5", s);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <nav aria-label="Main" className="inline-flex items-center rounded-full backdrop-blur-md border border-stroke bg-bg/80 px-2 py-2 transition-shadow duration-300">
        <button type="button" onClick={() => scrollToId("home")} aria-label="Asad Ali, back to top" className="group relative w-9 h-9 rounded-full p-[2px] transition-transform duration-300 hover:scale-110">
          <span className="absolute inset-0 rounded-full accent-gradient" aria-hidden />
          <span className="relative flex w-full h-full items-center justify-center rounded-full bg-bg font-display italic text-[13px]">AA</span>
        </button>
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" aria-hidden />
        {NAV.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => scrollToId(n.id)}
            className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-muted hover:text-text-primary hover:bg-surface transition-colors"
          >
            {n.label}
          </button>
        ))}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" aria-hidden />
        <button type="button" onClick={() => scrollToId("contact")} className="group relative rounded-full">
          <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
          <span className="relative inline-flex items-center gap-1 rounded-full bg-text-primary text-bg text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2 group-hover:bg-accent group-hover:text-white transition-colors">
            Say hi <span aria-hidden>↗</span>
          </span>
        </button>
      </nav>
    </header>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(".name-reveal", { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1.2, delay: 0.1 })
        .fromTo(".blur-in", { opacity: 0, filter: "blur(10px)", y: 20 }, { opacity: 1, filter: "blur(0px)", y: 0, duration: 1, stagger: 0.12 }, 0.3);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  return (
    <section id="home" ref={root} className="relative min-h-screen flex items-center overflow-hidden">
      <span className="absolute inset-0 paper-grain opacity-60" aria-hidden />
      <span className="absolute -top-32 -right-24 h-[32rem] w-[32rem] rounded-full bg-accent/10 blur-3xl" aria-hidden />

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 pt-28 pb-24">
        <p className="blur-in opacity-0 flex flex-wrap items-center gap-3 text-xs md:text-sm text-muted uppercase tracking-[0.28em] mb-8">
          <span className="w-2 h-2 rounded-full bg-accent pulse-dot" aria-hidden />
          Available for freelance · Remote
        </p>

        <div className="flex items-start justify-between gap-6">
          <h1 className="name-reveal opacity-0 text-7xl md:text-[8.5rem] lg:text-[10rem] font-display italic leading-[0.85] tracking-tight mb-7">
            Asad Ali
          </h1>
          <div className="blur-in opacity-0 hidden md:block shrink-0 pt-4">
            <SpinBadge />
          </div>
        </div>

        <p className="blur-in opacity-0 text-2xl md:text-4xl lg:text-5xl leading-[1.12] tracking-tight max-w-3xl mb-8">
          I build websites — then I try to <span className="font-display italic text-accent">break them.</span>
        </p>

        <p className="blur-in opacity-0 text-base md:text-lg text-muted max-w-xl mb-10">
          I'm Asad, a web developer and QA tester. I design and build sites in Framer, Webflow and WordPress, then test every page before it ships. Recent work for <span className="text-text-primary">Money Days</span>, <span className="text-text-primary">Aaron Signature</span> and <span className="text-text-primary">Malik Forex Academy</span>.
        </p>

        <div className="blur-in opacity-0 inline-flex flex-wrap gap-4">
          <GradientButton variant="solid" onClick={() => scrollToId("work")}>See the work</GradientButton>
          <GradientButton onClick={() => scrollToId("contact")}>Get in touch</GradientButton>
          <GradientButton href={LINKS.cv} external>Download CV</GradientButton>
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
