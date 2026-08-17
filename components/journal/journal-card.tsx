import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { formatArticleDate, type JournalMeta } from "@/lib/journal"

/**
 * Artikel-Karte fuer die Journal-Uebersicht und "Weiterlesen".
 * Bewusst textlastig statt bildlastig — Artikel haben nicht zwingend ein Bild.
 */
export async function JournalCard({ meta }: { meta: JournalMeta }) {
    const t = await getTranslations("journal")

    return (
        <article className="group h-full">
            <Link
                href={`/journal/${meta.slug}`}
                className="flex h-full flex-col rounded-2xl border border-border-soft bg-surface p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-md"
            >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                    {t(`categories.${meta.category}`)}
                </p>

                <h3 className="mt-4 font-heading text-lg font-semibold leading-snug text-text-primary">
                    {meta.title}
                </h3>

                <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-text-muted">
                    {meta.description}
                </p>

                <p className="mt-5 flex flex-wrap items-center gap-2 border-t border-border-subtle pt-4 text-[12px] text-text-muted">
                    <time dateTime={meta.date}>{formatArticleDate(meta.date, meta.locale)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{t("readingTime", { minutes: meta.readingMinutes })}</span>
                </p>
            </Link>
        </article>
    )
}
