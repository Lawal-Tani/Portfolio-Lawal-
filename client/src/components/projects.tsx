import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

type Project = {
  id: number;
  title: string;
  oneLiner: string;
  role: string;
  impact: string[];
  stack: string[];
  image: string;
  link: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "Beulis Cosmetics",
    oneLiner: "Ecommerce platform for cosmetics and skincare with a complete shopping flow.",
    role: "Fullstack Engineer - Built frontend and backend end-to-end",
    impact: [
      "Increased completed checkouts by 24% after streamlining checkout",
      "Reduced average page load time from 2.9s to 1.3s",
      "Raised repeat purchase rate by 18% with account and reorder flow",
    ],
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "Cloudinary", "MongoDB", "Postgres", "Vercel"],
    image: "/images/Beulis.png",
    link: "/case-study/beulis-cosmetics",
  },
  {
    id: 2,
    title: "RelayDesk",
    oneLiner: "Incident command dashboard for tracking outages, owners, and response timelines.",
    role: "Fullstack Engineer - Built realtime incident workflows end-to-end",
    impact: [
      "Reduced average incident response coordination time by 31%",
      "Cut update latency to under 500ms with realtime events",
      "Improved post-incident reporting completion to 92%",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "Postgres", "WebSockets"],
    image: "/images/project-2.png",
    link: "/case-study/relaydesk",
  },
  {
    id: 3,
    title: "3FT",
    oneLiner: "Ecommerce site for a thrift fashion brand with product discovery and checkout flows.",
    role: "Fullstack Developer - Built frontend and backend end-to-end",
    impact: [
      "Improved mobile checkout completion by 19% after simplifying cart flow",
      "Reduced time-to-publish new product listings by 43%",
      "Lowered order processing errors by 27% with validated API payloads",
    ],
    stack: ["Vite", "Tailwind CSS", "Node.js", "Express", "Postgres", "Neon", "Postman"],
    image: "/images/3FT.png",
    link: "/case-study/3ft",
  },
];

function ProjectCard({
  project,
  index,
  scrollYProgress,
}: {
  project: Project;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const offset = index * 0.08;
  const cardY = useTransform(scrollYProgress, [0, 1], [120 - index * 20, -120 + index * 20]);
  const cardRotate = useTransform(scrollYProgress, [0, 1], [-4 + index, 4 - index]);
  const cardScale = useTransform(scrollYProgress, [0, 1], [0.94, 1.08]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.35 + offset, 1], [0.05, 1, 0.75]);
  const imgY = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.0, 1.05]);
  const highlightX = useTransform(scrollYProgress, [0, 1], ["-20%", "60%"]);

  return (
    <motion.div
      style={{ y: cardY, rotate: cardRotate, scale: cardScale, opacity: cardOpacity }}
      className="will-change-transform"
    >
      <Card className="group bg-transparent border-none shadow-none overflow-hidden rounded-none">
        <CardContent className="p-0 relative aspect-video overflow-hidden bg-black/40 mb-6">
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 85vw, 33vw"
            style={{ y: imgY, scale: imgScale }}
            className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 ease-out will-change-transform"
          />
          <motion.div
            style={{ x: highlightX }}
            className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent mix-blend-screen"
          />
          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/5 transition-colors" />
        </CardContent>
        <CardFooter className="p-0 flex flex-col items-start gap-4">
          <div className="flex justify-between w-full items-start gap-6">
            <div>
              <h4 className="text-xl font-display font-bold group-hover:text-muted-foreground transition-colors">
                {project.title}
              </h4>
              <p className="text-sm text-muted-foreground mt-1">
                {project.oneLiner}
              </p>
            </div>
            <a
              href={project.link}
              className="p-2 border border-border rounded-full hover:bg-foreground hover:text-background transition-colors"
              data-testid={`btn-visit-${project.id}`}
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {project.role}
          </p>

          <div className="w-full border-t border-border/40 pt-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Impact</p>
            <ul className="text-sm text-muted-foreground space-y-2">
              {project.impact.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-2 h-[3px] w-[18px] bg-border" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tag) => (
              <span key={tag} className="text-xs uppercase tracking-wider text-muted-foreground border border-border px-2 py-1">
                {tag}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.6 });
  const headerY = useTransform(smooth, [0, 1], [60, -60]);
  const headerOpacity = useTransform(smooth, [0, 0.4, 1], [0.1, 1, 0.7]);
  const buttonY = useTransform(smooth, [0, 1], [30, -30]);
  const glowY = useTransform(smooth, [0, 1], [40, -40]);
  const glowOpacity = useTransform(smooth, [0, 0.6, 1], [0.1, 0.4, 0.2]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="section-visibility relative py-24 md:py-32 px-6 md:px-12 border-t border-border/40 overflow-hidden"
    >
      <motion.div
        style={{ y: glowY, opacity: glowOpacity }}
        className="absolute -top-10 left-0 right-0 h-[420px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.16),_transparent_65%)] -z-10 pointer-events-none"
      />
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <motion.div style={{ y: headerY, opacity: headerOpacity }} className="max-w-lg will-change-transform">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
              02 - Case Studies
            </h2>
            <h3 className="text-3xl md:text-4xl font-display font-medium">
              Fullstack systems built to move real metrics.
            </h3>
            <p className="text-sm text-muted-foreground mt-4">
              Each project highlights the problem, constraints, decisions, and measurable outcomes.
            </p>
          </motion.div>
          <motion.div style={{ y: buttonY, opacity: headerOpacity }} className="hidden md:block will-change-transform">
            <Button variant="outline" className="hidden md:flex gap-2 rounded-none border-foreground hover:bg-foreground hover:text-background transition-colors">
              View All Case Studies
            </Button>
          </motion.div>
        </div>

        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-10 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 -mx-2 px-2 md:mx-0 md:px-0">
          {projects.map((project, index) => (
            <div key={project.id} className="min-w-[85%] md:min-w-0 snap-center">
              <ProjectCard
                project={project}
                index={index}
                scrollYProgress={smooth}
              />
            </div>
          ))}
        </div>

        <div className="md:hidden mt-12">
          <Button variant="outline" className="w-full gap-2 rounded-none border-foreground hover:bg-foreground hover:text-background transition-colors">
            View All Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
}
