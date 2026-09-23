import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export async function FinalCta() {
    const t = await getTranslations("webdesignKleve.finalCta")

    return (
        <SectionWrapper id="kontakt-kleve" dark>
            <div className="nv-container text-center">
                <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                    NuVio Labs
                </p>
                <h2
                    className="font-heading font-semibold text-text-primary mb-5 text-balance"
                    style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                >
                    {t("headline")}
                </h2>
                <p
                    className="mx-auto mb-10 max-w-xl leading-relaxed text-text-muted"
                    style={{ fontSize: "clamp(1rem, 1.8vw, 1.125rem)" }}
                >
                    {t("text")}
                </p>
                <Link
                    href="/contact"
                    data-track="primary_cta_click"
                    data-track-location="webdesign-kleve-final-cta"
                    className="inline-flex items-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-surface transition-all duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98]"
                >
                    {t("cta")}
                </Link>
            </div>
        </SectionWrapper>
    )
}
