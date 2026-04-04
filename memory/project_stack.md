---
name: NuVio Portfolio Tech Stack
description: Core dependencies, architecture patterns, and key config for the portfolio
type: project
---

- **Next.js 16.1.6** — App Router, RSC-first, Turbopack in dev
- **React 19.2.3** — concurrent features
- **TypeScript 5** — strict mode
- **Tailwind CSS 3.4** — custom dark theme, gold accent system (CSS HSL vars), no external UI framework beyond shadcn primitives
- **Framer Motion 12** — used sparingly: scroll reveals, FAQ accordion, mobile nav, language switcher dropdown
- **next-intl 4.8.3** — locales: de (default), en, nl; messages in `/messages/*.json`
- **next-themes** — dark/light toggle; site defaults to dark, system preference
- **Resend** — contact form email via server action in `app/actions/send-email.ts`
- **shadcn/ui-style** components in `components/ui/` — Button (CVA variants), Card, Input, Textarea, Label, Badge, ScrollAnimation, ProjectLivePreview
- **Color tokens**: `#070606` dark bg, `#F6F1E9` ivory text, `#E0B84A` / `#F7C66B` gold accent
- **Contact email**: contact@nuviolabs.de
- **Deployment**: Vercel; `RESEND_API_KEY` env var required

**Why:** Production-ready setup for fast, SEO-strong, multilingual business portfolio.

**How to apply:** When making changes, respect RSC-first (server components default), only add "use client" where necessary. Use next-intl `getTranslations` in RSC, `useTranslations` in client components. Keep Tailwind usage clean — no arbitrary value sprawl.
