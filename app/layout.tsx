import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/lib/auth";
import { DebugPanel } from "@/components/saas/DebugPanel";

/* ─── Font ──────────────────────────────────────────── */
const inter = Inter({ subsets: ["latin"], display: "swap" });

/* ─── Production SEO Metadata ───────────────────────── */
const SITE_URL = "https://www.nuviolabs.de";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "NuVioLabs | Junior Fullstack Developer",
    template: "%s | NuVioLabs",
  },

  description:
    "Self-taught junior fullstack developer documenting a learning journey — building real projects with React, Next.js & TypeScript.",

  keywords: [
    "Junior Developer",
    "Fullstack Developer",
    "Self-Taught",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Learning Journey",
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
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "NuVioLabs",
  },

  twitter: {
    card: "summary_large_image",
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },

  icons: {
    icon: "/favicon.ico",
  },
};

/* ─── Root Layout ─────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="relative flex min-h-screen flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <DebugPanel />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
