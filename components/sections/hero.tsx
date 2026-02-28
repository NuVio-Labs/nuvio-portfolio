"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"

export function Hero() {
    const t = useTranslations("hero")

    return (
        <section id="home" className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden pt-16 md:pt-24">
            <Container className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-8 inline-flex items-center rounded-full border border-border/40 bg-background/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm shadow-sm opacity-0 animate-[text-reveal_0.8s_cubic-bezier(0.4,0,0.2,1)_1.5s_forwards]">
                    <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    {t("badge")}
                </div>

                <h1 className="mb-8 flex flex-col items-center justify-center opacity-0 animate-[text-reveal_0.8s_cubic-bezier(0.4,0,0.2,1)_1.7s_forwards]">
                    <span className="bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-8xl md:text-9xl leading-[0.9]">
                        {t("headlinePart1")}
                    </span>
                    <span className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                        {t("headlinePart2")}
                    </span>
                </h1>

                <p className="mb-12 max-w-2xl text-xl text-muted-foreground md:text-2xl leading-relaxed text-balance opacity-0 animate-[text-reveal_0.8s_cubic-bezier(0.4,0,0.2,1)_1.9s_forwards]">
                    {t("subline")}
                </p>

                <div className="flex flex-col gap-5 sm:flex-row opacity-0 animate-[text-reveal_0.8s_cubic-bezier(0.4,0,0.2,1)_2.1s_forwards]">
                    <Link href="#work">
                        <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                            {t("ctaPrimary")}
                        </Button>
                    </Link>
                    <Link href="#contact">
                        <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-2 hover:bg-secondary/50">
                            {t("ctaSecondary")}
                        </Button>
                    </Link>
                </div>
            </Container>

            {/* Background Logo with blur + glow */}
            <div className="absolute inset-0 -z-10 flex items-center justify-center overflow-hidden">
                <img
                    src="/logo.png"
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-contain p-4 opacity-0 animate-logo-reveal drop-shadow-[0_0_120px_rgba(139,92,246,0.15)]"
                />
            </div>
        </section>
    )
}
