"use client"

import { Container } from "@/components/layout/container"
import { SaaSTopBar } from "@/components/saas/SaaSTopBar"
import { DataTools } from "@/components/saas/DataTools"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useOnboarding } from "@/components/saas/OnboardingWizard"
import { cn } from "@/lib/utils"
import { RefreshCcw } from "lucide-react"
import { NarratedDemo } from "@/components/saas/NarratedDemo"
import { useState } from "react"
import { Target, ShieldAlert, Cpu, CheckSquare, History, LayoutPanelTop, Terminal } from "lucide-react"

export default function SettingsPage() {
    const { replayOnboarding } = useOnboarding()
    const [showDemo, setShowDemo] = useState(false)
    const [showUxChecklist, setShowUxChecklist] = useState(false)

    return (
        <div className="py-8 text-foreground/90">
            <NarratedDemo isOpen={showDemo} onClose={() => setShowDemo(false)} />
            <Container>
                <SaaSTopBar
                    title="Settings"
                    onStartTour={() => setShowDemo(true)}
                />

                <div className="grid gap-8">
                    {/* 1. Presentation Mode Content */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="bg-muted/5 border-dashed">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Target className="h-4 w-4 text-purple-500" />
                                    What is NuVio?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm leading-relaxed text-muted-foreground">
                                NuVio is a modular B2B operating system. It provides a shared "Core" (Auth, Billing, Tenants)
                                and a marketplace of specialized "Modules" (Fleet, Clients, Staff).
                                This architecture allows businesses to scale from simple invoicing to global fleet management
                                without migrating platforms.
                            </CardContent>
                        </Card>

                        <Card className="bg-muted/5 border-dashed">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Cpu className="h-4 w-4 text-purple-500" />
                                    Architecture Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-sm leading-relaxed text-muted-foreground">
                                The platform uses a **Hub-and-Spoke** model. The Hub handles the heavy lifting of enterprise data,
                                while Spokes (Modules) provide tailored interfaces and workflows.
                                Everything is delivered via a unified, high-performance web runtime.
                            </CardContent>
                        </Card>
                    </div>

                    {/* 2. Demo Scenario Simulations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Terminal className="h-4 w-4" />
                                Interactive Scenarios
                            </CardTitle>
                            <CardDescription>Simulate real-world platform behaviors without data mutation</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Button
                                    variant="outline"
                                    className="h-auto py-3 px-4 flex-col items-start text-left gap-1"
                                    onClick={() => alert("Scenario: Viewer Permissions\n\nYou are currently simulated as a 'Viewer'. Actions like 'Create Vehicle' or 'Delete Invoice' will be visually grayed out or show a permission error toast.")}
                                >
                                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                                    <span className="font-bold text-xs uppercase tracking-tight">Viewer Restriction</span>
                                    <span className="text-[10px] text-muted-foreground">Test role guarding</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-auto py-3 px-4 flex-col items-start text-left gap-1"
                                    onClick={() => alert("Scenario: Module Lock\n\nSimulating 'NuVio Lab' disabled for this tenant. The module will appear locked on the dashboard with a 'Contact Sales' upgrade CTA.")}
                                >
                                    <RefreshCcw className="h-4 w-4 text-blue-500" />
                                    <span className="font-bold text-xs uppercase tracking-tight">Module Disabled</span>
                                    <span className="text-[10px] text-muted-foreground">Test modularity</span>
                                </Button>

                                <Button
                                    variant="outline"
                                    className="h-auto py-3 px-4 flex-col items-start text-left gap-1"
                                    onClick={() => alert("Scenario: Schema Error\n\nSimulating an invalid JSON import. The Data Tools will catch the version mismatch and prevent data corruption.")}
                                >
                                    <Cpu className="h-4 w-4 text-red-500" />
                                    <span className="font-bold text-xs uppercase tracking-tight">Invalid Import</span>
                                    <span className="text-[10px] text-muted-foreground">Test data integrity</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* 3. Status & Lifecycle */}
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <History className="h-4 w-4" />
                                    Release Lifecycle
                                </CardTitle>
                                <CardDescription>Development velocity and upcoming milestones</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {[
                                        { label: "Concept", status: "Done", color: "text-zinc-500" },
                                        { label: "Prototype", status: "Done", color: "text-zinc-500" },
                                        { label: "SaaS Preview", status: "In Progress", color: "text-amber-500 font-bold" },
                                        { label: "Beta / Early Access", status: "Q3 2026", color: "text-muted-foreground" },
                                        { label: "Public Launch", status: "2027", color: "text-muted-foreground" },
                                    ].map((milestone, i) => (
                                        <div key={milestone.label} className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-3">
                                                <div className={cn("h-1.5 w-1.5 rounded-full", i < 2 ? "bg-zinc-500" : i === 2 ? "bg-amber-500" : "bg-zinc-300 dark:bg-zinc-800")} />
                                                <span className="font-medium text-muted-foreground">{milestone.label}</span>
                                            </div>
                                            <span className={cn(milestone.color)}>{milestone.status}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* UX Checklist Toggle */}
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <div>
                                    <CardTitle className="flex items-center gap-2">
                                        <CheckSquare className="h-4 w-4" />
                                        UX Heuristics
                                    </CardTitle>
                                    <CardDescription>Internal self-check for design quality</CardDescription>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setShowUxChecklist(!showUxChecklist)}
                                >
                                    {showUxChecklist ? "Hide" : "Show"}
                                </Button>
                            </CardHeader>
                            <CardContent>
                                {showUxChecklist ? (
                                    <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
                                        {[
                                            "System status always visible",
                                            "Demo-only actions clearly labeled",
                                            "Instant feedback on simulated inputs",
                                            "Role-based UI adaptation (View vs Edit)",
                                            "Deterministic session state (refresh safe)",
                                            "Accessible keyboard navigation (Esc/Enter)"
                                        ].map(item => (
                                            <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                                                <div className="h-3 w-3 rounded-full border border-purple-500/50 flex items-center justify-center">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-purple-500" />
                                                </div>
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-[100px] flex items-center justify-center border border-dashed rounded-lg bg-muted/20">
                                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest text-center">
                                            Click show to review<br />design intent
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Onboarding Wizard (Existing but moved) */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <RefreshCcw className="h-4 w-4" />
                                    Getting Started
                                </CardTitle>
                                <CardDescription>Introductory guides and setup</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg border bg-card">
                                    <div>
                                        <p className="text-sm font-medium">Replay Welcome Experience</p>
                                        <p className="text-xs text-muted-foreground mt-1">Launch the introductory wizard again.</p>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={replayOnboarding}
                                    >
                                        Replay
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Data Tools (Existing but moved) */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <LayoutPanelTop className="h-4 w-4" />
                                    Data Portability
                                </CardTitle>
                                <CardDescription>Export and import demo datasets</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <DataTools />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </Container>
        </div>
    )
}
