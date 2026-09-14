export interface TradeOff {
  decision: string;
  chose: string;
  why: string;
  considered: string;
  tradeOff: string;
}

export interface CaseStudyData {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  role: string;
  timeline: string;
  category: "AI & Full-Stack" | "Distributed Systems" | "Full-Stack & Mobile" | "Realtime & WebSockets" | "Machine Learning & Automation";
  liveUrl?: string;
  githubUrl?: string;
  stack: string[];
  
  // 10-Part Standardized Case Study Format
  overview: string;
  problem: string;
  constraints: string[];
  architectureDiagram: string;
  architectureNotes: string;
  technicalDecisions: TradeOff[];
  implementation: {
    title: string;
    details: string[];
  }[];
  testing: {
    framework: string;
    description: string;
    coverage: string[];
  };
  performance: {
    status: "measured" | "under_expansion";
    metrics?: { label: string; value: string; note: string }[];
    notes: string;
  };
  failuresAndLessons: {
    failure: string;
    why: string;
    change: string;
    lesson: string;
  }[];
  outcome: {
    currentStatus: string;
    whatWorks: string[];
    whatRemains: string[];
  };
}

export interface ExperimentProject {
  id: string;
  title: string;
  oneLiner: string;
  category: string;
  stack: string[];
  challenge: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudyId?: string;
}

