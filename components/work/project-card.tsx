import Image from "next/image"
import { ArrowRight, BadgeCheck, Quote } from "lucide-react"
import { Link } from "@/i18n/navigation"
import type { Project } from "@/data/projects"

/**
 * Lokalisierte Case-Study-Inhalte fuer ein Projekt, falls vorhanden (siehe
 * messages/*.json -> work.projects.<id>.{problem,approach,outcome1-3,
 * testimonial} — dieselbe, bereits fuer die Homepage-Work-Sektion genutzte
 * Quelle). Bewusst NICHT `project.caseStudy` aus data/projects.ts: das Feld
 * ist nur auf Englisch gepflegt und wuerde auf der deutschen/niederlaendischen
 * Seite falsche Sprache anzeigen.
 */
export interface CaseStudyContent {
    theProblemLabel: string
    theApproachLabel: string
    problem: string
    approach: string
    outcomes: string[]
    testimonial?: string
}

interface ProjectCardProps {
    project: Project
    index: number
    /** Übersetzter Titel — der Wert aus `project` ist nur ein Fallback für die Bild-Alt. */
    title: string
    description: string
    ctaLabel: string
    /** Label des internen Primary CTA ("Projekt anfragen"). */
    contactLabel: string
    /** Nur gesetzt, wenn fuer dieses Projekt tatsaechlich Case-Study-Daten existieren. */
    caseStudy?: CaseStudyContent
}

export function ProjectCard({
    project,
    index,
    title,
    description,
    ctaLabel,
    contactLabel,
    caseStudy,
}: ProjectCardProps) {
    return (
        <article className="group bg-surface rounded-2xl overflow-hidden border border-border-soft hover:border-accent/40 hover:shadow-lg transition-all duration-300">
            {/* Image / Mockup */}
            <div className="relative aspect-[16/9] bg-surface-soft overflow-hidden">
                {project.image ? (
                    <Image
                        src={project.image}
                        alt={title}
                        fill
                        sizes="(min-width: 1024px) 50vw, 90vw"
                        className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-500"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-text-muted text-sm">
                        {title}
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
                    {title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed mb-5">
                    {description}
                </p>

                {/* Ausgangslage -> Loesung -> Ergebnis, nur wenn reale Case-Study-Daten vorliegen */}
                {caseStudy && (
                    <div className="mb-5 space-y-3 rounded-xl border border-border-soft bg-surface-soft p-4">
                        <p className="text-[13px] leading-6 text-text-secondary">
                            <span className="font-semibold text-text-primary">{caseStudy.theProblemLabel}: </span>
                            {caseStudy.problem}
                        </p>
                        <p className="text-[13px] leading-6 text-text-secondary">
                            <span className="font-semibold text-text-primary">{caseStudy.theApproachLabel}: </span>
                            {caseStudy.approach}
                        </p>
                        {caseStudy.outcomes.length > 0 && (
                            <ul className="space-y-1.5 pt-1">
                                {caseStudy.outcomes.map((outcome) => (
                                    <li key={outcome} className="flex items-start gap-2 text-[13px] leading-6 text-text-secondary">
                                        <BadgeCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                                        {outcome}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {caseStudy.testimonial && (
                            <div className="flex items-start gap-2 border-t border-border-soft pt-3">
                                <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                                <p className="text-[13px] italic leading-6 text-text-secondary">{caseStudy.testimonial}</p>
                            </div>
                        )}
                    </div>
                )}

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

                {/* Interner Conversion-Pfad (Primary CTA) + externer Projektlink */}
                <div className="flex flex-wrap items-center gap-4">
                    <Link
                        href="/contact"
                        data-track="primary_cta_click"
                        data-track-location={`work-page-card-${project.id}`}
                        className="inline-flex items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-surface transition duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98]"
                    >
                        {contactLabel}
                    </Link>

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
            </div>
        </article>
    )
}
