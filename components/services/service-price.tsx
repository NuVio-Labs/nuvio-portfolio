import { getLocale, getTranslations } from "next-intl/server"
import type { ServicePrice as ServicePriceData } from "@/data/services"
import { cn } from "@/lib/utils"

function formatEuro(amount: number, locale: string) {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
}

/** Preisangabe einer Leistung, sprachabhaengig formatiert ("ab 1.049 €", "€32 / month" …). */
export async function ServicePrice({ price, className }: { price: ServicePriceData; className?: string }) {
    const t = await getTranslations("services.price")
    const locale = await getLocale()

    let label: string
    if (price.kind === "free") {
        label = t("free")
    } else if (price.kind === "onRequest") {
        label = t("onRequest")
    } else {
        const amount = formatEuro(price.amount, locale)
        const base = price.kind === "from" ? t("from", { price: amount }) : amount
        label =
            price.unit === "month"
                ? t("perMonth", { price: base })
                : price.unit === "hour"
                  ? t("perHour", { price: base })
                  : base
    }

    return <span className={cn("whitespace-nowrap tabular-nums", className)}>{label}</span>
}
