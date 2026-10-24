export interface SkillItem {
  name: string;
  level: "Proficient" | "Advanced" | "Core Stack";
  description: string;
  appliedIn: string[]; // project slugs or highlights
  category: "frontend" | "backend" | "database" | "infrastructure";
}

export interface SkillGroup {
  id: "frontend" | "backend" | "database" | "infrastructure";
  title: string;
  subtitle: string;
  accent: string;
  skills: SkillItem[];
}

export const skillGroups: SkillGroup[] = [
  {
    id: "backend",
    title: "Backend Engineering & APIs",
    subtitle: "Architecting resilient, performant server systems and API contracts",
    accent: "from-indigo-500/20 to-blue-500/10",
    skills: [
      {
        name: "Node.js & Express.js",
        level: "Core Stack",
        description: "Building production RESTful services, middleware pipelines, error handlers, and rate limiters.",
        appliedIn: ["ServiceFinder", "SafeDeal", "Trading Tools"],
        category: "backend",
      },
      {
        name: "NestJS",
        level: "Proficient",
        description: "Enterprise modular design, dependency injection containers, DTO validation pipes, and route guards.",
        appliedIn: ["ServiceFinder Architecture", "Microservices Experiments"],
        category: "backend",
      },
      {
        name: "REST APIs & Protocols",
        level: "Core Stack",
        description: "Stateless REST endpoints, consistent HTTP response schemas, status codes, and API contract design.",
        appliedIn: ["ServiceFinder", "SafeDeal", "Trading Tools"],
        category: "backend",
      },
      {
        name: "Auth & Security",
        level: "Advanced",
        description: "JWT stateless tokens, secure HTTP-only cookies, password hashing with bcrypt, RBAC access control.",
        appliedIn: ["ServiceFinder RBAC", "SafeDeal Auth"],
        category: "backend",
      },
    ],
  },
  {
    id: "database",
    title: "Database & Data Modeling",
    subtitle: "Designing relational schemas, ACID safety, and optimized queries",
    accent: "from-emerald-500/20 to-teal-500/10",
    skills: [
      {
        name: "PostgreSQL",
        level: "Core Stack",
        description: "Relational database schema design, foreign key constraints, B-Tree indexes, and transactional locking.",
        appliedIn: ["ServiceFinder", "SafeDeal Ledger"],
        category: "database",
      },
      {
        name: "Prisma ORM",
        level: "Core Stack",
        description: "Type-safe database queries, schema migrations, relation modeling, and transaction management.",
        appliedIn: ["ServiceFinder", "SafeDeal"],
        category: "database",
      },
      {
        name: "MySQL",
        level: "Proficient",
        description: "Relational storage, normalization (3NF), indexing strategies, and query optimization.",
        appliedIn: ["Academic Projects", "Legacy Backend Testing"],
        category: "database",
      },
      {
        name: "Data Modeling & Normalization",
        level: "Advanced",
        description: "Translating business domain rules into clean entity-relationship models with zero redundancy.",
        appliedIn: ["ServiceFinder Marketplace Schema", "SafeDeal Milestone Model"],
        category: "database",
      },
    ],
  },
  {
    id: "frontend",
    title: "Frontend & UI Engineering",
    subtitle: "Crafting responsive, motion-driven, accessible web applications",
    accent: "from-cyan-500/20 to-sky-500/10",
    skills: [
      {
        name: "React 19 & Next.js 16",
        level: "Core Stack",
        description: "App Router architecture, React Server Components (RSC), SSR, dynamic routing, and caching.",
        appliedIn: ["Portfolio", "ServiceFinder Client", "SafeDeal UI"],
        category: "frontend",
      },
      {
        name: "TypeScript",
        level: "Core Stack",
        description: "Strict typing across client and server boundaries, utility types, and discriminated unions.",
        appliedIn: ["All Projects"],
        category: "frontend",
      },
      {
        name: "Tailwind CSS",
        level: "Core Stack",
        description: "Custom design systems, CSS variables, dark themes, and responsive mobile-first interfaces.",
        appliedIn: ["Portfolio", "ServiceFinder", "SafeDeal", "Trading Tools"],
        category: "frontend",
      },
      {
        name: "Framer Motion",
        level: "Advanced",
        description: "Spring physics, shared-layout (`layoutId`) modal expansions, and accessible reduced-motion states.",
        appliedIn: ["Interactive Portfolio", "SafeDeal Milestone Timeline"],
        category: "frontend",
      },
    ],
  },
  {
    id: "infrastructure",
    title: "DevOps & Deployment",
    subtitle: "Containerization, Linux administration, and reliable server deployments",
    accent: "from-amber-500/20 to-orange-500/10",
    skills: [
      {
        name: "Docker & Compose",
        level: "Proficient",
        description: "Multi-stage Dockerfiles, image optimization, reproducible development environments, and compose networks.",
        appliedIn: ["ServiceFinder Deployment", "Trading Tools Container"],
        category: "infrastructure",
      },
      {
        name: "Nginx Reverse Proxy",
        level: "Proficient",
        description: "Configuring upstream servers, SSL/TLS certificate automation with Let's Encrypt, and Gzip compression.",
        appliedIn: ["Server Deployments", "API Routing"],
        category: "infrastructure",
      },
      {
        name: "Linux & VPS (Ubuntu)",
        level: "Core Stack",
        description: "SSH key management, UFW firewall configuration, environment variables, systemd services.",
        appliedIn: ["Cloud VPS Hosting", "Self-Hosted Services"],
        category: "infrastructure",
      },
      {
        name: "AWS EC2 & PM2",
        level: "Proficient",
        description: "Cloud virtual instances, PM2 daemon process monitoring, memory clustering, and automated restarts.",
        appliedIn: ["Production Node.js Deployments"],
        category: "infrastructure",
      },
    ],
  },
];
