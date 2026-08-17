import { SITE_LOGO, SITE_NAME, SITE_URL } from "@/lib/site"
import type { JournalMeta } from "@/lib/journal"

interface JournalStructuredDataProps {
    meta: JournalMeta
    /** Uebersetzte Labels, damit das Markup zur sichtbaren Breadcrumb passt. */
    breadcrumb: { home: string; journal: string; category: string }
}

/**
 * BlogPosting + BreadcrumbList als JSON-LD.
 * Nur Angaben, die tatsaechlich aus dem Frontmatter stammen — keine Ratings
 * oder sonstigen erfundenen Felder.
 */
export function JournalStructuredData({ meta, breadcrumb }: JournalStructuredDataProps) {
    const articleUrl = `${SITE_URL}/${meta.locale}/journal/${meta.slug}`

    const blogPosting = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: meta.title,
        description: meta.description,
        datePublished: meta.date,
        dateModified: meta.updatedAt ?? meta.date,
        inLanguage: meta.locale,
        author: { "@type": "Organization", name: meta.author, url: SITE_URL },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
            logo: { "@type": "ImageObject", url: SITE_LOGO },
        },
        mainEntityOfPage: { "@type": "WebPage", "@id": articleUrl },
        url: articleUrl,
        ...(meta.image ? { image: [`${SITE_URL}${meta.image}`] } : {}),
        ...(meta.tags.length ? { keywords: meta.tags.join(", ") } : {}),
    }

    const breadcrumbList = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: breadcrumb.home, item: `${SITE_URL}/${meta.locale}` },
            {
                "@type": "ListItem",
                position: 2,
                name: breadcrumb.journal,
                item: `${SITE_URL}/${meta.locale}/journal`,
            },
            { "@type": "ListItem", position: 3, name: breadcrumb.category, item: articleUrl },
        ],
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
            />
        </>
    )
}
