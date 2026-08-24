# QR-Codes

## nuviolabs-cv-qr

Zielt auf die Bewerbungsseite. Die vollstaendige URL steht nicht in diesem
Repository, weil es oeffentlich ist:

```txt
https://www.nuviolabs.de/de/cv/<CV_ACCESS_KEY>
```

Den aktuellen Schluessel findest du in `.env.local` (lokal, nicht eingecheckt)
und in den Vercel Environment Variables.

- `nuviolabs-cv-qr.svg` — Vektor, erste Wahl fuer Druck
- `nuviolabs-cv-qr.png` — 1176 px, fuer Bildschirm und schnelle Einbindung

### Druckeigenschaften des SVG

- gefuellte schwarze Flaechen (`fill="#000000"`), keine Konturen, keine Strokes
- keine Effekte, keine Filter, keine Verlaeufe
- keine Transparenz, weisse Grundflaeche liegt als eigenes Rechteck darunter
- quadratische viewBox, skaliert dadurch immer proportional quadratisch
- 4 Module Weissraum ringsum, der in der Norm vorgesehene Mindestwert
- Voreinstellung 40 x 40 mm, frei skalierbar; unter etwa 25 mm nicht drucken
- Fehlerkorrektur Level H, Version 6 (41 x 41 Module)

### Zugriffsschutz

Der letzte Pfadteil ist ein zufaelliger Schluessel. Nur dieser eine Pfad wird
gebaut, alles andere endet in der 404-Seite:

| Aufruf | Ergebnis |
| --- | --- |
| `/de/cv/<CV_ACCESS_KEY>` | Bewerbungsseite |
| `/de/cv` | 404 |
| `/de/cv/irgendwas` | 404 |
| `/cv/<CV_ACCESS_KEY>` | Weiterleitung auf die Sprachversion |

Die Seite traegt zusaetzlich `noindex, nofollow` und steht weder in der
Navigation noch in der Sitemap.

### Schluessel wechseln

1. neuen Wert in `.env.local` und in den Vercel Environment Variables setzen
2. QR-Code neu erzeugen (Skript unten)
3. neu deployen, damit der Build den neuen Pfad erzeugt

Ein Wechsel macht alle bereits gedruckten QR-Codes wertlos. Fehlt die Variable
beim Build, ist nur `/cv/preview` erreichbar — dann ist in Vercel etwas nicht
gesetzt.

### Neu erzeugen

Das Generatorskript liegt bewusst nicht im Projekt, damit keine Dependency
dazukommt. Ein temporaeres Verzeichnis reicht:

```bash
mkdir qr-tmp && cd qr-tmp && npm init -y && npm install qrcode
```

`make-qr.js` in diesem Verzeichnis:

```js
const fs = require("fs")
const QRCode = require("qrcode")

const URL = process.argv[2]
const OUT = process.argv[3]
const QUIET = 4      // Module Weissraum je Seite
const PRINT_MM = 40  // Standardgroesse beim Platzieren

const qr = QRCode.create(URL, { errorCorrectionLevel: "H" })
const size = qr.modules.size
const bits = qr.modules.data
const total = size + QUIET * 2

const parts = []
for (let y = 0; y < size; y++) {
    let run = 0
    for (let x = 0; x <= size; x++) {
        const dark = x < size && bits[y * size + x] === 1
        if (dark) { run++; continue }
        if (run > 0) {
            parts.push(`M${x - run + QUIET} ${y + QUIET}h${run}v1h-${run}z`)
            run = 0
        }
    }
}

fs.writeFileSync(OUT, [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${PRINT_MM}mm" height="${PRINT_MM}mm" viewBox="0 0 ${total} ${total}">`,
    `<rect width="${total}" height="${total}" fill="#FFFFFF"/>`,
    `<path fill="#000000" d="${parts.join("")}"/>`,
    `</svg>`,
].join("\n") + "\n", "utf8")
```

Aufruf:

```bash
node make-qr.js "https://www.nuviolabs.de/de/cv/DEIN_SCHLUESSEL" ../docs/qr/nuviolabs-cv-qr.svg
node -e "require('qrcode').toFile('../docs/qr/nuviolabs-cv-qr.png','https://www.nuviolabs.de/de/cv/DEIN_SCHLUESSEL',{errorCorrectionLevel:'H',margin:4,width:1176})"
```

Die Zeilenlaeufe im SVG sind zusammengefasst. Gegengeprueft wurde das Ergebnis
pixelgenau gegen die PNG-Ausgabe der Bibliothek.
