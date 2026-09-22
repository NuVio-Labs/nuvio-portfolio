/**
 * Pfade unterhalb des Locale-Segments, die nur in bestimmten Sprachen
 * existieren. Jede betroffene page.tsx sichert das bereits selbst per
 * `if (locale !== "de") notFound()` (siehe z. B.
 * app/[locale]/webdesign-kranenburg/page.tsx) ab — diese Liste ist die
 * zentrale Referenz dafuer, damit Stellen wie der LanguageSwitcher niemals
 * auf eine so blockierte Route zeigen.
 *
 * Neue einsprachige Seiten hier ergaenzen, statt Sonderfaelle im Switcher
 * selbst zu bauen.
 */
const LOCALE_RESTRICTED_PATHS: ReadonlyArray<{ path: string; locales: readonly string[] }> = [
    { path: "/webdesign-kranenburg", locales: ["de"] },
    { path: "/webdesign-kleve", locales: ["de"] },
    { path: "/webdesign-groesbeek", locales: ["nl"] },
]

/**
 * Liefert die Zielroute fuer einen Sprachwechsel: denselben Pfad, wenn er in
 * der Zielsprache existiert, sonst die Startseite der Zielsprache als
 * Fallback (keine erfundene Uebersetzung, kein 404).
 *
 * @param path Pfad unterhalb des Locale-Segments, z. B. "/webdesign-kleve"
 *   oder "" fuer die Startseite.
 */
export function resolveLocaleSwitchPath(path: string, targetLocale: string): string {
    const restriction = LOCALE_RESTRICTED_PATHS.find((entry) => entry.path === path)
    if (restriction && !restriction.locales.includes(targetLocale)) {
        return ""
    }
    return path
}
