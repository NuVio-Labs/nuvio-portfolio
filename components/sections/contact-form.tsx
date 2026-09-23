"use client"

import { useRef, useState, type SubmitEvent } from "react"
import { useLocale, useTranslations } from "next-intl"
import { AlertCircle, Check, Copy, Loader2, Send } from "lucide-react"
import { Link } from "@/i18n/navigation"
import { CONTACT_EMAIL } from "@/lib/site"
import { trackEvent } from "@/lib/analytics"
import {
    CONTACT_LIMITS,
    CONTACT_TYPES,
    type ContactErrorCode,
    type ContactField,
    type ContactRequest,
    type ContactResponse,
} from "@/lib/contact"

/** NETWORK = Server gar nicht erreicht; nur clientseitig. */
type ErrorCode = Exclude<ContactErrorCode, "FORBIDDEN"> | "NETWORK"

type Status =
    | { kind: "idle" }
    | { kind: "submitting" }
    | { kind: "success" }
    | { kind: "error"; code: ErrorCode; fields: ContactField[] }

const REQUEST_TIMEOUT_MS = 15_000
const EVENT_CONTEXT = { location: "contact-form" } as const

/**
 * Kontaktformular mit direktem Versand ueber /api/contact.
 *
 * Erfolg wird nur angezeigt, wenn der Server die Anfrage validiert und der
 * Mailprovider sie angenommen hat. Bei Fehlern bleiben alle Eingaben
 * erhalten. Formularinhalte gehen nie an Analytics — Events tragen nur
 * technischen Kontext.
 */
