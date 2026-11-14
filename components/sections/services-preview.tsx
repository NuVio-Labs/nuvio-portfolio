import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ServicePrice } from "@/components/services/service-price"
import { ServiceCategoryIcon } from "@/components/services/service-category-icon"
import { SERVICE_CATEGORIES, getServiceItem } from "@/data/services"

/**
 * Startseite: die drei Leistungsbereiche von NuVio Labs (Design &
 * Webentwicklung, ergaenzt um Online-Marketing) mit je drei
 * stellvertretenden Leistungen und Preisen.
 */
export async function ServicesPreview() {
    const t = await getTranslations("services")

    return (
        <SectionWrapper id="services" light>
            <div className="nv-container">
                <div className="max-w-xl mb-12 md:mb-16">
                    <p className="text-accent-text text-xs font-semibold tracking-widest uppercase mb-4">
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="font-heading font-semibold text-text-primary mb-4"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                    >
                        {t("headline")}
                    </h2>
                    <p className="text-text-muted leading-relaxed">
                        {t("subline")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    {SERVICE_CATEGORIES.map((category, i) => {
                        const base = `categories.${category.id}` as const
                        return (
                            <article
                                key={category.id}
                                className="group flex flex-col bg-background rounded-2xl p-7 border border-border-soft hover:border-accent/40 hover:shadow-md transition-all duration-300"
                            >
                                <div className="flex items-center justify-between gap-4 mb-6">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-accent-text">
                                        <ServiceCategoryIcon id={category.id} className="h-5 w-5" />
                                    </span>
                                    <span className="text-xs font-semibold text-text-muted tabular-nums">0{i + 1}</span>
                                </div>
                                <h3 className="font-heading font-semibold text-text-primary text-xl mb-3">
                                    {t(`${base}.title`)}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed mb-6">
                                    {t(`${base}.teaser`)}
                                </p>

                                <ul className="mt-auto mb-6 divide-y divide-border-soft border-y border-border-soft">
                                    {category.highlights.map((id) => {
                                        const item = getServiceItem(category, id)
                                        if (!item) return null
                                        return (
                                            <li key={id} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                                                <span className="text-text-primary">{t(`${base}.items.${id}.title`)}</span>
                                                <ServicePrice price={item.price} className="text-text-muted" />
                                            </li>
                                        )
                                    })}
                                </ul>

                                <Link
                                    href={`/services#${category.id}`}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-accent-text hover:text-[var(--nv-accent-hover)] transition-colors"
                                >
                                    {t(`${base}.more`)}
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                                </Link>
                            </article>
                        )
                    })}
                </div>

                <div className="text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent-text hover:text-[var(--nv-accent-hover)] transition-colors group"
                    >
                        {t("cta")}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </SectionWrapper>
    )
}
