import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Work } from "@/components/sections/work"
import { buildPageMetadata, localeUrl } from "@/lib/seo"
import { buildBreadcrumbSchema, buildServiceSchema, jsonLdScriptProps } from "@/lib/structured-data"
import { Hero } from "./_sections/hero"
import { Problem } from "./_sections/problem"
import { Services } from "./_sections/services"
import { LocalArea } from "./_sections/local"
import { Audiences } from "./_sections/audiences"
import { Process } from "./_sections/process"
import { Pricing } from "./_sections/pricing"
import { Faq } from "./_sections/faq"
import { FinalCta } from "./_sections/final-cta"

type Params = { locale: string }

/**
 * Lokale SEO-Landingpage fuer "Webdesign Kranenburg". Inhaltlich bewusst nur
 * fuer Deutsch ausgearbeitet (siehe CONTENT_PLAN.md, SEO Fokus Deutsch).
 * routing.locales enthaelt auch "en"/"nl", die Route waere ohne diese Weiche
 * technisch unter /en und /nl erreichbar; da dafuer keine eigenstaendigen,
 * inhaltlich sinnvollen Uebersetzungen existieren (und laut Auftrag auch
 * keine erfunden werden sollen), liefert die Seite fuer diese Locales bewusst
 * 404 statt einer duennen oder uebersetzten Kopie.
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

    const t = await getTranslations({ locale, namespace: "seo.webdesignKranenburg" })
    return buildPageMetadata({
        locale,
        path: "/webdesign-kranenburg",
        title: t("title"),
        description: t("description"),
        /* Einsprachige Seite (nur "de"): bewusst keine hreflang-Matrix und
           kein x-default, da /en und /nl fuer diese Route 404 liefern. */
    })
}

export default async function WebdesignKranenburgPage({
    params,
}: {
    params: Promise<Params>
}) {
    const { locale } = await params
    if (locale !== "de") {
        notFound()
    }
    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: "webdesignKranenburg" })
    const tSeo = await getTranslations({ locale, namespace: "seo.webdesignKranenburg" })
    const tNav = await getTranslations({ locale, namespace: "nav" })
    const pageUrl = localeUrl(locale, "/webdesign-kranenburg")

    const serviceSchema = buildServiceSchema({
        name: t("hero.headline"),
        description: tSeo("description"),
        url: pageUrl,
        areaServed: "Kranenburg",
    })
    const breadcrumbSchema = buildBreadcrumbSchema([
        { name: tNav("brand"), url: localeUrl(locale, "") },
        { name: t("hero.headline"), url: pageUrl },
    ])

    return (
        <div className="flex flex-col">
            <script {...jsonLdScriptProps(serviceSchema)} />
            <script {...jsonLdScriptProps(breadcrumbSchema)} />
            <Hero />
            <Problem />
            <Services />
            <LocalArea />
            <Audiences />
            {/* Referenzen: bestehende Work-Sektion mit echten, bereits vorhandenen
                Projekten (keine erfundenen Kennzahlen oder Kundenstimmen). */}
            <Work projectIds={["wt-erdbewegungen", "daisymays-salon"]} />
            <Process />
            <Pricing />
            <Faq />
            <FinalCta />
        </div>
    )
}
