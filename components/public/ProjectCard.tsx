import { ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  return (
    <div
      className="animate-fade-up border border-wire rounded-sm p-7 bg-ink-soft hover:border-cream-muted transition-colors duration-300 flex flex-col gap-5"
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      {/* Project number watermark */}
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-wire select-none">
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-3">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub repository"
              className="text-cream-muted hover:text-cream transition-colors"
            >
              <Github size={15} />
            </a>
          )}
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              aria-label="Live site"
              className="text-cream-muted hover:text-cream transition-colors"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>

      {/* Title + description */}
      <div>
        <h3 className="font-display text-xl text-cream mb-3 leading-snug">
          {project.title}
        </h3>
        <p className="text-cream-muted text-sm leading-relaxed">
          {project.description}
        </p>
      </div>

      {/* Tech stack tags */}
      <div className="flex flex-wrap gap-2 mt-auto pt-2">
        {project.tech.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
