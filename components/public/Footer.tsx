import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-wire mt-24 py-10">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: copyright */}
        <p className="font-mono text-xs text-cream-muted">
          © {year} Shivaprakash G — built with Next.js & Supabase
        </p>

        {/* Right: social icons */}
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/Shivaprakash2002"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-cream-muted hover:text-cream transition-colors"
          >
            <Github size={16} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/shivaprakash-g-6b4610247/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-cream-muted hover:text-cream transition-colors"
          >
            <Linkedin size={16} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
