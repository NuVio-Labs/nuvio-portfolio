import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export async function Pricing() {
    const t = await getTranslations("webdesignKranenburg.pricing")

    return (
        <SectionWrapper id="preise">
            <div className="nv-container">
                <div className="mx-auto max-w-2xl rounded-[1.75rem] border border-border-soft bg-surface p-8 text-center md:p-10">
                    <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                        {t("eyebrow")}
                    </p>
                    <h2
                        className="font-heading font-semibold text-text-primary mb-4"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                    >
                        {t("headline")}
                    </h2>
                    <p className="mb-3 text-lg font-semibold text-text-primary">{t("text")}</p>
                    <p className="text-text-muted leading-relaxed">{t("note")}</p>
                </div>
            </div>
        </SectionWrapper>
    )
}
