"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionWrapper } from "@/components/ui/section-wrapper"

const FAQ_KEYS = ["cost", "duration", "hosting", "cms"] as const

export function FAQ() {
    const t = useTranslations("faq")
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <SectionWrapper id="faq" light>
            <div className="nv-container">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-12 text-center">
                        <h2
                            className="font-heading font-semibold text-text-primary mb-4"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {t("sectionTitle")}
                        </h2>
                        <p className="text-text-muted">{t("sectionSubtitle")}</p>
                    </div>

                    <div className="space-y-3">
                        {FAQ_KEYS.map((key, index) => {
                            const isOpen = openIndex === index

                            return (
                                <div
                                    key={key}
                                    className="overflow-hidden rounded-2xl border border-border-soft bg-surface hover:border-accent/40 transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="flex w-full items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        aria-expanded={isOpen}
                                    >
                                        <span className="pr-6 font-semibold text-text-primary">
                                            {t(`questions.${key}.q`)}
                                        </span>
                                        <ChevronDown
                                            className={cn(
                                                "h-5 w-5 shrink-0 text-text-muted transition-transform duration-200",
                                                isOpen && "rotate-180 text-accent"
                                            )}
                                        />
                                    </button>

                                    <div
                                        className="grid transition-[grid-template-rows] duration-250 ease-in-out"
                                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 text-sm leading-relaxed text-text-muted">
                                                {t(`questions.${key}.a`)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
