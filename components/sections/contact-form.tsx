"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"

type Status = "idle" | "submitting" | "success" | "error"

const typeOptionKeys = ["launch", "redesign", "landing", "ui", "other"] as const

export function ContactForm() {
    const t = useTranslations("contactPage.form")
    const [status, setStatus] = useState<Status>("idle")

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const form = e.currentTarget
        const data = new FormData(form)

        /* Honeypot check */
        if (data.get("_honey")) return

        setStatus("submitting")
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify({
                    name:    data.get("name"),
                    email:   data.get("email"),
                    company: data.get("company"),
                    type:    data.get("type"),
                    message: data.get("message"),
                }),
                headers: { "Content-Type": "application/json" },
            })
            if (res.ok) {
                setStatus("success")
                form.reset()
            } else {
                setStatus("error")
            }
        } catch {
            setStatus("error")
        }
    }

    if (status === "success") {
        return (
            <div className="text-center py-16">
                <div className="w-14 h-14 rounded-full bg-accent-soft border border-accent/30 flex items-center justify-center mx-auto mb-6">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M5 13l4 4L19 7" stroke="var(--nv-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
                <h2 className="font-heading font-semibold text-text-primary text-2xl mb-3">
                    {t("successTitle")}
                </h2>
                <p className="text-text-muted mb-8">{t("successText")}</p>
                <button
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center px-6 py-3 rounded-full border border-border-soft text-text-secondary text-sm font-medium hover:border-accent/50 hover:text-accent transition-all"
                >
                    {t("sendAnother")}
                </button>
            </div>
        )
    }

    return (
        <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* Honeypot */}
            <input type="text" name="_honey" className="sr-only" tabIndex={-1} aria-hidden="true" />

            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-text-secondary">
                        {t("labelName")}
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder={t("placeholderName")}
                        className="w-full rounded-xl border border-border-soft bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-text-secondary">
                        {t("labelEmail")}
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder={t("placeholderEmail")}
                        className="w-full rounded-xl border border-border-soft bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
                    />
                </div>
            </div>

            {/* Company + Type */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                    <label htmlFor="company" className="block text-sm font-medium text-text-secondary">
                        {t("labelCompany")}
                    </label>
                    <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder={t("placeholderCompany")}
                        className="w-full rounded-xl border border-border-soft bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
                    />
                </div>
                <div className="space-y-2">
                    <label htmlFor="type" className="block text-sm font-medium text-text-secondary">
                        {t("labelType")}
                    </label>
                    <select
                        id="type"
                        name="type"
                        className="w-full rounded-xl border border-border-soft bg-surface px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors"
                    >
                        {typeOptionKeys.map((key) => (
                            <option key={key} value={key}>
                                {t(`typeOptions.${key}`)}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-text-secondary">
                    {t("labelMessage")}
                </label>
                <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder={t("placeholderMessage")}
                    className="w-full rounded-xl border border-border-soft bg-surface px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/30 transition-colors resize-none"
                />
            </div>

            {/* Privacy */}
            <p className="text-xs text-text-muted leading-relaxed">
                {t("privacy")}
            </p>

            {/* Submit */}
            <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-accent text-surface text-sm font-semibold hover:bg-[var(--nv-accent-hover)] transition-all duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {status === "submitting" ? t("submitting") : t("submit")}
            </button>

            {status === "error" && (
                <p className="text-sm text-destructive mt-2" role="alert">
                    Etwas ist schiefgelaufen. Bitte versuche es erneut.
                </p>
            )}
        </form>
    )
}
