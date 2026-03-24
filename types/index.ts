// Blog post type matching Supabase schema
export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  status: "published" | "draft";
  created_at: string;
  updated_at: string;
}

// Project type for portfolio projects section
export interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  url?: string;
  repo?: string;
  image?: string;
}

// Skill category type for home page
export interface SkillGroup {
  category: string;
  skills: string[];
}
