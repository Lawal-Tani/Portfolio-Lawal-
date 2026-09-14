import { Check, Code2, Cpu, Database, Flame, Globe, Sparkles, Terminal, Wrench } from "lucide-react";

export default function About() {
  const skillCategories = [
    {
      name: "Languages",
      icon: Code2,
      skills: ["TypeScript", "JavaScript", "Python", "MATLAB", "SQL", "HTML / CSS"],
    },
    {
      name: "Frontend & Mobile",
      icon: Globe,
      skills: ["React", "Next.js", "React Native", "Expo", "Tailwind CSS", "NativeWind"],
    },
    {
      name: "Backend & Systems",
      icon: Database,
      skills: ["Node.js", "Express", "Supabase", "PostgreSQL", "REST APIs", "WebSockets"],
    },
    {
      name: "Engineering & Practice",
      icon: Wrench,
      skills: ["System Design", "API Design", "Debugging", "Industrial Automation", "Robotics & Controls"],
    },
    {
      name: "AI & Intelligent Systems",
      icon: Sparkles,
      skills: ["LLM APIs", "Multi-Provider Gateways", "RAG Architecture", "Prompt Engineering"],
    },
    {
      name: "Tools & Infrastructure",
      icon: Terminal,
      skills: ["Git", "GitHub", "Vercel", "Expo EAS", "Postman", "Linux"],
    },
  ];

  const learningAreas = [
    {
      title: "Automated Testing",
      desc: "Expanding unit and integration suites with Vitest, Playwright, and test-driven failure injection.",
    },
    {
      title: "High-Throughput Distributed Queues",
      desc: "Studying Redis BullMQ and Kafka partitions for scaling webhook relay engines beyond serverless cron limits.",
    },
    {
      title: "Performance Engineering",
      desc: "Profiling V8 memory leaks, synthetic bundle analyzers, and edge caching strategies.",
    },
    {
      title: "Observability & Tracing",
      desc: "Implementing OpenTelemetry distributed tracing and structured log aggregation across services.",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 md:px-12 max-w-6xl mx-auto border-t border-border/60">
      {/* Section Header */}
      <div className="mb-14">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            // BACKGROUND & CAPABILITIES
          </span>
          <div className="h-[1px] flex-1 bg-border/40 max-w-xs" />
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
          About &amp; Engineering Focus
        </h2>
      </div>

      {/* Main Narrative */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        <div className="lg:col-span-7 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
          <p className="text-foreground font-medium text-lg md:text-xl">
            I'm a software engineer with a background in Robotics &amp; Automation and Computer Science. I enjoy working at the intersection of software, intelligent systems, and real-world engineering problems.
          </p>

          <p>
            My interest in software grew directly out of engineering systems. When you build with hardware, sensors, and robotics, you learn quickly that physical environments are unforgiving: connections drop, voltage fluctuates, components fail, and you cannot assume ideal conditions.
          </p>

          <p>
            Bringing that perspective into software engineering changes how I design systems: I don't just ask <em className="text-foreground font-normal">"does this render?"</em>, I ask <em className="text-foreground font-normal">"what happens when the network times out? How does this recover if a downstream API returns a 504? Is the data model consistent under concurrent writes?"</em>
          </p>

          <p>
            Right now, I'm focused on full-stack web and mobile engineering, multi-provider AI product architecture, and distributed webhook reliability gateways. I care about how software works under the hood—not just how it looks on a landing page.
          </p>
        </div>

        {/* Highlight Card: Why Robotics Matters */}
        <div className="lg:col-span-5 border border-border/80 bg-card/60 p-6 md:p-8 font-mono text-xs flex flex-col justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-widest text-emerald-400 block mb-2 font-bold">
              // THE ENGINEERING PERSPECTIVE
            </span>
            <h3 className="text-lg font-display font-bold text-foreground mb-4">
              Why Robotics &amp; Automation Matters for Software
            </h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">01.</span>
                <span><strong className="text-foreground">Respect for Failures:</strong> In physical automation, unexpected edge cases break machinery. I write defensive software that expects network and API failures.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">02.</span>
                <span><strong className="text-foreground">Signals &amp; State:</strong> Dealing with noisy telemetry teaches you how to debounce inputs, handle asynchronous streams, and maintain deterministic state.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-foreground font-bold">03.</span>
                <span><strong className="text-foreground">Resource Constraints:</strong> Embedded microcontrollers enforce memory discipline and algorithmic efficiency.</span>
              </li>
            </ul>
          </div>

          <div className="pt-6 mt-6 border-t border-border/40 text-[11px] text-muted-foreground">
            LOCATION: Lagos, Nigeria · REMOTE-FRIENDLY WORLDWIDE
          </div>
        </div>
      </div>

      {/* Skills Categories (No Junior Percentages) */}
      <div className="mb-16">
        <div className="mb-8">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-1">
            // TOOLBOX
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Core Technologies &amp; Competencies
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Technologies I have designed with, debugged, and actively deployed to production.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.name}
                className="border border-border/70 bg-card/30 p-5 hover:border-foreground/40 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4 text-foreground" />
                  <h4 className="font-display font-bold text-foreground text-base">
                    {cat.name}
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono text-muted-foreground border border-border/60 bg-background/60 px-2 py-0.5"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Currently Learning / Growth Area */}
      <div className="border border-border/70 bg-card/40 p-6 md:p-8">
        <div className="mb-6">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-1">
            // ACTIVE GROWTH & RESEARCH
          </span>
          <h3 className="text-xl md:text-2xl font-display font-bold text-foreground">
            Currently Deepening
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Engineering domains I am systematically studying and implementing into upcoming projects.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {learningAreas.map((area) => (
            <div key={area.title} className="border-l-2 border-border/80 pl-3">
              <h4 className="font-display font-bold text-foreground text-sm mb-1">
                {area.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {area.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
