"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FaqItem {
    question: string
    answer: string
}

interface FaqAccordionProps {
    items: FaqItem[]
}

/**
 * Gleiches Interaktions-/Visualmuster wie components/sections/faq.tsx und
 * app/[locale]/webdesign-kranenburg/faq-accordion.tsx, aber mit eigenen
 * Inhalten fuer diese Seite. Bewusst lokal dupliziert statt aus der
 * Kranenburg-Route importiert, damit beide Landingpages unabhaengig bleiben.
 */
export function FaqAccordion({ items }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    return (
        <div className="space-y-3">
            {items.map((item, index) => {
                const isOpen = openIndex === index
                const panelId = `webdesign-kleve-faq-panel-${index}`

                return (
                    <div
                        key={item.question}
                        className="overflow-hidden rounded-2xl border border-border-soft bg-surface transition-colors hover:border-accent/40"
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="flex w-full items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                        >
                            <span className="pr-6 font-semibold text-text-primary">{item.question}</span>
                            <ChevronDown
                                className={cn(
                                    "h-5 w-5 shrink-0 text-text-muted transition-transform duration-200",
                                    isOpen && "rotate-180 text-accent"
                                )}
                            />
                        </button>

                        <div
                            id={panelId}
                            role="region"
                            className="grid transition-[grid-template-rows] duration-250 ease-in-out"
                            style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                            <div className="overflow-hidden">
                                <div className="px-6 pb-6 text-sm leading-relaxed text-text-muted">
                                    {item.answer}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