export function ContactForm() {
    const t = useTranslations("contactPage.form")
    const locale = useLocale()
    const formRef = useRef<HTMLFormElement>(null)
    const errorRef = useRef<HTMLDivElement>(null)
    const successRef = useRef<HTMLDivElement>(null)
    const formStarted = useRef(false)
    const [status, setStatus] = useState<Status>({ kind: "idle" })
    const [copied, setCopied] = useState(false)

    const submitting = status.kind === "submitting"
    const invalid = status.kind === "error" ? status.fields : []

    /** Erste Interaktion mit dem Formular — nur einmal pro Seitenaufruf gemeldet. */
    function handleFormStart() {
        if (formStarted.current) return
        formStarted.current = true
        trackEvent("contact_form_start", EVENT_CONTEXT)
    }

    function readForm(form: HTMLFormElement): ContactRequest {
        const data = new FormData(form)
        const value = (key: string) => String(data.get(key) ?? "")
        return {
            name: value("name"),
            email: value("email"),
            company: value("company"),
            type: value("type") || "other",
            message: value("message"),
            locale,
            website: value("website"),
        }
    }

    function fail(code: ErrorCode, fields: ContactField[] = []) {
        setStatus({ kind: "error", code, fields })
        trackEvent("contact_form_error", { ...EVENT_CONTEXT, reason: code })
        window.requestAnimationFrame(() => errorRef.current?.focus())
    }

    /* Die native Validierung laeuft vor onSubmit; hier kommen nur gueltige Formulare an. */
    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault()
        if (submitting || status.kind === "success") return
        const form = event.currentTarget
        const payload = readForm(form)

        setStatus({ kind: "submitting" })
        trackEvent("contact_form_submit", EVENT_CONTEXT)

        const controller = new AbortController()
        const timeout = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS)
        let response: Response
        try {
            response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                signal: controller.signal,
            })
        } catch {
            fail("NETWORK")
            return
        } finally {
            window.clearTimeout(timeout)
        }

        let body: ContactResponse | null = null
        try {
            body = (await response.json()) as ContactResponse
        } catch {
            body = null
        }

        if (response.ok && body?.success === true) {
            form.reset()
            setStatus({ kind: "success" })
            trackEvent("contact_form_accepted", EVENT_CONTEXT)
            window.requestAnimationFrame(() => successRef.current?.focus())
            return
        }

        if (body && !body.success && body.error === "INVALID_INPUT") fail("INVALID_INPUT", body.fields ?? [])
        else if (body && !body.success && body.error === "RATE_LIMITED") fail("RATE_LIMITED")
        else fail("SEND_FAILED")
    }

    /** Fallback bei Fehlern: Nachricht lokal kopieren, um sie selbst zu mailen. */
    async function handleCopy() {
        const form = formRef.current
        if (!form) return
        const p = readForm(form)
        const typeKey = (CONTACT_TYPES as readonly string[]).includes(p.type) ? p.type : "other"
        const lines = [t("templateIntro"), "", `${t("labelName")}: ${p.name}`, `${t("labelEmail")}: ${p.email}`]
        if (p.company) lines.push(`${t("labelCompany")}: ${p.company}`)
        lines.push(`${t("labelType")}: ${t(`typeOptions.${typeKey}`)}`, "", `${t("labelMessage")}:`, p.message)
        try {
            await navigator.clipboard.writeText(lines.join("\n"))
            setCopied(true)
            window.setTimeout(() => setCopied(false), 2500)
        } catch {
            /* Clipboard gesperrt — die Eingaben stehen weiterhin im Formular. */
        }
    }

    const fieldClass =
        "w-full rounded-xl border border-border-soft bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors aria-[invalid=true]:border-destructive disabled:opacity-60"

    /** aria-Attribute fuer ein Feld, das der Server als ungueltig gemeldet hat. */
    function fieldState(field: ContactField) {
        const isInvalid = invalid.includes(field)
        return {
            "aria-invalid": isInvalid || undefined,
            "aria-describedby": isInvalid ? `${field}-error` : undefined,
        }
    }

    function fieldError(field: ContactField) {
        if (!invalid.includes(field)) return null
        return (
            <p id={`${field}-error`} className="text-xs font-medium text-text-secondary">
                {t(`fieldErrors.${field}`)}
            </p>
        )
    }

    if (status.kind === "success") {
        return (
            <div
                ref={successRef}
                tabIndex={-1}
                role="status"
                className="scroll-mt-28 rounded-2xl border border-accent/30 bg-accent-soft p-6 focus:outline-none sm:p-8"
            >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-accent/30 bg-surface">
                    <Check className="h-5 w-5 text-accent" aria-hidden="true" />
                </div>
                <h2 className="mb-3 font-heading text-xl font-semibold text-text-primary">{t("successTitle")}</h2>
                <p className="text-sm leading-6 text-text-secondary">{t("successText")}</p>
            </div>
        )
    }

    return (
        <form
            ref={formRef}
            onSubmit={handleSubmit}
            onFocus={handleFormStart}
            aria-busy={submitting}
            className="relative space-y-6"
        >
            {/* Honeypot: fuer Menschen und Screenreader unsichtbar, Bots fuellen es. */}
            <div aria-hidden="true" className="absolute -left-[10000px] top-auto h-px w-px overflow-hidden">
                <label htmlFor="website">{t("honeypotLabel")}</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
            </div>

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
                        autoComplete="name"
                        minLength={CONTACT_LIMITS.nameMin}
                        maxLength={CONTACT_LIMITS.nameMax}
                        placeholder={t("placeholderName")}
                        readOnly={submitting}
                        className={fieldClass}
                        {...fieldState("name")}
                    />
                    {fieldError("name")}
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
                        autoComplete="email"
                        maxLength={CONTACT_LIMITS.emailMax}
                        placeholder={t("placeholderEmail")}
                        readOnly={submitting}
                        className={fieldClass}
                        {...fieldState("email")}
                    />
                    {fieldError("email")}
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
                        autoComplete="organization"
                        maxLength={CONTACT_LIMITS.companyMax}
                        placeholder={t("placeholderCompany")}
                        readOnly={submitting}
                        className={fieldClass}
                        {...fieldState("company")}
                    />
                    {fieldError("company")}
                </div>
                <div className="space-y-2">
                    <label htmlFor="type" className="block text-sm font-medium text-text-secondary">
                        {t("labelType")}
                    </label>
                    <select id="type" name="type" className={fieldClass} {...fieldState("type")}>
                        {CONTACT_TYPES.map((key) => (
                            <option key={key} value={key}>
                                {t(`typeOptions.${key}`)}
                            </option>
                        ))}
                    </select>
                    {fieldError("type")}
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
                    minLength={CONTACT_LIMITS.messageMin}
                    maxLength={CONTACT_LIMITS.messageMax}
                    rows={6}
                    placeholder={t("placeholderMessage")}
                    readOnly={submitting}
                    className={`${fieldClass} resize-y`}
                    {...fieldState("message")}
                />
                {fieldError("message")}
            </div>

            <p className="text-xs text-text-muted leading-relaxed">
                {t.rich("privacy", {
                    link: (chunks) => (
                        <Link href="/privacy" className="underline decoration-accent/50 underline-offset-2 hover:text-accent">
                            {chunks}
                        </Link>
                    ),
                })}
            </p>

            {status.kind === "error" && (
                <div
                    ref={errorRef}
                    tabIndex={-1}
                    role="alert"
                    className="scroll-mt-28 rounded-2xl border border-destructive/50 bg-destructive/5 p-5 focus:outline-none"
                >
                    <p className="flex items-start gap-2 text-sm font-semibold text-text-primary">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
                        {t("errorTitle")}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-text-secondary">{t(`errors.${status.code}`)}</p>
                    {status.code !== "INVALID_INPUT" && (
                        <div className="mt-4 space-y-3">
                            <p className="text-xs leading-6 text-text-muted">
                                {t("errorFallback")}{" "}
                                <a
                                    href={`mailto:${CONTACT_EMAIL}`}
                                    data-track="email_click"
                                    data-track-location="contact-form-error"
                                    className="font-medium text-text-secondary underline decoration-accent/50 underline-offset-2 hover:text-accent"
                                >
                                    {CONTACT_EMAIL}
                                </a>
                            </p>
                            <button
                                type="button"
                                onClick={handleCopy}
                                className="inline-flex items-center gap-2 rounded-full border border-border-soft px-4 py-2 text-xs font-medium text-text-secondary hover:border-accent/50 hover:text-accent transition-colors"
                            >
                                {copied ? <Check className="h-3.5 w-3.5" aria-hidden="true" /> : <Copy className="h-3.5 w-3.5" aria-hidden="true" />}
                                {copied ? t("copied") : t("copyButton")}
                            </button>
                        </div>
                    )}
                </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full bg-accent text-surface text-sm font-semibold hover:bg-[var(--nv-accent-hover)] transition-all duration-200 active:scale-[0.98] disabled:cursor-wait disabled:opacity-70 disabled:active:scale-100"
                >
                    {submitting ? (
                        <Loader2 className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                    ) : (
                        <Send className="h-4 w-4" aria-hidden="true" />
                    )}
                    {submitting ? t("submitting") : t("submit")}
                </button>
                {/* Screenreader-Ansage fuer den Ladezustand */}
                <p className="sr-only" role="status" aria-live="polite">
                    {submitting ? t("submitting") : ""}
                </p>
            </div>

            <div className="border-t border-border-soft pt-5">
                <p className="text-xs leading-6 text-text-muted">
                    {t("directHint")}{" "}
                    <a
                        href={`mailto:${CONTACT_EMAIL}`}
                        data-track="email_click"
                        data-track-location="contact-form-fallback"
                        className="font-medium text-text-secondary underline decoration-accent/50 underline-offset-2 hover:text-accent"
                    >
                        {CONTACT_EMAIL}
                    </a>
                </p>
            </div>
        </form>
    )
}
