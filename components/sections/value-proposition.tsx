"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { Container } from "@/components/layout/container"
import { ArrowRight, BadgeCheck, Layers, Scale, Terminal } from "lucide-react"

const principleIcons = {
    architecture: Layers,
    execution: Terminal,
    scalability: Scale,
} as const

export function ValueProposition() {
    const t = useTranslations("valueProposition")

    const principles = [
        { id: "architecture", number: "01", icon: principleIcons.architecture },
        { id: "execution", number: "02", icon: principleIcons.execution },
        { id: "scalability", number: "03", icon: principleIcons.scalability },
    ] as const

    const proofPoints = t.raw("proofPoints") as string[]

    return (
        <section
            id="principles"
            className="relative -mt-12 overflow-hidden bg-[linear-gradient(180deg,#0A0908_0%,#120F0C_48%,#0D0B09_100%)] py-24 pt-32 transition-colors duration-300 md:-mt-16 md:py-32 md:pt-40"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-0 top-0 h-52 bg-[linear-gradient(to_bottom,#070606_0%,rgba(7,6,6,0.9)_28%,rgba(10,9,8,0.8)_72%,rgba(10,9,8,0)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_24%,rgba(224,184,74,0.15),transparent_22%),radial-gradient(circle_at_84%_18%,rgba(224,184,74,0.16),transparent_20%),radial-gradient(circle_at_78%_74%,rgba(196,148,63,0.08),transparent_22%)]" />
                <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(122,93,47,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(122,93,47,0.08)_1px,transparent_1px)] [background-size:56px_56px]" />
                <div className="absolute left-[12%] top-[10%] h-[20rem] w-[20rem] rounded-full bg-[#E0B84A]/10 blur-[120px]" />
                <div className="absolute right-[8%] top-[12%] h-[20rem] w-[20rem] rounded-full bg-[#E0B84A]/12 blur-[130px]" />
            </div>

            <Container className="relative z-10">
                <div className="mx-auto max-w-[1120px]">
                    <div className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-stretch">
                    <article className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem] border border-[#CFA565]/22 bg-[linear-gradient(180deg,rgba(24,19,15,0.92),rgba(15,12,10,0.97))] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.25),0_0_80px_rgba(224,184,74,0.08)] sm:p-9">
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#E0B84A]/38 to-transparent" />
                        <div className="absolute left-[-2rem] top-[18%] h-28 w-28 rounded-full bg-[#E0B84A]/10 blur-[50px]" />
                        <div className="absolute right-[-2rem] bottom-[10%] h-28 w-28 rounded-full bg-[#E0B84A]/8 blur-[46px]" />

                        <div className="relative flex h-full flex-col">
                            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-[#D5B37C]/22 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#BFAF96]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#C8A35A] shadow-[0_0_12px_rgba(200,163,90,0.5)]" />
                                {t("label")}
                            </div>

                            <h2 className="mt-8 max-w-[10ch] text-[clamp(3.2rem,4.6vw,4.6rem)] font-semibold leading-[0.95] tracking-[-0.055em] text-[#F7F1E9]">
                                <span className="block">{t("headlinePart1")}</span>
                                <span className="block bg-gradient-to-r from-[#9A733A] via-[#C99747] to-[#E1BD79] bg-clip-text text-transparent">
                                    {t("headlinePart2")}
                                </span>
                            </h2>

                        </div>
                    </article>

                    <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:grid-rows-[270px_270px]">
                        {principles.map((principle, index) => {
                            const Icon = principle.icon
                            const cardClass =
                                index === 0
                                    ? "lg:row-span-2 lg:col-start-1 min-h-[560px]"
                                    : index === 1
                                      ? "lg:col-start-2 lg:row-start-1 min-h-[270px]"
                                      : "lg:col-start-2 lg:row-start-2 min-h-[270px]"

                            return (
                                <article
                                    key={principle.id}
                                    className={`relative overflow-hidden rounded-[2rem] border border-[#CFA565]/24 bg-[linear-gradient(180deg,rgba(28,22,17,0.94),rgba(19,15,12,0.98))] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.22),0_0_80px_rgba(224,184,74,0.06)] sm:p-8 ${cardClass}`}
                                >
                                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#E0B84A]/30 to-transparent" />
                                    <div className="absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full bg-[#E0B84A]/12 blur-[44px]" />

                                    <div className="relative flex h-full flex-col">
                                        <div className="flex items-start justify-between">
                                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#D5B37C]/28 bg-[linear-gradient(180deg,rgba(255,248,236,0.98),rgba(245,229,198,0.98))] text-[#7E6440] shadow-[0_14px_34px_rgba(193,146,65,0.14)]">
                                                <Icon className="h-5 w-5" />
                                            </div>

                                            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#8F7B60]">
                                                {principle.number}
                                            </span>
                                        </div>

                                        <div className="mt-10 flex-1">
                                            <h3 className="max-w-[11ch] text-2xl font-semibold tracking-[-0.03em] text-[#F7F1E9] sm:text-[1.8rem]">
                                                {t(`principles.${principle.id}.title`)}
                                            </h3>

                                            <p className="mt-4 max-w-[33ch] text-[15px] leading-7 text-[#BAAC98]">
                                                {t(`principles.${principle.id}.description`)}
                                            </p>
                                        </div>

                                        <div className="mt-8 inline-flex w-fit items-center rounded-full border border-[#D5AC66]/34 bg-[#FFF2D8] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#6E4A1A] shadow-[0_12px_26px_rgba(193,146,65,0.08)]">
                                            {t(`principles.${principle.id}.highlight`)}
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                    </div>

                    <div className="mt-6 overflow-hidden rounded-[2rem] border border-[#CFA565]/30 bg-[linear-gradient(135deg,#1A1410_0%,#241B15_48%,#2B2118_100%)] p-7 text-[#F7F1E9] shadow-[0_34px_90px_rgba(73,49,16,0.24)] sm:p-8 lg:p-8">
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#E0B84A]/45 to-transparent" />
                        <div className="absolute right-[-3rem] top-[-2rem] h-28 w-28 rounded-full bg-[#E0B84A]/18 blur-[55px]" />

                        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_auto] lg:items-end">
                            <div className="max-w-3xl">
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#DAB983]/25 bg-white/[0.05] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#D8C8AE]">
                                    <BadgeCheck className="h-3.5 w-3.5 text-[#E0B84A]" />
                                    {t("ctaEyebrow")}
                                </span>

                                <h3 className="mt-5 max-w-[15ch] text-[clamp(2rem,2.9vw,3.1rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-[#F7F1E9]">
                                    {t("ctaTitle")}
                                </h3>

                                <p className="mt-4 max-w-[38rem] text-base leading-8 text-[#C8BAA6]">
                                    {t("ctaText")}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-row">
                                <Link
                                    href="#contact"
                                    className="inline-flex min-w-[160px] items-center justify-center rounded-[1.05rem] border border-[#E0B84A]/25 bg-[linear-gradient(135deg,#F2D896_0%,#D8A14A_100%)] px-6 py-4 text-sm font-semibold text-[#24170A] shadow-[0_20px_40px_rgba(197,144,58,0.18)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
                                >
                                    {t("ctaPrimary")}
                                </Link>

                                <Link
                                    href="#work"
                                    className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-[1.05rem] border border-[#DAB983]/20 bg-white/[0.05] px-6 py-4 text-sm font-semibold text-[#F7F1E9] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]"
                                >
                                    {t("ctaSecondary")}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
                            {proofPoints.map((point) => (
                                <div
                                    key={point}
                                    className="flex items-center gap-3 rounded-[1.25rem] border border-white/8 bg-white/[0.04] px-4 py-4 text-sm text-[#E7D9C4]"
                                >
                                    <BadgeCheck className="h-4 w-4 shrink-0 text-[#E0B84A]" />
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}
