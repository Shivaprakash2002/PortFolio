"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { isAuthenticated, clearAuth } from "@/lib/auth";
import { LayoutDashboard, PenSquare, LogOut, Loader2 } from "lucide-react";

// Pages that do NOT need auth check (the login page itself)
const PUBLIC_ADMIN = ["/admin/login"];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  // Guard: redirect to login if session is missing
  useEffect(() => {
    if (!PUBLIC_ADMIN.includes(pathname) && !isAuthenticated()) {
      router.replace("/admin/login");
    } else {
      setChecking(false);
    }
  }, [pathname, router]);

  // While checking session, show a spinner
  if (checking && !PUBLIC_ADMIN.includes(pathname)) {
    return (
      <div className="min-h-screen bg-ink flex items-center justify-center">
        <Loader2 className="animate-spin text-accent" size={24} />
      </div>
    );
  }

  // Login page uses its own full-screen layout
  if (PUBLIC_ADMIN.includes(pathname)) {
    return <>{children}</>;
  }

  function handleLogout() {
    clearAuth();
    router.push("/admin/login");
  }

  const NAV = [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/posts/new", icon: PenSquare, label: "New Post" },
  ];

  return (
    <div className="min-h-screen bg-ink flex">
      {/* ─── SIDEBAR ─────────────────────────────────────────────── */}
      <aside className="w-56 border-r border-wire bg-ink-soft flex flex-col shrink-0">
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-wire">
          <span className="font-display text-cream text-lg">
            shiva<span className="text-accent">.</span>admin
          </span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(({ href, icon: Icon, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm font-mono text-xs transition-colors ${
                  active
                    ? "bg-ink-muted text-cream"
                    : "text-cream-muted hover:text-cream hover:bg-ink-muted"
                }`}
              >
                <Icon size={14} />
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Logout button */}
        <div className="p-3 border-t border-wire">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-sm font-mono text-xs text-cream-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut size={14} />
            Log out
          </button>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ────────────────────────────────────────── */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
