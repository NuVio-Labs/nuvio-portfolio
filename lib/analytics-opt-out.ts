/**
 * Opt-out fuer eigene Geraete, gilt fuer Google Analytics 4 UND Vercel Web
 * Analytics: Aufruf einer beliebigen Seite mit ?analytics=off setzt das
 * Flag, ?analytics=on entfernt es. Solange es gesetzt ist, wird weder
 * gtag.js noch das Vercel-Skript geladen und kein Event gesendet —
 * unabhaengig von der Consent-Entscheidung. Normale Besucher bekommen den
 * Eintrag nie.
 */

const OPT_OUT_STORAGE_KEY = "nuvio_analytics_opt_out"
const OPT_OUT_QUERY_PARAM = "analytics"

function readParam(): "off" | "on" | null {
    const value = new URLSearchParams(window.location.search).get(OPT_OUT_QUERY_PARAM)
    return value === "off" || value === "on" ? value : null
}

/** Speichert ?analytics=off|on der aktuellen URL. Einmal pro Seitenaufruf aufrufen. */
export function applyAnalyticsOptOutParam(): void {
    if (typeof window === "undefined") return
    const param = readParam()
    try {
        if (param === "off") window.localStorage.setItem(OPT_OUT_STORAGE_KEY, "1")
        else if (param === "on") window.localStorage.removeItem(OPT_OUT_STORAGE_KEY)
    } catch {
        /* localStorage gesperrt — dann laesst sich kein Opt-out speichern. */
    }
}

/**
 * Ist dieses Geraet ausgeschlossen? Ein Parameter in der aktuellen URL hat
 * Vorrang vor dem gespeicherten Flag, damit die Entscheidung schon greift,
 * bevor applyAnalyticsOptOutParam() gelaufen ist. Nur lesend.
 */
export function isAnalyticsOptedOut(): boolean {
    if (typeof window === "undefined") return false
    const param = readParam()
    if (param) return param === "off"
    try {
        return window.localStorage.getItem(OPT_OUT_STORAGE_KEY) === "1"
    } catch {
        return false
    }
}
