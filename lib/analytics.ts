import { track } from "@vercel/analytics"
import { hasAnalyticsConsent } from "@/lib/consent"
import { trackGoogleEvent } from "@/lib/google-analytics"

/**
 * Conversion-relevante Events. Zentral gepflegt, damit Event-Namen nicht an
 * jeder Aufrufstelle frei erfunden werden.
 *
 * Ziele sind Vercel Web Analytics und Google Analytics 4 — beide gehoeren
 * zur selben Consent-Kategorie "Analyse" und bekommen ohne Zustimmung
 * nichts (siehe components/analytics/*).
 *
 * Properties duerfen ausschliesslich kurzen technischen Kontext enthalten
 * (z. B. welche Sektion/Seite, welcher Kanal) — niemals Formularinhalte,
 * Namen, E-Mail-Adressen oder andere personenbezogene Daten.
 *
 * Event-Namen sind bewusst so gewaehlt, dass sie nur behaupten, was
 * technisch tatsaechlich nachweisbar ist (siehe contact-form.tsx /
 * contact-sent.tsx): weder der Klick auf "Per WhatsApp/E-Mail senden" noch
 * das Erreichen von /contact/sent belegen, dass eine Nachricht wirklich
 * versendet wurde — beides oeffnet nur einen externen Kanal, ohne
 * Rueckmeldung. Deshalb "..._click" / "..._page_view" statt "submit" /
 * "success".
 */
export type ConversionEvent =
    | "primary_cta_click"
    | "pricing_cta_click"
    | "email_click"
    | "contact_form_start"
    | "contact_handoff_click"
    | "contact_sent_page_view"

type EventProperties = Record<string, string | number | boolean>

/**
 * Sendet ein Conversion-Event. Serverseitig (kein `window`) ein no-op.
 *
 * Ohne Analytics-Zustimmung geht nichts raus, auch nichts in eine
 * Warteschlange, die spaeter nachgesendet werden koennte. Nach einem
 * Widerruf im selben Tab verwirft zusaetzlich `beforeSend` in
 * vercel-analytics.tsx jedes Event. Komponenten rufen nie selbst gtag()
 * oder track(); GA prueft zusaetzlich in lib/google-analytics.ts.
 */
export function trackEvent(name: ConversionEvent, properties?: EventProperties): void {
    if (typeof window === "undefined" || !hasAnalyticsConsent()) return
    track(name, properties)
    trackGoogleEvent(name, properties)
}
