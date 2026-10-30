import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAPABILITIES, GALLERY, LINKS, PORTRAIT, PROJECTS, STATS } from "../data";
import { Arrow, GradientButton, SectionHeader, scrollToId } from "./ui";

gsap.registerPlugin(ScrollTrigger);

const wrap = "max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16";
const ease = [0.25, 0.1, 0.25, 1] as const;

/* ---------------------------------------------------------------- Works */
export function Works() {
  const [featured, ...rest] = PROJECTS;
  return (
    <section id="work" className="bg-bg py-16 md:py-24 scroll-mt-24">
      <div className={wrap}>
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured"
          italic="projects"
          sub="Six client sites, each built from the first page to launch."
          action={<GradientButton href={LINKS.upwork} external>View my Upwork <Arrow /></GradientButton>}
        />

        {/* Latest project — feature band */}
        <motion.a
          href={featured.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${featured.title} live site`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          viewport={{ once: true, margin: "-80px" }}
          className="group grid md:grid-cols-2 gap-0 overflow-hidden rounded-3xl border border-stroke bg-surface mb-6"
        >
          <div className="order-2 md:order-1 flex flex-col justify-center p-7 md:p-12">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-accent mb-5">
              <span className="w-2 h-2 rounded-full bg-accent pulse-dot" aria-hidden /> Latest project
            </span>
            <h3 className="text-4xl md:text-5xl lg:text-6xl font-display italic leading-[0.95] mb-4">{featured.title}</h3>
            <p className="text-xs uppercase tracking-[0.25em] text-muted mb-5">{featured.platform} · {featured.year}</p>
            <p className="text-base md:text-lg text-muted max-w-md mb-7">{featured.summary}</p>
            <span className="inline-flex items-center gap-2 text-sm font-medium group-hover:text-accent transition-colors">View live site <Arrow /></span>
          </div>
          <div className="order-1 md:order-2 relative overflow-hidden aspect-[16/10] md:aspect-auto md:min-h-[360px]">
            <img src={featured.image} alt={`${featured.title} home page`} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
          </div>
        </motion.a>

        {/* Bento grid — the rest */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {rest.map((p, i) => (
            <motion.a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${p.title} live site`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: (i % 2) * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className={`group relative block overflow-hidden bg-surface border border-stroke rounded-3xl ${p.span} ${p.aspect}`}
            >
              <img src={p.image} alt={`${p.title} home page`} loading="lazy" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" aria-hidden />
              <span className="absolute left-5 bottom-5 right-5 flex items-end justify-between gap-4 transition-opacity duration-300 group-hover:opacity-0">
                <span>
                  <span className="block text-[11px] text-white/70 uppercase tracking-[0.25em] mb-1">{p.no} · {p.platform} · {p.year}</span>
                  <span className="block text-xl md:text-2xl font-display italic text-white">{p.title}</span>
                </span>
              </span>
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center bg-bg/90 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <span className="rounded-full bg-text-primary text-bg text-sm px-5 py-2.5 group-hover:bg-accent group-hover:text-white transition-colors">
                  View <span className="font-display italic">{p.title}</span> <span aria-hidden>↗</span>
                </span>
                <span className="text-sm text-muted max-w-xs">{p.summary}</span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------- What I do (numbered blocks) */
export function Services() {
  return (
    <section id="services" className="bg-bg py-16 md:py-24 scroll-mt-24">
      <div className={wrap}>
        <SectionHeader
          eyebrow="What I do"
          title="How I can"
          italic="help"
          sub="Build it, test it or fix it. Pick what you need."
          action={<GradientButton onClick={() => scrollToId("contact")}>Start a project <Arrow /></GradientButton>}
        />
        <div className="border-t border-stroke">
          {CAPABILITIES.map((c, i) => (
            <motion.div
              key={c.no}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease, delay: i * 0.06 }}
              viewport={{ once: true, margin: "-80px" }}
              className="grid md:grid-cols-12 gap-5 md:gap-8 py-8 md:py-11 border-b border-stroke"
            >
              <div className="md:col-span-4 flex items-start gap-5">
                <span className="text-4xl md:text-5xl font-display italic text-accent leading-none">{c.no}</span>
                <div>
                  <h3 className="text-2xl md:text-3xl tracking-tight leading-tight">{c.title}</h3>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-muted mt-2">{c.meta}</p>
                </div>
              </div>
              <ul className="md:col-span-8 flex flex-col gap-3 md:pl-6">
                {c.points.map((pt) => (
                  <li key={pt} className="flex gap-3 text-base md:text-lg text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span><span className="text-text-primary">{pt}</span></span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- About */
export function About() {
  return (
    <section id="about" className="bg-bg py-16 md:py-24 scroll-mt-24">
      <div className={`${wrap} grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14 items-center`}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          viewport={{ once: true, margin: "-80px" }}
          className="md:col-span-5"
        >
          <div className="group relative mx-auto max-w-[380px] md:max-w-none">
            <span className="absolute -inset-[2px] rounded-[26px] accent-gradient opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-stroke bg-surface">
              <img src={PORTRAIT} alt="Portrait of Asad Ali" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" aria-hidden />
              <span className="absolute left-5 bottom-5 inline-flex items-center gap-2 rounded-full bg-bg/85 backdrop-blur-md border border-stroke px-4 py-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-accent pulse-dot" aria-hidden />
                Available for projects
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.12 }}
          viewport={{ once: true, margin: "-80px" }}
          className="md:col-span-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-text-primary/40" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">About</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02] mb-6">
            A developer who thinks like a <span className="font-display italic">tester</span>
          </h2>
          <p className="text-lg md:text-xl mb-5 max-w-xl">
            Most website problems are found by the client after launch. I'd rather find them first.
          </p>
          <p className="text-sm md:text-base text-muted mb-8 max-w-xl">
            I'm Asad. I build in Framer, Webflow and WordPress, and QA testing is part of my daily work as VConekt's QA Master. So every site I hand over has been checked page by page: links, forms, screen sizes and speed. You also get a short note on how to update it yourself.
          </p>
          <div className="flex flex-wrap gap-2 mb-9">
            {["Framer", "Webflow", "WordPress", "Elementor", "Figma", "QA testing"].map((t) => (
              <span key={t} className="rounded-full border border-stroke bg-surface px-4 py-1.5 text-xs text-muted">{t}</span>
            ))}
          </div>
          <GradientButton variant="solid" onClick={() => scrollToId("contact")}>Work with me <Arrow /></GradientButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------- Explorations (parallax) */
export function Explorations() {
  const section = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const colA = useRef<HTMLDivElement>(null);
  const colB = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({ trigger: section.current, start: "top top", end: "bottom bottom", pin: content.current, pinSpacing: false });
      const scrub = { trigger: section.current, start: "top bottom", end: "bottom top", scrub: true };
      gsap.fromTo(colA.current, { y: 120 }, { y: -220, ease: "none", scrollTrigger: scrub });
      gsap.fromTo(colB.current, { y: 380 }, { y: -420, ease: "none", scrollTrigger: scrub });
    }, section);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const card = (i: number) => {
    const g = GALLERY[i];
    return (
      <button
        key={g.src}
        type="button"
        onClick={() => setOpen(i)}
        aria-label={`Open image: ${g.alt}`}
        style={{ rotate: `${g.rotate}deg` }}
        className="pointer-events-auto block w-full max-w-[320px] aspect-square overflow-hidden rounded-3xl border border-stroke bg-surface shadow-xl shadow-black/10 transition-transform duration-500 hover:scale-[1.04] hover:!rotate-0"
      >
        <img src={g.src} alt={g.alt} loading="lazy" className="w-full h-full object-cover" />
      </button>
    );
  };

  return (
    <section ref={section} className="relative min-h-[300vh] bg-bg overflow-hidden">
      <div ref={content} className="relative z-10 h-screen flex flex-col items-center justify-center text-center px-6">
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-text-primary/40" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
          <span className="w-8 h-px bg-text-primary/40" />
        </div>
        <h2 className="text-5xl md:text-7xl tracking-tight leading-[1.02] mb-5">Inside the <span className="font-display italic">builds</span></h2>
        <p className="text-sm md:text-base text-muted max-w-sm mb-8">Inner pages and details from the projects above. Click any image to enlarge it.</p>
        <GradientButton href={LINKS.fiverr} external>See my Fiverr <Arrow /></GradientButton>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20">
        <div className="grid grid-cols-2 gap-12 md:gap-40 max-w-[1400px] mx-auto px-5 md:px-10 pt-[70vh]">
          <div ref={colA} className="flex flex-col items-start gap-[42vh]">{[0, 2, 4].map(card)}</div>
          <div ref={colB} className="flex flex-col items-end gap-[42vh]">{[1, 3, 5].map(card)}</div>
        </div>
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={GALLERY[open].alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 cursor-zoom-out"
          >
            <motion.img
              src={GALLERY[open].src}
              alt={GALLERY[open].alt}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.35, ease }}
              className="max-h-[85vh] max-w-full rounded-2xl border border-white/10"
            />
            <button type="button" autoFocus onClick={() => setOpen(null)} className="absolute top-6 right-6 text-sm text-white/70 hover:text-white">Close ✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------------------------------------------------------------- Stats */
function Counter({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (v) => (node.textContent = String(Math.round(v)).padStart(2, "0")) });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>00</span>;
}

export function Stats() {
  return (
    <section className="relative z-30 bg-bg py-16 md:py-24">
      <div className={`${wrap} grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-6`}>
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: i * 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
            className="border-t border-text-primary/20 pt-6"
          >
            <p className="text-7xl md:text-8xl font-display italic leading-none mb-3 tabular-nums"><Counter to={s.value} />{s.suffix}</p>
            <p className="text-sm text-muted">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Contact */
export function Contact() {
  const track = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tween = gsap.to(track.current, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
    return () => { tween.kill(); };
  }, []);

  return (
    <footer id="contact" className="relative z-30 bg-surface pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden scroll-mt-24">
      <span className="absolute inset-0 paper-grain opacity-50" aria-hidden />
      <div className="relative">
        <div className="overflow-hidden mb-14 md:mb-20 border-y border-stroke py-6" aria-hidden>
          <div ref={track} className="flex w-max whitespace-nowrap text-6xl md:text-8xl lg:text-9xl font-display italic text-text-primary">
            {Array.from({ length: 10 }, (_, i) => <span key={i} className="pr-8">BUILT. TESTED. SHIPPED. <span className="text-accent">•</span> </span>)}
          </div>
        </div>

        <div className={`${wrap} flex flex-col items-center text-center`}>
          <p className="text-xs text-muted uppercase tracking-[0.3em] mb-5">Contact</p>
          <h2 className="text-4xl md:text-6xl tracking-tight leading-[1.02] mb-5">Have a site to build, fix or <span className="font-display italic text-accent">test?</span></h2>
          <p className="text-sm md:text-base text-muted max-w-md mb-10">Send me an email, or message me where you already work. I reply the same day.</p>
          <div className="flex flex-wrap justify-center gap-4 mb-20 md:mb-28">
            <GradientButton variant="solid" href={`mailto:${LINKS.email}?subject=${encodeURIComponent("Project enquiry")}`}>Email me <Arrow /></GradientButton>
            <GradientButton href={LINKS.upwork} external>Hire me on Upwork <Arrow /></GradientButton>
            <GradientButton href={LINKS.linkedin} external>Message on LinkedIn <Arrow /></GradientButton>
            <GradientButton href={LINKS.cv} external>Download CV <Arrow /></GradientButton>
          </div>

          <div className="w-full flex flex-col md:flex-row items-center justify-between gap-5 border-t border-stroke pt-6 text-sm text-muted">
            <span>© {new Date().getFullYear()} Asad Ali</span>
            <nav aria-label="Social" className="flex gap-6">
              <a className="hover:text-text-primary transition-colors" href={`mailto:${LINKS.email}`}>Email</a>
              <a className="hover:text-text-primary transition-colors" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a className="hover:text-text-primary transition-colors" href={LINKS.upwork} target="_blank" rel="noopener noreferrer">Upwork</a>
              <a className="hover:text-text-primary transition-colors" href={LINKS.fiverr} target="_blank" rel="noopener noreferrer">Fiverr</a>
              <a className="hover:text-text-primary transition-colors" href={LINKS.cv} target="_blank" rel="noopener noreferrer">CV</a>
            </nav>
            <span className="inline-flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent pulse-dot" aria-hidden />
              Available for projects
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
