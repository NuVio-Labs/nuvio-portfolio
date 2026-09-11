import { getTranslations } from "next-intl/server"
import { ArrowRight } from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export async function CrossBorder() {
    const t = await getTranslations("webdesignGroesbeek.crossBorder")

    return (
        <SectionWrapper id="grensregio">
            <div className="nv-container">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-10 text-center md:mb-12">
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

                    {/* DE -> NL badge */}
                    <div className="mb-10 flex items-center justify-center gap-3 sm:gap-5">
                        <span className="rounded-full border border-border-soft bg-surface px-5 py-3 text-sm font-semibold text-text-primary">
                            {t("badgeFrom")}
                        </span>
                        <ArrowRight className="h-5 w-5 shrink-0 text-accent" />
                        <span className="rounded-full border border-accent/30 bg-accent-soft px-5 py-3 text-sm font-semibold text-accent">
                            {t("badgeTo")}
                        </span>
                    </div>

                    <div className="space-y-5 rounded-[1.75rem] border border-border-soft bg-surface p-7 md:p-9">
                        <p className="text-text-secondary leading-relaxed">{t("paragraphs.base")}</p>
                        <p className="text-text-secondary leading-relaxed">{t("paragraphs.proximity")}</p>
                        <p className="text-text-secondary leading-relaxed">{t("paragraphs.understanding")}</p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
