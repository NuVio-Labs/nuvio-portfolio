"use client"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { ChevronDown, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Link } from "@/i18n/navigation"

const BASE_FAQ_KEYS = ["cost", "duration", "hosting", "cms", "clientInput"] as const

interface LocalFaq {
    key: string
    links: { href: string; labelKey: string }[]
}

/**
 * Zusaetzliche Frage je Sprache mit Links auf die einsprachigen lokalen
 * Landingpages (siehe i18n/locale-routes.ts). "region" existiert nur in
 * messages/de.json, "groesbeek" nur in messages/nl.json, daher taucht der
 * Verweis auch nur auf der jeweiligen Startseite auf.
 */
const LOCAL_FAQ: Partial<Record<string, LocalFaq>> = {
    de: {
        key: "region",
        links: [
            { href: "/webdesign-kranenburg", labelKey: "questions.region.linkKranenburg" },
            { href: "/webdesign-kleve", labelKey: "questions.region.linkKleve" },
        ],
    },
    nl: {
        key: "groesbeek",
        links: [{ href: "/webdesign-groesbeek", labelKey: "questions.groesbeek.linkText" }],
    },
}

export function FAQ() {
    const t = useTranslations("faq")
    const locale = useLocale()
    const [openIndex, setOpenIndex] = useState<number | null>(0)

    const localFaq = LOCAL_FAQ[locale]
    const FAQ_KEYS: readonly string[] = localFaq ? [...BASE_FAQ_KEYS, localFaq.key] : BASE_FAQ_KEYS

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
                                                isOpen && "rotate-180 text-accent-text"
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
                                                {localFaq && key === localFaq.key ? (
                                                    <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                                                        {localFaq.links.map((link) => (
                                                            <Link
                                                                key={link.href}
                                                                href={link.href}
                                                                className="inline-flex items-center gap-2 font-medium text-accent-text hover:text-[var(--nv-accent-hover)] transition-colors group"
                                                            >
                                                                {t(link.labelKey)}
                                                                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                                            </Link>
                                                        ))}
                                                    </div>
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
