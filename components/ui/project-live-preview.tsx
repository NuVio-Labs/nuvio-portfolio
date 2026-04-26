"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { cn } from "@/lib/utils"

const CANVAS_W = 1440
const CANVAS_H = 900
const IFRAME_TIMEOUT_MS = 3000

interface ProjectLivePreviewProps {
    url: string
    title: string
    previewImage: string
    isLocal?: boolean
}

export function ProjectLivePreview({ url, title, previewImage, isLocal = false }: ProjectLivePreviewProps) {
    const t = useTranslations("work")
    const [iframeState, setIframeState] = useState<"idle" | "loading" | "loaded" | "fallback">(
        isLocal ? "loading" : "idle"
    )
    const [containerWidth, setContainerWidth] = useState(0)
    const containerRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    useEffect(() => {
        const element = containerRef.current
        if (!element) return
        const ro = new ResizeObserver(([entry]) => setContainerWidth(entry.contentRect.width))
        ro.observe(element)
        return () => ro.disconnect()
    }, [])

    useEffect(() => {
        if (iframeState !== "loading") return
        timeoutRef.current = setTimeout(() => {
            setIframeState((prev) => (prev === "loading" ? "fallback" : prev))
        }, IFRAME_TIMEOUT_MS)
        return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
    }, [iframeState])

    const handleIframeLoad = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIframeState("loaded")
    }, [])
    const handleIframeError = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        setIframeState("fallback")
    }, [])

    const scale = containerWidth > 0 ? containerWidth / CANVAS_W : 0
    const iframeHeight = scale > 0 ? CANVAS_H * scale : 0

    return (
        <div ref={containerRef} className="w-full">
            {/* Browser frame */}
            <div className="overflow-hidden rounded-[1.6rem] border border-border-soft bg-surface shadow-sm">
                {/* Chrome bar */}
                <div className="flex items-center gap-3 border-b border-border-soft bg-surface-soft px-4 py-3">
                    <div className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
                        <span className="h-2.5 w-2.5 rounded-full bg-border-soft" />
                        <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
                    </div>
                    <div className="flex flex-1 items-center justify-between gap-2 rounded-full border border-border-soft bg-background px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-text-muted">
                        <span className="truncate">{url.replace("https://", "")}</span>
                        <ExternalLink className="h-3 w-3 shrink-0 opacity-50" />
                    </div>
                </div>

                {/* Preview viewport — fixed 16:10 aspect ratio */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-soft">
                    {/* Screenshot always visible as base layer */}
                    <Image
                        src={previewImage}
                        alt={t("previewAlt", { title })}
                        fill
                        className="object-cover object-top"
                        sizes="(min-width: 1280px) 40vw, (min-width: 768px) 50vw, 100vw"
                    />

                    {/* GDPR consent overlay — centered, clean */}
                    {iframeState === "idle" && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/60 backdrop-blur-sm">
                            <div className="mx-6 max-w-[320px] rounded-2xl border border-border-soft bg-surface p-6 text-center shadow-md">
                                <p className="text-sm leading-6 text-text-muted">
                                    {t("previewGdprText")}
                                </p>
                                <button
                                    onClick={() => setIframeState("loading")}
                                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-accent px-5 py-3 text-sm font-semibold text-surface transition duration-200 hover:bg-[var(--nv-accent-hover)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50"
                                >
                                    {t("previewLoadBtn")}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Loading spinner */}
                    {iframeState === "loading" && (
                        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background/50 backdrop-blur-sm">
                            <div className="flex flex-col items-center gap-3">
                                <div className="h-6 w-6 animate-spin rounded-full border-2 border-accent/20 border-t-accent" />
                                <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                                    {t("previewLoading")}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Live iframe — only mounted when loading/loaded and width is known */}
                    {(iframeState === "loading" || iframeState === "loaded") && scale > 0 && (
                        <div
                            className="absolute inset-0 z-20"
                            style={{ height: `${iframeHeight}px` }}
                        >
                            <iframe
                                src={url}
                                title={t("previewDesktopTitle", { title })}
                                style={{
                                    width: `${CANVAS_W}px`,
                                    height: `${CANVAS_H}px`,
                                    transform: `scale(${scale})`,
                                    transformOrigin: "top left",
                                }}
                                className={cn(
                                    "border-0 transition-opacity duration-700",
                                    iframeState === "loaded"
                                        ? "pointer-events-auto opacity-100"
                                        : "pointer-events-none opacity-0"
                                )}
                                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                                loading="lazy"
                                referrerPolicy="no-referrer"
                                onLoad={handleIframeLoad}
                                onError={handleIframeError}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Link bar */}
            <div className="mt-3 flex items-center justify-end">
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-soft bg-surface px-4 py-2 text-xs font-medium text-text-muted transition duration-200 hover:border-accent/40 hover:text-accent"
                    aria-label={t("visitSiteLabel", { title })}
                >
                    {t("visitSite")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
            </div>
        </div>
    )
}
