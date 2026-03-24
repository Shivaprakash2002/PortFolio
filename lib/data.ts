import type { Project, SkillGroup } from "@/types";

// Placeholder projects — replace with your real projects
export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "SmartFax — Healthcare Automation Platform",
    description: "Secure system for doctors to upload patient PDF reports via email, triggering automated backend workflows. Built PDF split/combine/annotation flows, AWS Lambda event processing, and a Next.js dashboard for extracted patient data.",
    tech: ["Next.js", "Python", "AWS Lambda", "S3", "EC2", "OpenAI", "Textract"],
    url: "https://www.aisolves.us/dashboard",
  },
  {
    id: 2,
    title: "Spekwo — Quotation & Order Management",
    description: "Admin dashboard for managing live orders, quotation workflows, and approvals. Implemented AI-based solution suggestions using RAG architecture with OpenAI embeddings and pgvector for semantic search.",
    tech: ["Next.js", "Python", "FastAPI", "PostgreSQL", "OpenAI", "pgvector"],
    url: "https://admindashnew-dev.vercel.app/dashboard",
  },
  {
    id: 3,
    title: "Amplafide — SaaS Billing Platform",
    description: "Integrated Stripe payment and subscription workflows including billing, invoices, and role-based access control for a SaaS platform.",
    tech: [  "Next.js", "Supabase", "PostgreSQL", "Stripe"],
  },
];

// Skills grouped by category — replace with your real skills
export const SKILL_GROUPS: SkillGroup[] = [
  { category: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", skills: ["Python", "FastAPI", "REST API", "PostgreSQL"] },
  { category: "Cloud", skills: ["AWS S3", "EC2", "Lambda", "API Gateway", "Vercel"] },
  { category: "Database & AI", skills: ["Supabase", "PostgreSQL", "pgvector", "OpenAI", "LLMs"] },
];
