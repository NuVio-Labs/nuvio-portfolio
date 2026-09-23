import { getTranslations } from "next-intl/server"
import { ArrowRight, MapPin } from "lucide-react"
import { Link } from "@/i18n/navigation"

export async function Hero() {
    const t = await getTranslations("webdesignKranenburg.hero")

    return (
        <section className="relative overflow-hidden bg-background pb-16 pt-28 text-text-primary md:pb-20 md:pt-32">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-10rem] top-[8%] h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-[140px]" />
                <div className="absolute left-[-10rem] bottom-[-6rem] h-[22rem] w-[22rem] rounded-full bg-accent/8 blur-[130px]" />
            </div>

            <div className="nv-container relative z-10">
                <div className="mx-auto max-w-[760px] text-center">
                    <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-text-muted">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {t("eyebrow")}
                    </div>

                    <h1
                        className="font-heading font-semibold leading-[1.08] tracking-[-0.03em] text-text-primary"
                        style={{ fontSize: "clamp(2.15rem, 5vw, 3.6rem)" }}
                    >
                        {t("headline")}
                    </h1>

                    <p className="mx-auto mt-6 max-w-[42rem] text-base leading-[1.7] text-text-muted sm:text-lg">
                        {t("subline")}
                    </p>

                    <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/contact"
                            data-track="primary_cta_click"
                            data-track-location="webdesign-kranenburg-hero"
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
            </div>
        </section>
    )
}
