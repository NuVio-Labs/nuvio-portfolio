"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Contact as ContactIcon, CheckCircle2 } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { sendEmail } from "@/app/actions/send-email"
import { useRef } from "react"

export function Contact() {
    const t = useTranslations("contact")
    const formRef = useRef<HTMLElement>(null)
    const locale = useLocale()
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus("submitting")
        setErrorMessage(null)

        const form = event.currentTarget
        const formData = new FormData(form)

        try {
            const result = await sendEmail(formData)

            if (result?.success) {
                form.reset()
                setStatus("success")
                setSuccessMessage(result?.message || t("successToast"))

                // Auto-scroll to top of form section with a tiny delay
                setTimeout(() => {
                    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
                }, 100)
                return
            }

            setStatus("error")
            setErrorMessage(result?.message || t("errorToast"))
        } catch (err) {
            setStatus("error")
            setErrorMessage(t("errorToast"))
        }
    }

    return (
        <section id="contact" ref={formRef} className="py-12 md:py-24 bg-secondary/20 scroll-mt-24">
            <Container className="max-w-2xl">
                <ScrollAnimation>
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">{t("sectionTitle")}</h2>
                        <p className="text-muted-foreground text-lg mb-12">
                            {t("sectionSubtitle")}
                        </p>

                        <div className="mb-4">
                            <h3 className="text-2xl font-bold mb-6">{t("whyStartNow")}</h3>
                            <div className="flex flex-col sm:flex-row justify-center gap-4 text-left">
                                <div className="flex gap-3 items-start bg-background p-4 text-sm rounded-xl border shadow-sm flex-1">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-foreground">{t("benefit1Title")}</p>
                                        <p className="text-muted-foreground">{t("benefit1Text")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start bg-background p-4 text-sm rounded-xl border shadow-sm flex-1">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-foreground">{t("benefit2Title")}</p>
                                        <p className="text-muted-foreground">{t("benefit2Text")}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start bg-background p-4 text-sm rounded-xl border shadow-sm flex-1">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <div>
                                        <p className="font-semibold text-foreground">{t("benefit3Title")}</p>
                                        <p className="text-muted-foreground">{t("benefit3Text")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
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
                                    <p className="text-muted-foreground">{successMessage || t("successText")}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {errorMessage && (
                                        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md mb-4 border border-destructive/20 text-center">
                                            {errorMessage}
                                        </div>
                                    )}
                                    <input type="text" name="honeypot" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                                    <input type="hidden" name="lang" value={locale} />
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
                                    <Button type="submit" className="w-full text-base font-semibold shadow-md py-6 rounded-xl" disabled={status === "submitting"}>
                                        {status === "submitting" ? (
                                            <span className="flex items-center">
                                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent" />
                                                {t("submitting")}
                                            </span>
                                        ) : (
                                            t("submit")
                                        )}
                                    </Button>
                                    {/* <div className="pt-2 flex items-center justify-center text-xs text-muted-foreground text-center"> */}
                                    {/* <span className="mr-1.5 opacity-80">🔒</span> {t("trustBadge")} */}
                                    {/* </div> */}
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </ScrollAnimation>
            </Container>
        </section>
    )
}
