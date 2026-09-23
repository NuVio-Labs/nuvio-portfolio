"use client"

import { useTranslations } from "next-intl"
import { useConsent } from "./consent-provider"

/**
 * Nicht-modaler Hinweis (kein role="dialog"): die Seite bleibt vollstaendig
 * bedien- und fokussierbar, solange noch keine Entscheidung getroffen ist.
 * "Alle akzeptieren" und "Nur notwendige" sind bewusst gleich grosse
 * Pill-Buttons (nur Fuellung vs. Outline unterscheidet Primary/Secondary,
 * dasselbe Muster wie jedes andere CTA-Paar auf dieser Website) — keines
 * davon ist kleiner, unauffaelliger oder schwerer erreichbar als das andere.
 */
export function ConsentBanner() {
    const t = useTranslations("consent")
    const { consent, isSettingsOpen, acceptAll, rejectOptional, openSettings } = useConsent()

    if (consent !== null) return null

    return (
        <div
            role="region"
            aria-label={t("bannerAriaLabel")}
            // Waehrend der Dialog offen ist: nicht unmounten (das wuerde den
            // DOM-Knoten des "Einstellungen"-Buttons zerstoeren, auf den die
            // Fokus-Rueckgabe im Dialog per Ref zeigt — ihr Ziel ginge beim
            // Wiederherstellen verloren). `inert` macht die Banner-Buttons
            // stattdessen nur voruebergehend nicht fokussier-/erreichbar;
            // sichtbar ist ohnehin nichts davon, der Dialog-Hintergrund
            // deckt die Banner-Position vollstaendig ab.
            inert={isSettingsOpen}
            className="fixed inset-x-0 bottom-0 z-[100] border-t border-border-soft bg-surface/95 backdrop-blur-xl shadow-[0_-8px_30px_rgba(0,0,0,0.08)]"
        >
            <div className="nv-container flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8 sm:py-6">
                <div className="max-w-2xl">
                    <p className="font-heading text-sm font-semibold text-text-primary">{t("title")}</p>
                    <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{t("description")}</p>
                </div>

                <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:shrink-0">
                    <button
                        type="button"
                        onClick={openSettings}
                        className="inline-flex items-center justify-center px-2 py-3 text-sm font-medium text-text-secondary underline decoration-border-strong underline-offset-4 transition-colors hover:text-accent"
                    >
                        {t("settings")}
                    </button>
                    <button
                        type="button"
                        onClick={rejectOptional}
                        className="inline-flex items-center justify-center rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-accent/50 hover:text-accent active:scale-[0.98]"
                    >
                        {t("rejectOptional")}
                    </button>
                    <button
                        type="button"
                        onClick={acceptAll}
                        className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-surface transition-all duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98]"
                    >
                        {t("acceptAll")}
                    </button>
                </div>
            </div>
        </div>
    )
}
