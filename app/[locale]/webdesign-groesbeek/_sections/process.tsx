import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const stepKeys = ["kennismaking", "doelen", "structuur", "design", "feedback", "lancering"] as const

export async function Process() {
    const t = await getTranslations("webdesignGroesbeek.process")

    return (
        <SectionWrapper id="werkwijze" light>
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

                <div className="mx-auto max-w-3xl divide-y divide-border-soft">
                    {stepKeys.map((key, index) => (
                        <div key={key} className="flex items-baseline gap-6 py-6 first:pt-0 last:pb-0">
                            <span
                                className="shrink-0 font-heading font-semibold text-accent/30"
                                style={{ fontSize: "clamp(1.75rem, 3vw, 2.25rem)" }}
                            >
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                                <h3 className="font-heading font-semibold text-text-primary text-base mb-1.5">
                                    {t(`steps.${key}.title`)}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {t(`steps.${key}.description`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
