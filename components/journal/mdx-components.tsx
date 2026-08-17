import type { ComponentPropsWithoutRef } from "react"
import { Link } from "@/i18n/navigation"
import { JournalCallout } from "@/components/journal/journal-callout"
import { JournalImage } from "@/components/journal/journal-image"
import { JournalStat, JournalStatGroup } from "@/components/journal/journal-stat"
import { JournalStep, JournalSteps } from "@/components/journal/journal-steps"

/**
 * Zuordnung der Markdown-Elemente auf die NuVio-Typografie.
 *
 * Bewusst ohne @tailwindcss/typography: die Prose-Defaults muessten fast
 * vollstaendig ueberschrieben werden, und die Abstaende hier folgen den
 * bestehenden Section-Rhythmen statt einem fremden Massstab.
 */

function Heading2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
        <h2
            {...props}
            /* Abstand vor der Ueberschrift deutlich groesser als danach —
               dadurch bindet sie sich an ihren Abschnitt statt zu schweben. */
            className="mt-[3.5rem] mb-5 scroll-mt-28 font-heading text-[1.7rem] font-semibold leading-tight tracking-tight text-text-primary sm:text-[2rem]"
        >
            {children}
        </h2>
    )
}

function Heading3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
    return (
        <h3
            {...props}
            className="mt-12 mb-3 scroll-mt-28 font-heading text-[1.2rem] font-semibold leading-snug text-text-primary sm:text-[1.32rem]"
        >
            {children}
        </h3>
    )
}

function Paragraph(props: ComponentPropsWithoutRef<"p">) {
    return <p {...props} className="my-5 text-[1.0625rem] leading-[1.8] text-text-secondary" />
}

function Anchor({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
    const linkClass =
        "font-medium text-text-primary underline decoration-accent/50 underline-offset-[3px] transition-colors hover:decoration-accent hover:text-accent"

    /* Interne Ziele ueber next-intl, damit das Sprachpraefix erhalten bleibt. */
    if (href.startsWith("/")) {
        return (
            <Link href={href} className={linkClass}>
                {children}
            </Link>
        )
    }

    if (href.startsWith("#")) {
        return (
            <a href={href} className={linkClass} {...props}>
                {children}
            </a>
        )
    }

    return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass} {...props}>
            {children}
        </a>
    )
}

function UnorderedList(props: ComponentPropsWithoutRef<"ul">) {
    return (
        <ul
            {...props}
            className="my-6 list-disc space-y-2 pl-6 text-[1.0625rem] leading-[1.8] text-text-secondary marker:text-accent"
        />
    )
}

function OrderedList(props: ComponentPropsWithoutRef<"ol">) {
    return (
        <ol
            {...props}
            className="my-6 list-decimal space-y-2 pl-6 text-[1.0625rem] leading-[1.8] text-text-secondary marker:font-medium marker:text-text-muted"
        />
    )
}

function Blockquote(props: ComponentPropsWithoutRef<"blockquote">) {
    return (
        <blockquote
            {...props}
            className="my-9 border-l-2 border-accent pl-6 text-[1.15rem] font-medium leading-[1.7] text-text-primary [&>p]:my-0 [&>p]:text-[1.15rem] [&>p]:text-text-primary"
        />
    )
}

function InlineCode(props: ComponentPropsWithoutRef<"code">) {
    return (
        <code
            {...props}
            className="rounded-md border border-border-subtle bg-surface-soft px-1.5 py-0.5 font-mono text-[0.875em] text-text-primary"
        />
    )
}

/**
 * Codeblock. Der `pre`-Wrapper scrollt horizontal, damit lange Zeilen auf
 * dem Smartphone nicht abgeschnitten werden und die Seite nicht mitscrollt.
 * tabIndex macht den Scrollbereich per Tastatur erreichbar.
 */
function Pre(props: ComponentPropsWithoutRef<"pre">) {
    return (
        <div className="my-8 overflow-hidden rounded-2xl border border-border-strong bg-surface-raised">
            <pre
                {...props}
                tabIndex={0}
                className="overflow-x-auto p-5 text-[0.85rem] leading-[1.7] [&>code]:border-0 [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-text-secondary"
            />
        </div>
    )
}

function Table(props: ComponentPropsWithoutRef<"table">) {
    return (
        <div
            className="my-8 overflow-x-auto rounded-2xl border border-border-strong bg-surface-raised"
            tabIndex={0}
        >
            <table
                {...props}
                /* Letzte Zeile ohne Unterkante, sonst liegt eine Linie auf der Rundung. */
                className="w-full border-collapse text-left text-[0.95rem] [&_tr:last-child_td]:border-b-0"
            />
        </div>
    )
}

function TableHead(props: ComponentPropsWithoutRef<"th">) {
    return (
        <th
            {...props}
            className="border-b border-border-strong bg-surface-strong px-4 py-3.5 font-heading text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-text-secondary"
        />
    )
}

function TableCell(props: ComponentPropsWithoutRef<"td">) {
    return <td {...props} className="border-b border-border-soft px-4 py-3.5 align-top text-text-secondary" />
}

function HorizontalRule() {
    return <hr className="my-12 border-0 border-t border-border-soft" />
}

function Strong(props: ComponentPropsWithoutRef<"strong">) {
    return <strong {...props} className="font-semibold text-text-primary" />
}

/** Bare Markdown-Bilder bekommen dieselbe Behandlung wie <JournalImage>. */
function MarkdownImage({ src, alt }: ComponentPropsWithoutRef<"img">) {
    if (typeof src !== "string") return null
    return <JournalImage src={src} alt={alt ?? ""} />
}

export const journalMdxComponents = {
    h2: Heading2,
    h3: Heading3,
    p: Paragraph,
    a: Anchor,
    ul: UnorderedList,
    ol: OrderedList,
    blockquote: Blockquote,
    code: InlineCode,
    pre: Pre,
    table: Table,
    th: TableHead,
    td: TableCell,
    hr: HorizontalRule,
    strong: Strong,
    img: MarkdownImage,
    /* In MDX direkt verwendbar */
    JournalCallout,
    JournalImage,
    JournalStat,
    JournalStatGroup,
    JournalStep,
    JournalSteps,
}
