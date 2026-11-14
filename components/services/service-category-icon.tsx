import { MonitorSmartphone, PenTool, Search, type LucideProps } from "lucide-react"
import type { ServiceCategoryId } from "@/data/services"

const ICONS = {
    web: MonitorSmartphone,
    design: PenTool,
    marketing: Search,
} satisfies Record<ServiceCategoryId, React.ComponentType<LucideProps>>

export function ServiceCategoryIcon({ id, ...props }: { id: ServiceCategoryId } & LucideProps) {
    const Icon = ICONS[id]
    return <Icon aria-hidden="true" {...props} />
}
