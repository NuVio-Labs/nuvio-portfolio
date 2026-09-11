# docs/history

Archiv für Projektdokumente, die einen abgeschlossenen oder überholten Arbeitsstand beschreiben. Die Dateien wurden unverändert hierher verschoben (keine inhaltlichen Anpassungen) — sie sind keine Source of Truth mehr für den aktuellen Projektstand, sondern historische Aufzeichnung.

Für den aktuellen Stand gilt weiterhin die reguläre Doku unter `docs/project/`, `docs/brand/`, `docs/content/` sowie der Code selbst.

## Archivierte Dateien

- **`PORTFOLIO_AUDIT.md`** — UI/UX-Audit vom April 2026 (19 priorisierte Befunde). Laut `IMPLEMENTATION_CHECKLIST.md` und `PHASE2_UI_UX_PLAN.md` sind die Critical/High/Medium-Punkte umgesetzt.
- **`IMPLEMENTATION_CHECKLIST.md`** — Umsetzungs-Checkliste zu `PORTFOLIO_AUDIT.md`, April 2026. Alle inhaltlichen Punkte darin sind als erledigt markiert.
- **`PHASE2_UI_UX_PLAN.md`** — Folgephase nach dem April-2026-Audit (Work-Section, Value Proposition, About-Methodik). Laut `docs/history/memory/project_audit_2026.md` umgesetzt.
- **`README-demo.md`** — Beschreibt eine frühere SaaS-Demo ("NuVio Fleet/Clients/Edge/Docs", Multi-Tenant-Simulation). Der zugehörige Code (`components/saas/`, `data/nuvioStatus.ts`, `data/nuvioUnlock.ts`, `hooks/useTenantData.ts`) existiert im aktuellen Repository nicht mehr.
- **`architecture.md`** — Zukunftskonzept für Auth/E-Commerce (Clerk, Stripe, Prisma/Supabase). Wurde nie umgesetzt; der darin referenzierte "Auth-Stub" (`AuthProvider`) wurde im Zuge dieses Cleanups entfernt, da funktionslos.
- **`TODO.md`** (ehemals `docs/project/TODO.md`) — Ursprüngliche Setup-Checkliste (Next.js/Tailwind/i18n/Seitenstruktur). Beschreibt ausschließlich Grundsetup-Arbeiten, die längst abgeschlossen sind.
- **`memory/`** — Ein projekteigenes, älteres Notiz-System aus der Projektphase Februar–April 2026 (`MEMORY.md`, `feedback_tone.md`, `project_audit_2026.md`, `project_stack.md`, `user_profile.md`). Nicht zu verwechseln mit einem KI-Assistenten-Gedächtnis außerhalb dieses Repos — dies ist eine eigenständige, projektinterne Ablage. Teilweise nachweislich veraltet (z. B. abweichende Farbwerte gegenüber `app/globals.css`, ein nicht mehr zutreffender Kontakt-Text-Claim) und daher nicht länger als Referenz geeignet.

## Ungefährer historischer Stand

Alle oben genannten Dateien stammen aus den Commits vom 27.02.–04.04.2026 (initialer Aufbau bis Phase-2-Politur), also vor der aktuellen, SEO-fokussierten Weiterentwicklung (Metadata-Architektur, lokale Landingpages Kranenburg/Kleve/Groesbeek).

## Warum nicht mehr Source of Truth

- Für Architektur/Tech-Stack: `docs/project/TECH_STACK.md` (aktualisiert) und der Code selbst.
- Für Brand/Leistungen: `docs/brand/NUVIO_LABS.md`, `docs/brand/STYLE_GUIDE.md`.
- Für Copy: `docs/content/COPY_DE.md`, `COPY_EN.md`, `COPY_NL.md`.
- Für SEO: `messages/*.json` (`seo.*`), `app/sitemap.ts`, `lib/seo.ts`.
