"use client"

import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { Layers, Terminal, Scale } from "lucide-react"

// Wir tauschen die alten 6 Agency-Icons gegen 3 strukturelle Developer/Architect Icons
const icons = {
    architecture: Layers,
    execution: Terminal,
    scalability: Scale,
}

export function ValueProposition() {
    const t = useTranslations("valueProposition")

    // Die 3 iterierbaren Prinzipien-Definitionen
    const principles = [
        {
            id: "architecture",
            number: "01",
            icon: icons.architecture,
        },
        {
            id: "execution",
            number: "02",
            icon: icons.execution,
        },
        {
            id: "scalability",
            number: "03",
            icon: icons.scalability,
        },
    ]

    return (
        <section id="principles" className="py-24 md:py-32 bg-white dark:bg-neutral-950 relative overflow-hidden transition-colors duration-300 border-t border-black/5 dark:border-white/5">
            <Container className="relative z-10 px-6 mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 relative">

                    {/* LINKE FLANKE: Die These (Sticky auf Desktop) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-40 lg:self-start flex flex-col items-start text-left">

                        {/* Micro Label */}
                        <div className="mb-6">
                            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5 text-[10px] font-medium uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 dark:bg-neutral-600" />
                                {t("label")}
                            </span>
                        </div>

                        {/* H2 Headline */}
                        <h2 className="text-3xl lg:text-4xl font-semibold leading-[1.15] tracking-tight text-neutral-900 dark:text-neutral-100 mb-6 max-w-sm">
                            {t("headlinePart1")} <br className="hidden lg:block" /> {t("headlinePart2")}
                        </h2>

                        {/* Leit-Paragraph */}
                        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-md">
                            {t("description")}
                        </p>
                    </div>

                    {/* RECHTE FLANKE: Die 3 Prinzipien als Editorial List */}
                    <div className="lg:col-span-7 lg:col-start-6 flex flex-col">
                        {principles.map((principle, index) => {
                            const Icon = principle.icon
                            return (
                                <div
                                    key={principle.id}
                                    className={`flex flex-col md:flex-row gap-6 md:gap-8 py-10 md:py-16 ${index !== 0 ? "border-t border-black/5 dark:border-white/5" : "pt-0 lg:pt-16 lg:-mt-16"
                                        }`}
                                >
                                    {/* Number / Icon Column */}
                                    <div className="flex flex-row md:flex-col justify-between md:justify-start items-center md:items-start w-full md:w-24 shrink-0 border-b md:border-b-0 border-black/5 dark:border-white/5 pb-4 md:pb-0 mb-2 md:mb-0">
                                        <span className="text-xs font-mono font-medium tracking-wider text-neutral-400 dark:text-neutral-500 md:mb-6">
                                            {principle.number}
                                        </span>
                                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-xl bg-neutral-100 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 flex items-center justify-center text-neutral-900 dark:text-neutral-200">
                                            <Icon className="h-4 w-4 md:h-5 md:w-5 stroke-[1.5]" />
                                        </div>
                                    </div>

                                    {/* Content Column */}
                                    <div className="flex flex-col flex-1">
                                        <h3 className="text-xl md:text-2xl font-medium tracking-tight text-neutral-900 dark:text-neutral-100 mb-3 md:mb-4">
                                            {t(`principles.${principle.id}.title`)}
                                        </h3>
                                        <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed max-w-xl">
                                            {t(`principles.${principle.id}.description`)}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                </div>
            </Container>
        </section>
    )
}
