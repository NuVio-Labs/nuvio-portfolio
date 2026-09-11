import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Work } from "@/components/sections/work"
import { buildPageMetadata } from "@/lib/seo"
import { Hero } from "./_sections/hero"
import { BusinessTool } from "./_sections/business-tool"
import { Problems } from "./_sections/problems"
import { Services } from "./_sections/services"
import { Audiences } from "./_sections/audiences"
import { WhyNuvio } from "./_sections/why-nuvio"
import { Process } from "./_sections/process"
import { Pricing } from "./_sections/pricing"
import { Faq } from "./_sections/faq"
import { FinalCta } from "./_sections/final-cta"

type Params = { locale: string }

/**
 * Lokale SEO-Landingpage fuer "Webdesign Kleve". Wie /webdesign-kranenburg
 * inhaltlich bewusst nur fuer Deutsch ausgearbeitet (siehe CONTENT_PLAN.md,
 * SEO Fokus Deutsch, und die dortige Begruendung im Code-Kommentar). Die
 * Route waere ohne diese Weiche technisch auch unter /en und /nl erreichbar;
 * da dafuer keine eigenstaendigen Uebersetzungen existieren und keine
 * erfunden werden sollen, liefert die Seite fuer diese Locales bewusst 404.
 *
 * Inhaltlich unabhaengig von /webdesign-kranenburg: eigene Positionierung
 * (Kleve als groesserer Wirtschaftsstandort, Website als Geschaeftswerkzeug),
 * eigene Sections (u.a. "Warum NuVio Labs", das es bei Kranenburg so nicht
 * gibt) und eigene Texte/FAQ ohne lokalen Sitz-Anspruch fuer Kleve.
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<Params>
}): Promise<Metadata> {
    const { locale } = await params
    if (locale !== "de") {
        notFound()
    }

    const t = await getTranslations({ locale, namespace: "seo.webdesignKleve" })
    return buildPageMetadata({
        locale,
        path: "/webdesign-kleve",
        title: t("title"),
        description: t("description"),
        /* Einsprachige Seite (nur "de"): bewusst keine hreflang-Matrix und
           kein x-default, da /en und /nl fuer diese Route 404 liefern. */
    })
}

export default async function WebdesignKlevePage({
    params,
}: {
    params: Promise<Params>
}) {
    const { locale } = await params
    if (locale !== "de") {
        notFound()
    }
    setRequestLocale(locale)

    return (
        <div className="flex flex-col">
            <Hero />
            <BusinessTool />
            <Problems />
            <Services />
            <Audiences />
            {/* Referenzen: bestehende Work-Sektion mit echten, bereits vorhandenen
                Projekten. Umgekehrte Reihenfolge gegenueber /webdesign-kranenburg
                fuer eine andere Card-Verteilung auf der Seite. */}
            <Work projectIds={["daisymays-salon", "wt-erdbewegungen"]} />
            <WhyNuvio />
            <Process />
            <Pricing />
            <Faq />
            <FinalCta />
        </div>
    )
}
