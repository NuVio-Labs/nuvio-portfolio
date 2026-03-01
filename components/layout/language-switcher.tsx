"use client"

import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { routing } from "@/i18n/routing"

const localeLabels: Record<string, string> = {
    de: "DE",
    en: "EN",
    nl: "NL",
}

export function LanguageSwitcher() {
    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()

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
    }

    return (
        <div className="flex items-center gap-0.5" role="group" aria-label={localeLabels[locale]}>
            {routing.locales.map((loc) => (
                <button
                    key={loc}
                    onClick={() => switchLocale(loc)}
                    disabled={loc === locale}
                    className={`min-h-[44px] min-w-[44px] rounded-md text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${loc === locale
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                        }`}
                    aria-label={`${localeLabels[loc]}${loc === locale ? " (active)" : ""}`}
                    aria-current={loc === locale ? "true" : undefined}
                >
                    {localeLabels[loc]}
                </button>
            ))}
        </div>
    )
}
