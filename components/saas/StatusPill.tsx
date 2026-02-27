"use client"

import { useState } from "react"
import { X, ChevronRight } from "lucide-react"
import { PRODUCT_STATUS } from "@/data/nuvioStatus"
import { cn } from "@/lib/utils"

export function StatusPill() {
    const [showRoadmap, setShowRoadmap] = useState(false)

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            setShowRoadmap(false)
        }
    }

    return (
        <>
            {/* Status Pill */}
            <button
                onClick={() => setShowRoadmap(true)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 transition-colors text-xs font-medium"
            >
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                {PRODUCT_STATUS.label}
            </button>

            {/* Roadmap Panel */}
            {showRoadmap && (
                <div
                    className="fixed inset-0 z-50 flex items-start justify-end bg-background/80 backdrop-blur-sm"
                    onClick={() => setShowRoadmap(false)}
                    onKeyDown={handleKeyDown}
                    tabIndex={-1}
                >
                    <div
                        className={cn(
                            "w-full max-w-md h-full bg-card border-l shadow-xl animate-in slide-in-from-right duration-300"
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <div>
                                <h3 className="font-semibold">Platform Roadmap</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                    {PRODUCT_STATUS.description}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowRoadmap(false)}
                                className="text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Close"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Roadmap Items */}
                        <div className="p-4 space-y-3 overflow-y-auto h-[calc(100%-80px)]">
                            {PRODUCT_STATUS.roadmapItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <h4 className="font-medium text-sm">{item.title}</h4>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {item.description}
                                            </p>
                                        </div>
                                        <span
                                            className={cn(
                                                "text-[10px] px-2 py-0.5 rounded-full font-medium whitespace-nowrap",
                                                item.status === "In Development" && "bg-blue-500/10 text-blue-600 dark:text-blue-400",
                                                item.status === "Planned" && "bg-purple-500/10 text-purple-600 dark:text-purple-400",
                                                item.status === "Research" && "bg-gray-500/10 text-gray-600 dark:text-gray-400"
                                            )}
                                        >
                                            {item.status}
                                        </span>
                                    </div>
                                </div>
                            ))}

                            {/* Reset Demo Shortcut */}
                            <div className="pt-4 border-t">
                                <button
                                    onClick={() => {
                                        if (confirm("Reset all demo data? This will clear your current session.")) {
                                            localStorage.clear()
                                            window.location.href = "/login"
                                        }
                                    }}
                                    className="w-full flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors text-sm"
                                >
                                    <span className="font-medium">Reset Demo Data</span>
                                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
