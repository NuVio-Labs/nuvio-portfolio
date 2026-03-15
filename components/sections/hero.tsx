"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
    ArrowRight,
    BriefcaseBusiness,
    Sparkles,
} from "lucide-react";

const easing = [0.22, 1, 0.36, 1] as const;

const reveal = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.75,
            ease: easing,
        },
    },
};

const sparkles = [
    { top: "14%", left: "51%", size: 3, opacity: 0.35, delay: 0.4 },
    { top: "18%", left: "60%", size: 2, opacity: 0.3, delay: 1.1 },
    { top: "22%", left: "74%", size: 4, opacity: 0.45, delay: 0.7 },
    { top: "29%", left: "67%", size: 3, opacity: 0.32, delay: 1.8 },
    { top: "33%", left: "82%", size: 2, opacity: 0.25, delay: 0.9 },
    { top: "41%", left: "58%", size: 3, opacity: 0.22, delay: 1.5 },
    { top: "48%", left: "77%", size: 4, opacity: 0.34, delay: 0.2 },
    { top: "54%", left: "70%", size: 2, opacity: 0.28, delay: 1.3 },
    { top: "61%", left: "84%", size: 3, opacity: 0.4, delay: 0.6 },
    { top: "73%", left: "63%", size: 4, opacity: 0.38, delay: 1.7 },
    { top: "80%", left: "75%", size: 2, opacity: 0.25, delay: 0.5 },
];

