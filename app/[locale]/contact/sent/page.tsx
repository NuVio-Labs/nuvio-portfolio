import { redirect } from "@/i18n/navigation"

type Params = { locale: string }

/**
 * Frueher die Bestaetigungsseite des WhatsApp-/mailto-Handoffs. Das Formular
 * sendet inzwischen direkt ueber /api/contact und zeigt Erfolg selbst an.
 * Die Route bleibt nur, damit alte Lesezeichen oder Verlaufseintraege nicht
 * ins Leere laufen, und leitet aufs Kontaktformular um.
 */
export default async function ContactSentPage({ params }: { params: Promise<Params> }) {
    const { locale } = await params
    redirect({ href: "/contact", locale })
}
