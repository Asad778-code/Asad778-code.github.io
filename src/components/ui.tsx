import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { HLS_SRC } from "../data";

export const scrollToId = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

type BtnProps = { children: ReactNode; href?: string; onClick?: () => void; variant?: "solid" | "outline"; external?: boolean; className?: string };

/** Pill button whose border turns into the accent gradient on hover. */
export function GradientButton({ children, href, onClick, variant = "outline", external, className = "" }: BtnProps) {
  const inner =
    variant === "solid"
      ? "bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary"
      : "bg-bg text-text-primary border-2 border-stroke group-hover:border-transparent";
  const body = (
    <>
      <span className="absolute -inset-[2px] rounded-full accent-gradient opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
      <span className={`relative inline-flex items-center gap-2 rounded-full text-sm px-7 py-3.5 transition-colors duration-300 ${inner}`}>{children}</span>
    </>
  );
  const cls = `group relative inline-flex rounded-full transition-transform duration-300 hover:scale-105 ${className}`;
  return href ? (
    <a href={href} className={cls} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{body}</a>
  ) : (
    <button type="button" onClick={onClick} className={cls}>{body}</button>
  );
}

export function SectionHeader({ eyebrow, title, italic, sub, action }: { eyebrow: string; title: string; italic: string; sub: string; action?: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      className="flex items-end justify-between gap-8 mb-10 md:mb-14"
    >
      <div>
        <div className="flex items-center gap-3 mb-5">
          <span className="w-8 h-px bg-stroke" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">{eyebrow}</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.05] mb-4">
          {title} <span className="font-display italic">{italic}</span>
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md">{sub}</p>
      </div>
      {action && <div className="hidden md:block shrink-0">{action}</div>}
    </motion.div>
  );
}

/** Animated star vortex drawn in code. Shown under the video, so the hero never looks empty if the stream fails. */
function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, visible = true;
    const stars = Array.from({ length: 320 }, () => ({
      r: 0.12 + Math.random() * 1.1,
      a: Math.random() * Math.PI * 2,
      s: 0.0006 + Math.random() * 0.0022,
      size: Math.random() < 0.08 ? 1.8 : 0.5 + Math.random() * 0.9,
      warm: Math.random() < 0.07,
    }));
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#05070a"; ctx.fillRect(0, 0, w, h);
    };
    const draw = () => {
      const cx = w / 2, cy = -h * 0.12, R = Math.max(w, h) * 0.75;
      ctx.fillStyle = "rgba(5, 7, 10, 0.16)"; ctx.fillRect(0, 0, w, h);
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.6);
      glow.addColorStop(0, "rgba(96, 160, 210, 0.10)"); glow.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = glow; ctx.fillRect(0, 0, w, h);
      for (const st of stars) {
        st.a += st.s / (0.35 + st.r);
        const x = cx + Math.cos(st.a) * st.r * R, y = cy + Math.sin(st.a) * st.r * R * 0.8;
        if (y < -4 || y > h + 4 || x < -4 || x > w + 4) continue;
        ctx.fillStyle = st.warm ? "rgba(255, 190, 170, 0.9)" : `rgba(${170 + st.r * 60}, ${205 + st.r * 30}, 255, ${0.35 + (1.2 - st.r) * 0.4})`;
        ctx.beginPath(); ctx.arc(x, y, st.size, 0, Math.PI * 2); ctx.fill();
      }
    };
    const loop = () => { if (visible) draw(); raf = requestAnimationFrame(loop); };
    resize();
    if (reduce) { for (let i = 0; i < 60; i++) draw(); }
    else raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); io.disconnect(); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 w-full h-full" />;
}

/** Background HLS video on top of the coded star field. The video only fades in once it is really playing. */
export function BgVideo({ flipped = false }: { flipped?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let destroy = () => {};
    let cancelled = false;
    const onPlaying = () => setPlaying(true);
    const onError = () => setPlaying(false);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    const native = () => {
      if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = HLS_SRC;
        video.play().catch(() => {});
      }
    };
    if ("MediaSource" in window || "ManagedMediaSource" in window) {
      import("hls.js")
        .then(({ default: Hls }) => {
          if (cancelled) return;
          if (!Hls.isSupported()) return native();
          const hls = new Hls({ capLevelToPlayerSize: true });
          hls.loadSource(HLS_SRC);
          hls.attachMedia(video);
          hls.on(Hls.Events.MANIFEST_PARSED, () => { video.play().catch(() => {}); });
          hls.on(Hls.Events.ERROR, (_e, data) => { if (data.fatal) { setPlaying(false); hls.destroy(); } });
          destroy = () => hls.destroy();
        })
        .catch(native);
    } else {
      native();
    }
    return () => {
      cancelled = true;
      destroy();
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
    };
  }, []);
  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#05070a] ${flipped ? "scale-y-[-1]" : ""}`} aria-hidden>
      <StarField />
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 transition-opacity duration-1000 ${playing ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}

export const Arrow = () => <span aria-hidden>↗</span>;
