"use client"

import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { ProjectLivePreview } from "@/components/ui/project-live-preview"
import { Link } from "@/i18n/navigation"
import { Button } from "@/components/ui/button"

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
        <section id="work" className="py-24 md:py-32">
            <Container>
                <ScrollAnimation>
                    <div className="mb-20">
                        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">{t("sectionTitle")}</h2>
                        <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
                            {t("sectionSubtitle")}
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="space-y-32">
                    {PROJECT_IDS.map((id, index) => {
                        const meta = PROJECT_META[id]
                        const title = t(`projects.${id}.title`)

                        return (
                            <ScrollAnimation key={id}>
                                <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
                                    {/* Live Preview */}
                                    <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                                        <ProjectLivePreview
                                            url={meta.link}
                                            title={title}
                                            previewImage={meta.previewImage}
                                        />
                                    </div>

                                    {/* Case Study Content */}
                                    <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                                        <div className="flex items-center justify-between mb-6">
                                            <h3 className="text-3xl font-bold tracking-tight">{title}</h3>
                                            <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                                                Web
                                            </span>
                                        </div>

                                        <p className="text-xl text-foreground/80 mb-8 leading-relaxed font-medium">
                                            {t(`projects.${id}.description`)}
                                        </p>

                                        <div className="space-y-8 mb-8">
                                            <div>
                                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t("theProblem")}</h4>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {t(`projects.${id}.problem`)}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">{t("theApproach")}</h4>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {t(`projects.${id}.approach`)}
                                                </p>
                                            </div>
                                            <div className="pl-4 border-l-2 border-accent">
                                                <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">{t("theOutcome")}</h4>
                                                <ul className="space-y-3 text-foreground font-medium leading-relaxed">
                                                    <li>{t(`projects.${id}.outcome1`)}</li>
                                                    <li>{t(`projects.${id}.outcome2`)}</li>
                                                    <li>{t(`projects.${id}.outcome3`)}</li>
                                                </ul>
                                            </div>

                                            <blockquote className="border-l-4 border-primary/50 pl-4 py-1 italic text-muted-foreground mt-8 text-lg bg-secondary/10 rounded-r-lg">
                                                {t(`projects.${id}.testimonial`)}
                                            </blockquote>
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <div className="flex flex-wrap gap-2">
                                                {meta.tags.map(tag => (
                                                    <span key={tag} className="text-sm font-medium bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>

                                            <Link href="#contact" className="w-fit mt-2">
                                                <Button size="lg" className="rounded-full flex items-center gap-2 shadow-md">
                                                    {t(id === "wt-erdbewegungen" ? "ctaWt" : "ctaDaisy")}
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        )
                    })}
                </div>
            </Container>
        </section>
    )
}
