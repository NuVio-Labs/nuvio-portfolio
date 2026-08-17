import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getJournalArticles } from "@/lib/journal";

const SITE_URL = "https://www.nuviolabs.de";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const routes = [""];
    const entries: MetadataRoute.Sitemap = [];

    for (const locale of routing.locales) {
        for (const route of routes) {
            entries.push({
                url: `${SITE_URL}/${locale}${route}`,
                lastModified: new Date(),
                changeFrequency: "weekly",
                priority: locale === routing.defaultLocale ? 1 : 0.8,
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

    return entries;
}
