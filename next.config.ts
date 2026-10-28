import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* Bewusst KEIN experimental.inlineCss: es entfernt zwar die Lighthouse-
     Meldung "Render-blocking requests", schreibt die CSS aber dreifach ins
     HTML (164 -> 317 KB). Gemessen (Median aus 5 Laeufen, Mobil) war die
     Seite damit langsamer: FCP 965 statt 919 ms, Speed Index 1043 statt
     928 ms. Die CSS als eigene, gecachte Datei (~10 KB gzip) ist schneller. */
  turbopack: {
    resolveAlias: {
      /* Next.js liefert immer Polyfills fuer Array.prototype.at/flat/flatMap,
         Object.fromEntries/hasOwn, String.prototype.trimStart/trimEnd u. a.
         Alle Browser, die Next 16 unterstuetzt (Chrome/Edge/Firefox 111+,
         Safari 16.4+), koennen das nativ; die Polyfills sind dort reine
         No-ops und erscheinen in Lighthouse als "Legacy JavaScript". */
      "next/dist/build/polyfills/polyfill-module": "./lib/polyfills/empty.js",
      "../build/polyfills/polyfill-module": "./lib/polyfills/empty.js",
    },
  },
  /* Die Route /api/cv liest Basis-PDF und Schrift zur Laufzeit aus assets/.
     Ohne diesen Eintrag landen die Dateien nicht im Funktionsbuendel. */
  outputFileTracingIncludes: {
    "/api/cv/[dokument]": ["./assets/cv/**", "./assets/fonts/**"],
  },
};

export default withNextIntl(nextConfig);
