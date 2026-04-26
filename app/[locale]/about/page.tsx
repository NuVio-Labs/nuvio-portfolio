import { getTranslations } from "next-intl/server"
import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const approachKeys = ["clarity", "quality", "performance", "partnership"] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "seo.about" })
    return { title: t("title"), description: t("description") }
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations("aboutPage")

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

            {/* Story */}
            <SectionWrapper light>
                <div className="nv-container">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
                        <div>
                            <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                                {t("story.eyebrow")}
                            </p>
                            <h2
                                className="font-heading font-semibold text-text-primary mb-5"
                                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                            >
                                {t("story.headline")}
                            </h2>
                            <p className="text-text-muted leading-relaxed mb-4">{t("story.text1")}</p>
                            <p className="text-text-muted leading-relaxed">{t("story.text2")}</p>
                        </div>
                        <div className="aspect-[4/5] max-w-sm mx-auto md:mx-0 md:ml-auto rounded-2xl bg-background border border-border-soft flex items-center justify-center text-text-muted text-sm">
                            NuVio Labs
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Approach */}
            <SectionWrapper>
                <div className="nv-container">
                    <div className="max-w-xl mb-12">
                        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                            {t("approach.eyebrow")}
                        </p>
                        <h2
                            className="font-heading font-semibold text-text-primary mb-4"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {t("approach.headline")}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {approachKeys.map((key) => (
                            <div
                                key={key}
                                className="flex gap-4 p-6 rounded-2xl bg-surface border border-border-soft"
                            >
                                <div className="mt-1 flex-shrink-0">
                                    <div className="w-5 h-5 rounded-full bg-accent flex items-center justify-center">
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                                            <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-heading font-semibold text-text-primary text-base mb-1.5">
                                        {t(`approach.items.${key}.title`)}
                                    </h3>
                                    <p className="text-text-muted text-sm leading-relaxed">
                                        {t(`approach.items.${key}.text`)}
                                    </p>
                                </div>
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
                        {t("cta.headline")}
                    </h2>
                    <p className="text-text-muted leading-relaxed max-w-xl mx-auto mb-10">
                        {t("cta.subline")}
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-surface text-base font-semibold hover:bg-[var(--nv-accent-hover)] transition-all duration-200 active:scale-[0.98]"
                    >
                        {t("cta.button")}
                    </Link>
                </div>
            </SectionWrapper>
        </main>
    )
}
