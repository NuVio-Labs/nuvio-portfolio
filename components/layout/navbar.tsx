"use client"

import * as React from "react"
import { useTranslations } from "next-intl"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { Link } from "@/i18n/navigation"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { LanguageSwitcher } from "@/components/layout/language-switcher"

const navItems = [
    { key: "work", href: "#work" },
    { key: "about", href: "#about" },
    { key: "lab", href: "/research" },
    { key: "contact", href: "#contact" },
] as const

export function Navbar() {
    const t = useTranslations("nav")
    const { setTheme, theme } = useTheme()
    const [activeSection, setActiveSection] = React.useState("")
    const [menuOpen, setMenuOpen] = React.useState(false)

    const handleScroll = (
        e: React.MouseEvent<HTMLAnchorElement>,
        href: string
    ) => {
        if (href.startsWith("#")) {
            e.preventDefault()
            const element = document.querySelector(href)
            if (element) {
                const offsetTop =
                    element.getBoundingClientRect().top + window.scrollY - 80
                window.scrollTo({ top: offsetTop, behavior: "smooth" })
                setActiveSection(href)
            }
        }
        setMenuOpen(false)
    }

    // Close mobile menu on Escape
    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setMenuOpen(false)
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [])

    // Lock body scroll when mobile menu is open
    React.useEffect(() => {
        document.body.style.overflow = menuOpen ? "hidden" : ""
        return () => {
            document.body.style.overflow = ""
        }
    }, [menuOpen])

    return (
        <>
            <header className="fixed top-0 z-50 w-full border-b border-white/[0.04] bg-[#050505]/60 backdrop-blur-2xl">
                <Container>
                    <div className="flex h-16 items-center justify-between">
                        {/* Left: Logo + Desktop Nav */}
                        <div className="flex items-center gap-10">
                            <Link
                                href="/"
                                className="flex items-center"
                                onClick={() =>
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    })
                                }
                            >
                                <span className="inline-block font-bold text-foreground tracking-[-0.03em] text-[19px]">
                                    {t("brand")}
                                </span>
                            </Link>

                            <nav
                                className="hidden md:flex items-center gap-7"
                                aria-label="Main navigation"
                            >
                                {navItems.map((item) =>
                                    item.href.startsWith("#") ? (
                                        <a
                                            key={item.href}
                                            href={item.href}
                                            onClick={(e) =>
                                                handleScroll(e, item.href)
                                            }
                                            className={cn(
                                                "text-[11.5px] font-semibold uppercase tracking-[0.18em] transition-all hover:text-foreground",
                                                activeSection === item.href
                                                    ? "text-foreground"
                                                    : "text-neutral-500"
                                            )}
                                        >
                                            {t(item.key)}
                                        </a>
                                    ) : (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className="text-[11.5px] font-semibold uppercase tracking-[0.18em] text-neutral-500 transition-all hover:text-foreground"
                                        >
                                            {t(item.key)}
                                        </Link>
                                    )
                                )}
                            </nav>
                        </div>

                        {/* Right: Controls */}
                        <div className="flex items-center gap-3">
                            <LanguageSwitcher />

                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label={t("toggleTheme")}
                                className="w-9 h-9 rounded-full hover:bg-white/5 transition-colors"
                                onClick={() =>
                                    setTheme(
                                        theme === "dark" ? "light" : "dark"
                                    )
                                }
                            >
                                <Sun className="h-[1.05rem] w-[1.05rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-neutral-400" />
                                <Moon className="absolute h-[1.05rem] w-[1.05rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-neutral-400" />
                            </Button>

                            {/* Desktop CTA */}
                            <a
                                href="#contact"
                                onClick={(e) => handleScroll(e, "#contact")}
                                className="hidden md:block"
                            >
                                <Button className="rounded-full bg-foreground text-background font-semibold text-[11px] uppercase tracking-widest px-7 py-4 hover:bg-neutral-200 transition-all active:scale-[0.98]">
                                    {t("ctaProject")}
                                </Button>
                            </a>

                            {/* Mobile hamburger */}
                            <button
                                className="flex md:hidden items-center justify-center w-9 h-9 rounded-full hover:bg-white/5 transition-colors"
                                onClick={() => setMenuOpen((v) => !v)}
                                aria-label={menuOpen ? "Close menu" : "Open menu"}
                                aria-expanded={menuOpen}
                                aria-controls="mobile-nav"
                            >
                                {menuOpen ? (
                                    <X className="h-5 w-5 text-neutral-300" />
                                ) : (
                                    <Menu className="h-5 w-5 text-neutral-400" />
                                )}
                            </button>
                        </div>
                    </div>
                </Container>
            </header>

            {/* Mobile navigation overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-0 z-40 bg-[#070606]/80 backdrop-blur-sm md:hidden"
                            aria-hidden="true"
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Panel */}
                        <motion.nav
                            id="mobile-nav"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{
                                type: "spring",
                                damping: 30,
                                stiffness: 280,
                            }}
                            className="fixed right-0 top-0 bottom-0 z-50 flex w-[min(320px,85vw)] flex-col bg-[#0C0906] border-l border-white/[0.06] pt-20 pb-10 px-8 md:hidden"
                            aria-label="Mobile navigation"
                        >
                            {/* Close button inside panel */}
                            <button
                                className="absolute right-4 top-4 flex items-center justify-center w-9 h-9 rounded-full hover:bg-white/5 transition-colors"
                                onClick={() => setMenuOpen(false)}
                                aria-label="Close menu"
                            >
                                <X className="h-5 w-5 text-neutral-400" />
                            </button>

                            {/* Nav links */}
                            <div className="flex flex-col">
                                {navItems.map((item, i) => (
                                    <motion.div
                                        key={item.href}
                                        initial={{ opacity: 0, x: 16 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{
                                            delay: 0.04 + i * 0.055,
                                            duration: 0.22,
                                            ease: "easeOut",
                                        }}
                                    >
                                        {item.href.startsWith("#") ? (
                                            <a
                                                href={item.href}
                                                onClick={(e) =>
                                                    handleScroll(e, item.href)
                                                }
                                                className="flex items-center py-4 text-[1.2rem] font-semibold tracking-[-0.02em] text-[#F7F1E9] border-b border-white/[0.07] hover:text-[#E0B84A] transition-colors"
                                            >
                                                {t(item.key)}
                                            </a>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                onClick={() =>
                                                    setMenuOpen(false)
                                                }
                                                className="flex items-center py-4 text-[1.2rem] font-semibold tracking-[-0.02em] text-[#F7F1E9] border-b border-white/[0.07] hover:text-[#E0B84A] transition-colors"
                                            >
                                                {t(item.key)}
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>

                            {/* Mobile CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.32, duration: 0.22 }}
                                className="mt-auto"
                            >
                                <a
                                    href="#contact"
                                    onClick={(e) =>
                                        handleScroll(e, "#contact")
                                    }
                                    className="flex items-center justify-center w-full rounded-2xl bg-[linear-gradient(135deg,#F2D896_0%,#D8A14A_100%)] px-6 py-4 text-sm font-semibold text-[#24170A] shadow-[0_20px_40px_rgba(197,144,58,0.18)] transition duration-200 hover:brightness-105 active:scale-[0.98]"
                                >
                                    {t("ctaProject")}
                                </a>
                            </motion.div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
