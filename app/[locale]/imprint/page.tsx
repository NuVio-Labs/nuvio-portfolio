import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { setRequestLocale } from "next-intl/server"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"

export default function ImprintPage({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale)
    const t = useTranslations("legal.imprint")

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="py-24 md:py-32">
                    <Container className="max-w-3xl">
                        <div className="mb-16">
                            <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">{t("title")}</h1>
                        </div>

                        <div className="prose prose-neutral dark:prose-invert prose-lg max-w-none">
                            <div className="mb-12">
                                <h2 className="text-xl font-bold mb-4">{t("provider")}</h2>
                                <p className="whitespace-pre-line text-muted-foreground">{t("address")}</p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-xl font-bold mb-4">{t("contactTitle")}</h2>
                                <p className="whitespace-pre-line text-muted-foreground">{t("contact")}</p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-xl font-bold mb-4">{t("vatTitle")}</h2>
                                <p className="whitespace-pre-line text-muted-foreground">{t("vat")}</p>
                            </div>

                            <div className="mb-12">
                                <h2 className="text-xl font-bold mb-4">{t("disputeTitle")}</h2>
                                <p className="whitespace-pre-line text-muted-foreground">{t("dispute")}</p>
                            </div>
                        </div>
                    </Container>
                </section>
            </main>
        </div>
    )
}
