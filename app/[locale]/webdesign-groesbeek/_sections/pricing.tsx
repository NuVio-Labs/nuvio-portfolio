import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export async function Pricing() {
    const t = await getTranslations("webdesignGroesbeek.pricing")

    return (
        <SectionWrapper id="prijsindicatie">
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
                    <p className="mb-8 text-text-muted leading-relaxed">{t("note")}</p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-surface shadow-sm transition duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98]"
                    >
                        {t("cta")}
                    </Link>
                </div>
            </div>
        </SectionWrapper>
    )
}
