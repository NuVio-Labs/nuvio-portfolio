"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations } from "next-intl"
import { Check, Copy, MessageCircle } from "lucide-react"
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/site"
import { trackEvent } from "@/lib/analytics"

/** Schluessel, unter dem das Formular die fertige Nachricht ablegt. */
export const SENT_MESSAGE_KEY = "nuvio:contact-message"

/**
 * Inhalt der Danke-Seite.
 *
 * Die Nachricht wird aus dem sessionStorage geholt: Wenn das Mailprogramm
 * nicht aufgegangen ist — auf Desktops ohne eingerichteten Client passiert
 * schlicht nichts — waere der getippte Text sonst verloren.
 *
 * Der Eintrag enthaelt personenbezogene Daten (Name, E-Mail, Nachricht) und
 * wird deshalb direkt nach dem Lesen entfernt: Die Nachricht lebt danach nur
 * noch im React-State dieser Seitenansicht. Folge: Nach einem Neuladen der
 * Bestaetigungsseite wird der Rueckfall-Bereich nicht mehr angezeigt.
 */
export function ContactSent() {
    const t = useTranslations("contactPage.sent")
    const params = useSearchParams()
    const via = params.get("via") === "whatsapp" ? "whatsapp" : "mail"

    const [message, setMessage] = React.useState("")
    const [copied, setCopied] = React.useState(false)

    React.useEffect(() => {
        const stored = window.sessionStorage.getItem(SENT_MESSAGE_KEY)
        // Nur bei vorhandenem Eintrag: der doppelte Effect-Aufruf im
        // React-Strict-Mode findet ihn bereits geloescht vor und darf den
        // uebernommenen Text nicht mit "" ueberschreiben.
        if (stored === null) return
        setMessage(stored)
        window.sessionStorage.removeItem(SENT_MESSAGE_KEY)
    }, [])

    /*
     * Button mit window.open statt <a href>: Die Ziel-URL enthaelt die
     * komplette Nachricht (Name, E-Mail, Text). Echte Link-Klicks erfasst
     * Google Analytics per "Outbound Clicks" samt vollstaendiger URL — im
     * Test landeten Name und Nachricht so bei Google. window.open wird davon
     * nicht erfasst (gleiches Vorgehen wie im Kontaktformular).
     */
    function handleRetryWhatsapp() {
        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
            "_blank",
            "noopener,noreferrer",
        )
    }

    /*
     * Kein Erfolgssignal, nur ein Seitenaufruf: ob WhatsApp/Mail-Client
     * tatsaechlich geoeffnet ist oder dort etwas versendet wurde, laesst
     * sich technisch nicht feststellen (siehe contact-form.tsx). Diese Seite
     * wird unabhaengig davon erreicht — das Event misst also ausschliesslich
     * "Bestaetigungsseite aufgerufen", keine Lead-Conversion.
     */
    React.useEffect(() => {
        trackEvent("contact_sent_page_view", { channel: via === "whatsapp" ? "whatsapp" : "email" })
    }, [via])

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

                        <button
                            type="button"
                            onClick={handleRetryWhatsapp}
                            className="inline-flex items-center gap-2 rounded-full border border-border-soft px-4 py-2.5 text-[13px] font-medium text-text-secondary transition-colors hover:border-accent/50 hover:text-accent"
                        >
                            <MessageCircle className="h-4 w-4" aria-hidden="true" />
                            {t("retryWhatsapp")}
                        </button>
                    </div>

                    <p className="mt-4 text-xs leading-6 text-text-muted">
                        {t("orMail")}{" "}
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            data-track="email_click"
                            data-track-location="contact-sent-fallback"
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
