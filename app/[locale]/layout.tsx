import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuthProvider } from "@/lib/auth";

/* ─── Production SEO Metadata ───────────────────────── */
const SITE_URL = "https://www.nuviolabs.de";

type Params = { locale: string };

export async function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<Params>;
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: "seo.home" });

    return {
        metadataBase: new URL(SITE_URL),

        title: {
            default: t("title"),
            template: `%s | NuVioLabs`,
        },

        description: t("description"),

        keywords: [
            "Junior Developer",
            "Fullstack Developer",
            "Self-Taught",
            "React",
            "Next.js",
            "TypeScript",
            "Portfolio",
        ],

        authors: [{ name: "NuVioLabs", url: SITE_URL }],
        creator: "NuVioLabs",
        publisher: "NuVioLabs",

        robots: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },

        alternates: {
            canonical: `${SITE_URL}/${locale}`,
            languages: {
                de: `${SITE_URL}/de`,
                en: `${SITE_URL}/en`,
                nl: `${SITE_URL}/nl`,
            },
        },

        openGraph: {
            type: "website",
            locale: locale === "de" ? "de_DE" : locale === "nl" ? "nl_NL" : "en_US",
            url: `${SITE_URL}/${locale}`,
            siteName: "NuVioLabs",
            title: t("title"),
            description: t("description"),
        },

        twitter: {
            card: "summary_large_image",
            title: t("title"),
            description: t("description"),
        },

        formatDetection: {
            telephone: false,
            email: false,
            address: false,
        },
    };
}

/* ─── Locale Layout (providers only, no html/body) ── */
export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<Params>;
}) {
    const { locale } = await params;

    // Validate locale
    if (!routing.locales.includes(locale as typeof routing.locales[number])) {
        notFound();
    }

    const messages = await getMessages();
    const t = await getTranslations();

    return (
        <>
            {/* Set html lang attribute via script to match locale */}
            <script
                dangerouslySetInnerHTML={{
                    __html: `document.documentElement.lang="${locale}"`,
                }}
            />
            {/* Skip-to-content link */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-medium focus:shadow-lg"
            >
                {t("skipToContent")}
            </a>
            <NextIntlClientProvider messages={messages}>
                <AuthProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <div className="relative flex min-h-screen flex-col">
                            <Navbar />
                            <main id="main-content" className="flex-1">
                                {children}
                            </main>
                            <Footer />
                        </div>
                    </ThemeProvider>
                </AuthProvider>
            </NextIntlClientProvider>
        </>
    );
}
