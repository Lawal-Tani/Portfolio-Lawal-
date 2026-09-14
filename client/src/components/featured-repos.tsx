import { ArrowUpRight, Code, ExternalLink, GitBranch, Github, Star } from "lucide-react";

export default function FeaturedRepos() {
  const repos = [
    {
      name: "Knova",
      href: "https://github.com/Lawal-Tani/Knova",
      description: "AI-powered CBT learning platform for WAEC & JAMB with RAG-grounded tutor and multi-provider fallbacks.",
      language: "TypeScript",
      significance: "Features 90 automated tests, offline Zustand session persistence, and Supabase edge functions cascading across DeepSeek and Groq.",
    },
    {
      name: "HookPilot",
      href: "https://github.com/Lawal-Tani/HookPilot",
      description: "Webhook reliability gateway buffering inbound webhooks, queueing retries, and providing dead-letter tracking.",
      language: "TypeScript",
      significance: "Implements sub-50ms ingestion buffer, 7-stage exponential backoff delivery worker, hop-by-hop header sanitization, and manual replay API.",
    },
    {
      name: "RelayDesk",
      href: "https://github.com/Lawal-Tani/RelayDesk",
      description: "Full-stack incident command dashboard with real-time WebSockets synchronization and postmortem tracking.",
      language: "TypeScript",
      significance: "Monorepo pairing Express + PostgreSQL backend with live WebSocket event hub dispatching sub-300ms timeline updates.",
    },
    {
      name: "Portfolio-Lawal-",
      href: "https://github.com/Lawal-Tani/Portfolio-Lawal-",
      description: "Production portfolio engineered with React 19, Vite, Tailwind v4, and comprehensive engineering case studies.",
      language: "TypeScript",
      significance: "Strictly typed, zero-fabrication personal engineering portfolio optimized for accessibility, Core Web Vitals, and responsive devices.",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-border/60">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground block mb-2">
            // CODE REPOSITORIES
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            Selected GitHub Repositories
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-xl">
            Public codebases demonstrating system architecture, test suites, API design, and engineering hygiene.
          </p>
        </div>

        <a
          href="https://github.com/Lawal-Tani"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground border border-border px-4 py-2.5 hover:bg-foreground hover:text-background transition-colors self-start md:self-auto"
        >
          <Github className="w-3.5 h-3.5" /> View GitHub Profile
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={repo.href}
            target="_blank"
            rel="noreferrer"
            className="group border border-border/70 bg-card/30 p-6 flex flex-col justify-between hover:border-foreground transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="font-mono text-base font-bold text-foreground group-hover:text-muted-foreground transition-colors flex items-center gap-2">
                  <GitBranch className="w-4 h-4 text-emerald-400" />
                  {repo.name}
                </span>
                <span className="text-[11px] font-mono text-muted-foreground flex items-center gap-1 border border-border/50 px-2 py-0.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
                  {repo.language}
                </span>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {repo.description}
              </p>

              <div className="border-l-2 border-border/80 pl-3 py-1 mb-4">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong className="text-foreground font-medium">Engineering Significance:</strong> {repo.significance}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-border/30 flex items-center justify-between text-xs font-mono text-foreground font-bold">
              <span>Inspect Source Code</span>
              <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
