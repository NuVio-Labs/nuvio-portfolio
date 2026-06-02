"use client"

import { useState, useRef, useEffect } from "react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { routing } from "@/i18n/routing"
import { ChevronDown, Check } from "lucide-react"
import { cn } from "@/lib/utils"

const localeLabels: Record<string, string> = {
    de: "Deutsch",
    en: "English",
    nl: "Nederlands",
}

const localeCodes: Record<string, string> = {
    de: "DE",
    en: "EN",
    nl: "NL",
}

export function LanguageSwitcher() {
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    function switchLocale(newLocale: string) {
        const segments = pathname.split("/")
        segments[1] = newLocale
        const newPath = segments.join("/")

        if (typeof document !== "undefined") {
            document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`
        }

        router.push(newPath)
        setIsOpen(false)
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center gap-1.5 min-h-[44px] px-3 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:bg-secondary/50",
                    isOpen ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={`Select language (Current: ${localeLabels[locale]})`}
            >
                <span className="uppercase">{localeCodes[locale]}</span>
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            <div
                className={cn(
                    "absolute right-0 mt-2 w-44 rounded-xl border border-border-soft bg-surface/95 backdrop-blur-xl shadow-xl overflow-hidden z-[100]",
                    "transition-all duration-150 ease-out origin-top-right",
                    isOpen
                        ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 scale-95 translate-y-2 pointer-events-none"
                )}
            >
                <div className="p-1" role="listbox">
                    {routing.locales.map((loc) => (
                        <button
                            key={loc}
                            onClick={() => switchLocale(loc)}
                            className={cn(
                                "w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-md transition-colors text-left",
                                loc === locale
                                    ? "text-accent font-semibold"
                                    : "text-text-muted hover:text-text-primary hover:bg-surface-soft"
                            )}
                            role="option"
                            aria-selected={loc === locale}
                        >
                            <span>{localeLabels[loc]}</span>
                            {loc === locale && <Check className="h-4 w-4" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
