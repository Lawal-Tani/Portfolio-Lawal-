import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export default function FloatingCta() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 20, mass: 0.6 });
  const y = useTransform(smooth, [0, 0.2, 1], [40, 0, 0]);
  const opacity = useTransform(smooth, [0, 0.15, 1], [0, 1, 1]);

  return (
    <motion.div
      style={{ y, opacity }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <div className="flex items-center gap-3 border border-border/60 bg-background/80 backdrop-blur-md px-4 py-3">
        <a
          href="mailto:tanilawal44@gmail.com"
          className="text-xs uppercase tracking-widest text-foreground border border-border/60 px-3 py-2 hover:bg-foreground hover:text-background transition-colors"
          data-cursor
        >
          Email
        </a>
        <a
          href="https://github.com/Lawal-Tani"
          target="_blank"
          rel="noreferrer"
          className="text-xs uppercase tracking-widest text-foreground border border-border/60 px-3 py-2 hover:bg-foreground hover:text-background transition-colors"
          data-cursor
        >
          GitHub
        </a>
        <span className="hidden md:inline text-xs text-muted-foreground">
          Open to full‑time and freelance
        </span>
      </div>
    </motion.div>
  );
}
