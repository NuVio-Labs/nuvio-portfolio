import Image from "next/image"
import { getTranslations, setRequestLocale } from "next-intl/server"
import {
    ArrowRight,
    BadgeEuro,
    CalendarDays,
    Car,
    Download,
    FileSignature,
    GraduationCap,
    Mail,
    MapPin,
    Phone,
    ShieldCheck,
} from "lucide-react"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"
import {
    cvAccessKey,
    cvContact,
    cvDownloads,
    cvEducation,
    cvExperience,
    cvFactIds,
    cvInternship,
    cvLanguageIds,
    cvSkills,
    cvToolbox,
    type CvEntryId,
} from "@/data/cv"

/**
 * Bewerbungsseite mit Lebenslauf, Anschreiben und Praktikumsunterlagen.
 *
 * Erreichbar nur unter /<locale>/cv/<cvAccessKey> ueber den QR-Code der
 * Papierbewerbung. Zusammen mit dynamicParams = false wird ausschliesslich
 * dieser eine Pfad gebaut, jeder andere Schluessel und /cv ohne Schluessel
 * enden in der 404-Seite. Dazu noindex und kein Eintrag in Navigation,
 * Footer oder Sitemap.
 */

/* Nur der eine gueltige Schluessel wird vorgerendert. */
export const dynamicParams = false

/* Die Seite traegt im Anschreiben das aktuelle Datum. Stuendlich neu bauen
   reicht dafuer und behaelt die statische Auslieferung bei. */
export const revalidate = 3600

export function generateStaticParams() {
    return [{ key: cvAccessKey }]
}

const factIcons = {
    period: CalendarDays,
    mandatory: GraduationCap,
    cost: BadgeEuro,
    insurance: ShieldCheck,
    travel: Car,
    contract: FileSignature,
} as const

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; key: string }>
}) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "seo.cv" })

    return {
        title: t("title"),
        description: t("description"),
        robots: { index: false, follow: false, nocache: true },
        alternates: { canonical: undefined },
    }
}

