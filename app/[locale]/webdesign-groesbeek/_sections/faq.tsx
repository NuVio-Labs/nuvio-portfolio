import { getTranslations } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { FaqAccordion } from "../faq-accordion"

const questionKeys = ["cost", "clientInput", "duration", "existing", "dutch", "languages", "maintenance", "hosting"] as const

export async function Faq() {
    const t = await getTranslations("webdesignGroesbeek.faq")

    const items = questionKeys.map((key) => ({
        question: t(`questions.${key}.q`),
        answer: t(`questions.${key}.a`),
    }))

    return (
        <SectionWrapper id="faq-groesbeek" light>
            <div className="nv-container">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-12 text-center">
                        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                            {t("eyebrow")}
                        </p>
                        <h2
                            className="font-heading font-semibold text-text-primary"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {t("headline")}
                        </h2>
                    </div>

                    <FaqAccordion items={items} />
                </div>
            </div>
        </SectionWrapper>
    )
}
