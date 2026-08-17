import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import GithubSlugger from "github-slugger"

/**
 * Artikel liegen pro Sprache in einem eigenen Ordner:
 *   content/journal/<locale>/<slug>.mdx
 *
 * Ein Artikel muss nicht in allen Sprachen existieren. Fehlt er in einer
 * Sprache, taucht er dort schlicht nicht auf — es gibt keinen Fallback auf
 * eine andere Sprache, weil ein deutscher Text auf der englischen Seite
 * schlechter waere als gar kein Eintrag.
 */
const CONTENT_ROOT = path.join(process.cwd(), "content", "journal")

/** Stabile Kategorie-Keys. Die Labels liegen in messages unter journal.categories. */
export const JOURNAL_CATEGORIES = [
    "webdesign",
    "performance",
    "ux",
    "development",
    "seo",
    "case-study",
    "behind-the-build",
] as const

export type JournalCategory = (typeof JOURNAL_CATEGORIES)[number]

export interface JournalMeta {
    slug: string
    locale: string
    title: string
    description: string
    /** ISO-Datum (YYYY-MM-DD) */
    date: string
    updatedAt?: string
    category: JournalCategory
    tags: string[]
    author: string
    /** Lesedauer in Minuten — aus dem Text berechnet, per Frontmatter ueberschreibbar. */
    readingMinutes: number
    featured: boolean
    /** Bild fuer Social-Previews (og:image). Darf eingebrannten Text tragen. */
    image?: string
    imageAlt?: string
    /**
     * Editorial-Visual im Artikel, direkt unter dem Header.
     * Bewusst getrennt von `image`: das Social-Bild darf Headline und Lead
     * als Pixel enthalten, im Artikel waere das eine Dopplung zum echten H1.
     */
    hero?: string
    heroAlt?: string
    /** Seitenverhaeltnis des Hero-Bildes, verhindert Layout-Shift. */
    heroWidth?: number
    heroHeight?: number
}

export interface JournalArticle {
    meta: JournalMeta
    /** MDX-Body ohne Frontmatter. */
    body: string
}

export interface TocEntry {
    id: string
    text: string
    level: 2 | 3
}

const DEFAULT_AUTHOR = "NuVio Labs"
const WORDS_PER_MINUTE = 200

/* ─── Frontmatter-Validierung ───────────────────────────────────────── */

function fail(locale: string, slug: string, message: string): never {
    throw new Error(`Journal-Artikel "${locale}/${slug}.mdx": ${message}`)
}

function requireString(
    data: Record<string, unknown>,
    key: string,
    locale: string,
    slug: string,
): string {
    const value = data[key]
    if (typeof value !== "string" || value.trim() === "") {
        fail(locale, slug, `Frontmatter-Feld "${key}" fehlt oder ist kein Text.`)
    }
    return value.trim()
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

function requireDate(
    data: Record<string, unknown>,
    key: string,
    locale: string,
    slug: string,
): string {
    const value = requireString(data, key, locale, slug)
    if (!ISO_DATE.test(value) || Number.isNaN(Date.parse(value))) {
        fail(locale, slug, `Feld "${key}" muss ein Datum im Format YYYY-MM-DD sein (war: "${value}").`)
    }
    return value
}

function isCategory(value: unknown): value is JournalCategory {
    return typeof value === "string" && (JOURNAL_CATEGORIES as readonly string[]).includes(value)
}

/**
 * Zaehlt Woerter im MDX-Body ohne Codebloecke, damit lange Listings die
 * Lesedauer nicht kuenstlich aufblaehen.
 */
export function estimateReadingMinutes(body: string): number {
    const prose = stripCodeFences(body)
        .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1") // Links/Bilder auf ihren Text reduzieren
        .replace(/<[^>]+>/g, " ") // JSX-Tags entfernen
        .replace(/[#>*_`~|-]/g, " ")
    const words = prose.split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.round(words / WORDS_PER_MINUTE))
}

function buildMeta(
    data: Record<string, unknown>,
    body: string,
    locale: string,
    slug: string,
): JournalMeta {
    if (!isCategory(data.category)) {
        fail(
            locale,
            slug,
            `Feld "category" muss einer dieser Keys sein: ${JOURNAL_CATEGORIES.join(", ")} (war: ${JSON.stringify(data.category)}).`,
        )
    }

    const tags = data.tags ?? []
    if (!Array.isArray(tags) || tags.some((tag) => typeof tag !== "string")) {
        fail(locale, slug, `Feld "tags" muss eine Liste von Texten sein.`)
    }

    const readingOverride = data.readingTime
    if (readingOverride !== undefined && typeof readingOverride !== "number") {
        fail(locale, slug, `Feld "readingTime" muss eine Zahl (Minuten) sein.`)
    }

    /* Ein Bild ohne Alternativtext waere fuer Screenreader ein toter Punkt. */
    if (data.hero && typeof data.heroAlt !== "string") {
        fail(locale, slug, `Zu "hero" fehlt "heroAlt" (Alternativtext).`)
    }

    return {
        slug,
        locale,
        title: requireString(data, "title", locale, slug),
        description: requireString(data, "description", locale, slug),
        date: requireDate(data, "date", locale, slug),
        updatedAt: data.updatedAt === undefined ? undefined : requireDate(data, "updatedAt", locale, slug),
        category: data.category,
        tags: tags as string[],
        author: typeof data.author === "string" && data.author.trim() ? data.author.trim() : DEFAULT_AUTHOR,
        readingMinutes: readingOverride ?? estimateReadingMinutes(body),
        featured: data.featured === true,
        image: typeof data.image === "string" ? data.image : undefined,
        imageAlt: typeof data.imageAlt === "string" ? data.imageAlt : undefined,
        hero: typeof data.hero === "string" ? data.hero : undefined,
        heroAlt: typeof data.heroAlt === "string" ? data.heroAlt : undefined,
        heroWidth: typeof data.heroWidth === "number" ? data.heroWidth : undefined,
        heroHeight: typeof data.heroHeight === "number" ? data.heroHeight : undefined,
    }
}

/* ─── Lesen ─────────────────────────────────────────────────────────── */

async function readSlugs(locale: string): Promise<string[]> {
    try {
        const files = await fs.readdir(path.join(CONTENT_ROOT, locale))
        return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""))
    } catch {
        /* Sprache hat (noch) keinen Ordner — das ist ein gueltiger Zustand. */
        return []
    }
}

