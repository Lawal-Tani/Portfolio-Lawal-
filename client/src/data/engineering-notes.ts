export type NoteType = "RFC" | "ADR" | "Debugging" | "Postmortem" | "Performance" | "System Design";
export type NoteStatus = "Draft" | "Accepted" | "Proposed" | "Superseded" | "Resolved";

export interface EngineeringNote {
  id: string;
  slug: string;
  type: NoteType;
  title: string;
  subtitle: string;
  date: string;
  status: NoteStatus;
  readingTime: string;
  summary: string;
  tags: string[];
  
  // RFC / ADR / Technical Document Structure
  context?: string;
  problem?: string;
  motivation?: string;
  goals?: string[];
  nonGoals?: string[];
  proposedArchitecture?: string;
  decision?: string;
  alternativesConsidered?: {
    alternative: string;
    tradeOff: string;
  }[];
  consequences?: string[];
  tradeOffs?: string;
  
  // Debugging & Postmortem Structure
  symptom?: string;
  investigation?: string;
  rootCause?: string;
  fix?: string;
  verification?: string;
  lesson?: string;
  
  // Performance Structure
  metricsTable?: {
    metric: string;
    before: string;
    after: string;
    improvement: string;
  }[];
  
  contentMarkdown?: string;
}

export const ENGINEERING_NOTES: EngineeringNote[] = [
  {
    id: "rfc-001",
    slug: "rfc-001-reliable-webhook-delivery",
    type: "RFC",
    title: "RFC-001: Reliable Webhook Delivery Gateway",
    subtitle: "Architecture proposal for an asynchronous buffering proxy with exponential backoff and dead-letter queueing.",
    date: "2026-02",
    status: "Draft",
    readingTime: "6 min read",
    summary: "Proposes an edge-buffered webhook gateway to prevent data loss from downstream transient outages, timeouts, and network drops.",
    tags: ["Distributed Systems", "Webhooks", "Queues", "Reliability"],
    problem: "When downstream webhook receivers restart, deploy, or experience temporary 5xx spikes, traditional upstream producers drop the payload or require cumbersome manual reconciliations. Furthermore, synchronous forward-and-wait models risk producer timeout penalties (e.g., Stripe 5s abort thresholds).",
    motivation: "We need an intermediary gateway that acknowledges inbound payloads within 50ms, persists the raw request in durable storage, and orchestrates decoupled delivery attempts with backoff schedules.",
    goals: [
      "Sub-50ms ingestion ACK acknowledging raw payload receipt.",
      "Reliable delivery workers executing exponential retry progression (10s to 24h).",
      "Dead-letter isolation for events failing 7 consecutive attempts.",
      "Preservation of raw request bodies to maintain HMAC signature verifiability.",
      "Tenant data isolation using Row-Level Security (RLS).",
    ],
    nonGoals: [
      "Stateful real-time bi-directional WebSocket streaming.",
      "In-transit payload transformations or field mutation.",
      "Guaranteeing strict FIFO ordering across independent endpoints.",
    ],
    proposedArchitecture: `
Producer (e.g. Stripe / GitHub)
             │
             ▼
┌─────────────────────────────────────────┐
│         POST /api/ingest                │
│ Capture raw payload, headers, client IP │
│ Respond HTTP 200 immediately (<50ms)    │
└────────────────────┬────────────────────┘
                     │ (Async durable write)
                     ▼
┌─────────────────────────────────────────┐
│     PostgreSQL Events Table (RLS)       │
│ Status: 'pending' · next_retry_at: now()│
└────────────────────┬────────────────────┘
                     │
                     ▼ (Cron Worker / 60s)
┌─────────────────────────────────────────┐
│      Delivery Worker (/api/deliver)     │
│ Query overdue events -> Lock row        │
│ Forward HTTP request (strip hop headers)│
└────────────────────┬────────────────────┘
                     │
          ┌──────────┴──────────┐
          ▼                     ▼
     HTTP 2xx Success       HTTP 5xx / Timeout
          │                     │
    Status: delivered     Increment attempt count
                          Calculate next exponential backoff
                                │
                          Attempts >= 7 ?
                          ├── No  ──► Status: 'retrying'
                          └── Yes ──► Status: 'failed' (Dead Letter)
`,
    alternativesConsidered: [
      {
        alternative: "Synchronous proxying (forward inline with ingestion)",
        tradeOff: "Simpler architecture with no queue, but downstream latency directly risks third-party webhook sender timeouts.",
      },
      {
        alternative: "Self-hosted Redis + BullMQ cluster on a VPS",
        tradeOff: "Provides sub-second retry scheduling, but introduces server maintenance overhead and 24/7 container hosting costs.",
      },
    ],
    consequences: [
      "Deliveries are dispatched with 60-second granularity rather than immediate sub-second intervals.",
      "Requires database write capacity on every inbound event.",
      "Zero lost webhooks during recipient service restarts.",
    ],
  },
  {
    id: "adr-001",
    slug: "adr-001-knova-multi-provider-ai-architecture",
    type: "ADR",
    title: "ADR-001: Multi-Provider AI Architecture for Knova",
    subtitle: "Why Knova utilizes an edge-routed multi-model fallback cascade across DeepSeek, Groq/Llama, and OpenAI-compatible endpoints.",
    date: "2025-11",
    status: "Accepted",
    readingTime: "5 min read",
    summary: "Architectural decision record detailing why Knova routes AI tutoring through multiple inference providers rather than binding to a single proprietary vendor.",
    tags: ["AI Architecture", "System Resilience", "Cost Optimization", "Edge Computing"],
    context: "Knova provides interactive tutoring for Nigerian high school students. Reliance on a single proprietary LLM API (e.g. OpenAI GPT-4) introduced unacceptable single points of failure, unpredictable rate-limiting during peak study hours, and prohibitive operating costs for local students.",
    decision: "We implemented an edge-level AI gateway function (`supabase/functions/tutor-chat`) that supports multiple providers simultaneously: DeepSeek for primary reasoning, Groq/Llama for high-speed fallback, and generic OpenAI-compatible endpoints for localized redundancy. Requests automatically cascade to the next provider upon 429, 500, or 504 errors.",
    alternativesConsidered: [
      {
        alternative: "Single vendor binding to OpenAI GPT-4o-mini",
        tradeOff: "Simplest SDK implementation, but vulnerable to upstream platform downtime, vendor price changes, and API quota freezes.",
      },
      {
        alternative: "Self-hosting quantized open models on dedicated GPU cloud instances",
        tradeOff: "Full data sovereignty, but high fixed monthly infrastructure costs that are inefficient during off-peak student hours.",
      },
    ],
    tradeOffs: "Requires maintaining a common prompt envelope and normalizing heterogeneous streaming response formats, but achieves >99.8% tutoring availability at 70% lower inference costs.",
    consequences: [
      "No single provider outage can bring down student tutoring.",
      "The application dynamically exposes available models in the UI based on server-side health checks.",
      "Inference cost dropped from ~$0.15 per 10 questions to <$0.02.",
    ],
  },
  {
    id: "adr-002",
    slug: "adr-002-pwa-first-strategy-for-emerging-markets",
    type: "ADR",
    title: "ADR-002: PWA-First Strategy for Educational Platforms in Emerging Markets",
    subtitle: "Why Knova launched as an installable Progressive Web App while keeping React Native scaffolding ready for native deployment.",
    date: "2025-10",
    status: "Accepted",
    readingTime: "4 min read",
    summary: "Decoupling distribution from native App Store friction by launching as an offline-capable PWA using Expo 54 and Zustand.",
    tags: ["Mobile Architecture", "PWA", "Performance", "Product Strategy"],
    context: "Target users (secondary school students in Nigeria) primarily use low-tier Android devices with constrained internal storage and expensive mobile data bundles. Requiring a 60MB Google Play download creates severe activation drop-offs.",
    decision: "Deploy Knova as an installable PWA via Expo SDK 54 Web Export, backed by a service worker shell and offline Zustand local stores. Retain Expo native app scaffolding for later phased rollout to Google Play.",
    alternativesConsidered: [
      {
        alternative: "Native-only Android APK distribution",
        tradeOff: "Access to native background APIs, but high user friction: installation hurdles, storage limits, and store approval delays.",
      },
      {
        alternative: "Standard Next.js Responsive Web App",
        tradeOff: "Excellent SEO and server rendering, but sacrifices code reuse when building native iOS/Android builds later.",
      },
    ],
    tradeOffs: "Expo Web export requires careful handling of React Native web polyfills, but allows a single codebase to serve desktop browsers, mobile web, and native mobile.",
    consequences: [
      "Students can launch practice sessions in under 3 seconds with zero installation barrier.",
      "Exam practice sessions remain functional even during cellular signal drops.",
    ],
  },
  {
    id: "adr-003",
    slug: "adr-003-hookpilot-exponential-backoff-and-dead-letter",
    type: "ADR",
    title: "ADR-003: Exponential Backoff Retry Strategy & Dead-Letter Isolation",
    subtitle: "Defining deterministic retry horizons and isolation rules for failed webhook forwards.",
    date: "2026-01",
    status: "Accepted",
    readingTime: "4 min read",
    summary: "How Hookpilot structures its retry intervals to prevent destination thundering herds while guaranteeing eventual delivery.",
    tags: ["Fault Tolerance", "Queueing", "Distributed Systems"],
    context: "When a webhook receiver fails, immediately hammering the endpoint with retries accelerates destination collapse (thundering herd problem). A mathematical backoff schedule is required.",
    decision: "Implemented a 7-stage deterministic backoff ladder: 10s → 1m → 5m → 30m → 2h → 6h → 24h. If the 7th attempt fails, the event is permanently marked as 'failed' (Dead Letter Queue) and requires explicit operator replay.",
    alternativesConsidered: [
      {
        alternative: "Constant linear retry (every 5 minutes)",
        tradeOff: "Simple calculation, but either too slow for transient network blips or too aggressive during prolonged outages.",
      },
      {
        alternative: "Infinite retry with jitter until 200 OK",
        tradeOff: "Guarantees delivery, but exhausts database resources on abandoned or permanently deleted client endpoints.",
      },
    ],
    tradeOffs: "Total retry coverage extends across 32.5 hours. Exhausted events are isolated without blocking subsequent pending webhooks.",
    consequences: [
      "Struggling destination servers have adequate time to recover and complete deployments.",
      "Dead-letter state makes permanent failures explicitly visible for human intervention.",
    ],
  },
  {
    id: "postmortem-001",
    slug: "postmortem-llm-timeouts-and-provider-cascading",
    type: "Postmortem",
    title: "Postmortem: Handling LLM Rate Limits & Upstream 504 Timeouts",
    subtitle: "How upstream inference latency spikes revealed the necessity of a multi-model fallback cascade.",
    date: "2026-01",
    status: "Resolved",
    readingTime: "5 min read",
    summary: "Investigation into an evening spike of client tutor timeouts that led to the implementation of circuit-breaking and automated provider fallback.",
    tags: ["Reliability", "Postmortem", "API Integration", "AI"],
    symptom: "During evening exam study peaks, client tutor requests experienced 15-second hangs followed by 504 Gateway Timeout errors.",
    investigation: "Checked Edge Function logs. Found that primary AI provider API response times had degraded from ~800ms to >20,000ms due to global capacity constraints. The edge function was waiting synchronously until the edge runtime killed the request.",
    rootCause: "The edge function lacked a strict per-provider timeout and had no secondary failover mechanism configured.",
    fix: "1) Implemented an `AbortController` with an 8-second hard timeout per provider. 2) Built an automated cascade mechanism: if Provider A times out or returns HTTP 429/5xx, immediately route the identical sanitized context to Provider B.",
    verification: "Simulated upstream 504 errors in staging; the cascade switched to the fallback provider in 120ms with zero user-facing error dialogs.",
    lesson: "Third-party AI APIs must be treated as inherently unreliable network boundaries. Never wait indefinitely for inference; always enforce aggressive client-side aborts and failover routes.",
  },
  {
    id: "debug-001",
    slug: "debugging-hop-by-hop-header-forwarding",
    type: "Debugging",
    title: "Debugging Hop-by-Hop Header Forwarding in Webhook Relays",
    subtitle: "Why upstream Cloudflare reverse proxies returned 400 Bad Request on forwarded payloads.",
    date: "2026-02",
    status: "Resolved",
    readingTime: "4 min read",
    summary: "Diagnosing how unstripped HTTP/1.1 connection headers caused proxy rejections during webhook replay.",
    tags: ["HTTP", "Networking", "Debugging", "Webhooks"],
    symptom: "In Hookpilot staging, webhooks forwarded to endpoints behind Cloudflare or AWS CloudFront were rejected with HTTP 400 'Bad Request' or 'Invalid Chunked Encoding'.",
    investigation: "Compared raw outbound TCP payloads against original sender payloads. Discovered that incoming headers including `Host`, `Content-Length`, `Connection`, and `Transfer-Encoding` were being forwarded verbatim into the outgoing `fetch()` call.",
    rootCause: "Hop-by-hop headers are intended only for a single transport link and cannot be forwarded by a proxy without violating RFC 2616 / RFC 7230 specifications.",
    fix: "Created a strict header filter function that strips hop-by-hop headers (`connection`, `keep-alive`, `transfer-encoding`, `upgrade`, `host`), sets the destination `Host`, and recomputes `Content-Length` from the raw body buffer.",
    verification: "Retried delivery across Cloudflare, AWS API Gateway, and local Express targets; all received 200 OK without protocol errors.",
    lesson: "A proxy is not a transparent pipe. It must sanitize transport-level headers while preserving application-level metadata.",
  },
  {
    id: "perf-001",
    slug: "performance-edge-spa-fcp-optimization",
    type: "Performance",
    title: "Performance Engineering: Minimizing LCP and Hydration Cost on Client SPAs",
    subtitle: "Measuring and optimizing Largest Contentful Paint, font display, and tree-shaking across Vite and Tailwind v4.",
    date: "2026-02",
    status: "Resolved",
    readingTime: "4 min read",
    summary: "Systematic auditing and optimization of bundle chunks, icon dependencies, and content visibility.",
    tags: ["Performance", "Vite", "Core Web Vitals", "Optimization"],
    problem: "Initial bundle scans showed unnecessary polyfills and oversized icon libraries contributing to bloated initial JavaScript chunks on mobile networks.",
    motivation: "A software engineer's personal portfolio must practice what it preaches: instant rendering, zero layout shift, and minimal bundle bloat.",
    metricsTable: [
      { metric: "Client JS Bundle", before: "840 kB", after: "472 kB", improvement: "43.8% reduction" },
      { metric: "First Contentful Paint (Mobile)", before: "2.4s", after: "0.8s", improvement: "66.7% faster" },
      { metric: "Cumulative Layout Shift", before: "0.14", after: "0.00", improvement: "Zero CLS" },
      { metric: "Font Swap Jitter", before: "Visible flash", after: "Zero shift", improvement: "Preloaded + display:optional" },
    ],
    consequences: [
      "Replaced full icon package imports with targeted tree-shaken exports.",
      "Added `content-visibility: auto` to offscreen sections to eliminate layout recalculation stalls.",
      "Removed heavy custom cursor loop to prevent GPU compositor overhead.",
    ],
  },
];
