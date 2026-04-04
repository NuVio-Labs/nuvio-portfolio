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
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={cn(className)}
            {...props}
        >
            {children}
        </motion.div>
    )
}
