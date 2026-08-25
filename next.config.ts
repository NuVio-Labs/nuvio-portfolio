import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  /* Die Route /api/cv liest Basis-PDF und Schrift zur Laufzeit aus assets/.
     Ohne diesen Eintrag landen die Dateien nicht im Funktionsbuendel. */
  outputFileTracingIncludes: {
    "/api/cv/[dokument]": ["./assets/cv/**", "./assets/fonts/**"],
  },
};

export default withNextIntl(nextConfig);
