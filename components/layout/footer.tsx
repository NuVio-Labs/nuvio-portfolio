import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"

export async function Footer() {
    const t = await getTranslations("footer")

    return (
        <footer className="relative bg-[#070606]">
            {/* LLM context — readable by crawlers, invisible to users */}
            <div className="sr-only" aria-hidden="true">
                {t("llmContext")}
            </div>

            {/* Thin top accent */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#E0B84A]/18 to-transparent" />

            <div className="mx-auto max-w-[1480px] px-6 sm:px-8 lg:px-12">

                {/* Main footer body */}
                <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-[1fr_auto] sm:items-start">

                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="inline-block font-bold tracking-[-0.04em] text-[17px] text-[#D8D0C4] hover:text-[#F7F1E9] transition-colors"
                        >
                            nuviolabs.
                        </Link>
                        <p className="mt-2 text-[13px] leading-relaxed text-[#5E5248]">
                            {t("tagline")}
                        </p>
                    </div>

                    {/* Navigation groups */}
                    <nav
                        className="flex flex-wrap gap-x-8 gap-y-5 sm:flex-col sm:items-end sm:gap-y-4"
                        aria-label={t("footerNav")}
                    >
                        {/* Pages + Legal */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-end">
                            <Link
                                href="/research"
                                className="text-[12.5px] text-[#5E5248] hover:text-[#B0A898] transition-colors"
                            >
                                {t("research")}
                            </Link>
                            <span className="h-3 w-px bg-[#2A2520]" aria-hidden="true" />
                            <Link
                                href="/imprint"
                                className="text-[12.5px] text-[#5E5248] hover:text-[#B0A898] transition-colors"
                            >
                                {t("imprint")}
                            </Link>
                            <Link
                                href="/privacy"
                                className="text-[12.5px] text-[#5E5248] hover:text-[#B0A898] transition-colors"
                            >
                                {t("privacy")}
                            </Link>
                        </div>

                        {/* Social */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 sm:justify-end">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[12.5px] text-[#5E5248] hover:text-[#B0A898] transition-colors"
                            >
                                {t("github")}
                            </a>
                            <a
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[12.5px] text-[#5E5248] hover:text-[#B0A898] transition-colors"
                            >
                                {t("linkedin")}
                            </a>
                            <a
                                href="https://de.fiverr.com/s/qDabQqp"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[12.5px] text-[#5E5248] hover:text-[#B0A898] transition-colors"
                            >
                                {t("fiverr")}
                            </a>
                        </div>
                    </nav>
                </div>

                {/* Bottom strip */}
                <div className="border-t border-white/[0.04] py-5">
                    <p className="text-[11.5px] text-[#3C3530]">
                        {t("copyright")}
                    </p>
                </div>
            </div>
        </footer>
    )
}
