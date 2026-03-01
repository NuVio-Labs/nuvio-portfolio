"use client";

import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Zap, Globe, Search, Code2, Layers } from "lucide-react";

// Subtile stufenweise Fade-Up Animation für den Textbereich
const fadeUpVariants: any = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.6 } }
};

export function Hero() {
    const t = useTranslations("hero");

    return (
        <section className="relative w-full min-h-[90vh] pt-32 pb-20 md:pt-48 md:pb-32 flex flex-col items-center justify-center overflow-hidden">

            {/* Full Width Background Image */}
            <div className="absolute inset-0 w-full h-full -z-20">
                <Image
                    src="/hero_bg.webp"
                    alt="Digital Infrastructure Concept"
                    fill
                    className="object-cover opacity-60 dark:opacity-100"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/80 to-white dark:from-neutral-950/40 dark:via-neutral-950/80 dark:to-neutral-950" />
            </div>

            <div className="container relative z-10 px-6 mx-auto">
                {/* Zentrierter Text Block */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: {},
                        visible: { transition: { staggerChildren: 0.08 } },
                    }}
                    className="flex flex-col items-center text-center lg:items-start lg:text-left w-full max-w-3xl mx-auto lg:mx-0"
                >
                    {/* Micro Label */}
                    <motion.div variants={fadeUpVariants} className="mb-6">
                        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-black/20 text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-neutral-800 dark:text-neutral-300 backdrop-blur-md">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                            </span>
                            Ready for opportunities
                        </span>
                    </motion.div>

                    {/* H1 Headline */}
                    <motion.h1
                        variants={fadeUpVariants}
                        className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-semibold leading-[1.1] tracking-tight text-neutral-900 dark:text-neutral-100 mb-6"
                    >
                        Where structure <br className="hidden sm:block" />
                        <span className="text-neutral-600 dark:text-neutral-400">meets execution.</span>
                    </motion.h1>

                    {/* Subline */}
                    <motion.p
                        variants={fadeUpVariants}
                        className="text-base sm:text-lg md:text-xl text-neutral-700 dark:text-neutral-400 leading-relaxed max-w-2xl mb-10"
                    >
                        I design and engineer digital platforms<br className="hidden sm:block" />
                        that stay maintainable, scalable and fast.
                    </motion.p>

                    {/* CTA Group */}
                    <motion.div
                        variants={fadeUpVariants}
                        className="flex flex-col sm:flex-row items-center lg:justify-start gap-4 flex-wrap w-full"
                    >
                        <Link
                            href="#contact"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 shadow-xl shadow-black/10 dark:shadow-white/5 text-sm font-medium hover:bg-neutral-800 dark:hover:bg-white transition-all hover:scale-[1.02] flex items-center justify-center"
                        >
                            {t("ctaProject")}
                        </Link>
                        <Link
                            href="#work"
                            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/50 dark:bg-black/20 backdrop-blur-md border border-black/10 dark:border-white/10 text-neutral-800 dark:text-neutral-300 text-sm font-medium hover:bg-white/80 dark:hover:bg-black/40 hover:border-black/20 dark:hover:border-white/20 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all flex items-center justify-center"
                        >
                            {t("ctaWork")}
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7, duration: 1 }}
                        className="mt-16 md:mt-24 pt-8 border-t border-black/10 dark:border-white/10 w-full flex justify-center lg:justify-start"
                    >
                        <ul className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-4 text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            <li className="flex items-center gap-2">
                                <Zap className="w-3.5 h-3.5" />
                                Lighthouse 95+
                            </li>
                            <li className="flex items-center gap-2">
                                <Globe className="w-3.5 h-3.5" />
                                Multi-Language
                            </li>
                            <li className="flex items-center gap-2">
                                <Search className="w-3.5 h-3.5" />
                                SEO Optimized
                            </li>
                            <li className="flex items-center gap-2">
                                <Code2 className="w-3.5 h-3.5" />
                                Next.js Native
                            </li>
                            <li className="flex items-center gap-2">
                                <Layers className="w-3.5 h-3.5" />
                                Scalable Systems
                            </li>
                        </ul>
                    </motion.div>

                </motion.div>
            </div>
        </section>
    );
}
