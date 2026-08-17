"use client"

import { useRef, useState } from "react"
import { useTranslations } from "next-intl"
import { Copy, Check, Mail, MessageCircle } from "lucide-react"
import { CONTACT_EMAIL, WHATSAPP_NUMBER } from "@/lib/site"

type Channel = "whatsapp" | "mail"

const typeOptionKeys = ["launch", "redesign", "landing", "ui", "other"] as const

/**
 * Betreff- und Textlaenge bewusst begrenzt: mailto:-URLs werden von manchen
 * Mailprogrammen oberhalb von etwa 2000 Zeichen abgeschnitten.
 */
const SUBJECT_MAX = 150

/**
 * Das Formular versendet nichts selbst. Es baut aus den Eingaben eine
 * Nachricht und oeffnet damit WhatsApp oder das Mailprogramm des Besuchers.
 * Abgeschickt wird dort — deshalb gibt es hier bewusst keinen
 * "Gesendet"-Zustand, den wir gar nicht kennen koennen.
 */
export function ContactForm() {
    const t = useTranslations("contactPage.form")
    const formRef = useRef<HTMLFormElement>(null)
    const [opened, setOpened] = useState<Channel | null>(null)
    const [copied, setCopied] = useState(false)

    /** Liest das Formular aus, erzwingt vorher die native Validierung. */
    function collect() {
        const form = formRef.current
        if (!form || !form.reportValidity()) return null

        const data = new FormData(form)
        const name = String(data.get("name") ?? "").trim()
        const email = String(data.get("email") ?? "").trim()
        const company = String(data.get("company") ?? "").trim()
        const type = String(data.get("type") ?? "other")
        const message = String(data.get("message") ?? "").trim()

        const typeLabel = t(`typeOptions.${type}`)
        const subject = (company ? `${typeLabel} · ${company}` : typeLabel).slice(0, SUBJECT_MAX)

        const lines = [
            t("templateIntro"),
            "",
            `${t("labelName")}: ${name}`,
            `${t("labelEmail")}: ${email}`,
        ]
        if (company) lines.push(`${t("labelCompany")}: ${company}`)
        lines.push(`${t("labelType")}: ${typeLabel}`, "", `${t("labelMessage")}:`, message)

        return { subject, body: lines.join("\n") }
    }

    function handleWhatsapp() {
        const payload = collect()
        if (!payload) return
        window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(payload.body)}`,
            "_blank",
            "noopener,noreferrer",
        )
        setOpened("whatsapp")
    }

    function handleMail() {
        const payload = collect()
        if (!payload) return
        /* location statt window.open — sonst bleibt ein leeres Tab zurueck. */
        window.location.href =
            `mailto:${CONTACT_EMAIL}` +
            `?subject=${encodeURIComponent(payload.subject)}` +
            `&body=${encodeURIComponent(payload.body)}`
        setOpened("mail")
    }

    async function handleCopy() {
        const payload = collect()
        if (!payload) return
        try {
            await navigator.clipboard.writeText(payload.body)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2500)
        } catch {
            /* Clipboard gesperrt — der Text steht im Formular weiterhin bereit. */
        }
    }

    const fieldClass =
        "w-full rounded-xl border border-border-soft bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"

    return (
        <form ref={formRef} onSubmit={(e) => e.preventDefault()} className="space-y-6">
            {/* Name + E-Mail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary">
                        {t("labelName")}
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        minLength={2}
                        maxLength={80}
                        placeholder={t("placeholderName")}
                        className={fieldClass}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                        {t("labelEmail")}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={120}
                        placeholder={t("placeholderEmail")}
                        className={fieldClass}
                    />
                </div>
            </div>

            {/* Unternehmen + Projektart */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-text-secondary">
                        {t("labelCompany")}
                    </label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        maxLength={80}
                        placeholder={t("placeholderCompany")}
                        className={fieldClass}
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="type" className="block text-sm font-medium text-text-secondary">
                        {t("labelType")}
                    </label>
                    <select id="type" name="type" className={fieldClass}>
                        {typeOptionKeys.map((key) => (
                            <option key={key} value={key}>
                                {t(`typeOptions.${key}`)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Nachricht */}
            <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary">
                    {t("labelMessage")}
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    minLength={5}
                    maxLength={1500}
                    rows={5}
                    placeholder={t("placeholderMessage")}
                    className={`${fieldClass} resize-none`}
                />
            </div>

            <p className="text-xs text-text-muted leading-relaxed">{t("privacy")}</p>

            {/* Kanaele */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    type="button"
                    onClick={handleWhatsapp}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-accent text-surface text-sm font-semibold hover:bg-[var(--nv-accent-hover)] transition-all duration-200 active:scale-[0.98]"
                >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    {t("sendWhatsapp")}
                </button>
                <button
                    type="button"
                    onClick={handleMail}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full border border-border-strong text-text-primary text-sm font-semibold hover:border-accent/50 hover:text-accent transition-all duration-200 active:scale-[0.98]"
                >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {t("sendMail")}
                </button>
            </div>

            {/* Bestaetigung, dass die Nachricht nur geoeffnet wurde */}
            {opened && (
                <p
                    className="rounded-xl border border-accent/25 bg-accent-soft px-4 py-3 text-sm leading-6 text-text-secondary"
                    role="status"
                >
                    {opened === "whatsapp" ? t("openedWhatsapp") : t("openedMail")}
                </p>
            )}

            {/* Fallback fuer Rechner ohne Mailprogramm */}
            <div className="border-t border-border-soft pt-5">
                <p className="text-xs leading-6 text-text-muted">
                    {t("copyHint")}{" "}
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        className="font-medium text-text-secondary underline decoration-accent/50 underline-offset-2 hover:text-accent"
                    >
                        {CONTACT_EMAIL}
                    </a>
                </p>
                <button
                    type="button"
                    onClick={handleCopy}
                    className="mt-3 inline-flex items-center gap-2 rounded-full border border-border-soft px-4 py-2 text-xs font-medium text-text-secondary hover:border-accent/50 hover:text-accent transition-colors"
                >
                    {copied ? (
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                        <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {copied ? t("copied") : t("copyButton")}
                </button>
            </div>
        </form>
    )
}
