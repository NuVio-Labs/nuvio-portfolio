# NuVio Portfolio — Phase 2 UI/UX Upgrade Plan
> Post Phase 1 · April 2026

---

## What Still Feels Below Top-Tier

### Work section — highest urgency
- Each project card repeats the "Selected Work" eyebrow label, which is already displayed in the section header above. The redundancy creates visual noise and signals an assembled layout rather than a curated studio showcase.
- The project number (`01`, `02`) is rendered as tiny 11px uppercase text in the corner. It has no visual weight and reads as a counter, not a design element.
- The outcome cards have dense inner borders and backgrounds stacked inside the already-bordered card. Too many nested frames.
- The testimonial blockquote sits in a bordered card that competes visually with everything above it. It should feel more like a natural pull-quote.
- The tech tags use `border-[#DAB983]/18` on a card that already has gold-toned borders — too much border repetition.
- The project card overall feels assembled from parts rather than composed as one piece.

### Value proposition — icon treatment
- The principle card icons use a jarring white-cream gradient container (`rgba(255,248,236,0.98)` to `rgba(245,229,198,0.98)`). On the dark surface, this creates a harsh visual contrast that breaks the refined dark aesthetic. A premium dark studio site would never put a bright white box inside a dark card.

### About section — methodology number treatment
- The methodology card numbers (01, 02, 03) in the 48px-wide `w-12` column feel disconnected — too similar in visual weight to a bullet point.

### Section rhythm
- Sections use the `space-y-6 sm:space-y-8` gap between project cards. This is functional but not premium enough for showcasing selected work.

### Hover feedback
- Cards and interactive elements have minimal hover state differentiation. Premium studios use subtle border brightening or gentle glow changes on hover.

---

## What Will Be Upgraded in This Pass

1. **Work section** — Most significant upgrade:
   - Remove redundant per-card "Selected Work" eyebrow
   - Promote project number to a large faded typographic design element
   - Improve project card spacing and internal breathing room
   - Redesign outcome items (simpler, cleaner, less nested)
   - Redesign testimonial as pull-quote (no card box)
   - Improve tech tag separation from the inner frame system
   - Increase spacing between project cards for more editorial pacing

2. **Value proposition** — Icon fix:
   - Replace white gradient icon containers with dark gold treatment
   - Align icons to the brand's dark palette

3. **About section** — Methodology number refinement:
   - Give the number slightly more visual presence without over-designing

4. **Global hover polish**:
   - Add subtle card hover states across work and principle cards
   - Use `transition-colors` on border-color for premium micro-feedback

---

## Visual Principles Guiding Changes

1. **Reduction before addition** — Remove noise before adding new elements
2. **One border system** — Cards should have one outer border, not nested frames competing with each other
3. **Typographic hierarchy earns space** — Project numbers, titles, outcomes, and testimonials should each have clear visual rank
4. **Pull-quotes, not widget boxes** — Testimonials should feel like authentic human statements, not boxed endorsements
5. **Gold is structural, not decorative** — Gold accents on borders, icons, and dividers; not as fill floods
6. **Breathing room = premium** — More space between elements signals curation, not abundance

---

## What Will NOT Be Changed

- Core layouts and section structures (left/right splits, sticky about card, grid patterns)
- All copy and translations — tone is already well-calibrated
- Navigation system (improved in Phase 1)
- Footer (improved in Phase 1)
- Contact section structure (improved in Phase 1)
- Animation system (already restrained and appropriate)
- Color palette and brand identity
- Performance-sensitive structures (RSC boundaries, dynamic imports)
- Any working functionality (form, live preview, language switcher)

---

## Prioritized Execution

1. Work section improvements (highest visual impact)
2. Value proposition icon treatment (quick fix, jarring issue)
3. About methodology numbers (minor refinement)
4. Global hover state polish
5. Build verification
