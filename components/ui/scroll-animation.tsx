import type { CSSProperties } from "react"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

/**
 * Sanfte Eintritts-Animation fuer Sektionsinhalte.
 *
 * Rein CSS-basiert (".nv-reveal" in globals.css, analog zum bestehenden
 * ".hero-reveal"-Muster) statt IntersectionObserver + React-State: der
 * Inhalt steht damit unveraendert im initialen HTML und ist ohne
 * JavaScript sowie unabhaengig von Scroll-Position sofort vorhanden. Die
 * Animation laeuft automatisch beim Mount ab und endet garantiert bei
 * opacity:1 — sie ist nie Voraussetzung fuer Sichtbarkeit, nur eine
 * zusaetzliche, rein optische Anreicherung. prefers-reduced-motion wird
 * zentral in globals.css respektiert.
 */
export function ScrollAnimation({ children, className, delay = 0 }: ScrollAnimationProps) {
    return (
        <div
            className={cn("nv-reveal", className)}
            style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}
        >
            {children}
        </div>
    )
}
