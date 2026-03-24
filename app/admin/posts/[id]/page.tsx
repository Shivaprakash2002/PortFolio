import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import PostForm from "@/components/admin/PostForm";
import type { Post } from "@/types";

interface Props {
  params: { id: string };
}

async function getPost(id: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return data;
}

export default async function EditPostPage({ params }: Props) {
  const post = await getPost(params.id);
  if (!post) notFound();

  return (
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/dashboard"
          className="inline-flex items-center gap-2 font-mono text-xs text-cream-muted hover:text-cream transition-colors mb-5"
        >
          <ArrowLeft size={13} /> Back to dashboard
        </Link>
        <h1 className="font-display text-2xl text-cream mb-1">Edit Post</h1>
        <p className="font-mono text-xs text-cream-muted">/{post.slug}</p>
      </div>

      <hr className="hr-wire mb-8" />

      {/* Edit form pre-populated with existing post data */}
      <PostForm post={post} />
    </div>
  );
}
