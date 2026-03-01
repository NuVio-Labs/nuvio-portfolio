"use client"

import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function About() {
    const t = useTranslations("about")

    return (
        <section id="about" className="py-24 md:py-32 bg-secondary/10 relative overflow-hidden transition-colors duration-300">
            <Container className="relative z-10 px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">

                    {/* LINKE FLANKE: Die Historie / Person (Sticky auf Desktop) */}
                    <div className="lg:col-span-5 lg:sticky lg:top-40 lg:self-start flex flex-col items-start text-left">
                        {/* Micro Label */}
                        <div className="mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                                {t("label")}
                            </span>
                        </div>

                        {/* H2 Headline */}
                        <h2 className="text-3xl lg:text-4xl font-semibold leading-[1.15] tracking-tight text-neutral-900 dark:text-neutral-100 mb-8 max-w-sm">
                            {t("headline")}
                        </h2>

                        {/* Bio Text */}
                        <div className="space-y-6 text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                            <p>{t("bio1")}</p>
                            <p>{t("bio2")}</p>
                        </div>

                        {/* Signature Line */}
                        <div className="mt-12 pt-8 border-t border-black/5 dark:border-white/5 w-full">
                            <p className="text-sm font-medium italic text-neutral-500 dark:text-neutral-400">
                                {t("signature")}
                            </p>
                        </div>
                    </div>

                    {/* RECHTE FLANKE: Die Werte / Methodik als Editorial List */}
                    <div className="lg:col-span-6 lg:col-start-7 flex flex-col pt-4 lg:pt-0">
                        {/* Optionaler Intro-Header für die rechte Seite */}
                        <h3 className="text-sm font-medium uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-8 lg:mb-12">
                            {t("principlesTitle")}
                        </h3>

                        <div className="flex flex-col">
                            {/* Principle 1 */}
                            <ScrollAnimation>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-8 pb-10 mb-10 border-b border-black/5 dark:border-white/5">
                                    <div className="w-12 shrink-0">
                                        <span className="text-xs font-mono font-medium tracking-wider text-neutral-300 dark:text-neutral-600">
                                            01
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
                                            {t("values.clarity.title")}
                                        </h4>
                                        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                            {t("values.clarity.text")}
                                        </p>
                                    </div>
                                </div>
                            </ScrollAnimation>

                            {/* Principle 2 */}
                            <ScrollAnimation delay={0.1}>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-8 pb-10 mb-10 border-b border-black/5 dark:border-white/5">
                                    <div className="w-12 shrink-0">
                                        <span className="text-xs font-mono font-medium tracking-wider text-neutral-300 dark:text-neutral-600">
                                            02
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
                                            {t("values.performance.title")}
                                        </h4>
                                        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                            {t("values.performance.text")}
                                        </p>
                                    </div>
                                </div>
                            </ScrollAnimation>

                            {/* Principle 3 */}
                            <ScrollAnimation delay={0.2}>
                                <div className="flex flex-col md:flex-row gap-4 md:gap-8 pb-10 mb-10 border-b border-black/5 dark:border-white/5">
                                    <div className="w-12 shrink-0">
                                        <span className="text-xs font-mono font-medium tracking-wider text-neutral-300 dark:text-neutral-600">
                                            03
                                        </span>
                                    </div>
                                    <div className="flex flex-col">
                                        <h4 className="text-xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-2">
                                            {t("values.sustainability.title")}
                                        </h4>
                                        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                            {t("values.sustainability.text")}
                                        </p>
                                    </div>
                                </div>
                            </ScrollAnimation>

                            {/* Tech Stack Subtle Footnote */}
                            <ScrollAnimation delay={0.3}>
                                <div className="mt-4 flex items-center gap-3 text-xs text-neutral-400 dark:text-neutral-500 font-mono">
                                    <div className="h-px bg-neutral-200 dark:bg-neutral-800 flex-1 max-w-[40px]" />
                                    <p>{t("techStack")}</p>
                                </div>
                            </ScrollAnimation>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}
