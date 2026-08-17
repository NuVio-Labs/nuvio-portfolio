import { Info, Lightbulb, AlertCircle } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { cn } from "@/lib/utils"

export type CalloutType = "info" | "tip" | "important"

const ICONS = {
    info: Info,
    tip: Lightbulb,
    important: AlertCircle,
} as const

/**
 * Alle Callouts sitzen auf derselben warmen Flaeche und heben sich ueber den
 * Tonwert vom Fliesstext ab, nicht ueber Farbe. Die goldene Kante links
 * markiert Zusatzwissen; nur "important" traegt den Akzent zusaetzlich im
 * Label. Unterschieden werden die Typen ueber Icon und Text, nicht ueber
 * Farbe allein.
 */
const STYLES = {
    info: {
        edge: "border-l-border-strong",
        icon: "text-text-muted",
        label: "text-text-secondary",
    },
    tip: {
        edge: "border-l-accent",
        icon: "text-accent",
        label: "text-text-secondary",
    },
    important: {
        edge: "border-l-accent",
        icon: "text-accent",
        label: "text-accent",
    },
} as const

interface JournalCalloutProps {
    type?: CalloutType
    children: React.ReactNode
}

export async function JournalCallout({ type = "info", children }: JournalCalloutProps) {
    const t = await getTranslations("journal.callouts")
    const Icon = ICONS[type]
    const style = STYLES[type]

    return (
        <aside
            className={cn(
                "my-9 rounded-2xl rounded-l-md border border-l-[3px] border-border-strong bg-surface-strong p-5 sm:p-6",
                style.edge,
            )}
        >
            <p
                className={cn(
                    "mb-2.5 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]",
                    style.label,
                )}
            >
                <Icon className={cn("h-4 w-4 shrink-0", style.icon)} aria-hidden="true" />
                {t(type)}
            </p>
            <div className="text-[15px] leading-7 text-text-secondary [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                {children}
            </div>
        </aside>
    )
}
