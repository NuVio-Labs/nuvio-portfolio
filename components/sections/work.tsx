"use client"

import { useTranslations } from "next-intl"
import { ArrowRight, BadgeCheck, Lock, Quote } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { ProjectLivePreview } from "@/components/ui/project-live-preview"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import { Link } from "@/i18n/navigation"

type ProjectId = "wt-erdbewegungen" | "daisymays-salon" | "dj-white-label" | "nvl-core" | "taste"

interface ProjectMeta {
    link?: string
    demoUrl?: string
    previewImage: string
    tags: string[]
    private?: boolean
}

const PROJECT_IDS: ProjectId[] = ["wt-erdbewegungen", "daisymays-salon", "dj-white-label", "nvl-core", "taste"]

const PROJECT_META: Record<ProjectId, ProjectMeta> = {
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
    "dj-white-label": {
        demoUrl: "/demos/dj-white-label/index.html",
        previewImage: "/previews/dj-white-label.webp",
        tags: ["HTML", "CSS", "JavaScript"],
    },
    "nvl-core": {
        previewImage: "/previews/nvl-core.png",
        tags: ["React", "TypeScript", "Supabase", "Vite", "Multi-Tenant"],
        private: true,
    },
    "taste": {
        previewImage: "/previews/taste.png",
        tags: ["React 19", "TypeScript", "Supabase", "Tailwind CSS 4", "Vite"],
        private: true,
    },
}

const CTA_KEY: Record<ProjectId, string> = {
    "wt-erdbewegungen": "ctaWt",
    "daisymays-salon": "ctaDaisy",
    "dj-white-label": "ctaGeneric",
    "nvl-core": "ctaGeneric",
    "taste": "ctaGeneric",
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
                            const previewUrl = meta.link ?? meta.demoUrl

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
                                                            {meta.private && (
                                                                <span className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-surface-soft px-3 py-2 text-[11px] font-medium text-text-muted">
                                                                    <Lock className="h-3 w-3" />
                                                                    {t("privateBadge")}
                                                                </span>
                                                            )}
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
                                                {previewUrl ? (
                                                    <ProjectLivePreview
                                                        url={previewUrl}
                                                        title={title}
                                                        previewImage={meta.previewImage}
                                                        isLocal={!!meta.demoUrl}
                                                    />
                                                ) : (
                                                    <PrivatePreview
                                                        previewImage={meta.previewImage}
                                                        label={t("demoOnRequest")}
                                                        title={title}
                                                    />
                                                )}
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

function PrivatePreview({ previewImage, label, title }: { previewImage: string; label: string; title: string }) {
    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-[1.6rem] border border-border-soft bg-surface shadow-sm">
                <div className="flex items-center gap-3 border-b border-border-soft bg-surface-soft px-4 py-3">
                    <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
                    </div>
                    <div className="flex flex-1 items-center gap-2 rounded-full border border-border-soft bg-background px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-text-muted">
                        <Lock className="h-3 w-3" />
                        <span>{title}</span>
                    </div>
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={previewImage}
                        alt={title}
                        className="h-full w-full object-cover object-top opacity-60 blur-[2px]"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none" }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="rounded-2xl border border-border-soft bg-surface/90 px-6 py-4 text-center backdrop-blur-sm">
                            <Lock className="mx-auto mb-2 h-5 w-5 text-text-muted" />
                            <p className="text-sm font-medium text-text-secondary">{label}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
