import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nuviolabs.de"),
  title: {
    default: "Axel | Digital Products & Systems",
    template: "%s | Axel"
  },
  description: "Senior Fullstack Engineer & Product Designer specializing in minimalist, high-performance web applications.",
  keywords: ["Fullstack Engineer", "Product Designer", "React", "Next.js", "TypeScript", "Minimalist Design"],
  authors: [{ name: "Axel" }],
  creator: "Axel",
  alternates: {
    canonical: "https://www.nuviolabs.de",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.nuviolabs.de",
    title: "Axel | Digital Products & Systems",
    description: "Senior Fullstack Engineer & Product Designer specializing in minimalist, high-performance web applications.",
    siteName: "Axel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Axel | Digital Products & Systems",
    description: "Senior Fullstack Engineer & Product Designer specializing in minimalist, high-performance web applications.",
    creator: "@axel",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import { AuthProvider } from "@/lib/auth";
import { DebugPanel } from "@/components/saas/DebugPanel";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen bg-background font-sans antialiased")}>
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
