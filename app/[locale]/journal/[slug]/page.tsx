import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypeSlug from "rehype-slug"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { routing } from "@/i18n/routing"
import { SITE_URL } from "@/lib/site"
import {
    extractToc,
    getArticleLocales,
    getJournalArticle,
    getJournalArticles,
    getRelatedArticles,
    toOgLocale,
} from "@/lib/journal"
import { journalMdxComponents } from "@/components/journal/mdx-components"
import { JournalArticleHeader } from "@/components/journal/journal-article-header"
import { JournalImage } from "@/components/journal/journal-image"
import { JournalBreadcrumb } from "@/components/journal/journal-breadcrumb"
import { JournalCard } from "@/components/journal/journal-card"
import { JournalCta } from "@/components/journal/journal-cta"
import { JournalStructuredData } from "@/components/journal/journal-structured-data"
import { JournalToc, TOC_MIN_HEADINGS } from "@/components/journal/journal-toc"
import { ReadingProgress } from "@/components/journal/reading-progress"

type Params = { locale: string; slug: string }

/** Alle vorhandenen Sprache/Slug-Kombinationen statisch vorrendern. */
export async function generateStaticParams() {
    const params = await Promise.all(
        routing.locales.map(async (locale) => {
            const articles = await getJournalArticles(locale)
            return articles.map((article) => ({ locale, slug: article.slug }))
        }),
    )
    return params.flat()
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { locale, slug } = await params
    const article = await getJournalArticle(locale, slug)
    if (!article) return {}

    const { meta } = article
    const url = `${SITE_URL}/${locale}/journal/${slug}`
    const image = meta.image ? `${SITE_URL}${meta.image}` : undefined

    /* hreflang nur fuer Sprachen, in denen der Artikel wirklich existiert. */
    const available = await getArticleLocales(slug, routing.locales)
    const languages = Object.fromEntries(
        available.map((code) => [code, `${SITE_URL}/${code}/journal/${slug}`]),
    )

    return {
        title: meta.title,
        description: meta.description,
        keywords: meta.tags,
        authors: [{ name: meta.author, url: SITE_URL }],
        alternates: { canonical: url, languages },
        openGraph: {
            type: "article",
            url,
            siteName: "NuVioLabs",
            locale: toOgLocale(locale),
            title: meta.title,
            description: meta.description,
            publishedTime: meta.date,
            modifiedTime: meta.updatedAt ?? meta.date,
            authors: [meta.author],
            tags: meta.tags,
            ...(image ? { images: [{ url: image, alt: meta.imageAlt ?? meta.title }] } : {}),
        },
        twitter: {
            card: image ? "summary_large_image" : "summary",
            title: meta.title,
            description: meta.description,
            ...(image ? { images: [image] } : {}),
        },
    }
}

export default async function JournalArticlePage({ params }: { params: Promise<Params> }) {
    const { locale, slug } = await params
    setRequestLocale(locale)

    const article = await getJournalArticle(locale, slug)
    if (!article) notFound()

    const { meta, body } = article
    const toc = extractToc(body)
    const hasToc = toc.length >= TOC_MIN_HEADINGS
    const related = await getRelatedArticles(meta)
    const t = await getTranslations("journal")

    return (
        <div className="pt-20 md:pt-24">
            <ReadingProgress />

            <JournalStructuredData
                meta={meta}
                breadcrumb={{
                    home: t("breadcrumb.home"),
                    journal: t("nav"),
                    category: t(`categories.${meta.category}`),
                }}
            />

            <div className="nv-container py-12 md:py-16">
                <div
                    className={
                        hasToc
                            ? "mx-auto grid max-w-[1000px] gap-12 lg:grid-cols-[minmax(0,1fr)_200px] lg:gap-16"
                            : "mx-auto max-w-[720px]"
                    }
                >
                    <article className="min-w-0 max-w-[720px]">
                        <JournalBreadcrumb category={meta.category} />
                        <JournalArticleHeader meta={meta} />

                        {/* Editorial-Visual. priority, weil es das LCP-Element ist. */}
                        {meta.hero && (
                            <JournalImage
                                src={meta.hero}
                                alt={meta.heroAlt ?? ""}
                                width={meta.heroWidth}
                                height={meta.heroHeight}
                                priority
                            />
                        )}

                        {hasToc && (
                            <div className="mt-10 lg:hidden">
                                <JournalToc entries={toc} variant="collapsible" />
                            </div>
                        )}

                        {/* Artikelinhalt */}
                        <div className="mt-6">
                            <MDXRemote
                                source={body}
                                components={journalMdxComponents}
                                options={{
                                    mdxOptions: {
                                        remarkPlugins: [remarkGfm],
                                        rehypePlugins: [rehypeSlug],
                                    },
                                }}
                            />
                        </div>

                        {meta.tags.length > 0 && (
                            <ul className="mt-12 flex flex-wrap gap-2 border-t border-border-soft pt-8">
                                {meta.tags.map((tag) => (
                                    <li
                                        key={tag}
                                        className="rounded-full border border-border-soft bg-surface-soft px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <JournalCta />

                        {related.length > 0 && (
                            <section aria-labelledby="related-heading" className="mt-20">
                                <h2
                                    id="related-heading"
                                    className="font-heading text-[1.35rem] font-semibold text-text-primary"
                                >
                                    {t("related")}
                                </h2>
                                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                                    {related.map((item) => (
                                        <JournalCard key={item.slug} meta={item} />
                                    ))}
                                </div>
                            </section>
                        )}

                        <div className="mt-16 border-t border-border-soft pt-8">
                            <Link
                                href="/journal"
                                className="inline-flex items-center gap-2 text-sm font-medium text-text-muted transition-colors hover:text-accent"
                            >
                                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                                {t("backToIndex")}
                            </Link>
                        </div>
                    </article>

                    {hasToc && (
                        <aside className="hidden lg:block">
                            <JournalToc entries={toc} variant="sidebar" />
                        </aside>
                    )}
                </div>
            </div>
        </div>
    )
}
