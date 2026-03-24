import { notFound } from "next/navigation";
import Link from "next/link";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/types";
import type { Metadata } from "next";

// Revalidate each post page every 60 seconds
export const revalidate = 60;

interface Props {
  params: { slug: string };
}

async function getPost(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) return null;
  return data;
}

// Generate dynamic OG metadata per post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Post not found" };

  return {
    title: `${post.title} — Shiva Dev`,
    description: post.excerpt,
  };
}

// Pre-generate static paths for all published posts at build time
export async function generateStaticParams() {
  const { data } = await supabase
    .from("posts")
    .select("slug")
    .eq("status", "published");

  return (data ?? []).map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-20">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-xs text-cream-muted hover:text-cream transition-colors mb-12"
      >
        <ArrowLeft size={13} /> Back to blog
      </Link>

      {/* Post meta */}
      <div className="mb-8 animate-fade-up">
        <div className="flex items-center gap-3 mb-5">
          <time className="font-mono text-xs text-cream-muted">
            {format(new Date(post.created_at), "MMMM dd, yyyy")}
          </time>
          <span className="w-1 h-1 rounded-full bg-wire" />
          <span className="font-mono text-xs text-accent">
            {post.status}
          </span>
        </div>

        <h1 className="font-display text-4xl lg:text-5xl text-cream leading-tight mb-5">
          {post.title}
        </h1>

        <p className="text-cream-muted text-lg leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      <hr className="hr-wire mb-10" />

      {/* Post body — content stored as plain text / markdown in Supabase */}
      <div
        className="prose-dark animate-fade-up delay-100"
        // Render newlines as paragraphs for plain-text content
        dangerouslySetInnerHTML={{
          __html: post.content
            .split("\n\n")
            .map((para) => `<p>${para.replace(/\n/g, "<br/>")}</p>`)
            .join(""),
        }}
      />

      <hr className="hr-wire mt-16 mb-10" />

      {/* Footer nav */}
      <div className="flex items-center justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-cream-muted hover:text-cream transition-colors"
        >
          <ArrowLeft size={13} /> All posts
        </Link>
        <p className="font-mono text-xs text-cream-muted">shiva.dev</p>
      </div>
    </div>
  );
}
