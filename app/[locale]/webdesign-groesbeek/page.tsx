import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { Work } from "@/components/sections/work"
import { buildPageMetadata, localeUrl } from "@/lib/seo"
import { buildBreadcrumbSchema, buildServiceSchema, jsonLdScriptProps } from "@/lib/structured-data"
import { Hero } from "./_sections/hero"
import { Intent } from "./_sections/intent"
import { CrossBorder } from "./_sections/cross-border"
import { Multilingual } from "./_sections/multilingual"
import { Services } from "./_sections/services"
import { Audiences } from "./_sections/audiences"
import { WhyNuvio } from "./_sections/why-nuvio"
import { Process } from "./_sections/process"
import { Pricing } from "./_sections/pricing"
import { Faq } from "./_sections/faq"
import { FinalCta } from "./_sections/final-cta"

type Params = { locale: string }

/**
 * Nederlandse lokale SEO-landingpage voor "Webdesign Groesbeek". Anders dan
 * /de/webdesign-kranenburg en /de/webdesign-kleve is deze route uitsluitend
 * voor "nl" bedoeld: NuVio Labs is gevestigd in Kranenburg (Duitsland), niet
 * in Groesbeek, en de content is met een eigen Nederlandse zoekintentie en
 * cross-border-positionering geschreven (geen vertaling van de Duitse
 * pagina's). Voor "de" en "en" bestaat hiervoor geen zinvolle, eigenstandige
 * content, dus geeft de route bewust 404 i.p.v. een vertaalde kopie.
 */
export async function generateMetadata({
    params,
}: {
    params: Promise<Params>
}): Promise<Metadata> {
    const { locale } = await params
    if (locale !== "nl") {
        notFound()
    }

    const t = await getTranslations({ locale, namespace: "seo.webdesignGroesbeek" })
    return buildPageMetadata({
        locale,
        path: "/webdesign-groesbeek",
        title: t("title"),
        description: t("description"),
        /* Einsprachige Seite (nur "nl"): bewusst keine hreflang-Matrix und
           kein x-default, da /de und /en fuer diese Route 404 liefern. */
    })
}

export default async function WebdesignGroesbeekPage({
    params,
}: {
    params: Promise<Params>
}) {
    const { locale } = await params
    if (locale !== "nl") {
        notFound()
    }
    setRequestLocale(locale)

    const t = await getTranslations({ locale, namespace: "webdesignGroesbeek" })
    const tSeo = await getTranslations({ locale, namespace: "seo.webdesignGroesbeek" })
    const tNav = await getTranslations({ locale, namespace: "nav" })
    const pageUrl = localeUrl(locale, "/webdesign-groesbeek")

    const serviceSchema = buildServiceSchema({
        name: t("hero.headline"),
        description: tSeo("description"),
        url: pageUrl,
        areaServed: "Groesbeek",
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
            <Intent />
            <CrossBorder />
            <Multilingual />
            <Services />
            <Audiences />
            {/* Referenties: bestaande Work-sectie met echte projecten. De
                Nederlandse projectteksten (work.projects.*) bestaan al in
                messages/nl.json, dus geen aparte lokalisatie nodig. */}
            <Work projectIds={["wt-erdbewegungen", "daisymays-salon"]} />
            <WhyNuvio />
            <Process />
            <Pricing />
            <Faq />
            <FinalCta />
        </div>
    )
}
