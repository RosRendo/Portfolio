import React from "react";

interface TechIconProps {
  name: string;
  className?: string;
}

export function TechIcon({ name, className = "w-5 h-5" }: TechIconProps) {
  const norm = name.toLowerCase().replace(/[^a-z0-9]/g, "");

  // React
  if (norm.includes("react")) {
    return (
      <svg className={className} viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor">
        <circle cx="0" cy="0" r="2.05" fill="currentColor" />
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // Next.js
  if (norm.includes("next")) {
    return (
      <svg className={className} viewBox="0 0 180 180" fill="currentColor">
        <mask height="180" id="mask-next" maskUnits="userSpaceOnUse" width="180" x="0" y="0" style={{ maskType: "alpha" }}>
          <circle cx="90" cy="90" fill="black" r="90" />
        </mask>
        <g mask="url(#mask-next)">
          <circle cx="90" cy="90" fill="none" stroke="currentColor" strokeWidth="12" r="84" />
          <path d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z" fill="currentColor" />
          <rect fill="currentColor" height="72" width="12" x="115" y="54" />
        </g>
      </svg>
    );
  }

  // TypeScript
  if (norm.includes("typescript") || norm === "ts") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 0h21A1.5 1.5 0 0 1 24 1.5v21a1.5 1.5 0 0 1-1.5 1.5h-21A1.5 1.5 0 0 1 0 22.5v-21A1.5 1.5 0 0 1 1.5 0zm10.7 13.9h-3.4v7.7H6.1v-7.7H2.7v-2.3h9.5v2.3zm10.1 2.3c0 1.2-.4 2.2-1.3 2.9-.9.7-2.1 1-3.6 1-1.1 0-2.2-.2-3.1-.6-.9-.4-1.7-1-2.2-1.8l1.8-1.5c.7 1.1 1.9 1.7 3.4 1.7.7 0 1.3-.2 1.7-.5.4-.3.6-.8.6-1.3 0-.5-.2-.9-.6-1.2-.4-.3-1.1-.6-2.1-1-1.4-.5-2.4-1.1-3.1-1.8-.7-.7-1-1.6-1-2.7 0-1.2.4-2.1 1.3-2.9.9-.7 2-1.1 3.5-1.1 1 0 1.9.2 2.8.5.8.4 1.5.9 2 1.6l-1.7 1.5c-.6-.9-1.6-1.4-2.9-1.4-.7 0-1.2.2-1.6.5-.4.3-.6.7-.6 1.2 0 .4.2.8.6 1.1.4.3 1.1.6 2.1 1 1.4.5 2.5 1.1 3.2 1.8.7.7 1 1.7 1 2.9z" />
      </svg>
    );
  }

  // Tailwind CSS
  if (norm.includes("tailwind")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z" />
      </svg>
    );
  }

  // Node.js
  if (norm.includes("node")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm6.7 13.7L12 19.6l-6.7-3.9V7.9L12 4l6.7 3.9v7.8zM12 6.5l-4.5 2.6v5.2L12 17l4.5-2.6V9.1L12 6.5z" />
      </svg>
    );
  }

  // PostgreSQL
  if (norm.includes("postgres") || norm.includes("sql") || norm.includes("database")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    );
  }

  // Prisma
  if (norm.includes("prisma")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.637 1.83a.965.965 0 0 0-1.424-.038L2.09 11.236a.965.965 0 0 0 .178 1.488l8.948 5.673a.965.965 0 0 0 1.343-.377l9.263-16.19H12.637zm-.26 3.197l5.856 10.237-7.05-4.47 1.194-5.767z" />
      </svg>
    );
  }

  // Redis
  if (norm.includes("redis") || norm.includes("cache")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    );
  }

  // Docker
  if (norm.includes("docker") || norm.includes("container")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 0 0 .186-.186V3.574a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 0 0 .186-.186V6.29a.186.186 0 0 0-.186-.185h-2.118a.185.185 0 0 0-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 0 0 .184-.186V6.29a.185.185 0 0 0-.185-.185H8.1a.185.185 0 0 0-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 0 0 .185-.186V6.29a.185.185 0 0 0-.185-.185H5.136a.186.186 0 0 0-.186.185v1.887c0 .102.084.186.186.186m5.893 2.714h2.119a.186.186 0 0 0 .186-.185V9.006a.186.186 0 0 0-.186-.186h-2.119a.185.185 0 0 0-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 0 0 .184-.185V9.006a.185.185 0 0 0-.184-.186h-2.12a.185.185 0 0 0-.184.186v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H5.136a.186.186 0 0 0-.186.186v1.888c0 .102.084.185.186.185m-2.928 0h2.119a.185.185 0 0 0 .185-.185V9.006a.185.185 0 0 0-.185-.186H2.208a.186.186 0 0 0-.186.186v1.888c0 .102.084.185.186.185m21.724-.51c-.328-.523-1.04-.766-1.745-.766-.312 0-.626.048-.925.148-.445-1.055-1.424-1.815-2.585-2.022l-.462-.083-.243.398c-.687 1.127-1.134 2.453-1.328 3.844H1.026a.91.91 0 0 0-.91.908c0 2.229.626 4.398 1.812 6.275 1.703 2.696 4.484 4.498 7.632 4.945.794.113 1.6.171 2.41.171 6.804 0 11.83-4.526 12.01-11.455.006-.21-.02-.423-.075-.624" />
      </svg>
    );
  }

  // Python
  if (norm.includes("python")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.914 0C5.825 0 6.2 2.645 6.2 2.645l.007 2.738h5.798v.822H3.91s-3.91-.444-3.91 5.645c0 6.089 3.42 5.867 3.42 5.867h2.04v-2.868s-.11-3.42 3.355-3.42h5.753s3.245.05 3.245-3.15V3.15S18.32 0 11.914 0zm-2.008 1.74a1.056 1.056 0 1 1 0 2.112 1.056 1.056 0 0 1 0-2.112zM12.086 24c6.089 0 5.714-2.645 5.714-2.645l-.007-2.738h-5.798v-.822h8.095s3.91.444 3.91-5.645c0-6.089-3.42-5.867-3.42-5.867h-2.04v2.868s.11 3.42-3.355 3.42H8.83s-3.245-.05-3.245 3.15v5.148S5.68 24 12.086 24zm2.008-1.74a1.056 1.056 0 1 1 0-2.112 1.056 1.056 0 0 1 0 2.112z" />
      </svg>
    );
  }

  // Stripe
  if (norm.includes("stripe") || norm.includes("payment")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697.56 12.784.56c-6.196 0-10.42 3.235-10.42 8.65 0 7.846 10.79 6.592 10.79 9.99 0 1.054-.913 1.488-2.217 1.488-2.459 0-5.385-1.157-7.391-2.234l-.946 5.617c2.193 1.036 5.34 1.705 8.337 1.705 6.402 0 10.638-3.158 10.638-8.687 0-8.232-10.6-6.852-10.6-9.939z" />
      </svg>
    );
  }

  // Vercel
  if (norm.includes("vercel")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 22.525H0l12-21.05 12 21.05z" />
      </svg>
    );
  }

  // Framer Motion
  if (norm.includes("framer") || norm.includes("motion")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M4 0h16v8h-8zM4 8h8l8 8H4zM4 16h8v8z" />
      </svg>
    );
  }

  // GraphQL
  if (norm.includes("graphql")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7.8v11.6L12 25.2l10-5.8V7.8L12 2zm7.9 16.4l-7.9 4.6-7.9-4.6V8.9L12 4.3l7.9 4.6v9.5zM12 6.5L5.5 10.3v7.6L12 21.7l6.5-3.8v-7.6L12 6.5z" />
      </svg>
    );
  }

  // WebSockets / Real-Time
  if (norm.includes("socket") || norm.includes("realtime") || norm.includes("stream")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.93 4.93a10 10 0 0 1 14.14 0" />
        <path d="M7.76 7.76a6 6 0 0 1 8.48 0" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
        <path d="M7.76 16.24a6 6 0 0 0 8.48 0" />
        <path d="M4.93 19.07a10 10 0 0 0 14.14 0" />
      </svg>
    );
  }

  // Express / API
  if (norm.includes("express") || norm.includes("api") || norm.includes("rest")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="14" y1="4" x2="10" y2="20" />
      </svg>
    );
  }

  // AI / Neural / JAVIS
  if (norm.includes("ai") || norm.includes("neural") || norm.includes("voice") || norm.includes("openai")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="22" />
      </svg>
    );
  }

  // Mapbox / 3D Geospatial
  if (norm.includes("map") || norm.includes("geo") || norm.includes("3d") || norm.includes("canvas")) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
        <line x1="8" y1="2" x2="8" y2="18" />
        <line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    );
  }

  // Default clean code/layer chip icon
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}
