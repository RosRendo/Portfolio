export interface BuildStage {
  stage: string;
  title: string;
  description: string;
  tools: string[];
}

export interface PersonalityTrait {
  keyword: string;
  tagline: string;
  description: string;
}

export interface CurrentInterest {
  title: string;
  category: string;
  description: string;
  projectSlug: string;
  projectTitle: string;
}

export interface ProfileData {
  name: string;
  role: string;
  headline: string;
  subheadline: string;
  profileId: string;
  monogram: string;
  tagline: string;
  subtagline: string;
  focusTag: string;
  locationTag: string;
  personalPhilosophy: string;
  personalityTraits: PersonalityTrait[];
  currentInterests: CurrentInterest[];
  howIBuild: BuildStage[];
  exploring: string[];
  status: {
    available: boolean;
    text: string;
    subtext: string;
    location: string;
  };
  contact: {
    email: string;
    github: string;
    githubUser: string;
    linkedin: string;
    linkedinUser: string;
    cvUrl: string;
  };
  bio: {
    intro: string;
    story: string[];
    philosophy: string[];
    focusAreas: { title: string; description: string }[];
    interests: string[];
  };
  journey: {
    period: string;
    role: string;
    organization: string;
    badge: string;
    description: string;
    highlights: string[];
  }[];
}

