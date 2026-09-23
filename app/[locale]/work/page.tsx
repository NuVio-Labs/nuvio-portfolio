import { getTranslations } from "next-intl/server"
import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/work/project-card"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { routing } from "@/i18n/routing"
import { buildPageMetadata } from "@/lib/seo"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "seo.work" })
    return buildPageMetadata({
        locale,
        path: "/work",
        title: t("title"),
        description: t("description"),
        availableLocales: routing.locales,
    })
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations("workPage")
    const tWork = await getTranslations("work")

    /**
     * Case-Study-Inhalte kommen aus derselben lokalisierten Quelle wie die
     * Homepage-Work-Sektion (messages/*.json -> work.projects.<id>), nicht
     * aus dem englischsprachigen data/projects.ts.caseStudy. Nur gesetzt,
     * wenn fuer das Projekt in dieser Sprache tatsaechlich Daten existieren
     * (z. B. physio-athlete hat aktuell keine) — nichts wird erfunden.
     */
    function buildCaseStudy(projectId: string) {
        if (!tWork.has(`projects.${projectId}.problem`)) return undefined

        const outcomes = (["outcome1", "outcome2", "outcome3"] as const)
            .filter((key) => tWork.has(`projects.${projectId}.${key}`))
            .map((key) => tWork(`projects.${projectId}.${key}`))

        return {
            theProblemLabel: tWork("theProblem"),
            theApproachLabel: tWork("theApproach"),
            problem: tWork(`projects.${projectId}.problem`),
            approach: tWork(`projects.${projectId}.approach`),
            outcomes,
            testimonial: tWork.has(`projects.${projectId}.testimonial`)
                ? tWork(`projects.${projectId}.testimonial`)
                : undefined,
        }
    }

    return (
        <main className="pt-20 md:pt-24">
            {/* Page Hero */}
            <SectionWrapper>
                <div className="nv-container">
                    <div className="max-w-2xl">
                        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                            {t("hero.eyebrow")}
                        </p>
                        <h1
                            className="font-heading font-semibold text-text-primary mb-5"
                            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                        >
                            {t("hero.headline")}
                        </h1>
                        <p className="text-text-muted leading-relaxed text-lg">
                            {t("hero.subline")}
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Project Grid */}
            <SectionWrapper light>
                <div className="nv-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        {projects.map((project, i) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={i}
                                title={tWork(`projects.${project.id}.title`)}
                                description={tWork(`projects.${project.id}.description`)}
                                ctaLabel={t("cta")}
                                contactLabel={t("ctaContact")}
                                caseStudy={buildCaseStudy(project.id)}
                            />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-8 border-t border-border-soft">
                        <Link
                            href="/contact"
                            data-track="primary_cta_click"
                            data-track-location="work-page-cta"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-surface text-base font-semibold hover:bg-[var(--nv-accent-hover)] transition-all duration-200 active:scale-[0.98]"
                        >
                            {t("ctaContact")}
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    )
}
