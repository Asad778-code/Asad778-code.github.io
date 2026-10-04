import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const WORDS = ["Build", "Test", "Ship"];
const DURATION = 2700;

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [word, setWord] = useState(0);

  useEffect(() => {
    let raf = 0;
    let done: ReturnType<typeof setTimeout>;
    const start = performance.now();
    const tick = (now: number) => {
      const c = Math.min(100, Math.round(((now - start) / DURATION) * 100));
      setCount(c);
      if (c < 100) raf = requestAnimationFrame(tick);
      else done = setTimeout(onComplete, 400);
    };
    raf = requestAnimationFrame(tick);
    const words = setInterval(() => setWord((w) => (w + 1) % WORDS.length), 900);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
      clearInterval(words);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <motion.div className="fixed inset-0 z-[9999] bg-bg" exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
      <motion.span
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.span>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={word}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {WORDS[word]}
          </motion.span>
        </AnimatePresence>
      </div>

      <span className="absolute bottom-10 right-8 text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums" aria-label={`Loading ${count} percent`}>
        {String(count).padStart(3, "0")}
      </span>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <div className="h-full accent-gradient origin-left" style={{ transform: `scaleX(${count / 100})`, boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)" }} />
      </div>
    </motion.div>
  );
}
