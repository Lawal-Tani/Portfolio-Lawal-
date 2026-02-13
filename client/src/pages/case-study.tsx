import { useMemo } from "react";
import { Link } from "wouter";

type CaseStudy = {
  id: string;
  title: string;
  summary: string;
  problem: string;
  constraints: string[];
  decisions: string[];
  results: string[];
  stack: string[];
  liveUrl?: string;
};

const caseStudies: CaseStudy[] = [
  {
    id: "beulis-cosmetics",
    title: "Beulis Cosmetics",
    summary: "Ecommerce website for a beauty brand selling cosmetics and skincare products.",
    problem:
      "The business needed a reliable online storefront with smooth discovery, checkout, and order handling.",
    constraints: ["Small team and timeline", "Mobile-first traffic", "Fast deployment on Vercel"],
    decisions: [
      "Built a React frontend focused on fast category and product browsing.",
      "Implemented Node.js and Express backend APIs for cart and order flows.",
      "Optimized assets and routes for quick loads on mobile networks.",
    ],
    results: [
      "Completed checkout rate increased by 24%",
      "Average page load time reduced from 2.9s to 1.3s",
      "Repeat purchases improved by 18%",
    ],
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "Cloudinary", "MongoDB", "Postgres", "Vercel"],
    liveUrl: "https://beuliscosmetics.com",
  },
  {
    id: "relaydesk",
    title: "RelayDesk",
    summary: "Incident command dashboard for teams to coordinate outages and status updates in real time.",
    problem:
      "Teams were handling incidents in chat and spreadsheets, causing slow ownership assignment and fragmented updates.",
    constraints: ["Realtime reliability under load", "Clear ownership tracking", "Fast updates across desktop and mobile"],
    decisions: [
      "Designed a React dashboard with priority filters and owner-focused queues.",
      "Built Express APIs with a Postgres-backed incident and timeline model.",
      "Added WebSocket events for instant status and timeline synchronization.",
    ],
    results: [
      "Reduced average incident response coordination time by 31%",
      "Cut update latency to under 500ms with realtime events",
      "Improved post-incident reporting completion to 92%",
    ],
    stack: ["React", "TypeScript", "Node.js", "Express", "Postgres", "WebSockets"],
  },
  {
    id: "3ft",
    title: "3FT",
    summary: "Ecommerce platform for a thrift fashion brand with fast browsing and checkout.",
    problem:
      "The brand needed an online store that made it easy to launch drops quickly and convert mobile shoppers.",
    constraints: ["Small team and tight release timelines", "Mobile-first audience", "Frequent catalog updates"],
    decisions: [
      "Built the storefront with Vite for fast developer iteration and lightweight bundles.",
      "Implemented Express APIs for catalog, cart, and order operations.",
      "Used Postman collections to validate and document API contracts during development.",
    ],
    results: [
      "Improved mobile checkout completion by 19% after simplifying cart flow",
      "Reduced time-to-publish new product listings by 43%",
      "Lowered order processing errors by 27% with validated API payloads",
    ],
    stack: ["Vite", "Tailwind CSS", "Node.js", "Express", "Postgres", "Neon", "Postman"],
  },
];

export default function CaseStudy(props: { params?: { id?: string } }) {
  const study = useMemo(() => {
    const id = props.params?.id;
    return caseStudies.find((item) => item.id === id) ?? caseStudies[0];
  }, [props.params?.id]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <Link href="/">
          <a className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
            Back to Home
          </a>
        </Link>

        <h1 className="text-4xl md:text-6xl font-display font-bold mt-6">
          {study.title}
        </h1>
        <p className="text-lg text-muted-foreground mt-4">{study.summary}</p>
        {study.liveUrl ? (
          <a
            href={study.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-5 text-xs uppercase tracking-widest text-foreground border border-border/60 px-3 py-2 hover:bg-foreground hover:text-background transition-colors"
          >
            View Live Site
          </a>
        ) : null}

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Problem</h2>
            <p className="text-base text-muted-foreground leading-relaxed">{study.problem}</p>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Constraints</h2>
            <ul className="text-base text-muted-foreground space-y-2">
              {study.constraints.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-2 h-[3px] w-[18px] bg-border" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Key Decisions</h2>
            <ul className="text-base text-muted-foreground space-y-2">
              {study.decisions.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-2 h-[3px] w-[18px] bg-border" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Results</h2>
            <ul className="text-base text-muted-foreground space-y-2">
              {study.results.map((line) => (
                <li key={line} className="flex items-start gap-2">
                  <span className="mt-2 h-[3px] w-[18px] bg-border" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {study.stack.map((tag) => (
              <span
                key={tag}
                className="text-xs uppercase tracking-wider text-muted-foreground border border-border px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