export async function getJournalArticle(locale: string, slug: string): Promise<JournalArticle | null> {
    /* Verhindert Pfad-Ausbrueche ueber praeparierte Slugs. */
    if (!/^[a-z0-9-]+$/.test(slug)) return null

    let raw: string
    try {
        raw = await fs.readFile(path.join(CONTENT_ROOT, locale, `${slug}.mdx`), "utf8")
    } catch {
        return null
    }

    const { data, content } = matter(raw)
    if (data.draft === true && process.env.NODE_ENV === "production") return null

    return { meta: buildMeta(data, content, locale, slug), body: content }
}

/** Alle Artikel einer Sprache, neueste zuerst. */
export async function getJournalArticles(locale: string): Promise<JournalMeta[]> {
    const slugs = await readSlugs(locale)
    const articles = await Promise.all(slugs.map((slug) => getJournalArticle(locale, slug)))

    return articles
        .filter((article): article is JournalArticle => article !== null)
        .map((article) => article.meta)
        .sort((a, b) => b.date.localeCompare(a.date))
}

/** Sprachen, in denen es diesen Artikel gibt — fuer hreflang-Alternates. */
export async function getArticleLocales(slug: string, locales: readonly string[]): Promise<string[]> {
    const found = await Promise.all(
        locales.map(async (locale) => ((await getJournalArticle(locale, slug)) ? locale : null)),
    )
    return found.filter((locale): locale is string => locale !== null)
}

/**
 * Verwandte Artikel, deterministisch priorisiert:
 * 1. gleiche Kategorie  2. gemeinsame Tags  3. aktuelle Artikel.
 * Bei Gleichstand entscheidet das Datum, damit die Auswahl stabil bleibt.
 */
export async function getRelatedArticles(current: JournalMeta, limit = 3): Promise<JournalMeta[]> {
    const all = await getJournalArticles(current.locale)
    const currentTags = new Set(current.tags)

    return all
        .filter((article) => article.slug !== current.slug)
        .map((article) => {
            const sharedTags = article.tags.filter((tag) => currentTags.has(tag)).length
            const score = (article.category === current.category ? 100 : 0) + sharedTags * 10
            return { article, score }
        })
        .sort((a, b) => b.score - a.score || b.article.date.localeCompare(a.article.date))
        .slice(0, limit)
        .map((entry) => entry.article)
}

/* ─── Inhaltsverzeichnis ────────────────────────────────────────────── */

function stripCodeFences(body: string): string {
    return body.replace(/^```[\s\S]*?^```/gm, "")
}

/**
 * Liest H2/H3 aus dem MDX-Body.
 *
 * Wichtig: der Slugger laeuft ueber *alle* Ueberschriften, nicht nur H2/H3.
 * rehype-slug macht beim Rendern dasselbe, und nur so stimmen die erzeugten
 * IDs bei doppelten Titeln auf beiden Seiten ueberein.
 */
export function extractToc(body: string): TocEntry[] {
    const slugger = new GithubSlugger()
    const entries: TocEntry[] = []

    for (const match of stripCodeFences(body).matchAll(/^(#{1,6})\s+(.+?)\s*#*\s*$/gm)) {
        const level = match[1].length
        const text = match[2]
            .replace(/`([^`]+)`/g, "$1")
            .replace(/\*\*([^*]+)\*\*/g, "$1")
            .replace(/\*([^*]+)\*/g, "$1")
            .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
            .trim()

        const id = slugger.slug(text)
        if (level === 2 || level === 3) entries.push({ id, text, level })
    }

    return entries
}

/* ─── Formatierung ──────────────────────────────────────────────────── */

const OG_LOCALES: Record<string, string> = { de: "de_DE", en: "en_US", nl: "nl_NL" }

export function toOgLocale(locale: string): string {
    return OG_LOCALES[locale] ?? "en_US"
}

export function formatArticleDate(date: string, locale: string): string {
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(
        new Date(`${date}T00:00:00Z`),
    )
}
