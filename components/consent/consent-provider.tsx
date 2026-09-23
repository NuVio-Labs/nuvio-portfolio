"use client"

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from "react"
import {
    type ConsentPreferences,
    getConsentServerSnapshot,
    getConsentSnapshot,
    setConsent as persistConsent,
    subscribeConsent,
} from "@/lib/consent"

interface ConsentContextValue {
    /** `null` = keine Entscheidung getroffen -> Banner zeigen. */
    consent: ConsentPreferences | null
    isSettingsOpen: boolean
    /** Entwurfswert des Analytics-Toggles im Einstellungsdialog, nur waehrend er offen ist relevant. */
    analyticsDraft: boolean
    setAnalyticsDraft: (value: boolean) => void
    openSettings: () => void
    closeSettings: () => void
    acceptAll: () => void
    rejectOptional: () => void
    savePreferences: (analytics: boolean) => void
}

const ConsentContext = createContext<ConsentContextValue | null>(null)

export function ConsentProvider({ children }: { children: ReactNode }) {
    // useSyncExternalStore statt useEffect-Sync: liest localStorage
    // SSR-sicher (getServerSnapshot liefert immer `null`) und haelt den
    // Zustand automatisch auch mit Aenderungen aus anderen Tabs konsistent.
    const consent = useSyncExternalStore(subscribeConsent, getConsentSnapshot, getConsentServerSnapshot)
    const [isSettingsOpen, setIsSettingsOpen] = useState(false)
    const [analyticsDraft, setAnalyticsDraft] = useState(false)

    /**
     * Der Entwurf wird bewusst hier beim Oeffnen gesetzt (im Event-Handler),
     * nicht ueber einen Effect, der auf `isSettingsOpen`/`consent` reagiert:
     * der Dialog rendert bei geschlossenem Zustand nur `null`, bleibt dabei
     * aber gemountet — ohne diese explizite Neubefuellung wuerde beim
     * Wiederoeffnen sonst ein alter, ungespeicherter Entwurf stehen bleiben.
     */
    function openSettings() {
        setAnalyticsDraft(consent?.analytics ?? false)
        setIsSettingsOpen(true)
    }

    function acceptAll() {
        persistConsent({ analytics: true })
        setIsSettingsOpen(false)
    }

    function rejectOptional() {
        persistConsent({ analytics: false })
        setIsSettingsOpen(false)
    }

    function savePreferences(analytics: boolean) {
        persistConsent({ analytics })
        setIsSettingsOpen(false)
    }

    return (
        <ConsentContext.Provider
            value={{
                consent,
                isSettingsOpen,
                analyticsDraft,
                setAnalyticsDraft,
                openSettings,
                closeSettings: () => setIsSettingsOpen(false),
                acceptAll,
                rejectOptional,
                savePreferences,
            }}
        >
            {children}
        </ConsentContext.Provider>
    )
}

export function useConsent() {
    const ctx = useContext(ConsentContext)
    if (!ctx) throw new Error("useConsent must be used within a ConsentProvider")
    return ctx
}
