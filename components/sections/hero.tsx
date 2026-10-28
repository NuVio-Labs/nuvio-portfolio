import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { projects } from "@/data/projects";

/**
 * Projekte in der Hero-Leiste, in Anzeigereihenfolge. Bilder kommen aus
 * data/projects.ts (previewImage), Titel aus messages/*.json -> work.projects.
 */
const HERO_PROJECT_IDS = [
    "jan-behr",
    "daisymays-salon",
    "physio-athlete",
    "wt-erdbewegungen",
] as const;

const heroProjects = HERO_PROJECT_IDS.flatMap((id) => {
    const project = projects.find((p) => p.id === id);
    return project ? [project] : [];
});

/**
 * Hero "Arbeiten zuerst": Aussage, CTAs und direkt darunter echte Projekte.
 *
 * Bewusst ohne Blur-Filter, 3D-Transforms, Dauer-Animationen und ohne
 * Einblenden aus Deckkraft 0: alles steht mit dem ersten Paint und kostet
 * auf dem Handy keine zusaetzliche Grafikleistung.
 */
export async function Hero() {
    const t = await getTranslations("hero");
    const tWork = await getTranslations("work");

    const trustItems = [
        t("trustRow.mobile"),
        t("trustRow.seo"),
        t("trustRow.nextjs"),
        t("trustRow.multilang"),
    ];

    return (
        <section id="home" className="relative bg-background text-text-primary">
            <div className="mx-auto flex w-full max-w-[1480px] flex-col px-6 pb-14 pt-28 sm:px-8 lg:px-12 lg:pb-20 lg:pt-36">
                {/* Aussage */}
                <div className="flex flex-col gap-5 md:mx-auto md:max-w-[1000px] md:items-center md:text-center">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent-text sm:text-xs sm:tracking-[0.22em]">
                        {t("eyebrowLocal")}
                    </span>

                    <h1
                        className="font-heading font-semibold leading-[0.97] tracking-[-0.05em] text-text-primary"
                        style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}
                    >
                        {t("headlinePart1")} {t("headlinePart2")}
                    </h1>

                    <p className="max-w-[38rem] text-[1.05rem] leading-[1.6] text-text-secondary sm:text-[1.15rem]">
                        {t("sublineWork")}
                    </p>
                </div>

                {/* CTAs: auf dem Handy unter der Projektleiste, ab md direkt unter dem Text */}
                <div className="order-3 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center md:order-none md:mt-8">
                    <Link
                        href="/contact"
                        data-track="primary_cta_click"
                        data-track-location="home-hero"
                        className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-8 text-base font-semibold text-accent-foreground transition-colors duration-200 hover:bg-[var(--nv-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                        {t("ctaPrimary")}
                    </Link>
                    <Link
                        href="/work"
                        className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-border-soft bg-surface px-8 text-base font-medium text-text-primary transition-colors duration-200 hover:border-accent hover:text-accent-text"
                    >
                        {t("ctaAllProjects")}
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                </div>

                {/* Projekte: Wischleiste auf dem Handy, Raster ab md */}
                <ul
                    aria-label={t("workStripLabel")}
                    className="nv-scroll-strip -mx-6 mt-8 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 md:mx-0 md:mt-14 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
                >
                    {heroProjects.map((project, index) => (
                        <li
                            key={project.id}
                            className="w-[78%] max-w-[320px] shrink-0 snap-start md:w-auto md:max-w-none"
                        >
                            <Link
                                href={`/work#${project.id}`}
                                className="group flex flex-col gap-3 rounded-[1.1rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                            >
                                <span className="relative block aspect-[16/10] overflow-hidden rounded-[1.1rem] border border-border-soft bg-surface">
                                    <Image
                                        src={project.previewImage}
                                        alt={t("projectPreviewAlt", {
                                            title: tWork(`projects.${project.id}.title`),
                                        })}
                                        fill
                                        priority={index === 0}
                                        sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 78vw"
                                        className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                                    />
                                </span>
                                <span className="flex items-baseline justify-between gap-3 px-1 text-[0.95rem]">
                                    <span className="font-semibold text-text-primary">
                                        {tWork(`projects.${project.id}.title`)}
                                    </span>
                                    <span className="shrink-0 text-text-muted">
                                        {t(`projectTags.${project.id}`)}
                                    </span>
                                </span>
                            </Link>
                        </li>
                    ))}
                </ul>

                <ul className="order-4 mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-muted md:justify-center">
                    {trustItems.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        </section>
    );
}
