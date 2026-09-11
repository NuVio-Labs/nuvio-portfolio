import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const stepKeys = ["start", "requirements", "concept", "design", "feedback", "launch"] as const

export async function Process() {
    const t = await getTranslations("webdesignKleve.process")

    return (
        <SectionWrapper id="ablauf">
            <div className="nv-container">
                <div className="mx-auto mb-12 max-w-xl md:mb-16">
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

                <div className="mx-auto max-w-2xl">
                    {stepKeys.map((key, index) => (
                        <div key={key} className="relative flex gap-5 pb-10 last:pb-0">
                            {index < stepKeys.length - 1 && (
                                <span
                                    className="absolute left-[17px] top-9 h-[calc(100%-1.75rem)] w-px bg-border-soft"
                                    aria-hidden="true"
                                />
                            )}
                            <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent/40 bg-accent-soft text-sm font-semibold text-accent">
                                {String(index + 1).padStart(2, "0")}
                            </span>
                            <div className="pt-1">
                                <h3 className="font-heading font-semibold text-text-primary text-base mb-1.5">
                                    {t(`steps.${key}.title`)}
                                </h3>
                                <p className="text-text-muted text-sm leading-relaxed">
                                    {t(`steps.${key}.description`)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
