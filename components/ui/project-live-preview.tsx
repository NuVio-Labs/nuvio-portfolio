"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useTranslations } from "next-intl"
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
    const t = useTranslations("work")
    const [iframeState, setIframeState] = useState<"idle" | "loading" | "loaded" | "fallback">("idle")
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const ro = new ResizeObserver(([entry]) => {
            setContainerWidth(entry.contentRect.width)
        })
        ro.observe(el)
        return () => ro.disconnect()
    }, [])

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

    const handleLoadClick = () => {
        setIframeState("loading")
    }

    const handleIframeLoad = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIframeState("loaded")
    }, [])

    const handleIframeError = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIframeState("fallback")
    }, [])

    const scale = containerWidth > 0 ? containerWidth / CANVAS_W : 0
    const scaledHeight = CANVAS_H * scale

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Desktop: Scaled iframe in browser frame */}
            <div className="hidden md:block">
                <div className="rounded-xl border border-border/40 bg-card shadow-sm overflow-hidden transition-shadow duration-500 hover:shadow-xl">
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
                    <div className="relative overflow-hidden" style={{ height: scaledHeight > 0 ? `${scaledHeight}px` : "auto" }}>

                        {/* Always show image as base layer until iframe is fully loaded to prevent blank flashes */}
                        {iframeState !== "loaded" && (
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={previewImage}
                                    alt={t("previewAlt", { title })}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                />
                            </div>
                        )}

                        {/* GDPR Overlay - Idle State */}
                        {iframeState === "idle" && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/60 backdrop-blur-md p-6 text-center">
                                <div className="max-w-md space-y-4">
                                    <p className="text-sm text-foreground font-medium">
                                        Beim Laden der Live-Vorschau wird eine Verbindung zu externen Servern hergestellt. Dabei kann Ihre IP-Adresse übertragen werden.
                                    </p>
                                    <button
                                        onClick={handleLoadClick}
                                        className="inline-flex items-center justify-center h-10 px-6 mt-2 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                    >
                                        Live-Vorschau laden
                                    </button>
                                </div>
                            </div>
                        )}

                        {iframeState === "loading" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
                                    <span className="text-xs text-muted-foreground">{t("previewLoading")}</span>
                                </div>
                            </div>
                        )}

                        {(iframeState === "loading" || iframeState === "loaded") && scale > 0 && (
                            <iframe
                                src={url}
                                title={t("previewDesktopTitle", { title })}
                                style={{
                                    width: `${CANVAS_W}px`,
                                    height: `${CANVAS_H}px`,
                                    transform: `scale(${scale})`,
                                    transformOrigin: "top left",
                                    position: "relative",
                                    zIndex: 20
                                }}
                                className={cn(
                                    "border-0 pointer-events-auto transition-opacity duration-700",
                                    iframeState === "loaded" ? "opacity-100" : "opacity-0"
                                )}
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                onLoad={handleIframeLoad}
                                onError={handleIframeError}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile: Screenshot only */}
            <div className="md:hidden">
                <div className="overflow-hidden rounded-2xl border border-border/40 bg-muted/30 shadow-sm aspect-[4/3] relative">
                    <Image
                        src={previewImage}
                        alt={t("previewAlt", { title })}
                        fill
                        className="object-cover object-top"
                        sizes="100vw"
                    />
                </div>
            </div>

            {/* CTA */}
            <div className="mt-4">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center min-h-[48px] rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    aria-label={t("visitSiteLabel", { title })}
                >
                    {t("visitSite")}
                </a>
            </div>
        </div>
    )
}
