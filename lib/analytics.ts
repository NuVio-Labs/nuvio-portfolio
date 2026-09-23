import { track } from "@vercel/analytics"
import { trackGoogleEvent } from "@/lib/google-analytics"

/**
 * Conversion-relevante Events. Zentral gepflegt, damit Event-Namen nicht an
 * jeder Aufrufstelle frei erfunden werden.
 *
 * Nutzt bewusst die bereits vorhandene, cookielose Vercel-Analytics-Instanz
 * (siehe app/layout.tsx) statt einer neuen Tracking-Plattform — dort ist
 * `track()` fuer genau diesen Zweck vorgesehen, ohne zusaetzliche
 * Abhaengigkeit und ohne Consent-Banner (keine Tracking-Cookies).
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
 * Zwei Ziele: Vercel Analytics (unveraendert, cookielos) und — nur mit
 * Analytics-Zustimmung — Google Analytics 4. Die Consent-Pruefung fuer GA
 * liegt zentral in lib/google-analytics.ts; Komponenten rufen nie selbst gtag().
 */
export function trackEvent(name: ConversionEvent, properties?: EventProperties): void {
    if (typeof window === "undefined") return
    track(name, properties)
    trackGoogleEvent(name, properties)
}
