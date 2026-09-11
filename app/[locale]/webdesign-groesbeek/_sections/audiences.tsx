import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const audienceKeys = ["zzp", "dienstverleners", "vakbedrijven", "praktijken", "horeca", "mkb"] as const

export async function Audiences() {
    const t = await getTranslations("webdesignGroesbeek.audiences")

    return (
        <SectionWrapper id="doelgroepen" light>
            <div className="nv-container">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="font-heading font-semibold text-text-primary mb-8"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                    >
                        {t("headline")}
                    </h2>

                    <div className="flex flex-wrap justify-center gap-3">
                        {audienceKeys.map((key) => (
                            <span
                                key={key}
                                className="rounded-full border border-border-soft bg-surface px-5 py-2.5 text-sm font-medium text-text-secondary transition-colors duration-300 hover:border-accent/40 hover:text-accent"
                            >
                                {t(`items.${key}`)}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
