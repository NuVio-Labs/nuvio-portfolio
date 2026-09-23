import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { Link } from "@/i18n/navigation"
import { SectionWrapper } from "@/components/ui/section-wrapper"

/**
 * Kompakter Ansprechpartner-/Trust-Block fuer die lokalen SEO-Landingpages.
 *
 * Bewusst keine eigenen neuen Aussagen: Foto und Story-Text kommen
 * unveraendert aus der About-Seite (Namespace "aboutPage", dort bereits in
 * de/nl gepflegt und uebersetzt) — dieselbe Quelle, ein einziger Ort fuer
 * diese Aussage. Nur Eyebrow-Label und Link-Text sind fuer diesen
 * kompakten Kontext neu (Namespace "localTrust", keine inhaltlichen Claims,
 * reine Microcopy).
 *
 * Position: nach dem Proof (Work) und der Differenzierungs-Sektion
 * (WhyNuvio), vor Process/Pricing — persoenliches Vertrauen wird
 * aufgebaut, bevor der Besucher zur Ablauf-/Preisfrage weitergeht.
 */
export async function LocalTrust() {
    const t = await getTranslations("localTrust")
    const tAbout = await getTranslations("aboutPage")

    return (
        <SectionWrapper id="ansprechpartner">
            <div className="nv-container">
                <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 rounded-[1.75rem] border border-border-soft bg-surface p-7 text-center sm:flex-row sm:items-center sm:p-9 sm:text-left">
                    <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-border-soft sm:h-28 sm:w-28">
                        <Image
                            src="/axel-portrait.webp"
                            alt="Axel Schurer – NuVio Labs"
                            fill
                            className="object-cover object-center"
                            sizes="112px"
                        />
                    </div>

                    <div>
                        <p className="text-accent text-xs font-semibold tracking-widest uppercase mb-3">
                            {t("eyebrow")}
                        </p>
                        <p className="text-text-secondary leading-relaxed">{tAbout("story.text1")}</p>
                        <p className="mt-2 text-text-secondary leading-relaxed">{tAbout("story.text2")}</p>
                        <Link
                            href="/about"
                            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-[var(--nv-accent-hover)] transition-colors group"
                        >
                            {t("linkLabel")}
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </div>
        </SectionWrapper>
    )
}
