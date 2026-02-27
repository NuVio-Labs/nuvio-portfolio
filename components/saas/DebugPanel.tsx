"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Bug, ChevronUp, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export function DebugPanel() {
    const pathname = usePathname()
    const { session, isAuthenticated } = useAuth()
    const [isExpanded, setIsExpanded] = useState(false)
    const [onboardingComplete, setOnboardingComplete] = useState<string | null>(null)
    const [unlocked, setUnlocked] = useState<string | null>(null)
    const [isDev, setIsDev] = useState(false)

    useEffect(() => {
        // Only show in development
        if (process.env.NODE_ENV === "development") {
            setIsDev(true)
        }

        // Read flags from localStorage after mount
        const onboarding = localStorage.getItem("nuvio:onboardingComplete")
        const unlock = localStorage.getItem("nuvio:unlocked")
        setOnboardingComplete(onboarding)
        setUnlocked(unlock)

        // Periodic check for local storage changes (optional but helpful for debug)
        const interval = setInterval(() => {
            setOnboardingComplete(localStorage.getItem("nuvio:onboardingComplete"))
            setUnlocked(localStorage.getItem("nuvio:unlocked"))
        }, 2000)

        return () => clearInterval(interval)
    }, [])

    if (!isDev) return null

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            <div className={cn(
                "bg-zinc-900 border border-zinc-800 text-zinc-100 rounded-lg shadow-2xl transition-all duration-300 overflow-hidden",
                isExpanded ? "w-64" : "w-12 h-12"
            )}>
                {/* Header/Toggle */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="w-full h-12 flex items-center justify-center hover:bg-zinc-800 transition-colors"
                >
                    {isExpanded ? (
                        <div className="flex items-center gap-2 px-3 w-full">
                            <Bug className="h-4 w-4 text-purple-400" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-tight">SaaS Debug</span>
                            <ChevronDown className="h-4 w-4 ml-auto text-zinc-500" />
                        </div>
                    ) : (
                        <Bug className="h-5 w-5 text-purple-400" />
                    )}
                </button>

                {/* Content */}
                {isExpanded && (
                    <div className="p-3 space-y-3 border-t border-zinc-800 animate-in fade-in slide-in-from-bottom-2">
                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Pathname</label>
                            <p className="text-[11px] font-mono bg-zinc-950 p-1.5 rounded truncate">{pathname}</p>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Session</label>
                            <div className="flex items-center gap-2">
                                <div className={cn("h-1.5 w-1.5 rounded-full", isAuthenticated ? "bg-green-500" : "bg-red-500")} />
                                <p className="text-[11px] font-mono">{isAuthenticated ? "AUTHENTICATED" : "NO SESSION"}</p>
                            </div>
                        </div>

                        {session && (
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Context</label>
                                <p className="text-[11px] font-mono">{session.role} @ {session.tenantId}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Onboard</label>
                                <p className={cn("text-[10px] font-mono", onboardingComplete === "true" ? "text-green-400" : "text-amber-400")}>
                                    {onboardingComplete === "true" ? "DONE" : "PENDING"}
                                </p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Unlock</label>
                                <p className={cn("text-[10px] font-mono", unlocked === "true" ? "text-green-400" : "text-red-400")}>
                                    {unlocked === "true" ? "YES" : "NO"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
