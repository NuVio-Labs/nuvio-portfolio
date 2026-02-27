"use client"

import * as React from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Check } from "lucide-react"

interface VelosDemoProps {
    mode?: "compact" | "full"
    className?: string
}

interface Product {
    id: number
    name: string
    price: number
    category: string
}

const PRODUCTS: Product[] = [
    { id: 1, name: "Minimal Tote", price: 89, category: "Bags" },
    { id: 2, name: "Canvas Backpack", price: 129, category: "Bags" },
    { id: 3, name: "Leather Wallet", price: 59, category: "Accessories" },
    { id: 4, name: "Wool Beanie", price: 35, category: "Accessories" },
    { id: 5, name: "Denim Jacket", price: 189, category: "Outerwear" },
    { id: 6, name: "Cotton Tee", price: 45, category: "Apparel" },
]

export function VelosDemo({ mode = "full", className }: VelosDemoProps) {
    const isCompact = mode === "compact"
    const [cart, setCart] = useState<number[]>([])
    const [addingToCart, setAddingToCart] = useState<number | null>(null)

    const handleAddToCart = (productId: number) => {
        setAddingToCart(productId)
        setTimeout(() => {
            setCart(prev => [...prev, productId])
            setAddingToCart(null)
        }, 300)
    }

    const isInCart = (productId: number) => cart.includes(productId)
    const cartCount = cart.length

    return (
        <div className={cn("flex flex-col bg-background text-foreground h-full w-full", isCompact ? "select-none pointer-events-none" : "border rounded-xl shadow-sm", className)}>
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/20">
                <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-medium font-mono text-muted-foreground">VELOS COMMERCE</span>
                </div>
                {!isCompact && (
                    <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-[10px] font-mono">HEADLESS</Badge>
                        <div className="relative">
                            <ShoppingCart className="w-4 h-4 text-muted-foreground" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary text-primary-foreground text-[8px] font-bold flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Product Grid */}
            <div className={cn("flex-1 bg-background", isCompact ? "p-4 overflow-hidden" : "p-6 overflow-y-auto")}>
                <div className={cn("grid gap-4", isCompact ? "grid-cols-2" : "grid-cols-2 md:grid-cols-3")}>
                    {PRODUCTS.slice(0, isCompact ? 4 : 6).map((product) => {
                        const inCart = isInCart(product.id)
                        const isAdding = addingToCart === product.id

                        return (
                            <div
                                key={product.id}
                                className={cn(
                                    "group relative rounded-lg border bg-card overflow-hidden transition-all duration-300",
                                    !isCompact && "hover:shadow-lg hover:-translate-y-1"
                                )}
                            >
                                {/* Product Image Placeholder */}
                                <div className="aspect-square bg-muted/30 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-muted/0 to-muted/60" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-4xl font-bold text-muted-foreground/10 uppercase tracking-widest">
                                            {product.category.slice(0, 1)}
                                        </div>
                                    </div>
                                    {!isCompact && (
                                        <div className="absolute top-2 right-2">
                                            <Badge variant="secondary" className="text-[10px]">
                                                {product.category}
                                            </Badge>
                                        </div>
                                    )}
                                </div>

                                {/* Product Info */}
                                <div className="p-3 space-y-2">
                                    <div className="space-y-1">
                                        <h3 className={cn("font-semibold tracking-tight", isCompact ? "text-xs" : "text-sm")}>
                                            {product.name}
                                        </h3>
                                        <p className={cn("font-bold", isCompact ? "text-sm" : "text-base")}>
                                            ${product.price}
                                        </p>
                                    </div>

                                    {!isCompact && (
                                        <Button
                                            size="sm"
                                            className="w-full"
                                            variant={inCart ? "secondary" : "default"}
                                            onClick={() => !inCart && handleAddToCart(product.id)}
                                            disabled={isAdding || inCart}
                                        >
                                            {isAdding ? (
                                                <span className="flex items-center gap-1">
                                                    <div className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                                    Adding...
                                                </span>
                                            ) : inCart ? (
                                                <span className="flex items-center gap-1">
                                                    <Check className="w-3 h-3" />
                                                    In Cart
                                                </span>
                                            ) : (
                                                <span className="flex items-center gap-1">
                                                    <Plus className="w-3 h-3" />
                                                    Add to Cart
                                                </span>
                                            )}
                                        </Button>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>

                {!isCompact && cartCount > 0 && (
                    <div className="mt-6 p-4 rounded-lg border bg-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium">Cart Summary</p>
                                <p className="text-xs text-muted-foreground">{cartCount} item{cartCount !== 1 ? 's' : ''} added</p>
                            </div>
                            <Button size="sm" variant="outline">
                                View Cart
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
