import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export async function CtaFinal() {
    const t = await getTranslations("aboutPage")
    const tNav = await getTranslations("nav")

    return (
        <SectionWrapper id="cta" dark>
            <div className="nv-container text-center">
                <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                    NuVio Labs
                </p>
                <h2
                    className="font-heading font-semibold text-text-primary mb-5 text-balance"
                    style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                >
                    {t("cta.headline")}
                </h2>
                <p
                    className="text-text-muted leading-relaxed max-w-xl mx-auto mb-10"
                    style={{ fontSize: "clamp(1rem, 1.8vw, 1.125rem)" }}
                >
                    {t("cta.subline")}
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-8 py-4 rounded-full bg-accent text-surface text-base font-semibold hover:bg-[var(--nv-accent-hover)] transition-all duration-200 active:scale-[0.98]"
                    >
                        {t("cta.button")}
                    </Link>
                    <Link
                        href="/services"
                        className="inline-flex items-center px-8 py-4 rounded-full border border-border-soft text-text-secondary text-base font-medium hover:border-accent/50 hover:text-accent transition-all duration-200"
                    >
                        {tNav("services")}
                    </Link>
                </div>
            </div>
        </SectionWrapper>
    )
}
