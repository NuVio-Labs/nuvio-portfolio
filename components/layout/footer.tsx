import Link from "next/link"
import { Container } from "@/components/layout/container"

export function Footer() {
    return (
        <footer className="border-t border-border/40 py-12">
            <Container className="flex flex-col items-center justify-between gap-6 md:flex-row">
                <div className="flex flex-col items-center gap-1 text-center md:items-start md:text-left">
                    <p className="text-xs text-muted-foreground">
                        &copy; 2026 NuVioLabs
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Digital Products &middot; Web &middot; Systems
                    </p>
                </div>

                <nav className="flex flex-wrap justify-center gap-2 md:justify-end" aria-label="Footer navigation">
                    <Link href="/imprint" className="text-xs text-muted-foreground transition-colors hover:text-foreground min-h-[48px] inline-flex items-center px-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        Imprint
                    </Link>
                    <Link href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground min-h-[48px] inline-flex items-center px-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                        Privacy
                    </Link>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground min-h-[48px] inline-flex items-center px-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground min-h-[48px] inline-flex items-center px-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                        LinkedIn
                    </a>
                </nav>
            </Container>
        </footer>
    )
}
