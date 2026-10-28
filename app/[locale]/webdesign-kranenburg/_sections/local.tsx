import { getTranslations } from "next-intl/server"
import { MapPin } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"

export async function LocalArea() {
    const t = await getTranslations("webdesignKranenburg.local")

    return (
        <SectionWrapper id="standort" light>
            <div className="nv-container">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-text-muted">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {t("eyebrow")}
                    </div>

                    <h2
                        className="font-heading font-semibold text-text-primary mb-6"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                    >
                        {t("headline")}
                    </h2>

                    <div className="space-y-5">
                        <p className="text-text-secondary leading-relaxed">
                            {t.rich("paragraphs.base", {
                                kleve: (chunks) => (
                                    <Link
                                        href="/webdesign-kleve"
                                        className="font-medium text-text-primary underline decoration-accent/50 underline-offset-[3px] transition-colors hover:decoration-accent hover:text-accent-text"
                                    >
                                        {chunks}
                                    </Link>
                                ),
                            })}
                        </p>
                        <p className="text-text-secondary leading-relaxed">{t("paragraphs.border")}</p>
                        <p className="text-text-secondary leading-relaxed">{t("paragraphs.contact")}</p>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
