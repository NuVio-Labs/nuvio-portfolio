"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Container } from "@/components/layout/container"
import { Loader2 } from "lucide-react"

export function DemoGuard({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [isChecking, setIsChecking] = useState(true)

    useEffect(() => {
        // Read from localStorage after mount to avoid hydration mismatch
        const session = typeof window !== "undefined" ? localStorage.getItem("nuvio:session") : null

        if (!session) {
            router.replace("/login")
        } else {
            setIsChecking(false)
        }
    }, [router])

    if (isChecking) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <Container>
                    <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
                        <div className="h-10 w-10 rounded-full bg-purple-500/10 flex items-center justify-center">
                            <Loader2 className="h-5 w-5 text-purple-600 animate-spin" />
                        </div>
                        <div className="space-y-1 text-center">
                            <p className="text-sm font-medium">Verifying SaaS Session</p>
                            <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">Secure Access</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return <>{children}</>
}
