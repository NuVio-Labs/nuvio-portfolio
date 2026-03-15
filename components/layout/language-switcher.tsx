"use client"

import { useState, useRef, useEffect } from "react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { routing } from "@/i18n/routing"
import { ChevronDown, Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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
        // Replace the current locale prefix with the new one
        const segments = pathname.split("/")
        segments[1] = newLocale
        const newPath = segments.join("/")

        // Set cookie for locale persistence
        if (typeof document !== "undefined") {
            // eslint-disable-next-line react-hooks/immutability
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

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-background/95 backdrop-blur-md shadow-lg overflow-hidden z-[100]"
                    >
                        <div className="p-1" role="listbox">
                            {routing.locales.map((loc) => (
                                <button
                                    key={loc}
                                    onClick={() => switchLocale(loc)}
                                    className={cn(
                                        "w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-md transition-colors text-left",
                                        loc === locale
                                            ? "bg-secondary text-foreground font-medium"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                    )}
                                    role="option"
                                    aria-selected={loc === locale}
                                >
                                    <span>{localeLabels[loc]}</span>
                                    {loc === locale && <Check className="h-4 w-4" />}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
