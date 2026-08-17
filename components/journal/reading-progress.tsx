"use client"

import * as React from "react"

/**
 * Sehr dezenter Lesefortschritt: 2px-Linie direkt unter der Navbar.
 *
 * Rein dekorativ und deshalb aria-hidden — die Information ist fuer
 * Screenreader ueber die Scrollposition ohnehin vorhanden. Gedrosselt per
 * requestAnimationFrame, analog zur Navbar.
 */
export function ReadingProgress() {
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        let rafId: number

        const update = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight
            setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0)
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
    }, [])

    return (
        <div
            aria-hidden="true"
            className="fixed inset-x-0 top-16 z-40 h-[2px] bg-transparent md:top-20"
        >
            <div
                className="h-full origin-left bg-accent/70 motion-safe:transition-transform motion-safe:duration-150"
                style={{ transform: `scaleX(${progress})` }}
            />
        </div>
    )
}
