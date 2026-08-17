"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { usePathname } from "@/i18n/navigation"

/**
 * Routen, die unabhaengig vom gewaehlten Farbschema immer hell erscheinen.
 * Das Journal ist bewusst als Lesefläche gestaltet und nur fuer Light Mode
 * abgestimmt — die Editorial-Grafiken haben hellen Hintergrund.
 */
export function isForcedLightRoute(pathname: string) {
    return pathname === "/journal" || pathname.startsWith("/journal/")
}

export function ThemeProvider({
    children,
    ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    /* Ohne Locale-Praefix, daher der Pfad aus der next-intl-Navigation. */
    const pathname = usePathname()

    return (
        <NextThemesProvider
            {...props}
            /* forcedTheme ist der von next-themes vorgesehene Weg: es setzt die
               Klasse korrekt und deaktiviert das Umschalten, solange es greift. */
            forcedTheme={isForcedLightRoute(pathname) ? "light" : undefined}
        >
            {children}
        </NextThemesProvider>
    )
}
