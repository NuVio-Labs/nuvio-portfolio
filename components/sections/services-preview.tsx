import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const serviceKeys = ["launch", "redesign", "landing", "ui", "maintenance"] as const

export async function ServicesPreview() {
    const t = await getTranslations("services")

    return (
        <SectionWrapper id="services" light>
            <div className="nv-container">
                <div className="max-w-xl mb-12 md:mb-16">
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
                    {serviceKeys.map((key, i) => (
                        <article
                            key={key}
                            className="group bg-surface rounded-2xl p-7 border border-border-soft hover:border-accent/40 hover:shadow-md transition-all duration-300"
                        >
                            <div className="flex items-start justify-between gap-4 mb-5">
                                <span className="text-xs font-semibold text-accent bg-accent-soft px-3 py-1 rounded-full">
                                    0{i + 1}
                                </span>
                            </div>
                            <h3 className="font-heading font-semibold text-text-primary text-lg mb-3">
                                {t(`items.${key}.title`)}
                            </h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                {t(`items.${key}.description`)}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="text-center">
                    <Link
                        href="/services"
                        className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-[var(--nv-accent-hover)] transition-colors group"
                    >
                        {t("cta")}
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </SectionWrapper>
    )
}
