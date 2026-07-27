# NoBarriers Design Guidelines

This is the design rulebook for NoBarriers (landing page + learning app).
Every UI change should follow this document. When a rule here conflicts with
old code, this document wins.

> **Status:** DECIDED — "Deep Water" system (teal · ink · amber), with blue
> unit bands borrowed from the Playfield candidate. 2026-07-27.

---

## 1. References — what we borrow, from where

| Site | What we take |
|---|---|
| **Swappa** | Structured density: many items, strict card grids, consistent card sizes, alternating section bands (white / tinted) so pages never feel crowded. The big multi-column footer. An FAQ section on the landing page. |
| **Shopify** | Hero with one huge confident headline. Giant stat numerals with small colored monospace eyebrow labels (`↑ COMMUNITY` / `49+`). Dark full-bleed "ink" sections for drama. Sticky top nav. |
| **Khan Academy** | Onboarding: pick your course(s) at signup, "My courses" on the dashboard. Content gated by login + course progression. Color-coded unit/subject icons. Streaks as a first-class feature. |

## 2. Brand personality

Friendly, encouraging, trustworthy. A learning tool for everyone — including
deaf users, kids, and schools. Never corporate-cold, never childish-chaotic.

## 3. Color

The system is **"Deep Water"**: teal leads, deep ink does the drama, amber is
the reward color, blue marks course units.

```
--teal-700:    #0F766E   /* primary: buttons, active nav, done path nodes */
--teal-600:    #0D9488   /* hover/decorative variant of primary */
--aqua-400:    #2DD4BF   /* eyebrows/accents on dark bands ONLY */
--ink-900:     #122B30   /* body text, dark bands, footer background */
--blue-700:    #1D4ED8   /* unit bands + info accents (borrowed from A) */
--blue-100:    #DBE7FD   /* unit band pill background */
--amber-600:   #D97706   /* gamification only: streaks, XP, quests */
--amber-100:   #FBEED3   /* XP pill background */
--rose-600:    #E11D48   /* hearts, errors */
--bg:          #FAF8F3   /* warm paper page background (not pure white) */
--card:        #FFFFFF
--line:        #E9E4D8   /* borders on paper background */
```

Rules:

- **One reward color.** Amber is used ONLY for gamification (streaks, XP,
  quests, level-up). Nothing else may use it. This makes rewards pop.
- **Blue is for wayfinding**, not actions: unit band pills ("EVERYDAY LIFE"),
  info notes, course-category accents. Buttons are never blue.
- **Aqua only on dark.** #2DD4BF fails contrast on paper; use it exclusively
  for eyebrows/accents inside ink-900 bands.
- **Hearts/lives** are always rose; errors use the same family.
- **Section banding:** paper → white card band → ink-900 band (stats) →
  paper → ink-900 footer.
- All text/background pairs must pass WCAG AA (4.5:1 body, 3:1 large text).

### Tailwind mapping

Extend `tailwind.config.js` so the tokens are the only colors used:

```js
theme: {
  extend: {
    colors: {
      brand:  { DEFAULT: '#0F766E', hover: '#0D9488', aqua: '#2DD4BF' },
      ink:    '#122B30',
      unit:   { DEFAULT: '#1D4ED8', soft: '#DBE7FD' },
      reward: { DEFAULT: '#D97706', soft: '#FBEED3' },
      heart:  '#E11D48',
      paper:  '#FAF8F3',
      line:   '#E9E4D8',
    },
  },
}
```

Usage: `bg-brand text-white`, `bg-paper`, `text-ink`, `bg-unit-soft text-unit`,
`bg-reward-soft text-reward`. Never use raw Tailwind palette colors
(`bg-teal-500`, `bg-orange-400`, …) in components.

## 4. Typography

- **Display / headings:** Nunito (700–800). Rounded, friendly, readable,
  good multilingual coverage. Tight letter-spacing (-0.01 to -0.03em) on large sizes.
- **Body / UI:** Nunito Sans (400/600/700).
- **Stat eyebrows & small labels:** monospace (JetBrains Mono or system mono),
  11–12px, uppercase, letter-spacing 0.14–0.18em (the Shopify pattern).
- Scale: 12 / 13.5 / 15 / 18 / 24 / 32 / 44 / 56. Stay on it.
- Hero headline may color exactly one key phrase in the primary color.
- Body text max width ~65ch. Headings get `text-wrap: balance`.
- Numbers in stats/tables: `font-variant-numeric: tabular-nums`.

## 5. Layout principles (the Swappa rules)

1. **Grid or nothing.** Repeated content (units, lessons, badges, FAQs) lives
   in uniform card grids with equal heights per row. No ragged card sizes.
2. **Section rhythm.** Landing page alternates: light band → tinted band →
   light band → dark ink band (stats) → light → dark footer. Every section has
   one job and one heading.
3. **Density is fine, clutter is not.** Many items are OK when cards are
   uniform, aligned, and share one accent logic.
4. **Thin promo strips** (Swappa's blue/orange banners) may separate major
   sections: one line of text + one button, full width, tinted background.
5. **The footer is a feature.** Dark band, 4 columns (Brand+mission, Learn,
   Company, Support), social icons, copyright line. Every page gets it.
6. **FAQ on the landing page:** accordion, 5–8 questions, near the bottom,
   before the final CTA band.

## 6. Components

- **Buttons:** primary = filled `brand` teal, white text, bold, pill radius.
  Secondary = outlined ink, pill. Dark bands may use an ink-filled button on
  paper (`bg-ink text-white`). One primary button per view section.
- **Lesson path nodes:** done = filled primary; active = white with thick
  primary ring; locked = neutral gray with lock. Unit bands as pills above.
- **Cards:** white, 12–16px radius, 1px border or soft shadow — never both heavy.
- **Quest/level meters:** rounded track, reward-color fill for quests,
  primary fill for level progress.
- **Stats (landing):** dark band, 3–4 giant numerals + mono eyebrow labels.
- **Badges:** earned = colored + label; unearned = grayscale at 40% opacity.

## 7. Onboarding & gating (the Khan Academy rules)

- At signup, the user picks course(s); dashboard shows "My courses" first.
- Course content lists (units/topics) are visible logged-out as a teaser,
  but lessons open only when logged in AND previous lesson is complete.
- Streak is surfaced everywhere: header chip, dashboard, lesson-complete screen.

## 8. Accessibility (non-negotiable for this product)

- WCAG AA contrast everywhere; AAA where cheap.
- Sign images: `alt` text must NOT reveal quiz answers on question screens
  (use "Sign to identify"); descriptive alt is fine in study mode.
- Visible keyboard focus states on all interactive elements.
- Touch targets ≥ 44px. Respect `prefers-reduced-motion`.
- Never rely on color alone: pair icons/labels with state colors.

## 9. Motion

- Micro only: 150–250ms ease-out on hover/press; card lift ≤ 4px.
- One celebratory moment allowed per flow (confetti on lesson complete).
- No parallax, no scroll-jacking. Respect `prefers-reduced-motion`.

## 10. Voice & copy

- Encouraging, direct, second person: "Keep your streak going!"
- Buttons name the action: "Start Lesson", "Continue", "Review Mistakes".
- Errors say what happened and what to do next; no blame, no jargon.
