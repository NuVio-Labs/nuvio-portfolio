import { NextResponse } from "next/server"
import { getJournalArticle } from "@/lib/journal"
import { getLikeCount, incrementLike, likesConfigured } from "@/lib/journal-likes"
import { routing } from "@/i18n/routing"

/** Nie zwischenspeichern, der Zaehler soll aktuell sein. */
export const dynamic = "force-dynamic"

const SLUG_PATTERN = /^[a-z0-9-]{1,120}$/

/**
 * Grobe Drossel gegen versehentliches Dauerklicken.
 *
 * Die Map lebt pro Serverinstanz und wird bei jedem Kaltstart geleert, auf
 * Vercel gibt es zudem mehrere Instanzen. Das ist also kein Schutz gegen
 * jemanden, der die Zahl bewusst hochtreiben will — dafuer waere ein Zaehler
 * pro IP in der Datenbank noetig. Fuer einen Like-Zaehler auf einem
 * Studio-Journal ist der Aufwand nicht gerechtfertigt.
 */
const RATE_LIMIT_MS = 3000
const lastSeen = new Map<string, number>()

function rateLimited(ip: string): boolean {
    const now = Date.now()
    const previous = lastSeen.get(ip)
    if (previous && now - previous < RATE_LIMIT_MS) return true

    lastSeen.set(ip, now)
    /* Map klein halten, sonst waechst sie unbegrenzt. */
    if (lastSeen.size > 5000) {
        for (const [key, time] of lastSeen) {
            if (now - time > RATE_LIMIT_MS) lastSeen.delete(key)
        }
    }
    return false
}

/** Nur Slugs zulassen, zu denen es wirklich einen Artikel gibt. */
async function isKnownSlug(slug: string): Promise<boolean> {
    for (const locale of routing.locales) {
        if (await getJournalArticle(locale, slug)) return true
    }
    return false
}

export async function GET(request: Request) {
    if (!likesConfigured()) {
        return NextResponse.json({ error: "not_configured" }, { status: 503 })
    }

    const slug = new URL(request.url).searchParams.get("slug") ?? ""
    if (!SLUG_PATTERN.test(slug)) {
        return NextResponse.json({ error: "invalid_slug" }, { status: 400 })
    }

    const count = await getLikeCount(slug)
    if (count === null) {
        return NextResponse.json({ error: "unavailable" }, { status: 502 })
    }

    return NextResponse.json({ count })
}

export async function POST(request: Request) {
    if (!likesConfigured()) {
        return NextResponse.json({ error: "not_configured" }, { status: 503 })
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown"
    if (rateLimited(ip)) {
        return NextResponse.json({ error: "rate_limited" }, { status: 429 })
    }

    let slug = ""
    try {
        slug = String(((await request.json()) as { slug?: unknown }).slug ?? "")
    } catch {
        return NextResponse.json({ error: "invalid_body" }, { status: 400 })
    }

    if (!SLUG_PATTERN.test(slug) || !(await isKnownSlug(slug))) {
        return NextResponse.json({ error: "invalid_slug" }, { status: 400 })
    }

    const count = await incrementLike(slug)
    if (count === null) {
        return NextResponse.json({ error: "unavailable" }, { status: 502 })
    }

    return NextResponse.json({ count })
}
