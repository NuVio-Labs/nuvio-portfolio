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
 * Event-Namen behaupten nur, was technisch nachweisbar ist. Kontaktformular
 * (siehe contact-form.tsx / app/api/contact):
 * - contact_form_start:    erste Interaktion mit dem Formular
 * - contact_form_submit:   gueltiges Formular abgeschickt, Request startet
 * - contact_form_accepted: Server hat validiert UND der Mailprovider hat die
 *                          Nachricht zur Zustellung angenommen — nicht
 *                          "zugestellt" und nicht "gelesen"
 * - contact_form_error:    Versand fehlgeschlagen; `reason` ist nur der
 *                          technische Fehlercode, nie eine Fehlermeldung
 *
 * Zusaetzlich geht an GA4 (nicht an Vercel) zu contact_form_accepted das
 * Empfehlungsereignis `generate_lead`, siehe GA4_RECOMMENDED_EVENTS.
 */
export type ConversionEvent =
    | "primary_cta_click"
    | "pricing_cta_click"
    | "email_click"
    | "contact_form_start"
    | "contact_form_submit"
    | "contact_form_accepted"
    | "contact_form_error"

type EventProperties = Record<string, string | number | boolean>

/**
 * GA4-Empfehlungsereignisse, die zusaetzlich zum eigenen Event an Google
 * gehen. `generate_lead` ist in GA4 als Schluesselereignis markiert;
 * contact_form_accepted bleibt fuer bestehende Auswertungen erhalten.
 */
const GA4_RECOMMENDED_EVENTS: Partial<Record<ConversionEvent, { name: string; params: EventProperties }>> = {
    contact_form_accepted: { name: "generate_lead", params: { lead_source: "contact_form" } },
}

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

    const recommended = GA4_RECOMMENDED_EVENTS[name]
    if (recommended) trackGoogleEvent(recommended.name, recommended.params)
}
