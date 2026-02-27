"use client"

import { useState, useEffect } from "react"
import { X, ShieldAlert, Cpu, CheckCircle2, Info, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { Module } from "@/data/nuvioData"
import { Badge } from "@/components/ui/badge"

interface ModuleModalProps {
    isOpen: boolean
    onClose: () => void
    module: Module | null
    tenantId: string
    role: string
}

export function ModuleModal({ isOpen, onClose, module, tenantId, role }: ModuleModalProps) {
    const [activeTab, setActiveTab] = useState<"data" | "edit">("data")
    const [isSaving, setIsSaving] = useState(false)
    const [showToast, setShowToast] = useState(false)

    // Reset tab when modal changes
    useEffect(() => {
        if (isOpen) {
            setActiveTab("data")
            setShowToast(false)
        }
    }, [isOpen, module])

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }
        if (isOpen) window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, onClose])

    if (!isOpen || !module) return null

    const data = module.demoData(tenantId)
    const isViewer = role === "viewer"

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault()
        setIsSaving(true)

        // Simulate progress
        setTimeout(() => {
            setIsSaving(false)
            setShowToast(true)
            // Auto-hide toast after 5 seconds
            setTimeout(() => setShowToast(false), 5000)
        }, 1500)
    }

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative w-full max-w-4xl bg-card border border-border shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                            <Cpu className="h-5 w-5 text-purple-600" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">NuVio {module.name}</h2>
                            <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
                                <Info className="h-3 w-3" />
                                Demo Environment • Deterministic Dataset
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Navigation Tabs */}
                <div className="flex px-6 pt-4 bg-muted/10 border-b border-border">
                    <button
                        onClick={() => setActiveTab("data")}
                        className={cn(
                            "px-4 py-2 text-sm font-medium border-b-2 transition-all",
                            activeTab === "data"
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Data Explorer
                    </button>
                    <button
                        onClick={() => setActiveTab("edit")}
                        className={cn(
                            "px-4 py-2 text-sm font-medium border-b-2 transition-all flex items-center gap-2",
                            activeTab === "edit"
                                ? "border-purple-500 text-purple-600"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                        )}
                    >
                        {isViewer && <Lock className="h-3 w-3" />}
                        Simulated Edit
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {activeTab === "data" ? (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-muted/20 border-border/50">
                                    <div className="p-4 flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Status</span>
                                        <div className="flex items-center gap-2 text-sm font-bold">
                                            <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                            Active
                                        </div>
                                    </div>
                                </Card>
                                <Card className="bg-muted/20 border-border/50">
                                    <div className="p-4 flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Modality</span>
                                        <div className="flex items-center gap-2 text-sm font-bold">
                                            Read / Simulated Write
                                        </div>
                                    </div>
                                </Card>
                                <Card className="bg-muted/20 border-border/50">
                                    <div className="p-4 flex flex-col gap-1">
                                        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Source</span>
                                        <div className="flex items-center gap-2 text-sm font-bold">
                                            Core Registry
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            <div className="rounded-xl border border-border overflow-hidden bg-muted/5">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-muted/50 border-b border-border">
                                        <tr>
                                            {data.headers.map(h => (
                                                <th key={h} className="px-4 py-3 font-medium text-muted-foreground">{h}</th>
                                            ))}
                                            <th className="px-4 py-3 font-medium text-muted-foreground text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border">
                                        {data.rows.map((row, idx) => (
                                            <tr key={idx} className="hover:bg-muted/30 transition-colors">
                                                {Object.values(row).map((val: any, vIdx) => (
                                                    <td key={vIdx} className="px-4 py-3 font-medium">
                                                        {val === "Active" || val === "Signed" ? (
                                                            <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-600 uppercase tracking-tighter">
                                                                {val}
                                                            </span>
                                                        ) : val}
                                                    </td>
                                                ))}
                                                <td className="px-4 py-3 text-right">
                                                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setActiveTab("edit")}>
                                                        Details
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-xl mx-auto space-y-8 py-4">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-purple-500/5 border border-purple-500/10">
                                <ShieldAlert className="h-5 w-5 text-purple-600" />
                                <div className="text-sm">
                                    <p className="font-bold text-purple-900">Module Simulation Mode</p>
                                    <p className="text-purple-600/80">You can interact with this form, but changes will not be persisted to the server.</p>
                                </div>
                            </div>

                            <form onSubmit={handleSave} className="space-y-6">
                                {data.fields.map(field => (
                                    <div key={field.name} className="space-y-2">
                                        <Label htmlFor={field.name}>{field.label}</Label>
                                        <Input
                                            id={field.name}
                                            name={field.name}
                                            type={field.type}
                                            defaultValue={field.value}
                                            placeholder={field.placeholder}
                                            disabled={isViewer || isSaving}
                                            className="bg-muted/20"
                                        />
                                    </div>
                                ))}

                                <div className="pt-4 flex items-center justify-between">
                                    <p className="text-xs text-muted-foreground">
                                        Role: <span className="font-bold uppercase tracking-tight text-foreground">{role}</span>
                                    </p>
                                    <div className="flex items-center gap-3">
                                        <Badge variant="outline" className="opacity-70 bg-muted/50 font-mono text-[9px] uppercase tracking-tighter">
                                            Demo Mode Only
                                        </Badge>
                                        <Button
                                            type="submit"
                                            disabled={isViewer || isSaving}
                                            className="bg-purple-600 hover:bg-purple-700 text-white min-w-[120px]"
                                        >
                                            {isSaving ? "Simulating..." : "Save Changes"}
                                        </Button>
                                    </div>
                                </div>
                            </form>

                            {isViewer && (
                                <p className="text-xs text-center text-red-500 font-medium">
                                    Note: Viewer role permissions are read-only for this module.
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer Feedback */}
                {showToast && (
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[110] animate-in slide-in-from-bottom-4">
                        <div className="flex items-center gap-3 px-6 py-3 bg-zinc-900 text-white rounded-full shadow-2xl border border-white/10">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            <span className="text-sm font-medium">Demo Mode: Processing blocked. Data remains stable.</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
