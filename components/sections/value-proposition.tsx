import { getTranslations } from "next-intl/server";
import { ArrowRight, BadgeCheck, Layers, Scale, Terminal } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SectionWrapper } from "@/components/ui/section-wrapper";

const principleIcons = {
    architecture: Layers,
    execution: Terminal,
    scalability: Scale,
} as const;

export async function ValueProposition() {
    const t = await getTranslations("valueProposition");

    const principles = [
        { id: "architecture", number: "01", icon: principleIcons.architecture },
        { id: "execution", number: "02", icon: principleIcons.execution },
        { id: "scalability", number: "03", icon: principleIcons.scalability },
    ] as const;

    const proofPoints = t.raw("proofPoints") as string[];

    return (
        <SectionWrapper id="principles" light>
            <div className="nv-container">
                <div className="mx-auto max-w-[1120px]">
                    <div className="grid gap-5 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-stretch">
                        {/* Headline card */}
                        <article className="relative h-full min-h-[420px] overflow-hidden rounded-[2rem] border border-border-soft bg-background p-8 sm:p-9">
                            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                            <div className="absolute left-[-2rem] top-[18%] h-28 w-28 rounded-full bg-accent/8 blur-[50px]" />

                            <div className="relative flex h-full flex-col">
                                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-border-soft bg-surface px-4 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
                                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                    {t("label")}
                                </div>

                                <h2
                                    className="mt-8 max-w-[10ch] font-heading font-semibold leading-[0.95] tracking-[-0.05em] text-text-primary"
                                    style={{ fontSize: "clamp(3rem, 4.6vw, 4.6rem)" }}
                                >
                                    <span className="block">{t("headlinePart1")}</span>
                                    <span className="block text-accent">
                                        {t("headlinePart2")}
                                    </span>
                                </h2>
                            </div>
                        </article>

                        {/* Principle cards */}
                        <div className="grid gap-4 lg:grid-cols-[1fr_1fr] lg:grid-rows-[270px_270px]">
                            {principles.map((principle, index) => {
                                const Icon = principle.icon;
                                const cardClass =
                                    index === 0
                                        ? "lg:row-span-2 lg:col-start-1 min-h-[560px]"
                                        : index === 1
                                          ? "lg:col-start-2 lg:row-start-1 min-h-[270px]"
                                          : "lg:col-start-2 lg:row-start-2 min-h-[270px]";

                                return (
                                    <article
                                        key={principle.id}
                                        className={`relative overflow-hidden rounded-[2rem] border border-border-soft bg-surface p-7 sm:p-8 ${cardClass}`}
                                    >
                                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
                                        <div className="absolute right-[-2rem] top-[-2rem] h-24 w-24 rounded-full bg-accent/8 blur-[44px]" />

                                        <div className="relative flex h-full flex-col">
                                            <div className="flex items-start justify-between">
                                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-accent/20 bg-accent-soft text-accent shadow-sm">
                                                    <Icon className="h-5 w-5" />
                                                </div>

                                                <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-text-muted">
                                                    {principle.number}
                                                </span>
                                            </div>

                                            <div className="mt-10 flex-1">
                                                <h3 className="max-w-[11ch] text-2xl font-semibold tracking-[-0.03em] text-text-primary sm:text-[1.8rem]">
                                                    {t(`principles.${principle.id}.title`)}
                                                </h3>

                                                <p className="mt-4 max-w-[33ch] text-[15px] leading-7 text-text-muted">
                                                    {t(`principles.${principle.id}.description`)}
                                                </p>
                                            </div>

                                            <div className="mt-8 inline-flex w-fit items-center rounded-full border border-accent/25 bg-accent-soft px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">
                                                {t(`principles.${principle.id}.highlight`)}
                                            </div>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </div>

                    {/* CTA bar */}
                    <div className="relative mt-6 overflow-hidden rounded-[2rem] border border-border-soft bg-background p-7 sm:p-8 lg:p-8">
                        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

                        <div className="relative grid gap-8 lg:grid-cols-[1.05fr_auto] lg:items-end">
                            <div className="max-w-3xl">
                                <span className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-3 py-2 text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
                                    <BadgeCheck className="h-3.5 w-3.5 text-accent" />
                                    {t("ctaEyebrow")}
                                </span>

                                <h3
                                    className="mt-5 max-w-[15ch] font-heading font-semibold leading-[1.02] tracking-[-0.04em] text-text-primary"
                                    style={{ fontSize: "clamp(2rem, 2.9vw, 3.1rem)" }}
                                >
                                    {t("ctaTitle")}
                                </h3>

                                <p className="mt-4 max-w-[38rem] text-base leading-8 text-text-muted">
                                    {t("ctaText")}
                                </p>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row lg:flex-row">
                                <Link
                                    href="/contact"
                                    className="inline-flex min-w-[160px] items-center justify-center rounded-full bg-accent px-6 py-4 text-sm font-semibold text-surface shadow-sm transition duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98]"
                                >
                                    {t("ctaPrimary")}
                                </Link>

                                <Link
                                    href="#work"
                                    className="inline-flex min-w-[170px] items-center justify-center gap-2 rounded-full border border-border-soft bg-surface px-6 py-4 text-sm font-semibold text-text-primary transition duration-200 hover:border-accent/40 hover:text-accent"
                                >
                                    {t("ctaSecondary")}
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>

                        <div className="relative mt-8 grid gap-3 sm:grid-cols-3">
                            {proofPoints.map((point) => (
                                <div
                                    key={point}
                                    className="flex items-center gap-3 rounded-[1.25rem] border border-border-soft bg-surface px-4 py-4 text-sm text-text-secondary"
                                >
                                    <BadgeCheck className="h-4 w-4 shrink-0 text-accent" />
                                    <span>{point}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    );
}
