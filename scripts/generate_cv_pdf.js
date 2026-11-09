const fs = require('fs');
const path = require('path');

function generateSimplePDF() {
  const lines = [
    ['F1', 22, 'ROS RENDO'],
    ['F2', 12, 'Full-Stack Developer | Backend Engineering & Systems Architecture', true],
    ['F2', 12, 'Email: rousrendo@gmail.com  |  Location: Phnom Penh, Cambodia', true],
    ['F2', 12, 'GitHub: https://github.com/rosrendo  |  Portfolio: https://rosrendo.dev', true],
    ['br', 30],
    ['F1', 14, 'PROFILE & FOCUS'],
    ['F2', 10, 'Software engineering student and independent product builder focused on developing', true],
    ['F2', 10, 'full-stack web applications, backend architectures, APIs, databases, and deployable digital products.', true],
    ['br', 28],
    ['F1', 14, 'TECHNICAL CORE COMPETENCIES'],
    ['F2', 10, 'Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion', true],
    ['F2', 10, 'Backend: Node.js, Express.js, NestJS, REST APIs, JWT Auth, Microservices', true],
    ['F2', 10, 'Databases: PostgreSQL, Prisma ORM, MySQL, Redis, Relational Indexing', true],
    ['F2', 10, 'DevOps & Tools: Docker, Docker Compose, Nginx, Linux Ubuntu, AWS EC2, PM2, Git', true],
    ['br', 28],
    ['F1', 14, 'FEATURED PROJECTS'],
    ['F1', 11, '1. ServiceFinder - Multi-Sided Home Services Marketplace', true],
    ['F2', 10, 'Next.js, Node.js, PostgreSQL, Prisma, Docker. Real-time booking schedule engine with double-booking prevention.', true],
    ['F1', 11, '2. SafeDeal - Digital Marketplace & Escrow Concept', true],
    ['F2', 10, 'Next.js, Express, PostgreSQL, Prisma. Milestone-based escrow protocol with deterministic state machine.', true],
    ['F1', 11, '3. Trading Tools & Strategy Lab', true],
    ['F2', 10, 'TypeScript, Node.js, SVG/Canvas. Vectorized indicator calculation engine with backtesting performance metrics.', true],
    ['br', 28],
    ['F1', 14, 'EDUCATION & JOURNEY'],
    ['F2', 10, '2022 - Present: Software Engineering Student & Independent Builder', true],
    ['F2', 10, 'Focus on distributed systems, database internals, and end-to-end fullstack development.', true],
  ];

  let stream = 'BT\n';
  let y = 730;
  for (const line of lines) {
    if (line[0] === 'br') { y -= line[1]; continue; }
    const font = line[0], size = line[1], text = line[2];
    stream += `/${font} ${size} Tf\n50 ${y} Td\n(${text.replace(/[\\(]/g, '\\$&')}) Tj\n`;
    y -= size + 8;
  }
  stream += 'ET\n';

  const objects = [];
  objects[1] = `<< /Type /Catalog /Pages 2 0 R >>`;
  objects[2] = `<< /Type /Pages /Kids [3 0 R] /Count 1 >>`;
  objects[3] = `<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /MediaBox [0 0 612 792] /Contents 6 0 R >>`;
  objects[4] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>`;
  objects[5] = `<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>`;
  objects[6] = `<< /Length ${Buffer.byteLength(stream, 'binary')} >>\nstream\n${stream}endstream`;

  let pdf = '%PDF-1.4\n';
  const offsets = {};
  for (let i = 1; i <= 6; i++) {
    offsets[i] = Buffer.byteLength(pdf, 'binary');
    pdf += `${i} 0 obj\n${objects[i]}\nendobj\n`;
  }
  const xrefStart = Buffer.byteLength(pdf, 'binary');
  let xref = `xref\n0 7\n0000000000 65535 f \n`;
  for (let i = 1; i <= 6; i++) xref += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  pdf += xref + `trailer\n<< /Size 7 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  const outputPath = path.join(__dirname, '..', 'public', 'ROS_RENDO_CV.pdf');
  fs.writeFileSync(outputPath, pdf);
  console.log('CV PDF generated successfully at:', outputPath, '-', pdf.length, 'bytes');
}

generateSimplePDF();
