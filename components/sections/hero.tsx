import type { CSSProperties } from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, BriefcaseBusiness, Sparkles } from "lucide-react";
import { Link } from "@/i18n/navigation";

const sparkles = [
    { top: "14%", left: "51%", size: 3, opacity: 0.35, delay: "0.4s" },
    { top: "18%", left: "60%", size: 2, opacity: 0.3, delay: "1.1s" },
    { top: "22%", left: "74%", size: 4, opacity: 0.45, delay: "0.7s" },
    { top: "29%", left: "67%", size: 3, opacity: 0.32, delay: "1.8s" },
    { top: "33%", left: "82%", size: 2, opacity: 0.25, delay: "0.9s" },
    { top: "41%", left: "58%", size: 3, opacity: 0.22, delay: "1.5s" },
    { top: "48%", left: "77%", size: 4, opacity: 0.34, delay: "0.2s" },
    { top: "54%", left: "70%", size: 2, opacity: 0.28, delay: "1.3s" },
    { top: "61%", left: "84%", size: 3, opacity: 0.4, delay: "0.6s" },
    { top: "73%", left: "63%", size: 4, opacity: 0.38, delay: "1.7s" },
    { top: "80%", left: "75%", size: 2, opacity: 0.25, delay: "0.5s" },
] as const;

