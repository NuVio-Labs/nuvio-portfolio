"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import type { TocEntry } from "@/lib/journal"

/** Abstand von der Oberkante, ab dem eine Ueberschrift als "erreicht" gilt. */
const ACTIVE_OFFSET = 140

/**
 * Sidebar-Liste mit aktiver Section.
 *
 * Bewusst per rAF-gedrosseltem Scroll-Handler statt IntersectionObserver:
 * gesucht ist die zuletzt passierte Ueberschrift, nicht die gerade sichtbare.
 * Das ist mit IO deutlich umstaendlicher und bei ~10 Ueberschriften nicht
 * schneller. Gleiches Muster wie Navbar und Lesefortschritt.
 */
export function TocLinks({ entries }: { entries: TocEntry[] }) {
    const [activeId, setActiveId] = React.useState<string>("")

    React.useEffect(() => {
        let rafId: number

        const update = () => {
            let current = ""
            for (const entry of entries) {
                const el = document.getElementById(entry.id)
                if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = entry.id
            }

            /* Am Seitenende die letzte Ueberschrift markieren, auch wenn sie
               den Schwellwert nie erreicht (kurzer letzter Abschnitt). */
            const atBottom =
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
            if (atBottom && entries.length > 0) current = entries[entries.length - 1].id

            setActiveId(current)
        }

        const onScroll = () => {
            cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(update)
        }

        update()
        window.addEventListener("scroll", onScroll, { passive: true })
        window.addEventListener("resize", onScroll, { passive: true })

        return () => {
            window.removeEventListener("scroll", onScroll)
            window.removeEventListener("resize", onScroll)
            cancelAnimationFrame(rafId)
        }
    }, [entries])

    return (
        <ol className="space-y-3 border-l border-border-soft">
            {entries.map((entry) => {
                const isActive = entry.id === activeId
                return (
                    <li key={entry.id}>
                        <a
                            href={`#${entry.id}`}
                            aria-current={isActive ? "location" : undefined}
                            className={cn(
                                "-ml-px block border-l-2 transition-colors",
                                entry.level === 2
                                    ? "pl-4 text-[13px] leading-[1.45]"
                                    : "pl-7 text-[12px] leading-[1.4]",
                                isActive
                                    ? "border-l-accent font-semibold text-accent-text"
                                    : cn(
                                          "border-l-transparent hover:text-text-primary",
                                          entry.level === 2 ? "text-text-secondary" : "text-text-muted",
                                      ),
                            )}
                        >
                            {entry.text}
                        </a>
                    </li>
                )
            })}
        </ol>
    )
}
