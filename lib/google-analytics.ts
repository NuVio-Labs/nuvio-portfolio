import { isAnalyticsOptedOut } from "@/lib/analytics-opt-out"
import { hasAnalyticsConsent } from "@/lib/consent"
import { SITE_URL } from "@/lib/site"

/**
 * Zentrale Google-Analytics-4-Integration. Einzige Stelle im Projekt, die
 * die Measurement-ID kennt, gtag.js laedt und gtag() aufruft.
 *
 * Basic Consent: vor einer Analytics-Zustimmung existiert weder
 * window.gtag noch window.dataLayer, und es wird kein Skript geladen — also
 * keine Requests, keine Cookies, keine cookielosen Pings. Jede sendende
 * Funktion prueft zusaetzlich selbst hasAnalyticsConsent() (Phase-1-Store),
 * damit auch nach einem Widerruf im selben Tab nichts mehr rausgeht.
 *
 * Consent Mode v2 (Basic-Variante): beim Laden zuerst `consent default`
 * mit allen Signalen auf "denied", direkt danach `consent update` mit
 * analytics_storage "granted". Die Werbe-Signale (ad_storage,
 * ad_user_data, ad_personalization) bleiben "denied" — der Banner fragt
 * keine Marketing-Einwilligung ab. Der Advanced Mode (cookielose Pings
 * schon vor der Einwilligung) ist bewusst nicht umgesetzt.
 */

/** Ausschliesslich aus der Umgebung (.env.local bzw. Vercel-Environment). */
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? ""

type GtagParams = Record<string, string | number | boolean | undefined>
type ConsentState = "granted" | "denied"
type ConsentParams = Partial<
    Record<"ad_storage" | "ad_user_data" | "ad_personalization" | "analytics_storage", ConsentState>
>
type GtagCommand =
    | ["js", Date]
    | ["consent", "default" | "update", ConsentParams]
    | ["config", string, GtagParams?]
    | ["event", string, GtagParams?]

declare global {
    interface Window {
        dataLayer?: unknown[]
        gtag?: (...args: GtagCommand) => void
        /** Offizielles Opt-out-Flag von Google, siehe disableGoogleAnalytics(). */
        [key: `ga-disable-${string}`]: boolean | undefined
    }
}

const GTAG_SCRIPT_ID = "nuvio-gtag"
const DISABLE_KEY = `ga-disable-${GA_MEASUREMENT_ID}` as const

/**
 * Einziger Host, auf dem GA4 laeuft: die kanonische Produktions-Domain
 * (www.nuviolabs.de). Vercel-Previews (*.vercel.app), localhost und die
 * Apex-Domain senden nichts, damit fremde Hostnamen die Daten nicht
 * verfaelschen.
 */
const PRODUCTION_HOSTNAME = new URL(SITE_URL).hostname

let initialized = false
let warnedMissingId = false
let warnedHost = false

export function isGoogleAnalyticsConfigured(): boolean {
    if (GA_MEASUREMENT_ID) return true
    if (process.env.NODE_ENV === "development" && !warnedMissingId) {
        warnedMissingId = true
        console.warn("[analytics] NEXT_PUBLIC_GA_MEASUREMENT_ID ist nicht gesetzt — Google Analytics bleibt deaktiviert.")
    }
    return false
}

function isProductionHost(): boolean {
    if (window.location.hostname === PRODUCTION_HOSTNAME) return true
    if (process.env.NODE_ENV === "development" && !warnedHost) {
        warnedHost = true
        console.info(`[analytics] Google Analytics laeuft nur auf ${PRODUCTION_HOSTNAME}, nicht auf ${window.location.hostname}.`)
    }
    return false
}

/** Darf gerade etwas an GA4 gehen? Zentrale Pruefung vor jedem Senden. */
function canSend(): boolean {
    return (
        typeof window !== "undefined" &&
        isGoogleAnalyticsConfigured() &&
        isProductionHost() &&
        !isAnalyticsOptedOut() &&
        hasAnalyticsConsent()
    )
}

/**
 * Initialisiert gtag und laedt gtag.js — genau einmal pro Seitenaufruf.
 * Nur nach Zustimmung aufrufen; prueft das aber auch selbst.
 *
 * Pageviews: ausschliesslich Googles eigener Mechanismus. `config` sendet
 * den Pageview der aktuellen Seite, Folge-Navigationen im App Router
 * erfasst Enhanced Measurement ueber Browserverlaufsereignisse. Bewusst
 * KEIN zusaetzliches manuelles page_view-Event: das zaehlte im Test doppelt,
 * weil `send_page_view: false` diese Verlaufs-Pageviews laut Google nicht
 * unterdrueckt (developers.google.com/analytics/devguides/collection/ga4/single-page-applications).
 *
 * WICHTIG — abhaengige GA4-Einstellung, muss AKTIV bleiben:
 *   Admin > Data streams > Web-Stream > Enhanced measurement >
 *   Page views > Show advanced settings >
 *   "Page changes based on browser history events"
 *   (Bezeichnung laut Google-Doku, englische Oberflaeche; die deutsche
 *   Beschriftung ist hier nicht verifiziert).
 * Wird sie abgeschaltet, zaehlt GA4 nur noch den ersten Seitenaufruf je
 * Besuch; alle clientseitigen Navigationen gehen verloren. Soll sie aus
 * anderen Gruenden aus, muss hier manuelles Pageview-Tracking ergaenzt werden.
 */
