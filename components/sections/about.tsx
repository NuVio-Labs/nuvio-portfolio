"use client"

import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { CheckCircle2, Zap, ShieldCheck } from "lucide-react"

export function About() {
    const t = useTranslations("about")

    return (
        <section id="about" className="py-12 md:py-24 bg-secondary/20">
            <Container>
                <div className="grid gap-16 lg:grid-cols-2">
                    {/* Bio Section */}
                    <ScrollAnimation>
                        <h2 className="mb-2 text-primary font-semibold tracking-wide uppercase">{t("bioTitle")}</h2>
                        <h3 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">{t("sectionTitle")}</h3>
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>{t("bio1")}</p>
                            <p>{t("bio2")}</p>
                            <p>{t("bio3")}</p>
                        </div>

                        <div className="mt-12">
                            <h4 className="text-xl font-bold tracking-tight mb-4">{t("whyTitle")}</h4>
                            <p className="text-muted-foreground leading-relaxed">
                                {t("whyText")}
                            </p>
                        </div>
                    </ScrollAnimation>

                    {/* Quick Info Cards */}
                    <div className="flex flex-col gap-6 lg:pl-12 justify-center">
                        <ScrollAnimation delay={0.1}>
                            <h4 className="text-2xl font-bold tracking-tight mb-6">{t("valuesTitle")}</h4>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <CheckCircle2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-lg">{t("values.clarity.title")}</h5>
                                        <p className="text-muted-foreground">{t("values.clarity.text")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <Zap className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-lg">{t("values.performance.title")}</h5>
                                        <p className="text-muted-foreground">{t("values.performance.text")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="mt-1 flex-shrink-0">
                                        <ShieldCheck className="h-6 w-6 text-primary" />
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-lg">{t("values.sustainability.title")}</h5>
                                        <p className="text-muted-foreground">{t("values.sustainability.text")}</p>
                                    </div>
                                </div>
                            </div>
                        </ScrollAnimation>

                        <ScrollAnimation delay={0.3} className="mt-8">
                            <Card className="bg-primary/5 border-primary/10">
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-lg">{t("techTitle")}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground text-sm leading-relaxed">
                                    {t("techText")}
                                </CardContent>
                            </Card>
                        </ScrollAnimation>
                    </div>
                </div>
            </Container>
        </section>
    )
}
