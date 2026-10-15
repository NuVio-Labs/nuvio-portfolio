import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                /* Endpunkte ohne indexierbaren Inhalt (Kontaktformular,
                   Likes, generierte Bewerbungs-PDFs). */
                disallow: ["/api/"],
            },
        ],
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
