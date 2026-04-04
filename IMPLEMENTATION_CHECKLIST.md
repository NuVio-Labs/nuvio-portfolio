# NuVio Portfolio — Implementation Checklist
> Based on PORTFOLIO_AUDIT.md · April 2026

---

## Critical Fixes

- [x] Fix SEO keywords in `app/[locale]/layout.tsx` — remove "Junior Developer", "Self-Taught"
- [x] Fix nav href format in `components/layout/navbar.tsx` — change `/#work` to `#work`
- [x] Add mobile hamburger navigation to `components/layout/navbar.tsx`
- [x] Remove external grain SVG URL from `app/globals.css`
- [x] Remove unused `AuthProvider` from `app/[locale]/layout.tsx`

## High Priority

- [x] Redesign footer in `components/layout/footer.tsx`
- [x] Remove "Why start now?" heading from `components/sections/contact.tsx`
- [x] Fix typography consistency — FAQ `font-extrabold` → `font-semibold`
- [x] Fix ScrollAnimation — remove `scale` from initial/animate states
- [x] Add JSON-LD structured data to `app/[locale]/layout.tsx`
- [x] Uncomment trust badge in contact form

## Medium Priority

- [x] Fix value proposition CTA banner missing `relative` class
- [x] Convert footer to proper RSC with `getTranslations`
- [x] Add `aria-label` to desktop nav element

## Verification

- [ ] Run `pnpm typecheck` — fix all type errors
- [ ] Run `pnpm lint` — fix all lint warnings
- [ ] Run `pnpm build` — ensure clean production build

---

## Files Changed

| File | Change |
|------|--------|
| `app/[locale]/layout.tsx` | Fix keywords, add JSON-LD, remove AuthProvider |
| `components/layout/navbar.tsx` | Fix hrefs, add mobile menu |
| `components/layout/footer.tsx` | Full redesign |
| `components/sections/contact.tsx` | Remove salesy heading, improve form |
| `components/sections/faq.tsx` | Fix font-weight |
| `components/ui/scroll-animation.tsx` | Remove scale animation |
| `app/globals.css` | Remove external grain SVG URL |
| `components/sections/value-proposition.tsx` | Fix relative positioning |
