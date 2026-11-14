import { getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ServicePrice } from "@/components/services/service-price"
import { ServiceCategoryIcon } from "@/components/services/service-category-icon"
import type { ServiceCategory } from "@/data/services"
import { cn } from "@/lib/utils"

interface ServiceCategorySectionProps {
    category: ServiceCategory
    index: number
    /** Abwechselnder Sektionshintergrund; die Preisliste nimmt jeweils den Kontrastton. */
    light: boolean
    /** Hinweis zu Endpreisen/§ 19 UStG — einmal unter dem letzten Bereich. */
    showPriceNote?: boolean
}

/**
 * Ein Leistungsbereich (Webdesign, Grafikdesign, Online-Marketing):
 * links Einordnung und Anfrage, rechts die Preisliste.
 */
export async function ServiceCategorySection({ category, index, light, showPriceNote = false }: ServiceCategorySectionProps) {
    const t = await getTranslations("services")
    const base = `categories.${category.id}` as const

    return (
        <SectionWrapper id={category.id} light={light} className="scroll-mt-20 md:scroll-mt-24">
            <div className="nv-container">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                    {/* Einordnung */}
                    <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-accent-text">
                                <ServiceCategoryIcon id={category.id} className="h-5 w-5" />
                            </span>
                            <span className="text-accent-text text-xs font-semibold tracking-widest uppercase tabular-nums">
                                0{index + 1} · {t(`${base}.eyebrow`)}
                            </span>
                        </div>
                        <h2
                            className="font-heading font-semibold text-text-primary mb-4"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {t(`${base}.title`)}
                        </h2>
                        <p className="text-text-muted leading-relaxed mb-6">{t(`${base}.intro`)}</p>
                        <Link
                            href="/contact"
                            data-track="primary_cta_click"
                            data-track-location={`services-${category.id}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-accent-text hover:text-[var(--nv-accent-hover)] transition-colors group"
                        >
                            {t(`${base}.cta`)}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                        </Link>
                    </div>

                    {/* Preisliste */}
                    <div className="lg:col-span-8">
                        <ul
                            className={cn(
                                "divide-y divide-border-soft overflow-hidden rounded-2xl border border-border-soft",
                                light ? "bg-background" : "bg-surface"
                            )}
                        >
                            {category.items.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex flex-col gap-2 p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:p-6"
                                >
                                    <div className="min-w-0">
                                        <h3 className="font-heading font-semibold text-text-primary text-base mb-1">
                                            {t(`${base}.items.${item.id}.title`)}
                                        </h3>
                                        <p className="text-text-muted text-sm leading-relaxed">
                                            {t(`${base}.items.${item.id}.description`)}
                                        </p>
                                    </div>
                                    <ServicePrice
                                        price={item.price}
                                        className="shrink-0 text-sm font-semibold text-accent-text sm:text-base"
                                    />
                                </li>
                            ))}
                        </ul>

                        {showPriceNote && (
                            <p className="mt-6 text-xs leading-relaxed text-text-muted">{t("price.note")}</p>
                        )}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
