import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const pointKeys = ["compare", "trust", "mobileExpectation", "clarity", "reachability"] as const

export async function BusinessTool() {
    const t = await getTranslations("webdesignKleve.businessTool")

    return (
        <SectionWrapper id="geschaeftswerkzeug" light>
            <div className="nv-container">
                <div className="grid gap-10 lg:grid-cols-[420px_minmax(0,1fr)] lg:items-start">
                    <div>
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

                    <div className="divide-y divide-border-soft rounded-2xl border border-border-soft bg-surface">
                        {pointKeys.map((key, index) => (
                            <ScrollAnimation key={key} delay={index * 0.05}>
                                <div className="flex items-start gap-5 p-6">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-xs font-semibold text-accent">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <div>
                                        <h3 className="font-heading font-semibold text-text-primary text-base mb-1.5">
                                            {t(`points.${key}.title`)}
                                        </h3>
                                        <p className="text-text-muted text-sm leading-relaxed">
                                            {t(`points.${key}.description`)}
                                        </p>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
