# QR-Codes

## nuviolabs-cv-qr

Zielt auf die Bewerbungsseite: `https://www.nuviolabs.de/de/cv/n3pdva75kt3z`

- `nuviolabs-cv-qr.svg` — Vektor, erste Wahl fuer Druck (Anschreiben, Lebenslauf, Flyer)
- `nuviolabs-cv-qr.png` — 1200 px, fuer Bildschirm und schnelle Einbindung

Fehlerkorrektur: Level H. Der Code bleibt lesbar, auch wenn ein Logo mittig
darueber liegt oder der Druck leicht verschmiert. Mindestgroesse im Druck:
etwa 2,5 cm Kantenlaenge, dazu weisser Rand ringsum.

## Zugriffsschutz

Der letzte Pfadteil ist ein zufaelliger Schluessel (`cvAccessKey` in
`data/cv.ts`). Nur dieser eine Pfad wird gebaut, alles andere endet in der
404-Seite:

| Aufruf | Ergebnis |
| --- | --- |
| `/de/cv/n3pdva75kt3z` | Bewerbungsseite |
| `/de/cv` | 404 |
| `/de/cv/irgendwas` | 404 |
| `/cv/n3pdva75kt3z` | Weiterleitung auf die Sprachversion |

Die Seite traegt zusaetzlich `noindex, nofollow` und steht weder in der
Navigation noch in der Sitemap.

## Neu erzeugen

Noetig, sobald sich `cvAccessKey` oder die Domain aendert:

```bash
npx qrcode -e H -q 2 -t svg -o docs/qr/nuviolabs-cv-qr.svg "https://www.nuviolabs.de/de/cv/n3pdva75kt3z"
npx qrcode -e H -q 2 -t png -w 1200 -o docs/qr/nuviolabs-cv-qr.png "https://www.nuviolabs.de/de/cv/n3pdva75kt3z"
```

Ein neuer Schluessel macht alle bereits gedruckten QR-Codes wertlos. Deshalb
nur wechseln, wenn die alte Adresse wirklich nicht mehr gelten soll.