export async function Hero() {
    const t = await getTranslations("hero");
    const headlineLines = t.raw("headlineLines") as string[];
    const performanceFeatures = t.raw("cards.performance.features") as string[];
    const optimizedItems = t.raw("cards.optimized.items") as string[];
    const trustItems = [
        t("trustRow.lighthouse"),
        t("trustRow.mobile"),
        t("trustRow.seo"),
        t("trustRow.multilang"),
        t("trustRow.nextjs"),
    ];

    return (
        <section
            id="home"
            className="relative min-h-[100svh] overflow-hidden bg-background text-text-primary"
        >
            {/* Subtle accent glow */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute right-[-8rem] top-[14%] h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-[140px]" />
                <div className="absolute bottom-[-8rem] right-[5%] h-[26rem] w-[26rem] rounded-full bg-accent/8 blur-[130px]" />
                <div className="absolute left-[-12rem] top-[16%] h-[24rem] w-[24rem] rounded-full bg-accent/5 blur-[130px]" />

                {sparkles.map((sparkle) => (
                    <span
                        key={`${sparkle.top}-${sparkle.left}`}
                        className="hero-sparkle absolute rounded-full bg-accent"
                        style={
                            {
                                top: sparkle.top,
                                left: sparkle.left,
                                width: sparkle.size,
                                height: sparkle.size,
                                "--sparkle-opacity": sparkle.opacity,
                                "--sparkle-delay": sparkle.delay,
                            } as CSSProperties
                        }
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1480px] items-center px-6 pb-10 pt-24 sm:px-8 sm:pt-24 lg:px-12 lg:pb-12 lg:pt-24">
                <div className="grid w-full items-center gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:gap-0">
                    <div
                        className="hero-reveal max-w-[670px]"
                        style={{ animationDelay: "0.05s" }}
                    >
                        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-border-soft bg-surface px-5 py-3 shadow-sm">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400/55 blur-[2px]" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                            </span>
                            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-text-muted">
                                {t("badge")}
                            </span>
                        </div>

                        <h1
                            className="max-w-[10ch] font-heading font-semibold leading-[0.92] tracking-[-0.05em] text-text-primary"
                            style={{ fontSize: "clamp(2.45rem, 4.9vw, 4.75rem)" }}
                        >
                            {headlineLines.map((line, index) => (
                                <span
                                    key={`${line}-${index}`}
                                    className="block"
                                >
                                    {line}
                                </span>
                            ))}
                        </h1>

                        <p className="mt-6 max-w-[36rem] text-base leading-[1.7] text-text-muted sm:text-[1.12rem]">
                            {t("subline")}
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center rounded-full bg-accent px-9 py-4 text-base font-semibold text-surface shadow-sm transition duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98]"
                            >
                                {t("ctaPrimary")}
                            </Link>

                            <Link
                                href="#work"
                                className="inline-flex items-center justify-center gap-2 rounded-full border border-border-soft bg-surface px-9 py-4 text-base font-medium text-text-primary transition duration-200 hover:border-accent/40 hover:text-accent"
                            >
                                {t("ctaSecondary")}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-text-muted">
                            {trustItems.map((item, index) => (
                                <div key={item} className="flex items-center gap-3">
                                    <span className="whitespace-nowrap">{item}</span>
                                    {index < trustItems.length - 1 ? (
                                        <span className="h-1 w-1 rounded-full bg-text-muted/40" />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="hero-reveal relative h-[500px] w-full sm:h-[540px] lg:h-[620px] xl:h-[660px]"
                        style={{ animationDelay: "0.15s" }}
                    >
                        <div className="absolute inset-x-[8%] bottom-[15%] h-24 rounded-full bg-accent/15 blur-[90px]" />
                        <div className="absolute right-[6%] top-[18%] h-[18rem] w-[18rem] rounded-full bg-accent/10 blur-[120px]" />

                        {/* Main browser mockup */}
                        <div
                            className="hero-reveal absolute left-[4%] top-[8%] w-[90%] max-w-[860px]"
                            style={
                                {
                                    animationDelay: "0.25s",
                                    transform:
                                        "perspective(2200px) rotateY(-18deg) rotateX(10deg) rotateZ(-4deg)",
                                    transformStyle: "preserve-3d",
                                } as CSSProperties
                            }
                        >
                            <div className="absolute inset-x-[12%] bottom-[-2.4rem] h-10 rounded-full bg-accent/20 blur-[28px]" />

                            <div className="relative overflow-hidden rounded-[2.2rem] border border-border-soft bg-surface p-3 shadow-xl">
                                <div className="mb-3 flex items-center gap-3 rounded-[1.35rem] border border-border-soft bg-surface-soft px-5 py-3">
                                    <div className="flex gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
                                    </div>
                                    <div className="ml-2 h-7 flex-1 rounded-full border border-border-soft bg-background" />
                                    <div className="w-10 text-right text-[10px] uppercase tracking-[0.18em] text-text-muted">
                                        .de
                                    </div>
                                </div>

                                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.7rem] border border-border-soft bg-surface-soft">
                                    <Image
                                        src="/daisymays.webp"
                                        alt=""
                                        fill
                                        priority
                                        sizes="(min-width: 1280px) 48vw, (min-width: 1024px) 55vw, 92vw"
                                        className="object-cover object-top opacity-[0.92]"
                                    />
                                </div>
                            </div>

                            <div className="absolute left-[14%] right-[9%] top-[100%] h-5 rounded-b-[2rem] bg-surface-soft shadow-md" />
                            <div className="absolute left-[31%] right-[27%] top-[calc(100%+0.55rem)] h-1 rounded-full bg-border-soft" />
                        </div>

                        {/* Mobile mockup */}
                        <div
                            className="hero-float absolute left-[45%] top-[30%] hidden w-[24%] min-w-[160px] max-w-[220px] rounded-[1.6rem] border border-border-soft bg-surface p-2 shadow-lg backdrop-blur-2xl lg:block"
                            style={
                                {
                                    transform:
                                        "perspective(1600px) rotateY(-18deg) rotateX(9deg) rotateZ(5deg)",
                                    "--float-duration": "8.8s",
                                    "--float-x": "6px",
                                    "--float-y": "-10px",
                                } as CSSProperties
                            }
                        >
                            <div className="rounded-[1.2rem] border border-border-soft bg-surface-soft p-2">
                                <div className="mb-2 flex items-center gap-1.5 px-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-border-soft" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-border-soft" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-border-soft" />
                                </div>
                                <div className="relative aspect-[5/7] overflow-hidden rounded-[0.95rem] border border-border-soft">
                                    <Image
                                        src="/previews/daisy.webp"
                                        alt=""
                                        fill
                                        priority
                                        sizes="220px"
                                        className="object-cover object-top opacity-95"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Performance card */}
                        <div
                            className="hero-float absolute right-[-3%] top-[8%] hidden w-[260px] rounded-[1.7rem] border border-border-soft bg-surface p-5 shadow-lg backdrop-blur-2xl lg:block"
                            style={
                                {
                                    "--float-duration": "8s",
                                    "--float-x": "4px",
                                    "--float-y": "-8px",
                                } as CSSProperties
                            }
                        >
                            <div className="relative flex gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-lg font-semibold text-accent">
                                    {t("cards.performance.score").replace("+", "")}
                                </div>
                                <div>
                                    <p className="text-[0.95rem] font-semibold text-text-primary">
                                        {t("cards.performance.title")}
                                    </p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-text-muted">
                                        {t("cards.performance.label")}
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-5 space-y-3 text-[1.02rem] text-text-secondary">
                                {performanceFeatures.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Optimized card */}
                        <div
                            className="hero-float absolute right-[-3%] top-[52%] hidden w-[260px] rounded-[1.7rem] border border-border-soft bg-surface p-5 shadow-lg backdrop-blur-2xl lg:block"
                            style={
                                {
                                    "--float-duration": "9.4s",
                                    "--float-x": "-5px",
                                    "--float-y": "10px",
                                } as CSSProperties
                            }
                        >
                            <div className="relative flex items-center gap-3 text-text-primary">
                                <ShieldIcon />
                                <p className="text-[0.95rem] font-semibold">{t("cards.optimized.title")}:</p>
                            </div>

                            <div className="relative mt-5 space-y-3 text-[1.02rem] text-text-secondary">
                                {optimizedItems.map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Slots card */}
                        <div
                            className="hero-float absolute bottom-[2%] right-[8%] hidden w-[320px] rounded-[1.7rem] border border-border-soft bg-surface px-6 py-5 shadow-lg backdrop-blur-2xl lg:block"
                            style={
                                {
                                    "--float-duration": "10s",
                                    "--float-y": "-8px",
                                } as CSSProperties
                            }
                        >
                            <div className="relative flex items-start gap-4">
                                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/30 bg-accent-soft text-accent">
                                    <BriefcaseBusiness className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[0.95rem] font-semibold text-text-primary">
                                        {t("cards.slots.title")}:
                                    </p>
                                    <p className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-accent">
                                        {t("cards.slots.status")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40">
                <div className="absolute inset-x-[16%] bottom-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
            </div>
        </section>
    );
}

function ShieldIcon() {
    return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-accent/30 bg-accent-soft text-accent">
            <Sparkles className="h-4 w-4" />
        </div>
    );
}
