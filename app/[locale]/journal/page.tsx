import type { Metadata } from "next"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
import { SITE_URL } from "@/lib/site"
import { getJournalArticles, toOgLocale } from "@/lib/journal"
import { JournalCard } from "@/components/journal/journal-card"
import { SectionWrapper } from "@/components/ui/section-wrapper"

type Params = { locale: string }

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "journal.index" })
    const url = `${SITE_URL}/${locale}/journal`

    return {
        title: t("metaTitle"),
        description: t("metaDescription"),
        alternates: {
            canonical: url,
            languages: Object.fromEntries(
                routing.locales.map((code) => [code, `${SITE_URL}/${code}/journal`]),
            ),
        },
        openGraph: {
            type: "website",
            url,
            siteName: "NuVioLabs",
            locale: toOgLocale(locale),
            title: t("metaTitle"),
            description: t("metaDescription"),
        },
        twitter: { card: "summary", title: t("metaTitle"), description: t("metaDescription") },
    }
}

export default async function JournalIndexPage({ params }: { params: Promise<Params> }) {
    const { locale } = await params
    setRequestLocale(locale)

    const articles = await getJournalArticles(locale)
    const t = await getTranslations("journal")

    return (
        <div className="pt-20 md:pt-24">
            <SectionWrapper>
                <div className="nv-container">
                    <div className="max-w-2xl">
                        <p className="text-xs font-semibold uppercase tracking-widest text-accent">
                            {t("index.eyebrow")}
                        </p>
                        <h1
                            className="mb-5 mt-4 text-balance font-heading font-semibold text-text-primary"
                            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                        >
                            {t("index.headline")}
                        </h1>
                        <p className="text-lg leading-relaxed text-text-muted">{t("index.subline")}</p>
                    </div>
                </div>
            </SectionWrapper>

            <SectionWrapper light>
                <div className="nv-container">
                    {articles.length === 0 ? (
                        <p className="max-w-xl text-text-muted">{t("index.empty")}</p>
                    ) : (
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {articles.map((meta) => (
                                <JournalCard key={meta.slug} meta={meta} />
                            ))}
                        </div>
                    )}
                </div>
            </SectionWrapper>
        </div>
    )
}
