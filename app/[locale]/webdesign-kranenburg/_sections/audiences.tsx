import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const audienceKeys = ["handwerk", "dienstleister", "praxen", "gastronomie", "vereine", "kmu"] as const

export async function Audiences() {
    const t = await getTranslations("webdesignKranenburg.audiences")

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

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {audienceKeys.map((key) => (
                        <div
                            key={key}
                            className="rounded-2xl border border-border-soft bg-surface p-6 transition-colors duration-300 hover:border-accent/40"
                        >
                            <h3 className="font-heading font-semibold text-text-primary text-base mb-2">
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
