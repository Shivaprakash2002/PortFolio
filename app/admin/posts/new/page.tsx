import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
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
        <h1 className="font-display text-2xl text-cream">New Post</h1>
      </div>

      <hr className="hr-wire mb-8" />

      {/* Create form */}
      <PostForm />
    </div>
  );
}
