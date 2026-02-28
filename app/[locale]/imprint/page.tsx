import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import { Container } from "@/components/layout/container"

type Params = { locale: string }

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>
}): Promise<Metadata> {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: "seo.imprint" })
    return {
        title: t("title"),
        robots: { index: false, follow: false },
    }
}

export default async function ImprintPage() {
    const t = await getTranslations("footer")

    return (
        <main className="py-24 md:py-32">
            <Container className="max-w-3xl">
                <h1 className="mb-12 text-4xl font-extrabold tracking-tight lg:text-5xl">{t("imprint")}</h1>

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
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">Copyright</h2>
                        <p className="leading-relaxed">
                            Contents and compilations published on these websites by the providers are subject to German copyright laws. Reproduction, editing, distribution as well as the use of any kind outside the scope of the copyright law require a written permission of the author or originator.
                        </p>
                    </section>
                </div>
            </Container>
        </main>
    )
}
