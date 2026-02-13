import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.6 });
  const headingY = useTransform(smooth, [0, 1], [90, -90]);
  const headingOpacity = useTransform(smooth, [0, 0.35, 1], [0.1, 1, 0.6]);
  const headingBlur = useTransform(smooth, [0, 0.4, 1], [
    "blur(10px)",
    "blur(0px)",
    "blur(6px)",
  ]);
  const copyY = useTransform(smooth, [0, 1], [60, -60]);
  const buttonY = useTransform(smooth, [0, 1], [40, -40]);
  const socialsY = useTransform(smooth, [0, 1], [110, -110]);
  const footerOpacity = useTransform(smooth, [0, 0.6, 1], [0.1, 1, 0.7]);
  const glowX = useTransform(smooth, [0, 1], ["-30%", "35%"]);
  const glowOpacity = useTransform(smooth, [0, 0.6, 1], [0.1, 0.45, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-24 md:py-32 px-6 md:px-12 border-t border-border/40 bg-card overflow-hidden"
    >
      <motion.div
        style={{ x: glowX, opacity: glowOpacity }}
        className="absolute -top-12 left-0 right-0 h-[420px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2),_transparent_65%)] -z-10 pointer-events-none"
      />
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        <div className="max-w-2xl">
          <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
            03 - Contact
          </h2>
          <motion.h3
            style={{
              y: headingY,
              opacity: headingOpacity,
              filter: headingBlur,
            }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-8 will-change-transform"
          >
            Let&apos;s work<br />together.
          </motion.h3>
          <motion.p
            style={{ y: copyY, opacity: headingOpacity }}
            className="text-xl text-muted-foreground mb-8 max-w-lg will-change-transform"
          >
            I&apos;m currently available for freelance projects and open to full-time opportunities. If you have a project in mind, get in touch.
          </motion.p>
          <motion.div style={{ y: buttonY, opacity: headingOpacity }} className="flex flex-wrap gap-3 will-change-transform">
            <Button size="lg" className="rounded-none text-lg px-8 py-6 bg-foreground text-background hover:bg-muted-foreground transition-colors">
              tanilawal44@gmail.com
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none text-lg px-8 py-6 border-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <a href="/resume.txt" download>
                Resume
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-none text-lg px-8 py-6 border-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <a href="https://github.com/Lawal-Tani" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          style={{ y: socialsY, opacity: headingOpacity }}
          className="space-y-8 md:text-right self-end md:self-start mt-8 md:mt-24 will-change-transform"
        >
          <div>
            <h4 className="font-bold text-foreground mb-2">Socials</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Twitter / X</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Instagram</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-foreground mb-2">Location</h4>
            <p className="text-muted-foreground">Lagos, Nigeria<br/>Remote Friendly</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: footerOpacity }}
        className="max-w-6xl mx-auto mt-24 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground"
      >
        <p>&copy; 2026 Lawal Tanitoluwa. All rights reserved.</p>
        <p>Built with React & Tailwind.</p>
      </motion.div>
    </section>
  );
}
