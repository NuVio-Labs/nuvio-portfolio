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
        <section
            id="faq"
            className="relative -mt-24 overflow-hidden bg-[linear-gradient(180deg,rgba(20,16,13,0.18)_0%,rgba(24,19,16,0.38)_26%,rgba(27,22,18,0.58)_52%,rgba(24,19,16,0.52)_100%)] py-24 md:-mt-28 md:py-36"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-[-14%] top-[-9rem] h-[28rem] bg-[radial-gradient(ellipse_at_top,rgba(18,14,12,0.72)_0%,rgba(18,14,12,0.36)_34%,rgba(18,14,12,0.12)_56%,transparent_78%)] blur-[38px]" />
                <div className="absolute inset-x-[-12%] top-[-2rem] h-64 bg-[linear-gradient(to_bottom,rgba(20,16,13,0.42),rgba(20,16,13,0.18)_34%,rgba(20,16,13,0.06)_58%,transparent_100%)] blur-[18px]" />
                <div className="absolute inset-x-[-14%] bottom-[-8rem] h-[26rem] bg-[radial-gradient(ellipse_at_bottom,rgba(18,14,12,0.78)_0%,rgba(18,14,12,0.4)_34%,rgba(18,14,12,0.14)_58%,transparent_80%)] blur-[38px]" />
                <div className="absolute inset-x-[-10%] bottom-0 h-64 bg-[linear-gradient(to_bottom,transparent,rgba(18,14,12,0.06)_30%,rgba(18,14,12,0.18)_56%,rgba(18,14,12,0.42)_100%)] blur-[18px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(224,184,74,0.07),transparent_24%),radial-gradient(circle_at_82%_26%,rgba(255,255,255,0.035),transparent_28%)]" />
            </div>

            <Container className="relative z-10 max-w-3xl">
                <ScrollAnimation>
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-[#F5F3EE] lg:text-5xl">
                            {t("sectionTitle")}
                        </h2>
                        <p className="text-lg text-[#C5B8A6]">
                            {t("sectionSubtitle")}
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="space-y-4">
                    {FAQ_KEYS.map((key, index) => {
                        const isOpen = openIndex === index

                        return (
                            <ScrollAnimation key={key} delay={index * 0.1}>
                                <div className="overflow-hidden rounded-xl border border-[#DAB983]/16 bg-[linear-gradient(180deg,rgba(43,34,28,0.92),rgba(29,23,19,0.96))] shadow-[0_18px_45px_rgba(0,0,0,0.22)] transition-colors hover:border-[#E0B84A]/28">
                                    <button
                                        onClick={() => toggleAccordion(index)}
                                        className="flex w-full items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B84A]/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1B1511]"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="pr-8 font-semibold text-[#F5F3EE]">{t(`questions.${key}.q`)}</span>
                                        <ChevronDown className={cn("h-5 w-5 shrink-0 text-[#B9B2A3] transition-transform duration-200", isOpen && "rotate-180")} />
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                            >
                                                <div className="px-6 pb-6 leading-relaxed text-[#D1C6B7]">
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
