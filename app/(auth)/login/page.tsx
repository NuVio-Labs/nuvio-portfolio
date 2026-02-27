"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

const TENANTS = [
    { id: "acme", name: "Acme Corporation" },
    { id: "globaltech", name: "GlobalTech Industries" },
    { id: "startupx", name: "StartupX" },
    { id: "fleet", name: "Fleet Tenant (All Modules)" }
]

const ROLES = [
    { id: "admin", name: "Admin" },
    { id: "editor", name: "Editor" },
    { id: "viewer", name: "Viewer" }
]

export default function LoginPage() {
    const { loginWithTenant, session } = useAuth()
    const [selectedTenant, setSelectedTenant] = useState("acme")
    const [selectedRole, setSelectedRole] = useState("admin")
    const [hasExistingSession, setHasExistingSession] = useState(false)

    useEffect(() => {
        // Check for existing session after mount
        const storedSession = localStorage.getItem("nuvio:session")
        setHasExistingSession(!!storedSession)
    }, [])

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        loginWithTenant(selectedTenant, selectedRole)
    }

    const handleContinueSession = () => {
        if (session) {
            loginWithTenant(session.tenantId, session.role)
        }
    }

    const handleClearSession = () => {
        localStorage.removeItem("nuvio:session")
        setHasExistingSession(false)
    }

    return (
        <div className="container relative flex h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
            <Link
                href="/"
                className="absolute left-4 top-4 md:left-8 md:top-8 inline-flex items-center text-sm font-medium hover:underline"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Link>

            <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                <div className="absolute inset-0 bg-zinc-900" />
                <div className="relative z-20 flex items-center text-lg font-medium">
                    <div className="mr-2 h-3 w-3 rounded-full bg-purple-500" />
                    NuVio Platform.
                </div>
                <div className="relative z-20 mt-auto">
                    <p className="text-sm text-muted-foreground/80">
                        &copy; 2026 NuVioLabs
                    </p>
                </div>
            </div>
            <div className="p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2 lg:hidden">
                            <div className="h-2 w-2 rounded-full bg-purple-500" />
                            <span className="text-xs font-medium font-mono text-muted-foreground">NUVIO PLATFORM</span>
                        </div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Welcome to NuVio
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Select your tenant and role to enter the demo
                        </p>
                    </div>

                    <div className="grid gap-6">
                        {hasExistingSession && session && (
                            <div className="p-4 rounded-lg bg-muted/50 border space-y-3">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Continue last session</p>
                                <div className="flex gap-2">
                                    <Button
                                        onClick={handleContinueSession}
                                        className="flex-1 text-xs"
                                        size="sm"
                                    >
                                        {session.role} @ {session.tenantId}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={handleClearSession}
                                        size="sm"
                                        className="text-xs"
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleLogin}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="tenant">
                                        Tenant
                                    </label>
                                    <select
                                        id="tenant"
                                        value={selectedTenant}
                                        onChange={(e) => setSelectedTenant(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {TENANTS.map(tenant => (
                                            <option key={tenant.id} value={tenant.id}>
                                                {tenant.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid gap-2">
                                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="role">
                                        Role
                                    </label>
                                    <select
                                        id="role"
                                        value={selectedRole}
                                        onChange={(e) => setSelectedRole(e.target.value)}
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        {ROLES.map(role => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <Button size="lg" className="mt-2">
                                    Enter Demo
                                </Button>
                            </div>
                        </form>
                    </div>

                    <p className="px-8 text-center text-xs text-muted-foreground leading-relaxed">
                        This is a demo environment. No real authentication is required. Insights are stored locally.
                    </p>
                </div>
            </div>
        </div>
    )
}
