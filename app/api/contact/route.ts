import { NextResponse } from "next/server"
import { CONTACT_LIMITS, validateContactRequest, type ContactResponse } from "@/lib/contact"
import { forwardContactLead } from "@/lib/contact-lead"
import { sendContactMail } from "@/lib/contact-mail"
import { isContactRateLimited } from "@/lib/contact-rate-limit"
import { SITE_URL } from "@/lib/site"

/** Nie zwischenspeichern, jede Anfrage ist einzeln. */
export const dynamic = "force-dynamic"

function reply(body: ContactResponse, status: number) {
    return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } })
}

/**
 * Nur Anfragen aus dem eigenen Frontend: Der Origin muss dem angefragten
 * Host entsprechen (deckt Production, Vercel-Previews und localhost ab) oder
 * der kanonischen Domain aus lib/site.ts samt Variante ohne "www.".
 * Zusammen mit der Pflicht zu application/json (erzwingt bei fremden
 * Origins einen CORS-Preflight, den dieser Endpoint nicht beantwortet)
 * verhindert das Missbrauch aus fremden Websites heraus.
 */
function isAllowedOrigin(request: Request): boolean {
    const origin = request.headers.get("origin")
    if (!origin) return false

    let originHost: string
    try {
        originHost = new URL(origin).host
    } catch {
        return false
    }

    const requestHost = request.headers.get("x-forwarded-host") ?? request.headers.get("host")
    if (requestHost && originHost === requestHost) return true

    const siteHost = new URL(SITE_URL).host
    return originHost === siteHost || originHost === siteHost.replace(/^www\./, "")
}

function clientIp(request: Request): string {
    return (
        request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
        request.headers.get("x-real-ip")?.trim() ||
        "unknown"
    )
}

export async function POST(request: Request) {
    if (!isAllowedOrigin(request)) {
        return reply({ success: false, error: "FORBIDDEN" }, 403)
    }

    const contentType = request.headers.get("content-type") ?? ""
    if (!contentType.toLowerCase().startsWith("application/json")) {
        return reply({ success: false, error: "INVALID_INPUT" }, 415)
    }

    const declaredLength = Number(request.headers.get("content-length") ?? 0)
    if (declaredLength > CONTACT_LIMITS.bodyMax) {
        return reply({ success: false, error: "INVALID_INPUT" }, 413)
    }

    let raw: string
    try {
        raw = await request.text()
    } catch {
        return reply({ success: false, error: "INVALID_INPUT" }, 400)
    }
    if (new TextEncoder().encode(raw).length > CONTACT_LIMITS.bodyMax) {
        return reply({ success: false, error: "INVALID_INPUT" }, 413)
    }

    let json: unknown
    try {
        json = JSON.parse(raw)
    } catch {
        return reply({ success: false, error: "INVALID_INPUT" }, 400)
    }

    const result = validateContactRequest(json)
    if (!result.ok) {
        /* Honeypot: ohne Feldliste, der Bot bekommt keinen Hinweis. */
        return reply(
            result.honeypot
                ? { success: false, error: "INVALID_INPUT" }
                : { success: false, error: "INVALID_INPUT", fields: result.fields },
            400,
        )
    }

    if (await isContactRateLimited(clientIp(request))) {
        return reply({ success: false, error: "RATE_LIMITED" }, 429)
    }

    const sent = await sendContactMail(result.data, new Date())
    if (!sent.ok) {
        return reply({ success: false, error: "SEND_FAILED" }, 500)
    }

    /* Erst nach erfolgreicher Mail: Lead an n8n. Best effort, wirft nie und
       aendert die Antwort nicht — die Anfrage ist per Resend bereits zugestellt. */
    await forwardContactLead(result.data)

    return reply({ success: true }, 200)
}
