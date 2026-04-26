import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { ArrowRight } from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export async function AboutPreview() {
    const t = await getTranslations("aboutPage")

    return (
        <SectionWrapper id="about-preview" light>
            <div className="nv-container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">

                    {/* Text */}
                    <div className="order-2 md:order-1">
                        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                            {t("story.eyebrow")}
                        </p>
                        <h2
                            className="font-heading font-semibold text-text-primary mb-5"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {t("story.headline")}
                        </h2>
                        <p className="text-text-muted leading-relaxed mb-4">
                            {t("story.text1")}
                        </p>
                        <p className="text-text-muted leading-relaxed mb-8">
                            {t("story.text2")}
                        </p>
                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-[var(--nv-accent-hover)] transition-colors group"
                        >
                            {t("cta.button")}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {/* Image placeholder */}
                    <div className="order-1 md:order-2">
                        <div className="aspect-[4/5] max-w-sm mx-auto md:mx-0 md:ml-auto rounded-2xl bg-surface border border-border-soft flex items-center justify-center text-text-muted text-sm">
                            NuVio Labs
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
