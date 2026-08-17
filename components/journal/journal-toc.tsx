import { getTranslations } from "next-intl/server"
import { cn } from "@/lib/utils"
import { TocLinks } from "@/components/journal/toc-links"
import type { TocEntry } from "@/lib/journal"

/** Unter dieser Anzahl lohnt ein Inhaltsverzeichnis nicht. */
export const TOC_MIN_HEADINGS = 3

/** Statische Liste fuer die mobile Variante — ohne Client-JavaScript. */
function StaticTocList({ entries, className }: { entries: TocEntry[]; className?: string }) {
    return (
        <ol className={cn("space-y-3", className)}>
            {entries.map((entry) => (
                <li key={entry.id}>
                    <a
                        href={`#${entry.id}`}
                        className={cn(
                            "block transition-colors hover:text-accent",
                            entry.level === 2
                                ? "text-[13px] leading-[1.45] text-text-secondary"
                                : "pl-4 text-[12px] leading-[1.4] text-text-muted",
                        )}
                    >
                        {entry.text}
                    </a>
                </li>
            ))}
        </ol>
    )
}

const TOC_TITLE_CLASS =
    "text-[12px] font-semibold uppercase tracking-[0.16em] text-text-primary"

interface JournalTocProps {
    entries: TocEntry[]
    /**
     * "collapsible" steht oberhalb des Artikels (mobil), "sidebar" sticky
     * daneben (ab lg). Die Seite rendert beide Varianten an der jeweils
     * richtigen Stelle im DOM und blendet die andere per CSS aus.
     */
    variant: "collapsible" | "sidebar"
}

/** Inhaltsverzeichnis ohne JavaScript — natives <details> bzw. sticky Spalte. */
export async function JournalToc({ entries, variant }: JournalTocProps) {
    if (entries.length < TOC_MIN_HEADINGS) return null

    const t = await getTranslations("journal")

    if (variant === "collapsible") {
        return (
            <details className="group rounded-2xl border border-border-strong bg-surface-strong px-5 py-4">
                <summary
                    className={cn(
                        "cursor-pointer list-none [&::-webkit-details-marker]:hidden",
                        TOC_TITLE_CLASS,
                    )}
                >
                    <span className="flex items-center justify-between gap-4">
                        {t("toc.title")}
                        <span
                            className="text-text-muted transition-transform group-open:rotate-180"
                            aria-hidden="true"
                        >
                            ▾
                        </span>
                    </span>
                </summary>
                <StaticTocList entries={entries} className="mt-4" />
            </details>
        )
    }

    return (
        <nav aria-labelledby="toc-heading" className="sticky top-28">
            <p id="toc-heading" className={cn("mb-4", TOC_TITLE_CLASS)}>
                {t("toc.title")}
            </p>
            <TocLinks entries={entries} />
        </nav>
    )
}
