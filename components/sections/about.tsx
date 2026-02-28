"use client"

import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

const SKILL_GROUPS = [
    { key: "frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
    { key: "backend", items: ["Node.js", "PostgreSQL", "Supabase", "REST APIs", "Serverless"] },
    { key: "designTools", items: ["Figma", "Git", "Vercel", "VS Code", "Responsive Design"] },
] as const

export function About() {
    const t = useTranslations("about")

    return (
        <section id="about" className="py-12 md:py-24 bg-secondary/20">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Bio Section */}
                    <ScrollAnimation>
                        <h2 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">{t("sectionTitle")}</h2>
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>{t("bio1")}</p>
                            <p>{t("bio2")}</p>
                            {t("bio3") && <p>{t("bio3")}</p>}
                        </div>
                    </ScrollAnimation>

                    {/* Quick Info Cards */}
                    <div className="flex flex-col gap-6 lg:pl-12">
                        <ScrollAnimation delay={0.1}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t("backgroundTitle")}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    {t("backgroundText")}
                                </CardContent>
                            </Card>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.2}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t("focusTitle")}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    {t("focusText")}
                                </CardContent>
                            </Card>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.3}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>{t("locationTitle")}</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    {t("locationText")}
                                </CardContent>
                            </Card>
                        </ScrollAnimation>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mt-24">
                    <ScrollAnimation>
                        <h3 className="mb-12 text-3xl font-bold tracking-tight">{t("skillsTitle")}</h3>
                    </ScrollAnimation>
                    <div className="grid gap-6 md:grid-cols-3">
                        {SKILL_GROUPS.map((skillGroup, index) => (
                            <ScrollAnimation key={skillGroup.key} delay={index * 0.1} className="h-full">
                                <Card className="h-full">
                                    <CardHeader>
                                        <CardTitle>{t(`skillCategories.${skillGroup.key}`)}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {skillGroup.items.map((item) => (
                                                <li key={item} className="flex items-center text-muted-foreground">
                                                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </ScrollAnimation>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
