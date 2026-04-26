import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium rounded-full border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
    {
        variants: {
            variant: {
                /* Gold filled – primary action */
                default:
                    "bg-accent text-surface border-transparent hover:bg-[var(--nv-accent-hover)]",
                /* Bordered – secondary action */
                outline:
                    "bg-transparent text-text-primary border-border-soft hover:border-accent hover:text-accent",
                /* Text only – ghost / tertiary */
                ghost:
                    "bg-transparent text-accent border-transparent hover:text-[var(--nv-accent-hover)] underline-offset-4 hover:underline",
                /* Destructive */
                destructive:
                    "bg-destructive text-white border-transparent hover:bg-destructive/90",
                /* Icon button */
                icon:
                    "bg-transparent border-border-soft text-text-muted hover:text-text-primary hover:border-accent/40",
            },
            size: {
                sm: "px-4 py-2 text-sm",
                default: "px-6 py-3 text-sm",
                lg: "px-8 py-4 text-base",
                icon: "h-9 w-9 p-0",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, asChild = false, ...props }, ref) => {
        const Comp = asChild ? Slot : "button"
        return (
            <Comp
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }
