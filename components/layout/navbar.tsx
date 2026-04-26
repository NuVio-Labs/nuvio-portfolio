"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import { LanguageSwitcher } from "@/components/layout/language-switcher"

const navItems = [
    { key: "work",     href: "/work" },
    { key: "services", href: "/services" },
    { key: "about",    href: "/about" },
    { key: "contact",  href: "/contact" },
] as const

export function Navbar() {
    const t = useTranslations("nav")
    const { setTheme, theme } = useTheme()
    const pathname = usePathname()
    const [scrolled, setScrolled] = React.useState(false)
    const [menuOpen, setMenuOpen] = React.useState(false)

    React.useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener("scroll", onScroll, { passive: true })
        return () => window.removeEventListener("scroll", onScroll)
    }, [])

    React.useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => { document.body.style.overflow = "" }
    }, [menuOpen])

    function isActive(href: string) {
        return pathname.endsWith(href) || pathname.includes(href + "/")
    }

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-surface/95 backdrop-blur-xl border-b border-border-soft shadow-sm"
                    : "bg-transparent"
            )}
        >
            <div className="nv-container">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="font-heading font-semibold text-[18px] tracking-[-0.02em] text-text-primary hover:text-accent transition-colors"
                        onClick={() => setMenuOpen(false)}
                    >
                        {t("brand")}
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8" aria-label="Hauptnavigation">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href as "/work" | "/services" | "/about" | "/contact"}
                                className={cn(
                                    "text-sm font-medium transition-colors",
                                    isActive(item.href)
                                        ? "text-accent"
                                        : "text-text-muted hover:text-text-primary"
                                )}
                            >
                                {t(item.key)}
                            </Link>
                        ))}
                    </nav>

                    {/* Right controls */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <LanguageSwitcher />

                        {/* Theme Toggle */}
                        <button
                            aria-label={t("toggleTheme")}
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-soft bg-transparent text-text-muted hover:text-text-primary hover:border-accent/40 transition-all"
                        >
                            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </button>

                        {/* CTA */}
                        <Link
                            href="/contact"
                            className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-full bg-accent text-surface text-sm font-semibold hover:bg-[var(--nv-accent-hover)] transition-all duration-200 active:scale-[0.98]"
                        >
                            {t("ctaProject")}
                        </Link>

                        {/* Mobile Burger */}
                        <button
                            className="md:hidden flex h-9 w-9 items-center justify-center rounded-full border border-border-soft text-text-primary"
                            aria-label={menuOpen ? "Menü schließen" : "Menü öffnen"}
                            aria-expanded={menuOpen}
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Fullscreen Overlay */}
            {menuOpen && (
                <div className="md:hidden fixed inset-0 top-16 bg-surface z-40 overflow-y-auto">
                    <nav className="nv-container py-8 flex flex-col gap-1" aria-label="Mobile Navigation">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href as "/work" | "/services" | "/about" | "/contact"}
                                onClick={() => setMenuOpen(false)}
                                className={cn(
                                    "block py-4 text-lg font-medium border-b border-border-soft transition-colors",
                                    isActive(item.href)
                                        ? "text-accent"
                                        : "text-text-primary"
                                )}
                            >
                                {t(item.key)}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            onClick={() => setMenuOpen(false)}
                            className="mt-8 inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-accent text-surface font-semibold text-center hover:bg-[var(--nv-accent-hover)] transition-colors"
                        >
                            {t("ctaProject")}
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    )
}
