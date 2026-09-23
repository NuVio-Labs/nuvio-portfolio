"use client"

import { useEffect } from "react"
import { trackEvent, type ConversionEvent } from "@/lib/analytics"

/**
 * Zentrale Klick-Erfassung fuer Conversion-CTAs.
 *
 * Viele CTAs stehen in async Server Components (Hero, ValueProposition,
 * Work, …), die keine onClick-Handler annehmen koennen. Statt jede davon in
 * eine Client Component umzubauen, hoert diese eine Komponente einmal
 * global (per Event-Delegation) auf Klicks und liest die Event-Daten aus
 * data-Attributen im Markup:
 *
 *   <Link href="/contact" data-track="primary_cta_click" data-track-location="home-hero">
 *
 * "data-track-location" / "data-track-channel" landen 1:1 als Event-
 * Property — beides feste, im JSX hinterlegte Labels, nie Nutzereingaben.
 *
 * In app/[locale]/layout.tsx einmalig gemountet.
 */
export function ClickTracker() {
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            const target = (event.target as HTMLElement | null)?.closest<HTMLElement>("[data-track]")
            const name = target?.dataset.track
            if (!name) return

            const { trackLocation, trackChannel } = target.dataset
            trackEvent(name as ConversionEvent, {
                ...(trackLocation ? { location: trackLocation } : {}),
                ...(trackChannel ? { channel: trackChannel } : {}),
            })
        }

        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [])

    return null
}
