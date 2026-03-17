"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
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
        } catch {
            setStatus("error")
            setErrorMessage(t("errorToast"))
        }
    }

    return (
        <section
            id="contact"
            ref={formRef}
            className="relative -mt-12 overflow-hidden bg-[linear-gradient(180deg,#171310_0%,#1D1713_46%,#16110E_100%)] py-16 scroll-mt-24 md:-mt-16 md:py-28"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-[-6%] top-0 h-48 bg-[linear-gradient(to_bottom,rgba(23,19,16,1),rgba(23,19,16,0.8)_34%,rgba(23,19,16,0.24)_72%,rgba(23,19,16,0)_100%)] blur-[6px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(224,184,74,0.10),transparent_24%),radial-gradient(circle_at_82%_26%,rgba(255,255,255,0.05),transparent_28%)]" />
                <div className="absolute inset-x-0 top-0 h-28 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent)]" />
                <div className="absolute inset-x-[-6%] bottom-0 h-56 bg-[linear-gradient(to_bottom,rgba(22,17,14,0),rgba(14,11,10,0.28)_30%,rgba(14,11,10,0.78)_68%,rgba(10,8,7,1)_100%)] blur-[8px]" />
            </div>

            <Container className="relative z-10 max-w-2xl">
                <ScrollAnimation>
                    <div className="mb-12 text-center">
                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-[#F5F3EE] lg:text-5xl">
                            {t("sectionTitle")}
                        </h2>
                        <p className="mb-12 text-lg text-[#C5B8A6]">
                            {t("sectionSubtitle")}
                        </p>

                        <div className="mb-4">
                            <h3 className="mb-6 text-2xl font-bold text-[#F5F3EE]">{t("whyStartNow")}</h3>
                            <div className="flex flex-col justify-center gap-4 text-left sm:flex-row">
                                <div className="flex flex-1 items-start gap-3 rounded-xl border border-[#DAB983]/16 bg-[linear-gradient(180deg,rgba(43,34,28,0.92),rgba(29,23,19,0.96))] p-4 text-sm shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E0B84A]" />
                                    <div>
                                        <p className="font-semibold text-[#F5F3EE]">{t("benefit1Title")}</p>
                                        <p className="text-[#B9B2A3]">{t("benefit1Text")}</p>
                                    </div>
                                </div>
                                <div className="flex flex-1 items-start gap-3 rounded-xl border border-[#DAB983]/16 bg-[linear-gradient(180deg,rgba(43,34,28,0.92),rgba(29,23,19,0.96))] p-4 text-sm shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E0B84A]" />
                                    <div>
                                        <p className="font-semibold text-[#F5F3EE]">{t("benefit2Title")}</p>
                                        <p className="text-[#B9B2A3]">{t("benefit2Text")}</p>
                                    </div>
                                </div>
                                <div className="flex flex-1 items-start gap-3 rounded-xl border border-[#DAB983]/16 bg-[linear-gradient(180deg,rgba(43,34,28,0.92),rgba(29,23,19,0.96))] p-4 text-sm shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#E0B84A]" />
                                    <div>
                                        <p className="font-semibold text-[#F5F3EE]">{t("benefit3Title")}</p>
                                        <p className="text-[#B9B2A3]">{t("benefit3Text")}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollAnimation>

                <ScrollAnimation delay={0.2}>
                    <Card className="border-[#DAB983]/18 bg-[linear-gradient(180deg,rgba(43,34,28,0.92),rgba(29,23,19,0.96))] text-[#F5F3EE] shadow-[0_24px_60px_rgba(0,0,0,0.24)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.24)]">
                        <CardHeader>
                            <CardTitle className="text-[#F5F3EE]">{t("formTitle")}</CardTitle>
                            <CardDescription className="text-[#B9B2A3]">
                                {t("formDescription")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center animate-in fade-in zoom-in duration-300">
                                    <div className="rounded-full bg-[#E0B84A]/12 p-3">
                                        <CheckCircle2 className="h-8 w-8 text-[#E0B84A]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#F5F3EE]">{t("successTitle")}</h3>
                                    <p className="text-[#B9B2A3]">{successMessage || t("successText")}</p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {errorMessage && (
                                        <div className="mb-4 rounded-md border border-red-400/20 bg-red-500/10 p-3 text-center text-sm text-red-200">
                                            {errorMessage}
                                        </div>
                                    )}
                                    <input type="text" name="honeypot" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />
                                    <input type="hidden" name="lang" value={locale} />
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="text-[#F5F3EE]">{t("labelName")}</Label>
                                            <Input id="name" name="name" placeholder={t("placeholderName")} required disabled={status === "submitting"} className="h-11 rounded-xl border-[#DAB983]/16 bg-[#241D18]/80 text-[#F5F3EE] placeholder:text-[#8F8578] focus-visible:ring-[#E0B84A]/35 focus-visible:ring-offset-[#1D1713]" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-[#F5F3EE]">{t("labelEmail")}</Label>
                                            <Input id="email" name="email" type="email" placeholder={t("placeholderEmail")} required disabled={status === "submitting"} className="h-11 rounded-xl border-[#DAB983]/16 bg-[#241D18]/80 text-[#F5F3EE] placeholder:text-[#8F8578] focus-visible:ring-[#E0B84A]/35 focus-visible:ring-offset-[#1D1713]" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject" className="text-[#F5F3EE]">{t("labelSubject")}</Label>
                                        <Input id="subject" name="subject" placeholder={t("placeholderSubject")} required disabled={status === "submitting"} className="h-11 rounded-xl border-[#DAB983]/16 bg-[#241D18]/80 text-[#F5F3EE] placeholder:text-[#8F8578] focus-visible:ring-[#E0B84A]/35 focus-visible:ring-offset-[#1D1713]" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message" className="text-[#F5F3EE]">{t("labelMessage")}</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder={t("placeholderMessage")}
                                            className="min-h-[150px] rounded-xl border-[#DAB983]/16 bg-[#241D18]/80 text-[#F5F3EE] placeholder:text-[#8F8578] focus-visible:ring-[#E0B84A]/35 focus-visible:ring-offset-[#1D1713]"
                                            required
                                            disabled={status === "submitting"}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full rounded-xl border border-[#E0B84A]/24 bg-[linear-gradient(135deg,#F2D896_0%,#D8A14A_100%)] py-6 text-base font-semibold text-[#24170A] shadow-[0_20px_40px_rgba(197,144,58,0.18)] hover:brightness-105" disabled={status === "submitting"}>
                                        {status === "submitting" ? (
                                            <span className="flex items-center text-[#24170A]">
                                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-[#24170A]/30 border-r-transparent" />
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
