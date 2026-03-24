"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  PenSquare,
  Trash2,
  Eye,
  EyeOff,
  Plus,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { Post } from "@/types";

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState<string | null>(null); // ID currently being mutated

  // ─── Fetch all posts (published + draft) for admin view ───────
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setPosts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // ─── Toggle published ↔ draft ──────────────────────────────────
  async function toggleStatus(post: Post) {
    setActionId(post.id);
    const newStatus = post.status === "published" ? "draft" : "published";
    const { error } = await supabase
      .from("posts")
      .update({ status: newStatus })
      .eq("id", post.id);

    if (!error) {
      setPosts((prev) =>
        prev.map((p) => (p.id === post.id ? { ...p, status: newStatus } : p))
      );
    }
    setActionId(null);
  }

  // ─── Delete post (with confirmation) ──────────────────────────
  async function deletePost(post: Post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setActionId(post.id);
    const { error } = await supabase.from("posts").delete().eq("id", post.id);

    if (!error) {
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
    }
    setActionId(null);
  }

  return (
    <div className="p-8">
      {/* Header row */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl text-cream mb-1">Dashboard</h1>
          <p className="font-mono text-xs text-cream-muted">
            {posts.length} post{posts.length !== 1 ? "s" : ""} total
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPosts}
            className="btn-ghost"
            title="Refresh"
            aria-label="Refresh"
          >
            <RefreshCw size={13} />
          </button>
          <Link href="/admin/posts/new" className="btn-accent">
            <Plus size={14} /> New post
          </Link>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-accent" size={22} />
        </div>
      ) : posts.length === 0 ? (
        // Empty state
        <div className="border border-wire rounded-sm p-16 text-center bg-ink-soft">
          <p className="font-display text-xl text-cream mb-2">
            No posts yet
          </p>
          <p className="font-mono text-xs text-cream-muted mb-6">
            Create your first post to get started.
          </p>
          <Link href="/admin/posts/new" className="btn-accent">
            <Plus size={14} /> Create post
          </Link>
        </div>
      ) : (
        // Posts table
        <div className="border border-wire rounded-sm overflow-hidden bg-ink-soft">
          <table className="w-full">
            <thead>
              <tr className="border-b border-wire">
                <th className="text-left px-5 py-3 font-mono text-xs text-cream-muted tracking-widest uppercase">
                  Title
                </th>
                <th className="text-left px-5 py-3 font-mono text-xs text-cream-muted tracking-widest uppercase hidden md:table-cell">
                  Status
                </th>
                <th className="text-left px-5 py-3 font-mono text-xs text-cream-muted tracking-widest uppercase hidden lg:table-cell">
                  Created
                </th>
                <th className="text-right px-5 py-3 font-mono text-xs text-cream-muted tracking-widest uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => {
                const isBusy = actionId === post.id;
                return (
                  <tr
                    key={post.id}
                    className="border-b border-wire/50 last:border-0 hover:bg-ink-muted/30 transition-colors"
                  >
                    {/* Title */}
                    <td className="px-5 py-4">
                      <p className="text-cream text-sm font-medium line-clamp-1">
                        {post.title}
                      </p>
                      <p className="font-mono text-xs text-cream-muted mt-0.5 line-clamp-1">
                        /{post.slug}
                      </p>
                    </td>

                    {/* Status badge */}
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span
                        className={`inline-flex items-center gap-1.5 font-mono text-xs px-2.5 py-1 rounded-sm border ${
                          post.status === "published"
                            ? "text-green-400 border-green-400/30 bg-green-400/10"
                            : "text-cream-muted border-wire bg-ink"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            post.status === "published"
                              ? "bg-green-400"
                              : "bg-cream-muted"
                          }`}
                        />
                        {post.status}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 font-mono text-xs text-cream-muted hidden lg:table-cell">
                      {format(new Date(post.created_at), "MMM dd, yyyy")}
                    </td>

                    {/* Action buttons */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {/* Toggle status */}
                        <button
                          onClick={() => toggleStatus(post)}
                          disabled={isBusy}
                          title={
                            post.status === "published"
                              ? "Set to draft"
                              : "Publish"
                          }
                          className="p-1.5 rounded-sm text-cream-muted hover:text-cream hover:bg-ink-muted transition-colors disabled:opacity-40"
                        >
                          {isBusy ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : post.status === "published" ? (
                            <EyeOff size={14} />
                          ) : (
                            <Eye size={14} />
                          )}
                        </button>

                        {/* Edit */}
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="p-1.5 rounded-sm text-cream-muted hover:text-cream hover:bg-ink-muted transition-colors"
                          title="Edit post"
                        >
                          <PenSquare size={14} />
                        </Link>

                        {/* Delete */}
                        <button
                          onClick={() => deletePost(post)}
                          disabled={isBusy}
                          title="Delete post"
                          className="p-1.5 rounded-sm text-cream-muted hover:text-red-400 hover:bg-red-400/10 transition-colors disabled:opacity-40"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
