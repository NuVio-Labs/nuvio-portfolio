import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { setRequestLocale } from "next-intl/server"
import { Link } from "@/i18n/navigation"

export default function ResearchPage({ params: { locale } }: { params: { locale: string } }) {
    setRequestLocale(locale)
    const t = useTranslations("lab")

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="py-24 md:py-32">
                    <Container>
                        <ScrollAnimation>
                            <div className="max-w-2xl mb-24">
                                <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-6xl">{t("sectionTitle")}</h1>
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {t("sectionSubtitle")}
                                </p>
                            </div>
                        </ScrollAnimation>

                        <div className="flex flex-col gap-24">
                            {/* Experiment 1: Fluid Geometry */}
                            <ScrollAnimation delay={0.1}>
                                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row gap-8 md:gap-16">
                                    <div className="md:w-1/3">
                                        <h2 className="text-2xl font-medium tracking-tight">{t("experiments.fluidGeometry.focus")}</h2>
                                    </div>
                                    <div className="md:w-2/3 flex flex-col gap-8">
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                                            <span className="text-[10px] tracking-widest uppercase text-muted-foreground w-24 shrink-0 pt-1">PROBLEM</span>
                                            <p className="text-base text-foreground/80 leading-relaxed">{t("experiments.fluidGeometry.problem")}</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                                            <span className="text-[10px] tracking-widest uppercase text-muted-foreground w-24 shrink-0 pt-1">APPROACH</span>
                                            <p className="text-base text-foreground/80 leading-relaxed">{t("experiments.fluidGeometry.approach")}</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                                            <span className="text-[10px] tracking-widest uppercase text-muted-foreground w-24 shrink-0 pt-1">VALUE</span>
                                            <p className="text-base text-foreground/90 font-medium leading-relaxed">{t("experiments.fluidGeometry.value")}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimation>

                            {/* Experiment 2: Audio Viz */}
                            <ScrollAnimation delay={0.2}>
                                <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row gap-8 md:gap-16">
                                    <div className="md:w-1/3">
                                        <h2 className="text-2xl font-medium tracking-tight">{t("experiments.audioViz.focus")}</h2>
                                    </div>
                                    <div className="md:w-2/3 flex flex-col gap-8">
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                                            <span className="text-[10px] tracking-widest uppercase text-muted-foreground w-24 shrink-0 pt-1">PROBLEM</span>
                                            <p className="text-base text-foreground/80 leading-relaxed">{t("experiments.audioViz.problem")}</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                                            <span className="text-[10px] tracking-widest uppercase text-muted-foreground w-24 shrink-0 pt-1">APPROACH</span>
                                            <p className="text-base text-foreground/80 leading-relaxed">{t("experiments.audioViz.approach")}</p>
                                        </div>
                                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start">
                                            <span className="text-[10px] tracking-widest uppercase text-muted-foreground w-24 shrink-0 pt-1">VALUE</span>
                                            <p className="text-base text-foreground/90 font-medium leading-relaxed">{t("experiments.audioViz.value")}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollAnimation>
                        </div>

                        {/* Footer CTA */}
                        <ScrollAnimation delay={0.3}>
                            <div className="mt-32 pt-16 border-t border-white/10 text-center">
                                <p className="text-xl font-medium mb-6">{t("cta")}</p>
                                <Link href="/#contact" className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
                                    {t("sectionTitle") === "Applied Research" ? "Start a project" : "Projekt starten"}
                                </Link>
                            </div>
                        </ScrollAnimation>
                    </Container>
                </section>
            </main>
        </div>
    )
}
