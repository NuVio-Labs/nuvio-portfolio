"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { ChevronDown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Link } from "@/i18n/navigation"

const BASE_FAQ_KEYS = ["cost", "duration", "hosting", "cms", "clientInput"] as const

/**
 * "groesbeek" existiert nur in messages/nl.json: die Landingpage
 * /nl/webdesign-groesbeek ist bewusst einsprachig (siehe deren page.tsx),
 * daher taucht der Verweis auch nur auf der niederlaendischen Startseite auf.
 */
const NL_ONLY_FAQ_KEYS = ["groesbeek"] as const

export function FAQ() {
    const t = useTranslations("faq")
    const locale = useLocale()
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const FAQ_KEYS = locale === "nl" ? [...BASE_FAQ_KEYS, ...NL_ONLY_FAQ_KEYS] : BASE_FAQ_KEYS

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
                            const panelId = `faq-panel-${key}`

                            return (
                                <div
                                    key={key}
                                    className="overflow-hidden rounded-2xl border border-border-soft bg-surface hover:border-accent/40 transition-colors"
                                >
                                    <button
                                        onClick={() => setOpenIndex(isOpen ? null : index)}
                                        className="flex w-full items-center justify-between p-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        aria-expanded={isOpen}
                                        aria-controls={panelId}
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
                                        id={panelId}
                                        role="region"
                                        className="grid transition-[grid-template-rows] duration-250 ease-in-out"
                                        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="px-6 pb-6 text-sm leading-relaxed text-text-muted">
                                                <p>{t(`questions.${key}.a`)}</p>
                                                {key === "groesbeek" ? (
                                                    <Link
                                                        href="/webdesign-groesbeek"
                                                        className="mt-3 inline-flex items-center gap-2 font-medium text-accent hover:text-[var(--nv-accent-hover)] transition-colors group"
                                                    >
                                                        {t("questions.groesbeek.linkText")}
                                                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                    </Link>
                                                ) : null}
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
