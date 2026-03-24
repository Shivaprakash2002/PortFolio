import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-4">
          404
        </p>
        <h1 className="font-display text-5xl text-cream mb-4">
          Page not found
        </h1>
        <p className="text-cream-muted mb-8 font-mono text-sm">
          This page does not exist or has been moved.
        </p>
        <Link href="/" className="btn-accent">
          Go home
        </Link>
      </div>
    </div>
  );
}
