"use client"

import { useState } from "react"
import { Container } from "@/components/layout/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { ScrollAnimation } from "@/components/ui/scroll-animation"

export function Contact() {
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle")

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setStatus("submitting")

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 1500))

        setStatus("success")
    }

    return (
        <section id="contact" className="py-12 md:py-24 bg-secondary/20">
            <Container className="max-w-2xl">
                <ScrollAnimation>
                    <div className="mb-12 text-center">
                        <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">Get in Touch</h2>
                        <p className="text-muted-foreground text-lg">
                            Have feedback, want to collaborate, or just want to connect? I'd love to hear from you.
                        </p>
                    </div>
                </ScrollAnimation>

                <ScrollAnimation delay={0.2}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Send a Message</CardTitle>
                            <CardDescription>
                                Drop me a message and I'll get back to you as soon as I can.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center animate-in fade-in zoom-in duration-300">
                                    <div className="rounded-full bg-green-100 p-3 dark:bg-green-900/20">
                                        <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-bold">Message Sent!</h3>
                                    <p className="text-muted-foreground">Thanks for reaching out. I'll be in touch shortly.</p>
                                    <Button variant="outline" onClick={() => setStatus("idle")} className="mt-4">
                                        Send Another
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Name</Label>
                                            <Input id="name" name="name" placeholder="Your name" required disabled={status === "submitting"} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input id="email" name="email" type="email" placeholder="your@email.com" required disabled={status === "submitting"} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="subject">Subject</Label>
                                        <Input id="subject" name="subject" placeholder="What's this about?" required disabled={status === "submitting"} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <Textarea
                                            id="message"
                                            name="message"
                                            placeholder="Your message..."
                                            className="min-h-[150px]"
                                            required
                                            disabled={status === "submitting"}
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={status === "submitting"}>
                                        {status === "submitting" ? (
                                            <span className="flex items-center">
                                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-r-transparent" />
                                                Sending...
                                            </span>
                                        ) : (
                                            "Send Message"
                                        )}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </ScrollAnimation>
            </Container>
        </section>
    )
}
