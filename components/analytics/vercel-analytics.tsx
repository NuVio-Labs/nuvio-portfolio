"use client"

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next"
import { useConsent } from "@/components/consent/consent-provider"
import { hasAnalyticsConsent } from "@/lib/consent"

/**
 * Vercel Web Analytics — gleiche Consent-Kategorie wie Google Analytics,
 * kein eigener Schalter.
 *
 * - vor einer Entscheidung und bei Ablehnung: Komponente rendert nichts,
 *   das Skript wird gar nicht geladen (auch kein Zugriff auf localStorage)
 * - nach Zustimmung: Skript laden, Pageviews und Custom Events senden
 * - nach Widerruf: Komponente wird entfernt (keine weiteren Pageviews);
 *   das bereits geladene Skript bleibt im Speicher, `beforeSend` verwirft
 *   aber jedes Event, weil es die Zustimmung bei jedem Event live prueft.
 *
 * Speed Insights ist bewusst NICHT hier gekoppelt (siehe app/layout.tsx).
 */
function dropWithoutConsent(event: BeforeSendEvent): BeforeSendEvent | null {
    return hasAnalyticsConsent() ? event : null
}

export function VercelAnalytics() {
    const { consent } = useConsent()
    if (consent?.analytics !== true) return null
    return <Analytics beforeSend={dropWithoutConsent} />
}
