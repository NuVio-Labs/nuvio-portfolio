import type { Metadata } from "next"
import { Container } from "@/components/layout/container"

export const metadata: Metadata = {
    title: "Privacy Policy",
    robots: { index: false, follow: false },
}


export default function PrivacyPage() {
    return (
        <main className="py-24 md:py-32">
            <Container className="max-w-3xl">
                <h1 className="mb-12 text-4xl font-extrabold tracking-tight lg:text-5xl">Privacy Policy</h1>

                <div className="space-y-12 text-muted-foreground">
                    <p className="text-lg leading-relaxed text-foreground">
                        This Privacy Policy describes how your personal data is collected, used, and processed when you visit this portfolio website. We value your privacy and are committed to protecting your personal data in accordance with the General Data Protection Regulation (GDPR).
                    </p>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">1. Controller</h2>
                        <p className="leading-relaxed">
                            The person responsible for data processing on this website (the "Controller") is:
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
                            <li>
                                <span className="font-medium text-foreground">Server Log Data:</span> When you visit our website, our server automatically collects information such as your IP address, browser type, operating system, referrer URL, and the time of your visit. This data is necessary for the technical operation and security of the site.
                            </li>
                            <li>
                                <span className="font-medium text-foreground">Contact Form Data:</span> If you use our contact form, we collect your name, email address, subject, and message to respond to your inquiry.
                            </li>
                            <li>
                                <span className="font-medium text-foreground">Cookies:</span> This site uses minimal cookies essential for its operation. We do not use third-party tracking cookies.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">3. Purpose and Legal Basis</h2>
                        <p className="leading-relaxed">
                            We process your data based on the following legal grounds:
                        </p>
                        <ul className="list-disc pl-6 space-y-2 leading-relaxed">
                            <li>To communicate with you regarding your inquiries (Art. 6(1)(b) DSGVO - Contract performance or pre-contractual measures).</li>
                            <li>To ensure the security and stability of our website (Art. 6(1)(f) DSGVO - Legitimate interest).</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">4. Hosting</h2>
                        <p className="leading-relaxed">
                            This website is hosted by an external service provider. Personal data collected on this website is stored on the host's servers.
                        </p>
                        <p className="leading-relaxed">
                            <strong>Hosting Provider:</strong> <br />
                            [Hosting Provider Name] <br />
                            [Hosting Provider Address]
                        </p>
                        <p className="leading-relaxed">
                            The host uses your data only to the extent necessary to fulfill its performance obligations and to follow our instructions with respect to such data.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">5. Contact Form</h2>
                        <p className="leading-relaxed">
                            If you send us inquiries via the contact form, your details from the inquiry form, including the contact details you provided there, will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not pass on this data without your consent.
                        </p>
                        <p className="leading-relaxed">
                            The data you enter in the contact form will remain with us until you ask us to delete it, revoke your consent to storage, or the purpose for data storage no longer applies (e.g., after your request has been processed). Mandatory statutory provisions – in particular statutory retention periods – remain unaffected.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">6. Cookies</h2>
                        <p className="leading-relaxed">
                            Our website uses cookies. Cookies are text files that are stored in the Internet browser or by the Internet browser on the user's computer system. If a user calls up a website, a cookie may be stored on the user's operating system. This cookie contains a characteristic string of characters that enables a unique identification of the browser when the website is called up again.
                        </p>
                        <p className="leading-relaxed">
                            We use cookies to make our website more user-friendly. Some elements of our website require that the calling browser be identified even after a page change. You can disable usage of cookies in your browser settings.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">7. Third Party Services</h2>
                        <p className="leading-relaxed">
                            We do not currently use third-party analytics (like Google Analytics) or advertising tracking. Any integration of external services (e.g., video embeds, fonts) will be documented here if added in the future.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">8. Your Rights</h2>
                        <p className="leading-relaxed">
                            You have the right to request information about your stored personal data, its origin, its recipients, and the purpose of its collection at no charge. You also have the right to request that it be corrected, blocked, or deleted. You can contact us at any time using the address given in the legal notice if you have further questions about the issue of privacy and data protection. You may also explicitly object to the processing of your data.
                        </p>
                        <p className="leading-relaxed">
                            Furthermore, you have a right to lodge a complaint with the competent supervisory authority.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">9. Data Security</h2>
                        <p className="leading-relaxed">
                            This site uses SSL or TLS encryption for security reasons and for the protection of the transmission of confidential content, such as the inquiries you send to us as the site operator. You can recognize an encrypted connection in your browser's address line when it changes from "http://" to "https://" and the lock icon is displayed in your browser's address bar.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-foreground">10. Updates to This Policy</h2>
                        <p className="leading-relaxed">
                            We reserve the right to update this privacy policy to reflect changes in our services or legal requirements. Please review this page periodically for the latest information on our privacy practices.
                        </p>
                        <p className="leading-relaxed text-sm">
                            Last Updated: [Current Date]
                        </p>
                    </section>
                </div>
            </Container>
        </main>
    )
}
