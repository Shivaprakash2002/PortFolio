"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { setAuthenticated } from "@/lib/auth";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validate credentials via the API route (keeps secrets server-side)
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        // Store auth flag in sessionStorage, then redirect to dashboard
        setAuthenticated();
        router.push("/admin/dashboard");
      } else {
        const data = await res.json();
        setError(data.error ?? "Login failed.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-ink flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-10 text-center">
          <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-3">
            Admin Portal
          </p>
          <h1 className="font-display text-3xl text-cream">Welcome back</h1>
        </div>

        {/* Login form */}
        <form
          onSubmit={handleSubmit}
          className="border border-wire rounded-sm p-8 bg-ink-soft space-y-5"
        >
          {/* Username */}
          <div>
            <label className="block font-mono text-xs text-cream-muted tracking-widest uppercase mb-2">
              Username
            </label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-ink border border-wire rounded-sm px-4 py-2.5 text-cream font-mono text-sm focus:outline-none focus:border-accent transition-colors"
              placeholder="admin"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block font-mono text-xs text-cream-muted tracking-widest uppercase mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-ink border border-wire rounded-sm px-4 py-2.5 pr-10 text-cream font-mono text-sm focus:outline-none focus:border-accent transition-colors"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-muted hover:text-cream transition-colors"
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && (
            <p className="font-mono text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-sm px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="btn-accent w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={14} className="animate-spin" /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Hint for demo */}
        <p className="mt-4 text-center font-mono text-xs text-cream-muted">
          Default:{" "}
          <span className="text-cream">admin</span> /{" "}
          <span className="text-cream">portfolio2024</span>
        </p>
      </div>
    </div>
  );
}
