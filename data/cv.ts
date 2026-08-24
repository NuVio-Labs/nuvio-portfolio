/**
 * Strukturdaten fuer die Bewerbungsseite /cv.
 *
 * Hier stehen ausschliesslich sprachneutrale Fakten: Kontaktwege, Datumswerte,
 * Dateipfade und Selbsteinschaetzungen. Alle sichtbaren Texte liegen unter dem
 * i18n-Namespace "cvPage" in messages/{de,en,nl}.json.
 */

/**
 * Zugriffsschluessel der Bewerbungsseite.
 *
 * Die Seite liegt unter /<locale>/cv/<key>. Jeder andere Schluessel und die
 * Route /cv ohne Schluessel liefern 404 (dynamicParams = false). Der Schluessel
 * steht nur im QR-Code auf den gedruckten Unterlagen, damit die Seite nicht
 * durch Raten oder Ausprobieren erreichbar ist.
 *
 * Der echte Schluessel gehoert nicht ins Repository, weil es oeffentlich ist:
 * er kommt aus CV_ACCESS_KEY (lokal .env.local, in Produktion die Vercel
 * Environment Variables) und wird beim Build eingesetzt. Ohne gesetzte
 * Variable greift ein Platzhalter, dann ist nur /cv/preview erreichbar.
 *
 * Wird der Schluessel geaendert, muss der QR-Code in docs/qr neu erzeugt und
 * die Variable in Vercel angepasst werden; danach ist ein Redeploy noetig.
 */
export const cvAccessKey = process.env.CV_ACCESS_KEY?.trim() || "preview"

export const cvContact = {
    phone: "+49 1590 1698608",
    phoneHref: "tel:+4915901698608",
    email: "Axel.Schurer@googlemail.com",
    emailHref: "mailto:Axel.Schurer@googlemail.com",
    /* Bewusst ohne Strasse: die Seite ist oeffentlich erreichbar, die
       vollstaendige Anschrift steht nur in den PDF-Unterlagen. */
    location: "47559 Kranenburg",
    birthDate: "1994-09-05",
    /* Freigestelltes Bewerbungsfoto, Seitenverhaeltnis 3:4. */
    portrait: "/cv/axel-portrait.webp",
} as const

/** Pflichtpraktikum im Rahmen der Umschulung. */
export const cvInternship = {
    startDate: "2027-03-15",
    endDate: "2027-07-02",
} as const

/* Zeitraum, Titel, Organisation und Stichpunkte je Sprache
   unter cvPage.entries.<id>. */
export const cvExperience = ["nuvio", "electrician"] as const
export const cvEducation = ["retraining", "apprenticeship", "school"] as const

export type CvEntryId =
    | (typeof cvExperience)[number]
    | (typeof cvEducation)[number]

export interface CvSkill {
    id: string
    label: string
    /** Selbsteinschaetzung in Prozent, identisch zum Lebenslauf-PDF. */
    level: number
}

export const cvSkills: CvSkill[] = [
    { id: "htmlcss", label: "HTML / CSS", level: 75 },
    { id: "javascript", label: "JavaScript", level: 60 },
    { id: "typescript", label: "TypeScript", level: 50 },
    { id: "react", label: "React", level: 65 },
    { id: "nextjs", label: "Next.js", level: 35 },
    { id: "git", label: "Git / GitHub", level: 60 },
    { id: "office", label: "MS Office", level: 70 },
]

export const cvToolbox = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Tailwind CSS",
    "Git / GitHub",
    "Vercel",
] as const

export interface CvDownload {
    id: "complete" | "letter" | "resume" | "certificate"
    file: string
    sizeKb: number
    primary?: boolean
}

export const cvDownloads: CvDownload[] = [
    { id: "complete", file: "/cv/axel-schurer-bewerbung-komplett.pdf", sizeKb: 215, primary: true },
    { id: "letter", file: "/cv/axel-schurer-anschreiben.pdf", sizeKb: 42 },
    { id: "resume", file: "/cv/axel-schurer-lebenslauf.pdf", sizeKb: 130 },
    { id: "certificate", file: "/cv/bfw-bescheinigung-praktikumsgeber.pdf", sizeKb: 47 },
]

export const cvFactIds = [
    "period",
    "mandatory",
    "cost",
    "insurance",
    "travel",
    "contract",
] as const

export const cvLanguageIds = ["de", "en"] as const
