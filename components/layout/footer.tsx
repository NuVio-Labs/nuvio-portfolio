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
                    <p className="text-xs text-muted-foreground/60">
                        Digital Products &middot; Web &middot; Systems
                    </p>
                </div>

                <nav className="flex flex-wrap justify-center gap-6 md:justify-end">
                    <Link href="/imprint" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                        Imprint
                    </Link>
                    <Link href="/privacy" className="text-xs text-muted-foreground transition-colors hover:text-foreground">
                        Privacy
                    </Link>
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                        GitHub
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                        LinkedIn
                    </a>
                </nav>
            </Container>
        </footer>
    )
}
