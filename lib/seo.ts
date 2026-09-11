import type { Metadata } from "next"
import { routing } from "@/i18n/routing"
import { SITE_NAME, SITE_URL } from "@/lib/site"

const OG_LOCALES: Record<string, string> = { de: "de_DE", en: "en_US", nl: "nl_NL" }

/** OpenGraph-Locale-Code (z. B. "de_DE") fuer einen Routing-Locale-Code. */
export function toOgLocale(locale: string): string {
    return OG_LOCALES[locale] ?? "en_US"
}

/** Absolute URL fuer ein Locale + einen Pfad unterhalb davon ("" fuer die Locale-Root). */
export function localeUrl(locale: string, path: string = ""): string {
    return `${SITE_URL}/${locale}${path}`
}

interface BuildAlternatesOptions {
    locale: string
    /** Pfad unterhalb des Locale-Segments, z. B. "" fuer die Startseite, "/about" fuer /about. */
    path: string
    /**
     * Locales, in denen genau dieser Pfad wirklich existiert und inhaltlich
     * aequivalent ist (self-Locale eingeschlossen). Nur echte, erreichbare
     * URLs uebergeben — niemals eine Locale, die 404 liefert.
     *
     * Weggelassen: die Seite gilt als einsprachig. Es wird ausschliesslich
     * ein self-referencing Canonical gesetzt, ohne `languages`-Matrix und
     * ohne `x-default` — beides waere ohne echte Alternativen bedeutungslos.
     */
    availableLocales?: readonly string[]
}

/** Canonical + hreflang-Alternates fuer eine Seite. */
export function buildAlternates({
    locale,
    path,
    availableLocales,
}: BuildAlternatesOptions): Metadata["alternates"] {
    const canonical = localeUrl(locale, path)

    if (!availableLocales || availableLocales.length <= 1) {
        return { canonical }
    }

    const languages: Record<string, string> = Object.fromEntries(
        availableLocales.map((code) => [code, localeUrl(code, path)]),
    )

    /* x-default nur, wenn die Default-Locale tatsaechlich zu den Alternativen gehoert. */
    if (availableLocales.includes(routing.defaultLocale)) {
        languages["x-default"] = localeUrl(routing.defaultLocale, path)
    }

    return { canonical, languages }
}

interface BuildPageMetadataOptions extends BuildAlternatesOptions {
    title: string
    description: string
    ogType?: "website" | "article"
}

/**
 * Vollstaendige Metadata fuer eine "einfache" Seite: Title (immer `absolute`,
 * damit das globale `title.template` nie greift), Description, Canonical/
 * hreflang ueber `buildAlternates`, sowie passende OpenGraph/Twitter-Werte.
 *
 * Fuer Seiten mit eigenen zusaetzlichen OpenGraph-Feldern (Bilder, Tags,
 * `publishedTime` etc., z. B. Journal-Artikel) `buildAlternates` direkt
 * verwenden statt dieser Kurzform.
 */
export function buildPageMetadata({
    locale,
    path,
    title,
    description,
    availableLocales,
    ogType = "website",
}: BuildPageMetadataOptions): Metadata {
    const url = localeUrl(locale, path)

    return {
        title: { absolute: title },
        description,
        alternates: buildAlternates({ locale, path, availableLocales }),
        openGraph: {
            type: ogType,
            url,
            siteName: SITE_NAME,
            locale: toOgLocale(locale),
            title,
            description,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    }
}
