"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronRight, ChevronLeft, Info, HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface DemoStep {
    title: string
    content: string
    target?: string // CSS selector if we want to highlight something (conceptual in this simple version)
}

const STEPS: DemoStep[] = [
    {
        title: "Welcome to NuVio",
        content: "NuVio is a modular SaaS platform powered by a unified core. Every feature you see is built as an independent module that plugs into our enterprise-grade foundation."
    },
    {
        title: "Tenant & Role Simulation",
        content: "We provide deep simulation of tenants and roles. You can experience the platform as an Acme Admin or a GlobalTech Viewer to see how permissions and branding adapt instantly."
    },
    {
        title: "Live Product Roadmap",
        content: "Transparency is at our core. The status pill in the top bar gives you live access to our development roadmap and the current progress of our edge-computing capabilities."
    },
    {
        title: "Enterprise Modules",
        content: "Explore active modules like Fleet, Clients, and Docs. In a real environment, these would be separate subscriptions tailored to the business needs."
    },
    {
        title: "Demo Safety Guard",
        content: "To maintain a clean experience for all reviewers, write actions (Create/Edit/Delete) are simulated. This ensures the demo environment remains stable and consistent."
    },
    {
        title: "Platform Power Tools",
        content: "For advanced users, we've included locked Data Tools in Settings. These demonstrate our commitment to data portability and developer-first transparency."
    }
]

export function NarratedDemo({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [currentStep, setCurrentStep] = useState(0)

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => { document.body.style.overflow = "unset" }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return
            if (e.key === "Escape") onClose()
            if (e.key === "ArrowRight" && currentStep < STEPS.length - 1) setCurrentStep(prev => prev + 1)
            if (e.key === "ArrowLeft" && currentStep > 0) setCurrentStep(prev => prev - 1)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isOpen, currentStep, onClose])

    if (!isOpen) return null

    const step = STEPS[currentStep]
    const isLast = currentStep === STEPS.length - 1

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative w-full max-w-lg bg-card border shadow-2xl rounded-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-600">
                                <HelpCircle className="h-5 w-5" />
                            </div>
                            <span className="text-xs font-bold font-mono tracking-widest text-muted-foreground uppercase">Step {currentStep + 1} of {STEPS.length}</span>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
                            <X className="h-4 w-4" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold tracking-tight">{step.title}</h2>
                        <p className="text-muted-foreground leading-relaxed">
                            {step.content}
                        </p>
                    </div>

                    <div className="mt-10 flex items-center justify-between">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Skip Tour
                        </Button>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setCurrentStep(prev => prev - 1)}
                                disabled={currentStep === 0}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Back
                            </Button>

                            <Button
                                size="sm"
                                onClick={() => isLast ? (localStorage.setItem("nuvio:guidedDemoCompleted", "true"), onClose()) : setCurrentStep(prev => prev + 1)}
                                className="bg-purple-600 hover:bg-purple-700"
                            >
                                {isLast ? "Done" : "Next"}
                                {!isLast && <ChevronRight className="h-4 w-4 ml-1" />}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="h-1 bg-muted w-full">
                    <div
                        className="h-full bg-purple-500 transition-all duration-500 ease-in-out"
                        style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                    />
                </div>
            </div>
        </div>
    )
}
