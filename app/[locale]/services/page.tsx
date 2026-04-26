import { getTranslations } from "next-intl/server"
import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const serviceKeys = ["launch", "redesign", "landing", "ui", "maintenance"] as const
const stepKeys = ["understand", "structure", "design", "build"] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "seo.services" })
    return { title: t("title"), description: t("description") }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations("services")
    const tProcess = await getTranslations("process")
    const tFaq = await getTranslations("faq")

    return (
        <main className="pt-20 md:pt-24">
            {/* Page Hero */}
            <SectionWrapper>
                <div className="nv-container">
                    <div className="max-w-2xl">
                        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                            {t("page.hero.eyebrow")}
                        </p>
                        <h1
                            className="font-heading font-semibold text-text-primary mb-5"
                            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                        >
                            {t("page.hero.headline")}
                        </h1>
                        <p className="text-text-muted leading-relaxed text-lg">
                            {t("page.hero.subline")}
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Service Cards */}
            <SectionWrapper light>
                <div className="nv-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {serviceKeys.map((key, i) => (
                            <article
                                key={key}
                                className="bg-background rounded-2xl p-7 border border-border-soft hover:border-accent/40 hover:shadow-md transition-all duration-300"
                            >
                                <span className="inline-block text-xs font-semibold text-accent bg-accent-soft px-3 py-1 rounded-full mb-5">
                                    0{i + 1}
                                </span>
                                <h2 className="font-heading font-semibold text-text-primary text-xl mb-3">
                                    {t(`items.${key}.title`)}
                                </h2>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {t(`items.${key}.description`)}
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* Process */}
            <SectionWrapper>
                <div className="nv-container">
                    <div className="max-w-xl mb-12">
                        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                            {tProcess("eyebrow")}
                        </p>
                        <h2
                            className="font-heading font-semibold text-text-primary mb-4"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {tProcess("headline")}
                        </h2>
                        <p className="text-text-muted leading-relaxed">{tProcess("subline")}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stepKeys.map((key) => (
                            <div key={key} className="flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-accent text-sm font-semibold shrink-0">
                                        {tProcess(`steps.${key}.number`)}
                                    </span>
                                </div>
                                <h3 className="font-heading font-semibold text-text-primary text-base mb-2">
                                    {tProcess(`steps.${key}.title`)}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {tProcess(`steps.${key}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* FAQ */}
            <SectionWrapper light>
                <div className="nv-container">
                    <div className="max-w-xl mb-12">
                        <h2
                            className="font-heading font-semibold text-text-primary mb-3"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {tFaq("sectionTitle")}
                        </h2>
                        <p className="text-text-muted">{tFaq("sectionSubtitle")}</p>
                    </div>

                    <div className="max-w-2xl space-y-5">
                        {(["cost", "duration", "hosting", "cms"] as const).map((key) => (
                            <div
                                key={key}
                                className="rounded-2xl border border-border-soft bg-background p-6"
                            >
                                <h3 className="font-heading font-semibold text-text-primary mb-2">
                                    {tFaq(`questions.${key}.q`)}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {tFaq(`questions.${key}.a`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionWrapper>

            {/* CTA */}
            <SectionWrapper dark>
                <div className="nv-container text-center">
                    <h2
                        className="font-heading font-semibold text-text-primary mb-5"
                        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                    >
                        {t("headline")}
                    </h2>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-surface text-base font-semibold hover:bg-[var(--nv-accent-hover)] transition-all duration-200 active:scale-[0.98]"
                    >
                        {t("cta")}
                    </Link>
                </div>
            </SectionWrapper>
        </main>
    )
}
