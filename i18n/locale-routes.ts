import { routing } from "./routing"

/**
 * Pfade unterhalb des Locale-Segments, die nur in bestimmten Sprachen
 * existieren. Jede betroffene page.tsx sichert das bereits selbst per
 * `if (locale !== "de") notFound()` (siehe z. B.
 * app/[locale]/webdesign-kranenburg/page.tsx) ab — diese Liste ist die
 * zentrale Referenz dafuer, damit Stellen wie der LanguageSwitcher oder die
 * Sitemap niemals auf eine so blockierte Route zeigen.
 *
 * Neue einsprachige Seiten hier ergaenzen, statt Sonderfaelle im Switcher
 * oder in der Sitemap selbst zu bauen.
 */
export const LOCALE_RESTRICTED_PATHS: ReadonlyArray<{ path: string; locales: readonly string[] }> = [
    { path: "/webdesign-kranenburg", locales: ["de"] },
    { path: "/webdesign-kleve", locales: ["de"] },
    { path: "/webdesign-groesbeek", locales: ["nl"] },
]

/**
 * Locales, in denen ein statischer Pfad existiert: die Einschraenkung aus
 * LOCALE_RESTRICTED_PATHS, sonst alle Locales. Journal-Artikel haengen vom
 * Content ab und laufen ueber getArticleLocales (lib/journal.ts).
 *
 * @param path Pfad unterhalb des Locale-Segments, z. B. "/webdesign-kleve"
 *   oder "" fuer die Startseite.
 */
export function getPathLocales(path: string): readonly string[] {
    return LOCALE_RESTRICTED_PATHS.find((entry) => entry.path === path)?.locales ?? routing.locales
}

/**
 * Liefert die Zielroute fuer einen Sprachwechsel: denselben Pfad, wenn er in
 * der Zielsprache existiert, sonst die Startseite der Zielsprache als
 * Fallback (keine erfundene Uebersetzung, kein 404).
 *
 * @param path Pfad unterhalb des Locale-Segments, z. B. "/webdesign-kleve"
 *   oder "" fuer die Startseite.
 */
export function resolveLocaleSwitchPath(path: string, targetLocale: string): string {
    return getPathLocales(path).includes(targetLocale) ? path : ""
}
