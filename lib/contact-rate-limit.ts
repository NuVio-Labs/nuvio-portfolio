import "server-only"
import { createHash } from "node:crypto"

/**
 * Rate Limit fuer /api/contact: hoechstens MAX_REQUESTS Anfragen je IP
 * innerhalb von WINDOW_SECONDS. Grosszuegig genug fuer Tippfehler und
 * erneute Versuche nach einem Fehler, eng genug gegen Massenversand.
 *
 * Primaer ueber das bereits vorhandene Upstash Redis (dieselben Variablen wie
 * lib/journal-likes.ts). Gespeichert wird nur ein SHA-256-Hash der IP als
 * Schluessel mit Zaehler; Redis loescht ihn nach Ablauf des Fensters selbst.
 *
 * Ohne Upstash (lokal) oder bei einer Stoerung faellt der Zaehler auf den
 * Arbeitsspeicher der Serverinstanz zurueck. Das ist pro Instanz und damit
 * schwaecher, blockiert aber nie normale Anfragen wegen eines Ausfalls.
 */

const MAX_REQUESTS = 5
const WINDOW_SECONDS = 10 * 60

const REST_URL = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL
const REST_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN

function hashIp(ip: string): string {
    return createHash("sha256").update(ip).digest("hex")
}

/** Zaehlt atomar hoch; das Ablaufdatum wird nur beim ersten Treffer gesetzt. */
async function countWithUpstash(key: string): Promise<number | null> {
    if (!REST_URL || !REST_TOKEN) return null
    try {
        const res = await fetch(`${REST_URL}/pipeline`, {
            method: "POST",
            headers: { Authorization: `Bearer ${REST_TOKEN}`, "Content-Type": "application/json" },
            body: JSON.stringify([
                ["SET", key, "0", "EX", String(WINDOW_SECONDS), "NX"],
                ["INCR", key],
            ]),
            cache: "no-store",
        })
        if (!res.ok) return null
        const results = (await res.json()) as { result?: unknown; error?: string }[]
        const count = results[1]?.result
        return typeof count === "number" ? count : null
    } catch {
        return null
    }
}

const memory = new Map<string, { count: number; resetAt: number }>()

function countInMemory(key: string): number {
    const now = Date.now()
    if (memory.size > 1000) {
        for (const [k, entry] of memory) if (entry.resetAt <= now) memory.delete(k)
    }
    const entry = memory.get(key)
    if (!entry || entry.resetAt <= now) {
        memory.set(key, { count: 1, resetAt: now + WINDOW_SECONDS * 1000 })
        return 1
    }
    entry.count++
    return entry.count
}

export async function isContactRateLimited(ip: string): Promise<boolean> {
    const key = `contact:rl:${hashIp(ip)}`
    const count = (await countWithUpstash(key)) ?? countInMemory(key)
    return count > MAX_REQUESTS
}
