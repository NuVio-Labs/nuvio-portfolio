import { Container } from "@/components/layout/container"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function About() {
    const skills = [
        { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"] },
        { category: "Backend", items: ["Node.js", "PostgreSQL", "Supabase", "REST APIs", "Serverless"] },
        { category: "Design & Tools", items: ["Figma", "Git", "Vercel", "VS Code", "Responsive Design"] },
    ]

    return (
        <section id="about" className="py-12 md:py-24 bg-secondary/20">
            <Container>
                <div className="grid gap-12 lg:grid-cols-2">
                    {/* Bio Section */}
                    <ScrollAnimation>
                        <h2 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">About Me</h2>
                        <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                            <p>
                                I'm a self-taught junior fullstack developer with a genuine love for building things on the web. I started learning through online resources, documentation, and — above all — by shipping real projects.
                            </p>
                            <p>
                                Every project on this site is a case study from my learning journey. I don't just follow tutorials — I take on real challenges, make mistakes, and iterate until the result meets a standard I'm proud of.
                            </p>
                            <p>
                                My goal is simple: get better every day, write clean code, and build products that feel polished and purposeful.
                            </p>
                        </div>
                    </ScrollAnimation>

                    {/* Quick Info Cards */}
                    <div className="flex flex-col gap-6 lg:pl-12">
                        <ScrollAnimation delay={0.1}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Background</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    Self-study, online courses, and learning by building from day one. No bootcamp, no CS degree — just curiosity and persistence.
                                </CardContent>
                            </Card>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.2}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Focus</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    React Ecosystem, modern web performance, and building end-to-end products from design to deployment.
                                </CardContent>
                            </Card>
                        </ScrollAnimation>
                        <ScrollAnimation delay={0.3}>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Location</CardTitle>
                                </CardHeader>
                                <CardContent className="text-muted-foreground">
                                    Based in Germany, open to remote work.
                                </CardContent>
                            </Card>
                        </ScrollAnimation>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mt-24">
                    <ScrollAnimation>
                        <h3 className="mb-12 text-3xl font-bold tracking-tight">What I'm Working With</h3>
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
            </Container>
        </section>
    )
}
