import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
    // Match all pathnames except internal Next.js paths, API routes,
    // static files, and auth/dashboard routes (which stay English-only)
    matcher: [
        "/",
        "/(de|en|nl)/:path*",
        "/((?!_next|api|login|dashboard|demos|favicon\\.ico|robots\\.txt|sitemap\\.xml|previews|.*\\..*).*)",
    ],
};
