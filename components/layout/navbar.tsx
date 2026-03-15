"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Link } from "@/i18n/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { LanguageSwitcher } from "@/components/layout/language-switcher"

const navItems = [
    { key: "work", href: "/#work" },
    { key: "about", href: "/#about" },
    { key: "lab", href: "/research" },
    { key: "contact", href: "/#contact" },
] as const

export function Navbar() {
    const t = useTranslations("nav")
    const { setTheme, theme } = useTheme()
    const [activeSection, setActiveSection] = React.useState("")

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault()
            const element = document.querySelector(href)
            if (element) {
                const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({
                    top: offsetTop,
                    behavior: "smooth"
                })
                setActiveSection(href)
            }
        }
    }

    return (
        <header className="fixed top-0 z-50 w-full border-b border-white/[0.03] bg-[#050505]/40 backdrop-blur-2xl">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center space-x-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            <span className="inline-block font-bold text-foreground tracking-[-0.03em] text-[19px]">{t("brand")}</span>
                        </Link>
                        
                        <nav className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className={cn(
                                        "text-[12px] font-bold uppercase tracking-[0.2em] transition-all hover:text-foreground/100",
                                        activeSection === item.href
                                            ? "text-foreground"
                                            : "text-neutral-500"
                                    )}
                                >
                                    {t(item.key)}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        <LanguageSwitcher />

                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label={t("toggleTheme")}
                            className="w-10 h-10 rounded-full hover:bg-white/5 transition-colors"
                            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        >
                            <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-neutral-400" />
                            <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-neutral-400" />
                        </Button>

                        <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="hidden sm:block">
                            <Button className="rounded-full bg-foreground text-background font-bold text-[11px] uppercase tracking-widest px-8 py-5 hover:bg-neutral-200 transition-all active:scale-[0.98]">
                                {t("ctaProject")}
                            </Button>
                        </a>
                    </div>
                </div>
            </Container>
        </header>
    )
}
