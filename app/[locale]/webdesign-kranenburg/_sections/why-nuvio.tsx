import { getTranslations } from "next-intl/server"
import { BadgeCheck } from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const reasonKeys = [
    "located",
    "directContact",
    "individual",
    "modernBasis",
    "borderRegion",
    "aftercare",
] as const

export async function WhyNuvio() {
    const t = await getTranslations("webdesignKranenburg.whyNuvio")

    return (
        <SectionWrapper id="warum-nuvio" light>
            <div className="nv-container">
                <div className="mx-auto max-w-2xl text-center mb-12 md:mb-16">
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

                <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2">
                    {reasonKeys.map((key) => (
                        <div
                            key={key}
                            className="flex items-start gap-4 rounded-2xl border border-border-soft bg-surface px-5 py-5"
                        >
                            <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                            <div>
                                <h3 className="font-heading font-semibold text-text-primary text-[15px] mb-1.5">
                                    {t(`items.${key}.title`)}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {t(`items.${key}.description`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
