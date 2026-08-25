import { readFile } from "node:fs/promises"
import path from "node:path"
import fontkit from "@pdf-lib/fontkit"
import { PDFDocument, rgb } from "pdf-lib"

/**
 * Liefert die Bewerbungsunterlagen mit dem Datum des Abruftags.
 *
 * Die Basisdateien unter assets/cv tragen keine Datumszeile. Sie wird hier
 * an derselben Stelle gesetzt, an der sie im Original stand: rechtsbuendig
 * auf x = 535,93, Grundlinie y = 98,51 von oben, Inter 18pt in 10 pt.
 * Dadurch wirken heruntergeladene Unterlagen nie veraltet.
 *
 * Die Schrift liegt als Subset bei, weil die im PDF eingebettete Inter nur
 * die im Text vorkommenden Zeichen enthaelt und die Ziffern 3, 4, 8 und 9
 * fehlen.
 */

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const RECHTE_KANTE = 535.93
/* Gemessen ab Oberkante der MediaBox, so wie die Vorlage die Zeile setzt.
   Die MediaBox der Seite beginnt nicht bei y = 0, deshalb wird die Lage aus
   ihr berechnet statt fest eingetragen. */
const GRUNDLINIE_VON_OBEN = 98.51
const SCHRIFTGROESSE = 10
const ORT = "Kranenburg"

const DOKUMENTE = {
    "bewerbung-komplett": {
        datei: "bewerbung-komplett.pdf",
        download: "axel-schurer-bewerbung-komplett.pdf",
    },
    anschreiben: {
        datei: "anschreiben.pdf",
        download: "axel-schurer-anschreiben.pdf",
    },
} as const

type DokumentId = keyof typeof DOKUMENTE

function istDokument(wert: string): wert is DokumentId {
    return wert in DOKUMENTE
}

function heutigesDatum() {
    return new Intl.DateTimeFormat("de-DE", {
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Europe/Berlin",
    }).format(new Date())
}

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ dokument: string }> },
) {
    const { dokument } = await params
    if (!istDokument(dokument)) {
        return new Response("Not found", { status: 404 })
    }

    const { datei, download } = DOKUMENTE[dokument]
    const wurzel = process.cwd()

    const [basis, schrift] = await Promise.all([
        readFile(path.join(wurzel, "assets", "cv", datei)),
        readFile(path.join(wurzel, "assets", "fonts", "Inter-Datum.ttf")),
    ])

    const pdf = await PDFDocument.load(basis)
    pdf.registerFontkit(fontkit)
    const inter = await pdf.embedFont(schrift, { subset: true })

    const zeile = `${ORT}, ${heutigesDatum()}`
    const breite = inter.widthOfTextAtSize(zeile, SCHRIFTGROESSE)

    const seite = pdf.getPage(0)
    const medienrahmen = seite.getMediaBox()

    seite.drawText(zeile, {
        x: RECHTE_KANTE - breite,
        y: medienrahmen.y + medienrahmen.height - GRUNDLINIE_VON_OBEN,
        size: SCHRIFTGROESSE,
        font: inter,
        color: rgb(0, 0, 0),
    })

    const bytes = await pdf.save()

    return new Response(bytes as BodyInit, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": `attachment; filename="${download}"`,
            "Content-Length": String(bytes.length),
            /* Nie zwischenspeichern: sonst laege morgen das Datum von heute an. */
            "Cache-Control": "no-store, max-age=0, must-revalidate",
        },
    })
}