export default async function CvPage({
    params,
}: {
    params: Promise<{ locale: string; key: string }>
}) {
    const { locale } = await params
    setRequestLocale(locale)

    const t = await getTranslations("cvPage")

    const dateFormat = new Intl.DateTimeFormat(locale, {
        day: "numeric",
        month: "long",
        year: "numeric",
    })
    const period = {
        start: dateFormat.format(new Date(cvInternship.startDate)),
        end: dateFormat.format(new Date(cvInternship.endDate)),
    }
    const birthday = dateFormat.format(new Date(cvContact.birthDate))
    const heute = dateFormat.format(new Date())
    const letterParagraphs = t.raw("letter.paragraphs") as string[]

    const contactItems = [
        { key: "phone", icon: Phone, value: cvContact.phone, href: cvContact.phoneHref },
        { key: "email", icon: Mail, value: cvContact.email, href: cvContact.emailHref },
        { key: "location", icon: MapPin, value: cvContact.location, href: null },
        { key: "birthday", icon: CalendarDays, value: birthday, href: null },
    ] as const

    return (
        <main className="pt-20 md:pt-24 nv-cv">
            {/* Kopf mit Portrait, Kurzprofil und Kontaktdaten */}
            <SectionWrapper className="!pb-10 md:!pb-14">
                <div className="nv-container">
                    <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_280px] gap-10 md:gap-14 items-start">
                        <div>
                            <p className="text-accent-text text-xs font-semibold tracking-widest uppercase mb-4">
                                {t("hero.eyebrow")}
                            </p>
                            <h1
                                className="font-heading font-semibold text-text-primary mb-3"
                                style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)" }}
                            >
                                {t("hero.name")}
                            </h1>
                            <p className="text-text-secondary text-lg mb-5">{t("hero.role")}</p>
                            <p className="text-text-muted leading-relaxed max-w-xl mb-7">
                                {t("hero.tagline")}
                            </p>

                            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-[var(--nv-accent-soft)] px-4 py-2 text-sm text-text-primary mb-8">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                                {t("hero.availability", period)}
                            </p>

                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-xl">
                                {contactItems.map(({ key, icon: Icon, value, href }) => (
                                    <div key={key} className="flex items-start gap-3">
                                        <Icon
                                            className="h-4 w-4 mt-1 flex-shrink-0 text-accent"
                                            aria-hidden="true"
                                        />
                                        <div className="min-w-0">
                                            <dt className="text-text-muted text-xs uppercase tracking-wider mb-0.5">
                                                {t(`hero.labels.${key}`)}
                                            </dt>
                                            <dd className="text-text-primary text-sm break-words">
                                                {href ? (
                                                    <a
                                                        href={href}
                                                        className="hover:text-accent transition-colors"
                                                    >
                                                        {value}
                                                    </a>
                                                ) : (
                                                    value
                                                )}
                                            </dd>
                                        </div>
                                    </div>
                                ))}
                            </dl>

                            <div className="flex flex-wrap gap-3 mt-8 nv-cv-noprint">
                                <a
                                    href={cvDownloads[0].file}
                                    download
                                    className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-surface transition-colors hover:bg-[var(--nv-accent-hover)]"
                                >
                                    <Download className="h-4 w-4" aria-hidden="true" />
                                    {t("hero.actions.download")}
                                </a>
                                <a
                                    href={cvContact.emailHref}
                                    className="inline-flex items-center gap-2 rounded-full border border-border-soft px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                                >
                                    <Mail className="h-4 w-4" aria-hidden="true" />
                                    {t("hero.actions.contact")}
                                </a>
                            </div>
                        </div>

                        <div className="order-first md:order-last w-40 sm:w-48 md:w-full">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border-soft bg-surface">
                                <Image
                                    src={cvContact.portrait}
                                    alt={t("hero.portraitAlt")}
                                    fill
                                    /* Freisteller: 3:4 wie die Quelle, damit nichts beschnitten wird. */
                                    className="object-cover object-top"
                                    sizes="(min-width: 768px) 280px, 192px"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Rahmenbedingungen des Pflichtpraktikums */}
            <SectionWrapper light>
                <div className="nv-container">
                    <div className="max-w-xl mb-10">
                        <p className="text-accent-text text-xs font-semibold tracking-widest uppercase mb-4">
                            {t("facts.eyebrow")}
                        </p>
                        <h2
                            className="font-heading font-semibold text-text-primary"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {t("facts.headline")}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cvFactIds.map((id) => {
                            const Icon = factIcons[id]
                            return (
                                <div
                                    key={id}
                                    className="rounded-2xl border border-border-soft bg-background p-6"
                                >
                                    <Icon className="h-5 w-5 text-accent mb-4" aria-hidden="true" />
                                    <h3 className="font-heading font-semibold text-text-primary text-base mb-1.5">
                                        {t(`facts.items.${id}.title`)}
                                    </h3>
                                    <p className="text-text-muted text-sm leading-relaxed">
                                        {t(`facts.items.${id}.text`, period)}
                                    </p>
                                </div>
                            )
                        })}
                    </div>

                    <p className="text-text-muted text-xs leading-relaxed mt-8 max-w-3xl">
                        {t("facts.note")}
                    </p>
                </div>
            </SectionWrapper>

            {/* Anschreiben */}
            <SectionWrapper>
                <div className="nv-container">
                    <div className="max-w-xl mb-10">
                        <p className="text-accent-text text-xs font-semibold tracking-widest uppercase mb-4">
                            {t("letter.eyebrow")}
                        </p>
                        <h2
                            className="font-heading font-semibold text-text-primary"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {t("letter.headline")}
                        </h2>
                    </div>

                    <article className="rounded-2xl border border-border-soft bg-surface p-7 sm:p-10 max-w-3xl">
                        <p className="text-text-muted text-sm mb-8">
                            {t("letter.dateline", { place: t("letter.place"), date: heute })}
                        </p>
                        <p className="text-text-primary mb-6">{t("letter.salutation")}</p>
                        {letterParagraphs.map((_, index) => (
                            <p
                                key={index}
                                className="text-text-secondary leading-relaxed mb-5 last:mb-0"
                            >
                                {t(`letter.paragraphs.${index}`, period)}
                            </p>
                        ))}
                        <p className="text-text-primary mt-8 mb-1">{t("letter.closing")}</p>
                        <p className="font-heading text-text-primary">{t("letter.signature")}</p>
                    </article>
                </div>
            </SectionWrapper>

            {/* Werdegang und Bildungsweg */}
            <SectionWrapper light>
                <div className="nv-container">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        <TimelineColumn
                            eyebrow={t("experience.eyebrow")}
                            headline={t("experience.headline")}
                            entries={cvExperience}
                            t={t}
                        />
                        <TimelineColumn
                            eyebrow={t("education.eyebrow")}
                            headline={t("education.headline")}
                            entries={cvEducation}
                            t={t}
                        />
                    </div>
                </div>
            </SectionWrapper>

            {/* Faehigkeiten, Sprachen, Fuehrerschein */}
            <SectionWrapper>
                <div className="nv-container">
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-12 lg:gap-16">
                        <div>
                            <p className="text-accent-text text-xs font-semibold tracking-widest uppercase mb-4">
                                {t("skills.eyebrow")}
                            </p>
                            <h2
                                className="font-heading font-semibold text-text-primary mb-8"
                                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                            >
                                {t("skills.headline")}
                            </h2>

                            <ul className="space-y-4 max-w-lg">
                                {cvSkills.map((skill) => (
                                    <li key={skill.id}>
                                        <div className="flex items-baseline justify-between gap-4 mb-2">
                                            <span className="text-text-primary text-sm font-medium">
                                                {skill.label}
                                            </span>
                                        </div>
                                        <div
                                            className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--nv-surface-strong)]"
                                            role="img"
                                            aria-label={t("skills.levelLabel", {
                                                label: skill.label,
                                                level: skill.level,
                                            })}
                                        >
                                            <div
                                                className="h-full rounded-full bg-accent"
                                                style={{ width: `${skill.level}%` }}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <p className="text-text-muted text-xs mt-5">{t("skills.note")}</p>
                        </div>

                        <div>
                            <h3 className="font-heading font-semibold text-text-primary text-lg mb-4">
                                {t("skills.toolboxHeadline")}
                            </h3>
                            <ul className="flex flex-wrap gap-2 mb-10">
                                {cvToolbox.map((tool) => (
                                    <li
                                        key={tool}
                                        className="rounded-full border border-border-soft bg-surface px-3.5 py-1.5 text-xs text-text-secondary"
                                    >
                                        {tool}
                                    </li>
                                ))}
                            </ul>

                            <h3 className="font-heading font-semibold text-text-primary text-lg mb-4">
                                {t("profile.languagesHeadline")}
                            </h3>
                            <dl className="space-y-2 mb-10">
                                {cvLanguageIds.map((id) => (
                                    <div key={id} className="flex items-baseline justify-between gap-4">
                                        <dt className="text-text-primary text-sm">
                                            {t(`profile.languages.${id}.name`)}
                                        </dt>
                                        <dd className="text-text-muted text-sm">
                                            {t(`profile.languages.${id}.level`)}
                                        </dd>
                                    </div>
                                ))}
                            </dl>

                            <h3 className="font-heading font-semibold text-text-primary text-lg mb-4">
                                {t("profile.licenseHeadline")}
                            </h3>
                            <p className="text-text-muted text-sm">{t("profile.license")}</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>

            {/* Downloads */}
            <SectionWrapper light className="nv-cv-noprint">
                <div className="nv-container">
                    <div className="max-w-xl mb-10">
                        <p className="text-accent-text text-xs font-semibold tracking-widest uppercase mb-4">
                            {t("downloads.eyebrow")}
                        </p>
                        <h2
                            className="font-heading font-semibold text-text-primary"
                            style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
                        >
                            {t("downloads.headline")}
                        </h2>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {cvDownloads.map((item) => (
                            <li key={item.id}>
                                <a
                                    href={item.file}
                                    download
                                    className="group flex h-full items-start gap-4 rounded-2xl border border-border-soft bg-background p-6 transition-colors hover:border-accent/50"
                                >
                                    <Download
                                        className="h-5 w-5 mt-0.5 flex-shrink-0 text-accent"
                                        aria-hidden="true"
                                    />
                                    <div>
                                        <h3 className="font-heading font-semibold text-text-primary text-base mb-1 group-hover:text-accent transition-colors">
                                            {t(`downloads.items.${item.id}.title`)}
                                        </h3>
                                        <p className="text-text-muted text-sm leading-relaxed mb-2">
                                            {t(`downloads.items.${item.id}.text`)}
                                        </p>
                                        <p className="text-text-muted text-xs">
                                            {t("downloads.hint", { size: item.sizeKb })}
                                        </p>
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </SectionWrapper>

            {/* Kontakt */}
            <SectionWrapper className="nv-cv-noprint">
                <div className="nv-container text-center">
                    <h2
                        className="font-heading font-semibold text-text-primary mb-4"
                        style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}
                    >
                        {t("contact.headline")}
                    </h2>
                    <p className="text-text-muted leading-relaxed max-w-xl mx-auto mb-8">
                        {t("contact.text")}
                    </p>

                    <div className="flex flex-wrap justify-center gap-3">
                        <a
                            href={cvContact.emailHref}
                            className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-surface transition-colors hover:bg-[var(--nv-accent-hover)]"
                        >
                            <Mail className="h-4 w-4" aria-hidden="true" />
                            {t("contact.mail")}
                        </a>
                        <a
                            href={cvContact.phoneHref}
                            className="inline-flex items-center gap-2 rounded-full border border-border-soft px-6 py-3 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
                        >
                            <Phone className="h-4 w-4" aria-hidden="true" />
                            {t("contact.phone")}
                        </a>
                        <Link
                            href="/work"
                            className="inline-flex items-center gap-2 rounded-full border border-transparent px-6 py-3 text-sm font-medium text-accent-text transition-colors hover:text-accent"
                        >
                            {t("contact.portfolio")}
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>

                    <p className="text-text-muted text-xs mt-12">{t("unlisted")}</p>
                </div>
            </SectionWrapper>
        </main>
    )
}

/** Eine Spalte der Timeline: Werdegang oder Bildungsweg. */
function TimelineColumn({
    eyebrow,
    headline,
    entries,
    t,
}: {
    eyebrow: string
    headline: string
    entries: readonly CvEntryId[]
    t: Awaited<ReturnType<typeof getTranslations<"cvPage">>>
}) {
    return (
        <div>
            <p className="text-accent-text text-xs font-semibold tracking-widest uppercase mb-4">
                {eyebrow}
            </p>
            <h2
                className="font-heading font-semibold text-text-primary mb-8"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
            >
                {headline}
            </h2>

            <ol className="relative border-l border-border-soft pl-6 space-y-8">
                {entries.map((id) => {
                    const bullets = t.raw(`entries.${id}.bullets`) as string[]
                    return (
                        <li key={id} className="relative">
                            <span
                                className="absolute -left-[27px] top-1.5 h-2 w-2 rounded-full bg-accent"
                                aria-hidden="true"
                            />
                            <p className="text-text-muted text-xs uppercase tracking-wider mb-1.5">
                                {t(`entries.${id}.period`)}
                            </p>
                            <h3 className="font-heading font-semibold text-text-primary text-base mb-1">
                                {t(`entries.${id}.title`)}
                            </h3>
                            <p className="text-text-secondary text-sm">{t(`entries.${id}.org`)}</p>

                            {bullets.length > 0 && (
                                <ul className="mt-3 space-y-1.5">
                                    {bullets.map((bullet, index) => (
                                        <li
                                            key={index}
                                            className="flex gap-2.5 text-text-muted text-sm leading-relaxed"
                                        >
                                            <span
                                                className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent/60"
                                                aria-hidden="true"
                                            />
                                            {bullet}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    )
                })}
            </ol>
        </div>
    )
}
