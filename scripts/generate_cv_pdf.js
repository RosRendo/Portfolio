const fs = require('fs');
const path = require('path');

// Simple valid standalone PDF generator without external dependencies
function generateSimplePDF() {
  const content = `%PDF-1.4
1 0 obj
<<
  /Type /Catalog
  /Pages 2 0 R
>>
endobj
2 0 obj
<<
  /Type /Pages
  /Kids [3 0 R]
  /Count 1
>>
endobj
3 0 obj
<<
  /Type /Page
  /Parent 2 0 R
  /Resources <<
    /Font <<
      /F1 4 0 R
      /F2 5 0 R
    >>
  >>
  /MediaBox [0 0 612 792]
  /Contents 6 0 R
>>
endobj
4 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica-Bold
>>
endobj
5 0 obj
<<
  /Type /Font
  /Subtype /Type1
  /BaseFont /Helvetica
>>
endobj
6 0 obj
<<
  /Length 1200
>>
stream
BT
/F1 22 Tf
50 730 Td
(ROS RENDO) Tj
/F2 12 Tf
0 -22 Td
(Full-Stack Developer | Backend Engineering & Systems Architecture) Tj
0 -16 Td
(Email: rosrendo.dev@gmail.com  |  Location: Phnom Penh, Cambodia) Tj
0 -16 Td
(GitHub: https://github.com/rosrendo  |  Portfolio: https://rosrendo.dev) Tj
/F1 14 Tf
0 -30 Td
(PROFILE & FOCUS) Tj
/F2 10 Tf
0 -18 Td
(Software engineering student and independent product builder focused on developing) Tj
0 -14 Td
(full-stack web applications, backend architectures, APIs, databases, and deployable digital products.) Tj
/F1 14 Tf
0 -28 Td
(TECHNICAL CORE COMPETENCIES) Tj
/F2 10 Tf
0 -18 Td
(Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion) Tj
0 -14 Td
(Backend: Node.js, Express.js, NestJS, REST APIs, JWT Auth, Microservices) Tj
0 -14 Td
(Databases: PostgreSQL, Prisma ORM, MySQL, Redis, Relational Indexing) Tj
0 -14 Td
(DevOps & Tools: Docker, Docker Compose, Nginx, Linux Ubuntu, AWS EC2, PM2, Git) Tj
/F1 14 Tf
0 -28 Td
(FEATURED PROJECTS) Tj
/F1 11 Tf
0 -18 Td
(1. ServiceFinder - Multi-Sided Home Services Marketplace) Tj
/F2 10 Tf
0 -14 Td
(Next.js, Node.js, PostgreSQL, Prisma, Docker. Real-time booking schedule engine with double-booking prevention.) Tj
/F1 11 Tf
0 -18 Td
(2. SafeDeal - Digital Marketplace & Escrow Concept) Tj
/F2 10 Tf
0 -14 Td
(Next.js, Express, PostgreSQL, Prisma. Milestone-based escrow protocol with deterministic state machine.) Tj
/F1 11 Tf
0 -18 Td
(3. Trading Tools & Strategy Lab) Tj
/F2 10 Tf
0 -14 Td
(TypeScript, Node.js, SVG/Canvas. Vectorized indicator calculation engine with backtesting performance metrics.) Tj
/F1 14 Tf
0 -28 Td
(EDUCATION & JOURNEY) Tj
/F2 10 Tf
0 -18 Td
(2022 - Present: Software Engineering Student & Independent Builder) Tj
0 -14 Td
(Focus on distributed systems, database internals, and end-to-end fullstack development.) Tj
ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000261 00000 n 
0000000336 00000 n 
0000000407 00000 n 
trailer
<<
  /Size 7
  /Root 1 0 R
>>
startxref
1700
%%EOF`;

  const outputPath = path.join(__dirname, '..', 'public', 'ROS_RENDO_CV.pdf');
  fs.writeFileSync(outputPath, content);
  console.log('CV PDF generated successfully at:', outputPath);
}

generateSimplePDF();
