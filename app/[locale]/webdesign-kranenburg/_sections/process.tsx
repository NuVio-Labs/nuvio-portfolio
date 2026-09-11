import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const stepKeys = ["start", "concept", "design", "feedback", "launch", "care"] as const

export async function Process() {
    const t = await getTranslations("webdesignKranenburg.process")

    return (
        <SectionWrapper id="ablauf" light>
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

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {stepKeys.map((key, index) => (
                        <div key={key} className="relative flex flex-col">
                            <div className="mb-4 flex items-center gap-3">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-sm font-semibold text-accent">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                            </div>
                            <h3 className="font-heading font-semibold text-text-primary text-base mb-2">
                                {t(`steps.${key}.title`)}
                            </h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                {t(`steps.${key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
