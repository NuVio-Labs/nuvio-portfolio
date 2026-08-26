/**
 * Rotation der Projekte in der Work-Section auf der Startseite.
 *
 * Der Pool ist groesser als die Anzahl der Karten, damit die Startseite nicht
 * immer dieselben Projekte zeigt. Die Reihenfolge haengt allein an der
 * Kalenderwoche, ist also fuer Server und Client identisch und bleibt innerhalb
 * einer Woche stabil (gut fuer Caching und SEO).
 */

export const LANDING_PROJECT_POOL = [
    "wt-erdbewegungen",
    "daisymays-salon",
    "jan-behr",
    "dj-white-label",
] as const

export type ProjectId = (typeof LANDING_PROJECT_POOL)[number]

/** Anzahl der Karten, die gleichzeitig auf der Startseite stehen. */
export const LANDING_PROJECT_COUNT = 3

const MS_PER_DAY = 86_400_000

/** Fortlaufende Wochennummer seit Epoch. Der Wechsel liegt auf Montag. */
function weekIndex(date: Date): number {
    return Math.floor((Math.floor(date.getTime() / MS_PER_DAY) + 3) / 7)
}

/**
 * Liefert die Projekt-IDs fuer die Startseite. Jede Woche rueckt der Pool um
 * eine Position weiter: ein Projekt faellt raus, ein anderes kommt rein.
 */
export function getRotatedProjectIds(date: Date = new Date()): ProjectId[] {
    const offset = weekIndex(date) % LANDING_PROJECT_POOL.length

    return Array.from(
        { length: Math.min(LANDING_PROJECT_COUNT, LANDING_PROJECT_POOL.length) },
        (_, i) => LANDING_PROJECT_POOL[(offset + i) % LANDING_PROJECT_POOL.length]
    )
}
