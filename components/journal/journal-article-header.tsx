import { getTranslations } from "next-intl/server"
import { formatArticleDate, type JournalMeta } from "@/lib/journal"

/**
 * Editorial-Header: ruhig, ohne Marketing-Hero. Kategorie, H1, Lead und
 * eine schmale Metazeile.
 */
export async function JournalArticleHeader({ meta }: { meta: JournalMeta }) {
    const t = await getTranslations("journal")

    return (
        <header className="mt-8">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {t(`categories.${meta.category}`)}
            </p>

            <h1
                className="mt-5 text-balance font-heading font-semibold leading-[1.1] tracking-tight text-text-primary"
                style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
            >
                {meta.title}
            </h1>

            <p className="mt-6 text-[1.15rem] leading-[1.7] text-text-muted">{meta.description}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-2 gap-y-1 border-t border-border-soft pt-5 text-[13px] text-text-muted">
                <time dateTime={meta.date}>{formatArticleDate(meta.date, meta.locale)}</time>
                <span aria-hidden="true">·</span>
                <span>{t("readingTime", { minutes: meta.readingMinutes })}</span>

                {meta.updatedAt && meta.updatedAt !== meta.date && (
                    <>
                        <span aria-hidden="true">·</span>
                        <span>
                            {t("updatedOn")}{" "}
                            <time dateTime={meta.updatedAt}>
                                {formatArticleDate(meta.updatedAt, meta.locale)}
                            </time>
                        </span>
                    </>
                )}
            </div>
        </header>
    )
}
