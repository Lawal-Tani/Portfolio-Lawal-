import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download, ExternalLink, FileText, Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const email = "tanilawal44@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="py-24 px-6 md:px-12 border-t border-border/60 bg-card/40">
      <div className="max-w-6xl mx-auto">
        {/* Contact & Availability Header */}
        <div id="resume" className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-border/40">
          <div className="lg:col-span-7">
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-400 block mb-3">
              // STATUS: OPEN TO SOFTWARE ENGINEERING ROLES
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-foreground tracking-tight mb-6">
              Let's talk engineering.
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-xl mb-8">
              I am actively interviewing for full-stack software engineering, systems, and AI product roles. Whether you are an engineering manager, technical founder, or recruiter—reach out directly.
            </p>

            {/* Email Contact Box */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 bg-foreground text-background font-mono text-xs uppercase tracking-widest px-6 py-4 font-bold hover:bg-neutral-200 transition-colors"
              >
                <Mail className="w-4 h-4" /> {email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 border border-border text-foreground font-mono text-xs uppercase tracking-widest px-4 py-4 hover:border-foreground transition-colors"
                title="Copy email to clipboard"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Right Column: Resume & Quick Links */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="border border-border/80 bg-background/60 p-6">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="font-display font-bold text-foreground text-lg">
                  Engineering Resume
                </h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Detailed record of software engineering projects, industrial automation internship experience, education, and technical stack.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setResumeOpen(true)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider bg-foreground text-background font-bold px-3.5 py-2 hover:bg-neutral-200 transition-colors"
                >
                  View Resume <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <a
                  href="/resume.txt"
                  download="Lawal_Tanitoluwa_Software_Engineer_Resume.txt"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider border border-border px-3.5 py-2 hover:border-foreground transition-colors text-foreground"
                >
                  Download (.txt) <Download className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-muted-foreground">
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <span className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5" /> Location
                </span>
                <span className="text-foreground">Lagos, Nigeria (Remote)</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border/30">
                <span className="flex items-center gap-2">
                  <Github className="w-3.5 h-3.5" /> GitHub
                </span>
                <a
                  href="https://github.com/Lawal-Tani"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:underline flex items-center gap-1"
                >
                  github.com/Lawal-Tani <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5" /> LinkedIn
                </span>
                <a
                  href="https://www.linkedin.com/in/tanitoluwa-lawal"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:underline flex items-center gap-1"
                >
                  tanitoluwa-lawal <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Meta */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
          <p>© {new Date().getFullYear()} Tanitoluwa Lawal. All engineering verified.</p>
          <div className="flex items-center gap-4">
            <span>Built with React 19 &amp; Vite</span>
            <span>·</span>
            <span>Zero Fabrication</span>
          </div>
        </div>
      </div>

      {/* Resume Modal */}
      {resumeOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-background border border-border w-full max-w-3xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-card/60">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="font-mono text-xs uppercase tracking-widest font-bold">
                  Lawal_Tanitoluwa_Resume.txt
                </span>
              </div>
              <div className="flex items-center gap-3">
                <a
                  href="/resume.txt"
                  download="Lawal_Tanitoluwa_Software_Engineer_Resume.txt"
                  className="text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
                <button
                  type="button"
                  onClick={() => setResumeOpen(false)}
                  className="text-muted-foreground hover:text-foreground font-mono text-sm px-2 py-1 border border-border/60 hover:bg-card"
                >
                  ✕ Close
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto font-mono text-xs text-foreground/90 space-y-4 whitespace-pre-wrap leading-relaxed">
              {`LAWAL TANITOLUWA
Software Engineer · Full-Stack & Systems
Email: tanilawal44@gmail.com
GitHub: https://github.com/Lawal-Tani
LinkedIn: https://www.linkedin.com/in/tanitoluwa-lawal
Location: Lagos, Nigeria (Remote Friendly)

===================================================================
PROFESSIONAL SUMMARY
===================================================================
Software Engineer with an engineering foundation in Robotics & Automation.
Builds full-stack web and mobile applications, AI-powered systems, and
distributed webhook gateways. Grounded in system design, failure handling,
defensive programming, and technical trade-offs.

===================================================================
CORE TECHNICAL SKILLS
===================================================================
- Languages: TypeScript, JavaScript, Python, MATLAB, SQL, HTML5/CSS3
- Frontend & Mobile: React, Next.js (App Router), React Native, Expo (SDK 54),
  Tailwind CSS, NativeWind v4
- Backend & Systems: Node.js, Express, Supabase, PostgreSQL, Row-Level Security,
  REST APIs, WebSockets (ws)
- AI & Systems: LLM API integration, multi-provider fallbacks (DeepSeek, Groq),
  RAG pipelines over verified corpora
- Tools: Git, GitHub, Vercel, Expo EAS, Postman, Linux

===================================================================
SELECTED ENGINEERING PROJECTS
===================================================================
1. KNOVA — AI-Powered CBT & Learning Platform (WAEC / JAMB)
   Stack: React Native, Expo 54, Supabase, PostgreSQL, Zustand, Vitest, Groq/DeepSeek
   - Engineered cross-platform CBT exam engine with auto-save, timer decrement,
     and question palette state management.
   - Architected edge-level RAG tutor router cascading between DeepSeek and
     Groq/Llama with automated failover upon provider rate limits.
   - Built with 90 automated unit and integration tests and offline local store demo mode.

2. HOOKPILOT — Webhook Ingestion & Delivery Gateway
   Stack: Next.js 14, Supabase (PostgreSQL), TypeScript, Vercel Cron
   - Developed fast ingestion endpoint (<50ms ACK) buffering raw incoming webhooks.
   - Implemented scheduled delivery worker with 7-stage exponential backoff
     schedule (10s to 24h) and dead-letter queueing.
   - Built hop-by-hop header sanitizer to prevent proxy forwarding rejections.

3. STYLECART — Multi-Role Campus Commerce Platform
   Stack: React Native, Expo, Supabase, PostgreSQL, RLS
   - Built unified mobile app supporting student buyers, merchant vendors, and super-admins.
   - Implemented double-entry financial ledger for withdrawal and deposit requests.

4. RELAYDESK — Real-Time Incident Command Dashboard
   Stack: React, TypeScript, Node.js, Express, PostgreSQL, WebSockets
   - Built monorepo with Express backend and WebSocket event hub broadcasting sub-300ms updates.
   - Modeled incident lifecycle (Investigating -> Identified -> Monitoring -> Resolved) and postmortems.

===================================================================
ENGINEERING WORK EXPERIENCE
===================================================================
Software Engineer | Pedagon Africa (2024 – 2025)
- Collaborated on responsive frontend interfaces using React, TypeScript, and modern styling.
- Contributed to Node.js and REST API endpoints for user onboarding and workflows.
- Participated in code reviews, bug fixes, and continuous product delivery sprints.

Automation & Systems Engineering Intern | GIL Automations (2023 – 2024)
- Assisted senior engineers in calibrating industrial instrumentation, sensors, and control loops.
- Diagnosed PLC (Programmable Logic Controller) configurations and integration test benches.
- Authored equipment test reports and technical documentation for industrial clients.

===================================================================
EDUCATION & FOUNDATION
===================================================================
B.Eng / B.Sc in Engineering (Robotics & Automation / Computer Science)
Focus: Systems engineering, control theory, algorithms, time-series telemetry analysis.
`}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
