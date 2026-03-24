"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save, Eye } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/types";

interface PostFormProps {
  /** If provided, we are editing an existing post */
  post?: Post;
}

/** Converts a title string into a URL-safe slug */
function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const isEdit = !!post;

  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [content, setContent] = useState(post?.content ?? "");
  const [status, setStatus] = useState<"published" | "draft">(
    post?.status ?? "draft"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-generate slug from title (only when creating, not editing)
  function handleTitleChange(val: string) {
    setTitle(val);
    if (!isEdit) setSlug(slugify(val));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = { title, slug, excerpt, content, status };

    try {
      if (isEdit) {
        // Update existing post
        const { error: err } = await supabase
          .from("posts")
          .update(payload)
          .eq("id", post.id);
        if (err) throw err;
      } else {
        // Insert new post
        const { error: err } = await supabase.from("posts").insert(payload);
        if (err) throw err;
      }

      router.push("/admin/dashboard");
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="block font-mono text-xs text-cream-muted tracking-widest uppercase mb-2">
          Title <span className="text-accent">*</span>
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          maxLength={200}
          placeholder="My awesome post"
          className="w-full bg-ink border border-wire rounded-sm px-4 py-2.5 text-cream font-body text-base focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      {/* Slug */}
      <div>
        <label className="block font-mono text-xs text-cream-muted tracking-widest uppercase mb-2">
          Slug <span className="text-accent">*</span>
        </label>
        <div className="flex items-center border border-wire rounded-sm focus-within:border-accent transition-colors overflow-hidden">
          <span className="font-mono text-xs text-cream-muted px-3 py-2.5 bg-ink-muted border-r border-wire whitespace-nowrap">
            /blog/
          </span>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            maxLength={200}
            placeholder="my-awesome-post"
            className="flex-1 bg-ink px-4 py-2.5 text-cream font-mono text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Excerpt */}
      <div>
        <label className="block font-mono text-xs text-cream-muted tracking-widest uppercase mb-2">
          Excerpt <span className="text-accent">*</span>
        </label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          rows={2}
          maxLength={300}
          placeholder="A brief summary shown on the blog listing page…"
          className="w-full bg-ink border border-wire rounded-sm px-4 py-2.5 text-cream text-sm leading-relaxed focus:outline-none focus:border-accent transition-colors resize-none"
        />
        <p className="font-mono text-xs text-cream-muted mt-1 text-right">
          {excerpt.length}/300
        </p>
      </div>

      {/* Content */}
      <div>
        <label className="block font-mono text-xs text-cream-muted tracking-widest uppercase mb-2">
          Content <span className="text-accent">*</span>
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={18}
          placeholder="Write your post here. Separate paragraphs with a blank line. Supports basic HTML."
          className="w-full bg-ink border border-wire rounded-sm px-4 py-3 text-cream text-sm font-mono leading-relaxed focus:outline-none focus:border-accent transition-colors resize-y"
        />
        <p className="font-mono text-xs text-cream-muted mt-1">
          Tip: Separate paragraphs with a blank line. Wrap code in{" "}
          <code className="text-accent">&lt;pre&gt;&lt;code&gt;</code> tags.
        </p>
      </div>

      {/* Status + Submit row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2">
        {/* Status toggle */}
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-cream-muted tracking-widest uppercase">
            Status:
          </span>
          <div className="flex border border-wire rounded-sm overflow-hidden">
            {(["draft", "published"] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={`px-4 py-2 font-mono text-xs transition-colors ${
                  status === s
                    ? s === "published"
                      ? "bg-green-500/20 text-green-400 border-r border-wire"
                      : "bg-ink-muted text-cream border-r border-wire"
                    : "text-cream-muted hover:text-cream"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {/* Preview link (only for existing published posts) */}
          {isEdit && post.status === "published" && (
            <a
              href={`/blog/${post.slug}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <Eye size={13} /> Preview
            </a>
          )}

          {/* Save button */}
          <button
            type="submit"
            disabled={loading}
            className="btn-accent disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={13} className="animate-spin" /> Saving…
              </>
            ) : (
              <>
                <Save size={13} /> {isEdit ? "Save changes" : "Create post"}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <p className="font-mono text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2">
          {error}
        </p>
      )}
    </form>
  );
}
