import Image from "next/image"

interface JournalImageProps {
    src: string
    alt: string
    /** Echte Bildmassen — verhindern Layout-Shift beim Laden. */
    width?: number
    height?: number
    caption?: string
    priority?: boolean
}

/**
 * Bild im Artikelfluss. Immer mit expliziten Massen, damit der Platz vor dem
 * Laden reserviert ist (kein CLS). Mit `caption` wird daraus figure/figcaption.
 */
export function JournalImage({
    src,
    alt,
    width = 1600,
    height = 900,
    caption,
    priority = false,
}: JournalImageProps) {
    const image = (
        <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 768px) 720px, 100vw"
            priority={priority}
            className="w-full rounded-2xl border border-border-soft bg-surface-soft"
        />
    )

    if (!caption) return <div className="my-10">{image}</div>

    return (
        <figure className="my-10">
            {image}
            <figcaption className="mt-3 text-sm leading-6 text-text-muted">{caption}</figcaption>
        </figure>
    )
}