export const SELECTED_PROJECTS: CaseStudyData[] = [
  {
    id: "knova",
    title: "Knova",
    subtitle: "AI-Powered CBT & Learning Platform for WAEC / JAMB",
    tagline: "Combines verified past exam questions, adaptive CBT simulations, and a RAG-first AI tutor with multi-provider fallbacks.",
    role: "Lead Full-Stack Engineer — Architecture, Frontend, Backend & AI Pipeline",
    timeline: "2025 – Present",
    category: "AI & Full-Stack",
    liveUrl: "https://knova-alpha.vercel.app",
    githubUrl: "https://github.com/Lawal-Tani/Knova",
    stack: [
      "React Native",
      "Expo SDK 54",
      "Expo Router v6",
      "TypeScript",
      "NativeWind v4",
      "Supabase",
      "PostgreSQL",
      "Zustand v5",
      "TanStack Query v5",
      "Vitest",
      "DeepSeek",
      "Groq / Llama",
    ],
    overview:
      "Knova (formerly TutAI) is an AI-powered Computer-Based Testing (CBT) and tutoring platform engineered for Nigerian secondary school students preparing for high-stakes national examinations (WAEC, JAMB, NECO). It blends verified past examination question banks with intelligent interactive tutoring, automated CBT practice engines, and offline-first state persistence.",
    problem:
      "Students preparing for WAEC and JAMB struggle with fragmented revision materials, unreliable answer keys, and generic AI tools that hallucinate incorrect solutions on West African curriculum specifics. The platform needed to ensure verified exam questions remain the immutable source of truth, while providing instantaneous step-by-step guidance without high API overhead or reliance on a single generative AI vendor.",
    constraints: [
      "Low-bandwidth and intermittent mobile connectivity in target regions.",
      "Strict zero-hallucination requirement for exam correctness keys.",
      "API cost sensitivity requiring economical token utilization.",
      "Support for both Web/PWA and native mobile environments from one unified codebase.",
      "Strict schema isolation for multi-tenant school/teacher examinations.",
    ],
    architectureDiagram: `
┌─────────────────────────────────────────────────────────┐
│              Student Client (PWA / Mobile)              │
│       React Native (Expo 54) · Zustand · TanStack       │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│                  Supabase Edge Layer                    │
│      Auth · Row-Level Security (RLS) · PostgreSQL       │
└────────────────────────────┬────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────┐
│               AI Router (tutor-chat edge)               │
│       RAG Grounding: Verified Explanations + PDFs       │
└───────────────┬─────────────────────────┬───────────────┘
                │                         │
     Primary    ▼              Fallback   ▼
┌───────────────────────┐       ┌───────────────────────┐
│   DeepSeek / Llama    │       │ Groq / OpenAI-Compat  │
│   Fast, Cost-Optimal  │ ───►  │ Resilient Fallback    │
└───────────────────────┘       └───────────────────────┘
`,
    architectureNotes:
      "The client talks to Supabase Edge Functions with Row-Level Security policies enforced across 22 PostgreSQL tables. The AI tutor edge function acts as an intelligent router: it injects verified question keys and syllabus extracts into prompt context and cascades requests across DeepSeek and Groq OpenAI-compatible endpoints with automatic retry upon provider downtime.",
    technicalDecisions: [
      {
        decision: "Verified DB Content as Absolute Ground Truth",
        chose: "Strict RAG grounding over static database answer keys",
        why: "AI models frequently hallucinate incorrect arithmetic or Nigerian curriculum nuances.",
        considered: "Direct LLM prompting with few-shot examples",
        tradeOff: "Requires strict upfront question moderation in exchange for 100% answer correctness.",
      },
      {
        decision: "Multi-Provider AI Gateway with Automated Fallback",
        chose: "Edge function router cascading between DeepSeek, Groq, and OpenAI-compatible hosts",
        why: "Individual inference providers experience intermittent rate limits and regional outages.",
        considered: "Sole dependence on OpenAI GPT-4o-mini",
        tradeOff: "Requires provider-agnostic token normalization, but eliminates downtime and slashes inference costs.",
      },
      {
        decision: "Cross-Platform PWA + Native Foundation",
        chose: "Expo SDK 54 with Expo Router v6 and NativeWind v4",
        why: "Allows instantaneous browser usage on any low-end smartphone without App Store friction, while preserving native app upgradeability.",
        considered: "Pure Next.js Web App",
        tradeOff: "Expo Web bundling requires polyfills for certain Node primitives, but allows a single codebase for web, Android, and iOS.",
      },
      {
        decision: "Offline-First State Management",
        chose: "Persisted Zustand stores with AsyncStorage and Demo Mode fallback",
        why: "Students often lose cellular connection mid-examination.",
        considered: "Pure server-state fetching via React Query alone",
        tradeOff: "More complex store rehydration logic in exchange for zero lost exam submissions during dropouts.",
      },
    ],
    implementation: [
      {
        title: "CBT Timing & Session Engine",
        details: [
          "Engineered an auto-saving examination session store tracking time remaining, answer state, flagged questions, and question navigation palettes.",
          "Implemented background auto-commit on expiration with sub-second resumption upon accidental browser refresh or mobile app suspension.",
        ],
      },
      {
        title: "Curriculum RAG Ingestion & Teacher Platform",
        details: [
          "Built a resource bank containing 220+ verified JAMB/WAEC syllabus extracts and past question keys.",
          "Constructed role-guarded teacher dashboards for passcode-protected custom tests, automatic objective grading, and AI-assisted theory evaluation.",
        ],
      },
      {
        title: "Offline Demo Fallback",
        details: [
          "Developed an offline demo mode that activates when Supabase credentials are not detected or network is severed, utilizing local bundled seeds and mock tutor responses.",
        ],
      },
    ],
    testing: {
      framework: "Vitest + React Native Testing Library",
      description: "Suite covering CBT calculation logic, state persistence, question navigation, and offline demo mode execution.",
      coverage: [
        "90 automated unit and integration tests passing in CI",
        "Full test coverage for session timer decrement and submission triggers",
        "Deterministic model-picker and fallback handler tests",
      ],
    },
    performance: {
      status: "measured",
      metrics: [
        { label: "PWA Bundle Size", value: "< 2.8 MB", note: "Optimized through dynamic imports and icon tree-shaking" },
        { label: "Offline Switch Time", value: "< 100ms", note: "Instantaneous local store fallback on network loss" },
        { label: "Tutor Edge Cold Start", value: "~280ms", note: "Lightweight Deno edge functions on Supabase" },
      ],
      notes: "Production benchmark logging continues to be refined as multi-region latency is monitored.",
    },
    failuresAndLessons: [
      {
        failure: "Initial Expo Web export crashed on Zustand store hydration due to import.meta incompatibility.",
        why: "Metro bundler handling of import.meta differed between Native and Web runtimes.",
        change: "Refactored storage configuration with environment-guarded adapter wrappers and added web-compatible fallback charts.",
        lesson: "Always test web export builds in headless continuous integration rather than relying solely on local Expo dev servers.",
      },
      {
        failure: "AI tutor occasionally attempted to guess answer keys when questions had missing database explanation rows.",
        why: "The system prompt allowed fallback generation if context variables were null.",
        change: "Enforced strict negative constraints: if no verified record exists, the edge function explicitly declines and flags the item for teacher review.",
        lesson: "In educational and assessment software, admitting an absence of data is far superior to plausible hallucination.",
      },
    ],
    outcome: {
      currentStatus: "Active production foundation with working CBT engine, verified question bank, and multi-provider edge functions.",
      whatWorks: [
        "Complete authenticated student and admin workflows",
        "Timed CBT engine with question palettes, flags, and review screens",
        "Multi-provider AI tutor with DeepSeek / Groq fallback cascade",
        "Teacher exam creation and passkey joining flow",
      ],
      whatRemains: [
        "Expanded gamified leaderboards",
        "Native push notifications via Expo EAS",
        "Offline synchronization reconciliation for extended multi-day dropouts",
      ],
    },
  },
  {
    id: "hookpilot",
    title: "Hookpilot",
    subtitle: "Reliable Webhook Ingestion & Delivery Gateway",
    tagline: "Drop-in proxy that buffers, validates, queues, retries with exponential backoff, and provides dead-letter monitoring for webhooks.",
    role: "System Designer & Full-Stack Engineer — Backend, Worker Engine & UI",
    timeline: "2025 – 2026",
    category: "Distributed Systems",
    liveUrl: "https://hookpilot.dev",
    githubUrl: "https://github.com/Lawal-Tani/HookPilot",
    stack: [
      "Next.js 14 (App Router)",
      "TypeScript",
      "Supabase (PostgreSQL)",
      "Row-Level Security (RLS)",
      "Vercel Serverless & Cron",
      "Tailwind CSS",
      "Lucide",
    ],
    overview:
      "Hookpilot is a webhook reliability service engineered to protect web applications from silent data loss caused by recipient downtime, network timeouts, or server errors. It provides an immediate ingestion buffer and executes reliable deliveries via scheduled workers with exponential backoff and dead-letter queueing.",
    problem:
      "Modern architectures rely heavily on webhooks (Stripe, GitHub, Shopify, fintech gateways). However, if the destination server restarts, deploys, or experiences temporary 5xx errors, standard webhooks are dropped or require cumbersome manual reconciliations. Developers need a lightweight, observable gateway that guarantees delivery attempts without building custom retry infrastructure from scratch.",
    constraints: [
      "Ingestion API must respond in under 50ms with HTTP 200 to satisfy third-party webhook producer timeout SLAs.",
      "Safe handling of arbitrary JSON, raw binary payloads, and diverse content-types.",
      "Idempotency and avoidance of runaway retry storms.",
      "Strict data isolation between different authenticated tenant endpoints.",
      "Serverless execution environment without long-running stateful Node daemon processes.",
    ],
    architectureDiagram: `
Webhook Producer (e.g. Stripe)
           │
           ▼
┌──────────────────────────────────────┐
│       POST /api/ingest               │
│  Fast Ingestion Buffer (<50ms ACK)   │
└──────────────────┬───────────────────┘
                   │
                   ▼ (Async DB Insert)
┌──────────────────────────────────────┐
│       Supabase Events Store          │
│   Status: pending | next_retry_at    │
└──────────────────┬───────────────────┘
                   │
                   ▼ (Every 1m Cron Worker)
┌──────────────────────────────────────┐
│        Delivery Engine Worker        │
│   /api/deliver (CRON_SECRET Auth)    │
└──────────────────┬───────────────────┘
                   │
          Forward to Destination
          Strips hop-by-hop headers
          30s timeout · Log attempt
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
    HTTP 2xx (Success)   HTTP 4xx/5xx / Timeout
         │                   │
   Status: delivered   Calculate Exponential Backoff
                       [10s, 1m, 5m, 30m, 2h, 6h, 24h]
                             │
                      Attempts >= 7?
                       ├── No ──► Status: retrying
                       └── Yes ─► Status: failed (Dead Letter)
                                       │
                               Manual Replay Button
`,
    architectureNotes:
      "Ingestion captures raw body, headers, and IP, returning HTTP 200 immediately before asynchronous persistence. A cron-triggered delivery worker queries events whose next_retry_at is overdue, executes HTTP forwarding with strict hop-by-hop header filtering, logs attempt latency and response codes, and applies exponential backoff up to 7 attempts.",
    technicalDecisions: [
      {
        decision: "Asynchronous Fast Ingestion Buffer",
        chose: "Immediate HTTP 200 ACK followed by async database persistence",
        why: "Webhook producers like Stripe drop endpoints if response time exceeds 2 to 5 seconds.",
        considered: "Synchronous forwarding inline with ingestion",
        tradeOff: "Requires dedicated background worker to forward, but protects producers from destination slowdowns.",
      },
      {
        decision: "Deterministic Exponential Backoff Schedule",
        chose: "Staged interval progression: 10s → 1m → 5m → 30m → 2h → 6h → 24h",
        why: "Immediate retries overwhelm struggling servers; exponential intervals give recovery breathing room.",
        considered: "Fixed 5-minute linear retry interval",
        tradeOff: "Longer final delivery latency for prolonged outages, but significantly increases eventual delivery success rate.",
      },
      {
        decision: "Header Sanitization during Forwarding",
        chose: "Strict stripping of hop-by-hop headers (host, content-length, connection, transfer-encoding)",
        why: "Forwarding client headers directly caused destination reverse proxies to reject requests or freeze connection sockets.",
        considered: "Forwarding raw Request header dictionary unmodified",
        tradeOff: "Slight overhead in header transformation, but ensures compliant HTTP/1.1 and HTTP/2 proxy forwarding.",
      },
      {
        decision: "Serverless Cron Worker Architecture",
        chose: "Vercel Cron executing secure \`/api/deliver\` endpoint with CRON_SECRET authentication",
        why: "Maintains zero-idle operational infrastructure without paying for 24/7 dedicated container compute.",
        considered: "Dedicated Redis + BullMQ worker running on a VPS",
        tradeOff: "Batch delivery runs on 60-second granularity rather than sub-second immediate dispatch, but provides zero-maintenance reliability.",
      },
    ],
    implementation: [
      {
        title: "Ingestion and Endpoint Routing",
        details: [
          "Captures raw text body before JSON parsing to preserve exact signature verifiability for destination webhooks.",
          "Resolves endpoint URL slug with user-level Row-Level Security checks.",
        ],
      },
      {
        title: "Delivery Engine & Attempt Tracking",
        details: [
          "Records every forward attempt in \`delivery_attempts\` with HTTP status code, response body excerpt, and duration in milliseconds.",
          "Caps attempts at 7; transitions exhausted events into dead-letter state.",
        ],
      },
      {
        title: "Operational Dashboard & Replay",
        details: [
          "Built real-time polling dashboard with SVG analytics donut charts and attempt inspection slide-overs.",
          "Engineered one-click instant replay API (\`/api/events/[id]/replay\`) that resets attempts and fires immediate forward dispatch.",
        ],
      },
    ],
    testing: {
      framework: "Manual Integration & Mock Destination Harness",
      description: "Validated against local mock servers returning intermittent 500 errors, connection timeouts, and payload reflections.",
      coverage: [
        "Verified exponential backoff schedule calculations against timestamp offsets",
        "Verified hop-by-hop header removal prevents proxy rejections",
        "Verified dead-letter cutoff triggers precisely on the 7th failed attempt",
      ],
    },
    performance: {
      status: "measured",
      metrics: [
        { label: "Ingestion ACK Latency", value: "< 45ms", note: "Measured on Vercel Edge/Serverless runtimes" },
        { label: "Forwarding Timeout", value: "30,000ms", note: "Hard abort limit to prevent zombie worker threads" },
        { label: "Max Retry Horizon", value: "32.5 hours", note: "Total coverage span across 7 retry intervals" },
      ],
      notes: "High-volume synthetic load testing (10k events/min) is planned for the next engineering cycle.",
    },
    failuresAndLessons: [
      {
        failure: "In early tests, forwarding requests failed mysteriously with '400 Bad Request' on upstream Cloudflare destinations.",
        why: "The original \`Host\` and \`Content-Length\` headers from the sender were forwarded unmodified, violating chunked body signatures.",
        change: "Implemented a strict header cleaner that removes hop-by-hop headers and recalculates content headers.",
        lesson: "A proxy must never assume inbound HTTP headers are safe to blindly re-broadcast to arbitrary downstream servers.",
      },
      {
        failure: "Concurrent cron runs occasionally picked up the same pending event twice.",
        why: "Lack of row locking during batch event selection.",
        change: "Added timestamp-based optimistic locking: immediately mark status as 'processing' upon select.",
        lesson: "Always design distributed workers under the assumption that multiple instances will run concurrently.",
      },
    ],
    outcome: {
      currentStatus: "Core delivery engine, retry scheduler, endpoints CRUD, and live dashboard are fully implemented (~78% MVP completed).",
      whatWorks: [
        "Sub-50ms ingestion endpoint with payload preservation",
        "7-tier exponential backoff delivery worker",
        "Delivery attempt history with duration and error response logs",
        "One-click manual replay and status filtering",
      ],
      whatRemains: [
        "Slack & Email alert dispatch on final dead-letter failures",
        "Stripe usage billing integration",
        "High-throughput Redis queue adapter for sub-minute delivery SLAs",
      ],
    },
  },
  {
    id: "stylecart",
    title: "StyleCart",
    subtitle: "Multi-Role Campus Commerce & Services Platform",
    tagline: "React Native & Supabase ecosystem uniting campus student buyers, merchant vendors, service providers, and administrators.",
    role: "Full-Stack & Mobile Engineer — Multi-Role State, Supabase & Dashboard",
    timeline: "2024 – 2025",
    category: "Full-Stack & Mobile",
    liveUrl: "https://stylecart-demo.vercel.app",
    githubUrl: "https://github.com/Lawal-Tani/StyleCart",
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Row-Level Security",
      "Tailwind / Native Styling",
    ],
    overview:
      "StyleCart is a multi-sided campus commerce platform tailored for university ecosystems. It integrates product marketplace shopping, student artisan service bookings, vendor inventory management, ledger-backed withdrawals, and super-admin vendor verification into a unified mobile application.",
    problem:
      "University campuses have vibrant informal commerce (thrift clothes, styling, tech repairs, food), but transactions rely on chaotic WhatsApp groups with zero buyer protection, unverified sellers, and no structured transaction records. StyleCart solves this by structuring campus-specific commerce with role-based access and ledgered withdrawals.",
    constraints: [
      "Diverse stakeholder access models: Buyers, Product Vendors, Service Providers, and Super Admins.",
      "Financial ledger integrity for withdrawal requests without banking webhook complexity.",
      "Offline-resilient product catalog browsing for spotty campus Wi-Fi networks.",
    ],
    architectureDiagram: `
┌────────────────────────────────────────────────────────┐
│               Multi-Role React Native App              │
│    Buyer UI · Vendor Admin · Service Hub · SuperAdmin  │
└───────────────────────────┬────────────────────────────┘
                            │
                            ▼
┌────────────────────────────────────────────────────────┐
│                 Supabase PostgreSQL                     │
│    Role-Based Access Control · Row-Level Security      │
└────────┬──────────────────┬──────────────────┬─────────┘
         │                  │                  │
         ▼                  ▼                  ▼
┌─────────────────┐┌─────────────────┐┌──────────────────┐
│ Products/Orders ││ Vendor Ledger   ││ Ad Campaigns &   │
│ Multi-vendor    ││ Deposits &      ││ Performance      │
│ Catalog + Cart  ││ Withdrawals     ││ Analytics        │
└─────────────────┘└─────────────────┘└──────────────────┘
`,
    architectureNotes:
      "Built with React Native and Expo, the application uses Supabase Auth with custom role metadata to govern route access. The database layer features strict Row-Level Security ensuring vendors cannot view rival revenue figures or administrative verification logs.",
    technicalDecisions: [
      {
        decision: "Single App with Multi-Role Role-Guarded Navigation",
        chose: "Unified codebase with dynamic role routing rather than separate apps for buyers and sellers",
        why: "Students frequently alternate between buying campus items and selling personal services.",
        considered: "Two independent apps (Buyer App vs Vendor App)",
        tradeOff: "Slightly larger mobile bundle, but drastically cuts maintenance overhead and mirrors user behavior.",
      },
      {
        decision: "Relational Ledger for Financial Tracking",
        chose: "Normalized PostgreSQL transactions table with status state machines (pending, completed, failed)",
        why: "Prevents discrepancies between reported balance and actual payout history.",
        considered: "Mutable single column balance on vendor profile",
        tradeOff: "Requires aggregating balance from ledger rows, but guarantees an auditable transaction history.",
      },
    ],
    implementation: [
      {
        title: "Vendor Payout & Banking Engine",
        details: [
          "Developed withdrawal request workflow with bank verification form and audit status tracking.",
          "Created vendor banking overview displaying net deposits, withdrawals, and historical transactions.",
        ],
      },
      {
        title: "Vendor Analytics & Ad Campaigns",
        details: [
          "Engineered metrics dashboard calculating total revenue, average order value, and top-selling product breakdowns across selectable date windows.",
          "Built campaign management interface tracking ad impressions, clicks, and click-through rates.",
        ],
      },
      {
        title: "Super-Admin Verification Flow",
        details: [
          "Created administrative vendor verification system allowing super-admins to inspect business credentials, review ratings, and toggle verified status.",
        ],
      },
    ],
    testing: {
      framework: "Manual Verification & Schema Testing",
      description: "Tested multi-role permission boundaries against Supabase RLS policies.",
      coverage: [
        "Verified unauthorized users cannot read unverified vendor draft products",
        "Verified vendor withdrawal requests cannot exceed calculated available balance",
      ],
    },
    performance: {
      status: "under_expansion",
      notes: "Performance benchmarking is an area currently being expanded for this project as real campus traffic tests commence.",
    },
    failuresAndLessons: [
      {
        failure: "Early dashboard queries duplicated analytics computations on every tab switch.",
        why: "Components each fetched raw order rows independently and computed sums in JavaScript.",
        change: "Consolidated analytics fetching into dedicated service endpoints with memoized aggregations.",
        lesson: "Compute aggregates close to the data layer rather than repeatedly crunching arrays on mobile client threads.",
      },
    ],
    outcome: {
      currentStatus: "Admin panel, withdrawal system, vendor analytics, campaign board, and buyer marketplace are completed and committed.",
      whatWorks: [
        "Multi-role user authentication and protected navigation",
        "Vendor withdrawal request and banking ledger system",
        "Vendor analytics dashboard with period filtering",
        "Super-admin vendor verification panel",
      ],
      whatRemains: [
        "Automated Paystack/Flutterwave bank account resolution API",
        "Push notification alerts for new incoming orders",
      ],
    },
  },
  {
    id: "relaydesk",
    title: "RelayDesk",
    subtitle: "Real-Time Incident Command & Lifecycle Management",
    tagline: "Full-stack dashboard with real-time WebSockets synchronization for tracking outages, incident owners, and timeline updates.",
    role: "Full-Stack Engineer — Monorepo Backend & Realtime Frontend",
    timeline: "2025",
    category: "Realtime & WebSockets",
    githubUrl: "https://github.com/Lawal-Tani/RelayDesk",
    stack: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "WebSockets (ws)",
      "Vite",
      "Tailwind CSS",
    ],
    overview:
      "RelayDesk is a full-stack incident command system designed to coordinate high-priority engineering incidents, maintain real-time audit logs, assign responders, and document postmortems.",
    problem:
      "During infrastructure outages, engineering teams frequently coordinate across fragmented chat channels and static spreadsheets, leading to unclear incident ownership, duplicate efforts, and lost timeline context for post-incident reviews.",
    constraints: [
      "Low-latency timeline updates (<500ms broadcast to all connected responders).",
      "Persistent state with relational timeline foreign keys.",
      "Reliable disconnect recovery for mobile engineers on cellular connections.",
    ],
    architectureDiagram: `
┌──────────────────────────────┐       ┌──────────────────────────────┐
│  Web Client (Incident Lead)  │       │  Web Client (SRE Responder)  │
└──────────────┬───────────────┘       └──────────────┬───────────────┘
               │                                      │
               │ HTTP REST (CRUD) & WebSocket Sync    │
               ▼                                      ▼
┌─────────────────────────────────────────────────────────────────────┐
│                       Express API & WS Hub                          │
│        Authentication (JWT) · Incident Router · Event Broadcaster   │
└──────────────────────────────────┬──────────────────────────────────┘
                                   │
                                   ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        PostgreSQL Database                          │
│     Incidents · Responders · Timeline Events · Postmortems          │
└─────────────────────────────────────────────────────────────────────┘
`,
    architectureNotes:
      "Express server pairs standard REST endpoints for transactional incident modifications with a centralized WebSocket hub broadcasting typed JSON events (\`incident.created\`, \`incident.updated\`, \`incident.update.created\`) to all connected clients.",
    technicalDecisions: [
      {
        decision: "Native WebSocket Hub over Third-Party PubSub",
        chose: "Lightweight \`ws\` server integrated directly with Express",
        why: "Enables zero-dependency local development and predictable debugging without third-party SaaS limits.",
        considered: "Pusher / Firebase Realtime Database",
        tradeOff: "Requires stateful container hosting rather than serverless lambdas, but gives absolute protocol control.",
      },
      {
        decision: "Structured Postmortem Model",
        chose: "Normalized postmortem records linked directly to incident resolution IDs",
        why: "Ensures root cause analysis is treated as an essential artifact of incident resolution.",
        considered: "Free-form Markdown text column on incidents table",
        tradeOff: "More rigid schema in exchange for consistent incident reporting metrics.",
      },
    ],
    implementation: [
      {
        title: "Realtime WebSocket Hub",
        details: [
          "Implemented typed event broadcast system dispatching updates immediately upon database commit.",
          "Built client-side reconnect handler maintaining active incident subscription upon intermittent disconnection.",
        ],
      },
      {
        title: "Incident Lifecycle & Filtering",
        details: [
          "Developed query filters for severity (P1–P4), operational status (Investigating, Identified, Monitoring, Resolved), and responder ownership.",
        ],
      },
    ],
    testing: {
      framework: "Manual Multi-Client Integration Testing",
      description: "Tested real-time event propagation across simultaneous browser sessions.",
      coverage: [
        "Verified timeline entries appear on connected secondary clients in under 300ms",
        "Verified token authentication validation on WebSocket handshake",
      ],
    },
    performance: {
      status: "measured",
      metrics: [
        { label: "Timeline Update Latency", value: "< 250ms", note: "Measured on local network WebSocket broadcast" },
        { label: "Memory Footprint", value: "~42 MB", note: "Idle Express + WS Node process" },
      ],
      notes: "Production benchmarking is currently being expanded for clustered multi-node scaling.",
    },
    failuresAndLessons: [
      {
        failure: "Initial deployment to serverless environment severed persistent WebSocket connections.",
        why: "Vercel Serverless Functions terminate immediately after request response and cannot sustain persistent TCP sockets.",
        change: "Documented deployment requirements specifying container runtimes (Fly.io, Railway, Render) for stateful WebSocket hubs.",
        lesson: "Always align architectural protocols with target hosting primitives before deciding on serverless hosting.",
      },
    ],
    outcome: {
      currentStatus: "Monorepo with complete Express backend, Postgres schema, and React frontend is fully functional.",
      whatWorks: [
        "Incident CRUD and status transitions",
        "Live WebSocket broadcast of comments and severity updates",
        "Structured postmortem entry and resolution flows",
      ],
      whatRemains: [
        "PagerDuty / Opsgenie webhook integration",
        "Redis Pub/Sub adapter for horizontal multi-instance scaling",
      ],
    },
  },
];

