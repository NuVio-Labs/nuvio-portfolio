import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
    locales: ["de", "en", "nl"],
    defaultLocale: "de",
    /* Keine automatische Weiterleitung nach Accept-Language/Cookie: URLs ohne
       Locale-Praefix gehen in proxy.ts immer per 301 auf die Default-Locale,
       damit jede Adresse genau ein stabiles Ziel hat. */
    localeDetection: false,
    /* Keine hreflang-Link-Header aus der Middleware. Sie listen jede Locale
       (auch fuer einsprachige Seiten mit 404) und setzen x-default auf die
       unpraefixierte URL. hreflang kommt ausschliesslich aus den Metadaten
       der Seiten (lib/seo.ts) und aus der Sitemap. */
    alternateLinks: false,
});
