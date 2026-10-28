import dynamic from "next/dynamic"
import { setRequestLocale } from "next-intl/server"
import { Hero } from "@/components/sections/hero"
import { ValueProposition } from "@/components/sections/value-proposition"
import { ServicesPreview } from "@/components/sections/services-preview"
import { Process } from "@/components/sections/process"
import { AboutPreview } from "@/components/sections/about-preview"
import { CtaFinal } from "@/components/sections/cta-final"
import { getRotatedProjectIds } from "@/lib/work-rotation"
import { buildOrganizationSchema, buildWebsiteSchema, jsonLdScriptProps } from "@/lib/structured-data"

/**
 * Die Startseite wird statisch vorgerendert und aus dem Edge-Cache
 * ausgeliefert. Das Limit sorgt dafuer, dass der woechentliche Wechsel der
 * Projektrotation spaetestens nach einem Tag ankommt.
 */
export const revalidate = 86400

/* ─── Lazy-load below-fold sections ─── */
const Work = dynamic(() => import("@/components/sections/work").then((m) => m.Work))
const FAQ = dynamic(() => import("@/components/sections/faq").then((m) => m.FAQ))

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
    // Ohne diesen Aufruf liest next-intl die Locale aus den Request-Headern
    // und die Startseite faellt auf Rendering pro Request zurueck.
    const { locale } = await params
    setRequestLocale(locale)
    const projectIds = getRotatedProjectIds()

    return (
        <div className="flex flex-col">
            <script {...jsonLdScriptProps(buildOrganizationSchema())} />
            <script {...jsonLdScriptProps(buildWebsiteSchema())} />
            <Hero />
            <ValueProposition />
            <Work projectIds={projectIds} />
            <ServicesPreview />
            <Process />
            <AboutPreview />
            <FAQ />
            <CtaFinal />
        </div>
    )
}
