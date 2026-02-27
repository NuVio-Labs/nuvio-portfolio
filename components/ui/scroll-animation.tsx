"use client"

import { motion, MotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface ScrollAnimationProps extends MotionProps {
    children: React.ReactNode
    className?: string
    delay?: number
}

export function ScrollAnimation({
    children,
    className,
    delay = 0,
    ...props
}: ScrollAnimationProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            viewport={{ once: false, margin: "-50px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}
