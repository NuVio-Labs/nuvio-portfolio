import { Container } from "@/components/layout/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function About() {
    const skills = [
        { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
        { category: "Backend", items: ["Node.js", "PostgreSQL", "Supabase", "GraphQL", "Serverless"] },
        { category: "Design", items: ["Figma", "UI/UX", "Prototyping", "Design Systems", "Accessibility"] },
    ]

    const tools = ["VS Code", "Git", "Docker", "Vercel", "Linear", "Notion"]

    return (
        <section id="about" className="py-12 md:py-24 bg-secondary/20">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Bio Section */}
                    <ScrollAnimation>
                        <h2 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">About Me</h2>
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                I'm a Senior Fullstack Engineer & Product Designer with a passion for building digital products that look as good as they perform.
                            </p>
                            <p>
                                With over 8 years of experience, I bridge the gap between design and engineering. I believe that the best products are born from a deep understanding of both user needs and technical constraints.
                            </p>
                            <p>
                                My approach is minimalist and functional. I strip away the unnecessary to focus on what matters most: the content and the user interaction.
                            </p>
                        </div>
                    </ScrollAnimation>

                    {/* Stats / Quick Info */}
                    <div className="flex flex-col gap-6 lg:pl-12">
                        <ScrollAnimation delay={0.1}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Experience</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    8+ Years across focused startups and major tech companies.
                                </CardContent>
                            </Card>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.2}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Focus</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    React Ecosystem, Performance Optimization, and Design Systems.
                                </CardContent>
                            </Card>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.3}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Location</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    Based in Berlin, working globally.
                                </CardContent>
                            </Card>
                        </ScrollAnimation>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mt-24">
                    <ScrollAnimation>
                        <h3 className="mb-12 text-3xl font-bold tracking-tight">Technical Expertise</h3>
                    </ScrollAnimation>
                    <div className="grid gap-6 md:grid-cols-3">
                        {skills.map((skillGroup, index) => (
                            <ScrollAnimation key={skillGroup.category} delay={index * 0.1} className="h-full">
                                <Card className="h-full">
                                    <CardHeader>
                                        <CardTitle>{skillGroup.category}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-2">
                                            {skillGroup.items.map((item) => (
                                                <li key={item} className="flex items-center text-muted-foreground">
                                                    <span className="mr-2 h-1.5 w-1.5 rounded-full bg-accent" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </ScrollAnimation>
                        ))}
                    </div>
                </div>

                {/* Tooling Section */}
                <div className="mt-24">
                    <ScrollAnimation>
                        <h3 className="mb-8 text-2xl font-bold tracking-tight">Toolkit</h3>
                    </ScrollAnimation>
                    <div className="flex flex-wrap gap-4">
                        {tools.map((tool, index) => (
                            <ScrollAnimation key={tool} delay={index * 0.05}>
                                <div className="rounded-full border bg-secondary/30 px-4 py-2 text-sm font-medium text-secondary-foreground backdrop-blur-sm">
                                    {tool}
                                </div>
                            </ScrollAnimation>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    )
}
