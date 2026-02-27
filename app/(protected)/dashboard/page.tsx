"use client"

import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Container } from "@/components/layout/container"
import { Package, CreditCard, Settings, Users } from "lucide-react"
import { OnboardingWizard, useOnboarding } from "@/components/saas/OnboardingWizard"
import { StatusPill } from "@/components/saas/StatusPill"
import { SaaSTopBar } from "@/components/saas/SaaSTopBar"
import { NarratedDemo } from "@/components/saas/NarratedDemo"
import { ModuleModal } from "@/components/saas/ModuleModal"

import { MODULES, Module } from "@/data/nuvioData"
import Link from "next/link"
import { ChevronRight, Lock } from "lucide-react"

import { AssetDistribution } from "@/components/saas/AssetDistribution"
import { useTenantData } from "@/hooks/useTenantData"
import { useState, useEffect } from "react"
import { RecentActivity } from "@/components/saas/RecentActivity"

export default function DashboardPage() {
    const { session, logout } = useAuth()
    const { showOnboarding, completeOnboarding } = useOnboarding()
    const { data, loading } = useTenantData(session?.tenantId)
    const [showDemo, setShowDemo] = useState(false)
    const [selectedModule, setSelectedModule] = useState<Module | null>(null)
    const [isModuleModalOpen, setIsModuleModalOpen] = useState(false)

    useEffect(() => {
        // Auto-show guided demo only once ever per browser, after onboarding
        const completed = localStorage.getItem("nuvio:guidedDemoCompleted")
        if (!completed && !showOnboarding) {
            const timer = setTimeout(() => setShowDemo(true), 2000)
            return () => clearTimeout(timer)
        }
    }, [showOnboarding])

    if (loading) return null

    const tenantId = session?.tenantId || "acme"

    return (
        <>
            {showOnboarding && <OnboardingWizard onComplete={completeOnboarding} />}
            <NarratedDemo isOpen={showDemo} onClose={() => setShowDemo(false)} />
            <ModuleModal
                isOpen={isModuleModalOpen}
                onClose={() => setIsModuleModalOpen(false)}
                module={selectedModule}
                tenantId={session?.tenantId || "acme"}
                role={session?.role || "viewer"}
            />

            <div className="py-8">
                <Container>
                    <div className="flex flex-col gap-6">
                        <SaaSTopBar
                            title="Dashboard"
                            onStartTour={() => setShowDemo(true)}
                        />


                        {/* In Progress Note */}
                        <div className="mb-6 p-4 rounded-lg bg-muted/30 border border-border/50">
                            <p className="text-sm text-muted-foreground text-center">
                                <span className="font-medium">NuVio Core Hub.</span> System modules are active for <span className="text-foreground font-semibold">{tenantId}</span>.
                            </p>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
                                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        ${data.invoices.reduce((acc, inv) => acc + inv.amount, 0).toLocaleString()}
                                    </div>
                                    <p className="text-xs text-muted-foreground">Current billing cycle</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Assets</CardTitle>
                                    <Package className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{data.vehicles.length}</div>
                                    <p className="text-xs text-muted-foreground">Fleet modules active</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Customer base</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">+{data.customers.length}</div>
                                    <p className="text-xs text-muted-foreground">Managed via NuVio Core</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Active Modules</CardTitle>
                                    <Settings className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{data.enabledModules.length}</div>
                                    <p className="text-xs text-muted-foreground">System nodes operational</p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Modules Section */}
                        <div className="mt-8 space-y-4">
                            <h2 className="text-xl font-semibold tracking-tight">Active Modules</h2>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                                {MODULES.map(module => {
                                    const isEnabled = data.enabledModules.includes(module.id);

                                    if (isEnabled) {
                                        return (
                                            <div
                                                key={module.id}
                                                onClick={() => {
                                                    setSelectedModule(module);
                                                    setIsModuleModalOpen(true);
                                                }}
                                                className="group"
                                            >
                                                <Card className="border-purple-500/10 group-hover:border-purple-500/40 group-hover:bg-purple-500/5 transition-all duration-200 cursor-pointer h-full">
                                                    <CardHeader className="p-4 pb-2">
                                                        <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                                                            {module.name}
                                                            <ChevronRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                        </CardTitle>
                                                    </CardHeader>
                                                    <CardContent className="p-4 pt-0">
                                                        <div className="text-sm font-bold flex items-center gap-2">
                                                            <div className="h-2 w-2 rounded-full bg-green-500" />
                                                            Operational
                                                        </div>
                                                        <p className="text-[10px] text-muted-foreground mt-1 line-clamp-1">
                                                            {module.description}
                                                        </p>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        );
                                    }

                                    return (
                                        <Card
                                            key={module.id}
                                            className="opacity-50 grayscale border-zinc-200 bg-zinc-50/50 cursor-not-allowed select-none transition-all"
                                            onClick={() => alert(`Module "${module.name}" is not enabled for your current tenant plan (${tenantId}). Contact your administrator to upgrade.`)}
                                        >
                                            <CardHeader className="p-4 pb-2">
                                                <CardTitle className="text-[10px] uppercase tracking-widest text-muted-foreground flex items-center justify-between">
                                                    {module.name}
                                                    <Lock className="h-3 w-3" />
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0">
                                                <div className="text-sm font-bold flex items-center gap-2 text-zinc-500">
                                                    Disabled
                                                </div>
                                                <p className="text-[10px] text-muted-foreground mt-1">
                                                    Contact sales to unlock
                                                </p>
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
                            <AssetDistribution />
                            <RecentActivity tenantId={tenantId} />
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}
