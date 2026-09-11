import { getTranslations } from "next-intl/server"
import { Languages } from "lucide-react"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const languageKeys = ["nl", "de", "en"] as const
const pointKeys = ["reach", "structure", "technical"] as const

export async function Multilingual() {
    const t = await getTranslations("webdesignGroesbeek.multilingual")

    return (
        <SectionWrapper id="meertalig" light>
            <div className="nv-container">
                <div className="mx-auto max-w-3xl">
                    <div className="mb-8 flex justify-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-accent/25 bg-accent-soft text-accent">
                            <Languages className="h-5 w-5" />
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                            {t("eyebrow")}
                        </p>
                        <h2
                            className="font-heading font-semibold text-text-primary mb-4"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {t("headline")}
                        </h2>
                        <p className="mx-auto max-w-2xl text-text-muted leading-relaxed">{t("subline")}</p>
                    </div>

                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        {languageKeys.map((key) => (
                            <span
                                key={key}
                                className="rounded-full border border-border-soft bg-surface px-5 py-2.5 text-sm font-medium text-text-primary"
                            >
                                {t(`languages.${key}`)}
                            </span>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-4 sm:grid-cols-3">
                        {pointKeys.map((key) => (
                            <div
                                key={key}
                                className="rounded-2xl border border-border-soft bg-surface px-5 py-5 text-sm leading-relaxed text-text-secondary"
                            >
                                {t(`points.${key}`)}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
