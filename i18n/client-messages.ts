import type { AbstractIntlMessages } from "next-intl"

/**
 * Namespaces, die Client-Komponenten ueber useTranslations lesen. Nur diese
 * gehen ueber NextIntlClientProvider in den Browser; Server-Komponenten
 * lesen ihre Texte weiterhin serverseitig aus messages/*.json.
 *
 * Vorher landeten alle Texte (Datenschutz, Landingpages, CV …) im HTML jeder
 * Seite, auf der Startseite 134 von 221 KB, und mussten vor der Hydration
 * geparst werden.
 *
 * Neue Client-Komponente mit eigenem Namespace -> hier ergaenzen, sonst
 * zeigt sie im Browser nur den Schluessel statt des Textes.
 */
export const CLIENT_MESSAGE_NAMESPACES = [
    "consent", // components/consent/*
    "nav", // components/layout/navbar.tsx
    "work", // components/sections/work.tsx, components/ui/project-live-preview.tsx
    "faq", // components/sections/faq.tsx
    "contactPage", // components/sections/contact-form.tsx (contactPage.form)
    "journal", // components/journal/journal-likes.tsx, journal-share.tsx
] as const

export function pickClientMessages(messages: AbstractIntlMessages): AbstractIntlMessages {
    return Object.fromEntries(
        CLIENT_MESSAGE_NAMESPACES.filter((namespace) => namespace in messages).map((namespace) => [
            namespace,
            messages[namespace],
        ])
    )
}
