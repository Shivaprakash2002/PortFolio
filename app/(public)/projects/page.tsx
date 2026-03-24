import ProjectCard from "@/components/public/ProjectCard";
import { PROJECTS } from "@/lib/data";

export const metadata = {
  title: "Projects — Alex Dev",
  description: "A selection of projects I have built.",
};

export default function ProjectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      {/* Page header */}
      <div className="mb-16">
        <p className="font-mono text-xs text-accent tracking-[0.2em] uppercase mb-4 animate-fade-up">
          Selected work
        </p>
        <h1 className="font-display text-5xl text-cream mb-6 animate-fade-up delay-100">
          Projects
        </h1>
        <p className="text-cream-dim max-w-xl leading-relaxed animate-fade-up delay-200">
          A curated selection of things I have built — from side projects to
          production systems. Each one taught me something new.
        </p>
      </div>

      <hr className="hr-wire mb-16" />

      {/* Projects grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <p className="font-mono text-xs text-cream-muted mb-4">
          Want to see more?
        </p>
        <a
          href="https://github.com/Shivaprakash2002"
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
        >
          View all on GitHub →
        </a>
      </div>
    </div>
  );
}
