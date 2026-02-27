"use client"

import * as React from "react"
import { useState, useEffect, useMemo } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Activity, TrendingUp } from "lucide-react"

interface VanguardDemoProps {
    mode?: "compact" | "full"
    className?: string
}

const INITIAL_PRICES = [
    145.20, 145.50, 145.35, 145.80, 146.10, 145.90, 146.25, 146.50, 146.30, 146.70,
    146.45, 146.80, 147.10, 146.90, 147.25, 147.50, 147.35, 147.15, 147.45, 147.80
]

export function VanguardDemo({ mode = "full", className }: VanguardDemoProps) {
    // Ticker State
    const [tickerData, setTickerData] = useState([
        { symbol: "AAPL", price: 184.25, change: 1.2, direction: "up" },
        { symbol: "GOOGL", price: 142.65, change: -0.4, direction: "down" },
        { symbol: "MSFT", price: 412.05, change: 0.8, direction: "up" },
        { symbol: "TSLA", price: 195.50, change: -1.5, direction: "down" },
        { symbol: "NVDA", price: 720.10, change: 2.5, direction: "up" },
    ])

    // Chart State
    const [chartData, setChartData] = useState<number[]>(INITIAL_PRICES)
    const [timeframe, setTimeframe] = useState("1M")

    // Trade State
    const [symbol, setSymbol] = useState("BTC/USD")
    const [size, setSize] = useState("0.5")
    const [isOrdering, setIsOrdering] = useState(false)
    const [orderSuccess, setOrderSuccess] = useState(false)

    // Derived Chart Geometry
    const { pathD, areaD, min, max } = useMemo(() => {
        const minVal = Math.min(...chartData)
        const maxVal = Math.max(...chartData)
        const range = maxVal - minVal || 1
        const padding = range * 0.1 // 10% vertical padding

        const effectiveMin = minVal - padding
        const effectiveMax = maxVal + padding
        const effectiveRange = effectiveMax - effectiveMin

        const points = chartData.map((val, i) => {
            const x = (i / (chartData.length - 1)) * 100
            const y = 100 - ((val - effectiveMin) / effectiveRange) * 100
            return `${x},${y}`
        })

        return {
            pathD: `M ${points.join(" L ")}`,
            areaD: `M ${points.join(" L ")} L 100,100 L 0,100 Z`,
            min: minVal,
            max: maxVal
        }
    }, [chartData])

    // Simulation Effect
    useEffect(() => {
        const interval = setInterval(() => {
            // Ticker Update
            setTickerData(current =>
                current.map(item => ({
                    ...item,
                    price: item.price + (Math.random() - 0.5) * 0.5,
                    change: item.change + (Math.random() - 0.5) * 0.1,
                    direction: Math.random() > 0.5 ? "up" : "down"
                }))
            )

            // Chart Update (Sliding Window)
            setChartData(current => {
                const last = current[current.length - 1]
                const volatility = 0.4
                const change = (Math.random() - 0.5) * volatility
                const next = last + change
                return [...current.slice(1), next]
            })
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    const handleOrder = (e: React.FormEvent) => {
        e.preventDefault()
        setIsOrdering(true)
        setTimeout(() => {
            setIsOrdering(false)
            setOrderSuccess(true)
            setTimeout(() => setOrderSuccess(false), 3000)
        }, 1500)
    }

    const isCompact = mode === "compact"

    return (
        <div className={cn("flex flex-col bg-background text-foreground h-full w-full", isCompact ? "select-none pointer-events-none" : "border rounded-xl shadow-sm", className)}>
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/20">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-medium font-mono text-muted-foreground">SYSTEM ONLINE</span>
                </div>
                {!isCompact && (
                    <div className="flex gap-2">
                        <span className="text-xs px-2 py-1 rounded bg-muted/50 text-muted-foreground">LATENCY: 12ms</span>
                    </div>
                )}
            </div>

            {/* Ticker */}
            <div className="flex overflow-hidden border-b py-2 bg-background">
                <div className="flex gap-6 px-4 animate-in slide-in-from-right-full duration-1000 whitespace-nowrap">
                    {tickerData.slice(0, isCompact ? 3 : 5).map((item) => (
                        <div key={item.symbol} className="flex items-center gap-2 font-mono text-xs">
                            <span className="font-semibold">{item.symbol}</span>
                            <span>{item.price.toFixed(2)}</span>
                            <span className={item.direction === "up" ? "text-green-500" : "text-red-500"}>
                                {item.change > 0 ? "+" : ""}{item.change.toFixed(1)}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Workspace */}
            <div className={cn("flex-1 p-4 grid gap-4", isCompact ? "grid-cols-1 overflow-hidden" : "grid-cols-1 md:grid-cols-3")}>

                {/* Chart Area */}
                <div className={cn("rounded-lg border bg-muted/10 p-4 relative overflow-hidden flex flex-col", isCompact ? "h-32" : "md:col-span-2")}>
                    <div className="flex items-center justify-between mb-4 z-10 relative">
                        <h3 className="text-sm font-semibold flex items-center gap-2">
                            <Activity className="w-4 h-4 text-primary" />
                            Market Activity
                        </h3>
                        {!isCompact && (
                            <div className="flex gap-1 bg-background/50 backdrop-blur-sm rounded-lg p-1 border">
                                {["1M", "5M", "15M", "1H"].map((tf) => (
                                    <button
                                        key={tf}
                                        onClick={() => setTimeframe(tf)}
                                        className={cn(
                                            "text-[10px] px-2 py-1 rounded-md font-medium transition-colors",
                                            timeframe === tf ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        {tf}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* SVG Chart */}
                    <div className="flex-1 w-full relative min-h-0">
                        <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="currentColor" stopOpacity="0.1" className="text-primary" />
                                    <stop offset="100%" stopColor="currentColor" stopOpacity="0" className="text-primary" />
                                </linearGradient>
                            </defs>

                            {/* Grid Lines */}
                            <line x1="0" y1="25" x2="100" y2="25" stroke="currentColor" strokeOpacity="0.05" vectorEffect="non-scaling-stroke" />
                            <line x1="0" y1="50" x2="100" y2="50" stroke="currentColor" strokeOpacity="0.05" vectorEffect="non-scaling-stroke" />
                            <line x1="0" y1="75" x2="100" y2="75" stroke="currentColor" strokeOpacity="0.05" vectorEffect="non-scaling-stroke" />

                            {/* Area Fill */}
                            <path
                                d={areaD}
                                fill="url(#chartGradient)"
                                vectorEffect="non-scaling-stroke"
                            />

                            {/* Line */}
                            <path
                                d={pathD}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                vectorEffect="non-scaling-stroke"
                                className="text-primary transition-all duration-300 ease-linear"
                            />
                        </svg>

                        {/* Current Price Label */}
                        {!isCompact && (
                            <div className="absolute top-2 right-2 flex flex-col items-end">
                                <span className="text-2xl font-bold tracking-tight font-mono">
                                    {chartData[chartData.length - 1].toFixed(2)}
                                </span>
                                <span className="text-xs text-green-500 font-medium flex items-center">
                                    <TrendingUp className="w-3 h-3 mr-1" />
                                    +0.42%
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Trade Panel */}
                <div className={cn("rounded-lg border bg-card p-4 space-y-4", isCompact ? "hidden" : "")}>
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-semibold">Trade Execution</h3>
                    </div>

                    {orderSuccess ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-4 bg-green-500/10 rounded-lg animate-in zoom-in">
                            <div className="h-10 w-10 text-green-500 mb-2 rounded-full border-2 border-green-500 flex items-center justify-center">✓</div>
                            <p className="text-sm font-medium text-green-700 dark:text-green-400">Order Filled</p>
                            <p className="text-xs text-muted-foreground mt-1">ID: #882910</p>
                        </div>
                    ) : (
                        <form onSubmit={handleOrder} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground">Symbol</label>
                                <Input
                                    value={symbol}
                                    onChange={(e) => setSymbol(e.target.value)}
                                    className="font-mono text-sm uppercase"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-medium text-muted-foreground">Size (Lots)</label>
                                <Input
                                    value={size}
                                    onChange={(e) => setSize(e.target.value)}
                                    className="font-mono text-sm"
                                    type="number"
                                />
                            </div>
                            <div className="pt-2">
                                <Button className="w-full" disabled={isOrdering}>
                                    {isOrdering ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : "Place Order"}
                                </Button>
                            </div>
                        </form>
                    )}

                    <div className="text-xs text-muted-foreground text-center pt-2 border-t mt-2">
                        Available Margin: $42,500.00
                    </div>
                </div>
            </div>
        </div>
    )
}
