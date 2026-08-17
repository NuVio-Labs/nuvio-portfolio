"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Check, Copy, MessageCircle } from "lucide-react"
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/site"

/** Schluessel, unter dem das Formular die fertige Nachricht ablegt. */
export const SENT_MESSAGE_KEY = "nuvio:contact-message"

/**
 * Inhalt der Danke-Seite.
 *
 * Die Nachricht wird aus dem sessionStorage geholt: Wenn das Mailprogramm
 * nicht aufgegangen ist — auf Desktops ohne eingerichteten Client passiert
 * schlicht nichts — waere der getippte Text sonst verloren.
 */
export function ContactSent() {
    const t = useTranslations("contactPage.sent")
    const params = useSearchParams()
    const via = params.get("via") === "whatsapp" ? "whatsapp" : "mail"

    const [message, setMessage] = React.useState("")
    const [copied, setCopied] = React.useState(false)

    React.useEffect(() => {
        setMessage(window.sessionStorage.getItem(SENT_MESSAGE_KEY) ?? "")
    }, [])

    async function handleCopy() {
        try {
            await navigator.clipboard.writeText(message)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2500)
        } catch {
            /* Clipboard gesperrt — der Text steht unten im Feld. */
        }
    }

    return (
        <div className="max-w-2xl">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent-soft">
                <Check className="h-6 w-6 text-accent" aria-hidden="true" />
            </div>

            <h1
                className="mb-5 font-heading font-semibold text-text-primary"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
            >
                {t("title")}
            </h1>

            <p className="text-lg leading-relaxed text-text-muted">
                {via === "whatsapp" ? t("introWhatsapp") : t("introMail")}
            </p>

            <p className="mt-4 rounded-xl border border-accent/25 bg-accent-soft px-4 py-3 text-sm leading-6 text-text-secondary">
                {t("reminder")}
            </p>

            {/* Rettungsanker, falls der Kanal nicht aufgegangen ist */}
            {message && (
                <section className="mt-10 border-t border-border-soft pt-8">
                    <h2 className="mb-2 font-heading text-lg font-semibold text-text-primary">
                        {t("fallbackTitle")}
                    </h2>
                    <p className="text-sm leading-6 text-text-muted">{t("fallbackText")}</p>

                    <pre className="mt-4 max-h-56 overflow-auto whitespace-pre-wrap rounded-2xl border border-border-strong bg-surface-raised p-5 font-body text-[13px] leading-6 text-text-secondary">
                        {message}
                    </pre>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={handleCopy}
                            className="inline-flex items-center gap-2 rounded-full border border-border-soft px-4 py-2.5 text-[13px] font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
                        >
                            {copied ? (
                                <Check className="h-4 w-4" aria-hidden="true" />
                            ) : (
                                <Copy className="h-4 w-4" aria-hidden="true" />
                            )}
                            {copied ? t("copied") : t("copyButton")}
                        </button>

                        <a
                            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-border-soft px-4 py-2.5 text-[13px] font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            {t("retryWhatsapp")}
                        </a>
                    </div>

                    <p className="mt-4 text-xs leading-6 text-text-muted">
                        {t("orMail")}{" "}
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            className="font-medium text-text-secondary underline decoration-accent/50 underline-offset-2 hover:text-accent"
                        >
                            {CONTACT_EMAIL}
                        </a>
                    </p>
                </section>
            )}
        </div>
    )
}
