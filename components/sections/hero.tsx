import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/layout/container"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function Hero() {
    return (
        <section id="home" className="relative flex min-h-[80vh] flex-col justify-center overflow-hidden pt-16 md:pt-24">
            <Container className="relative z-10 flex flex-col items-center text-center">
                <ScrollAnimation delay={0.1}>
                    <div className="mb-8 inline-flex items-center rounded-full border border-border/40 bg-background/50 px-4 py-1.5 text-sm font-medium text-muted-foreground backdrop-blur-sm shadow-sm">
                        <span className="mr-2 inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Available for new projects
                    </div>
                </ScrollAnimation>

                <ScrollAnimation delay={0.2} className="relative">
                    <h1 className="mb-8 bg-gradient-to-b from-foreground to-foreground/70 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-8xl md:text-9xl leading-[0.9]">
                        Crafting Digital <br />
                        <span className="text-foreground">Perfection.</span>
                    </h1>
                </ScrollAnimation>

                <ScrollAnimation delay={0.3}>
                    <p className="mb-12 max-w-2xl text-xl text-muted-foreground md:text-2xl leading-relaxed text-balance">
                        I simplify complexity through minimalist design and robust engineering.
                        Building high-performance web applications that feel exceptional.
                    </p>
                </ScrollAnimation>

                <ScrollAnimation delay={0.4}>
                    <div className="flex flex-col gap-5 sm:flex-row">
                        <Link href="#work">
                            <Button size="lg" className="h-14 px-10 text-lg rounded-full shadow-lg hover:shadow-xl transition-all">
                                View Work
                            </Button>
                        </Link>
                        <Link href="#contact">
                            <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-full border-2 hover:bg-secondary/50">
                                Get in Touch
                            </Button>
                        </Link>
                    </div>
                </ScrollAnimation>
            </Container>

            {/* Background Gradients */}
            <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/20 blur-[100px]" />
            <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-[20%] rounded-full bg-blue-500/10 blur-[120px]" />
        </section>
    )
}