export function initGoogleAnalytics(): boolean {
    if (!canSend()) return false

    if (initialized) {
        // Normalfall (Re-Render, Strict Mode): No-op. Nur erreichbar mit
        // gesetztem Opt-out, wenn in einem ANDEREN Tab widerrufen und wieder
        // zugestimmt wurde (dieser Tab wurde beim Widerruf bewusst nicht neu
        // geladen, siehe GoogleAnalytics-Komponente): best effort.
        if (window[DISABLE_KEY] === true) {
            window[DISABLE_KEY] = false
            window.gtag?.("consent", "update", { analytics_storage: "granted" })
            window.gtag?.("config", GA_MEASUREMENT_ID)
        }
        return true
    }
    initialized = true
    window[DISABLE_KEY] = false

    window.dataLayer = window.dataLayer ?? []
    // gtag.js erwartet ein echtes `arguments`-Objekt in der dataLayer,
    // ein Array wird nicht als Befehl erkannt.
    window.gtag = function gtag() {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer?.push(arguments)
    }

    // Consent Mode v2: Default muss vor `config` in der dataLayer stehen.
    window.gtag("consent", "default", {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
    })
    window.gtag("consent", "update", { analytics_storage: "granted" })

    window.gtag("js", new Date())
    window.gtag("config", GA_MEASUREMENT_ID)

    if (!document.getElementById(GTAG_SCRIPT_ID)) {
        const script = document.createElement("script")
        script.id = GTAG_SCRIPT_ID
        script.async = true
        script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_MEASUREMENT_ID)}`
        document.head.appendChild(script)
    }
    return true
}

/** Custom Event — nur nach Zustimmung; Events vor der Zustimmung werden nie gepuffert. */
export function trackGoogleEvent(name: string, properties?: Record<string, string | number | boolean>): void {
    if (!canSend() || !initGoogleAnalytics() || !window.gtag) return
    window.gtag("event", name, properties)
}

/** Nur GA-eigene Cookies: `_ga`, `_ga_<Stream>`, sowie die Legacy-Namen `_gid`/`_gat*`. */
const GA_COOKIE_PATTERN = /^(_ga(_.+)?|_gid|_gat(_.+)?)$/

function deleteGoogleAnalyticsCookies(): void {
    const names = document.cookie
        .split(";")
        .map((part) => part.split("=")[0]?.trim())
        .filter((name): name is string => !!name && GA_COOKIE_PATTERN.test(name))
    if (names.length === 0) return

    // gtag setzt Cookies mit cookie_domain "auto" auf die hoechste moegliche
    // Domain (z. B. ".nuviolabs.de"). Geloescht wird daher fuer den Host
    // selbst und jede uebergeordnete Domain sowie ohne Domain-Attribut.
    const labels = window.location.hostname.split(".")
    const domains: (string | null)[] = [null]
    for (let i = 0; i < labels.length - 1; i++) {
        const domain = labels.slice(i).join(".")
        domains.push(domain, `.${domain}`)
    }

    const expired = "expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
    for (const name of names) {
        for (const domain of domains) {
            document.cookie = domain ? `${name}=; ${expired}; domain=${domain}` : `${name}=; ${expired}`
        }
    }
}

/**
 * Widerruf bzw. keine Zustimmung:
 * 0. lief gtag.js bereits: Consent Mode auf analytics_storage "denied"
 *    setzen, damit auch Google selbst den Widerruf als Signal erhaelt,
 * 1. offizielles Google-Opt-out-Flag setzen — stoppt sofort auch die
 *    automatischen Hits (Verlaufs-Pageviews, Enhanced Measurement) eines
 *    bereits geladenen gtag.js, die canSend() nicht erreicht,
 * 2. GA-Cookies entfernen,
 * 3. falls gtag.js in diesem Tab bereits lief und `reloadIfLoaded` gesetzt
 *    ist: Seite neu laden. Einmal geladenes Google-JavaScript laesst sich
 *    nicht entladen; nach dem Reload ist es gar nicht mehr im Speicher, und
 *    eine spaetere erneute Zustimmung startet sauber von vorn (im Test war
 *    die Reaktivierung eines deaktivierten, noch geladenen gtag.js
 *    unzuverlaessig: Pageviews gingen verloren).
 * Hinweis: Google dokumentiert, dass das Opt-out-Flag gesetzt sein muss,
 * BEVOR gtag() aufgerufen wird. Im aktiven Tab ist das durch den Reload
 * erfuellt. In anderen, nicht neu geladenen Tabs wird es erst nachtraeglich
 * gesetzt — dort blockierte es im Test zwar alle Hits, ist aber nicht von
 * Googles dokumentiertem Vertrag gedeckt.
 * Consent-Speicher, Locale-Cookie und alle anderen Daten bleiben unberuehrt.
 */
export function disableGoogleAnalytics({ reloadIfLoaded }: { reloadIfLoaded: boolean }): void {
    if (typeof window === "undefined" || !GA_MEASUREMENT_ID) return
    if (initialized) window.gtag?.("consent", "update", { analytics_storage: "denied" })
    window[DISABLE_KEY] = true
    deleteGoogleAnalyticsCookies()
    if (reloadIfLoaded && initialized) window.location.reload()
}
