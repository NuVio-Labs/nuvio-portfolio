"use client"

import { useEffect, useId, useRef } from "react"
import { useTranslations } from "next-intl"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useConsent } from "./consent-provider"

const FOCUSABLE_SELECTOR = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

/**
 * Echter Modal-Dialog (role="dialog", aria-modal) fuer die Einstellungen —
 * im Gegensatz zum Banner blockiert dieser bewusst den Rest der Seite,
 * solange er offen ist.
 *
 * Ohne externe Dialog-Bibliothek umgesetzt (im Projekt bislang keine
 * vorhanden, siehe Architekturanalyse): eigener, minimaler Fokus-Trap statt
 * einer neuen Abhaengigkeit nur fuer diesen einen Dialog.
 */
export function ConsentDialog() {
    const t = useTranslations("consent")
    const {
        isSettingsOpen,
        analyticsDraft,
        setAnalyticsDraft,
        closeSettings,
        acceptAll,
        savePreferences,
    } = useConsent()

    const dialogRef = useRef<HTMLDivElement>(null)
    const closeButtonRef = useRef<HTMLButtonElement>(null)
    const previouslyFocused = useRef<HTMLElement | null>(null)
    const titleId = useId()
    const descriptionId = useId()

    // Fokus-Management: beim Oeffnen in den Dialog, beim Schliessen zurueck
    // zum ausloesenden Element (Banner-"Einstellungen" oder Footer-Link).
    useEffect(() => {
        if (isSettingsOpen) {
            previouslyFocused.current = document.activeElement as HTMLElement | null
            closeButtonRef.current?.focus()
        } else {
            previouslyFocused.current?.focus()
        }
    }, [isSettingsOpen])

    // ESC schliesst (verwirft nicht gespeicherte Toggle-Aenderungen, siehe
    // "keine Zustimmung durchs Schliessen"), Tab bleibt innerhalb des Dialogs.
    useEffect(() => {
        if (!isSettingsOpen) return

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                event.preventDefault()
                closeSettings()
                return
            }
            if (event.key !== "Tab" || !dialogRef.current) return

            const focusable = dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
            if (focusable.length === 0) return
            const first = focusable[0]
            const last = focusable[focusable.length - 1]

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault()
                last.focus()
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault()
                first.focus()
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [isSettingsOpen, closeSettings])

    if (!isSettingsOpen) return null

    return (
        <div
            className="fixed inset-0 z-[110] flex items-end justify-center bg-background/70 p-4 backdrop-blur-sm sm:items-center"
            onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeSettings()
            }}
        >
            <div
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                className="max-h-[85vh] w-full max-w-md overflow-y-auto rounded-2xl border border-border-soft bg-surface p-6 shadow-xl sm:p-7"
            >
                <div className="flex items-start justify-between gap-4">
                    <h2 id={titleId} className="font-heading text-lg font-semibold text-text-primary">
                        {t("dialogTitle")}
                    </h2>
                    <button
                        ref={closeButtonRef}
                        type="button"
                        onClick={closeSettings}
                        aria-label={t("close")}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-soft text-text-muted transition-colors hover:border-accent/40 hover:text-accent"
                    >
                        <X className="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>

                <p id={descriptionId} className="mt-2 text-sm leading-relaxed text-text-muted">
                    {t("dialogDescription")}
                </p>

                <div className="mt-6 space-y-4">
                    {/* Essential — immer aktiv, nicht deaktivierbar */}
                    <div className="flex items-start justify-between gap-4 rounded-xl border border-border-soft bg-surface-soft p-4">
                        <div>
                            <p className="text-sm font-semibold text-text-primary">{t("essential.title")}</p>
                            <p className="mt-1 text-xs leading-relaxed text-text-muted">
                                {t("essential.description")}
                            </p>
                        </div>
                        <span className="mt-0.5 shrink-0 rounded-full border border-border-soft bg-surface px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                            {t("essential.alwaysOn")}
                        </span>
                    </div>

                    {/* Analytics — Standard aus, nur per aktivem Toggle */}
                    <div className="flex items-start justify-between gap-4 rounded-xl border border-border-soft p-4">
                        <div>
                            <label htmlFor="consent-analytics-toggle" className="text-sm font-semibold text-text-primary">
                                {t("analytics.title")}
                            </label>
                            <p className="mt-1 text-xs leading-relaxed text-text-muted">
                                {t("analytics.description")}
                            </p>
                        </div>
                        <button
                            id="consent-analytics-toggle"
                            type="button"
                            role="switch"
                            aria-checked={analyticsDraft}
                            onClick={() => setAnalyticsDraft(!analyticsDraft)}
                            className={cn(
                                "relative mt-0.5 h-7 w-12 shrink-0 rounded-full border transition-colors",
                                analyticsDraft ? "border-accent bg-accent" : "border-border-strong bg-surface-soft"
                            )}
                        >
                            <span
                                aria-hidden="true"
                                className={cn(
                                    "absolute top-0.5 h-5 w-5 rounded-full bg-surface shadow-sm transition-transform",
                                    analyticsDraft ? "translate-x-[22px]" : "translate-x-0.5"
                                )}
                            />
                        </button>
                    </div>
                </div>

                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                    <button
                        type="button"
                        onClick={() => savePreferences(analyticsDraft)}
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-surface transition-all duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98]"
                    >
                        {t("save")}
                    </button>
                    <button
                        type="button"
                        onClick={acceptAll}
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-200 hover:border-accent/50 hover:text-accent active:scale-[0.98]"
                    >
                        {t("acceptAll")}
                    </button>
                </div>
            </div>
        </div>
    )
}
