import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { LOCALE_RESTRICTED_PATHS, getPathLocales } from "@/i18n/locale-routes";
import { getJournalArticles } from "@/lib/journal";
import { buildLanguageAlternates, localeUrl } from "@/lib/seo";

/**
 * Indexierbare statische Pfade unterhalb des Locale-Segments. Einsprachige
 * Landingpages kommen aus LOCALE_RESTRICTED_PATHS dazu. `cv/[key]`
 * (noindex) und `contact/sent` (nur noch Weiterleitung) fehlen bewusst.
 */
const STATIC_PATHS = [
    "",
    "/work",
    "/services",
    "/about",
    "/contact",
    "/research",
    "/privacy",
    "/imprint",
    "/journal",
];

/**
 * Ein Eintrag je Locale, in der der Pfad existiert. Jede Locale-Version ist
 * ihre eigene kanonische URL und traegt dieselbe hreflang-Matrix wie die
 * Seiten-Metadaten (beides aus buildLanguageAlternates in lib/seo.ts).
 */
function localizedEntries(
    path: string,
    locales: readonly string[],
    lastModified?: (locale: string) => string | undefined,
): MetadataRoute.Sitemap {
    const languages = buildLanguageAlternates(path, locales);

    return locales.map((locale) => {
        const modified = lastModified?.(locale);
        return {
            url: localeUrl(locale, path),
            ...(modified ? { lastModified: modified } : {}),
            ...(languages ? { alternates: { languages } } : {}),
        };
    });
}

/**
 * Nur kanonische URLs, jeweils mit hreflang-Alternates.
 *
 * lastModified nur dort, wo es ein echtes Aenderungsdatum gibt (Journal).
 * Ein bei jedem Abruf neues Datum fuer statische Seiten lehrt Google nur,
 * dem Feld nicht zu trauen. changeFrequency und priority wertet Google
 * nicht aus und fehlen deshalb.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const staticPaths = [...STATIC_PATHS, ...LOCALE_RESTRICTED_PATHS.map((entry) => entry.path)];
    const entries = staticPaths.flatMap((path) => localizedEntries(path, getPathLocales(path)));

    /* Slug -> (Locale -> Aenderungsdatum) ueber alle Sprachen hinweg. */
    const articleDates = new Map<string, Map<string, string>>();
    for (const locale of routing.locales) {
        for (const meta of await getJournalArticles(locale)) {
            const dates = articleDates.get(meta.slug) ?? new Map<string, string>();
            dates.set(locale, meta.updatedAt ?? meta.date);
            articleDates.set(meta.slug, dates);
        }
    }

    for (const [slug, dates] of articleDates) {
        /* Gleiche Reihenfolge und gleiche Auswahl wie getArticleLocales auf der Artikelseite. */
        const locales = routing.locales.filter((locale) => dates.has(locale));
        entries.push(...localizedEntries(`/journal/${slug}`, locales, (locale) => dates.get(locale)));
    }

    return entries;
}
