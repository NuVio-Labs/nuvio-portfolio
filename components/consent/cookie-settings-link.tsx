"use client"

import { useTranslations } from "next-intl"
import { useConsent } from "./consent-provider"

/**
 * Eigene kleine Client Component statt den ganzen (server-gerenderten)
 * Footer auf "use client" umzustellen — oeffnet nur den bestehenden
 * Einstellungsdialog erneut, navigiert nirgendwohin.
 */
export function CookieSettingsLink() {
    const t = useTranslations("consent")
    const { openSettings } = useConsent()

    return (
        <button type="button" onClick={openSettings} className="hover:text-accent transition-colors">
            {t("footerLink")}
        </button>
    )
}
