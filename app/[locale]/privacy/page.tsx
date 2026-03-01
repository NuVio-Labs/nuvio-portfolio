import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { setRequestLocale } from "next-intl/server"

export default function PrivacyPage({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale)
    const t = useTranslations("legal.privacy")

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="py-24 md:py-32">
                    <Container className="max-w-3xl">
                        <div className="mb-16">
                            <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">{t("title")}</h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {t("intro")}
                            </p>
                        </div>

                        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
                            <div className="mb-12">
                                <h2 className="text-xl font-bold mb-4">{t("hostingTitle")}</h2>
                                <p className="text-muted-foreground">{t("hosting")}</p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-xl font-bold mb-4">{t("contactFormTitle")}</h2>
                                <p className="text-muted-foreground">{t("contactForm")}</p>
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </div>
    )
}
