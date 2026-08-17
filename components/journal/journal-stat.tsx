import { cn } from "@/lib/utils"

interface JournalStatProps {
    /** Der Wert selbst, z. B. "≤ 2,5 s" oder "38 %". Traegt die Aussage. */
    value: string
    /** Kurzer Bezeichner, z. B. "LCP". */
    label: string
    /** Optionale Einordnung in einem Satz. */
    description?: string
}

/**
 * Einzelne Kennzahl. Nur innerhalb von <JournalStatGroup> verwenden, damit
 * Raster und Abstaende einheitlich bleiben.
 *
 * Der Wert ist das einzige Element im Artikel, das Gold gross einsetzt. Er
 * nutzt accent-text statt accent, weil das regulaere Gold auf Cream nur
 * 2.35:1 erreicht.
 */
export function JournalStat({ value, label, description }: JournalStatProps) {
    return (
        <li className="border-t border-border-strong pt-5">
            <p className="font-heading text-[2.25rem] font-semibold leading-none tracking-tight text-accent-text tabular-nums sm:text-[2.6rem]">
                {value}
            </p>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-text-primary">
                {label}
            </p>
            {description && (
                <p className="mt-2 text-[14px] leading-6 text-text-muted">{description}</p>
            )}
        </li>
    )
}

interface JournalStatGroupProps {
    children: React.ReactNode
    /** Spaltenzahl ab sm. Mobil steht immer eine Kennzahl pro Zeile. */
    columns?: 2 | 3
    className?: string
}

/** Raster fuer zwei bis drei Kennzahlen nebeneinander. */
export function JournalStatGroup({ children, columns = 3, className }: JournalStatGroupProps) {
    return (
        <ul
            className={cn(
                "my-10 grid gap-8 sm:gap-6",
                columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3",
                className,
            )}
        >
            {children}
        </ul>
    )
}
