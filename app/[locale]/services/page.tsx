import { getTranslations } from "next-intl/server"
import { setRequestLocale } from "next-intl/server"
import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ServiceCategorySection } from "@/components/services/service-category-section"
import { routing } from "@/i18n/routing"
import { buildPageMetadata, localeUrl } from "@/lib/seo"
import { SERVICE_CATEGORIES } from "@/data/services"
import { buildServiceCatalogSchema, jsonLdScriptProps } from "@/lib/structured-data"

const stepKeys = ["understand", "structure", "design", "build"] as const
const faqKeys = ["cost", "design", "duration", "hosting", "cms", "clientInput"] as const

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "seo.services" })
    return buildPageMetadata({
        locale,
        path: "/services",
        title: t("title"),
        description: t("description"),
        availableLocales: routing.locales,
    })
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations("services")
    const tProcess = await getTranslations("process")
    const tFaq = await getTranslations("faq")

    const catalogSchema = buildServiceCatalogSchema({
        name: t("page.hero.headline"),
        url: localeUrl(locale, "/services"),
        categories: SERVICE_CATEGORIES.map((category) => ({
            name: t(`categories.${category.id}.title`),
            items: category.items.map((item) => ({
                name: t(`categories.${category.id}.items.${item.id}.title`),
                description: t(`categories.${category.id}.items.${item.id}.description`),
                price: item.price,
            })),
        })),
    })

    return (
        <main className="pt-20 md:pt-24">
            <script {...jsonLdScriptProps(catalogSchema)} />

            {/* Page Hero */}
            <SectionWrapper>
                <div className="nv-container">
                    <div className="max-w-2xl">
                        <p className="text-accent-text text-xs font-semibold tracking-widest uppercase mb-4">
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

                    {/* Sprungmarken zu den drei Bereichen */}
                    <nav aria-label={t("page.jumpLabel")} className="mt-10">
                        <ul className="flex flex-wrap gap-3">
                            {SERVICE_CATEGORIES.map((category, index) => (
                                <li key={category.id}>
                                    <a
                                        href={`#${category.id}`}
                                        className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-5 py-2.5 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent-text"
                                    >
                                        <span className="text-accent-text tabular-nums">0{index + 1}</span>
                                        {t(`categories.${category.id}.title`)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </SectionWrapper>

            {/* Leistungsbereiche mit Preisen */}
            {SERVICE_CATEGORIES.map((category, index) => (
                <ServiceCategorySection
                    key={category.id}
                    category={category}
                    index={index}
                    light={index % 2 === 0}
                    showPriceNote={index === SERVICE_CATEGORIES.length - 1}
                />
            ))}

            {/* Process */}
            <SectionWrapper light={SERVICE_CATEGORIES.length % 2 === 0}>
                <div className="nv-container">
                    <div className="max-w-xl mb-12">
                        <p className="text-accent-text text-xs font-semibold tracking-widest uppercase mb-4">
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
                                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-accent-text text-sm font-semibold shrink-0">
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
            <SectionWrapper light={SERVICE_CATEGORIES.length % 2 !== 0}>
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
                        {faqKeys.map((key) => (
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
                        className="font-heading font-semibold text-text-primary mb-4"
                        style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                    >
                        {t("page.cta.headline")}
                    </h2>
                    <p className="mx-auto mb-8 max-w-xl text-text-muted leading-relaxed">
                        {t("page.cta.text")}
                    </p>
                    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <Link
                            href="/contact"
                            data-track="primary_cta_click"
                            data-track-location="services-page-cta"
                            className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-accent-foreground text-base font-semibold hover:bg-[var(--nv-accent-hover)] transition-all duration-200 active:scale-[0.98]"
                        >
                            {t("page.cta.button")}
                        </Link>
                        <Link
                            href="/contact"
                            data-track="primary_cta_click"
                            data-track-location="services-page-check"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-border-soft text-base font-medium text-text-primary hover:border-accent hover:text-accent-text transition-colors"
                        >
                            {t("page.cta.check")}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </main>
    )
}
