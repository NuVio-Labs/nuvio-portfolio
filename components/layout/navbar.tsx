"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useTheme } from "next-themes"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

const navItems = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Lab", href: "#lab" },
    { name: "Contact", href: "#contact" },
]

export function Navbar() {
    const pathname = usePathname()
    const { setTheme, theme } = useTheme()
    const [activeSection, setActiveSection] = React.useState("")

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
        if (href.startsWith("#")) {
            e.preventDefault()
            const element = document.querySelector(href)
            if (element) {
                const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80 // Adjust for header height
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
                            <span className="inline-block font-bold">nuviolabs.</span>
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-end space-x-4">
                        <nav className="flex items-center space-x-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={(e) => handleScroll(e, item.href)}
                                    className={cn(
                                        "hidden md:inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors hover:text-foreground/80",
                                        activeSection === item.href
                                            ? "text-foreground"
                                            : "text-foreground/60"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Toggle theme"
                                className="mr-6"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            >
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>
                            <div className="flex items-center gap-4 pl-6 border-l border-border/40">
                                <span className="text-xs text-muted-foreground hidden lg:inline-block">
                                    Private Area for Clients
                                </span>
                                <Link href="/login">
                                    <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                                        Client Portal
                                    </Button>
                                    <Button variant="ghost" size="icon" className="sm:hidden">
                                        <span className="sr-only">Login</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-in"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg>
                                    </Button>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>
            </Container>
        </header>
    )
}
