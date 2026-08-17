import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"
import { cn } from "@/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  icons: { icon: "/favicon.ico" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={cn(
          geist.variable,
          geistMono.variable,
          "min-h-screen bg-background antialiased"
        )}
        style={{
          fontFamily: "var(--font-geist), system-ui, sans-serif",
        }}
      >
        {children}
        {/* Cookielose Zugriffs- und Ladezeitmessung. Nur in der Vercel-Umgebung aktiv. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
