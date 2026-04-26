# TECH_STACK.md

## Empfohlener Stack
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion für subtile Animationen
- next-intl für de/en/nl
- next-themes oder eigenes data-theme System
- Resend optional für Kontaktformular
- Vercel Deployment

## Struktur
```txt
src/
  app/[locale]/
  components/layout/
  components/sections/
  components/ui/
  components/work/
  data/
  i18n/
  lib/
  messages/de.json
  messages/en.json
  messages/nl.json
```

## Theme Regeln
- Farben über CSS Variablen
- keine verstreuten Hex Codes in Komponenten
- semantische Tokens: background, surface, textPrimary, textMuted, accent, borderSoft
- Dark und Light Mode immer zusammen prüfen

## i18n Regeln
- URLs empfohlen: /de, /en, /nl
- keine sichtbaren Texte hart in Komponenten
- Metadata je Sprache vorbereiten

## Datenschutz
- keine Analytics ohne Entscheidung
- keine externen Embeds ohne Zustimmung oder Hinweis
- Kontaktformular mit Datenschutztext
- Impressum und Datenschutz bereitstellen
