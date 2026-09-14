import { ArrowDown, FileText, ArrowUpRight, Terminal } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 pt-28 pb-16 overflow-hidden">
      {/* Subtle background grid accent */}
      <div 
        className="absolute inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.06),_transparent_70%)] -z-10 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left Column: Core Positioning Copy */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 border border-border/80 bg-card/60 px-3 py-1 mb-6 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Software Engineer · Systems & Full-Stack
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-foreground leading-[1.08] mb-6">
            I build software systems that{" "}
            <span className="text-foreground underline decoration-muted-foreground/40 underline-offset-8">
              solve real problems.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
            I'm <strong className="text-foreground font-semibold">Tanitoluwa Lawal</strong>, a software engineer with a background in Robotics &amp; Automation. I build full-stack applications, AI-powered products, and software systems—from idea to deployment.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <a
              href="#work"
              className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-6 py-3.5 font-bold hover:bg-neutral-200 transition-colors"
            >
              View my work
              <ArrowDown className="w-3.5 h-3.5" />
            </a>

            <Link
              href="/engineering"
              className="inline-flex items-center gap-2 border border-border text-foreground font-mono text-xs uppercase tracking-widest px-6 py-3.5 hover:bg-card hover:border-foreground transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              Read my engineering notes
            </Link>
          </div>

          {/* Direct verification links */}
          <div className="flex items-center gap-6 text-xs font-mono text-muted-foreground pt-4 border-t border-border/40 w-full max-w-xl">
            <span className="uppercase tracking-widest text-[11px] text-muted-foreground/70">Connect:</span>
            <a
              href="https://github.com/Lawal-Tani"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              GitHub <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="https://www.linkedin.com/in/tanitoluwa-lawal"
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              LinkedIn <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
            <a
              href="mailto:tanilawal44@gmail.com"
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              Email <ArrowUpRight className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>

        {/* Right Column: Subtle System / Terminal Interface */}
        <div className="lg:col-span-5 w-full">
          <div className="border border-border/80 bg-card/70 font-mono shadow-2xl relative">
            {/* Terminal Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-background/80">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
                <span className="w-2.5 h-2.5 rounded-full bg-border" />
              </div>
              <span className="text-[11px] text-muted-foreground tracking-widest uppercase">
                lawal-tani@runtime:~
              </span>
              <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
            </div>

            {/* Terminal Body */}
            <div className="p-5 text-xs sm:text-sm space-y-4">
              <div>
                <p className="text-muted-foreground">
                  <span className="text-emerald-400">$</span> whoami
                </p>
                <p className="text-foreground font-bold mt-1">
                  Tanitoluwa Lawal
                </p>
              </div>

              <div className="border-t border-border/30 pt-3">
                <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
                  Focus
                </p>
                <p className="text-foreground">software engineer</p>
                <p className="text-muted-foreground">robotics + automation</p>
                <p className="text-muted-foreground">full-stack + AI</p>
              </div>

              <div className="border-t border-border/30 pt-3">
                <p className="text-muted-foreground text-xs uppercase tracking-widest mb-1">
                  Execution Loop
                </p>
                <p className="text-emerald-400 font-mono text-xs">
                  building <span className="text-muted-foreground">→</span> testing{" "}
                  <span className="text-muted-foreground">→</span> debugging{" "}
                  <span className="text-muted-foreground">→</span> shipping
                </p>
              </div>

              <div className="border-t border-border/30 pt-3 bg-background/40 -mx-5 -mb-5 p-4 border-b-0 text-[11px] text-muted-foreground flex justify-between items-center">
                <span>STATUS: ACTIVE SWE CANDIDATE</span>
                <span className="text-emerald-400 font-bold">READY TO SHIP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
