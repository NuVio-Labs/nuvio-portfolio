interface JournalStepProps {
    /** Bewusst als Text, damit "01" statt "1" moeglich ist. */
    number: string
    title: string
    description: string
}

/** Ein Schritt. Nur innerhalb von <JournalSteps> verwenden. */
export function JournalStep({ number, title, description }: JournalStepProps) {
    return (
        <li className="relative border-l border-border-strong pb-8 pl-6 last:pb-0">
            {/* Markiert den Schrittanfang auf der Linie. */}
            <span
                className="absolute left-0 top-1.5 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent"
                aria-hidden="true"
            />
            <p className="font-heading text-[13px] font-semibold tracking-[0.18em] text-accent-text tabular-nums">
                {number}
            </p>
            <p className="mt-2 font-heading text-[1.05rem] font-semibold leading-snug text-text-primary">
                {title}
            </p>
            <p className="mt-2 text-[15px] leading-7 text-text-secondary">{description}</p>
        </li>
    )
}

/**
 * Nummerierte Abfolge fuer Argumentationsketten.
 *
 * Bewusst eine <ol>: die Reihenfolge traegt Bedeutung. Fuer Aufzaehlungen
 * ohne Reihenfolge gehoert eine normale Liste in den Fliesstext.
 */
export function JournalSteps({ children }: { children: React.ReactNode }) {
    return <ol className="my-10">{children}</ol>
}