export function Hero() {
    const t = useTranslations("hero");
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
            className="relative min-h-[100svh] overflow-hidden bg-[#070606] text-[#F6F1E9]"
        >
            <div className="pointer-events-none absolute inset-0">
                <Image
                    src="/hero_bg.webp"
                    alt=""
                    fill
                    priority
                    className="object-cover object-center opacity-25 mix-blend-screen"
                />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(235,178,69,0.32),transparent_18%),radial-gradient(circle_at_74%_48%,rgba(235,178,69,0.18),transparent_20%),radial-gradient(circle_at_85%_38%,rgba(255,214,132,0.12),transparent_16%),radial-gradient(circle_at_20%_32%,rgba(255,255,255,0.06),transparent_24%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,6,6,0.98)_0%,rgba(7,6,6,0.93)_32%,rgba(7,6,6,0.58)_62%,rgba(7,6,6,0.88)_100%)]" />
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(7,6,6,0.58),rgba(7,6,6,0.28),rgba(7,6,6,0.92))]" />

                <div className="absolute right-[-8rem] top-[14%] h-[28rem] w-[28rem] rounded-full bg-[#E4AF48]/20 blur-[140px]" />
                <div className="absolute bottom-[-8rem] right-[5%] h-[26rem] w-[26rem] rounded-full bg-[#E4AF48]/16 blur-[130px]" />
                <div className="absolute left-[-12rem] top-[16%] h-[24rem] w-[24rem] rounded-full bg-white/[0.05] blur-[130px]" />
                <div className="absolute right-[8%] top-[18%] h-px w-[30rem] rotate-[12deg] bg-gradient-to-r from-transparent via-[#F7C66B]/50 to-transparent blur-sm" />
                <div className="absolute right-[16%] top-[56%] h-px w-[22rem] rotate-[-14deg] bg-gradient-to-r from-transparent via-[#F7C66B]/30 to-transparent blur-sm" />

                <div className="absolute inset-x-[-10%] bottom-[-22%] h-[56%] [transform:perspective(1200px)_rotateX(74deg)]">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(242,187,89,0.22),rgba(242,187,89,0.04)_28%,transparent_65%)]" />
                    <div className="absolute inset-0 [background-image:linear-gradient(rgba(228,175,72,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(228,175,72,0.16)_1px,transparent_1px)] [background-size:110px_110px] opacity-80" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,194,84,0.12),transparent_20%,transparent_72%,rgba(0,0,0,0.62)_100%)]" />
                </div>

                {sparkles.map((sparkle) => (
                    <motion.span
                        key={`${sparkle.top}-${sparkle.left}`}
                        className="absolute rounded-full bg-[#FFD27C]"
                        style={{
                            top: sparkle.top,
                            left: sparkle.left,
                            width: sparkle.size,
                            height: sparkle.size,
                            opacity: sparkle.opacity,
                            boxShadow: "0 0 18px rgba(255,198,102,0.55)",
                        }}
                        animate={{ opacity: [sparkle.opacity * 0.45, sparkle.opacity, sparkle.opacity * 0.45] }}
                        transition={{
                            duration: 4.8,
                            repeat: Infinity,
                            delay: sparkle.delay,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-[1480px] items-center px-6 pb-10 pt-24 sm:px-8 sm:pt-24 lg:px-12 lg:pb-12 lg:pt-24">
                <div className="grid w-full items-center gap-10 xl:grid-cols-[0.9fr_1.1fr] xl:gap-0">
                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        animate="visible"
                        className="max-w-[670px]"
                    >
                        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#A5E7B7]/55 blur-[2px]" />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#B8F4C7]" />
                            </span>
                            <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-[#D1C8BA]">
                                {t("badge")}
                            </span>
                        </div>

                        <h1 className="max-w-[10ch] text-[clamp(2.45rem,4.9vw,4.75rem)] font-semibold leading-[0.92] tracking-[-0.065em] text-[#F7F1E9]">
                            {headlineLines.map((line, index) => (
                                <span
                                    key={`${line}-${index}`}
                                    className={
                                        index === headlineLines.length - 1
                                            ? "block text-[#F0E5D1]"
                                            : "block"
                                    }
                                >
                                    {line}
                                </span>
                            ))}
                        </h1>

                        <p className="mt-6 max-w-[36rem] text-base leading-[1.7] text-[#C5B8A6] sm:text-[1.12rem]">
                            {t("subline")}
                        </p>

                        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                            <Link
                                href="#contact"
                                className="inline-flex items-center justify-center rounded-[1.05rem] border border-white/15 bg-[#F6F0E7] px-9 py-4 text-base font-medium text-[#090909] shadow-[0_18px_40px_rgba(255,255,255,0.08)] transition duration-300 hover:-translate-y-0.5 hover:bg-white"
                            >
                                {t("ctaPrimary")}
                            </Link>

                            <Link
                                href="#work"
                                className="inline-flex items-center justify-center gap-2 rounded-[1.05rem] border border-white/12 bg-black/25 px-9 py-4 text-base font-medium text-[#F3EEE7] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-[#E0B84A]/35 hover:bg-white/[0.05]"
                            >
                                {t("ctaSecondary")}
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-[#C2B6A3]">
                            {trustItems.map((item, index) => (
                                <div key={item} className="flex items-center gap-3">
                                    <span className="whitespace-nowrap">{item}</span>
                                    {index < trustItems.length - 1 ? (
                                        <span className="h-1 w-1 rounded-full bg-[#796C58]" />
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        variants={reveal}
                        initial="hidden"
                        animate="visible"
                        transition={{ delay: 0.15 }}
                        className="relative h-[500px] w-full sm:h-[540px] lg:h-[620px] xl:h-[660px]"
                    >
                        <div className="absolute inset-x-[8%] bottom-[15%] h-24 rounded-full bg-[#E0B84A]/25 blur-[90px]" />
                        <div className="absolute right-[6%] top-[18%] h-[18rem] w-[18rem] rounded-full bg-[#E0B84A]/16 blur-[120px]" />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.9, ease: easing }}
                            className="absolute left-[4%] top-[8%] w-[90%] max-w-[860px]"
                            style={{
                                transform:
                                    "perspective(2200px) rotateY(-18deg) rotateX(10deg) rotateZ(-4deg)",
                                transformStyle: "preserve-3d",
                            }}
                        >
                            <div className="absolute inset-x-[12%] bottom-[-2.4rem] h-10 rounded-full bg-[#D39C3D]/30 blur-[28px]" />

                            <div className="relative overflow-hidden rounded-[2.2rem] border border-[#F0C97D]/15 bg-[rgba(14,10,8,0.88)] p-3 shadow-[0_60px_120px_rgba(0,0,0,0.7),0_0_90px_rgba(232,177,73,0.2)]">
                                <div className="absolute inset-0 rounded-[2.2rem] border border-white/[0.05]" />

                                <div className="mb-3 flex items-center gap-3 rounded-[1.35rem] border border-white/6 bg-black/30 px-5 py-3">
                                    <div className="flex gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
                                        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                    </div>
                                    <div className="ml-2 h-7 flex-1 rounded-full border border-white/6 bg-white/[0.03]" />
                                    <div className="w-10 text-right text-[10px] uppercase tracking-[0.18em] text-[#8C7A63]">
                                        .de
                                    </div>
                                </div>

                                <div className="relative aspect-[16/10] overflow-hidden rounded-[1.7rem] border border-white/8 bg-[#090807]">
                                    <Image
                                        src="/daisymays.webp"
                                        alt=""
                                        fill
                                        priority
                                        className="object-cover object-top opacity-[0.92]"
                                    />
                                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(234,182,79,0.34),transparent_24%),linear-gradient(135deg,rgba(15,12,10,0.08),rgba(8,6,5,0.22)_45%,rgba(7,6,5,0.58)_100%)]" />
                                    <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.45)]" />
                                </div>
                            </div>

                            <div className="absolute left-[14%] right-[9%] top-[100%] h-5 rounded-b-[2rem] bg-[linear-gradient(180deg,#2E241B_0%,#16110E_100%)] shadow-[0_12px_28px_rgba(0,0,0,0.45)]" />
                            <div className="absolute left-[31%] right-[27%] top-[calc(100%+0.55rem)] h-1 rounded-full bg-[#4A3A2B]/80" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -10, 0], x: [0, 6, 0] }}
                            transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute left-[45%] top-[30%] hidden w-[24%] min-w-[160px] max-w-[220px] rounded-[1.6rem] border border-[#F0C97D]/18 bg-[rgba(12,9,7,0.84)] p-2 shadow-[0_34px_70px_rgba(0,0,0,0.6),0_0_60px_rgba(236,182,83,0.18)] backdrop-blur-2xl lg:block"
                            style={{
                                transform:
                                    "perspective(1600px) rotateY(-18deg) rotateX(9deg) rotateZ(5deg)",
                            }}
                        >
                            <div className="rounded-[1.2rem] border border-white/8 bg-[#0A0908] p-2">
                                <div className="mb-2 flex items-center gap-1.5 px-1.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-white/12" />
                                    <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
                                </div>
                                <div className="relative aspect-[5/7] overflow-hidden rounded-[0.95rem] border border-white/6">
                                    <Image
                                        src="/previews/daisy.webp"
                                        alt=""
                                        fill
                                        className="object-cover object-top opacity-95"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.34))]" />
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -8, 0], x: [0, 4, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute right-0 top-[28%] hidden w-[280px] rounded-[1.7rem] border border-[#EDC57B]/24 bg-[linear-gradient(180deg,rgba(27,21,16,0.92),rgba(18,14,11,0.88))] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.58),0_0_70px_rgba(232,177,73,0.16)] backdrop-blur-2xl lg:block"
                        >
                            <div className="absolute inset-0 rounded-[1.7rem] border border-white/[0.05]" />
                            <div className="relative flex gap-4">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#E9C06E]/40 bg-[#D9B15C]/12 text-lg font-semibold text-[#F5D48C] shadow-[inset_0_0_18px_rgba(233,192,110,0.2)]">
                                    {t("cards.performance.score").replace("+", "")}
                                </div>
                                <div>
                                    <p className="text-[0.95rem] font-semibold text-[#F7F0E8]">
                                        {t("cards.performance.title")}
                                    </p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#B99D75]">
                                        {t("cards.performance.label")}
                                    </p>
                                </div>
                            </div>

                            <div className="relative mt-5 space-y-3 text-[1.02rem] text-[#E7D8BE]">
                                {performanceFeatures.map((feature) => (
                                    <div key={feature} className="flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#F0C46F]" />
                                        <span>{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0], x: [0, -5, 0] }}
                            transition={{ duration: 9.4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-[15%] right-[2%] hidden w-[320px] rounded-[1.7rem] border border-[#EDC57B]/24 bg-[linear-gradient(180deg,rgba(28,22,17,0.9),rgba(18,14,11,0.86))] p-6 shadow-[0_30px_70px_rgba(0,0,0,0.56),0_0_70px_rgba(232,177,73,0.16)] backdrop-blur-2xl lg:block"
                        >
                            <div className="absolute inset-0 rounded-[1.7rem] border border-white/[0.05]" />
                            <div className="relative flex items-center gap-3 text-[#F7F0E8]">
                                <ShieldIcon />
                                <p className="text-[0.95rem] font-semibold">{t("cards.optimized.title")}:</p>
                            </div>

                            <div className="relative mt-5 space-y-3 text-[1.02rem] text-[#E7D8BE]">
                                {optimizedItems.map((item) => (
                                    <div key={item} className="flex items-center gap-3">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#F0C46F]" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, -8, 0] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-[2%] right-[8%] hidden w-[360px] rounded-[1.7rem] border border-[#EDC57B]/26 bg-[linear-gradient(180deg,rgba(30,24,18,0.92),rgba(18,14,11,0.9))] px-6 py-5 shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_70px_rgba(232,177,73,0.18)] backdrop-blur-2xl lg:block"
                        >
                            <div className="absolute inset-0 rounded-[1.7rem] border border-white/[0.05]" />
                            <div className="relative flex items-start gap-4">
                                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-lg border border-[#E9C06E]/30 bg-[#D9B15C]/12 text-[#F2C76F]">
                                    <BriefcaseBusiness className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[0.95rem] font-semibold text-[#F7F0E8]">
                                        {t("cards.slots.title")}:
                                    </p>
                                    <p className="mt-1 text-3xl font-semibold tracking-[-0.04em] text-[#E8BC62]">
                                        {t("cards.slots.status")}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40">
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(7,6,6,0.38),#070606_72%)]" />
                <div className="absolute left-1/2 top-8 h-24 w-[56%] -translate-x-1/2 rounded-full bg-[#E0B84A]/16 blur-[75px]" />
                <div className="absolute inset-x-[16%] bottom-0 h-px bg-gradient-to-r from-transparent via-[#E0B84A]/28 to-transparent" />
            </div>
        </section>
    );
}

function ShieldIcon() {
    return (
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E9C06E]/28 bg-[#D9B15C]/12 text-[#F2C76F]">
            <Sparkles className="h-4 w-4" />
        </div>
    );
}
