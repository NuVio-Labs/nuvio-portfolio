import "server-only"

/**
 * Zugriff auf den Like-Zaehler ueber die REST-Schnittstelle von Supabase.
 *
 * Bewusst ohne @supabase/supabase-js: es sind genau zwei Aufrufe, dafuer
 * lohnt keine zusaetzliche Abhaengigkeit.
 *
 * Verwendet wird der anon-Key, nicht der service_role-Key. Der anon-Key
 * unterliegt weiterhin den Row-Level-Security-Regeln — Schreiben ist damit
 * nur ueber die SECURITY-DEFINER-Funktion moeglich, nicht direkt auf der
 * Tabelle. Beide Werte bleiben serverseitig, sie erreichen den Browser nie.
 */

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

export function likesConfigured(): boolean {
    return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

function headers(): HeadersInit {
    return {
        apikey: SUPABASE_ANON_KEY as string,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
    }
}

/** Aktueller Stand. Null, wenn der Dienst nicht erreichbar ist. */
export async function getLikeCount(slug: string): Promise<number | null> {
    if (!likesConfigured()) return null

    try {
        const url = `${SUPABASE_URL}/rest/v1/journal_likes?slug=eq.${encodeURIComponent(slug)}&select=count`
        const res = await fetch(url, { headers: headers(), cache: "no-store" })
        if (!res.ok) return null

        const rows: Array<{ count: number }> = await res.json()
        /* Noch kein Like: die Zeile entsteht erst beim ersten Hochzaehlen. */
        return rows[0]?.count ?? 0
    } catch {
        return null
    }
}

/** Zaehlt hoch und liefert den neuen Stand. Null bei Fehlern. */
export async function incrementLike(slug: string): Promise<number | null> {
    if (!likesConfigured()) return null

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/increment_journal_like`, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify({ article_slug: slug }),
            cache: "no-store",
        })
        if (!res.ok) return null

        const value = await res.json()
        return typeof value === "number" ? value : null
    } catch {
        return null
    }
}
