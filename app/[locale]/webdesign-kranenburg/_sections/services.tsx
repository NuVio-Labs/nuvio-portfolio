import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const serviceKeys = [
    "companySite",
    "landing",
    "relaunch",
    "responsive",
    "multilingual",
    "technical",
    "maintenance",
] as const

export async function Services() {
    const t = await getTranslations("webdesignKranenburg.services")

    return (
        <SectionWrapper id="leistungen">
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

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {serviceKeys.map((key, index) => (
                        <article
                            key={key}
                            className="group rounded-2xl border border-border-soft bg-surface p-7 transition-all duration-300 hover:border-accent/40 hover:shadow-md"
                        >
                            <span className="mb-5 inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                                0{index + 1}
                            </span>
                            <h3 className="font-heading font-semibold text-text-primary text-lg mb-3">
                                {t(`items.${key}.title`)}
                            </h3>
                            <p className="text-text-muted text-sm leading-relaxed">
                                {t(`items.${key}.description`)}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </SectionWrapper>
    )
}
