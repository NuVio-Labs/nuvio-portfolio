"use client"

import { useEffect } from "react"
import { useConsent } from "@/components/consent/consent-provider"
import { applyAnalyticsOptOutParam } from "@/lib/analytics-opt-out"
import { disableGoogleAnalytics, initGoogleAnalytics, isGoogleAnalyticsConfigured } from "@/lib/google-analytics"

/**
 * Verbindet den bestehenden Consent-Store (Phase 1) mit
 * lib/google-analytics.ts. Rendert nichts.
 *
 * - analytics=true  -> gtag.js laden (einmalig; Pageview der aktuellen Seite
 *                      kommt aus `config`, Folge-Navigationen erfasst GA4
 *                      selbst ueber Browserverlaufsereignisse)
 * - analytics=false -> Opt-out-Flag + GA-Cookies entfernen (Widerruf, oder
 *                      Aufraeumen von Resten frueherer Sitzungen). Lief
 *                      gtag.js schon, wird der Tab neu geladen — aber nur
 *                      der Tab mit Fokus, in dem der Nutzer gerade
 *                      gespeichert hat. Andere Tabs (per "storage"-Event
 *                      synchronisiert) werden nicht ungefragt neu geladen,
 *                      sonst ginge dort z. B. ein halb ausgefuelltes
 *                      Kontaktformular verloren; dort greifen Opt-out-Flag
 *                      und Consent-Pruefung.
 * - keine Entscheidung -> nichts
 *
 * Vorher wird einmalig ?analytics=off|on gespeichert (Opt-out fuer eigene
 * Geraete, gilt auch fuer Vercel Analytics, siehe lib/analytics-opt-out.ts).
 * Die Pruefung selbst liest den URL-Parameter zusaetzlich direkt, haengt
 * also nicht von der Reihenfolge der Effects ab.
 *
 * Kein eigenes Route-Tracking (usePathname etc.): ein zweiter
 * Pageview-Mechanismus neben dem von GA4 wuerde doppelt zaehlen.
 */
export function GoogleAnalytics() {
    const { consent } = useConsent()
    const decision = consent === null ? null : consent.analytics

    useEffect(() => {
        applyAnalyticsOptOutParam()
    }, [])

    useEffect(() => {
        if (decision === null || !isGoogleAnalyticsConfigured()) return
        if (decision) {
            initGoogleAnalytics()
        } else {
            disableGoogleAnalytics({ reloadIfLoaded: document.hasFocus() })
        }
    }, [decision])

    return null
}
