import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import { ValueProposition } from "@/components/sections/value-proposition"
import { ServicesPreview } from "@/components/sections/services-preview"
import { Process } from "@/components/sections/process"
import { AboutPreview } from "@/components/sections/about-preview"
import { CtaFinal } from "@/components/sections/cta-final"
import { getRotatedProjectIds } from "@/lib/work-rotation"

/**
 * Die Route wird aktuell pro Request gerendert, die Projektrotation greift also
 * ohnehin sofort. Das Limit ist die Absicherung, falls die Startseite spaeter
 * cachebar wird: dann faellt der woechentliche Wechsel spaetestens nach einem
 * Tag auf.
 */
export const revalidate = 86400

/* ─── Lazy-load below-fold sections ─── */
const Work = dynamic(() => import("@/components/sections/work").then((m) => m.Work))
const FAQ = dynamic(() => import("@/components/sections/faq").then((m) => m.FAQ))

export default function Home() {
    const projectIds = getRotatedProjectIds()

    return (
        <div className="flex flex-col">
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
