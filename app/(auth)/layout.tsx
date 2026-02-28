"use client"

import { AuthProvider } from "@/lib/auth"
import { ThemeProvider } from "@/components/theme-provider"

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
        </AuthProvider>
    )
}
