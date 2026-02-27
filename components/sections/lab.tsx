"use client"

import { motion } from "framer-motion"
import { Container } from "@/components/layout/container"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function Lab() {
    return (
        <section id="lab" className="py-12 md:py-24">
            <Container>
                <ScrollAnimation>
                    <div className="mb-12">
                        <h2 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">The Lab</h2>
                        <p className="text-muted-foreground text-lg">
                            A playground for experiments, half-baked ideas, and UI interactions.
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Experiment 1 */}
                    <ScrollAnimation delay={0.1}>
                        <div className="aspect-square rounded-xl border bg-card p-8 flex items-center justify-center overflow-hidden relative group h-full">
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
                            <motion.div
                                className="w-20 h-20 bg-accent rounded-xl"
                                viewport={{ once: true }}
                                animate={{
                                    rotate: [0, 90, 180, 270, 360],
                                    borderRadius: ["20%", "50%", "20%", "50%", "20%"],
                                }}
                                transition={{
                                    duration: 4,
                                    ease: "easeInOut",
                                    times: [0, 0.2, 0.5, 0.8, 1],
                                    repeat: Infinity,
                                    repeatDelay: 1
                                }}
                            />
                            <div className="absolute bottom-4 left-4 text-sm font-medium">Morphing Shape</div>
                        </div>
                    </ScrollAnimation>

                    {/* Experiment 2 */}
                    <ScrollAnimation delay={0.2}>
                        <div className="aspect-square rounded-xl border bg-card p-8 flex items-center justify-center overflow-hidden relative h-full">
                            <motion.div
                                className="flex space-x-1"
                                viewport={{ once: true }}
                            >
                                {[0, 1, 2].map((i) => (
                                    <motion.div
                                        key={i}
                                        className="w-4 h-16 bg-primary"
                                        animate={{
                                            scaleY: [1, 1.5, 1],
                                            opacity: [0.5, 1, 0.5]
                                        }}
                                        transition={{
                                            duration: 1,
                                            ease: "easeInOut",
                                            repeat: Infinity,
                                            delay: i * 0.2
                                        }}
                                    />
                                ))}
                            </motion.div>
                            <div className="absolute bottom-4 left-4 text-sm font-medium">Audio Viz</div>
                        </div>
                    </ScrollAnimation>

                    {/* Placeholder */}
                    <ScrollAnimation delay={0.3}>
                        <div className="aspect-square rounded-xl border border-dashed flex items-center justify-center text-muted-foreground bg-muted/20 h-full">
                            <span className="text-sm">More coming soon...</span>
                        </div>
                    </ScrollAnimation>
                </div>
            </Container>
        </section>
    )
}
