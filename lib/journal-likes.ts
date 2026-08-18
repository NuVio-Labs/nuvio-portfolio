import "server-only"

/**
 * Like-Zaehler auf Upstash Redis, angesprochen ueber dessen REST-Schnittstelle.
 *
 * Fuer einen reinen Zaehler ist das die passende Bauform: INCR ist atomar,
 * es braucht kein Schema und keine Migration. Bewusst ohne SDK — es sind
 * zwei Aufrufe, das rechtfertigt keine Abhaengigkeit.
 *
 * Beide Werte bleiben serverseitig und erreichen den Browser nie. Der Token
 * hat vollen Schreibzugriff auf die Datenbank, er darf nicht ins Bundle.
 */

/*
 * Die Vercel-Integration legt die Variablen je nach Anbieterweg unter
 * unterschiedlichen Namen an. Beide Schreibweisen akzeptieren, damit es
 * ohne Nacharbeit passt.
 */
const REST_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN

/** Eigener Namensraum, falls die Datenbank noch anderes enthaelt. */
function key(slug: string): string {
    return encodeURIComponent(`journal:likes:${slug}`)
}

export function likesConfigured(): boolean {
    return Boolean(REST_URL && REST_TOKEN)
}

/**
 * Ergebnis eines Kommandos.
 *
 * `ok: false` heisst Stoerung, `ok: true` mit `result: null` heisst dagegen,
 * dass der Schluessel schlicht noch nicht existiert. Die beiden Faelle
 * duerfen nicht zusammenfallen: sonst zeigte der Zaehler bei einem Ausfall
 * "noch keine Likes" an, statt sich auszublenden.
 */
type CommandResult = { ok: true; result: unknown } | { ok: false }

async function command(path: string): Promise<CommandResult> {
    if (!likesConfigured()) return { ok: false }

    try {
        const res = await fetch(`${REST_URL}/${path}`, {
            headers: { Authorization: `Bearer ${REST_TOKEN}` },
            cache: "no-store",
        })
        if (!res.ok) return { ok: false }

        const body: { result?: unknown; error?: string } = await res.json()
        if (body.error) {
            console.error("Upstash-Fehler:", body.error)
            return { ok: false }
        }
        return { ok: true, result: body.result ?? null }
    } catch {
        return { ok: false }
    }
}

/** Aktueller Stand. Null, wenn der Dienst nicht erreichbar ist. */
export async function getLikeCount(slug: string): Promise<number | null> {
    const response = await command(`get/${key(slug)}`)
    if (!response.ok) return null

    /* Schluessel noch nicht angelegt: der Artikel hat schlicht null Likes. */
    if (response.result === null) return 0

    const value = Number(response.result)
    return Number.isFinite(value) ? value : 0
}

/** Zaehlt atomar hoch und liefert den neuen Stand. Null bei Fehlern. */
export async function incrementLike(slug: string): Promise<number | null> {
    const response = await command(`incr/${key(slug)}`)
    if (!response.ok) return null

    return typeof response.result === "number" ? response.result : null
}
