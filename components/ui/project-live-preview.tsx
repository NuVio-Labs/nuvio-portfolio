"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

/* ─── Constants ─── */
const CANVAS_W = 1440
const CANVAS_H = 900
const IFRAME_TIMEOUT_MS = 2500

interface ProjectLivePreviewProps {
    url: string
    title: string
    previewImage: string
}

export function ProjectLivePreview({ url, title, previewImage }: ProjectLivePreviewProps) {
    const [iframeState, setIframeState] = useState<"idle" | "loading" | "loaded" | "fallback">("idle")
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    /* ─── Measure container width for scale calculation ─── */
    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const ro = new ResizeObserver(([entry]) => {
            setContainerWidth(entry.contentRect.width)
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

    /* ─── IntersectionObserver: lazy-load iframe when visible (desktop only) ─── */
    useEffect(() => {
        const el = containerRef.current
        if (!el) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && iframeState === "idle") {
                    setIframeState("loading")
                    observer.disconnect()
                }
            },
            { rootMargin: "200px" }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [iframeState])

    /* ─── Timeout: fallback if iframe doesn't load in time ─── */
    useEffect(() => {
        if (iframeState === "loading") {
            timeoutRef.current = setTimeout(() => {
                setIframeState((prev) => (prev === "loading" ? "fallback" : prev))
            }, IFRAME_TIMEOUT_MS)
        }
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current)
        }
    }, [iframeState])

    const handleIframeLoad = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIframeState("loaded")
    }, [])

    const handleIframeError = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIframeState("fallback")
    }, [])

    /* ─── Scale calculation ─── */
    const scale = containerWidth > 0 ? containerWidth / CANVAS_W : 0
    const scaledHeight = CANVAS_H * scale

    return (
        <div ref={containerRef} className="relative w-full">
            {/* ═══════════════════════════════════════════
                DESKTOP (>= md): Scaled iframe in browser frame
                ═══════════════════════════════════════════ */}
            <div className="hidden md:block">
                {/* Browser Chrome Frame */}
                <div className="rounded-xl border border-border/40 bg-card shadow-sm overflow-hidden transition-shadow duration-500 hover:shadow-xl">
                    {/* Top bar (fake browser chrome) */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/30 bg-muted/30">
                        <div className="flex gap-1.5">
                            <div className="h-3 w-3 rounded-full bg-red-400/60" />
                            <div className="h-3 w-3 rounded-full bg-yellow-400/60" />
                            <div className="h-3 w-3 rounded-full bg-green-400/60" />
                        </div>
                        <div className="flex-1 mx-4">
                            <div className="max-w-xs mx-auto rounded-md bg-muted/50 px-3 py-1 text-[10px] text-muted-foreground text-center font-mono truncate">
                                {url.replace("https://", "")}
                            </div>
                        </div>
                    </div>

                    {/* Iframe viewport */}
                    <div
                        className="relative overflow-hidden"
                        style={{ height: scaledHeight > 0 ? `${scaledHeight}px` : "auto" }}
                    >
                        {/* Loading skeleton */}
                        {(iframeState === "idle" || iframeState === "loading") && (
                            <div className="absolute inset-0 flex items-center justify-center bg-muted/40 z-10">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-muted-foreground/20 border-t-muted-foreground" />
                                    <span className="text-xs text-muted-foreground">Loading preview…</span>
                                </div>
                            </div>
                        )}

                        {/* Scaled iframe — forced to desktop width */}
                        {(iframeState === "loading" || iframeState === "loaded") && scale > 0 && (
                            <iframe
                                src={url}
                                title={`Live desktop preview of ${title}`}
                                style={{
                                    width: `${CANVAS_W}px`,
                                    height: `${CANVAS_H}px`,
                                    transform: `scale(${scale})`,
                                    transformOrigin: "top left",
                                }}
                                className={cn(
                                    "border-0 pointer-events-none transition-opacity duration-500",
                                    iframeState === "loaded" ? "opacity-100" : "opacity-0"
                                )}
                                sandbox="allow-scripts allow-same-origin"
                                loading="lazy"
                                onLoad={handleIframeLoad}
                                onError={handleIframeError}
                            />
                        )}

                        {/* Fallback screenshot (desktop) */}
                        {iframeState === "fallback" && (
                            <div className="relative" style={{ height: scaledHeight > 0 ? `${scaledHeight}px` : "400px" }}>
                                <Image
                                    src={previewImage}
                                    alt={`Screenshot of ${title}`}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                MOBILE (< md): Screenshot only, no iframe
                ═══════════════════════════════════════════ */}
            <div className="md:hidden">
                <div className="overflow-hidden rounded-2xl border border-border/40 bg-muted/30 shadow-sm aspect-[4/3] relative">
                    <Image
                        src={previewImage}
                        alt={`Screenshot of ${title}`}
                        fill
                        className="object-cover object-top"
                        sizes="100vw"
                    />
                </div>
            </div>

            {/* ═══════════════════════════════════════════
                CTA — always visible below the preview
                ═══════════════════════════════════════════ */}
            <div className="mt-4">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[48px] rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={`Visit ${title} — opens in new tab`}
                >
                    Visit Live Site →
                </a>
            </div>
        </div>
    )
}
