"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Navigation links for the public portfolio
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/admin", label : "Admin"}
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-wire bg-ink/90 backdrop-blur-sm">
      <nav className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo / name mark */}
        <Link
          href="/"
          className="font-display text-cream font-bold text-lg tracking-tight hover:text-accent transition-colors"
        >
          shiva<span className="text-accent">.</span>dev
        </Link>

        {/* Navigation links */}
        <ul className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`font-mono text-xs tracking-widest uppercase px-4 py-2 rounded-sm transition-colors ${
                    isActive
                      ? "text-cream bg-ink-muted"
                      : "text-cream-muted hover:text-cream"
                  }`}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
