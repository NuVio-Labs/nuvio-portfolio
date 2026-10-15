import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

function hasLocalePrefix(pathname: string): boolean {
    const firstSegment = pathname.split("/")[1] ?? "";
    return (routing.locales as readonly string[]).includes(firstSegment);
}

/**
 * URLs ohne Locale-Praefix ("/", "/contact", "/journal/<slug>") werden
 * dauerhaft (301) auf die Default-Locale umgeleitet. next-intl selbst
 * leitet nur mit 307 um; bei einer temporaeren Weiterleitung behaelt Google
 * die Ausgangs-URL oft im Index, so landeten "/" und "/de" doppelt dort.
 * Query-Parameter (z. B. utm_*) bleiben erhalten.
 */
export default function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (!hasLocalePrefix(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = `/${routing.defaultLocale}${pathname === "/" ? "" : pathname}`;
        return NextResponse.redirect(url, 301);
    }

    return handleI18nRouting(request);
}

export const config = {
    // Match all pathnames except internal Next.js paths, API routes,
    // static files, and auth/dashboard routes (which stay English-only)
    matcher: [
        "/",
        "/(de|en|nl)/:path*",
        "/((?!_next|api|login|dashboard|demos|favicon\\.ico|robots\\.txt|sitemap\\.xml|previews|.*\\..*).*)",
    ],
};
