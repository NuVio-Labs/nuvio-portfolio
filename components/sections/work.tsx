"use client"

import { useTranslations } from "next-intl"
import { ArrowRight, BadgeCheck, Quote } from "lucide-react"
import { Container } from "@/components/layout/container"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { ProjectLivePreview } from "@/components/ui/project-live-preview"
import { Link } from "@/i18n/navigation"

const PROJECT_IDS = ["wt-erdbewegungen", "daisymays-salon"] as const

const PROJECT_META: Record<string, { link: string; previewImage: string; tags: string[] }> = {
    "wt-erdbewegungen": {
        link: "https://www.wt-erdbewegungen.de",
        previewImage: "/previews/wt.webp",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    },
    "daisymays-salon": {
        link: "https://www.daisymayssalon.de",
        previewImage: "/previews/daisy.webp",
        tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "i18n"],
    },
}

export function Work() {
    const t = useTranslations("work")

    return (
        <section
            id="work"
            className="relative -mt-12 overflow-hidden bg-[linear-gradient(180deg,#0E0B09_0%,#090706_18%,#0D0A08_58%,#090706_100%)] py-28 md:-mt-16 md:py-36"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-[-6%] top-0 h-48 bg-[linear-gradient(to_bottom,rgba(11,9,8,1),rgba(11,9,8,0.8)_34%,rgba(11,9,8,0.26)_72%,rgba(11,9,8,0)_100%)] blur-[6px]" />
                <div className="absolute inset-x-[-6%] bottom-0 h-52 bg-[linear-gradient(to_bottom,rgba(9,7,6,0),rgba(10,8,7,0.3)_32%,rgba(10,8,7,0.76)_68%,rgba(11,9,8,1)_100%)] blur-[8px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(224,184,74,0.16),transparent_24%),radial-gradient(circle_at_84%_24%,rgba(224,184,74,0.12),transparent_24%),radial-gradient(circle_at_58%_78%,rgba(177,126,44,0.08),transparent_24%)]" />
                <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(122,93,47,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(122,93,47,0.08)_1px,transparent_1px)] [background-size:58px_58px]" />
                <div className="absolute left-[8%] top-[8%] h-[20rem] w-[20rem] rounded-full bg-[#E0B84A]/10 blur-[120px]" />
                <div className="absolute right-[6%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-[#E0B84A]/10 blur-[140px]" />
            </div>

            <Container className="relative z-10">
                <div className="mx-auto max-w-[1120px]">
                    <ScrollAnimation>
                        <div className="mx-auto max-w-[760px] text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#D5B37C]/18 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#BFAF96]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#C8A35A] shadow-[0_0_12px_rgba(200,163,90,0.5)]" />
                                {t("eyebrow")}
                            </span>

                            <h2 className="mt-6 text-[clamp(3rem,5vw,4.7rem)] font-semibold tracking-[-0.055em] text-[#F7F1E9]">
                                {t("sectionTitle")}
                            </h2>

                            <p className="mx-auto mt-5 max-w-[36rem] text-base leading-8 text-[#C5B69E] sm:text-lg">
                                {t("sectionSubtitle")}
                            </p>
                        </div>
                    </ScrollAnimation>

                    <div className="mt-16 space-y-6 sm:space-y-8">
                        {PROJECT_IDS.map((id, index) => {
                            const meta = PROJECT_META[id]
                            const title = t(`projects.${id}.title`)
                            const outcomes = [
                                t(`projects.${id}.outcome1`),
                                t(`projects.${id}.outcome2`),
                                t(`projects.${id}.outcome3`),
                            ]
                            const cardNumber = String(index + 1).padStart(2, "0")
                            const reverseOnDesktop = index % 2 === 1

                            return (
                                <ScrollAnimation key={id} delay={index * 0.08}>
                                    <article className="relative overflow-hidden rounded-[2rem] border border-[#CFA565]/24 bg-[linear-gradient(180deg,rgba(23,18,14,0.96),rgba(14,11,9,0.98))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28),0_0_80px_rgba(224,184,74,0.06)] sm:p-6 lg:p-8">
                                        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#E0B84A]/32 to-transparent" />
                                        <div className="absolute right-[-2rem] top-[18%] h-28 w-28 rounded-full bg-[#E0B84A]/8 blur-[58px]" />
                                        <div className="absolute left-[-3rem] bottom-[12%] h-32 w-32 rounded-full bg-[#E0B84A]/6 blur-[60px]" />

                                        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_420px] xl:items-start">
                                            <div className={reverseOnDesktop ? "xl:order-2" : ""}>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <span className="inline-flex items-center rounded-full border border-[#DAB983]/20 bg-white/[0.04] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#BFAF96]">
                                                            {t("eyebrow")}
                                                        </span>

                                                        <h3 className="mt-6 max-w-[12ch] text-[clamp(2.3rem,3.4vw,3.6rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[#F7F1E9]">
                                                            {title}
                                                        </h3>

                                                        <p className="mt-4 text-base leading-7 text-[#D0C3AE]">
                                                            {t(`projects.${id}.description`)}
                                                        </p>
                                                    </div>

                                                    <span className="pt-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#8F7B60]">
                                                        {cardNumber}
                                                    </span>
                                                </div>

                                                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                                                    <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8F7B60]">
                                                            {t("theProblem")}
                                                        </p>
                                                        <p className="mt-4 text-[15px] leading-7 text-[#C3B59F]">
                                                            {t(`projects.${id}.problem`)}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5">
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8F7B60]">
                                                            {t("theApproach")}
                                                        </p>
                                                        <p className="mt-4 text-[15px] leading-7 text-[#C3B59F]">
                                                            {t(`projects.${id}.approach`)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-4 rounded-[1.6rem] border border-[#CFA565]/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-5">
                                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D5B37C]">
                                                        {t("theOutcome")}
                                                    </p>

                                                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                                        {outcomes.map((outcome) => (
                                                            <div
                                                                key={outcome}
                                                                className="rounded-[1.2rem] border border-white/8 bg-[#120F0C]/90 px-4 py-4"
                                                            >
                                                                <BadgeCheck className="h-4 w-4 text-[#E0B84A]" />
                                                                <p className="mt-3 text-sm leading-6 text-[#F1E7D8]">
                                                                    {outcome}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mt-6 flex flex-wrap gap-2">
                                                    {meta.tags.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="rounded-full border border-[#DAB983]/18 bg-white/[0.03] px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#C4B59D]"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <blockquote className="mt-6 rounded-[1.5rem] border border-[#DAB983]/16 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] px-5 py-5 text-[#E8D8C0]">
                                                    <div className="flex items-start gap-3">
                                                        <Quote className="mt-1 h-4 w-4 shrink-0 text-[#E0B84A]" />
                                                        <p className="text-[15px] leading-7 text-[#D8C9B2]">
                                                            {t(`projects.${id}.testimonial`)}
                                                        </p>
                                                    </div>
                                                </blockquote>

                                                <div className="mt-6">
                                                    <Link
                                                        href="#contact"
                                                        className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-[1.05rem] border border-[#E0B84A]/22 bg-[linear-gradient(135deg,#F2D896_0%,#D8A14A_100%)] px-6 py-4 text-sm font-semibold text-[#24170A] shadow-[0_20px_40px_rgba(197,144,58,0.16)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
                                                    >
                                                        {t(id === "wt-erdbewegungen" ? "ctaWt" : "ctaDaisy")}
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>

                                            <div className={reverseOnDesktop ? "xl:order-1" : ""}>
                                                <ProjectLivePreview
                                                    url={meta.link}
                                                    title={title}
                                                    previewImage={meta.previewImage}
                                                />
                                            </div>
                                        </div>
                                    </article>
                                </ScrollAnimation>
                            )
                        })}
                    </div>
                </div>
            </Container>
        </section>
    )
}
