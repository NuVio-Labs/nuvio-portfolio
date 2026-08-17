import { ChevronRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import type { JournalCategory } from "@/lib/journal"

interface JournalBreadcrumbProps {
    category: JournalCategory
}

export async function JournalBreadcrumb({ category }: JournalBreadcrumbProps) {
    const t = await getTranslations("journal")

    const trail = [
        { label: t("breadcrumb.home"), href: "/" as const },
        { label: t("nav"), href: "/journal" as const },
    ]

    return (
        <nav aria-label={t("breadcrumb.label")}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-text-muted">
                {trail.map((crumb) => (
                    <li key={crumb.href} className="flex items-center gap-2">
                        <Link href={crumb.href} className="transition-colors hover:text-text-primary">
                            {crumb.label}
                        </Link>
                        <ChevronRight className="h-3 w-3 text-text-muted/60" aria-hidden="true" />
                    </li>
                ))}
                <li className="text-text-secondary">{t(`categories.${category}`)}</li>
            </ol>
        </nav>
    )
}
