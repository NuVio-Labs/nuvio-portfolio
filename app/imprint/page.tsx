import type { Metadata } from "next"
import { Container } from "@/components/layout/container"
import Link from "next/link"

export const metadata: Metadata = {
    title: "Imprint",
    robots: { index: false, follow: false },
}


export default function ImprintPage() {
    return (
        <main className="py-24 md:py-32">
            <Container className="max-w-3xl">
                <h1 className="mb-12 text-4xl font-extrabold tracking-tight lg:text-5xl">Imprint</h1>

                <div className="space-y-12 text-muted-foreground">
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">Information according to &sect; 5 TMG</h2>
                        <p className="leading-relaxed">
                            [Full Name] <br />
                            [Street Address] <br />
                            [Zip Code, City] <br />
                            Germany
                        </p>
                        <p>
                            <span className="font-medium text-foreground">Email:</span> [Email Address] <br />
                            <span className="font-medium text-foreground">Phone:</span> [Phone Number]
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">Person responsible for content according to &sect; 55 Abs. 2 RStV</h2>
                        <p className="leading-relaxed">
                            [Full Name] <br />
                            [Street Address] <br />
                            [Zip Code, City] <br />
                            Germany
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">Liability for Contents</h2>
                        <p className="leading-relaxed">
                            As service providers, we are liable for our own content on these pages according to Sec. 7, paragraph 1 TMG (German Telemedia Act). However, according to Sec. 8 to 10 TMG, service providers are not obligated to permanently monitor submitted or stored information or to search for evidences that indicate illegal activities.
                        </p>
                        <p className="leading-relaxed">
                            Legal obligations to removing information or to blocking the use of information remain unchallenged. In this case, liability is only possible at the time of knowledge about a specific violation of law. Illegal contents will be removed immediately at the time we get knowledge of them.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">Liability for Links</h2>
                        <p className="leading-relaxed">
                            Our offer includes links to external third-party websites. We have no influence on the contents of those websites, therefore we cannot guarantee for those contents. Providers or administrators of linked websites are always responsible for their own contents.
                        </p>
                        <p className="leading-relaxed">
                            The linked websites had been checked for possible violations of law at the time of the establishment of the link. Illegal contents were not detected at the time of the linking. A permanent monitoring of the contents of linked websites cannot be imposed without reasonable indications that there has been a violation of law. Illegal links will be removed immediately at the time we get knowledge of them.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">Copyright</h2>
                        <p className="leading-relaxed">
                            Contents and compilations published on these websites by the providers are subject to German copyright laws. Reproduction, editing, distribution as well as the use of any kind outside the scope of the copyright law require a written permission of the author or originator. Downloads and copies of these websites are permitted for private use only.
                        </p>
                        <p className="leading-relaxed">
                            The commercial use of our contents without permission of the originator is prohibited. Copyright laws of third parties are respected as long as the contents on these websites do not originate from the provider. Contributions of third parties on this site are indicated as such. However, if you notice any violations of copyright law, please inform us. Such contents will be removed immediately.
                        </p>
                    </section>
                </div>
            </Container>
        </main>
    )
}
