"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { motion, AnimatePresence } from "framer-motion"
import { Container } from "@/components/layout/container"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const FAQ_KEYS = ["cost", "duration", "hosting", "cms"] as const

export function FAQ() {
    const t = useTranslations("faq")
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const toggleAccordion = (index: number) => {
        setOpenIndex(openIndex === index ? null : index)
    }

    return (
        <section id="faq" className="py-12 md:py-24">
            <Container className="max-w-3xl">
                <ScrollAnimation>
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">{t("sectionTitle")}</h2>
                        <p className="text-muted-foreground text-lg">
                            {t("sectionSubtitle")}
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="space-y-4">
                    {FAQ_KEYS.map((key, index) => {
                        const isOpen = openIndex === index

                        return (
                            <ScrollAnimation key={key} delay={index * 0.1}>
                                <div className="border border-border/50 bg-card rounded-xl overflow-hidden transition-colors hover:border-primary/50">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="w-full flex items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="font-semibold text-foreground pr-8">{t(`questions.${key}.q`)}</span>
                                        <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform duration-200 shrink-0", isOpen && "rotate-180")} />
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                                    {t(`questions.${key}.a`)}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </ScrollAnimation>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}
