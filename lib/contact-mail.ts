import "server-only"
import { Resend } from "resend"
import type { ContactPayload, ContactType } from "@/lib/contact"
import { CONTACT_EMAIL } from "@/lib/site"

/**
 * Versand der Kontaktanfrage ueber Resend.
 *
 * - From: feste, bei Resend verifizierte Absenderadresse (CONTACT_FROM_EMAIL),
 *   nie die Adresse des Besuchers — sonst scheitern SPF/DKIM/DMARC.
 * - Reply-To: die validierte Adresse des Besuchers, damit direkt geantwortet
 *   werden kann.
 * - Alle Nutzereingaben sind vorher in lib/contact.ts validiert; einzeilige
 *   Felder enthalten keine Steuerzeichen (kein CR/LF, also keine
 *   Header-Injection). Im HTML wird zusaetzlich jede Eingabe escaped.
 * - Keine IP-Adresse, keine Cookies, keine Analytics-Kennungen in der Mail,
 *   keine externen Bilder oder Tracking-Pixel.
 */

/** Deutsche Bezeichnungen fuer die Mail an NuVio Labs, unabhaengig von der Sprache des Besuchers. */
const TYPE_LABELS: Record<ContactType, string> = {
    launch: "Website Launch",
    redesign: "Redesign & Relaunch",
    landing: "Landingpage",
    ui: "UI-Komponenten & Design System",
    other: "Etwas anderes",
}

const SUBJECT_NAME_MAX = 60

export type SendResult = { ok: true } | { ok: false; reason: "not_configured" | "provider_error" }

function escapeHtml(value: string): string {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;")
}

function formatTimestamp(date: Date): string {
    return new Intl.DateTimeFormat("de-DE", {
        dateStyle: "long",
        timeStyle: "short",
        timeZone: "Europe/Berlin",
    }).format(date) + " Uhr (Europe/Berlin)"
}

function buildRows(payload: ContactPayload, receivedAt: Date): [string, string][] {
    const rows: [string, string][] = [
        ["Name", payload.name],
        ["E-Mail", payload.email],
    ]
    if (payload.company) rows.push(["Unternehmen", payload.company])
    rows.push(
        ["Art des Projekts", TYPE_LABELS[payload.type]],
        ["Sprache", payload.locale.toUpperCase()],
        ["Quelle", "Kontaktformular auf nuviolabs.de"],
        ["Zeitpunkt", formatTimestamp(receivedAt)],
    )
    return rows
}

function buildText(payload: ContactPayload, rows: [string, string][]): string {
    return [
        "Neue Kontaktanfrage über nuviolabs.de",
        "",
        ...rows.map(([label, value]) => `${label}: ${value}`),
        "",
        "Nachricht:",
        payload.message,
        "",
        "—",
        "Antworten Sie direkt auf diese E-Mail, um der anfragenden Person zu antworten.",
    ].join("\n")
}

function buildHtml(payload: ContactPayload, rows: [string, string][]): string {
    const cell = "padding:6px 16px 6px 0;vertical-align:top;font-size:14px;line-height:20px;"
    const tableRows = rows
        .map(([label, value]) =>
            `<tr><td style="${cell}color:#6b6b6b;white-space:nowrap;">${escapeHtml(label)}</td>` +
            `<td style="${cell}color:#111111;">${escapeHtml(value)}</td></tr>`)
        .join("")

    return `<!doctype html>
<html lang="de">
<body style="margin:0;padding:24px;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#111111;">
<h1 style="margin:0 0 16px;font-size:18px;line-height:24px;font-weight:600;">Neue Kontaktanfrage über nuviolabs.de</h1>
<table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 20px;">${tableRows}</table>
<h2 style="margin:0 0 8px;font-size:14px;line-height:20px;font-weight:600;">Nachricht</h2>
<div style="margin:0 0 24px;padding:12px 16px;border:1px solid #e5e5e5;border-radius:8px;font-size:14px;line-height:22px;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
<p style="margin:0;font-size:12px;line-height:18px;color:#6b6b6b;">Antworten Sie direkt auf diese E-Mail, um der anfragenden Person zu antworten.</p>
</body>
</html>`
}

function buildSubject(name: string): string {
    const short = name.length > SUBJECT_NAME_MAX ? `${name.slice(0, SUBJECT_NAME_MAX)}…` : name
    return `Neue Website-Anfrage von ${short}`
}

export async function sendContactMail(payload: ContactPayload, receivedAt: Date): Promise<SendResult> {
    const apiKey = process.env.RESEND_API_KEY
    const from = process.env.CONTACT_FROM_EMAIL
    /* Empfaenger: optional ueberschreibbar, sonst die zentrale Adresse aus lib/site.ts. */
    const to = process.env.CONTACT_EMAIL || CONTACT_EMAIL

    if (!apiKey || !from) {
        console.error("[contact] Mailversand nicht konfiguriert (RESEND_API_KEY oder CONTACT_FROM_EMAIL fehlt).")
        return { ok: false, reason: "not_configured" }
    }

    const rows = buildRows(payload, receivedAt)

    try {
        const resend = new Resend(apiKey)
        const { data, error } = await resend.emails.send({
            from,
            to: [to],
            replyTo: payload.email,
            subject: buildSubject(payload.name),
            text: buildText(payload, rows),
            html: buildHtml(payload, rows),
        })

        if (error || !data?.id) {
            /* Nur Fehlertyp und Status loggen — keine Formularinhalte, keine Provider-Nachricht. */
            console.error("[contact] Resend hat die Nachricht nicht angenommen:", error?.name ?? "no_id", error?.statusCode ?? "")
            return { ok: false, reason: "provider_error" }
        }
        return { ok: true }
    } catch {
        console.error("[contact] Resend nicht erreichbar.")
        return { ok: false, reason: "provider_error" }
    }
}
