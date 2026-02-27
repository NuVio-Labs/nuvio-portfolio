"use client"

import { DemoGuard } from "@/components/saas/DemoGuard"

export default function ProtectedLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <DemoGuard>{children}</DemoGuard>
}
