import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const issueKeys = [
    "outdatedLook",
    "unclearServices",
    "poorMobile",
    "complicatedForm",
    "slowLoading",
    "misfitContent",
    "qualityMismatch",
] as const

export async function Problems() {
    const t = await getTranslations("webdesignKleve.problems")

    return (
        <SectionWrapper id="probleme">
            <div className="nv-container">
                <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
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

                <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
                    {issueKeys.map((key, index) => (
                        <ScrollAnimation key={key} delay={index * 0.04}>
                            <div className="h-full rounded-2xl border border-border-soft bg-surface p-6">
                                <h3 className="font-heading font-semibold text-text-primary text-base mb-2">
                                    {t(`items.${key}.title`)}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {t(`items.${key}.description`)}
                                </p>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>

                <p className="mx-auto mt-10 max-w-2xl text-center text-base font-medium text-text-secondary md:mt-12">
                    {t("transition")}
                </p>
            </div>
        </SectionWrapper>
    )
}
