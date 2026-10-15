import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
}

/**
 * Durchreichendes Root-Layout. <html> und <body> rendert
 * app/[locale]/layout.tsx, damit `lang` schon im ausgelieferten HTML zur
 * Locale passt (vorher stand hier fest "de" und wurde erst per Script
 * korrigiert). Fuer alles ausserhalb von [locale] rendert app/not-found.tsx
 * eigene html/body-Tags.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