export const profileData: ProfileData = {
  name: "ROS RENDO",
  role: "Full-Stack Developer | Backend Engineering",
  headline: "I build digital products from idea to deployment.",
  subheadline:
    "Software engineering student and independent product builder focused on developing full-stack web applications, backend architectures, APIs, databases, and deployable digital products.",
  profileId: "PERSONAL PROFILE / 001",
  monogram: "R.",
  tagline: "Building ideas into products",
  subtagline: "From architecture to deployment.",
  focusTag: "Full-stack · Backend · Products",
  locationTag: "Cambodia",
  personalPhilosophy:
    "I don't just want to write code. I want to ship products people use.",
  personalityTraits: [
    {
      keyword: "Pragmatic Builder",
      tagline: "Ship over speculate",
      description:
        "I prioritize building working, deployable software with real users over endlessly debating abstractions in an academic vacuum.",
    },
    {
      keyword: "Schema-First",
      tagline: "Relational integrity first",
      description:
        "Before writing API routes or UI components, I model data schemas, constraints, and state transitions in PostgreSQL to prevent silent data corruption.",
    },
    {
      keyword: "Deterministic Ops",
      tagline: "No 'works on my machine'",
      description:
        "Every service is containerized with multi-stage Dockerfiles and deployed via Linux VPS, Nginx reverse proxies, and strict firewall configurations.",
    },
    {
      keyword: "Motion & Polish",
      tagline: "Engineered with visual rigor",
      description:
        "Backend reliability doesn't excuse ugly interfaces. I care deeply about fluid spring physics, accessible layout hierarchies, and purposeful micro-interactions.",
    },
  ],
  currentInterests: [
    {
      category: "Backend Engineering",
      title: "Distributed Systems & Scalability",
      description:
        "High-throughput messaging, database indexing strategies, connection pooling, and resilient API gateways.",
      projectSlug: "cloud-orchestrator",
      projectTitle: "Cloud Orchestrator",
    },
    {
      category: "Product Architecture",
      title: "Multi-Tenant Marketplaces",
      description:
        "Pessimistic row locking, double-booking prevention, automated billing workflows, and role-based access control.",
      projectSlug: "servicefinder",
      projectTitle: "ServiceFinder",
    },
    {
      category: "Fintech & Security",
      title: "Escrow Systems & Cryptographic Ledgers",
      description:
        "State machines for protected digital transactions, dispute arbitration holding pools, and automated payout releases.",
      projectSlug: "safedeal",
      projectTitle: "EscrowDeal",
    },
    {
      category: "Creative Technology",
      title: "Spatial & Motion-Driven UIs",
      description:
        "Geospatial 3D canvas mapping, audio visualizer HUDs, and real-time neural assistant workflows.",
      projectSlug: "realestate",
      projectTitle: "Real Estate OS",
    },
  ],
  howIBuild: [
    {
      stage: "01",
      title: "Architecture",
      description:
        "Model relations and constraints in PostgreSQL before writing business logic. Map state machines and data integrity rules first.",
      tools: ["PostgreSQL", "Prisma", "Relational Schemas", "ACID Transactions"],
    },
    {
      stage: "02",
      title: "Implementation",
      description:
        "Develop type-safe RESTful APIs and clean full-stack modules. Enforce JWT/OAuth security, input validation, and structured error boundaries.",
      tools: ["TypeScript", "Node.js", "Express / NestJS", "Next.js"],
    },
    {
      stage: "03",
      title: "Deployment",
      description:
        "Package services into multi-stage Docker images. Configure Nginx reverse proxies, SSL certificates, PM2 clusters, and firewall rules on Linux VPS.",
      tools: ["Docker", "Linux VPS", "Nginx", "PM2 / Automation"],
    },
    {
      stage: "04",
      title: "Iteration",
      description:
        "Profile database queries, benchmark API endpoints, monitor real-world interactions, and refine based on feedback and measured metrics.",
      tools: ["Index Profiling", "Benchmarking", "Telemetry", "User Feedback"],
    },
  ],
  exploring: [
    "Distributed database consensus & high-throughput message brokers",
    "Quantitative algorithmic trading strategies & vectorized financial modeling",
    "Self-hosted Linux server infrastructure & zero-downtime deployment pipelines",
    "Interactive UI physics, spatial computing design & fluid spring animations",
  ],
  status: {
    available: true,
    text: "Available for Select Roles & Projects",
    subtext: "Open to full-stack & backend engineering opportunities",
    location: "Phnom Penh, Cambodia (UTC+7 / Remote)",
  },
  contact: {
    email: "rosrendo.dev@gmail.com",
    github: "https://github.com/rosrendo",
    githubUser: "rosrendo",
    linkedin: "https://linkedin.com/in/rosrendo",
    linkedinUser: "rosrendo",
    cvUrl: "/ROS_RENDO_CV.pdf",
  },
  bio: {
    intro:
      "I am a software engineering student and pragmatic digital builder. Rather than confining myself to surface-level templates or tutorials, I architect and build complete end-to-end applications from the ground up: designing relational database schemas, engineering resilient REST APIs, securing authentication flows, and crafting responsive, accessible user interfaces.",
    story: [
      "I am a software engineering student based in Phnom Penh, Cambodia, driven by the ambition to turn raw ideas into real, deployable digital products.",
      "Rather than staying within theoretical sandboxes or copy-pasting tutorials, I focus on end-to-end craftsmanship: modeling PostgreSQL schemas, coding resilient backend logic, containerizing with Docker, and building dynamic, motion-driven client interfaces.",
      "My ambition is simple: build software that solves real pain points, operates reliably under pressure, and demonstrates high engineering discipline from day one.",
    ],
    philosophy: [
      "Architecture before syntax: Spend time modeling relations and constraints in PostgreSQL before writing a single line of business logic.",
      "Pragmatic full-stack ownership: Able to bridge backend systems (Node.js, Express, NestJS) with sleek client applications (React, Next.js, Tailwind CSS).",
      "Clarity over complexity: Prefer maintainable, typed, observable code over overly clever abstractions.",
      "Deterministic deployment: Containerize with Docker, configure Nginx reverse proxies, and automate deploy pipelines with PM2 and Linux environments.",
    ],
    focusAreas: [
      {
        title: "Backend & Systems",
        description: "RESTful API development, JWT/OAuth auth flows, relational data integrity, rate limiting, and structured logging.",
      },
      {
        title: "Frontend Engineering",
        description: "Modern component architectures, fluid motion physics, accessible UX patterns, and responsive layout systems.",
      },
      {
        title: "Data & Persistence",
        description: "PostgreSQL, Prisma ORM, MySQL, database normalization, indexing strategies, and ACID transaction safety.",
      },
      {
        title: "DevOps & Infrastructure",
        description: "Docker multi-stage builds, Linux server administration, Nginx TLS termination, and PM2 process management.",
      },
    ],
    interests: [
      "Distributed systems & consensus primitives",
      "Financial markets & quantitative indicator development",
      "Clean UI interaction design & spring physics",
      "Developer productivity tooling & automation",
    ],
  },
  journey: [
    {
      period: "2024 — Present",
      role: "Independent Product Builder",
      organization: "Self-Directed Projects",
      badge: "Building & Shipping",
      description:
        "Architecting and shipping full-stack products including ServiceFinder (home services marketplace) and SafeDeal (escrow transaction workflow). Exploring quantitative trading scripts and automation pipelines.",
      highlights: [
        "Architected multi-tenant marketplace schemas with role-based access control (Customers, Providers, Admins).",
        "Engineered cryptographic transaction ledger and escrow release state machine for protected digital transactions.",
        "Built automated backtesting pipelines and technical indicator algorithms.",
      ],
    },
    {
      period: "2023 — 2024",
      role: "Backend & Full-Stack Focus",
      organization: "Technical Specialization",
      badge: "Deepening Foundations",
      description:
        "Transitioned from basic web scripts to robust architectural engineering. Mastered TypeScript, Node.js, Express, NestJS, and relational databases with PostgreSQL and Prisma.",
      highlights: [
        "Designed and implemented RESTful microservices with validation pipes and structured error handling.",
        "Containerized development and staging environments using Docker and Docker Compose.",
        "Deployed secure web servers with Nginx reverse proxy, Certbot SSL, and PM2 zero-downtime reloads.",
      ],
    },
    {
      period: "2022 — 2023",
      role: "Software Engineering Student",
      organization: "University Studies",
      badge: "Computer Science Core",
      description:
        "Rigorous study of computer science fundamentals: algorithms, object-oriented design, data structures, computer networks, and operating systems.",
      highlights: [
        "Analyzed algorithmic complexity (Big-O) and implemented fundamental data structures from scratch.",
        "Gained deep appreciation for memory safety, networking protocols (TCP/UDP, HTTP/HTTPS), and relational calculus.",
      ],
    },
  ],
};
