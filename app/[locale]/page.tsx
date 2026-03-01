import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import { ValueProposition } from "@/components/sections/value-proposition"
import { About } from "@/components/sections/about"

/* ─── Lazy-load below-fold sections ─── */
const Work = dynamic(() => import("@/components/sections/work").then((m) => m.Work))
const FAQ = dynamic(() => import("@/components/sections/faq").then((m) => m.FAQ))
const Lab = dynamic(() => import("@/components/sections/lab").then((m) => m.Lab))
const Contact = dynamic(() => import("@/components/sections/contact").then((m) => m.Contact))

export default function Home() {
    return (
        <div className="flex flex-col pb-16">
            <Hero />
            <ValueProposition />
            <Work />
            <About />
            <FAQ />
            <Lab />
            <Contact />
        </div>
    )
}
