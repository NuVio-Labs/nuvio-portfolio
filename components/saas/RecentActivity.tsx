"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
    Package, Users, FileText, Settings,
    Cpu, Zap, FlaskConical, Layout,
    Clock, CheckCircle2, Info, X,
    CreditCard, ShieldCheck, AlertCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Activity {
    id: string
    module: string
    title: string
    description: string
    timestamp: string
    relativeTime: string
    amount?: string
    icon: React.ElementType
    color: string
    metadata: Record<string, string>
}

const MODULE_CONFIG: Record<string, { icon: React.ElementType, color: string }> = {
    fleet: { icon: Package, color: "text-purple-500 bg-purple-500/10" },
    clients: { icon: Users, color: "text-blue-500 bg-blue-500/10" },
    staff: { icon: ShieldCheck, color: "text-emerald-500 bg-emerald-500/10" },
    docs: { icon: FileText, color: "text-amber-500 bg-amber-500/10" },
    plan: { icon: Layout, color: "text-indigo-500 bg-indigo-500/10" },
    edge: { icon: Cpu, color: "text-zinc-500 bg-zinc-500/10" },
    lab: { icon: FlaskConical, color: "text-pink-500 bg-pink-500/10" },
    settings: { icon: Settings, color: "text-zinc-400 bg-zinc-400/10" }
}

const ACTIVITY_TEMPLATES = [
    { module: "fleet", title: "Vehicle provisioned", weight: 3, description: "New Mercedes Sprinter added to registry" },
    { module: "fleet", title: "Status update", weight: 3, description: "Vehicle FL-101 moved to Maintenance" },
    { module: "clients", title: "Invoiced generated", weight: 4, description: "Monthly logistics master bill created", isFinancial: true },
    { module: "clients", title: "Payment received", weight: 4, description: "Standard Service Agreement payment", isFinancial: true },
    { module: "docs", title: "Compliance report", weight: 3, description: "Exported audit documentation for Q1" },
    { module: "staff", title: "Access granted", weight: 2, description: "Senior Dispatcher role assigned to S. Miller" },
    { module: "edge", title: "Job executed", weight: 2, description: "Automated route optimization complete" },
    { module: "lab", title: "Feature toggled", weight: 1, description: "Neural Routing alpha group expanded" },
    { module: "plan", title: "Schedule updated", weight: 2, description: "Transition roadmap to EV finalized" }
]

export function RecentActivity({ tenantId }: { tenantId: string }) {
    const [activities, setActivities] = useState<Activity[]>([])
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Initial seed
    useEffect(() => {
        const initial = Array.from({ length: 6 }).map((_, i) => generateActivity(i))
        setActivities(initial)
    }, [])

    // Live Ticker Simulation
    useEffect(() => {
        const interval = setInterval(() => {
            const next = generateActivity(Date.now())
            setActivities(prev => {
                const updated = [next, ...prev]
                if (updated.length > 8) updated.pop()
                return updated
            })
        }, 6000)

        return () => clearInterval(interval)
    }, [])

    function generateActivity(seed: number): Activity {
        // Weighted random selection
        const pool: typeof ACTIVITY_TEMPLATES = []
        ACTIVITY_TEMPLATES.forEach(t => {
            for (let i = 0; i < t.weight; i++) pool.push(t)
        })
        const template = pool[Math.floor(Math.random() * pool.length)]
        const config = MODULE_CONFIG[template.module]

        const id = `ACT-${seed}-${Math.floor(Math.random() * 1000)}`
        const amount = template.isFinancial ? `$${(Math.floor(Math.random() * 15000) + 500).toLocaleString()}` : undefined

        return {
            id,
            module: template.module,
            title: template.title,
            description: template.description,
            timestamp: new Date().toISOString(),
            relativeTime: "Just now",
            amount,
            icon: config.icon,
            color: config.color,
            metadata: {
                "Event ID": id,
                "Tenant": tenantId.toUpperCase(),
                "Actor": "NuVio Core Sys",
                "Node": "eur-central-1a"
            }
        }
    }

    return (
        <>
            <Card className="col-span-3">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-pulse-blue border border-blue-500/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-tighter">Live Feed</span>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4 relative min-h-[380px]">
                        <AnimatePresence initial={false}>
                            {activities.map((act) => (
                                <motion.div
                                    key={act.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="group cursor-pointer p-3 rounded-xl border border-transparent hover:border-border/50 hover:bg-muted/30 transition-all duration-200"
                                    onClick={() => {
                                        setSelectedActivity(act)
                                        setIsModalOpen(true)
                                    }}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={cn("mt-0.5 h-8 w-8 rounded-lg flex items-center justify-center shrink-0", act.color)}>
                                            <act.icon className="h-4 w-4" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <p className="text-xs font-bold text-foreground truncate">{act.title}</p>
                                                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{act.relativeTime}</span>
                                            </div>
                                            <p className="text-[10px] text-muted-foreground truncate mt-0.5">{act.description}</p>
                                            {act.amount && (
                                                <p className="text-xs font-mono font-bold text-foreground mt-1">{act.amount}</p>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {/* Empty/Loading state if ever needed */}
                        {activities.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-12">
                                <Clock className="h-8 w-8 opacity-20 animate-spin-slow mb-2" />
                                <p className="text-[10px] uppercase tracking-widest font-bold">Synchronizing Stream...</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <AnimatePresence>
                {isModalOpen && selectedActivity && (
                    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-card border border-border shadow-2xl rounded-2xl w-full max-w-md overflow-hidden"
                        >
                            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                                <div>
                                    <h2 className="text-lg font-bold tracking-tight">Activity Details</h2>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">Audit Log Entry</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors text-muted-foreground hover:text-foreground">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className={cn("h-12 w-12 rounded-xl flex items-center justify-center", selectedActivity.color)}>
                                        <selectedActivity.icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold">{selectedActivity.title}</h3>
                                        <p className="text-xs text-muted-foreground capitalize">Module: {selectedActivity.module}</p>
                                    </div>
                                </div>

                                <div className="p-4 rounded-xl bg-muted/50 border border-border/50 text-sm italic">
                                    "{selectedActivity.description}"
                                </div>

                                <div className="space-y-3">
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Metadata</p>
                                    <div className="grid grid-cols-2 gap-4">
                                        {Object.entries(selectedActivity.metadata).map(([key, value]) => (
                                            <div key={key} className="space-y-1">
                                                <p className="text-[9px] text-muted-foreground">{key}</p>
                                                <p className="text-[11px] font-mono font-bold truncate">{value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                                    <AlertCircle className="h-4 w-4 text-orange-600" />
                                    <p className="text-[10px] text-orange-900 leading-tight">
                                        Simulated Activity. This event belongs to the NuVio SaaS Demo environment and does not reflect actual data changes.
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 bg-muted/10 border-t border-border flex justify-end">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-foreground text-background font-medium rounded-lg text-xs transition-opacity hover:opacity-90"
                                >
                                    Dismiss Log
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}
