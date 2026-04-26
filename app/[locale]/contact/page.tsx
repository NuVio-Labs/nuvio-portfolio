import { getTranslations } from "next-intl/server"
import { setRequestLocale } from "next-intl/server"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ContactForm } from "@/components/sections/contact-form"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "seo.contact" })
    return { title: t("title"), description: t("description") }
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations("contactPage")

    return (
        <main className="pt-20 md:pt-24">
            {/* Page Hero */}
            <SectionWrapper>
                <div className="nv-container">
                    <div className="max-w-2xl">
                        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-4">
                            {t("hero.eyebrow")}
                        </p>
                        <h1
                            className="font-heading font-semibold text-text-primary mb-5"
                            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                        >
                            {t("hero.headline")}
                        </h1>
                        <p className="text-text-muted leading-relaxed text-lg">
                            {t("hero.subline")}
                        </p>
                    </div>
                </div>
            </SectionWrapper>

            {/* Form */}
            <SectionWrapper light>
                <div className="nv-container">
                    <div className="max-w-2xl mx-auto">
                        <ContactForm />
                    </div>
                </div>
            </SectionWrapper>
        </main>
    )
}
