import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.5 });
  const labelY = useTransform(smooth, [0, 1], [30, -30]);
  const labelOpacity = useTransform(smooth, [0, 0.5, 1], [0.4, 1, 0.7]);

  const headingY = useTransform(smooth, [0, 1], [80, -80]);
  const headingOpacity = useTransform(smooth, [0, 0.35, 1], [0.1, 1, 0.6]);
  const headingBlur = useTransform(smooth, [0, 0.4, 1], [
    "blur(8px)",
    "blur(0px)",
    "blur(4px)",
  ]);

  const colY = useTransform(smooth, [0, 1], [60, -60]);
  const detailY = useTransform(smooth, [0, 1], [110, -110]);
  const detailOpacity = useTransform(smooth, [0, 0.5, 1], [0.15, 1, 0.6]);

  const glowX = useTransform(smooth, [0, 1], ["-20%", "30%"]);
  const glowOpacity = useTransform(smooth, [0, 0.6, 1], [0.1, 0.4, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-visibility relative py-24 md:py-32 px-6 md:px-12 border-t border-border/40 overflow-hidden"
    >
      <motion.div
        style={{ x: glowX, opacity: glowOpacity }}
        className="absolute -top-16 left-0 right-0 h-[360px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.18),_transparent_65%)] -z-10 pointer-events-none"
      />
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <motion.h2
            style={{ y: labelY, opacity: labelOpacity }}
            className="text-sm font-bold uppercase tracking-widest text-muted-foreground sticky top-32 will-change-transform"
          >
            01 - About
          </motion.h2>
        </div>

        <div className="md:col-span-8 space-y-8">
          <motion.h3
            style={{
              y: headingY,
              opacity: headingOpacity,
              filter: headingBlur,
            }}
            className="text-3xl md:text-4xl font-display font-medium leading-tight will-change-transform"
          >
            I build fullstack products that balance <span className="text-muted-foreground">system reliability</span> with <span className="text-muted-foreground">human‑centered UX</span>.
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
            <motion.p style={{ y: colY, opacity: detailOpacity }} className="will-change-transform">
              I focus on shipping products that feel fast and dependable: crisp interfaces, clean APIs, and data models that scale. I care about accessibility, DX, and quality in production.
            </motion.p>
            <motion.p style={{ y: colY, opacity: detailOpacity }} className="will-change-transform">
              My stack includes React, TypeScript, Node.js, and Postgres. I optimize for performance, reliability, and a tight feedback loop from users to product decisions.
            </motion.p>
          </div>

          <motion.div
            style={{ y: detailY, opacity: detailOpacity }}
            className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/40 will-change-transform"
          >
            <div>
              <h4 className="text-foreground font-medium mb-2">Design</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>UI/UX</li>
                <li>Prototyping</li>
                <li>Design Systems</li>
                <li>Motion Design</li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-2">Engineering</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>React / Next.js</li>
                <li>TypeScript</li>
                <li>Node.js</li>
                <li>Postgres</li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-2">Product</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>Problem Framing</li>
                <li>Metrics</li>
                <li>Experimentation</li>
                <li>Delivery</li>
              </ul>
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-2">Collaboration</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>PM + Design</li>
                <li>Code Reviews</li>
                <li>Docs</li>
                <li>Mentorship</li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            style={{ y: detailY, opacity: detailOpacity }}
            className="pt-8 border-t border-border/40 will-change-transform"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-foreground font-medium mb-2">How I Work</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Align on goals, define success metrics, and ship in small, testable increments.
                </p>
              </div>
              <div>
                <h4 className="text-foreground font-medium mb-2">Technical Focus</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Performance budgets, API contracts, and observability from day one.
                </p>
              </div>
              <div>
                <h4 className="text-foreground font-medium mb-2">UX Focus</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Frictionless flows, clear hierarchy, and micro‑interactions that support usability.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
