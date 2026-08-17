import type { Metadata } from "next"
import { Suspense } from "react"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { ArrowLeft } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { ContactSent } from "@/components/sections/contact-sent"

type Params = { locale: string }

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "contactPage.sent" })

    return {
        title: t("metaTitle"),
        /* Bestaetigungsseite gehoert nicht in den Index. */
        robots: { index: false, follow: true },
    }
}

export default async function ContactSentPage({ params }: { params: Promise<Params> }) {
    const { locale } = await params
    setRequestLocale(locale)
    const t = await getTranslations("contactPage.sent")

    return (
        <div className="pt-20 md:pt-24">
            <SectionWrapper>
                <div className="nv-container">
                    {/* useSearchParams braucht eine Suspense-Grenze. */}
                    <Suspense fallback={null}>
                        <ContactSent />
                    </Suspense>

                    <div className="mt-14 border-t border-border-soft pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent"
                        >
                            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                            {t("backHome")}
                        </Link>
                    </div>
                </div>
            </SectionWrapper>
        </div>
    )
}
