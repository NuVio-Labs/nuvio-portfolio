"use client"

import { useTranslations } from "next-intl"
import { ArrowRight, BadgeCheck, Quote } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { ProjectLivePreview } from "@/components/ui/project-live-preview"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Link } from "@/i18n/navigation"

type ProjectId = "wt-erdbewegungen" | "daisymays-salon" | "dj-white-label"

interface ProjectMeta {
    /** Live-URL des Projekts oder Pfad zu einer lokalen Demo. */
    url: string
    /** true, wenn `url` auf eine mitgelieferte Demo statt auf eine fremde Seite zeigt. */
    isLocalDemo?: boolean
    previewImage: string
    tags: string[]
}

const PROJECT_IDS: ProjectId[] = ["wt-erdbewegungen", "daisymays-salon", "dj-white-label"]

const PROJECT_META: Record<ProjectId, ProjectMeta> = {
    "wt-erdbewegungen": {
        url: "https://www.wt-erdbewegungen.de",
        previewImage: "/previews/wt.webp",
        tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    },
    "daisymays-salon": {
        url: "https://www.daisymayssalon.de",
        previewImage: "/previews/daisy.webp",
        tags: ["React", "TypeScript", "Vite", "Tailwind CSS", "i18n"],
    },
    "dj-white-label": {
        url: "/demos/dj-white-label/index.html",
        isLocalDemo: true,
        previewImage: "/previews/dj-white-label.webp",
        tags: ["HTML", "CSS", "JavaScript"],
    },
}

const CTA_KEY: Record<ProjectId, string> = {
    "wt-erdbewegungen": "ctaWt",
    "daisymays-salon": "ctaDaisy",
    "dj-white-label": "ctaGeneric",
}

export function Work() {
    const t = useTranslations("work")

    return (
        <SectionWrapper id="work">
            <div className="nv-container">
                <div className="mx-auto max-w-[1120px]">
                    <ScrollAnimation>
                        <div className="mx-auto max-w-[760px] text-center mb-16">
                            <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-text-muted">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                {t("eyebrow")}
                            </span>

                            <h2
                                className="mt-6 font-heading font-semibold tracking-tight text-text-primary"
                                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
                            >
                                {t("sectionTitle")}
                            </h2>

                            <p className="mx-auto mt-5 max-w-[36rem] text-base leading-8 text-text-muted sm:text-lg">
                                {t("sectionSubtitle")}
                            </p>
                        </div>
                    </ScrollAnimation>

                    <div className="space-y-6 sm:space-y-8">
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
                                <ScrollAnimation key={id} delay={index * 0.06}>
                                    <article className="relative overflow-hidden rounded-[2rem] border border-border-soft bg-surface p-5 shadow-sm sm:p-6 lg:p-8">
                                        <div className="relative grid gap-8 xl:grid-cols-[minmax(0,1fr)_460px] xl:items-center">

                                            {/* Text content */}
                                            <div className={reverseOnDesktop ? "xl:order-2" : ""}>
                                                <div className="flex items-start justify-between gap-4">
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="inline-flex items-center rounded-full border border-border-soft bg-surface-soft px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
                                                                {t("eyebrow")}
                                                            </span>
                                                        </div>

                                                        <h3
                                                            className="mt-6 max-w-[12ch] font-heading font-semibold leading-tight text-text-primary"
                                                            style={{ fontSize: "clamp(1.8rem, 2.8vw, 3rem)" }}
                                                        >
                                                            {title}
                                                        </h3>

                                                        <p className="mt-4 text-base leading-7 text-text-muted">
                                                            {t(`projects.${id}.description`)}
                                                        </p>
                                                    </div>

                                                    <span className="pt-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-text-muted">
                                                        {cardNumber}
                                                    </span>
                                                </div>

                                                <div className="mt-8 grid gap-4 lg:grid-cols-2">
                                                    <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                                                            {t("theProblem")}
                                                        </p>
                                                        <p className="mt-4 text-[15px] leading-7 text-text-secondary">
                                                            {t(`projects.${id}.problem`)}
                                                        </p>
                                                    </div>

                                                    <div className="rounded-[1.5rem] border border-border-soft bg-surface-soft p-5">
                                                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-text-muted">
                                                            {t("theApproach")}
                                                        </p>
                                                        <p className="mt-4 text-[15px] leading-7 text-text-secondary">
                                                            {t(`projects.${id}.approach`)}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="mt-4 rounded-[1.6rem] border border-accent/20 bg-accent-soft p-5">
                                                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent">
                                                        {t("theOutcome")}
                                                    </p>
                                                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                                        {outcomes.map((outcome) => (
                                                            <div
                                                                key={outcome}
                                                                className="rounded-[1.2rem] border border-border-soft bg-surface px-4 py-4"
                                                            >
                                                                <BadgeCheck className="h-4 w-4 text-accent" />
                                                                <p className="mt-3 text-sm leading-6 text-text-primary">
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
                                                            className="rounded-full border border-border-soft bg-surface-soft px-3 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-text-muted"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                <blockquote className="mt-6 rounded-[1.5rem] border border-border-soft bg-surface-soft px-5 py-5">
                                                    <div className="flex items-start gap-3">
                                                        <Quote className="mt-1 h-4 w-4 shrink-0 text-accent" />
                                                        <p className="text-[15px] leading-7 text-text-secondary">
                                                            {t(`projects.${id}.testimonial`)}
                                                        </p>
                                                    </div>
                                                </blockquote>

                                                <div className="mt-6">
                                                    <Link
                                                        href="/contact"
                                                        className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-semibold text-surface shadow-sm transition duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98]"
                                                    >
                                                        {t(CTA_KEY[id])}
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Link>
                                                </div>
                                            </div>

                                            {/* Preview */}
                                            <div className={reverseOnDesktop ? "xl:order-1" : ""}>
                                                <ProjectLivePreview
                                                    url={meta.url}
                                                    title={title}
                                                    previewImage={meta.previewImage}
                                                    isLocal={!!meta.isLocalDemo}
                                                />
                                            </div>
                                        </div>
                                    </article>
                                </ScrollAnimation>
                            )
                        })}
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
