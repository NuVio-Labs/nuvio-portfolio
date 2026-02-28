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
    const t = await getTranslations({ locale, namespace: "seo.privacy" })
    return {
        title: t("title"),
        robots: { index: false, follow: false },
    }
}

export default async function PrivacyPage() {
    const t = await getTranslations("footer")

    return (
        <main className="py-24 md:py-32">
            <Container className="max-w-3xl">
                <h1 className="mb-12 text-4xl font-extrabold tracking-tight lg:text-5xl">{t("privacy")}</h1>

                <div className="space-y-12 text-muted-foreground">
                    <p className="text-lg leading-relaxed text-foreground">
                        This Privacy Policy describes how your personal data is collected, used, and processed when you visit this portfolio website. We value your privacy and are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR).
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">1. Controller</h2>
                        <p className="leading-relaxed">
                            The person responsible for data processing on this website is:
                        </p>
                        <p className="leading-relaxed">
                            [Name] <br />
                            [Address] <br />
                            [City, Zip Code] <br />
                            Email: [Email Address]
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">2. Data We Process</h2>
                        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                            <li><span className="font-medium text-foreground">Server Log Data:</span> IP address, browser type, operating system, referrer URL, and time of visit.</li>
                            <li><span className="font-medium text-foreground">Contact Form Data:</span> Name, email address, subject, and message.</li>
                            <li><span className="font-medium text-foreground">Cookies:</span> Minimal cookies essential for site operation. No third-party tracking cookies.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">3. Purpose and Legal Basis</h2>
                        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                            <li>To communicate with you regarding your inquiries (Art. 6(1)(b) DSGVO).</li>
                            <li>To ensure the security and stability of our website (Art. 6(1)(f) DSGVO).</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">4. Hosting</h2>
                        <p className="leading-relaxed">
                            This website is hosted by Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">5. Your Rights</h2>
                        <p className="leading-relaxed">
                            You have the right to request information about your stored personal data, its origin, its recipients, and the purpose of its collection at no charge. You also have the right to request correction, blocking, or deletion.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">6. Data Security</h2>
                        <p className="leading-relaxed">
                            This site uses SSL/TLS encryption for the protection of transmitted data.
                        </p>
                    </section>
                </div>
            </Container>
        </main>
    )
}
