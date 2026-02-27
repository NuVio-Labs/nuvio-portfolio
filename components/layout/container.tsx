import { cn } from "@/lib/utils"

export function Container({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("mx-auto w-full max-w-[1400px] px-6 md:px-8", className)}
            {...props}
        >
            {children}
        </div>
    )
}
