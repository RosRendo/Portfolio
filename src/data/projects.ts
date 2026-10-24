export interface TechCategory {
  category: string;
  items: string[];
}

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  tagline: string;
  status: "In Development" | "Production-Ready" | "Concept Prototype" | "Active Experiments";
  deploymentStatus: "Live Demo" | "Staging Build" | "Code Repository" | "Private Beta";
  accentColor: string;
  image: string;
  shortDescription: string;
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  architecture: {
    overview: string;
    diagramSteps: string[];
    components: { name: string; role: string; tech: string }[];
  };
  techStack: TechCategory[];
  challenges: {
    challenge: string;
    solution: string;
  }[];
  decisions: {
    title: string;
    reasoning: string;
  }[];
  metrics: ProjectMetric[];
  links: {
    demo: string | null;
    github: string | null;
    readMore?: string;
  };
}

export const projectsData: Project[] = [
  // 1. ServiceFinder
  {
    id: "servicefinder",
    slug: "servicefinder",
    title: "ServiceFinder",
    category: "Home Services Marketplace",
    tagline: "Multi-sided platform connecting homeowners with verified contractors and automated booking.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#6366f1",
    image: "/images/servicefinder.jpg",
    shortDescription:
      "A home-services marketplace connecting customers, companies, and service professionals with real-time booking, verified profiles, and automated scheduling.",
    overview:
      "ServiceFinder bridges the communication and reliability gap between homeowners needing maintenance (plumbing, electrical, HVAC, landscaping) and qualified local professionals. The platform supports multi-tenant accounts, interactive scheduling calendars, automated price estimates based on service parameters, and a review verification loop.",
    problem:
      "Finding trusted home service professionals is traditionally plagued by opaque pricing, missed appointment windows, and fragmented communication across phone calls and messaging apps. Service professionals, on the other hand, struggle with double-bookings, route planning, and delayed customer payments.",
    solution:
      "A centralized marketplace platform featuring real-time availability sync, role-based dashboards for customers and contractor teams, instant appointment booking with automated time-slot conflict detection, and transparent upfront fee estimates.",
    keyFeatures: [
      "Role-Based Access Control (RBAC): Separate operational views for Customers, Service Providers, and Marketplace Admins.",
      "Real-Time Schedule Matrix: Slot booking engine with automated double-booking prevention across overlapping time zones.",
      "Dynamic Pricing Calculator: Computes upfront estimates factoring in service type, urgency surcharges, and localized material fees.",
      "Verified Provider Badges: Automated credentials and review audit system to boost client trust.",
      "Responsive Booking Workflow: Step-by-step interactive scheduling modal designed for seamless mobile and desktop conversion.",
    ],
    architecture: {
      overview:
        "Engineered with a decoupled, high-performance architecture: Next.js on the client for server-side rendered service discovery and static catalog speed, backed by a resilient Node.js / Express REST API and PostgreSQL for strict transactional data integrity.",
      diagramSteps: [
        "Client UI (Next.js 16 + Tailwind CSS) fetches localized service listings with ISR cache tags.",
        "API Gateway validates incoming JWT tokens and routes requests to domain controllers (Auth, Booking, Catalog).",
        "Prisma ORM executes parameterized queries against PostgreSQL with strict foreign key constraints and ACID guarantees.",
        "Background workers handle email/SMS appointment confirmations and reminders via cron-driven queues.",
      ],
      components: [
        { name: "Frontend Client", role: "SSR catalog, dynamic booking modals, and customer portal", tech: "Next.js 16, TypeScript, Tailwind CSS" },
        { name: "Backend Core", role: "RESTful API services, JWT authentication, and booking state machine", tech: "Node.js, Express, TypeScript" },
        { name: "Data Layer", role: "Relational persistence, slot locking, and migration history", tech: "PostgreSQL, Prisma ORM" },
        { name: "Infrastructure", role: "Containerized deployment and reverse proxy TLS termination", tech: "Docker, Nginx, Linux, PM2" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons"] },
      { category: "Backend & API", items: ["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "Zod Validation"] },
      { category: "Database & Storage", items: ["PostgreSQL", "Prisma ORM", "Relational Indexing", "Connection Pooling"] },
      { category: "DevOps & Tooling", items: ["Docker", "Nginx", "Linux", "Git", "PM2"] },
    ],
    challenges: [
      {
        challenge: "Concurrent Slot Booking Race Conditions",
        solution:
          "Implemented database-level pessimistic row locking within Prisma transactions during checkout to prevent simultaneous reservations of the same contractor time-window.",
      },
      {
        challenge: "Multi-Role State Hydration",
        solution:
          "Architected strict session cookies with cryptographically signed role claims, ensuring instantaneous authorization checks without round-trip database hits on every client route navigation.",
      },
    ],
    decisions: [
      {
        title: "Relational PostgreSQL over Document Database",
        reasoning:
          "Service marketplaces require strict foreign key guarantees between bookings, contractors, and invoices. PostgreSQL prevented orphaned records and made complex availability overlap queries trivial.",
      },
      {
        title: "Server Actions & API Hybrid Layer",
        reasoning:
          "Leveraged Next.js Server Components for high-speed SEO catalog pages while delegating heavy booking mutations to dedicated Express REST endpoints with rate limiting.",
      },
    ],
    metrics: [
      { label: "Architecture", value: "Multi-Tier Clean REST" },
      { label: "Relational Tables", value: "14 Normalized Entities" },
      { label: "Avg API Response", value: "< 45ms Local Bench" },
      { label: "Booking Engine", value: "Zero Race Conflicts" },
    ],
    links: {
      demo: "https://servicefinder-dusky.vercel.app/",
      github: "https://github.com/rosrendo/servicefinder",
      readMore: "/projects/servicefinder",
    },
  },

  // 2. EscrowDeal
  {
    id: "safedeal",
    slug: "safedeal",
    title: "EscrowDeal",
    category: "Gaming & Digital Goods Escrow",
    tagline: "Peer-to-peer verified marketplace with 48-hour automated escrow holding pool and dispute arbitration.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#10b981",
    image: "/images/safedeal.jpg",
    shortDescription:
      "A digital goods and gaming escrow platform holding funds for 48 hours during buyer inspection, featuring cryptographic audit trails and dispute mediation protocols.",
    overview:
      "EscrowDeal (SafeDeal) eliminates scams and fraud in digital account trading, game licenses, currency, and high-value digital services. When a buyer initiates an order, payment is secured in an automated holding pool until the credentials or artifacts are verified, protecting both buyers and honest merchants.",
    problem:
      "Selling digital assets like gaming accounts and high-value licenses is notorious for chargebacks, fake receipts, and account recoveries. Conversely, buyers face rogue sellers who take payments upfront and vanish.",
    solution:
      "A deterministic 48-hour escrow pipeline. Buyers deposit funds into an automated escrow state machine; the seller provides verified digital credentials; the buyer inspects and approves; funds release instantly to the seller.",
    keyFeatures: [
      "Deterministic Escrow State Machine: Strict status pipeline (Created -> Escrow Funded -> Credentials Delivered -> Verified -> Released).",
      "48-Hour Inspection Guarantee: Built-in countdown clock allowing buyers to verify game accounts or code licenses before payout.",
      "Append-Only Audit Ledger: Every chat message, credential release, and state transition is timestamped and cryptographically signed.",
      "Integrated Dispute Arbitration: Structured mediation workflow with evidence upload for contested orders.",
      "Sleek Fintech Dashboard: Real-time escrow balance, active transactions, and merchant trust ratings.",
    ],
    architecture: {
      overview:
        "Engineered around an immutable transaction ledger. All escrow events are processed through transition guards that prevent invalid operations or double-spend payouts.",
      diagramSteps: [
        "Buyer creates order and locks funds into escrow smart-ledger.",
        "Seller receives cryptographic release token to deposit digital credentials.",
        "Buyer receives inspection window with timer countdown.",
        "System executes auto-release or processes mutual sign-off into payout.",
      ],
      components: [
        { name: "Frontend Portal", role: "Escrow deal creation, inspection countdown, and dispute desk", tech: "Next.js, TypeScript, Tailwind CSS" },
        { name: "Escrow State Machine", role: "State transition enforcement, lock timeouts, and webhooks", tech: "Node.js, Express, TypeScript" },
        { name: "Ledger Database", role: "Immutable ledger entries and transaction histories", tech: "PostgreSQL, Prisma ORM" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Lucide Icons"] },
      { category: "Backend", items: ["Node.js", "Express.js", "State Machine Pattern", "HMAC Signatures"] },
      { category: "Database", items: ["PostgreSQL", "Prisma ORM", "Append-Only Transaction Ledger"] },
      { category: "Security", items: ["Idempotency Keys", "Cryptographic Checksums", "Strict Auth Guards"] },
    ],
    challenges: [
      {
        challenge: "Idempotency in High-Frequency Webhooks",
        solution: "Configured cryptographic webhook signature verification and redis-backed idempotency keys to ensure duplicate network retries never double-credit escrow accounts.",
      },
      {
        challenge: "Preventing State Deadlocks",
        solution: "Enforced non-blocking state guards with automated fallback timers that auto-release or escalate to admin mediation after 48 hours.",
      },
    ],
    decisions: [
      {
        title: "Immutable Transaction Ledger",
        reasoning: "All monetary transitions are stored as discrete credit/debit ledger entries rather than in-place balance updates, making financial reconciliation audit-proof.",
      },
    ],
    metrics: [
      { label: "Escrow Protection", value: "48h Auto Lock" },
      { label: "Ledger Integrity", value: "100% Immutable" },
      { label: "Dispute Flow", value: "Built-In Mediation" },
      { label: "API Latency", value: "< 35ms Edge" },
    ],
    links: {
      demo: "https://safe-deal-lemon.vercel.app/",
      github: "https://github.com/rosrendo/safedeal-escrow",
      readMore: "/projects/safedeal",
    },
  },

  // 3. TechTune Healer
  {
    id: "techtune",
    slug: "techtune",
    title: "TechTune Healer",
    category: "Clinical Health & Diagnostics",
    tagline: "Next-generation healthcare administration suite with patient telemetry, scheduling matrix, and diagnostic lab tracking.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#06b6d4",
    image: "/images/techtune.jpg",
    shortDescription:
      "A clinical operations platform and doctor administration dashboard featuring real-time patient telemetry monitors, consultation scheduling, and diagnostic tracking.",
    overview:
      "TechTune Healer modernizes hospital and clinic administrative workflows. Built for medical directors and clinical teams, it combines live patient vital sign telemetry (heart rate, blood pressure, SpO2), doctor availability matrices, and diagnostic lab card reviews in an ergonomic dark interface.",
    problem:
      "Traditional medical software is clunky, fragmented across legacy desktop clients, and suffers from poor information hierarchy that slows down triage and appointment management.",
    solution:
      "A responsive, high-density clinical dashboard that delivers real-time vital sign alerts, instant room-by-room doctor consultation scheduling, and unified diagnostic reports in a modern cybernetic design system.",
    keyFeatures: [
      "Live Patient Telemetry: Dynamic heart rate waveform displays, blood pressure metrics, and SpO2 vital monitors with instant warning thresholds.",
      "Appointment Scheduling Matrix: High-density calendar grid mapping doctors, time slots, and room allocations with zero booking overlaps.",
      "Diagnostic Lab Cards: Integrated tracking for Complete Blood Count (CBC), Metabolic Panels, and Lipid Profiles with one-click status review.",
      "Department Triage Alerts: Real-time room alerts flagging abnormal vitals and immediate nurse dispatch requests.",
      "Dark Luxury Medical UI: Designed to reduce eye strain in 24/7 hospital monitoring environments.",
    ],
    architecture: {
      overview:
        "Built on a high-throughput reactive architecture: React and Tailwind CSS on the client with lightweight SVG waveform visualizers, connected to a microservices backend.",
      diagramSteps: [
        "Patient telemetry streams ingested via WebSocket channels and pushed to the monitor dashboard.",
        "Scheduling matrix updates validated against doctor on-call schedules in PostgreSQL.",
        "Diagnostic lab results compiled and cryptographically tagged for HIPAA-grade compliance.",
      ],
      components: [
        { name: "Clinical Dashboard", role: "Real-time telemetry, doctor calendar, and triage alerts", tech: "React, Next.js, Tailwind CSS" },
        { name: "Telemetry Engine", role: "Time-series vital signs ingestion and threshold monitoring", tech: "Node.js, WebSockets, Redis" },
        { name: "Clinical Database", role: "Encrypted patient records, doctor profiles, and lab history", tech: "PostgreSQL, Prisma ORM" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "SVG Waveforms"] },
      { category: "Real-Time & API", items: ["WebSockets", "Node.js", "Express", "RESTful APIs"] },
      { category: "Database & Cache", items: ["PostgreSQL", "Redis Pub/Sub", "Prisma ORM"] },
      { category: "Security", items: ["Role-Based Access", "Data Encryption", "Audit Logs"] },
    ],
    challenges: [
      {
        challenge: "Smooth Telemetry Waveform Rendering",
        solution: "Optimized SVG polyline rendering using requestAnimationFrame and fixed-buffer circular arrays, keeping client CPU utilization below 2%.",
      },
    ],
    decisions: [
      {
        title: "High-Density Ergonomic Information Architecture",
        reasoning: "Grouped patient monitors and calendar slots into glanceable bento grid cards so medical staff can assess entire ward statuses in seconds.",
      },
    ],
    metrics: [
      { label: "Telemetry Latency", value: "< 20ms Stream" },
      { label: "Vitals Refresh", value: "Real-Time 60Hz" },
      { label: "Scheduling Grid", value: "Zero Overlaps" },
      { label: "Render Load", value: "< 2% Client CPU" },
    ],
    links: {
      demo: "https://techtuneweb.vercel.app/",
      github: "https://github.com/rosrendo/techtune-healer",
      readMore: "/projects/techtune",
    },
  },

  // 4. Journex
  {
    id: "trading-tools",
    slug: "trading-tools",
    title: "Journex",
    category: "Quantitative Trading Terminal",
    tagline: "Professional trading terminal with multi-asset order routing, real-time depth-of-market, and position analytics.",
    status: "Active Experiments",
    deploymentStatus: "Live Demo",
    accentColor: "#3b82f6",
    image: "/images/tradingtools.jpg",
    shortDescription:
      "A quantitative trading terminal and analytics suite featuring multi-timeframe candlestick engines, custom indicators, and automated risk metrics.",
    overview:
      "Journex is a professional-grade web trading terminal and algorithmic analytics laboratory. Built for active traders and quant developers, it offers sub-millisecond technical indicator calculations, automated risk metrics (Sharpe ratio, max drawdown), and high-frequency trade journaling.",
    problem:
      "Retail trading platforms hide technical indicator math, suffer from stuttering frame rates on large historical data sets, and lack automated trade journaling workflows.",
    solution:
      "A developer-oriented trading terminal with modular indicator algorithms, vectorized backtesting engines, and a responsive charting canvas delivering 60 FPS performance across thousands of candlestick bars.",
    keyFeatures: [
      "Multi-Timeframe Charting Engine: Fast candlestick and volume profile rendering with technical indicator overlays.",
      "Algorithmic Risk Lab: Calculates Sharpe Ratio, Sortino Ratio, Win Rate %, Profit Factor, and Maximum Drawdown.",
      "Real-Time Trade Journaling: Automatic execution tagging, screenshot capture, and mistake post-mortem logs.",
      "Webhook Signal Pipeline: Automated triggers that dispatch trade alerts to Discord and Telegram.",
    ],
    architecture: {
      overview: "Built using optimized numerical computation in pure TypeScript. Time-series data is ingested and normalized into typed arrays for zero-latency indicator recalculations.",
      diagramSteps: [
        "OHLCV market data ingested via WebSocket and exchange REST endpoints.",
        "Mathematical indicator algorithms computed using rolling-window arrays.",
        "Performance metrics computed and rendered via lightweight Canvas/SVG charts.",
      ],
      components: [
        { name: "Terminal Interface", role: "Real-time chart rendering, order book, and journal", tech: "Next.js, Canvas, Tailwind CSS" },
        { name: "Math Engine", role: "Vectorized indicators and backtest execution simulator", tech: "TypeScript Numerical Algorithms" },
        { name: "Journal Database", role: "Trade records, performance logs, and strategy notes", tech: "PostgreSQL, Prisma ORM" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Canvas API", "Lucide Icons"] },
      { category: "Analytics & Math", items: ["TypeScript Math", "Vectorized Arrays", "Risk Metrics"] },
      { category: "Backend", items: ["Node.js", "Express", "REST APIs", "WebSockets"] },
    ],
    challenges: [
      {
        challenge: "Rendering Large Candlestick Datasets Without Frame Drops",
        solution: "Implemented viewport-based windowing to render only visible candlesticks on the canvas, keeping framerates pinned at 60 FPS.",
      },
    ],
    decisions: [
      {
        title: "Pure TypeScript Math Engine",
        reasoning: "Enables sharing identical indicator calculation code between client charts and server-side automated alert loops.",
      },
    ],
    metrics: [
      { label: "Chart Performance", value: "60 FPS Fixed" },
      { label: "Indicator Speed", value: "< 1ms Compute" },
      { label: "Math Engine", value: "Zero Lookahead Bias" },
      { label: "Data Pipeline", value: "WebSocket Stream" },
    ],
    links: {
      demo: "https://journex-khaki.vercel.app/",
      github: "https://github.com/rosrendo/trading-strategy-lab",
      readMore: "/projects/trading-tools",
    },
  },

  // 5. Orchestrator
  {
    id: "cloud-orchestrator",
    slug: "cloud-orchestrator",
    title: "Orchestrator",
    category: "AI Agent Workspace & DevOps",
    tagline: "Self-hosted developer control room orchestrating autonomous coding agents, Docker clusters, and system telemetry.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#8b5cf6",
    image: "/images/techstack.jpg",
    shortDescription:
      "A self-hosted development workspace and control room for managing AI coding agents, background microservices, Docker containers, and live GPU/CPU metrics.",
    overview:
      "Orchestrator is a mission control dashboard for autonomous software engineering. Built to coordinate AI coding agents, monitor hardware loads (NVIDIA RTX GPUs, CPU cores, RAM), manage Docker container clusters, and maintain an executive daily founder briefing.",
    problem:
      "Developers running multiple AI agents, local LLMs, and microservices struggle with fragmented terminals, unmonitored GPU thermals, and disconnected documentation tools.",
    solution:
      "A unified, glassmorphism command center that unifies terminal multiplexing, skill hub registries, container monitoring, and executive summaries in one cohesive web portal.",
    keyFeatures: [
      "Agent Mission Control: Manage and dispatch autonomous AI agent tasks across local workspaces.",
      "Live Hardware Telemetry: Real-time gauges for GPU load/thermals, CPU usage, RAM allocations, and disk capacities.",
      "Docker & Microservice Cockpit: One-click service management for Next.js, Node APIs, Prisma Studio, and n8n pipelines.",
      "Daily Executive Briefing: Automated synthesis of pipeline progress, bottleneck radar, and experience ledger.",
      "Integrated Tooling Hub: Quick links and status indicators for Docker, Prisma, Postman, Git, and Obsidian vaults.",
    ],
    architecture: {
      overview: "Next.js frontend coupled with local system telemetry daemons and WebSocket streaming for sub-second system state updates.",
      diagramSteps: [
        "Local agent daemon inspects Docker socket and hardware performance counters.",
        "System telemetry streams to web portal via high-speed WebSocket link.",
        "UI displays interactive service toggles, GPU gauges, and terminal sessions.",
      ],
      components: [
        { name: "Command Portal", role: "Unified mission control dashboard and terminal viewer", tech: "Next.js, TypeScript, Tailwind CSS" },
        { name: "Hardware Daemon", role: "System metrics collection (GPU, CPU, Memory, Disk)", tech: "Node.js, SystemInformation, WebSockets" },
        { name: "Service Controller", role: "Docker container and PM2 process management", tech: "Docker Engine API, Bash" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { category: "Infrastructure", items: ["Docker", "Docker Compose", "Nginx", "Linux Ubuntu"] },
      { category: "Telemetry", items: ["WebSockets", "SystemInformation API", "Hardware Monitoring"] },
    ],
    challenges: [
      {
        challenge: "Real-Time Telemetry Without Overhead",
        solution: "Throttled WebSocket polling to 15s intervals for high-level metrics and 1s delta streams for active terminal sessions.",
      },
    ],
    decisions: [
      {
        title: "Self-Hosted Control Plane",
        reasoning: "Guarantees zero external dependency, total data privacy for agent prompts, and instant control over local hardware.",
      },
    ],
    metrics: [
      { label: "Telemetry Rate", value: "Sub-Second Push" },
      { label: "Service Toggles", value: "Zero-Downtime" },
      { label: "Hardware Support", value: "Dual GPU Telemetry" },
      { label: "System Overhead", value: "< 1% CPU" },
    ],
    links: {
      demo: "https://orchestrator-sage-delta.vercel.app/",
      github: "https://github.com/rosrendo/orchestrator",
      readMore: "/projects/cloud-orchestrator",
    },
  },

  // 6. RendoOs
  {
    id: "rendoos",
    slug: "rendoos",
    title: "RendoOs",
    category: "Personal Operating System",
    tagline: "A calm personal command center and workspace for managing software repositories, daily reviews, and ideas.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#ec4899",
    image: "/images/journey.jpg",
    shortDescription:
      "A calm personal operating system combining Notion-level clarity and Linear-style precision for managing software projects, ideas, daily reviews, and system settings.",
    overview:
      "RendoOs was created as an antidote to bloated productivity software. Built around a 'Clean Room' philosophy, it provides a distraction-free command center with global quick capture (Cmd+K), repository navigation, structured daily reviews, and an idea incubator.",
    problem:
      "Traditional productivity apps are either too slow, cluttered with enterprise bloat, or lack native workflows tailored to full-stack software engineers.",
    solution:
      "A fast, keyboard-first web operating system combining repository management, structured daily reviews, quick idea capture, and seamless dark/light modes in a unified interface.",
    keyFeatures: [
      "Quick Capture Engine: Global Cmd+K modal for rapid idea logging and task delegation.",
      "Repository Navigator: Instant jump and status tracking across active Git projects.",
      "Structured Daily Reviews: Morning and evening retrospectives with automated accomplishment logs.",
      "Idea Incubator: Markdown-driven idea drafting with automatic tagging and archive sorting.",
      "Clean Room Aesthetics: Elegant monochrome typography with high-contrast active states.",
    ],
    architecture: {
      overview: "Built with Next.js App Router for instant transitions, backed by local-first storage and fast server state synchronization.",
      diagramSteps: [
        "User triggers quick capture modal via keyboard shortcut.",
        "Note saved instantaneously to local optimistic state with background DB sync.",
        "Review summaries compiled into structured markdown dossiers.",
      ],
      components: [
        { name: "Clean Room UI", role: "Responsive desktop sidebar, dashboard, and modal dialogs", tech: "Next.js, TypeScript, Tailwind CSS" },
        { name: "Persistence Layer", role: "Local storage cache with PostgreSQL database sync", tech: "Prisma ORM, PostgreSQL" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons"] },
      { category: "Data & Storage", items: ["PostgreSQL", "Prisma ORM", "Local-First Storage"] },
      { category: "Styling", items: ["Tailwind CSS", "Dark/Light Theming", "Geist Typography"] },
    ],
    challenges: [
      {
        challenge: "Instantaneous Typing & Navigation",
        solution: "Implemented optimistic UI updates with zero-latency local caching, syncing with the database asynchronously.",
      },
    ],
    decisions: [
      {
        title: "Keyboard-First Ergonomics",
        reasoning: "Every primary action (Capture, Scan, Jump, Theme) is mapped to standard keyboard shortcuts for maximum engineer velocity.",
      },
    ],
    metrics: [
      { label: "Interaction Latency", value: "0ms Optimistic" },
      { label: "Keyboard Shortcuts", value: "100% Coverage" },
      { label: "Theme Switching", value: "Instant Smooth" },
      { label: "Bundle Size", value: "< 70KB Gzip" },
    ],
    links: {
      demo: "https://rendoos.vercel.app/",
      github: "https://github.com/rosrendo/rendoos",
      readMore: "/projects/rendoos",
    },
  },

  // 7. StackGen
  {
    id: "stackgen",
    slug: "stackgen",
    title: "StackGen",
    category: "AI Software Architect SaaS",
    tagline: "AI-powered Software Architect and MVP Generator that turns product prompts into tech stacks, schemas, and master checklists.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#f59e0b",
    image: "/images/stackgen.jpg",
    shortDescription:
      "Your personal AI CTO: StackGen analyzes software product ideas, recommends optimal tech stacks, generates normalized database schemas, and creates production checklists.",
    overview:
      "StackGen eliminates architectural decision paralysis for founders and engineers. By inputting a natural language app description, StackGen's AI architecture engine suggests tailored client/server/database stacks, produces interactive master checklists, and scans GitHub repositories for production readiness.",
    problem:
      "Founders and indie hackers waste weeks second-guessing their tech choices, structuring sub-optimal database schemas, and skipping critical security best practices.",
    solution:
      "An automated AI CTO that outputs a complete blueprint in seconds: frontend, backend, database schema, entity relationships, security rules, and a step-by-step master checklist.",
    keyFeatures: [
      "AI Architecture Generation: Instant tailored recommendations across Next.js, NestJS, PostgreSQL, Prisma, Docker, and Supabase.",
      "Interactive Master Checklist: Step-by-step tracking from wireframing to CI/CD pipelines.",
      "Visual Database Schema Designer: Generates normalized entity schemas with primary keys, foreign relations, and UUID data types.",
      "GitHub Production Scanner: Connect public repositories for instant compliance, security, and readiness scoring.",
      "Tiered Plan Scoping: Tailored architectural depth for MVP, Startup, and Enterprise workloads.",
    ],
    architecture: {
      overview: "Next.js App Router frontend with real-time prompt streaming, connected to an LLM reasoning pipeline and schema validator.",
      diagramSteps: [
        "User describes application idea and target scale (MVP / Startup / Enterprise).",
        "AI reasoning engine generates architectural blueprint and entity relationships.",
        "Schema generator validates relational constraints and outputs visual entity cards.",
      ],
      components: [
        { name: "SaaS Dashboard", role: "Interactive blueprint viewer, checklist tracker, and schema graph", tech: "Next.js, TypeScript, Tailwind CSS" },
        { name: "Architect Engine", role: "LLM prompt compilation and structured schema extraction", tech: "Node.js, OpenAI / Anthropic APIs" },
        { name: "Repository Scanner", role: "GitHub dependency tree and security rule auditor", tech: "Octokit API, AST Parser" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "Next.js 16", "TypeScript", "Tailwind CSS", "Framer Motion"] },
      { category: "AI & Generation", items: ["LLM Reasoning Pipelines", "Zod Structured Output", "AST Analysis"] },
      { category: "Database & APIs", items: ["PostgreSQL", "Prisma ORM", "GitHub REST API"] },
    ],
    challenges: [
      {
        challenge: "Generating Valid Relational Schemas Consistently",
        solution: "Constrained LLM outputs with strict Zod schema schemas and validation loops, ensuring every entity has valid types and foreign keys.",
      },
    ],
    decisions: [
      {
        title: "Pragmatic Modern Stack Defaults",
        reasoning: "Prioritizes Next.js, NestJS, and PostgreSQL as battle-tested defaults rather than experimental libraries.",
      },
    ],
    metrics: [
      { label: "Blueprint Generation", value: "< 4s Stream" },
      { label: "Schema Validation", value: "100% Strict Zod" },
      { label: "Repo Audit Score", value: "Production-Grade" },
      { label: "Tier Scalability", value: "MVP to Enterprise" },
    ],
    links: {
      demo: "https://stackgen-gamma.vercel.app/",
      github: "https://github.com/rosrendo/stackgen",
      readMore: "/projects/stackgen",
    },
  },

  // 8. Atelier Ecommerce
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "Atelier Ecommerce",
    category: "Luxury Minimalist E-Commerce",
    tagline: "Direct-to-consumer digital atelier creating elemental acoustic monitors, mechanical chronometers, and architectural luminaires.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#94a3b8",
    image: "/images/ecommerce.jpg",
    shortDescription:
      "A high-end luxury e-commerce experience forged from architectural typography, interactive product hotspots, 4K video cinema dossiers, and friction-free shopping cart drawers.",
    overview:
      "Atelier represents the pinnacle of digital craftsmanship in modern e-commerce. Celebrating precision hardware—planar magnetic headphones, automatic ceramic watches, and cast concrete speakers—the site combines museum-grade editorial photography with high-speed web commerce.",
    problem:
      "Most e-commerce websites feel generic, clunky, and visually cluttered with aggressive discount popups that destroy brand prestige.",
    solution:
      "A clinical, black-and-white editorial aesthetic with interactive product metallurgical hotspots, full-motion 35mm film reels, instant bag drawers, and micro-calibrated transitions.",
    keyFeatures: [
      "Interactive Product Hotspots: Clickable callouts detailing driver metallurgy, CNC billet milling, and lambskin materials.",
      "35mm Cinema Dossier: Embedded 4K loop reels with freeze-frame and audio sound drone toggles.",
      "Slide-Out Cart & Quick-Add: Frictionless shopping bag drawer with instantaneous subtotal calculations.",
      "Lookbook Editorial Archive: Full-bleed typography and masonry layouts showcasing curated design series.",
      "High-Performance Image Delivery: Responsive next/image srcset pipelines delivering sub-second visual clarity.",
    ],
    architecture: {
      overview: "Built using Next.js App Router for instant page transitions and server-rendered product catalogs, styled with pure minimalist CSS.",
      diagramSteps: [
        "Product data loaded via statically generated pages with sub-second TTFB.",
        "Interactive markers and media controls run on lightweight client components.",
        "Shopping cart state managed via persistent client-side store.",
      ],
      components: [
        { name: "Storefront UI", role: "High-fashion catalog, interactive inspection markers, and video reels", tech: "Next.js, React, Tailwind CSS" },
        { name: "Cart Engine", role: "Local cart state management, discount evaluation, and checkout bridge", tech: "TypeScript, Zustand / Context" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons"] },
      { category: "Media & Visuals", items: ["Next/Image", "HTML5 Video Stream", "High-Resolution Typography"] },
      { category: "State Management", items: ["Client Cart Store", "Persistent Local Storage"] },
    ],
    challenges: [
      {
        challenge: "Sub-Second Image Loading for High-Res Photography",
        solution: "Configured modern WebP/AVIF responsive image compression with priority loading on viewport hero elements.",
      },
    ],
    decisions: [
      {
        title: "Monochrome Editorial Design System",
        reasoning: "Strict black, white, and neutral grays allow the physical textures of machined titanium and aluminum to stand out.",
      },
    ],
    metrics: [
      { label: "Page Load Speed", value: "< 350ms TTFB" },
      { label: "Image Optimization", value: "Next-Gen AVIF" },
      { label: "Cart Latency", value: "0ms Instant" },
      { label: "Design Language", value: "Swiss Minimalist" },
    ],
    links: {
      demo: "https://ecommerce-red-one-29.vercel.app/",
      github: "https://github.com/rosrendo/atelier-ecommerce",
      readMore: "/projects/ecommerce",
    },
  },

  // 9. JAVIS AI
  {
    id: "javis",
    slug: "javis",
    title: "JAVIS AI",
    category: "Autonomous Voice & Neural HUD",
    tagline: "Cybernetic AI voice interface with real-time audio FFT visualizer, WebSocket bridge, and contextual memory.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#00f0ff",
    image: "/images/javis.jpg",
    shortDescription:
      "An Iron Man inspired cybernetic AI voice operating system with real-time audio FFT frequency equalizers, neural speech synthesis, and WebSocket telemetry.",
    overview:
      "JAVIS is a sci-fi inspired conversational AI voice console. Featuring a glowing neural core with multi-ring cybernetic HUD displays, live Web Audio API microphone frequency analysis, and WebSocket command execution, it delivers a real-world Tony Stark assistant experience directly in the browser.",
    problem:
      "Most voice assistants operate as plain text boxes with robotic audio, lacking tactile audio feedback, futuristic visual identity, and real-time system state monitoring.",
    solution:
      "A sci-fi cybernetic HUD powered by Web Audio API FFT analysis, dynamic spring-physics animations, live hardware telemetry gauges, and bidirectional WebSocket communication.",
    keyFeatures: [
      "Holographic Neural Core: Glowing cyan-blue energy orb that pulses and scales dynamically with speech amplitude.",
      "Live Audio FFT Equalizer: Real-time frequency spectrum visualizer analyzing user microphone input.",
      "System Telemetry Gauges: Monitors CPU utilization, memory allocations, and battery runtime in real time.",
      "Conversational Memory Stream: Displays transcript history and memory logs with smooth spring animations.",
      "Global Hotkey Activation: Hands-free trigger using Ctrl+Space or voice command 'Hey Jarvis'.",
    ],
    architecture: {
      overview: "Client-side Web Audio API audio stream analysis connected to a high-speed Python/Node.js WebSocket assistant server.",
      diagramSteps: [
        "Microphone input captured via Web Audio API AudioContext and AnalyserNode.",
        "FFT frequency data drives procedural SVG waveforms and core amplitude springs.",
        "Audio and text commands sent over WebSocket connection to local LLM / TTS engine.",
        "Response speech audio synthesizes while visualizer animates in sync.",
      ],
      components: [
        { name: "Cybernetic HUD", role: "Orb visualizer, telemetry cards, and audio waveforms", tech: "React, Framer Motion, Web Audio API" },
        { name: "Audio Engine", role: "FFT frequency analysis and microphone stream lifecycle", tech: "Web Audio API, AnalyserNode" },
        { name: "Voice Bridge", role: "WebSocket connection handling voice events and memory logs", tech: "WebSockets, Python / Node.js" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Framer Motion", "Tailwind CSS", "Web Audio API"] },
      { category: "Audio & Visuals", items: ["AnalyserNode", "FFT Frequency Math", "Canvas / SVG HUD"] },
      { category: "Networking", items: ["WebSockets", "Real-Time IPC", "REST API"] },
    ],
    challenges: [
      {
        challenge: "Sub-16ms Audio Visualizer Frame Rates",
        solution: "Calculated FFT frequency averages inside a requestAnimationFrame loop with smooth damping factors, maintaining a constant 60 FPS.",
      },
    ],
    decisions: [
      {
        title: "Hardware-Accelerated Glow & Spring Physics",
        reasoning: "Used Framer Motion spring physics with CSS drop-shadow filters to give the neural orb organic, living responsiveness.",
      },
    ],
    metrics: [
      { label: "Audio Sampling", value: "60 FPS Web Audio" },
      { label: "WebSocket Ping", value: "< 15ms Local" },
      { label: "Animation Engine", value: "Framer Motion Springs" },
      { label: "Visual Fidelity", value: "Sci-Fi HUD 8K" },
    ],
    links: {
      demo: "https://javis-sand.vercel.app/",
      github: "https://github.com/rosrendo/javis-ai",
      readMore: "/projects/javis",
    },
  },

  // 10. Real Estate OS
  {
    id: "realestate",
    slug: "realestate",
    title: "Real Estate OS",
    category: "3D Map-First Property ERP",
    tagline: "Premium 3D map-first operating system for real estate managers tracking rentals, tenant statuses, and maintenance schedules.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#10b981",
    image: "/images/realestate.jpg",
    shortDescription:
      "A premium 3D map-first command center for real estate portfolio managers, featuring geospatial rental tracking, tenant status monitors, and financial analytics.",
    overview:
      "Real Estate OS redefines property management software through an interactive 3D map-first command center. Instead of dull spreadsheets, managers navigate an isometric digital twin city, inspecting occupancy rates, rental yields, overdue tenant payments, and scheduled maintenance in one visual dashboard.",
    problem:
      "Traditional property management tools are spreadsheet-heavy, siloed by property address, and fail to provide visual geographic context for portfolio performance.",
    solution:
      "An interactive 3D map-first operating system displaying glowing property building markers, live tenant status sidebars, automated yield metrics, and maintenance alert feeds.",
    keyFeatures: [
      "Interactive 3D Map: Isometric digital twin city with glowing building markers indicating commercial and residential statuses.",
      "Tenant Status Monitor: Live breakdown of occupied units, vacant leases, paid rents, and overdue notices.",
      "Portfolio Yield Telemetry: Computes gross yield (6.8%), net yield (5.2%), occupancy rate (96.5%), and rental revenue ($1.2M).",
      "Maintenance Scheduling Cards: Priority alert board for HVAC inspections, plumbing issues, and roof checks with technician dispatch.",
      "AI Property Assistant: Integrated query engine for instant portfolio insights and tenant histories.",
    ],
    architecture: {
      overview: "Built using modern React with interactive geospatial map layers and reactive state management.",
      diagramSteps: [
        "Property location and building telemetry plotted onto interactive map canvas.",
        "User clicks property marker to pull tenant leases and yield analytics.",
        "Maintenance dispatch requests update database in real time with alert badges.",
      ],
      components: [
        { name: "Map Command Center", role: "3D building canvas, marker overlays, and telemetry HUD", tech: "React, Tailwind CSS, Canvas / Mapbox" },
        { name: "Portfolio Engine", role: "Yield calculations, rent collection tracking, and lease lifecycles", tech: "Node.js, Express, TypeScript" },
        { name: "Property Database", role: "Relational building entities, tenant records, and maintenance logs", tech: "PostgreSQL, Prisma ORM" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Google Fonts Outfit/Inter", "Lucide Icons"] },
      { category: "Geospatial & 3D", items: ["Interactive Map Layers", "Isometric Canvas", "Building Telemetry"] },
      { category: "Backend & Data", items: ["PostgreSQL", "Prisma ORM", "RESTful APIs"] },
    ],
    challenges: [
      {
        challenge: "Intuitive Geospatial Navigation with High Density",
        solution: "Created categorized building markers with visual glow states (commercial green, office amber, vacant red) that stay clear even at high zoom levels.",
      },
    ],
    decisions: [
      {
        title: "Map-First Interface over Tabular Lists",
        reasoning: "Property managers naturally think spatially. Seeing buildings on a map immediately reveals geographic clusters of maintenance or vacancies.",
      },
    ],
    metrics: [
      { label: "Portfolio Yield", value: "6.8% Gross" },
      { label: "Occupancy Tracking", value: "96.5% Monitored" },
      { label: "Map Interactivity", value: "60 FPS Isometric" },
      { label: "Revenue Scope", value: "$1.2M Under Mgmt" },
    ],
    links: {
      demo: "https://real-estate-five-indol-78.vercel.app/",
      github: "https://github.com/rosrendo/real-estate-os",
      readMore: "/projects/realestate",
    },
  },

  // 11. CVGen
  {
    id: "cvgen",
    slug: "cvgen",
    title: "CVGen",
    category: "AI CV & Resume Builder SaaS",
    tagline: "Publishing-grade CV generator SaaS with live A4 vector PDF export, recruiter-tested layouts, and AI phrasing assistant.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#2563eb",
    image: "/images/cvgen.jpg",
    shortDescription:
      "An AI-powered CV and resume builder SaaS designed for publishing-grade precision, featuring 24+ layout presets, vector A4 PDF export, Khmer Unicode support, and local-first draft persistence.",
    overview:
      "CVGen eliminates bloated, unformatted resume templates and broken margins. Built for job seekers in Cambodia and globally, it delivers live instant A4 document previews, AI-assisted active phrasing recommendations, 24+ curated typography presets (Modern, Technical, Executive, Graduate, Minimal), and crisp selectable vector PDF exports that pass ATS parsers flawlessly.",
    problem:
      "Most CV builders lock users behind unexpected paywalls after hours of manual data entry, output rasterized images that fail ATS parsers, or break layout margins when exporting to PDF.",
    solution:
      "A publishing-grade web application with live vector A4 preview, zero-friction local-first draft storage, ATS-verified typography, and instant client-side vector PDF generation calibrated to exact 210 × 297 mm dimensions.",
    keyFeatures: [
      "True Vector A4 PDF Pipeline: Client-side print-engine calibrated to exact 210 × 297 mm dimensions with crisp, selectable, ATS-searchable text.",
      "24+ Curated Template Presets: Tailored typography and hierarchy layouts for Tech Engineers, Executives, Modern Startups, and Fresh Graduates.",
      "Grounded Phrasing Assistant: Converts passive duty descriptions into active, quantified statements prompting for real metrics rather than AI hallucinations.",
      "Bilingual Khmer & English Support: Full Khmer Unicode rendering alongside Google Fonts Inter for localized Southeast Asian job markets.",
      "Local-First Draft Privacy: Zero forced login walls; complete drafts auto-save to browser storage with JSON import/export capability.",
    ],
    architecture: {
      overview:
        "Next.js 16 App Router client coupled with specialized CSS Paged Media print engines. Document drafts are maintained in a reactive local-first store with instant live preview rendering.",
      diagramSteps: [
        "User enters career milestones, education, and technical skills into the structured editor.",
        "Reactive typesetting engine re-computes line wrapping, page heights, and A4 break boundaries in real time.",
        "Phrasing assistant evaluates bullet points against ATS action-verb dictionaries.",
        "Client invokes vector print pipeline to output an exact 1:1 searchable A4 PDF.",
      ],
      components: [
        { name: "Document Editor", role: "Structured section forms, tag pickers, and live state store", tech: "Next.js, TypeScript, Tailwind CSS" },
        { name: "A4 Typesetting Engine", role: "Vector print stylesheets, page break avoidance, and font metrics", tech: "CSS Paged Media, Khmer Unicode" },
        { name: "AI Phrasing Assistant", role: "Quantified bullet point recommendations and ATS scoring", tech: "TypeScript NLP rules, Zod schemas" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "Next.js 16", "TypeScript", "Tailwind CSS", "Lucide Icons"] },
      { category: "Document Engine", items: ["Vector Print CSS", "A4 Typesetting", "Khmer Unicode", "Google Fonts Inter"] },
      { category: "Persistence & State", items: ["Local-First Storage", "JSON Serialization", "Zod Validation"] },
      { category: "AI & Copy", items: ["Action-Verb NLP Engine", "ATS Keyword Optimization"] },
    ],
    challenges: [
      {
        challenge: "Maintaining Sub-Millimeter Vector A4 Margins Across Browsers",
        solution:
          "Calibrated CSS paged media rules with strict millimeter coordinate units and break-inside: avoid directives, preventing awkward line splits across page boundaries.",
      },
      {
        challenge: "Khmer Unicode Line Breaking in PDF Print",
        solution:
          "Integrated localized zero-width space boundary injectors and Kantumruy Pro font fallbacks for flawless Khmer script rendering.",
      },
    ],
    decisions: [
      {
        title: "Client-Side Vector Print over Server-Side Puppeteer",
        reasoning:
          "Server-side headless browsers introduce cold-start latency and heavy server costs. Client-side vector print guarantees 0ms latency, zero server compute bills, and total document privacy.",
      },
    ],
    metrics: [
      { label: "PDF Quality", value: "100% Vector A4" },
      { label: "ATS Pass Rate", value: "Verified Searchable" },
      { label: "Export Latency", value: "< 250ms Instant" },
      { label: "Templates", value: "24+ Layouts" },
    ],
    links: {
      demo: "https://cv-gen-one.vercel.app/",
      github: "https://github.com/rosrendo/cvgen-saas",
      readMore: "/projects/cvgen",
    },
  },

  // 12. TokMenu
  {
    id: "tokmenu",
    slug: "tokmenu",
    title: "TokMenu",
    category: "Hospitality & QR Table Ordering",
    tagline: "Contactless QR menu and instant table ordering platform built for Cambodian restaurants and cafes.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#f97316",
    image: "/images/tokmenu.jpg",
    shortDescription:
      "A contactless QR table menu and ordering platform built for restaurants, cafes, and hospitality venues across Cambodia with instant table ordering and Bakong KHQR checkout.",
    overview:
      "TokMenu ('តុ' Menu — Table Menu in Khmer) revolutionizes restaurant operations. Guests simply scan a tabletop QR code to browse high-definition photo menus, customize dishes, and submit orders directly to the kitchen without waiting for waitstaff or installing an app. Includes real-time order tracking and native Bakong KHQR digital payments.",
    problem:
      "Restaurant diners face slow table service during peak hours, outdated printed menus, and friction when splitting or paying bills. Restaurant owners struggle with rising staff costs, order miscommunications, and paper reprinting expenses.",
    solution:
      "A lightweight, instant-load progressive web application allowing customers to scan, browse in Khmer or English, add items to a shared table cart, and checkout seamlessly via Cambodia's national Bakong KHQR standard.",
    keyFeatures: [
      "Contactless QR Table Ordering: Customers scan a unique table QR code to start an interactive session without installing any mobile application.",
      "Bilingual Khmer & English Menu: Seamless language toggling with Kantumruy Pro and Noto Sans Khmer fonts for localized dining.",
      "Real-Time Kitchen Dispatch: Orders route instantly to kitchen display systems (KDS) categorized by preparation station.",
      "Bakong KHQR Payment Integration: Native support for Cambodia's national QR payment standard with instant transaction receipt generation.",
      "Live Table Cart & Session Management: Dynamic subtotal calculations, service charge modifiers, and multi-guest order consolidation.",
    ],
    architecture: {
      overview:
        "Engineered with a high-speed mobile-first frontend optimized for unstable cellular connections, paired with a real-time table state coordinator and POS bridge.",
      diagramSteps: [
        "Guest scans table QR deep-link encoding restaurant ID and table number.",
        "App loads cached menu assets with instant sub-second render.",
        "Guest selects items with dish modifiers (spiciness, extra noodles, drinks) and submits order.",
        "Kitchen display receives immediate ticket while Bakong KHQR prompt generates on guest screen.",
      ],
      components: [
        { name: "Table Ordering PWA", role: "Instant guest catalog, item modifiers, and table cart", tech: "React, TypeScript, Tailwind CSS" },
        { name: "Table Session Engine", role: "Table state lifecycle, bill splitting, and order aggregation", tech: "Node.js, Express, WebSockets" },
        { name: "KHQR Payment Gateway", role: "Dynamic Bakong KHQR deep-links and payment callbacks", tech: "Bakong KHQR SDK, HMAC Validation" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "TypeScript", "Tailwind CSS", "Kantumruy Pro", "Noto Sans Khmer"] },
      { category: "Real-Time & Ordering", items: ["WebSockets", "Session Storage", "Table Deep-Linking"] },
      { category: "Payments", items: ["Bakong KHQR", "ABA PayWay Ready", "Cash on Table"] },
      { category: "Analytics & Performance", items: ["PostHog Analytics", "Edge CDN Caching"] },
    ],
    challenges: [
      {
        challenge: "Sub-Second Menu Loading on Mobile Cellular Networks",
        solution:
          "Applied responsive WebP image pipelines with aggressive edge cache headers, ensuring guest menus open in under 400ms even on 3G cellular connections.",
      },
      {
        challenge: "Synchronizing Multi-Guest Table Orders",
        solution:
          "Built optimistic local cart synchronization that merges simultaneous item additions from multiple phones at the same table without race conditions.",
      },
    ],
    decisions: [
      {
        title: "Zero App Download Requirement",
        reasoning:
          "Requiring diners to install an app from the App Store causes a 65%+ drop-off. A browser-based PWA via instant QR scan maximizes adoption to 100%.",
      },
    ],
    metrics: [
      { label: "Load Time", value: "< 400ms 3G" },
      { label: "Order Velocity", value: "3x Faster Service" },
      { label: "App Download", value: "0MB Friction-Free" },
      { label: "Payment Standard", value: "Bakong KHQR" },
    ],
    links: {
      demo: "https://tokmenu.vercel.app/",
      github: "https://github.com/rosrendo/tokmenu",
      readMore: "/projects/tokmenu",
    },
  },

  // 13. StayPilot
  {
    id: "staypilot",
    slug: "staypilot",
    title: "StayPilot",
    category: "Hotel PMS & Direct Booking SaaS",
    tagline: "Hotel booking engine and operations SaaS empowering boutique properties in Cambodia with zero OTA commissions.",
    status: "Production-Ready",
    deploymentStatus: "Live Demo",
    accentColor: "#15803d",
    image: "/images/staypilot.jpg",
    shortDescription:
      "A comprehensive hotel management and direct booking SaaS built for independent hotels, eco-resorts, and guesthouses in Cambodia, featuring zero OTA commissions and atomic double-booking prevention.",
    overview:
      "StayPilot delivers enterprise-grade property management to independent boutique hotels and eco-resorts across Siem Reap, Phnom Penh, Kampot, and the Islands. Providing a shareable direct booking engine, atomic row-level reservation locks, visual calendar tape-charts, and native Bakong KHQR payment processing, StayPilot empowers hoteliers to keep 100% of their room revenue.",
    problem:
      "Independent boutique hotels in Southeast Asia lose 15–25% of their room revenue to online travel agencies (OTAs) and waste hours manually managing bookings across Telegram chats, paper logbooks, and spreadsheets, causing catastrophic double-bookings.",
    solution:
      "A high-performance hotel SaaS featuring a direct guest booking portal, front-desk visual tape-chart, automatic room status updates, housekeeping boards, and localized payment channels.",
    keyFeatures: [
      "Zero OTA Commission Direct Booking: Dedicated branded direct booking URL with real-time room availability, photography, and voucher generation.",
      "Double-Booking Shield: Atomic database row-level locking ensures walk-ins, phone reservations, and web bookings never collide.",
      "Visual Calendar Tape-Chart: High-density interactive matrix displaying room statuses (Booked, Available, Maintenance, Hold) across multi-week horizons.",
      "Local Payment Rails: Built-in support for Pay-at-Property, Bakong KHQR mobile scanning with receipt verification, and ABA PayWay integration.",
      "Bilingual Front-Desk & Guest UI: Full Khmer and English localization designed specifically for local staff ergonomics and international travelers.",
    ],
    architecture: {
      overview:
        "Next.js App Router front-end with server-rendered hotel booking portals, backed by a transactional PostgreSQL database with row-level locks on room-night intervals.",
      diagramSteps: [
        "Traveler visits direct property booking link (e.g. staypilot.com/hotel/angkor-pavilion).",
        "System checks room-night availability using indexed date range overlap queries.",
        "Guest completes booking via Bakong KHQR or pay-at-property.",
        "Front-desk tape-chart updates in real time with arrival badge and housekeeping task.",
      ],
      components: [
        { name: "Direct Booking Portal", role: "Branded guest booking engine, room showcases, and vouchers", tech: "Next.js, React, Tailwind CSS" },
        { name: "Hotel Operations Dashboard", role: "Visual tape-chart, reservation ledger, and housekeeping board", tech: "Next.js, TypeScript, Lucide Icons" },
        { name: "Reservation Core", role: "Atomic room-night availability locks and rate calculation", tech: "PostgreSQL, Prisma ORM, Transaction Locks" },
      ],
    },
    techStack: [
      { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons"] },
      { category: "Hospitality Core", items: ["Visual Tape-Chart Matrix", "Room-Night Interval Math", "Housekeeping Board"] },
      { category: "Database & Integrity", items: ["PostgreSQL", "Prisma ORM", "Row-Level Pessimistic Locks"] },
      { category: "Payments & Localization", items: ["Bakong KHQR", "ABA PayWay Ready", "Dual Currency KHR / USD"] },
    ],
    challenges: [
      {
        challenge: "Preventing Simultaneous Room-Night Double Bookings",
        solution:
          "Implemented PostgreSQL exclusion constraints and transactional row-level locks on overlapping (room_id, date_range) intervals during checkout.",
      },
      {
        challenge: "High-Density Visual Tape-Chart Performance",
        solution:
          "Rendered multi-week room tape-charts with CSS subgrid and windowed date virtualization, keeping horizontal pan interactions at 60 FPS.",
      },
    ],
    decisions: [
      {
        title: "Flat Monthly Subscription over Commission Per Booking",
        reasoning:
          "Charging 0% commission directly aligns with independent boutique owners who are tired of losing 15-25% to Booking.com and Agoda.",
      },
    ],
    metrics: [
      { label: "Commission Fee", value: "0% Flat SaaS" },
      { label: "Double Bookings", value: "Zero Conflicts" },
      { label: "Payment Support", value: "Bakong KHQR + Cash" },
      { label: "Tape-Chart Speed", value: "60 FPS Virtualized" },
    ],
    links: {
      demo: "https://stay-pilot-sigma.vercel.app/",
      github: "https://github.com/rosrendo/staypilot",
      readMore: "/projects/staypilot",
    },
  },
];
