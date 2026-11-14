import "./globals.css"

/**
 * Icons kommen ueber die Datei-Konventionen von Next.js: app/favicon.ico,
 * app/icon.png und app/apple-icon.png (alle aus public/logo.png erzeugt).
 *
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
