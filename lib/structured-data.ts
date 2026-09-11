import { CONTACT_EMAIL, SITE_LOGO, SITE_NAME, SITE_URL } from "@/lib/site"

/**
 * Stabile @id-Werte, damit Entitaeten ueber mehrere JSON-LD-Bloecke und
 * Seiten hinweg per Referenz statt per Duplikat verknuepft werden koennen.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

/**
 * Reale, oeffentlich sichtbare Servicegebiete (siehe messages/de.json und
 * messages/nl.json: webdesignKranenburg.local, webdesignKleve, footer,
 * imprint). Kranenburg ist der tatsaechliche Sitz, alle anderen Orte werden
 * auf der Website ausdruecklich als bedientes Gebiet genannt — NICHT als
 * weiterer Standort. Bewusst keine Adresse: NuVio Labs ist ein
 * Service-Area-Business ohne oeffentlich vermarkteten Geschaeftssitz
 * (die Anschrift auf /imprint dient ausschliesslich der gesetzlichen
 * Impressumspflicht, nicht der Vermarktung als Standort).
 */
const AREA_SERVED = [
    { "@type": "City", name: "Kranenburg" },
    { "@type": "City", name: "Kleve" },
    { "@type": "City", name: "Goch" },
    { "@type": "City", name: "Groesbeek" },
    { "@type": "AdministrativeArea", name: "Niederrhein" },
]

/**
 * Zentrale Organization-Entitaet. Enthaelt ausschliesslich Angaben, die an
 * anderer Stelle der Website tatsaechlich oeffentlich sichtbar sind:
 * - E-Mail: sichtbar auf /imprint
 * - Logo: public/logo.png, bereits fuer Journal-Structured-Data genutzt
 * Bewusst NICHT enthalten: postalAddress (kein vermarkteter Standort),
 * sameAs (keine echten, im Frontend verlinkten Social-Profile gefunden —
 * der LinkedIn-Link im Journal ist ein generischer Share-Intent-Link, kein
 * Profil-Link), description (die einzige vorhandene Kurzbeschreibung,
 * footer.llmContext, ist aria-hidden und damit fuer keinen Nutzer
 * wahrnehmbar), telephone (die Nummer wird auf allen oeffentlichen Seiten —
 * /imprint, Kontaktformular — ausschliesslich als WhatsApp-Kontakt
 * bezeichnet, nie als allgemeine Geschaeftsrufnummer; ein `tel:`-Link
 * existiert nur auf der privaten, nicht oeffentlichen CV-Seite fuer einen
 * anderen Zweck).
 */
export function buildOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": ORGANIZATION_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: SITE_LOGO },
        email: CONTACT_EMAIL,
        areaServed: AREA_SERVED,
    }
}

/** Minimaler WebSite-Eintrag, kein SiteSearchAction (keine interne Suche vorhanden). */
export function buildWebsiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": ORGANIZATION_ID },
    }
}

interface ServiceSchemaOptions {
    /** Muss dem sichtbaren Seiteninhalt entsprechen (z. B. die H1). */
    name: string
    /** Muss dem sichtbaren Seiteninhalt entsprechen (z. B. die Meta-Description). */
    description: string
    /** Kanonische URL der Seite, fuer die dieser Service ausgezeichnet wird. */
    url: string
    /** Tatsaechlich auf der Seite genannter Ort, z. B. "Kranenburg". */
    areaServed: string
}

/** Service-Eintrag fuer eine einzelne Local-SEO-Seite, referenziert die zentrale Organization. */
export function buildServiceSchema({ name, description, url, areaServed }: ServiceSchemaOptions) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        serviceType: "Webdesign",
        name,
        description,
        url,
        provider: { "@id": ORGANIZATION_ID },
        areaServed: { "@type": "City", name: areaServed },
    }
}

interface BreadcrumbItem {
    name: string
    url: string
}

/** Einfache BreadcrumbList, analog zum bestehenden Muster in journal-structured-data.tsx. */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

/** Props fuer ein serverseitig gerendertes JSON-LD <script>-Tag. */
export function jsonLdScriptProps(data: object) {
    return {
        type: "application/ld+json" as const,
        dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
    }
}
