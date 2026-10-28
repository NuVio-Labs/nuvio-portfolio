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
 *                      selbst ueber Browserverlaufsereignisse). Erst nach
 *                      dem load-Event und im Leerlauf des Browsers: gtag.js
 *                      (~200 KB) blockierte auf Handys sonst ~0,7 s genau
 *                      dann den Main-Thread, wenn die Seite noch hochfaehrt
 *                      bzw. direkt nach dem Tap auf "Alle akzeptieren".
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
            return whenIdle(initGoogleAnalytics)
        }
        disableGoogleAnalytics({ reloadIfLoaded: document.hasFocus() })
    }, [decision])

    return null
}

/** Ruft `callback` nach dem load-Event im naechsten Leerlauf auf. Liefert eine Abbruchfunktion. */
function whenIdle(callback: () => void): () => void {
    let idleId: number | undefined
    let timeoutId: ReturnType<typeof setTimeout> | undefined

    function schedule() {
        // Safari kennt requestIdleCallback nicht.
        if (typeof window.requestIdleCallback === "function") {
            idleId = window.requestIdleCallback(callback, { timeout: 2000 })
        } else {
            timeoutId = setTimeout(callback, 200)
        }
    }

    if (document.readyState === "complete") schedule()
    else window.addEventListener("load", schedule, { once: true })

    return () => {
        window.removeEventListener("load", schedule)
        if (idleId !== undefined) window.cancelIdleCallback(idleId)
        if (timeoutId !== undefined) clearTimeout(timeoutId)
    }
}
