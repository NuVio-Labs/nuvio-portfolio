"use client"

import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next"
import { useConsent } from "@/components/consent/consent-provider"
import { isAnalyticsOptedOut } from "@/lib/analytics-opt-out"
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
 * - Geraete-Opt-out (?analytics=off, lib/analytics-opt-out.ts): wie
 *   Ablehnung, unabhaengig von der Zustimmung.
 *
 * Speed Insights ist bewusst NICHT hier gekoppelt (siehe app/[locale]/layout.tsx).
 */
function dropWithoutConsent(event: BeforeSendEvent): BeforeSendEvent | null {
    return hasAnalyticsConsent() && !isAnalyticsOptedOut() ? event : null
}

export function VercelAnalytics() {
    const { consent } = useConsent()
    /* Erst nach der Consent-Pruefung lesen: beim Hydrieren ist consent noch
       null, so bleibt die Ausgabe identisch zum Server-Render. */
    if (consent?.analytics !== true || isAnalyticsOptedOut()) return null
    return <Analytics beforeSend={dropWithoutConsent} />
}
