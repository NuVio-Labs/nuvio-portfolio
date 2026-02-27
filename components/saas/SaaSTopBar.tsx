"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { StatusPill } from "./StatusPill"
import Link from "next/link"
import { Settings, LayoutDashboard, LogOut, Play } from "lucide-react"

interface SaaSTopBarProps {
    title: string
    subtitle?: string
    onStartTour?: () => void
}

export function SaaSTopBar({ title, subtitle, onStartTour }: SaaSTopBarProps) {
    const { session, logout } = useAuth()

    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    {subtitle ? (
                        <p className="text-muted-foreground">{subtitle}</p>
                    ) : (
                        <p className="text-muted-foreground">
                            {session?.tenantId} · {session?.role}
                        </p>
                    )}
                </div>

                <nav className="hidden md:flex items-center gap-4 border-l pl-6">
                    <Link
                        href="/dashboard"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <LayoutDashboard className="h-4 w-4" />
                        Dashboard
                    </Link>
                    <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <Settings className="h-4 w-4" />
                        Settings
                    </Link>
                </nav>
            </div>

            <div className="flex items-center gap-3">
                {onStartTour && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onStartTour}
                        className="flex items-center gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                    >
                        <Play className="h-3.5 w-3.5 fill-current" />
                        Start Tour
                    </Button>
                )}
                <StatusPill />
                <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="flex items-center gap-2"
                >
                    <LogOut className="h-3.5 w-3.5" />
                    Logout
                </Button>
            </div>
        </div>
    )
}
