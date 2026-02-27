"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface DemoSession {
    tenantId: string
    role: string
    createdAt: string
}

interface AuthContextType {
    session: DemoSession | null
    loginWithTenant: (tenantId: string, role: string) => void
    logout: () => void
    isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const SESSION_KEY = "nuvio:session"

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<DemoSession | null>(null)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()

    useEffect(() => {
        setMounted(true)
        // Check localStorage for session after mount
        const storedSession = localStorage.getItem(SESSION_KEY)
        if (storedSession) {
            try {
                setSession(JSON.parse(storedSession))
            } catch (e) {
                localStorage.removeItem(SESSION_KEY)
            }
        }
    }, [])

    const loginWithTenant = (tenantId: string, role: string) => {
        const newSession: DemoSession = {
            tenantId,
            role,
            createdAt: new Date().toISOString()
        }
        setSession(newSession)
        localStorage.setItem(SESSION_KEY, JSON.stringify(newSession))
        router.push("/dashboard")
    }

    const logout = () => {
        setSession(null)
        localStorage.removeItem(SESSION_KEY)
        router.push("/login")
    }

    return (
        <AuthContext.Provider
            value={{
                session,
                loginWithTenant,
                logout,
                isAuthenticated: !!session,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}
