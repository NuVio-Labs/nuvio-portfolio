# NuVio Tailwind Guide

## Ziel

Dieses Dokument übersetzt das NuVio Corporate Design in eine Tailwind Arbeitslogik.

## Empfohlene Farbzuordnung

```ts
nuvio: {
  black: "#050505",
  graphite: "#111111",
  charcoal: "#1A1A1A",
  surface: "#232323",
  gold300: "#F0D88A",
  gold500: "#E0B84A",
  gold700: "#C89A2E",
  champagne: "#F5E7B8",
  textPrimary: "#F5F3EE",
  textSecondary: "#B9B2A3",
  textMuted: "#7E786C"
}
```

## Typische Klassenmuster

### Seitenhintergrund
```html
class="bg-[#050505] text-[#F5F3EE]"
```

### Surface Card
```html
class="rounded-3xl border border-white/10 bg-[#1A1A1A]/80 backdrop-blur-md"
```

### Primary CTA
```html
class="inline-flex items-center justify-center rounded-2xl border border-[#E0B84A]/30 bg-[#E0B84A] px-5 py-3 text-[#050505] font-medium transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(224,184,74,0.18)]"
```

### Secondary CTA
```html
class="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-[#F5F3EE] transition hover:border-[#E0B84A]/40 hover:bg-white/10"
```

### Muted Text
```html
class="text-[#7E786C]"
```

### Section Container
```html
class="mx-auto w-full max-w-7xl px-6 md:px-8"
```

## Radius System

1. Kleine Elemente `rounded-xl`
2. Standard Karten `rounded-2xl`
3. Premium Flächen `rounded-3xl`

## Border System

1. Standard `border-white/10`
2. Etwas stärker `border-white/15`
3. Gold Fokus `border-[#E0B84A]/30`

## Glow Nutzung

Gold Glow nur für:
1. CTA Fokus
2. aktive Elemente
3. besondere Hero Highlights

Nie für:
1. jede Card
2. jeden Textblock
3. Dekoration ohne Funktion

## Spacing Richtung

1. Mehr Abstand ist besser als visuelle Enge
2. Große Sections `py-20 md:py-28`
3. Hero Bereiche oft `min-h-screen`
4. Grids mit `gap-6` bis `gap-8`
