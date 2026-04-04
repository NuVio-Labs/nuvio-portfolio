"use client"

import { useTranslations } from "next-intl"
import { ArrowRight } from "lucide-react"
import { Container } from "@/components/layout/container"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { ProjectLivePreview } from "@/components/ui/project-live-preview"
import { Link } from "@/i18n/navigation"

const PROJECT_IDS = ["wt-erdbewegungen", "daisymays-salon"] as const

const PROJECT_META: Record<string, { link: string; previewImage: string; tags: string[]; category: string }> = {
    "wt-erdbewegungen": {
        link: "https://www.wt-erdbewegungen.de",
        previewImage: "/previews/wt.webp",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
        category: "Local business · Web presence",
    },
    "daisymays-salon": {
        link: "https://www.daisymayssalon.de",
        previewImage: "/previews/daisy.webp",
        tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "i18n"],
        category: "Salon · Bilingual brand site",
    },
}

export function Work() {
    const t = useTranslations("work")

    return (
        <section
            id="work"
            className="relative -mt-12 overflow-hidden bg-[linear-gradient(180deg,#0E0B09_0%,#090706_18%,#0D0A08_58%,#090706_100%)] py-28 md:-mt-16 md:py-36"
        >
            {/* Background atmosphere */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-[-6%] top-0 h-48 bg-[linear-gradient(to_bottom,rgba(11,9,8,1),rgba(11,9,8,0.8)_34%,rgba(11,9,8,0.26)_72%,rgba(11,9,8,0)_100%)] blur-[6px]" />
                <div className="absolute inset-x-[-6%] bottom-0 h-52 bg-[linear-gradient(to_bottom,rgba(9,7,6,0),rgba(10,8,7,0.3)_32%,rgba(10,8,7,0.76)_68%,rgba(11,9,8,1)_100%)] blur-[8px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(224,184,74,0.12),transparent_24%),radial-gradient(circle_at_84%_24%,rgba(224,184,74,0.10),transparent_24%)]" />
                <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(122,93,47,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(122,93,47,0.08)_1px,transparent_1px)] [background-size:58px_58px]" />
                <div className="absolute left-[8%] top-[8%] h-[18rem] w-[18rem] rounded-full bg-[#E0B84A]/8 blur-[120px]" />
                <div className="absolute right-[6%] top-[18%] h-[22rem] w-[22rem] rounded-full bg-[#E0B84A]/8 blur-[140px]" />
            </div>

            <Container className="relative z-10">
                <div className="mx-auto max-w-[1120px]">

                    {/* Section header */}
                    <ScrollAnimation>
                        <div className="mx-auto max-w-[640px] text-center">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#D5B37C]/18 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-[#BFAF96]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#C8A35A] shadow-[0_0_12px_rgba(200,163,90,0.5)]" />
                                {t("eyebrow")}
                            </span>

                            <h2 className="mt-6 text-[clamp(3rem,5vw,4.7rem)] font-semibold tracking-[-0.055em] text-[#F7F1E9]">
                                {t("sectionTitle")}
                            </h2>

                            <p className="mx-auto mt-4 max-w-[34rem] text-base leading-7 text-[#9A8E80] sm:text-[1.05rem]">
                                {t("sectionSubtitle")}
                            </p>
                        </div>
                    </ScrollAnimation>

                    {/* Project cards */}
                    <div className="mt-20 space-y-5">
                        {PROJECT_IDS.map((id, index) => {
                            const meta = PROJECT_META[id]
                            const title = t(`projects.${id}.title`)
                            const outcomes = [
                                t(`projects.${id}.outcome1`),
                                t(`projects.${id}.outcome2`),
                                t(`projects.${id}.outcome3`),
                            ]
                            const reverseOnDesktop = index % 2 === 1
                            const cardIndex = String(index + 1).padStart(2, "0")

                            return (
                                <ScrollAnimation key={id} delay={index * 0.07}>
                                    <article className="group relative overflow-hidden rounded-[2rem] border border-[#CFA565]/20 bg-[linear-gradient(180deg,rgba(24,19,14,0.97),rgba(15,12,9,0.99))] shadow-[0_24px_80px_rgba(0,0,0,0.26),0_0_60px_rgba(224,184,74,0.05)] transition-colors duration-500 hover:border-[#CFA565]/32">
                                        {/* Top accent line */}
                                        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#E0B84A]/28 to-transparent" />
                                        {/* Ambient glow */}
                                        <div className="absolute right-[-3rem] top-[15%] h-32 w-32 rounded-full bg-[#E0B84A]/7 blur-[64px] transition-opacity duration-500 group-hover:opacity-150" />

                                        <div className="relative p-6 sm:p-8 lg:p-10">
                                            <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_400px] xl:items-start">

                                                {/* ── Content column ── */}
                                                <div className={reverseOnDesktop ? "xl:order-2" : ""}>

                                                    {/* Project header */}
                                                    <div className="flex items-start justify-between gap-6">
                                                        <div className="flex-1">
                                                            {/* Category pill */}
                                                            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#7A6E62]">
                                                                {meta.category}
                                                            </p>

                                                            <h3 className="mt-3 max-w-[14ch] text-[clamp(2.1rem,3.2vw,3.4rem)] font-semibold leading-[0.97] tracking-[-0.048em] text-[#F7F1E9]">
                                                                {title}
                                                            </h3>

                                                            <p className="mt-4 max-w-[42ch] text-[15px] leading-7 text-[#B0A393]">
                                                                {t(`projects.${id}.description`)}
                                                            </p>
                                                        </div>

                                                        {/* Large faded project index */}
                                                        <span
                                                            aria-hidden="true"
                                                            className="shrink-0 select-none pt-1 font-bold leading-none tracking-[-0.08em] text-[#1E1610] tabular-nums text-[clamp(3rem,5vw,5rem)]"
                                                        >
                                                            {cardIndex}
                                                        </span>
                                                    </div>

                                                    {/* Problem / Solution */}
                                                    <div className="mt-8 grid gap-3 lg:grid-cols-2">
                                                        <div className="rounded-[1.4rem] border border-white/[0.06] bg-white/[0.025] p-5">
                                                            <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#7A6E62]">
                                                                {t("theProblem")}
                                                            </p>
                                                            <p className="mt-3 text-[14.5px] leading-7 text-[#B9ADA0]">
                                                                {t(`projects.${id}.problem`)}
                                                            </p>
                                                        </div>

                                                        <div className="rounded-[1.4rem] border border-white/[0.06] bg-white/[0.025] p-5">
                                                            <p className="text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#7A6E62]">
                                                                {t("theApproach")}
                                                            </p>
                                                            <p className="mt-3 text-[14.5px] leading-7 text-[#B9ADA0]">
                                                                {t(`projects.${id}.approach`)}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Outcomes */}
                                                    <div className="mt-5">
                                                        <p className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.22em] text-[#C8A35A]">
                                                            {t("theOutcome")}
                                                        </p>
                                                        <div className="space-y-2">
                                                            {outcomes.map((outcome) => (
                                                                <div
                                                                    key={outcome}
                                                                    className="flex items-start gap-3"
                                                                >
                                                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C8A35A]" />
                                                                    <p className="text-[14.5px] leading-7 text-[#D8CEC0]">
                                                                        {outcome}
                                                                    </p>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Testimonial — pull quote style */}
                                                    <div className="mt-7 border-l-2 border-[#E0B84A]/25 pl-5">
                                                        <p className="text-[14.5px] italic leading-7 text-[#9A8E80]">
                                                            {t(`projects.${id}.testimonial`)}
                                                        </p>
                                                    </div>

                                                    {/* Footer row: tags + CTA */}
                                                    <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                                                        <div className="flex flex-wrap gap-2">
                                                            {meta.tags.map((tag) => (
                                                                <span
                                                                    key={tag}
                                                                    className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-[11px] font-medium tracking-[0.08em] text-[#8F8578]"
                                                                >
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>

                                                        <Link
                                                            href="#contact"
                                                            className="inline-flex shrink-0 items-center gap-2 rounded-[1rem] border border-[#E0B84A]/20 bg-[linear-gradient(135deg,#F2D896_0%,#D8A14A_100%)] px-5 py-3 text-[12.5px] font-semibold text-[#24170A] shadow-[0_16px_36px_rgba(197,144,58,0.14)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105"
                                                        >
                                                            {t(id === "wt-erdbewegungen" ? "ctaWt" : "ctaDaisy")}
                                                            <ArrowRight className="h-3.5 w-3.5" />
                                                        </Link>
                                                    </div>
                                                </div>

                                                {/* ── Preview column ── */}
                                                <div className={reverseOnDesktop ? "xl:order-1" : ""}>
                                                    <ProjectLivePreview
                                                        url={meta.link}
                                                        title={title}
                                                        previewImage={meta.previewImage}
                                                    />
                                                </div>
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
