import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import { ValueProposition } from "@/components/sections/value-proposition"
import { ServicesPreview } from "@/components/sections/services-preview"
import { Process } from "@/components/sections/process"
import { AboutPreview } from "@/components/sections/about-preview"
import { CtaFinal } from "@/components/sections/cta-final"

/* ─── Lazy-load below-fold sections ─── */
const Work = dynamic(() => import("@/components/sections/work").then((m) => m.Work))
const FAQ = dynamic(() => import("@/components/sections/faq").then((m) => m.FAQ))

export default function Home() {
    return (
        <div className="flex flex-col">
            <Hero />
            <ValueProposition />
            <Work />
            <ServicesPreview />
            <Process />
            <AboutPreview />
            <FAQ />
            <CtaFinal />
        </div>
    )
}
