"use client"

import { useState, useEffect } from "react"
import { SEED_DATA, TenantData } from "@/data/nuvioData"

export function useTenantData(tenantId: string | undefined) {
    const [data, setData] = useState<TenantData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!tenantId) return

        const storageKey = `nuvio:data:${tenantId}`
        const storedData = localStorage.getItem(storageKey)

        if (storedData) {
            try {
                setData(JSON.parse(storedData))
            } catch (e) {
                console.error("Failed to parse tenant data", e)
                const initial = SEED_DATA[tenantId] || SEED_DATA.acme
                setData(initial)
                localStorage.setItem(storageKey, JSON.stringify(initial))
            }
        } else {
            const initial = SEED_DATA[tenantId] || SEED_DATA.acme
            setData(initial)
            localStorage.setItem(storageKey, JSON.stringify(initial))
        }

        setLoading(false)
    }, [tenantId])

    const updateData = (newData: Partial<TenantData>) => {
        if (!tenantId || !data) return

        const updated = { ...data, ...newData }
        setData(updated)
        localStorage.setItem(`nuvio:data:${tenantId}`, JSON.stringify(updated))
    }

    const resetData = () => {
        if (!tenantId) return
        const initial = SEED_DATA[tenantId] || SEED_DATA.acme
        setData(initial)
        localStorage.setItem(`nuvio:data:${tenantId}`, JSON.stringify(initial))
    }

    return {
        data: data || SEED_DATA.acme, // Fallback to acme if null
        loading,
        updateData,
        resetData
    }
}
