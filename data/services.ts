/**
 * Leistungen und Preise von NuVio Labs.
 *
 * Einzige Quelle fuer Leistungsseite, Startseiten-Vorschau, Footer und
 * Structured Data. Die Preise entsprechen dem Google-Unternehmensprofil
 * (Stand November 2026) — bei Aenderungen beides gemeinsam pflegen.
 *
 * Texte (Titel, Beschreibung) liegen in messages/*.json unter
 * services.categories.<kategorie>.items.<id>.
 *
 * Alle Betraege sind Endpreise in Euro: Kleinunternehmerregelung nach
 * § 19 UStG, es wird keine Umsatzsteuer ausgewiesen.
 */

export type PriceUnit = "hour" | "month"

export type ServicePrice =
    | { kind: "free" }
    | { kind: "onRequest" }
    | { kind: "fixed"; amount: number; unit?: PriceUnit }
    | { kind: "from"; amount: number; unit?: PriceUnit }

export interface ServiceItem {
    id: string
    price: ServicePrice
}

export const SERVICE_CATEGORY_IDS = ["web", "design", "marketing"] as const
export type ServiceCategoryId = (typeof SERVICE_CATEGORY_IDS)[number]

export interface ServiceCategory {
    id: ServiceCategoryId
    items: readonly ServiceItem[]
    /** Leistungen, die in der Startseiten-Vorschau stellvertretend erscheinen. */
    highlights: readonly string[]
}

const free = (): ServicePrice => ({ kind: "free" })
const onRequest = (): ServicePrice => ({ kind: "onRequest" })
const fixed = (amount: number, unit?: PriceUnit): ServicePrice => ({ kind: "fixed", amount, unit })
const from = (amount: number, unit?: PriceUnit): ServicePrice => ({ kind: "from", amount, unit })

export const SERVICE_CATEGORIES: readonly ServiceCategory[] = [
    {
        id: "web",
        items: [
            { id: "website", price: from(1490) },
            { id: "landing", price: from(1049) },
            { id: "redesign", price: onRequest() },
            { id: "check", price: free() },
            { id: "repair", price: fixed(69) },
            { id: "adjustments", price: from(69) },
            { id: "maintenance", price: fixed(32, "month") },
            { id: "hourly", price: fixed(55, "hour") },
        ],
        highlights: ["website", "landing", "maintenance"],
    },
    {
        id: "design",
        items: [
            { id: "logo", price: from(199) },
            { id: "stationery", price: from(249) },
            { id: "businessCards", price: from(79) },
            { id: "letterhead", price: from(49) },
            { id: "invoice", price: from(59) },
            { id: "quote", price: from(59) },
            { id: "emailSignature", price: from(39) },
            { id: "stamp", price: from(20) },
            { id: "flyer", price: from(89) },
            { id: "banner", price: from(79) },
            { id: "social", price: from(55) },
            { id: "pdfForms", price: from(79) },
        ],
        highlights: ["logo", "stationery", "businessCards"],
    },
    {
        id: "marketing",
        items: [
            { id: "googleProfile", price: from(99) },
            { id: "seoBasic", price: from(149) },
            { id: "seoAudit", price: from(59) },
        ],
        highlights: ["googleProfile", "seoBasic", "seoAudit"],
    },
]

export function getServiceItem(category: ServiceCategory, id: string): ServiceItem | undefined {
    return category.items.find((item) => item.id === id)
}
