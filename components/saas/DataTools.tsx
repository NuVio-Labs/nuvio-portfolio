"use client"

import { useState, useEffect } from "react"
import { Lock, Unlock, Download, Upload, Copy, Check, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UNLOCK_CODE } from "@/data/nuvioUnlock"
import { useAuth } from "@/lib/auth"
import { cn } from "@/lib/utils"

const UNLOCKED_KEY = "nuvio:unlocked"

export function DataTools() {
    const { session } = useAuth()
    const [isUnlocked, setIsUnlocked] = useState(false)
    const [unlockInput, setUnlockInput] = useState("")
    const [showError, setShowError] = useState(false)
    const [copySuccess, setCopySuccess] = useState(false)
    const [importText, setImportText] = useState("")
    const [importError, setImportError] = useState<string | null>(null)
    const [showConfirmOverwrite, setShowConfirmOverwrite] = useState(false)
    const [importData, setImportData] = useState<any>(null)

    useEffect(() => {
        const unlocked = localStorage.getItem(UNLOCKED_KEY)
        if (unlocked === "true") {
            setIsUnlocked(true)
        }
    }, [])

    const handleUnlock = () => {
        if (unlockInput === UNLOCK_CODE) {
            setIsUnlocked(true)
            localStorage.setItem(UNLOCKED_KEY, "true")
            setShowError(false)
            setUnlockInput("")
        } else {
            setShowError(true)
        }
    }

    const handleExport = () => {
        if (!session) return

        const exportData = {
            version: 1,
            tenantId: session.tenantId,
            exportedAt: new Date().toISOString(),
            data: {
                // Mock demo data
                fleet: [/* ... */],
                clients: [/* ... */],
                staff: [/* ... */]
            }
        }

        const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: "application/json" })
        const url = URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `nuvio-export-${session.tenantId}-${new Date().toISOString().split('T')[0]}.json`
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        URL.revokeObjectURL(url)
    }

    const handleCopyToClipboard = () => {
        if (!session) return

        const exportData = {
            version: 1,
            tenantId: session.tenantId,
            exportedAt: new Date().toISOString(),
            data: { /* ... */ }
        }

        navigator.clipboard.writeText(JSON.stringify(exportData, null, 2))
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
    }

    const validateAndPrepareImport = (jsonStr: string) => {
        try {
            const data = JSON.parse(jsonStr)

            if (data.version !== 1) {
                setImportError("Mismatched version. Expected version 1.")
                return
            }

            if (!data.tenantId || !data.data) {
                setImportError("Invalid data format. Missing required fields.")
                return
            }

            setImportData(data)
            setImportError(null)

            if (data.tenantId !== session?.tenantId) {
                setShowConfirmOverwrite(true)
            } else {
                // If it matches, we still confirm because it's an overwrite
                setShowConfirmOverwrite(true)
            }
        } catch (e) {
            setImportError("Invalid JSON format.")
        }
    }

    const handleImport = () => {
        if (!importData) return

        // Simulate save to store and localStorage
        // Import data for tenant (simulated)
        // localStorage.setItem(`nuvio:data:${session?.tenantId}`, JSON.stringify(importData.data))

        setShowConfirmOverwrite(false)
        setImportText("")
        setImportData(null)
        alert("Import successful! (Simulated)")
    }

    return (
        <div className="space-y-6">
            {!isUnlocked ? (
                <div className="p-8 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-center space-y-4 bg-muted/20">
                    <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <Lock className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div>
                        <h4 className="font-semibold text-lg">Data Tools Restricted</h4>
                        <p className="text-sm text-muted-foreground max-w-sm mt-1">
                            Export and import functionality is locked by default. Enter the developer unlock code to gain access.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                placeholder="Enter Unlock Code"
                                value={unlockInput}
                                onChange={(e) => setUnlockInput(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleUnlock()}
                                className="w-48 text-center uppercase font-mono text-xs tracking-widest"
                            />
                            <Button onClick={handleUnlock}>Unlock</Button>
                        </div>
                        {showError && (
                            <p className="text-xs text-destructive font-medium flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                Invalid Code
                            </p>
                        )}
                        <p className="text-[10px] text-muted-foreground mt-2">
                            Hint: Local demo unlock code is <code className="bg-muted px-1 rounded">NUVIO-ADMIN</code>
                        </p>
                    </div>
                </div>
            ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    {/* Unlocked Header */}
                    <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center text-green-600 dark:text-green-400">
                                <Unlock className="h-4 w-4" />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-green-700 dark:text-green-300">Data Tools Unlocked</p>
                                <p className="text-xs text-green-600 dark:text-green-400 opacity-80">Full export/import access enabled for {session?.tenantId}</p>
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setIsUnlocked(false)
                                localStorage.removeItem(UNLOCKED_KEY)
                            }}
                            className="text-xs text-green-700 dark:text-green-300 hover:bg-green-500/20"
                        >
                            Lock Session
                        </Button>
                    </div>

                    {/* Export Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Export Data</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg border bg-card space-y-3">
                                <div className="flex items-center gap-2">
                                    <Download className="h-4 w-4 text-purple-500" />
                                    <h5 className="font-medium text-sm">Download as JSON</h5>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Export current tenant ({session?.tenantId}) dataset as a local JSON file.
                                </p>
                                <Button size="sm" onClick={handleExport} className="w-full">
                                    Download JSON
                                </Button>
                            </div>
                            <div className="p-4 rounded-lg border bg-card space-y-3">
                                <div className="flex items-center gap-2">
                                    <Copy className="h-4 w-4 text-purple-500" />
                                    <h5 className="font-medium text-sm">Copy to Clipboard</h5>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Copy the serialized demo state to your clipboard for quick transfer.
                                </p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={handleCopyToClipboard}
                                    className="w-full"
                                >
                                    {copySuccess ? <Check className="h-4 w-4 mr-2" /> : null}
                                    {copySuccess ? "Copied!" : "Copy JSON"}
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Import Section */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Import Data</h4>
                        <div className="p-4 rounded-lg border bg-card space-y-4">
                            <div className="flex items-center gap-2">
                                <Upload className="h-4 w-4 text-purple-500" />
                                <h5 className="font-medium text-sm">Restore from JSON</h5>
                            </div>
                            <textarea
                                value={importText}
                                onChange={(e) => setImportText(e.target.value)}
                                placeholder="Paste NuVio JSON export here..."
                                className="w-full h-32 p-3 text-xs font-mono rounded-md border bg-muted/50 focus:outline-none focus:ring-1 focus:ring-purple-500"
                            />
                            {importError && (
                                <p className="text-xs text-destructive flex items-center gap-1 font-medium italic">
                                    <AlertCircle className="h-3 w-3" />
                                    {importError}
                                </p>
                            )}
                            <Button
                                disabled={!importText.trim()}
                                onClick={() => validateAndPrepareImport(importText)}
                                className="w-full"
                            >
                                Validate & Import
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Overwrite Confirmation Dialog (Simple Simulation) */}
            {showConfirmOverwrite && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 backdrop-blur-sm px-4">
                    <div className="bg-card border rounded-xl shadow-2xl max-w-md w-full p-6 space-y-4 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center gap-3 text-amber-500 font-bold">
                            <AlertCircle className="h-6 w-6" />
                            Confirm Overwrite
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Warning: Importing this data will **permanently overwrite** your current demo state for tenant <span className="font-mono bg-muted px-1 rounded">{session?.tenantId}</span>.
                            {importData?.tenantId !== session?.tenantId && (
                                <span className="block mt-2 font-semibold text-destructive italic">
                                    Note: You are importing data from a different tenant ({importData?.tenantId}).
                                </span>
                            )}
                        </p>
                        <div className="flex gap-2 pt-2">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={() => setShowConfirmOverwrite(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                                onClick={handleImport}
                            >
                                Overwrite & Restore
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
