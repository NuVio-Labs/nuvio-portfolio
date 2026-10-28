"use client"

import { useState, useRef, useEffect, useId } from "react"
import { useLocale, useTranslations } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { routing } from "@/i18n/routing"
import { resolveLocaleSwitchPath } from "@/i18n/locale-routes"
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

function persistLocaleCookie(newLocale: string) {
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`
}

export function LanguageSwitcher() {
    const locale = useLocale()
    const t = useTranslations("nav")
    const menuId = useId()
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
        function handleEscape(event: KeyboardEvent) {
            if (event.key === "Escape") setIsOpen(false)
        }
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handleEscape)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [])

    function switchLocale(newLocale: string) {
        const segments = pathname.split("/")
        // Pfad unterhalb des Locale-Segments, z. B. "/webdesign-kleve" oder
        // "" fuer die Startseite ("/de" -> segments = ["", "de"]).
        const belowLocale = segments.length > 2 ? `/${segments.slice(2).join("/")}` : ""

        // Nie auf eine Route zeigen, die es in der Zielsprache nicht gibt
        // (z. B. die einsprachigen Local-SEO-Landingpages) — stattdessen auf
        // die Startseite der Zielsprache ausweichen.
        const targetPath = resolveLocaleSwitchPath(belowLocale, newLocale)
        const newPath = `/${newLocale}${targetPath}`

        persistLocaleCookie(newLocale)

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
                aria-expanded={isOpen}
                aria-controls={menuId}
            >
                {/* Zugaenglicher Name "Sprache wechseln: DE" enthaelt den sichtbaren
                    Text, so wie es Screenreader und KI-Agenten erwarten. */}
                <span className="sr-only">{t("switchLanguage")}: </span>
                <span className="uppercase">{localeCodes[locale]}</span>
                <ChevronDown aria-hidden="true" className={cn("h-4 w-4 transition-transform duration-200", isOpen && "rotate-180")} />
            </button>

            {/* Ausklapp-Menue (Disclosure-Muster): einfache Buttons statt
                listbox/option. Zugeklappt per "invisible" komplett aus dem
                Accessibility-Baum, damit niemand unsichtbare Optionen findet. */}
            <div
                id={menuId}
                className={cn(
                    "absolute right-0 mt-2 w-44 rounded-xl border border-border-soft bg-surface/95 backdrop-blur-xl shadow-xl overflow-hidden z-[100]",
                    "transition-all duration-150 ease-out origin-top-right",
                    isOpen
                        ? "visible opacity-100 scale-100 translate-y-0 pointer-events-auto"
                        : "invisible opacity-0 scale-95 translate-y-2 pointer-events-none"
                )}
            >
                <ul className="p-1" aria-label={t("switchLanguage")}>
                    {routing.locales.map((loc) => (
                        <li key={loc}>
                            <button
                                type="button"
                                lang={loc}
                                onClick={() => switchLocale(loc)}
                                className={cn(
                                    "w-full flex items-center justify-between px-3 py-2.5 text-sm rounded-md transition-colors text-left",
                                    loc === locale
                                        ? "text-accent-text font-semibold"
                                        : "text-text-muted hover:text-text-primary hover:bg-surface-soft"
                                )}
                                aria-current={loc === locale ? "true" : undefined}
                            >
                                <span>{localeLabels[loc]}</span>
                                {loc === locale && <Check aria-hidden="true" className="h-4 w-4" />}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