export const EXPERIMENT_PROJECTS: ExperimentProject[] = [
  {
    id: "cnc-lstm",
    title: "CNC Spindle Telemetry Forecasting",
    oneLiner: "Time-series LSTM neural network forecasting machine spindle speed from multi-signal industrial CNC telemetry.",
    category: "Machine Learning & Automation",
    stack: ["Python", "TensorFlow / Keras", "Pandas", "NumPy", "Time-Series"],
    challenge: "Handling correlated high-frequency industrial controller telemetry (feed rate, spindle speed, motor load) with strict chronological train/test splitting and benchmark comparison against persistence baselines.",
  },
  {
    id: "beulis-cosmetics",
    title: "Beulis Cosmetics",
    oneLiner: "Full-stack beauty and skincare commerce application with responsive product browsing and order management.",
    category: "Full-Stack Web",
    stack: ["React", "Tailwind CSS", "Node.js", "Express", "MongoDB", "PostgreSQL", "Cloudinary"],
    challenge: "Engineered catalog APIs and media optimization for rapid product image browsing over bandwidth-constrained mobile connections.",
    liveUrl: "https://beuliscosmetics.com",
  },
  {
    id: "3ft-fashion",
    title: "3FT (Thrift Fashion)",
    oneLiner: "Mobile-first e-commerce storefront for a curated thrift fashion brand with rapid catalog drops.",
    category: "Full-Stack Web",
    stack: ["Vite", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Neon"],
    challenge: "Streamlined checkout and cart flow with Postman-validated API contracts to minimize mobile checkout drops.",
  },
  {
    id: "relaydesk-experiment",
    title: "RelayDesk",
    oneLiner: "Real-time incident command dashboard for managing infrastructure outages with live WebSocket timeline events.",
    category: "Distributed & Realtime",
    stack: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "WebSockets"],
    challenge: "Sub-500ms broadcast latency across multiple active incident responders with persistent PostgreSQL timeline audit trails.",
    caseStudyId: "relaydesk",
    githubUrl: "https://github.com/Lawal-Tani/RelayDesk",
  },
];
