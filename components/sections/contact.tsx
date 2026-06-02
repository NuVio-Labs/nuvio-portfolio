"use client"

import { useState, useRef } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckCircle2, ShieldCheck } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { sendEmail } from "@/app/actions/send-email"

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
                setSuccessMessage(result?.message || t("successText"))

                setTimeout(() => {
                    formRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    })
                }, 100)
                return
            }

            setStatus("error")
            setErrorMessage(result?.message || t("formDescription"))
        } catch {
            setStatus("error")
            setErrorMessage(t("formDescription"))
        }
    }

    return (
        <section
            id="contact"
            ref={formRef as React.RefObject<HTMLElement>}
            className="relative -mt-12 overflow-hidden bg-[linear-gradient(180deg,#171310_0%,#1D1713_46%,#16110E_100%)] py-16 scroll-mt-24 md:-mt-16 md:py-28"
        >
            {/* Background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-[-6%] top-0 h-48 bg-[linear-gradient(to_bottom,rgba(23,19,16,1),rgba(23,19,16,0.8)_34%,rgba(23,19,16,0.24)_72%,rgba(23,19,16,0)_100%)] blur-[6px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(224,184,74,0.08),transparent_24%),radial-gradient(circle_at_82%_26%,rgba(255,255,255,0.04),transparent_28%)]" />
                <div className="absolute inset-x-[-6%] bottom-0 h-56 bg-[linear-gradient(to_bottom,rgba(22,17,14,0),rgba(14,11,10,0.28)_30%,rgba(14,11,10,0.78)_68%,rgba(10,8,7,1)_100%)] blur-[8px]" />
            </div>

            <Container className="relative z-10 max-w-2xl">
                {/* Section header */}
                <ScrollAnimation>
                    <div className="mb-10 text-center">
                        <h2 className="text-[clamp(2.6rem,5vw,4rem)] font-semibold leading-[1.04] tracking-[-0.052em] text-[#F5F3EE]">
                            {t("sectionTitle")}
                        </h2>

                        <p className="mt-4 text-[15px] leading-7 text-[#B8AFA4]">
                            {t("sectionSubtitle")}
                        </p>
                    </div>

                    {/* Trust signals */}
                    <div className="mb-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
                        {[
                            t("benefit1Title"),
                            t("benefit2Title"),
                            t("benefit3Title"),
                        ].map((label) => (
                            <div
                                key={label}
                                className="flex items-center gap-2 text-[13px] text-[#B8AFA4]"
                            >
                                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#C8A35A]/70" />
                                {label}
                            </div>
                        ))}
                    </div>
                </ScrollAnimation>

                {/* Form card */}
                <ScrollAnimation delay={0.12}>
                    <div className="relative overflow-hidden rounded-[2rem] border border-[#DAB983]/18 bg-[linear-gradient(180deg,rgba(40,31,25,0.96),rgba(26,20,16,0.98))] p-6 shadow-[0_28px_72px_rgba(0,0,0,0.28)] sm:p-8">
                        {/* Top accent */}
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#E0B84A]/30 to-transparent" />

                        {/* Form header */}
                        <div className="mb-6">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C8B99A]">
                                {t("formTitle")}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[#C0B5A8]">
                                {t("formDescription")}
                            </p>
                        </div>

                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center space-y-4 py-10 text-center">
                                <div className="rounded-full bg-[#E0B84A]/10 p-4">
                                    <CheckCircle2 className="h-8 w-8 text-[#E0B84A]" />
                                </div>
                                <h3 className="text-xl font-semibold text-[#F5F3EE]">
                                    {t("successTitle")}
                                </h3>
                                <p className="max-w-[28ch] text-[#C0B5A8]">
                                    {successMessage || t("successText")}
                                </p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Honeypot */}
                                <input
                                    type="text"
                                    name="honeypot"
                                    style={{ display: "none" }}
                                    tabIndex={-1}
                                    autoComplete="off"
                                />
                                <input
                                    type="hidden"
                                    name="lang"
                                    value={locale}
                                />

                                {errorMessage && (
                                    <div className="rounded-xl border border-red-400/20 bg-red-500/8 p-3 text-center text-sm text-red-300">
                                        {errorMessage}
                                    </div>
                                )}

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="name"
                                            className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C8B99A]"
                                        >
                                            {t("labelName")}
                                        </Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            placeholder={t("placeholderName")}
                                            required
                                            disabled={status === "submitting"}
                                            className="h-11 rounded-xl border-[#DAB983]/16 bg-[#1E1712]/80 text-[#F5F3EE] placeholder:text-[#7A6E62] focus-visible:ring-[#E0B84A]/30 focus-visible:ring-offset-[#1D1713]"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label
                                            htmlFor="email"
                                            className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C8B99A]"
                                        >
                                            {t("labelEmail")}
                                        </Label>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder={t("placeholderEmail")}
                                            required
                                            disabled={status === "submitting"}
                                            className="h-11 rounded-xl border-[#DAB983]/16 bg-[#1E1712]/80 text-[#F5F3EE] placeholder:text-[#7A6E62] focus-visible:ring-[#E0B84A]/30 focus-visible:ring-offset-[#1D1713]"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="subject"
                                        className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C8B99A]"
                                    >
                                        {t("labelSubject")}
                                    </Label>
                                    <Input
                                        id="subject"
                                        name="subject"
                                        placeholder={t("placeholderSubject")}
                                        required
                                        disabled={status === "submitting"}
                                        className="h-11 rounded-xl border-[#DAB983]/16 bg-[#1E1712]/80 text-[#F5F3EE] placeholder:text-[#7A6E62] focus-visible:ring-[#E0B84A]/30 focus-visible:ring-offset-[#1D1713]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="message"
                                        className="text-[12px] font-semibold uppercase tracking-[0.16em] text-[#C8B99A]"
                                    >
                                        {t("labelMessage")}
                                    </Label>
                                    <Textarea
                                        id="message"
                                        name="message"
                                        placeholder={t("placeholderMessage")}
                                        className="min-h-[140px] rounded-xl border-[#DAB983]/16 bg-[#1E1712]/80 text-[#F5F3EE] placeholder:text-[#7A6E62] focus-visible:ring-[#E0B84A]/30 focus-visible:ring-offset-[#1D1713]"
                                        required
                                        disabled={status === "submitting"}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full rounded-xl border border-[#E0B84A]/22 bg-[linear-gradient(135deg,#F2D896_0%,#D8A14A_100%)] py-6 text-[13px] font-semibold uppercase tracking-[0.12em] text-[#24170A] shadow-[0_20px_40px_rgba(197,144,58,0.16)] hover:brightness-105 transition-all"
                                    disabled={status === "submitting"}
                                >
                                    {status === "submitting" ? (
                                        <span className="flex items-center gap-2 text-[#24170A]">
                                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#24170A]/30 border-r-transparent" />
                                            {t("submitting")}
                                        </span>
                                    ) : (
                                        t("submit")
                                    )}
                                </Button>

                                {/* Trust badge */}
                                <div className="flex items-center justify-center gap-2 pt-1 text-xs text-[#A89880]">
                                    <ShieldCheck className="h-3.5 w-3.5 text-[#B8A882]" />
                                    {t("trustBadge")}
                                </div>
                            </form>
                        )}
                    </div>
                </ScrollAnimation>
            </Container>
        </section>
    )
}
