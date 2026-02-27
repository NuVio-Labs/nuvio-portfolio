import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: ["/login", "/dashboard", "/(protected)/"],
            },
        ],
        sitemap: "https://www.nuviolabs.de/sitemap.xml",
    };
}
