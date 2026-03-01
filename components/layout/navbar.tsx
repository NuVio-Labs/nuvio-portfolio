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
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <Container>
                <div className="flex h-14 items-center justify-between">
                    <div className="flex gap-6 md:gap-10">
                        <Link href="/" className="flex items-center space-x-2" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
                            <span className="inline-block font-bold">{t("brand")}</span>
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-2">
                        <nav className="flex items-center space-x-1" aria-label={t("work")}>
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className={cn(
                                        "hidden md:inline-flex min-h-[48px] items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:text-foreground/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                        activeSection === item.href
                                            ? "text-foreground"
                                            : "text-muted-foreground"
                                    )}
                                >
                                    {t(item.key)}
                                </a>
                            ))}

                            <LanguageSwitcher />

                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label={t("toggleTheme")}
                                className="min-h-[48px] min-w-[48px]"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            >
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>

                            <a href="#contact" onClick={(e) => handleScroll(e, "#contact")} className="hidden md:flex ml-2 ">
                                <Button className="rounded-full shadow-md font-semibold px-6 hover:shadow-lg transition-all ">
                                    {t("ctaProject")}
                                </Button>
                            </a>

                            <div className="flex items-center gap-4 pl-4 ml-2 border-l border-border/40">
                                <a href="https://core.nuviolabs.de" target="_blank" rel="noopener noreferrer" aria-label={t("clientPortalLabel")}>
                                    {/* <Button disabled variant="default" size="sm" className="hidden sm:inline-flex min-h-[48px]"> */}
                                    {/* {t("clientPortal")} */}
                                    {/* </Button> */}
                                    <Button variant="default" size="icon" className="sm:hidden min-h-[48px] min-w-[48px]">
                                        <span className="sr-only">{t("login")}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in" aria-hidden="true"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg>
                                    </Button>
                                </a>
                            </div>
                        </nav>
                    </div>
                </div>
            </Container>
        </header>
    )
}
