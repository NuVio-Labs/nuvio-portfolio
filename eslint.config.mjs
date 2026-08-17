import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Werkzeug-Verzeichnisse: fremder Code, nicht Teil der Website.
    ".claude/**",
    ".cursor/**",
    // Mitgelieferte Demo-Seiten werden nicht von uns gepflegt.
    "public/demos/**",
  ]),
]);

export default eslintConfig;
