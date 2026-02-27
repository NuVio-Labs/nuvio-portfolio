"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Type, Palette, Layout } from "lucide-react"

interface HelixDemoProps {
    mode?: "compact" | "full"
    className?: string
}

export function HelixDemo({ mode = "full", className }: HelixDemoProps) {
    const isCompact = mode === "compact"

    // Interactive state for full mode
    const [inputValue, setInputValue] = useState("")
    const [inputFocused, setInputFocused] = useState(false)

    return (
        <div className={cn("flex flex-col bg-background text-foreground h-full w-full", isCompact ? "select-none pointer-events-none" : "border rounded-xl shadow-sm", className)}>
            {/* Toolbar */}
            <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/20">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-xs font-medium font-mono text-muted-foreground">HELIX DS v2.4.0</span>
                </div>
                {!isCompact && (
                    <div className="flex gap-2">
                        <Badge variant="outline" className="text-[10px] font-mono">REACT</Badge>
                        <Badge variant="outline" className="text-[10px] font-mono">FIGMA</Badge>
                    </div>
                )}
            </div>

            {/* Main Content */}
            <div className={cn("flex-1 bg-background", isCompact ? "p-4 overflow-hidden" : "p-6 overflow-y-auto")}>
                <div className="grid gap-8">

                    {/* Compact Mode: Visual Rhythm - Token Driven */}
                    {isCompact && (
                        <div className="grid grid-cols-2 gap-4 h-full">
                            {/* Left: Component Samples */}
                            <div className="space-y-3">
                                <div className="h-8 rounded-md bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
                                    Primary
                                </div>
                                <div className="h-8 rounded-md bg-secondary text-secondary-foreground flex items-center justify-center text-xs font-medium">
                                    Secondary
                                </div>
                                <div className="h-8 rounded-md border border-input bg-background flex items-center px-2">
                                    <div className="h-1 w-full bg-muted rounded" />
                                </div>
                            </div>
                            {/* Right: Token Swatches */}
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <div className="h-8 w-8 rounded-full bg-primary shadow-sm" />
                                    <div className="h-8 w-8 rounded-full bg-secondary shadow-sm" />
                                    <div className="h-8 w-8 rounded-full bg-accent shadow-sm" />
                                </div>
                                <div className="h-20 w-full border border-dashed rounded-lg bg-card border-border/40 flex items-center justify-center">
                                    <div className="h-2 w-16 bg-muted rounded" />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Full Mode: Complete System Showcase */}
                    {!isCompact && (
                        <>
                            {/* Color Tokens */}
                            <section>
                                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                                    <Palette className="w-4 h-4" /> Color Tokens
                                </h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    <div className="space-y-1.5">
                                        <div className="h-16 rounded-lg bg-primary shadow-sm border border-primary/20" />
                                        <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                            <span>primary</span>
                                            <span className="text-[10px]">hsl(var)</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-16 rounded-lg bg-secondary shadow-sm border border-secondary/20" />
                                        <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                            <span>secondary</span>
                                            <span className="text-[10px]">hsl(var)</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-16 rounded-lg bg-accent shadow-sm border border-accent/20" />
                                        <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                            <span>accent</span>
                                            <span className="text-[10px]">hsl(var)</span>
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="h-16 rounded-lg bg-muted shadow-sm border border-muted/20" />
                                        <div className="flex justify-between text-xs text-muted-foreground font-mono">
                                            <span>muted</span>
                                            <span className="text-[10px]">hsl(var)</span>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Typography Scale */}
                            <section>
                                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                                    <Type className="w-4 h-4" /> Typography Scale
                                </h4>
                                <div className="space-y-6 border rounded-lg p-6 bg-card">
                                    <div className="space-y-1 pb-4 border-b border-border/40">
                                        <h1 className="text-4xl font-extrabold tracking-tight">Display Heading</h1>
                                        <span className="text-[10px] text-muted-foreground font-mono">text-4xl · font-extrabold · tracking-tight</span>
                                    </div>
                                    <div className="space-y-1 pb-4 border-b border-border/40">
                                        <h2 className="text-2xl font-bold tracking-tight">Section Heading</h2>
                                        <span className="text-[10px] text-muted-foreground font-mono">text-2xl · font-bold · tracking-tight</span>
                                    </div>
                                    <div className="space-y-1 pb-4 border-b border-border/40">
                                        <h3 className="text-lg font-semibold">Subsection Heading</h3>
                                        <span className="text-[10px] text-muted-foreground font-mono">text-lg · font-semibold</span>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-base leading-7 text-muted-foreground">
                                            Body copy maintains comfortable readability with a relaxed line-height of 1.75, ensuring optimal reading experience across long-form content.
                                        </p>
                                        <span className="text-[10px] text-muted-foreground font-mono">text-base · leading-7 · text-muted-foreground</span>
                                    </div>
                                </div>
                            </section>

                            {/* Component Library */}
                            <section>
                                <h4 className="text-sm font-semibold mb-4 flex items-center gap-2">
                                    <Layout className="w-4 h-4" /> Component Library
                                </h4>
                                <div className="grid gap-6 md:grid-cols-2">
                                    {/* Buttons & Inputs */}
                                    <div className="border rounded-lg p-6 space-y-6 bg-card">
                                        <div>
                                            <div className="text-xs font-medium text-muted-foreground mb-3">Button Variants</div>
                                            <div className="flex flex-wrap gap-2">
                                                <Button size="sm">Primary</Button>
                                                <Button size="sm" variant="secondary">Secondary</Button>
                                                <Button size="sm" variant="outline">Outline</Button>
                                                <Button size="sm" variant="ghost">Ghost</Button>
                                                <Button size="sm" variant="destructive">Destructive</Button>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs font-medium text-muted-foreground mb-3">Input States</div>
                                            <div className="space-y-2">
                                                <Input
                                                    type="text"
                                                    placeholder="Default state..."
                                                    value={inputValue}
                                                    onChange={(e) => setInputValue(e.target.value)}
                                                    onFocus={() => setInputFocused(true)}
                                                    onBlur={() => setInputFocused(false)}
                                                />
                                                <Input type="text" placeholder="Disabled state..." disabled />
                                            </div>
                                            {inputFocused && (
                                                <div className="text-[10px] text-muted-foreground mt-2 font-mono">
                                                    Focus: ring-2 ring-ring ring-offset-2
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Cards & Badges */}
                                    <div className="border rounded-lg p-6 space-y-4 bg-muted/20">
                                        <div>
                                            <div className="text-xs font-medium text-muted-foreground mb-3">Card Components</div>
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between bg-card p-3 rounded-md shadow-sm border border-border/40 hover:border-border transition-colors">
                                                    <span className="text-sm font-medium">Interactive Card</span>
                                                    <Badge>New</Badge>
                                                </div>
                                                <div className="flex items-center gap-3 p-3 bg-card rounded-md shadow-sm border border-border/40 hover:shadow-md transition-shadow">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-bold">
                                                        JD
                                                    </div>
                                                    <div className="flex-1 space-y-1">
                                                        <div className="h-2 w-24 bg-foreground/80 rounded" />
                                                        <div className="h-2 w-16 bg-muted-foreground/40 rounded" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-xs font-medium text-muted-foreground mb-3">Badge Variants</div>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge>Default</Badge>
                                                <Badge variant="secondary">Secondary</Badge>
                                                <Badge variant="outline">Outline</Badge>
                                                <Badge variant="destructive">Destructive</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
