"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"
import { cn } from "@/lib/utils"

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
        const element = containerRef.current
        if (!element) return

        const resizeObserver = new ResizeObserver(([entry]) => {
            setContainerWidth(entry.contentRect.width)
        })

        resizeObserver.observe(element)
        return () => resizeObserver.disconnect()
    }, [])

    useEffect(() => {
        if (iframeState !== "loading") return

        timeoutRef.current = setTimeout(() => {
            setIframeState((previousState) => (previousState === "loading" ? "fallback" : previousState))
        }, IFRAME_TIMEOUT_MS)

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
    const scaledHeight = scale > 0 ? CANVAS_H * scale : 360

    return (
        <div ref={containerRef} className="relative w-full">
            <div className="pointer-events-none absolute inset-x-[10%] bottom-[8%] h-20 rounded-full bg-[#E0B84A]/14 blur-[60px]" />

            <div className="relative hidden md:block">
                <div className="overflow-hidden rounded-[1.8rem] border border-[#CFA565]/24 bg-[linear-gradient(180deg,rgba(22,17,13,0.96),rgba(12,10,8,0.98))] p-3 shadow-[0_28px_80px_rgba(0,0,0,0.28),0_0_80px_rgba(224,184,74,0.06)]">
                    <div className="rounded-[1.25rem] border border-white/8 bg-[rgba(16,13,10,0.92)]">
                        <div className="flex items-center gap-3 border-b border-white/6 px-4 py-3">
                            <div className="flex gap-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
                                <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
                                <span className="h-2.5 w-2.5 rounded-full bg-[#E0B84A]/45" />
                            </div>

                            <div className="flex-1">
                                <div className="mx-auto flex max-w-[22rem] items-center justify-between gap-3 rounded-full border border-white/8 bg-[#0D0B09]/88 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#8F7B60]">
                                    <span className="whitespace-nowrap">{t("previewBadge")}</span>
                                    <span className="truncate text-[#BFAF96]">{url.replace("https://", "")}</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative overflow-hidden rounded-b-[1.25rem]" style={{ height: `${scaledHeight}px` }}>
                            {iframeState !== "loaded" && (
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src={previewImage}
                                        alt={t("previewAlt", { title })}
                                        fill
                                        className="object-cover object-top"
                                        sizes="(min-width: 768px) 50vw, 100vw"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.08),rgba(5,5,5,0.22),rgba(5,5,5,0.44))]" />
                                </div>
                            )}

                            {iframeState === "idle" && (
                                <div className="absolute inset-0 z-10 flex items-end justify-start bg-[linear-gradient(180deg,rgba(6,5,4,0.08),rgba(6,5,4,0.28),rgba(6,5,4,0.7))] p-6">
                                    <div className="max-w-md rounded-[1.4rem] border border-[#DAB983]/18 bg-[rgba(12,10,8,0.74)] p-5 backdrop-blur-xl">
                                        <p className="text-sm leading-6 text-[#E7D8C2]">
                                            {t("previewGdprText")}
                                        </p>
                                        <button
                                            onClick={handleLoadClick}
                                            className="mt-4 inline-flex items-center justify-center rounded-full border border-[#E0B84A]/24 bg-[linear-gradient(135deg,#F2D896_0%,#D8A14A_100%)] px-5 py-3 text-sm font-semibold text-[#24170A] shadow-[0_16px_34px_rgba(197,144,58,0.18)] transition duration-300 hover:-translate-y-0.5 hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E0B84A]/45"
                                        >
                                            {t("previewLoadBtn")}
                                        </button>
                                    </div>
                                </div>
                            )}

                            {iframeState === "loading" && (
                                <div className="absolute inset-0 z-10 flex items-center justify-center bg-[rgba(8,7,5,0.78)] backdrop-blur-md">
                                    <div className="flex flex-col items-center gap-3">
                                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#E0B84A]/20 border-t-[#E0B84A]" />
                                        <span className="text-xs uppercase tracking-[0.18em] text-[#BFAF96]">
                                            {t("previewLoading")}
                                        </span>
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
                                        zIndex: 20,
                                    }}
                                    className={cn(
                                        "border-0 transition-opacity duration-700",
                                        iframeState === "loaded" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
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
            </div>

            <div className="md:hidden">
                <div className="overflow-hidden rounded-[1.6rem] border border-[#CFA565]/24 bg-[linear-gradient(180deg,rgba(22,17,13,0.96),rgba(12,10,8,0.98))] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.24)]">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[1.2rem] border border-white/8 bg-[#0E0C0A]">
                        <Image
                            src={previewImage}
                            alt={t("previewAlt", { title })}
                            fill
                            className="object-cover object-top"
                            sizes="100vw"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,5,5,0.02),rgba(5,5,5,0.18),rgba(5,5,5,0.42))]" />
                    </div>
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#8F7B60]">
                    {t("previewBadge")}
                </span>

                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[46px] items-center gap-2 rounded-full border border-[#DAB983]/18 bg-white/[0.04] px-5 py-3 text-sm font-semibold text-[#F7F1E9] transition duration-300 hover:-translate-y-0.5 hover:bg-white/[0.08]"
                    aria-label={t("visitSiteLabel", { title })}
                >
                    {t("visitSite")}
                    <ArrowUpRight className="h-4 w-4" />
                </a>
            </div>
        </div>
    )
}
