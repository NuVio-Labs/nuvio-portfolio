"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"

/** Merkt sich pro Browser, welche Artikel schon geliked wurden. */
const STORAGE_KEY = "nuvio:journal-likes"

function likedSlugs(): string[] {
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        return raw ? (JSON.parse(raw) as string[]) : []
    } catch {
        return []
    }
}

/**
 * Like-Zaehler.
 *
 * Rendert nichts, solange der Zaehler nicht erreichbar ist — ohne
 * konfiguriertes Supabase bleibt der Artikel damit unveraendert, statt einen
 * kaputten Button zu zeigen.
 *
 * Die Sperre gegen Mehrfach-Likes liegt im localStorage. Das verhindert
 * versehentliches Doppelklicken, ist aber bewusst kein echter Schutz: eine
 * fensterbasierte Sperre laesst sich trivial umgehen. Fuer eine belastbare
 * Zahl braeuchte es Anmeldung, und das steht in keinem Verhaeltnis.
 */
export function JournalLikes({ slug }: { slug: string }) {
    const t = useTranslations("journal.likes")
    const [count, setCount] = React.useState<number | null>(null)
    const [liked, setLiked] = React.useState(false)
    const [pending, setPending] = React.useState(false)

    React.useEffect(() => {
        let active = true
        setLiked(likedSlugs().includes(slug))

        fetch(`/api/journal/likes?slug=${encodeURIComponent(slug)}`)
            .then((res) => (res.ok ? res.json() : null))
            .then((data: { count: number } | null) => {
                if (active && data) setCount(data.count)
            })
            .catch(() => {
                /* Zaehler bleibt aus. */
            })

        return () => {
            active = false
        }
    }, [slug])

    async function handleLike() {
        if (liked || pending || count === null) return
        setPending(true)

        /* Optimistisch, damit der Klick sofort quittiert wird. */
        setCount(count + 1)
        setLiked(true)

        try {
            const res = await fetch("/api/journal/likes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ slug }),
            })

            if (res.ok) {
                const data: { count: number } = await res.json()
                setCount(data.count)
                window.localStorage.setItem(
                    STORAGE_KEY,
                    JSON.stringify([...new Set([...likedSlugs(), slug])]),
                )
            } else {
                /* Zurueckdrehen, damit die Anzeige nicht luegt. */
                setCount(count)
                setLiked(false)
            }
        } catch {
            setCount(count)
            setLiked(false)
        } finally {
            setPending(false)
        }
    }

    if (count === null) return null

    return (
        <div className="flex items-center gap-3">
            <button
                type="button"
                onClick={handleLike}
                disabled={liked || pending}
                aria-pressed={liked}
                className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] font-medium transition-colors",
                    liked
                        ? "cursor-default border-accent/40 bg-accent-soft text-accent-text"
                        : "border-border-soft text-text-secondary hover:border-accent/50 hover:text-accent",
                )}
            >
                <Heart
                    className={cn("h-4 w-4", liked && "fill-current")}
                    aria-hidden="true"
                />
                {liked ? t("liked") : t("like")}
            </button>

            <span className="text-[13px] tabular-nums text-text-muted">
                {t("count", { count })}
            </span>
        </div>
    )
}
