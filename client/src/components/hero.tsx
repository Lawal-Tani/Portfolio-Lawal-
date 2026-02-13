import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const mobileSlides = [
  {
    title: "Fullstack Engineer",
    body: "I build end-to-end systems: polished UI, reliable APIs, and data that scales.",
  },
  {
    title: "Performance Focused",
    body: "Obsessed with speed, stability, and measurable product impact.",
  },
  {
    title: "Product Minded",
    body: "I connect user needs to technical decisions with tight feedback loops.",
  },
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  const kickerY = useTransform(smooth, [0, 1], [50, -50]);
  const titleY = useTransform(smooth, [0, 1], [140, -140]);
  const titleScale = useTransform(smooth, [0, 1], [1.06, 0.98]);
  const copyY = useTransform(smooth, [0, 1], [70, -70]);
  const copyOpacity = useTransform(smooth, [0, 0.6, 1], [0.1, 1, 0.5]);

  const bgScale = useTransform(smooth, [0, 1], [1.08, 1.45]);
  const bgRotate = useTransform(smooth, [0, 1], [-6, 14]);
  const bgOpacity = useTransform(smooth, [0, 1], [0.1, 0.4]);
  const bgBlur = useTransform(smooth, [0, 0.5, 1], [
    "blur(0px)",
    "blur(4px)",
    "blur(10px)",
  ]);
  const glowX = useTransform(smooth, [0, 1], ["-10%", "40%"]);
  const glowOpacity = useTransform(smooth, [0, 0.7, 1], [0.15, 0.5, 0.3]);
  const hintOpacity = useTransform(smooth, [0, 0.4, 1], [1, 0.6, 0.15]);
  const hintY = useTransform(smooth, [0, 1], [0, -36]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden pt-20"
    >
      <motion.div
        style={{
          scale: bgScale,
          rotate: bgRotate,
          opacity: bgOpacity,
          filter: bgBlur,
        }}
        className="absolute top-0 right-0 w-[900px] h-[900px] -z-10 pointer-events-none mix-blend-screen will-change-transform"
      >
        <img
          src="/images/hero-abstract.png"
          alt="Abstract"
          className="w-full h-full object-cover grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent" />
      </motion.div>
      <motion.div
        style={{ x: glowX, opacity: glowOpacity }}
        className="absolute -top-20 left-0 right-0 h-[420px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2),_transparent_60%)] -z-10 pointer-events-none"
      />

      <div className="max-w-5xl z-10">
        <motion.p
          style={{ y: kickerY }}
          className="text-muted-foreground font-medium mb-6 tracking-widest uppercase text-sm will-change-transform"
        >
          Fullstack Engineer
        </motion.p>

        <motion.h1
          style={{ y: titleY, scale: titleScale }}
          className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-8 text-foreground will-change-transform"
        >
          LAWAL<br />TANITOLUWA
        </motion.h1>

        <motion.div
          style={{ y: copyY, opacity: copyOpacity }}
          className="max-w-xl will-change-transform"
        >
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            I build <span className="text-foreground font-medium">fullstack products</span> with crisp UX, reliable APIs, and performance-first systems that scale from MVP to production.
          </p>
        </motion.div>
        <div className="mt-8 flex flex-wrap gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span className="border border-border px-3 py-2">Product Thinking</span>
          <span className="border border-border px-3 py-2">System Design</span>
          <span className="border border-border px-3 py-2">Performance</span>
          <span className="border border-border px-3 py-2">Reliability</span>
        </div>
      </div>

      {isMobile ? (
        <div className="mt-10 -mx-6 px-6">
          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar">
            {mobileSlides.map((slide) => (
              <div
                key={slide.title}
                className="min-w-[80%] snap-center border border-border/40 bg-card/50 p-5"
              >
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {slide.title}
                </p>
                <p className="text-base text-muted-foreground mt-3">
                  {slide.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      <motion.div
        style={{ opacity: hintOpacity, y: hintY }}
        className="absolute bottom-12 left-6 md:left-12 flex items-center gap-4"
      >
        <div className="h-[1px] w-12 bg-border" />
        <span className="text-xs uppercase tracking-widest text-muted-foreground">
          Scroll to explore
        </span>
      </motion.div>
    </section>
  );
}
