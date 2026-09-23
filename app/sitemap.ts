import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getJournalArticles } from "@/lib/journal";
import { SITE_URL } from "@/lib/site";

/**
 * Indexierbare, statische Seiten je Locale mit Basis-Prioritaet (bei der
 * Default-Locale unveraendert, bei den anderen Locales mit Faktor 0.8
 * skaliert — reproduziert exakt die bisherigen Homepage-Werte 1 / 0.8).
 * `cv/[key]` (noindex) und `contact/sent` (nur noch Weiterleitung) fehlen hier bewusst.
 */
const ROUTES: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/work", priority: 0.7 },
    { path: "/services", priority: 0.7 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
    { path: "/research", priority: 0.4 },
    { path: "/privacy", priority: 0.2 },
    { path: "/imprint", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const entries: MetadataRoute.Sitemap = [];

    for (const locale of routing.locales) {
        for (const route of ROUTES) {
            entries.push({
                url: `${SITE_URL}/${locale}${route.path}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: locale === routing.defaultLocale ? route.priority : route.priority * 0.8,
            });
        }

        /* Journal-Uebersicht und alle in dieser Sprache vorhandenen Artikel. */
        const articles = await getJournalArticles(locale);

        entries.push({
            url: `${SITE_URL}/${locale}/journal`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: locale === routing.defaultLocale ? 0.8 : 0.6,
        });

        for (const article of articles) {
            entries.push({
                url: `${SITE_URL}/${locale}/journal/${article.slug}`,
                lastModified: new Date(article.updatedAt ?? article.date),
                changeFrequency: "monthly",
                priority: locale === routing.defaultLocale ? 0.7 : 0.5,
            });
        }
    }

    /* Lokale SEO-Landingpages, nur fuer Deutsch (siehe jeweiliges page.tsx). */
    entries.push({
        url: `${SITE_URL}/de/webdesign-kranenburg`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
    });
    entries.push({
        url: `${SITE_URL}/de/webdesign-kleve`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
    });

    /* Lokale SEO-Landingpage, nur fuer Niederlaendisch (siehe app/[locale]/webdesign-groesbeek/page.tsx). */
    entries.push({
        url: `${SITE_URL}/nl/webdesign-groesbeek`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
    });

    return entries;
}
