import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { SKILL_GROUPS } from "@/lib/data";

export const metadata = {
  title: "Alex Dev — Full-Stack Developer",
  description:
    "Full-stack developer specialising in React, Next.js, and scalable backend systems.",
};

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* ─── HERO SECTION ─────────────────────────────────────────── */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center mb-32">
        {/* Text column */}
        <div className="lg:col-span-3">
          {/* Eyebrow */}
          <p className="animate-fade-up font-mono text-xs text-accent tracking-[0.2em] uppercase mb-6">
            Open to opportunities
          </p>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100 font-display text-5xl lg:text-6xl text-cream leading-tight mb-6">
            Hi, I&apos;m{" "}
            <span className="italic text-accent">Shivaprakash G</span>
            <br />
            Full-Stack
            <br />
            Developer
          </h1>

          {/* Bio */}
          <p className="animate-fade-up delay-200 text-cream-dim leading-relaxed mb-10 max-w-lg">
            Full Stack Developer with hands-on experience building production SaaS and
            AI-driven platforms. I work across the stack — FastAPI backends, Next.js
            frontends, AWS infrastructure, and LLM integrations.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300 flex flex-wrap items-center gap-4">
            <Link href="/projects" className="btn-accent">
              View my work <ArrowRight size={14} />
            </Link>
            <a
              href="/Shivaprakash_SE_Resume.pdf"
              className="btn-ghost"
              download
            >
              Download CV <Download size={14} />
            </a>
          </div>
        </div>


      </section>

      {/* ─── SKILLS SECTION ───────────────────────────────────────── */}
      <section>
        {/* Section header */}
        <div className="flex items-center gap-4 mb-10">
          <h2 className="font-mono text-xs text-accent tracking-[0.2em] uppercase">
            Skills & Stack
          </h2>
          <div className="flex-1 hr-wire" />
        </div>

        {/* Skill grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SKILL_GROUPS.map((group, i) => (
            <div
              key={group.category}
              className="animate-fade-up border border-wire rounded-sm p-5 bg-ink-soft"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <h3 className="font-mono text-xs text-cream-muted tracking-widest uppercase mb-4">
                {group.category}
              </h3>
              <ul className="space-y-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-sm text-cream-dim"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ─── QUICK STATS ──────────────────────────────────────────── */}
      <section className="mt-24 grid grid-cols-2 lg:grid-cols-3 gap-px border border-wire rounded-sm overflow-hidden">
        {[
          { value: "2", label: "Years experience" },
          { value: "3", label: "Projects Worked" },
          { value: "Ready to Work", label: "Hybrid, Remote, On-Site" },

        ].map(({ value, label }) => (
          <div key={label} className="bg-ink-soft p-6 text-center">
            <p className="font-display text-3xl text-cream mb-1">{value}</p>
            <p className="font-mono text-xs text-cream-muted">{label}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
