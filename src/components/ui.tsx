import type { ReactNode } from "react";
import { motion } from "framer-motion";

export { scrollToId } from "../smooth";

type BtnProps = { children: ReactNode; href?: string; onClick?: () => void; variant?: "solid" | "outline"; external?: boolean; className?: string };

/** Pill button whose border turns into the accent gradient on hover. */
export function GradientButton({ children, href, onClick, variant = "outline", external, className = "" }: BtnProps) {
  const inner =
    variant === "solid"
      ? "bg-text-primary text-bg group-hover:bg-accent group-hover:text-white"
      : "bg-transparent text-text-primary border-2 border-stroke group-hover:border-transparent";
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
          <span className="w-8 h-px bg-text-primary/40" />
          <span className="text-xs text-muted uppercase tracking-[0.3em]">{eyebrow}</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.02] mb-4">
          {title} <span className="font-display italic">{italic}</span>
        </h2>
        <p className="text-sm md:text-base text-muted max-w-md">{sub}</p>
      </div>
      {action && <div className="hidden md:block shrink-0">{action}</div>}
    </motion.div>
  );
}

/** Rotating circular badge — the playful "open to work" seal in the hero. */
export function SpinBadge({ label = "OPEN TO WORK · FRAMER · WEBFLOW · WORDPRESS · " }: { label?: string }) {
  return (
    <span className="relative inline-flex h-28 w-28 md:h-32 md:w-32 items-center justify-center">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-text-primary" style={{ fontSize: "9.2px", letterSpacing: "1.4px", textTransform: "uppercase" }}>
          <textPath href="#badge-circle" startOffset="0">{label}</textPath>
        </text>
      </svg>
      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white text-lg" aria-hidden>↗</span>
    </span>
  );
}

export const Arrow = () => <span aria-hidden>↗</span>;
