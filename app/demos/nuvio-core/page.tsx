"use client"

import Link from "next/link"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { ArrowLeft, RefreshCw } from "lucide-react"
import { NuvioCoreDemo } from "@/components/demos/nuvio-core-demo"
import { useState } from "react"

export default function NuvioCoreDemoPage() {
    const [key, setKey] = useState(0)

    const handleReset = () => {
        setKey(prev => prev + 1)
    }

    return (
        <main className="min-h-screen py-12 bg-background">
            <Container>
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                        <Link href="/#work" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Work
                        </Link>
                        <h1 className="text-3xl font-bold tracking-tight">NuVio Platform</h1>
                        <p className="text-muted-foreground mt-1">
                            Modular products powered by a unified core
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={handleReset}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Reset Demo
                        </Button>
                    </div>
                </div>

                <div className="h-[600px] w-full rounded-xl overflow-hidden border bg-background shadow-xl">
                    <NuvioCoreDemo key={key} mode="full" />
                </div>
            </Container>
        </main>
    )
}
