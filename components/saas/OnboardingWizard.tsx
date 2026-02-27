"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const ONBOARDING_KEY = "nuvio:onboardingComplete"

interface OnboardingWizardProps {
    onComplete: () => void
}

const STEPS = [
    {
        title: "Welcome to NuVio",
        description: "Modular products powered by a unified core",
        content: "NuVio is a comprehensive SaaS platform designed for fleet management. Each product module (Fleet, Clients, Staff, Docs, Plan, Edge, Lab) runs on a shared foundation providing authentication, billing, and tenant management."
    },
    {
        title: "Explore Modes",
        description: "Switch tenants and simulate different roles",
        content: "You can switch between different tenant accounts (Acme, GlobalTech, StartupX) and experience the platform from different role perspectives (Admin, Editor, Viewer). Each role has different access levels and capabilities."
    },
    {
        title: "Try Actions",
        description: "Test key features across products",
        content: "Explore core workflows:\n• Clients: Create customers and generate invoices\n• Fleet: Add vehicles and manage contracts\n• Staff: Manage employees and assign roles\n• Docs: Generate and export documents"
    },
    {
        title: "Power Tools",
        description: "Advanced demo capabilities",
        content: "Access advanced features in Settings:\n• Data Tools: Export and import your demo dataset (requires unlock)\n• Reset Demo: Clear all data and start fresh\n• Replay Onboarding: View this wizard again anytime"
    }
]

export function OnboardingWizard({ onComplete }: OnboardingWizardProps) {
    const [currentStep, setCurrentStep] = useState(0)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        // Show wizard with slight delay for smooth entrance
        const timer = setTimeout(() => setIsVisible(true), 100)
        return () => clearTimeout(timer)
    }, [])

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            handleFinish()
        }
    }

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleSkip = () => {
        handleFinish()
    }

    const handleFinish = () => {
        setIsVisible(false)
        setTimeout(() => {
            localStorage.setItem(ONBOARDING_KEY, "true")
            onComplete()
        }, 300)
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Escape") {
            handleSkip()
        } else if (e.key === "Enter") {
            handleNext()
        }
    }

    const step = STEPS[currentStep]

    return (
        <div
            className={cn(
                "fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm transition-opacity duration-300",
                isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
        >
            <div
                className={cn(
                    "relative w-full max-w-lg mx-4 bg-card border rounded-xl shadow-lg transition-transform duration-300",
                    isVisible ? "scale-100" : "scale-95"
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-purple-500" />
                        <span className="text-xs font-medium font-mono text-muted-foreground">
                            GETTING STARTED
                        </span>
                    </div>
                    <button
                        onClick={handleSkip}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold">{step.title}</h2>
                        <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                    </div>
                    <div className="text-sm leading-relaxed whitespace-pre-line">
                        {step.content}
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between p-6 border-t">
                    <div className="flex items-center gap-1">
                        {STEPS.map((_, index) => (
                            <div
                                key={index}
                                className={cn(
                                    "h-1.5 w-8 rounded-full transition-colors",
                                    index === currentStep ? "bg-purple-500" : "bg-muted"
                                )}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        {currentStep > 0 && (
                            <Button variant="outline" onClick={handleBack}>
                                Back
                            </Button>
                        )}
                        <Button onClick={currentStep === STEPS.length - 1 ? handleFinish : handleNext}>
                            {currentStep === STEPS.length - 1 ? "Finish" : "Next"}
                        </Button>
                    </div>
                </div>

                {/* Step Indicator */}
                <div className="absolute top-6 right-6 text-xs text-muted-foreground font-mono">
                    {currentStep + 1}/{STEPS.length}
                </div>
            </div>
        </div>
    )
}

export function useOnboarding() {
    const [showOnboarding, setShowOnboarding] = useState(false)

    useEffect(() => {
        // Check if onboarding has been completed
        const completed = localStorage.getItem(ONBOARDING_KEY)
        if (!completed) {
            setShowOnboarding(true)
        }
    }, [])

    const replayOnboarding = () => {
        setShowOnboarding(true)
    }

    const completeOnboarding = () => {
        setShowOnboarding(false)
    }

    return {
        showOnboarding,
        replayOnboarding,
        completeOnboarding
    }
}
