import { getTranslations } from "next-intl/server"
import { BadgeCheck } from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const issueKeys = ["outdated", "mobile", "contact", "slow", "impression", "content", "outgrown"] as const
const solutionKeys = ["structure", "performance", "guidance", "mobileOpt", "appearance", "focus"] as const

export async function Problem() {
    const t = await getTranslations("webdesignKranenburg.problem")

    return (
        <SectionWrapper id="herausforderung" light>
            <div className="nv-container">
                <ScrollAnimation>
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
                </ScrollAnimation>

                <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {issueKeys.map((key, index) => (
                        <ScrollAnimation key={key} delay={index * 0.05}>
                            <div className="h-full rounded-2xl border border-border-soft bg-surface p-6">
                                <h3 className="font-heading font-semibold text-text-primary text-base mb-2">
                                    {t(`issues.${key}.title`)}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {t(`issues.${key}.description`)}
                                </p>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>

                <div className="mx-auto mt-12 max-w-5xl rounded-[1.75rem] border border-accent/20 bg-accent-soft p-6 md:mt-16 md:p-8">
                    <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                        {t("solutionsLabel")}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {solutionKeys.map((key) => (
                            <div
                                key={key}
                                className="flex items-center gap-3 rounded-[1.25rem] border border-border-soft bg-surface px-4 py-4 text-sm text-text-secondary"
                            >
                                <BadgeCheck className="h-4 w-4 shrink-0 text-accent" />
                                <span>{t(`solutions.${key}`)}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
