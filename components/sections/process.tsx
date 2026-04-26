import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const stepKeys = ["understand", "structure", "design", "build"] as const

export async function Process() {
    const t = await getTranslations("process")

    return (
        <SectionWrapper id="process">
            <div className="nv-container">
                <div className="max-w-xl mb-12 md:mb-16">
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="font-heading font-semibold text-text-primary mb-4"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                    >
                        {t("headline")}
                    </h2>
                    <p className="text-text-muted leading-relaxed">
                        {t("subline")}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stepKeys.map((key, index) => (
                        <div key={key} className="relative flex flex-col">
                            {/* Connector line (not on last item) */}
                            {index < stepKeys.length - 1 && (
                                <div
                                    className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] right-0 h-px bg-border-soft"
                                    aria-hidden="true"
                                />
                            )}

                            <div className="flex items-center gap-3 mb-4">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-accent text-sm font-semibold shrink-0">
                                    {t(`steps.${key}.number`)}
                                </span>
                            </div>

                            <h3 className="font-heading font-semibold text-text-primary text-base mb-2">
                                {t(`steps.${key}.title`)}
                            </h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                {t(`steps.${key}.description`)}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
