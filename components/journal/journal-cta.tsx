import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"

/**
 * Abschluss-CTA unter dem Artikel.
 *
 * Das Ziel kommt aus den Messages (journal.cta.href), damit ein spaeterer
 * Website-Check nur dort umgestellt werden muss und nicht im Markup.
 */
export async function JournalCta() {
    const t = await getTranslations("journal.cta")
    const href = t("href")

    return (
        <aside className="mt-20 rounded-[2rem] border border-border-soft bg-surface p-8 sm:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
                {t("eyebrow")}
            </p>

            <p className="mt-5 max-w-[24ch] font-heading text-[1.5rem] font-semibold leading-tight text-text-primary sm:text-[1.85rem]">
                {t("headline")}
            </p>

            <p className="mt-4 max-w-[52ch] text-[15px] leading-7 text-text-muted">{t("subline")}</p>

            <Link
                href={href}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-semibold text-surface transition duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98]"
            >
                {t("button")}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
        </aside>
    )
}
