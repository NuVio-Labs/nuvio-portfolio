# TECH_STACK.md

## Tatsächlicher Stack (Stand: siehe package.json)
- Next.js App Router (16.x), React 19, TypeScript
- Tailwind CSS 3 (`tailwindcss-animate`-Plugin)
- next-intl für de/en/nl
- next-themes für den Dark/Light-Toggle
- next-mdx-remote + gray-matter + rehype-slug + remark-gfm für das Journal (MDX-Artikel unter `content/journal/<locale>/`)
- pdf-lib + @pdf-lib/fontkit für die generierte Bewerbungs-PDF (`app/api/cv/[dokument]/route.ts`)
- lucide-react für Icons
- Kontaktformular ohne Backend/E-Mail-API: bereitet eine Nachricht vor und öffnet sie in WhatsApp oder dem E-Mail-Programm des Besuchers
- @vercel/analytics + @vercel/speed-insights, Vercel Deployment

Kein Framer Motion und kein Resend im Einsatz — Animationen laufen über CSS-Transitions (`ScrollAnimation`-Komponente).

## Struktur (kein `src/`-Präfix)
```txt
app/[locale]/
components/layout/
components/sections/
components/ui/
components/work/
content/journal/<locale>/
data/
i18n/
lib/
messages/de.json
messages/en.json
messages/nl.json
public/
```

## Theme Regeln
- Farben über CSS Variablen (`app/globals.css`, Präfix `--nv-*`)
- keine verstreuten Hex Codes in Komponenten
- semantische Tailwind-Tokens: `bg-background`, `bg-surface`, `text-text-primary`, `text-text-muted`, `bg-accent`, `border-border-soft`
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
