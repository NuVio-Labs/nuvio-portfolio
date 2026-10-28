import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { FaqAccordion } from "../faq-accordion"

const questionKeys = ["cost", "clientInput", "duration", "modernize", "location", "multilingual", "maintenance"] as const

export async function Faq() {
    const t = await getTranslations("webdesignKleve.faq")

    const items = questionKeys.map((key) => ({
        question: t(`questions.${key}.q`),
        /* rich: die Standort-Antwort verlinkt die Kranenburg-Landingpage. */
        answer: t.rich(`questions.${key}.a`, {
            kranenburg: (chunks) => (
                <Link
                    href="/webdesign-kranenburg"
                    className="font-medium text-text-primary underline decoration-accent/50 underline-offset-[3px] transition-colors hover:decoration-accent hover:text-accent-text"
                >
                    {chunks}
                </Link>
            ),
        }),
    }))

    return (
        <SectionWrapper id="faq-kleve">
            <div className="nv-container">
                <div className="mx-auto max-w-2xl">
                    <div className="mb-12 text-center">
                        <p className="text-accent-text text-xs font-semibold tracking-widest uppercase mb-4">
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
