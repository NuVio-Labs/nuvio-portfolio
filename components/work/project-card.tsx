import Image from "next/image"
import { ArrowRight } from "lucide-react"
import type { Project } from "@/data/projects"

interface ProjectCardProps {
    project: Project
    index: number
    ctaLabel: string
}

export function ProjectCard({ project, index, ctaLabel }: ProjectCardProps) {
    return (
        <article className="group bg-surface rounded-2xl overflow-hidden border border-border-soft hover:border-accent/40 hover:shadow-lg transition-all duration-300">
            {/* Image / Mockup */}
            <div className="relative aspect-[16/9] bg-surface-soft overflow-hidden">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 90vw"
                        className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm">
                        {project.title}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-7">
                <div className="flex items-start justify-between gap-4 mb-4">
                    <span className="text-xs font-semibold text-accent bg-accent-soft px-3 py-1 rounded-full">
                        0{index + 1}
                    </span>
                    <span className="text-xs text-text-muted">{project.category}</span>
                </div>

                <h3 className="font-heading font-semibold text-text-primary text-xl mb-3">
                    {project.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="text-xs text-text-muted border border-border-soft px-2.5 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-2.5 transition-all"
                    >
                        {ctaLabel}
                        <ArrowRight className="h-4 w-4" />
                    </a>
                )}
            </div>
        </article>
    )
}
