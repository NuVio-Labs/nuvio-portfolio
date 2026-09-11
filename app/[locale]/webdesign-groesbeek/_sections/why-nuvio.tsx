import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const reasonKeys = [
    "direct",
    "custom",
    "modern",
    "fast",
    "responsive",
    "multilingual",
    "clear",
    "aftercare",
    "located",
] as const

export async function WhyNuvio() {
    const t = await getTranslations("webdesignGroesbeek.whyNuvio")

    return (
        <SectionWrapper id="waarom-nuvio">
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

                <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-3">
                    {reasonKeys.map((key) => (
                        <div
                            key={key}
                            className="rounded-xl border border-border-soft bg-surface px-5 py-6 text-center text-sm font-medium leading-relaxed text-text-secondary"
                        >
                            {t(`items.${key}`)}
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
