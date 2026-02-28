import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE_URL = "https://www.nuviolabs.de";

export default function sitemap(): MetadataRoute.Sitemap {
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
    }

    return entries;
}
