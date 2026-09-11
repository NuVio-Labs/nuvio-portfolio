import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const serviceKeys = [
    "companySite",
    "landing",
    "redesign",
    "responsive",
    "multilingual",
    "technical",
    "maintenance",
] as const

export async function Services() {
    const t = await getTranslations("webdesignGroesbeek.services")

    return (
        <SectionWrapper id="diensten">
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

                <div className="mx-auto max-w-4xl divide-y divide-border-soft rounded-2xl border border-border-soft bg-surface sm:grid sm:grid-cols-2 sm:divide-y-0 sm:gap-px sm:bg-border-soft sm:p-px">
                    {serviceKeys.map((key) => (
                        <div key={key} className="bg-surface p-6 sm:p-7">
                            <div className="mb-3 flex items-center gap-3">
                                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                                <h3 className="font-heading font-semibold text-text-primary text-base">
                                    {t(`items.${key}.title`)}
                                </h3>
                            </div>
                            <p className="text-text-muted text-sm leading-relaxed">
                                {t(`items.${key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
