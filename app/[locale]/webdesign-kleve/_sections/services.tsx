import { getTranslations } from "next-intl/server"
import { Building2, Gauge, Languages, LayoutTemplate, RefreshCw, Smartphone, Wrench } from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const serviceIcons = {
    companySite: Building2,
    relaunch: RefreshCw,
    landing: LayoutTemplate,
    responsive: Smartphone,
    multilingual: Languages,
    technical: Gauge,
    maintenance: Wrench,
} as const

const serviceKeys = Object.keys(serviceIcons) as (keyof typeof serviceIcons)[]

export async function Services() {
    const t = await getTranslations("webdesignKleve.services")

    return (
        <SectionWrapper id="leistungen" light>
            <div className="nv-container">
                <div className="mx-auto mb-12 max-w-xl md:mb-16">
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="font-heading font-semibold text-text-primary mb-4"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                    >
                        {t("headline")}
                    </h2>
                    <p className="text-text-muted leading-relaxed">{t("subline")}</p>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {serviceKeys.map((key) => {
                        const Icon = serviceIcons[key]
                        return (
                            <article
                                key={key}
                                className="rounded-2xl border border-border-soft bg-surface p-7 transition-all duration-300 hover:border-accent/40 hover:shadow-md"
                            >
                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-accent/25 bg-accent-soft text-accent">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="font-heading font-semibold text-text-primary text-lg mb-3">
                                    {t(`items.${key}.title`)}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {t(`items.${key}.description`)}
                                </p>
                            </article>
                        )
                    })}
                </div>
            </div>
        </SectionWrapper>
    )
}
