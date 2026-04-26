import { getTranslations } from "next-intl/server"
import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { projects } from "@/data/projects"
import { ProjectCard } from "@/components/work/project-card"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "seo.work" })
    return { title: t("title"), description: t("description") }
}

export default async function WorkPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations("workPage")

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
                                ctaLabel={t("cta")}
                            />
                        ))}
                    </div>

                    {/* CTA */}
                    <div className="text-center pt-8 border-t border-border-soft">
                        <Link
                            href="/contact"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-surface text-base font-semibold hover:bg-[var(--nv-accent-hover)] transition-all duration-200 active:scale-[0.98]"
                        >
                            {t("cta")}
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    )
}
