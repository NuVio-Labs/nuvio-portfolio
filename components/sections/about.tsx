import { getTranslations } from "next-intl/server";
import { Container } from "@/components/layout/container";

export async function About() {
    const t = await getTranslations("about");
    const headline = t("headline");
    const headlineParts = headline.trim().split(" ");
    const headlineIntro = headlineParts.slice(0, -1).join(" ");
    const headlineAccent = headlineParts.at(-1) ?? headline;

    return (
        <section
            id="about"
            className="relative -mt-12 overflow-hidden bg-[linear-gradient(180deg,#0B0908_0%,#120F0C_48%,#0B0908_100%)] py-28 md:-mt-16 md:py-36"
        >
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-x-[-6%] top-0 h-48 bg-[linear-gradient(to_bottom,rgba(11,9,8,1),rgba(11,9,8,0.78)_34%,rgba(11,9,8,0.24)_72%,rgba(11,9,8,0)_100%)] blur-[6px]" />
                <div className="absolute inset-x-[-6%] bottom-0 h-52 bg-[linear-gradient(to_bottom,rgba(11,9,8,0),rgba(17,13,10,0.28)_30%,rgba(17,13,10,0.72)_68%,rgba(22,17,14,1)_100%)] blur-[8px]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(224,184,74,0.11),transparent_22%),radial-gradient(circle_at_78%_18%,rgba(224,184,74,0.08),transparent_24%),radial-gradient(circle_at_62%_82%,rgba(255,255,255,0.04),transparent_22%)]" />
                <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(122,93,47,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(122,93,47,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />
            </div>

            <Container className="relative z-10 px-6">
                <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-5 lg:sticky lg:top-40 lg:self-start">
                        <article className="relative overflow-hidden rounded-[2rem] border border-[#CFA565]/22 bg-[linear-gradient(180deg,rgba(24,19,15,0.94),rgba(15,12,10,0.98))] p-8 shadow-[0_30px_90px_rgba(0,0,0,0.24),0_0_80px_rgba(224,184,74,0.08)] sm:p-9">
                            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#E0B84A]/38 to-transparent" />
                            <div className="absolute left-[-2rem] top-[18%] h-28 w-28 rounded-full bg-[#E0B84A]/10 blur-[50px]" />
                            <div className="absolute right-[-2rem] bottom-[10%] h-28 w-28 rounded-full bg-[#E0B84A]/8 blur-[46px]" />

                            <div className="relative flex flex-col items-start text-left">
                                <div className="mb-6">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-[#DAB983]/16 bg-white/[0.04] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#BFAF96]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#C8A35A]" />
                                        {t("label")}
                                    </span>
                                </div>

                                <h2 className="mb-8 max-w-[10ch] text-[clamp(3rem,4.4vw,4.4rem)] font-semibold leading-[0.96] tracking-[-0.05em] text-[#F5F3EE]">
                                    {headlineIntro ? <span className="block">{headlineIntro}</span> : null}
                                    <span className="block bg-gradient-to-r from-[#9A733A] via-[#C99747] to-[#E1BD79] bg-clip-text text-transparent">
                                        {headlineAccent}
                                    </span>
                                </h2>

                                <div className="max-w-md space-y-6 text-base leading-8 text-[#C5B8A6]">
                                    <p>{t("bio1")}</p>
                                    <p>{t("bio2")}</p>
                                </div>

                                <div className="mt-12 w-full border-t border-white/8 pt-8">
                                    <p className="text-sm italic text-[#A99C88]">{t("signature")}</p>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className="flex flex-col pt-4 lg:col-span-6 lg:col-start-7 lg:pt-0">
                        <div className="mb-8 lg:mb-12">
                            <span className="inline-flex items-center gap-2 rounded-full border border-[#DAB983]/18 bg-white/[0.04] px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-[#BFAF96]">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#C8A35A]" />
                                {t("principlesTitle")}
                            </span>
                        </div>

                        <div className="grid gap-4">
                            {[
                                { number: "01", key: "clarity" },
                                { number: "02", key: "performance" },
                                { number: "03", key: "sustainability" },
                            ].map((value) => (
                                <article
                                    key={value.key}
                                    className="relative overflow-hidden rounded-[1.75rem] border border-[#CFA565]/18 bg-[linear-gradient(180deg,rgba(27,21,16,0.92),rgba(17,13,10,0.96))] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.22)] sm:p-7"
                                >
                                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#E0B84A]/25 to-transparent" />
                                    <div className="relative flex flex-col gap-5 md:flex-row md:gap-8">
                                        <div className="w-12 shrink-0">
                                            <span className="text-xs font-medium tracking-[0.2em] text-[#756854]">
                                                {value.number}
                                            </span>
                                        </div>
                                        <div className="flex flex-col">
                                            <h4 className="mb-2 text-xl font-medium tracking-[-0.02em] text-[#F5F3EE]">
                                                {t(`values.${value.key}.title`)}
                                            </h4>
                                            <p className="max-w-[38ch] text-base leading-8 text-[#B9B2A3]">
                                                {t(`values.${value.key}.text`)}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}

                            <div className="mt-4 flex items-center gap-3 font-mono text-xs text-[#8F7B60]">
                                <div className="h-px max-w-[40px] flex-1 bg-white/10" />
                                <p>{t("techStack")}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}
