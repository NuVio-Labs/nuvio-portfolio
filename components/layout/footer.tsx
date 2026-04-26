import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"

export function Footer() {
    const t = useTranslations()
    const tFooter = useTranslations("footer")
    const tNav = useTranslations("nav")
    const tServices = useTranslations("services")

    return (
        <footer className="bg-[var(--nv-surface)] border-t border-border-soft">
            <div className="sr-only" aria-hidden="true">{tFooter("llmContext")}</div>

            <div className="nv-container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-10">

                    {/* Brand */}
                    <div>
                        <p className="font-heading font-semibold text-text-primary text-base mb-3">
                            {tNav("brand")}
                        </p>
                        <p className="text-sm text-text-muted leading-relaxed">
                            {tFooter("tagline")}
                        </p>
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
                                        className="text-sm text-text-muted hover:text-accent transition-colors"
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
                                        className="text-sm text-text-muted hover:text-accent transition-colors"
                                    >
                                        {tServices(`items.${key}.title`)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border-soft pt-6 flex flex-col sm:flex-row justify-between items-start gap-3 text-xs text-text-muted">
                    <p>{tFooter("copyright")}</p>
                    <nav className="flex gap-4" aria-label="Legal">
                        <Link href="/imprint" className="hover:text-accent transition-colors">
                            {tFooter("imprint")}
                        </Link>
                        <Link href="/privacy" className="hover:text-accent transition-colors">
                            {tFooter("privacy")}
                        </Link>
                    </nav>
                </div>
            </div>
        </footer>
    )
}
