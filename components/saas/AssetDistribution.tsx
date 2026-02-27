"use client"

import { useState, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, BarChart3, Clock, X, CheckCircle2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DistributionItem {
    id: string
    label: string
    value: number
    color: string
    description: string
}

const INITIAL_DATA: DistributionItem[] = [
    { id: "fleet", label: "Fleet", value: 42, color: "bg-purple-500", description: "Active fleet assets and logistics nodes" },
    { id: "clients", label: "Clients", value: 26, color: "bg-blue-500", description: "CRM records and active billing cycles" },
    { id: "staff", label: "Staff", value: 14, color: "bg-emerald-500", description: "Staff allocation and workforce units" },
    { id: "docs", label: "Docs", value: 10, color: "bg-amber-500", description: "Automated documents and compliance records" },
    { id: "edge", label: "Edge", value: 8, color: "bg-zinc-400", description: "Background compute and edge jobs" },
]

export function AssetDistribution() {
    const [data, setData] = useState<DistributionItem[]>(INITIAL_DATA)
    const [lastUpdate, setLastUpdate] = useState<number>(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [hoveredId, setHoveredId] = useState<string | null>(null)

    // Simulate Live Data Stream
    useEffect(() => {
        const interval = setInterval(() => {
            setData(prev => {
                const newData = [...prev]
                // Pick two random indexes to trade value (to keep total close to 100)
                const idx1 = Math.floor(Math.random() * newData.length)
                const idx2 = Math.floor(Math.random() * newData.length)

                if (idx1 !== idx2) {
                    const delta = (Math.random() - 0.5) * 4 // -2% to +2%
                    const move = Math.min(Math.max(delta, -newData[idx1].value + 5), newData[idx2].value - 5)

                    newData[idx1] = { ...newData[idx1], value: Number((newData[idx1].value + move).toFixed(1)) }
                    newData[idx2] = { ...newData[idx2], value: Number((newData[idx2].value - move).toFixed(1)) }
                }

                return newData
            })
            setLastUpdate(0)
        }, 3000)

        const timer = setInterval(() => {
            setLastUpdate(prev => prev + 1)
        }, 1000)

        return () => {
            clearInterval(interval)
            clearInterval(timer)
        }
    }, [])

    const total = useMemo(() => data.reduce((acc, item) => acc + item.value, 0), [data])

    return (
        <>
            <Card className="col-span-4 overflow-hidden group/viz">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Asset Distribution</CardTitle>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-600 uppercase tracking-tighter">Live Stream</span>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="p-1 hover:bg-muted rounded text-muted-foreground transition-colors"
                        >
                            <BarChart3 className="h-4 w-4" />
                        </button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-6">
                        {/* Visualization Wrapper */}
                        <div
                            className="relative h-12 w-full flex rounded-xl overflow-hidden bg-muted/20 border border-border/40 cursor-pointer"
                            onClick={() => setIsModalOpen(true)}
                        >
                            {data.map((item, idx) => (
                                <motion.div
                                    key={item.id}
                                    initial={false}
                                    animate={{ width: `${(item.value / total) * 100}%` }}
                                    transition={{ type: "spring", stiffness: 50, damping: 20 }}
                                    className={cn(item.color, "h-full relative transition-colors duration-500")}
                                    onMouseEnter={() => setHoveredId(item.id)}
                                    onMouseLeave={() => setHoveredId(null)}
                                >
                                    <AnimatePresence>
                                        {hoveredId === item.id && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 pointer-events-none"
                                            >
                                                <div className="bg-popover text-popover-foreground border border-border rounded-lg shadow-xl p-2 min-w-[140px]">
                                                    <p className="text-xs font-bold">{item.label}</p>
                                                    <div className="flex items-center justify-between gap-4 mt-1">
                                                        <span className="text-[10px] text-muted-foreground">{item.description}</span>
                                                        <span className="text-xs font-mono font-bold leading-none">{item.value}%</span>
                                                    </div>
                                                </div>
                                                <div className="w-2 h-2 bg-popover border-r border-b border-border rotate-45 mx-auto -mt-1" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            ))}
                        </div>

                        {/* Legend / Metrics */}
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {data.map(item => (
                                <div key={item.id} className="space-y-1">
                                    <div className="flex items-center gap-1.5">
                                        <div className={cn("h-1.5 w-1.5 rounded-full", item.color)} />
                                        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{item.label}</span>
                                    </div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-lg font-bold tracking-tight">{item.value}</span>
                                        <span className="text-[10px] font-medium text-muted-foreground">%</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Footer Info */}
                        <div className="pt-2 flex items-center justify-between border-t border-border/40">
                            <div className="flex items-center gap-1.5 text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span className="text-[10px] font-medium">Last update: {lastUpdate}s ago</span>
                            </div>
                            <div className="flex items-center gap-1 text-[10px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                                <Info className="h-3 w-3" />
                                Simulated Stream
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Detail Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-card border border-border shadow-2xl rounded-2xl w-full max-w-2xl overflow-hidden"
                        >
                            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/30">
                                <div>
                                    <h2 className="text-xl font-bold tracking-tight">Asset Distribution Detail</h2>
                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                        Deterministic Live Simulation Active
                                    </p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors">
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="p-6 space-y-8">
                                <div className="space-y-4">
                                    <p className="text-sm font-medium text-muted-foreground">Resource Allocation Pattern</p>
                                    <div className="h-16 w-full flex rounded-2xl overflow-hidden border border-border shadow-inner">
                                        {data.map(item => (
                                            <motion.div
                                                key={item.id}
                                                animate={{ width: `${(item.value / total) * 100}%` }}
                                                className={cn(item.color, "h-full flex items-center justify-center text-[10px] font-bold text-white overflow-hidden")}
                                            >
                                                {item.value > 10 && item.value + "%"}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                <div className="rounded-xl border border-border overflow-hidden">
                                    <table className="w-full text-sm text-left">
                                        <thead className="bg-muted/50 border-b border-border">
                                            <tr>
                                                <th className="px-4 py-3 font-medium text-muted-foreground">Module</th>
                                                <th className="px-4 py-3 font-medium text-muted-foreground">Description</th>
                                                <th className="px-4 py-3 font-medium text-muted-foreground text-right">Value</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-border">
                                            {data.map(item => (
                                                <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                                                    <td className="px-4 py-3 font-bold flex items-center gap-2">
                                                        <div className={cn("h-2 w-2 rounded-full", item.color)} />
                                                        {item.label}
                                                    </td>
                                                    <td className="px-4 py-3 text-muted-foreground text-xs">{item.description}</td>
                                                    <td className="px-4 py-3 text-right font-mono font-bold">{item.value}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-xs text-muted-foreground italic text-center">
                                    "This data is generated by the NuVio Core live stream simulator. It represents the hypothetical load across your architecture nodes in a production-like environment."
                                </div>
                            </div>

                            <div className="p-4 bg-muted/10 border-t border-border flex justify-end">
                                <Button onClick={() => setIsModalOpen(false)}>Close Overview</Button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    )
}

function Button({ children, onClick, className }: { children: React.ReactNode, onClick: () => void, className?: string }) {
    return (
        <button
            onClick={onClick}
            className={cn("px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg text-sm transition-colors", className)}
        >
            {children}
        </button>
    )
}
