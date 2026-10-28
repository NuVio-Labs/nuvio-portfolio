import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { getPathLocales } from "@/i18n/locale-routes"
import { CONTACT_EMAIL } from "@/lib/site"
import { cn } from "@/lib/utils"
import { CookieSettingsLink } from "@/components/consent/cookie-settings-link"

/**
 * Lokale Landingpages fuer die Spalte "Webdesign vor Ort". Welche davon in
 * der aktuellen Sprache erscheinen, entscheidet getPathLocales; gibt es
 * keine (Englisch), entfaellt die Spalte.
 */
const LOCAL_PAGES = [
    { path: "/webdesign-kranenburg", key: "kranenburg" },
    { path: "/webdesign-kleve", key: "kleve" },
    { path: "/webdesign-groesbeek", key: "groesbeek" },
] as const

export function Footer() {
    const tFooter = useTranslations("footer")
    const tNav = useTranslations("nav")
    const tServices = useTranslations("services")
    const locale = useLocale()
    const localPages = LOCAL_PAGES.filter((page) => getPathLocales(page.path).includes(locale))

    return (
        <footer className="bg-[var(--nv-surface)] border-t border-border-soft">

            <div className="nv-container py-12 md:py-16">
                <div
                    className={cn(
                        "grid grid-cols-1 gap-10 md:gap-16 mb-10",
                        localPages.length > 0 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"
                    )}
                >

                    {/* Brand */}
                    <div>
                        <p className="font-heading font-semibold text-text-primary text-base mb-3">
                            {tNav("brand")}
                        </p>
                        <p className="text-sm text-text-muted leading-relaxed">
                            {tFooter("tagline")}
                        </p>
                        <a
                            href={`mailto:${CONTACT_EMAIL}`}
                            data-track="email_click"
                            data-track-location="footer"
                            className="mt-3 inline-block text-sm text-text-muted hover:text-accent-text transition-colors"
                        >
                            {CONTACT_EMAIL}
                        </a>
                    </div>

                    {/* Navigation */}
                    <div>
                        <p className="font-heading font-semibold text-text-secondary text-xs uppercase tracking-widest mb-4">
                            Navigation
                        </p>
                        <ul className="flex flex-col gap-2">
                            {(["work", "services", "about", "contact"] as const).map((key) => (
                                <li key={key}>
                                    <Link
                                        href={`/${key}` as "/work" | "/services" | "/about" | "/contact"}
                                        className="text-sm text-text-muted hover:text-accent-text transition-colors"
                                    >
                                        {tNav(key)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Leistungen + Kontakt */}
                    <div>
                        <p className="font-heading font-semibold text-text-secondary text-xs uppercase tracking-widest mb-4">
                            {tNav("services")}
                        </p>
                        <ul className="flex flex-col gap-2 mb-6">
                            {(["launch", "redesign", "landing", "ui", "maintenance"] as const).map((key) => (
                                <li key={key}>
                                    <Link
                                        href="/services"
                                        className="text-sm text-text-muted hover:text-accent-text transition-colors"
                                    >
                                        {tServices(`items.${key}.title`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Webdesign vor Ort (lokale Landingpages der aktuellen Sprache) */}
                    {localPages.length > 0 && (
                        <div>
                            <p className="font-heading font-semibold text-text-secondary text-xs uppercase tracking-widest mb-4">
                                {tFooter("local.title")}
                            </p>
                            <ul className="flex flex-col gap-2">
                                {localPages.map((page) => (
                                    <li key={page.path}>
                                        <Link
                                            href={page.path}
                                            className="text-sm text-text-muted hover:text-accent-text transition-colors"
                                        >
                                            {tFooter(`local.links.${page.key}`)}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border-soft pt-6 flex flex-col sm:flex-row justify-between items-start gap-3 text-xs text-text-muted">
                    <p>{tFooter("copyright")}</p>
                    <nav className="flex gap-4" aria-label="Legal">
                        <Link href="/imprint" className="hover:text-accent-text transition-colors">
                            {tFooter("imprint")}
                        </Link>
                        <Link href="/privacy" className="hover:text-accent-text transition-colors">
                            {tFooter("privacy")}
                        </Link>
                        <CookieSettingsLink />
                    </nav>
                </div>
            </div>
        </footer>
    )
}
