import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

/* ─── Font ──────────────────────────────────────────── */
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
};

/**
 * Root layout — provides the HTML shell for ALL routes
 * (both [locale] public routes and internal auth/dashboard routes).
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background font-sans antialiased"
        )}
      >
        {children}
      </body>
    </html>
  );
}
