/**
 * Zentrale Site-Konstanten.
 *
 * Hinweis: app/[locale]/layout.tsx und app/sitemap.ts definieren SITE_URL
 * bisher jeweils lokal. Beide wurden hier bewusst nicht angefasst; neue
 * Dateien sollten diese Konstante verwenden.
 */
export const SITE_URL = "https://www.nuviolabs.de"

export const SITE_NAME = "NuVio Labs"

/** Logo fuer Structured Data (publisher). */
export const SITE_LOGO = `${SITE_URL}/logo.png`

export const CONTACT_EMAIL = "contact@nuviolabs.de"

/**
 * WhatsApp-Nummer im wa.me-Format: Laendervorwahl ohne Plus, ohne fuehrende
 * Null, ohne Leerzeichen. Entspricht +49 1590 1698608.
 */
export const WHATSAPP_NUMBER = "4915901698608"
