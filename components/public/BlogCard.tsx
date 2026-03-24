import Link from "next/link";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import type { Post } from "@/types";

interface BlogCardProps {
  post: Post;
  index?: number;
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  return (
    <article
      className="animate-fade-up group border border-wire rounded-sm p-7 hover:border-cream-muted transition-colors duration-300 bg-ink-soft"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Date and status */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-mono text-xs text-cream-muted">
          {format(new Date(post.created_at), "MMM dd, yyyy")}
        </span>
        <span className="w-1 h-1 rounded-full bg-wire" />
        <span
          className={`font-mono text-xs ${
            post.status === "published" ? "text-accent" : "text-cream-muted"
          }`}
        >
          {post.status}
        </span>
      </div>

      {/* Title */}
      <h2 className="font-display text-xl text-cream mb-3 leading-snug group-hover:text-accent transition-colors">
        {post.title}
      </h2>

      {/* Excerpt */}
      <p className="text-cream-muted text-sm leading-relaxed mb-6 line-clamp-3">
        {post.excerpt}
      </p>

      {/* Read more link */}
      <Link
        href={`/blog/${post.slug}`}
        className="inline-flex items-center gap-2 font-mono text-xs text-accent hover:gap-3 transition-all"
      >
        Read post <ArrowRight size={13} />
      </Link>
    </article>
  );
}
