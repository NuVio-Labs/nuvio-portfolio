import { getTranslations } from "next-intl/server"
import { ArrowRight, Building2 } from "lucide-react"
import { Link } from "@/i18n/navigation"

export async function Hero() {
    const t = await getTranslations("webdesignKleve.hero")

    return (
        <section className="relative overflow-hidden bg-background pb-16 pt-28 text-text-primary md:pb-20 md:pt-32">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-1/2 top-[6%] h-[26rem] w-[38rem] -translate-x-1/2 rounded-full bg-accent/8 blur-[150px]" />
            </div>

            <div className="nv-container relative z-10">
                <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                    <div>
                        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-text-muted">
                            <Building2 className="h-3.5 w-3.5 text-accent" />
                            {t("eyebrow")}
                        </div>

                        <h1
                            className="max-w-[16ch] font-heading font-semibold leading-[1.06] tracking-[-0.03em] text-text-primary"
                            style={{ fontSize: "clamp(2.15rem, 4.6vw, 3.5rem)" }}
                        >
                            {t("headline")}
                        </h1>

                        <p className="mt-6 max-w-[38rem] text-base leading-[1.7] text-text-muted sm:text-lg">
                            {t("subline")}
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/contact"
                                data-track="primary_cta_click"
                                data-track-location="webdesign-kleve-hero"
                                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-base font-semibold text-surface shadow-sm transition duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98]"
                            >
                                {t("ctaPrimary")}
                            </Link>
                            <Link
                                href="#work"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-soft bg-surface px-8 py-4 text-base font-medium text-text-primary transition duration-200 hover:border-accent/40 hover:text-accent"
                            >
                                {t("ctaSecondary")}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="relative hidden lg:block">
                        <div className="rounded-[2rem] border border-border-soft bg-surface p-8">
                            <div className="h-2 w-16 rounded-full bg-accent/60" />
                            <div className="mt-6 h-3 w-4/5 rounded-full bg-surface-soft" />
                            <div className="mt-3 h-3 w-3/5 rounded-full bg-surface-soft" />
                            <div className="mt-8 grid grid-cols-3 gap-3">
                                <div className="h-16 rounded-xl bg-surface-soft" />
                                <div className="h-16 rounded-xl bg-surface-soft" />
                                <div className="h-16 rounded-xl bg-surface-soft" />
                            </div>
                            <div className="mt-6 h-10 w-2/5 rounded-full bg-accent-soft" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
