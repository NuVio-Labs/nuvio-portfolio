# CONTENT_PLAN.md

## Seitenstruktur Version 1
1. Startseite
2. Arbeiten / Portfolio
3. Leistungen
4. Über NuVio
5. Kontakt
6. Impressum
7. Datenschutz

## Seitenbestand, Stand September 2026 (zusätzlich zu Version 1)
- Journal (`/journal`, `/journal/<slug>`) — mehrsprachige Artikel, nicht in jeder Sprache identisch verfügbar
- Research / Lab (`/research`)
- CV-Seite (`/cv/<key>`) — nicht öffentlich verlinkt, nur per QR-Code erreichbar, `noindex` (siehe `docs/qr/README.md`)
- Lokale SEO-Landingpages: `/de/webdesign-kranenburg`, `/de/webdesign-kleve`, `/nl/webdesign-groesbeek` (jeweils einsprachig, siehe `lib/seo.ts`)

## Navigation
Deutsch: Projekte, Leistungen, Journal, Über mich, Kontakt
Englisch: Work, Services, Journal, About, Contact
Niederländisch: Werk, Diensten, Journal, Over, Contact

## Startseite Sections
1. Hero
2. Trust Punkte
3. Ausgewählte Arbeiten
4. Leistungen Überblick
5. Arbeitsweise
6. Über NuVio Preview
7. Final CTA

## Portfolio Inhalte pro Projekt
- Projektname
- Branche oder Projekttyp
- Ausgangslage
- Lösung
- Ergebnisfokus
- Leistungen
- Technologien optional
- Bild / Mockup / Screenshot

## Leistungen (Stand November 2026)
Drei Bereiche unter der Marke „NuVioLabs – Design & Webentwicklung“.
Leistungen und Preise zentral in `data/services.ts` (abgestimmt mit dem Google-Unternehmensprofil), Texte in `messages/*.json` unter `services.categories`.
- Webdesign & Entwicklung: Unternehmenswebsite, Landingpage, Redesign & Relaunch, Webseiten-Check (kostenlos), Reparatur, Anpassungen, Wartung, Entwicklung nach Aufwand
- Grafikdesign: Logo, Geschäftsausstattung, Visitenkarten, Briefkopf, Rechnungs- und Angebotsvorlagen, E-Mail-Signatur, Firmenstempel, Flyer, Banner, Social-Media-Grafiken, ausfüllbare PDFs
- Online-Marketing & SEO: Google-Unternehmensprofil, SEO-Basisoptimierung, SEO-Analyse

## Kontaktformular
- Name
- E Mail
- Unternehmen optional
- Projektart
- Nachricht
- Datenschutz Hinweis

## SEO Fokus Deutsch
- Webdesign Kleve
- Webdesign Kranenburg
- Website erstellen lassen
- moderne Website für Unternehmen
- Webdesigner Niederrhein

## SEO Fokus Englisch
- modern web design
- portfolio website design
- web development studio

## SEO Fokus Niederländisch
- website laten maken
- webdesign voor bedrijven
- moderne website laten maken
