import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const audienceKeys = [
    "handwerk",
    "dienstleistung",
    "praxen",
    "kmu",
    "gastronomie",
    "beratend",
    "marken",
] as const

export async function Audiences() {
    const t = await getTranslations("webdesignKleve.audiences")

    return (
        <SectionWrapper id="zielgruppen">
            <div className="nv-container">
                <div className="mx-auto mb-12 max-w-xl md:mb-16">
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="font-heading font-semibold text-text-primary"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                    >
                        {t("headline")}
                    </h2>
                </div>

                <div className="mx-auto flex max-w-4xl flex-wrap gap-3">
                    {audienceKeys.map((key) => (
                        <div
                            key={key}
                            className="min-w-[220px] flex-1 rounded-2xl border border-border-soft bg-surface px-5 py-5 transition-colors duration-300 hover:border-accent/40"
                        >
                            <h3 className="font-heading font-semibold text-text-primary text-[15px] mb-1.5">
                                {t(`items.${key}.title`)}
                            </h3>
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
