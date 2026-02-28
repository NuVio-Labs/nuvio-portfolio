"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { sendEmail } from "@/app/actions/send-email"

export function Contact() {
    const t = useTranslations("contact")
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus("submitting")

        const formData = new FormData(event.currentTarget)
        const result = await sendEmail(formData)

        if (result?.error) {
            console.error("Email send failed:", result.error)
            setStatus("error")
        } else {
            setStatus("success")
        }
    }

    return (
        <section id="contact" className="py-12 md:py-24 bg-secondary/20">
            <Container className="max-w-2xl">
                <ScrollAnimation>
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">{t("sectionTitle")}</h2>
                        <p className="text-muted-foreground text-lg">
                            {t("sectionSubtitle")}
                        </p>
                    </div>
                </ScrollAnimation>

                <ScrollAnimation delay={0.2}>
                    <Card>
                        <CardHeader>
                            <CardTitle>{t("formTitle")}</CardTitle>
                            <CardDescription>
                                {t("formDescription")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center animate-in fade-in zoom-in duration-300">
                                    <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                        <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold">{t("successTitle")}</h3>
                                    <p className="text-muted-foreground">{t("successText")}</p>
                                    <Button variant="outline" onClick={() => setStatus("idle")} className="mt-4">
                                        {t("sendAnother")}
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">{t("labelName")}</Label>
                                            <Input id="name" name="name" placeholder={t("placeholderName")} required disabled={status === "submitting"} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">{t("labelEmail")}</Label>
                                            <Input id="email" name="email" type="email" placeholder={t("placeholderEmail")} required disabled={status === "submitting"} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">{t("labelSubject")}</Label>
                                        <Input id="subject" name="subject" placeholder={t("placeholderSubject")} required disabled={status === "submitting"} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">{t("labelMessage")}</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder={t("placeholderMessage")}
                                            className="min-h-[150px]"
                                            required
                                            disabled={status === "submitting"}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={status === "submitting"}>
                                        {status === "submitting" ? (
                                            <span className="flex items-center">
                                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent" />
                                                {t("submitting")}
                                            </span>
                                        ) : (
                                            t("submit")
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </ScrollAnimation>
            </Container>
        </section>
    )
}
