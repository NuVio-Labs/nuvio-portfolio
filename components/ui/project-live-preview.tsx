"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ProjectLivePreviewProps {
    url: string
    title: string
    previewImage: string
}

export function ProjectLivePreview({ url, title, previewImage }: ProjectLivePreviewProps) {
    const [state, setState] = useState<"idle" | "loading" | "loaded" | "fallback">("idle")
    const containerRef = useRef<HTMLDivElement>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const handleIframeLoad = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setState("loaded")
    }, [])

    const handleIframeError = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setState("fallback")
    }, [])

    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setState("loading")
                    observer.disconnect()
                }
            },
            { rootMargin: "200px" }
        )

        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (state === "loading") {
            timeoutRef.current = setTimeout(() => {
                setState((prev) => (prev === "loading" ? "fallback" : prev))
            }, 2500)
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [state])

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Preview Container */}
            <div className="overflow-hidden rounded-2xl border border-border/40 bg-muted/30 shadow-sm transition-all duration-500 hover:shadow-xl aspect-[4/3] relative group">
                {/* State: idle or loading — show skeleton + optional loading iframe behind it */}
                {(state === "idle" || state === "loading") && (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                        <div className="flex flex-col items-center gap-3">
                            <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
                            <span className="text-xs text-muted-foreground">Loading preview…</span>
                        </div>
                    </div>
                )}

                {/* iframe — render when loading state, hide behind skeleton */}
                {(state === "loading" || state === "loaded") && (
                    <iframe
                        ref={iframeRef}
                        src={url}
                        title={`Live preview of ${title}`}
                        className={cn(
                            "absolute inset-0 h-full w-full border-0 pointer-events-none transition-opacity duration-500",
                            state === "loaded" ? "opacity-100" : "opacity-0"
                        )}
                        sandbox="allow-scripts allow-same-origin"
                        loading="lazy"
                        onLoad={handleIframeLoad}
                        onError={handleIframeError}
                    />
                )}

                {/* Fallback — static screenshot */}
                {state === "fallback" && (
                    <Image
                        src={previewImage}
                        alt={`Screenshot of ${title}`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                )}

                {/* Hover overlay — always present */}
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10 flex items-end justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    aria-label={`Visit ${title} live site`}
                >
                    <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-lg">
                        Visit Live Site →
                    </span>
                </a>
            </div>
        </div>
    )
}
