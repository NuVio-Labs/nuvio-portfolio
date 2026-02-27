"use client"

import { Container } from "@/components/layout/container"
import { projects } from "@/data/projects"
import { ScrollAnimation } from "@/components/ui/scroll-animation"
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
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full h-full cursor-pointer"
                                    >
                                        <div className="overflow-hidden rounded-2xl border border-border/40 bg-muted/30 shadow-sm transition-all duration-500 hover:shadow-xl aspect-[4/3] relative group-hover:-translate-y-2">
                                            {/* Gradient placeholder with project title */}
                                            <div className={cn(
                                                "absolute inset-0 flex flex-col items-center justify-center",
                                                index === 0
                                                    ? "bg-gradient-to-br from-amber-500/20 via-orange-500/10 to-background/80"
                                                    : "bg-gradient-to-br from-rose-500/20 via-pink-500/10 to-background/80"
                                            )}>
                                                <span className="text-4xl font-bold text-foreground/15 uppercase tracking-widest text-center px-8">
                                                    {project.title}
                                                </span>
                                            </div>
                                            <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <span className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-lg">
                                                    Visit Live Site →
                                                </span>
                                            </div>
                                        </div>
                                    </a>
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
                                                <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-2">The Approach</h4>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {project.caseStudy.solution}
                                                </p>
                                            </div>
                                            <div className="pl-4 border-l-2 border-accent">
                                                <h4 className="text-sm font-semibold uppercase tracking-wider text-accent mb-2">The Outcome</h4>
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

                                    {project.link && project.link !== "#" && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center text-sm font-medium text-accent hover:text-accent/80 transition-colors"
                                        >
                                            Visit Live Site →
                                        </a>
                                    )}
                                </div>
                            </div>
                        </ScrollAnimation>
                    ))}
                </div>
            </Container>
        </section>
    )
}
