import { getTranslations } from "next-intl/server"
import { BadgeCheck } from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const pointKeys = ["professional", "clearServices", "mobile", "fast", "contact", "fit", "trust"] as const

export async function Intent() {
    const t = await getTranslations("webdesignGroesbeek.intent")

    return (
        <SectionWrapper id="website-laten-maken" light>
            <div className="nv-container">
                <div className="mx-auto mb-10 max-w-2xl text-center md:mb-12">
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

                <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
                    {pointKeys.map((key, index) => (
                        <ScrollAnimation key={key} delay={index * 0.04}>
                            <div className="flex items-center gap-3 rounded-2xl border border-border-soft bg-surface px-5 py-4">
                                <BadgeCheck className="h-4 w-4 shrink-0 text-accent" />
                                <span className="text-sm text-text-secondary">{t(`points.${key}`)}</span>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
