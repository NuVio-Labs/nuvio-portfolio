import Image from "next/image"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
    /** Wortmarke, z. B. "NuVioLabs" (aus messages: nav.brand). */
    name: string
    /** Zusatz unter der Wortmarke, z. B. "Design & Webentwicklung". */
    tagline: string
    /** Tailwind-Klassen fuer die Sichtbarkeit des Zusatzes (Standard: immer sichtbar). */
    taglineClassName?: string
    /** Groesse des Emblems in px. */
    size?: number
    className?: string
}

/**
 * Logo-Lockup wie auf der Druckvorlage: Gold-Emblem, Wortmarke "NuVioLabs"
 * und gesperrter Zusatz "Design & Webentwicklung".
 *
 * Das Emblem ist dekorativ (alt=""), der Markenname steht als Text daneben.
 */
export function BrandLogo({ name, tagline, taglineClassName, size = 34, className }: BrandLogoProps) {
    return (
        <span className={cn("inline-flex items-center gap-2.5", className)}>
            <Image
                src="/logo.png"
                alt=""
                width={size}
                height={Math.round(size * (399 / 392))}
                className="shrink-0"
            />
            <span className="flex flex-col leading-none">
                <span className="font-heading text-[18px] font-semibold tracking-[-0.02em]">{name}</span>
                <span
                    className={cn(
                        "mt-1 text-[10px] font-medium tracking-[0.16em] text-text-muted",
                        taglineClassName
                    )}
                >
                    {tagline}
                </span>
            </span>
        </span>
    )
}
