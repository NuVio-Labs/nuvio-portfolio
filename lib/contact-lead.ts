import "server-only"
import type { ContactPayload } from "@/lib/contact"

/**
 * Weitergabe einer bereits per Resend zugestellten Kontaktanfrage an die
 * n8n Lead-Pipeline (NUVIO_N8N_WEBHOOK_URL).
 *
 * - Best effort: Resend ist die primaere Zustellung. Diese Funktion wirft nie
 *   und laesst die Kontakt-Antwort nie fehlschlagen.
 * - Wird awaited (kein fire-and-forget), weil die Vercel Function nach der
 *   Response beendet werden kann; ein Timeout begrenzt die Wartezeit.
 * - Payload nur mit den fuer die Pipeline noetigen Feldern: keine IP, keine
 *   Cookies, keine Analytics-Kennungen, keine weitergereichten Request-Header.
 * - Logs ohne Formularinhalte, ohne Payload und ohne Secret.
 */

const WEBHOOK_TIMEOUT_MS = 3000

export interface LeadWebhookPayload {
    name: string
    email: string
    company: string
    projectType: ContactPayload["type"]
    message: string
    locale: ContactPayload["locale"]
    source: "nuviolabs.de"
}

export type LeadResult = { ok: true } | { ok: false; reason: "not_configured" | "http_error" | "timeout" | "network_error" }

function buildLeadPayload(payload: ContactPayload): LeadWebhookPayload {
    return {
        name: payload.name,
        email: payload.email,
        company: payload.company,
        projectType: payload.type,
        message: payload.message,
        locale: payload.locale,
        source: "nuviolabs.de",
    }
}

export async function forwardContactLead(payload: ContactPayload): Promise<LeadResult> {
    const url = process.env.NUVIO_N8N_WEBHOOK_URL
    const secret = process.env.NUVIO_N8N_WEBHOOK_SECRET

    if (!url || !secret) {
        console.warn("[contact:n8n] webhook_not_configured")
        return { ok: false, reason: "not_configured" }
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), WEBHOOK_TIMEOUT_MS)

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Nuvio-Webhook-Secret": secret,
            },
            body: JSON.stringify(buildLeadPayload(payload)),
            signal: controller.signal,
            cache: "no-store",
        })

        if (!response.ok) {
            console.error("[contact:n8n] webhook_failed", { status: response.status })
            return { ok: false, reason: "http_error" }
        }
        return { ok: true }
    } catch (error) {
        if (controller.signal.aborted) {
            console.error("[contact:n8n] webhook_timeout", { timeoutMs: WEBHOOK_TIMEOUT_MS })
            return { ok: false, reason: "timeout" }
        }
        /* Nur den Fehlertyp loggen — die Meldung koennte die URL enthalten. */
        console.error("[contact:n8n] webhook_unreachable", { error: error instanceof Error ? error.name : "unknown" })
        return { ok: false, reason: "network_error" }
    } finally {
        clearTimeout(timer)
    }
}
