"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Truck, Users, UserCog, FileText, Calendar, Zap, FlaskConical, Shield, Key, Building2, CreditCard, Flag } from "lucide-react"

interface NuvioCoreDemoProps {
    mode?: "compact" | "full"
    className?: string
}

// Core Services (Foundation Layer)
const CORE_SERVICES = [
    { id: "auth", name: "Auth", icon: Shield },
    { id: "roles", name: "Roles", icon: Key },
    { id: "tenants", name: "Tenants", icon: Building2 },
    { id: "billing", name: "Billing", icon: CreditCard },
    { id: "flags", name: "Feature Flags", icon: Flag },
]

// Product Modules
const PRODUCTS = [
    {
        id: "fleet",
        name: "NuVio Fleet",
        icon: Truck,
        color: "bg-blue-500",
        description: "Vehicle & contract management",
        capabilities: "Manage vehicles, contracts, damage tracking, and PDF handovers for fleet operations.",
        status: "Active"
    },
    {
        id: "clients",
        name: "NuVio Clients",
        icon: Users,
        color: "bg-green-500",
        description: "Customers, invoices, payments",
        capabilities: "Complete customer relationship management with invoicing, payment processing, and document handling.",
        status: "Active"
    },
    {
        id: "staff",
        name: "NuVio Staff",
        icon: UserCog,
        color: "bg-purple-500",
        description: "Employees & access",
        capabilities: "Employee management, role assignment, access control, and activity monitoring.",
        status: "Active"
    },
    {
        id: "docs",
        name: "NuVio Docs",
        icon: FileText,
        color: "bg-amber-500",
        description: "Documents & exports",
        capabilities: "Centralized document management, PDF generation, and exports shared across all products.",
        status: "Active"
    },
    {
        id: "plan",
        name: "NuVio Plan",
        icon: Calendar,
        color: "bg-cyan-500",
        description: "Scheduling & workflows",
        capabilities: "Calendar management, scheduling automation, and workflow orchestration.",
        status: "Active"
    },
    {
        id: "edge",
        name: "NuVio Edge",
        icon: Zap,
        color: "bg-orange-500",
        description: "Automation & compute",
        capabilities: "Background job processing, OCR, automation pipelines, and third-party integrations.",
        status: "Active"
    },
    {
        id: "lab",
        name: "NuVio Lab",
        icon: FlaskConical,
        color: "bg-pink-500",
        description: "Experiments & prototypes",
        capabilities: "Beta features, experimental functionality, and prototype testing environment.",
        status: "Active"
    },
]

export function NuvioCoreDemo({ mode = "full", className }: NuvioCoreDemoProps) {
    const isCompact = mode === "compact"
    const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

    // Compact mode shows only primary products
    const displayProducts = isCompact
        ? PRODUCTS.filter(p => ["fleet", "clients", "staff"].includes(p.id))
        : PRODUCTS

    const selectedProductData = PRODUCTS.find(p => p.id === selectedProduct)

    return (
        <div className={cn("flex flex-col bg-background text-foreground h-full w-full", isCompact ? "select-none pointer-events-none" : "border rounded-xl shadow-sm", className)}>
            {/* Platform Header */}
            <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/20">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-purple-500" />
                    <span className="text-xs font-medium font-mono text-muted-foreground">NUVIO PLATFORM</span>
                </div>
                {!isCompact && (
                    <div className="flex gap-2 items-center">
                        <span className="text-xs px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 font-medium border border-green-500/20">
                            All Systems Operational
                        </span>
                        <a
                            href="/dashboard"
                            className="text-xs px-3 py-1 rounded bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors flex items-center gap-1.5"
                        >
                            Open SaaS Demo
                            <Flag className="w-3.5 h-3.5" />
                        </a>
                    </div>
                )}
            </div>

            {/* Core Services Foundation Layer (Full Mode Only) */}
            {!isCompact && (
                <div className="border-b bg-muted/10 px-4 py-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-muted-foreground">CORE SERVICES</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {CORE_SERVICES.map((service) => {
                                const Icon = service.icon
                                return (
                                    <div key={service.id} className="flex items-center gap-1.5 text-[10px] px-2 py-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 font-medium">
                                        <Icon className="w-3 h-3" />
                                        <span>{service.name}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content - Product Grid */}
            <div className={cn("flex-1 p-6", isCompact ? "overflow-hidden" : "overflow-y-auto")}>
                <div className={cn("grid gap-4", isCompact ? "grid-cols-3" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3")}>
                    {displayProducts.map((product) => {
                        const Icon = product.icon
                        const isSelected = selectedProduct === product.id

                        return (
                            <div
                                key={product.id}
                                className={cn(
                                    "rounded-lg border bg-card transition-all duration-300",
                                    isCompact ? "p-3" : "p-5 cursor-pointer hover:shadow-lg hover:border-border",
                                    isSelected && "ring-2 ring-purple-500 shadow-lg"
                                )}
                                onClick={() => !isCompact && setSelectedProduct(isSelected ? null : product.id)}
                            >
                                {/* Product Header */}
                                <div className="flex items-start gap-3 mb-3">
                                    <div className={cn("rounded-lg p-2.5", product.color, "bg-opacity-10")}>
                                        <Icon className={cn(isCompact ? "w-5 h-5" : "w-6 h-6")} style={{ color: product.color.replace('bg-', '').replace('500', '600') }} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className={cn("font-bold", isCompact ? "text-xs" : "text-sm")}>{product.name}</h3>
                                        <p className={cn("text-muted-foreground", isCompact ? "text-[10px]" : "text-xs mt-0.5")}>
                                            {product.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Product Status & Core Label */}
                                {!isCompact && (
                                    <div className="flex items-center justify-between pt-3 border-t border-border/40">
                                        <span className="text-[10px] px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 font-medium">
                                            {product.status}
                                        </span>
                                        <span className="text-[10px] text-muted-foreground font-medium">
                                            Powered by NuVio Core
                                        </span>
                                    </div>
                                )}

                                {/* Expanded Details */}
                                {!isCompact && isSelected && (
                                    <div className="mt-4 pt-4 border-t animate-in slide-in-from-top-2">
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {product.capabilities}
                                        </p>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>

                {/* Hint Text (Full Mode Only) */}
                {!isCompact && !selectedProduct && (
                    <div className="mt-6 text-center">
                        <p className="text-xs text-muted-foreground">
                            Click on a product to view full capabilities
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
