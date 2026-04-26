import { cn } from "@/lib/utils"

interface SectionWrapperProps {
    children: React.ReactNode
    className?: string
    dark?: boolean
    accent?: boolean
    light?: boolean
    id?: string
}

export function SectionWrapper({
    children,
    className = "",
    dark = false,
    accent = false,
    light = false,
    id,
}: SectionWrapperProps) {
    const bg = dark
        ? "bg-[var(--nv-bg)]"
        : accent
        ? "bg-[var(--nv-accent-soft)]"
        : light
        ? "bg-[var(--nv-surface)]"
        : "bg-[var(--nv-bg)]"

    return (
        <section id={id} className={cn("section-py", bg, className)}>
            {children}
        </section>
    )
}
