/**
 * Gemeinsamer Vertrag zwischen Kontaktformular (Client) und /api/contact
 * (Server): Felder, Grenzen, Validierung und Antwortformat.
 *
 * Die Validierung laeuft auf dem Server verbindlich. Der Client nutzt nur
 * dieselben Grenzen fuer die nativen Formularattribute.
 */

export const CONTACT_LIMITS = {
    nameMin: 2,
    nameMax: 80,
    emailMax: 120,
    companyMax: 80,
    messageMin: 5,
    messageMax: 5000,
    /** Obergrenze fuer den kompletten JSON-Body in Bytes. */
    bodyMax: 16_000,
} as const

export const CONTACT_TYPES = ["launch", "redesign", "landing", "ui", "other"] as const
export type ContactType = (typeof CONTACT_TYPES)[number]

export const CONTACT_LOCALES = ["de", "en", "nl"] as const
export type ContactLocale = (typeof CONTACT_LOCALES)[number]

/** Was der Client sendet. `website` ist das Honeypot-Feld und muss leer sein. */
export interface ContactRequest {
    name: string
    email: string
    company: string
    type: string
    message: string
    locale: string
    website: string
}

/** Validierte, bereinigte Anfrage — nur damit arbeitet der Server weiter. */
export interface ContactPayload {
    name: string
    email: string
    company: string
    type: ContactType
    message: string
    locale: ContactLocale
}

export type ContactField = "name" | "email" | "company" | "type" | "message"

export type ContactErrorCode = "INVALID_INPUT" | "RATE_LIMITED" | "SEND_FAILED" | "FORBIDDEN"

export type ContactResponse =
    | { success: true }
    | { success: false; error: ContactErrorCode; fields?: ContactField[] }

/**
 * Steuerzeichen inkl. CR/LF und Unicode-Zeilentrenner. In einzeiligen
 * Feldern (die u. a. in Mail-Header wandern) nie erlaubt; im Nachrichtentext
 * nur Tab, LF und CR.
 */
function hasControlChars(value: string, allowLineBreaks: boolean): boolean {
    for (let i = 0; i < value.length; i++) {
        const code = value.charCodeAt(i)
        if (allowLineBreaks && (code === 9 || code === 10 || code === 13)) continue
        if (code < 32 || code === 127 || code === 0x2028 || code === 0x2029) return true
    }
    return false
}

/**
 * Bewusst schlicht: ein @, kein Leerraum, eine Domain mit Punkt. Zeichen,
 * die in Adress-Headern Bedeutung haben (<>(),;:"), sind ausgeschlossen.
 */
const EMAIL_PATTERN = /^[^\s@<>()[\],;:"\\]+@[^\s@<>()[\],;:"\\]+\.[^\s@<>()[\],;:"\\]{2,}$/

function text(value: unknown): string | null {
    return typeof value === "string" ? value : null
}

function singleLine(value: unknown, min: number, max: number): string | null {
    const raw = text(value)
    if (raw === null || hasControlChars(raw, false)) return null
    const trimmed = raw.trim()
    return trimmed.length >= min && trimmed.length <= max ? trimmed : null
}

export type ContactValidation =
    | { ok: true; data: ContactPayload }
    | { ok: false; honeypot: boolean; fields: ContactField[] }

export function validateContactRequest(input: unknown): ContactValidation {
    if (typeof input !== "object" || input === null || Array.isArray(input)) {
        return { ok: false, honeypot: false, fields: [] }
    }
    const body = input as Partial<Record<keyof ContactRequest, unknown>>

    /* Honeypot: fuer Menschen unsichtbar, Bots fuellen es. */
    const website = body.website
    if (website !== undefined && website !== "") {
        return { ok: false, honeypot: true, fields: [] }
    }

    const fields: ContactField[] = []

    const name = singleLine(body.name, CONTACT_LIMITS.nameMin, CONTACT_LIMITS.nameMax)
    if (name === null) fields.push("name")

    const email = singleLine(body.email, 3, CONTACT_LIMITS.emailMax)
    if (email === null || !EMAIL_PATTERN.test(email)) fields.push("email")

    const company = body.company === undefined ? "" : singleLine(body.company, 0, CONTACT_LIMITS.companyMax)
    if (company === null) fields.push("company")

    const type = text(body.type)
    if (type === null || !(CONTACT_TYPES as readonly string[]).includes(type)) fields.push("type")

    const rawMessage = text(body.message)
    const message = rawMessage === null || hasControlChars(rawMessage, true)
        ? null
        : rawMessage.replace(/\r\n?/g, "\n").trim()
    if (message === null || message.length < CONTACT_LIMITS.messageMin || message.length > CONTACT_LIMITS.messageMax) {
        fields.push("message")
    }

    const locale = text(body.locale)
    const safeLocale: ContactLocale = locale !== null && (CONTACT_LOCALES as readonly string[]).includes(locale)
        ? (locale as ContactLocale)
        : "de"

    if (fields.length > 0) return { ok: false, honeypot: false, fields }

    return {
        ok: true,
        data: {
            name: name as string,
            email: email as string,
            company: company as string,
            type: type as ContactType,
            message: message as string,
            locale: safeLocale,
        },
    }
}
