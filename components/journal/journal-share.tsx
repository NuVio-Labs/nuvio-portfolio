"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Check, Link2, Linkedin, Share2 } from "lucide-react"

interface JournalShareProps {
    title: string
    /** Absolute URL des Artikels. */
    url: string
    /** Wird rechts neben den Teilen-Buttons gezeigt (Like-Zaehler). */
    children?: React.ReactNode
}

const BUTTON_CLASS =
    "inline-flex items-center gap-2 rounded-full border border-border-soft px-4 py-2.5 text-[13px] font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"

/**
 * Teilen ohne Fremdskripte und ohne Tracking.
 *
 * Auf Geraeten mit Web Share API das System-Menue, sonst Link kopieren
 * und ein LinkedIn-Link. Die Verfuegbarkeitspruefung laeuft erst nach dem
 * Mounten, weil der Server navigator.share nicht kennt und das Markup
 * sonst beim Hydrieren auseinanderliefe.
 */
export function JournalShare({ title, url, children }: JournalShareProps) {
    const t = useTranslations("journal.share")
    const [canShare, setCanShare] = React.useState(false)
    const [copied, setCopied] = React.useState(false)

    React.useEffect(() => {
        setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function")
    }, [])

    async function handleNativeShare() {
        try {
            await navigator.share({ title, url })
        } catch {
            /* Vom Nutzer abgebrochen — kein Fehlerfall. */
        }
    }

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(url)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2500)
        } catch {
            /* Clipboard gesperrt: der Link steht in der Adresszeile. */
        }
    }

    return (
        <section aria-labelledby="share-heading" className="mt-12 border-t border-border-soft pt-8">
            <h2
                id="share-heading"
                className="mb-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-muted"
            >
                {t("label")}
            </h2>

            {children && <div className="mb-5">{children}</div>}

            <div className="flex flex-wrap gap-3">
                {canShare && (
                    <button type="button" onClick={handleNativeShare} className={BUTTON_CLASS}>
                        <Share2 className="h-4 w-4" aria-hidden="true" />
                        {t("native")}
                    </button>
                )}

                <button type="button" onClick={handleCopy} className={BUTTON_CLASS}>
                    {copied ? (
                        <Check className="h-4 w-4" aria-hidden="true" />
                    ) : (
                        <Link2 className="h-4 w-4" aria-hidden="true" />
                    )}
                    {copied ? t("copied") : t("copy")}
                </button>

                <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={BUTTON_CLASS}
                >
                    <Linkedin className="h-4 w-4" aria-hidden="true" />
                    {t("linkedin")}
                </a>
            </div>

            {/* Rueckmeldung fuer Screenreader, ohne den Button-Text zu doppeln. */}
            <p className="sr-only" role="status">
                {copied ? t("copied") : ""}
            </p>
        </section>
    )
}
