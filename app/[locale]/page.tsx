import dynamic from "next/dynamic"
import { Hero } from "@/components/sections/hero"
import { About } from "@/components/sections/about"

/* ─── Lazy-load below-fold sections ─── */
const Work = dynamic(() => import("@/components/sections/work").then((m) => m.Work))
const Lab = dynamic(() => import("@/components/sections/lab").then((m) => m.Lab))
const Contact = dynamic(() => import("@/components/sections/contact").then((m) => m.Contact))

export default function Home() {
    return (
        <div className="flex flex-col pb-16">
            <Hero />
            <Work />
            <About />
            <Lab />
            <Contact />
        </div>
    )
}
