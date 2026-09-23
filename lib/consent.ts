/**
 * Zentrale Consent-Schicht (Phase 1: nur "essential" und "analytics").
 *
 * Speicherung in localStorage statt als Cookie — bewusste Entscheidung,
 * siehe Abschlussbericht "Consent Phase 1": die Entscheidung wird nur
 * clientseitig benoetigt (Banner-Anzeige, spaeteres bedingtes Laden von
 * GA4 ueber ein <Script> — ebenfalls rein clientseitig), und ein neues
 * First-Party-Cookie wuerde die bereits vorhandene, praezise
 * Cookie-Aufstellung auf /privacy unvollstaendig machen, deren Anpassung
 * ausserhalb dieses Aufgaben-Scopes liegt.
 *
 * Keine personenbezogenen Daten, keine Nutzer-ID, kein Fingerprint —
 * ausschliesslich das boolesche Analytics-Flag plus eine Versionsnummer.
 *
 * Als externer Store fuer `useSyncExternalStore` aufgebaut (nicht als
 * useEffect-gestuetztes State-Sync in der Komponente): dieselbe
 * Entscheidung bleibt so automatisch auch bei einer Aenderung in einem
 * anderen Tab konsistent, und es ist der von React fuer genau diesen Fall
 * (Lesen eines browserseitigen Speichers, SSR-sicher) vorgesehene Hook.
 */

export const CONSENT_STORAGE_KEY = "nuvio_consent_v1"
export const CONSENT_VERSION = 1

export interface ConsentPreferences {
    analytics: boolean
    version: number
}

function isBrowser(): boolean {
    return typeof window !== "undefined"
}

function parseConsent(raw: string | null): ConsentPreferences | null {
    if (!raw) return null
    try {
        const parsed = JSON.parse(raw) as Partial<ConsentPreferences>
        if (parsed.version !== CONSENT_VERSION || typeof parsed.analytics !== "boolean") {
            return null
        }
        return { analytics: parsed.analytics, version: parsed.version }
    } catch {
        return null
    }
}

// Snapshot-Cache fuer useSyncExternalStore: liefert bei unveraendertem
// Rohwert dieselbe Objektreferenz zurueck (Voraussetzung des Hooks, sonst
// re-rendert er bei jedem Aufruf erneut).
let cachedRaw: string | null = null
let cachedSnapshot: ConsentPreferences | null = null
let cacheInitialized = false

function readRaw(): string | null {
    if (!isBrowser()) return null
    try {
        return window.localStorage.getItem(CONSENT_STORAGE_KEY)
    } catch {
        return null
    }
}

/** `getSnapshot` fuer useSyncExternalStore. */
export function getConsentSnapshot(): ConsentPreferences | null {
    const raw = readRaw()
    if (cacheInitialized && raw === cachedRaw) return cachedSnapshot
    cachedRaw = raw
    cachedSnapshot = parseConsent(raw)
    cacheInitialized = true
    return cachedSnapshot
}

/** `getServerSnapshot` fuer useSyncExternalStore: serverseitig existiert nie eine Entscheidung. */
export function getConsentServerSnapshot(): ConsentPreferences | null {
    return null
}

const listeners = new Set<() => void>()

/** `subscribe` fuer useSyncExternalStore. Reagiert auch auf Aenderungen aus anderen Tabs (natives "storage"-Event). */
export function subscribeConsent(callback: () => void): () => void {
    listeners.add(callback)
    if (isBrowser()) window.addEventListener("storage", callback)
    return () => {
        listeners.delete(callback)
        if (isBrowser()) window.removeEventListener("storage", callback)
    }
}

function notifyListeners(): void {
    listeners.forEach((callback) => callback())
}

/** Einmaliger Lesezugriff ausserhalb von React (z. B. spaeter: vor dem Laden von GA4 in Phase 2). */
export function getConsent(): ConsentPreferences | null {
    return getConsentSnapshot()
}

export function hasConsentDecision(): boolean {
    return getConsentSnapshot() !== null
}

export function hasAnalyticsConsent(): boolean {
    return getConsentSnapshot()?.analytics === true
}

/**
 * Speichert eine Entscheidung. "essential" ist absichtlich kein Feld: es ist
 * nie deaktivierbar und muss daher auch nicht gespeichert werden.
 */
export function setConsent(preferences: { analytics: boolean }): ConsentPreferences {
    const next: ConsentPreferences = { analytics: preferences.analytics, version: CONSENT_VERSION }
    if (isBrowser()) {
        try {
            window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(next))
        } catch {
            /* localStorage gesperrt (z. B. strikter privater Modus) — die Entscheidung gilt dann nur fuer diese Seitenansicht. */
        }
    }
    // Cache invalidieren und Abonnenten (useSyncExternalStore) benachrichtigen —
    // das native "storage"-Event feuert nur in ANDEREN Tabs, nicht im eigenen.
    cacheInitialized = false
    notifyListeners()
    return next
}

/** Fuer eine moegliche spaetere "Einwilligung zuruecksetzen"-Funktion; in Phase 1 nicht an der UI verdrahtet. */
export function clearConsent(): void {
    if (!isBrowser()) return
    try {
        window.localStorage.removeItem(CONSENT_STORAGE_KEY)
    } catch {
        /* siehe oben */
    }
    cacheInitialized = false
    notifyListeners()
}
