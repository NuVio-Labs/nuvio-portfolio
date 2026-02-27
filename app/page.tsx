import { Hero } from "@/components/sections/hero"
import { Work } from "@/components/sections/work"
import { About } from "@/components/sections/about"
import { Lab } from "@/components/sections/lab"
import { Contact } from "@/components/sections/contact"

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
