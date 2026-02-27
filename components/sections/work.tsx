"use client"

import Link from "next/link"

import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { projects } from "@/data/projects"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
import { VanguardDemo } from "@/components/demos/vanguard-demo"
import { HelixDemo } from "@/components/demos/helix-demo"
import { VelosDemo } from "@/components/demos/velos-demo"
import { NuvioCoreDemo } from "@/components/demos/nuvio-core-demo"
import { cn } from "@/lib/utils"



export function Work() {
    return (
        <section id="work" className="py-24 md:py-32">
            <Container>
                <ScrollAnimation>
                    <div className="mb-20">
                        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Selected Work</h2>
                        <p className="text-muted-foreground text-xl max-w-2xl leading-relaxed">
                            Deep dives into problems solved and value delivered. <br />
                            Quality over quantity.
                        </p>
                    </div>
                </ScrollAnimation>

                <div className="space-y-32">
                    {projects.map((project, index) => (
                        <ScrollAnimation key={project.id} className="group">
                            <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-start">
                                {/* Visual Side */}
                                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                                    <Link href={project.demoRoute || project.link} className={cn("block w-full h-full cursor-pointer", !project.demoRoute && "cursor-default")}>
                                        <div className="overflow-hidden rounded-2xl border border-border/40 bg-muted/30 shadow-sm transition-all duration-500 hover:shadow-xl aspect-[4/3] relative group-hover:-translate-y-2">
                                            {/* Render Demo Component or Placeholder */}
                                            {project.id === "vanguard" ? (
                                                <div className="absolute inset-0 z-0">
                                                    <VanguardDemo mode="compact" />
                                                    <div className="absolute top-4 left-4 z-20">
                                                        <span className="inline-flex items-center rounded-full border bg-background/80 px-2.5 py-0.5 text-xs font-semibold text-foreground backdrop-blur-sm shadow-sm">
                                                            <span className="mr-1.5 h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                                                            Live Preview
                                                        </span>
                                                    </div>
                                                    <div className="absolute inset-0 z-10 bg-transparent" />
                                                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-lg">
                                                            Open Demo
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : project.id === "helix" ? (
                                                <div className="absolute inset-0 z-0">
                                                    <HelixDemo mode="compact" />
                                                    <div className="absolute top-4 left-4 z-20">
                                                        <span className="inline-flex items-center rounded-full border bg-background/80 px-2.5 py-0.5 text-xs font-semibold text-foreground backdrop-blur-sm shadow-sm">
                                                            <span className="mr-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
                                                            Live Preview
                                                        </span>
                                                    </div>
                                                    <div className="absolute inset-0 z-10 bg-transparent" />
                                                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-lg">
                                                            Open Demo
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : project.id === "velos" ? (
                                                <div className="absolute inset-0 z-0">
                                                    <VelosDemo mode="compact" />
                                                    <div className="absolute top-4 left-4 z-20">
                                                        <span className="inline-flex items-center rounded-full border bg-background/80 px-2.5 py-0.5 text-xs font-semibold text-foreground backdrop-blur-sm shadow-sm">
                                                            <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500"></span>
                                                            Live Preview
                                                        </span>
                                                    </div>
                                                    <div className="absolute inset-0 z-10 bg-transparent" />
                                                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-lg">
                                                            Open Demo
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : project.id === "nuvio-core" ? (
                                                <div className="absolute inset-0 z-0">
                                                    <NuvioCoreDemo mode="compact" />
                                                    <div className="absolute top-4 left-4 z-20">
                                                        <span className="inline-flex items-center rounded-full border bg-background/80 px-2.5 py-0.5 text-xs font-semibold text-foreground backdrop-blur-sm shadow-sm">
                                                            <span className="mr-1.5 h-2 w-2 rounded-full bg-purple-500"></span>
                                                            Platform Preview
                                                        </span>
                                                    </div>
                                                    <div className="absolute inset-0 z-10 bg-transparent" />
                                                    <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                        <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-lg">
                                                            Open Core
                                                        </span>
                                                    </div>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="absolute inset-0 bg-gradient-to-br from-background/0 to-background/80 z-10" />
                                                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-muted-foreground/10 uppercase tracking-widest">
                                                        {project.title} Preview
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </Link>
                                </div>

                                {/* Content Side */}
                                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-3xl font-bold tracking-tight">{project.title}</h3>
                                        <span className="rounded-full border px-3 py-1 text-xs font-medium text-muted-foreground">
                                            {project.category}
                                        </span>
                                    </div>

                                    <p className="text-xl text-foreground/80 mb-8 leading-relaxed font-medium">
                                        {project.description}
                                    </p>

                                    {project.caseStudy && (
                                        <div className="space-y-8 mb-8">
                                            <div>
                                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">The Problem</h4>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {project.caseStudy.problem}
                                                </p>
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">The Solution</h4>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {project.caseStudy.solution}
                                                </p>
                                            </div>
                                            <div className="pl-4 border-l-2 border-accent">
                                                <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">The Result</h4>
                                                <p className="text-foreground font-medium leading-relaxed">
                                                    {project.caseStudy.result}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-2 mb-8">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="text-sm text-muted-foreground/80 bg-secondary/40 px-3 py-1.5 rounded-md">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Link removed as detailed pages are not yet implemented */}
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </Container>
        </section>
    )
}
