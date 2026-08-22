# Anubhav Collective — Guest Experience QR Website

Guest-facing frontend for the QR code placed in rooms at Evoke Rambagh, Ayodhya.
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS. Frontend only —
no backend, no auth, no payment. All data is local mock data behind a service
layer built for a Flask REST API to drop into later.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start
```

Requires Node 18.18+. `next/font` fetches Playfair Display and Inter at build
time, so the first build needs network access to Google Fonts.

## The one rule that shapes everything

This is a phone-width web app at **every** viewport. `.mobile-app` in
`app/globals.css` is the only place that controls it:

- **≤430px** — fluid, capped at 390px.
- **≥431px** — locked to exactly 390px, centred, with a soft shadow on a warm
  background field. No smartphone chrome, no desktop layout, no wider grid.

There is no desktop layout anywhere in the codebase, so no component can grow
past the column by accident. `overflow-x: hidden` is set on both `body` and the
shell. Verified at 320 / 360 / 375 / 390 / 414 / 430 and 768 / 1024 / 1280 /
1440 / 1920.

## Structure

```
app/
  layout.tsx                    fonts, metadata, MobileShell
  page.tsx                      home
  not-found.tsx
  experiences/page.tsx          the experience menu
  experiences/[slug]/page.tsx   detail: hero, info, journey, touchpoints, CTAs
  book/[slug]/page.tsx          booking form (frontend only)
components/                     19 components, listed in the brief
data/
  experiences.ts                15 experiences
  touchpoints.ts                journey routes + touchpoint detail
services/
  experienceService.ts          the only file that touches data
lib/
  types.ts, categoryStyles.ts, formStyles.ts
public/images/
  hero/ experiences/ touchpoints/ illustrations/ branding/
scripts/
  generate-assets.py            regenerates placeholder art
```

Routes: `/` · `/experiences` · `/experiences/[slug]` · `/book/[slug]`.
All 15 experiences and their booking pages prerender statically.

## Connecting Flask later

`services/experienceService.ts` is the only seam. Every function is already
`async` and already returns the shape components consume, so no component
signature changes:

| Function | Endpoint |
| --- | --- |
| `getExperiences()` | `GET /api/experiences` |
| `getExperienceBySlug(slug)` | `GET /api/experiences/:slug` |
| `getCategories()` | `GET /api/categories` |
| `getJourney(slug)` | `GET /api/experiences/:slug/journey` |
| `getExperienceTouchpoints(slug)` | `GET /api/experiences/:slug/touchpoints` |

```ts
export async function getExperiences(): Promise<Experience[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/experiences`);
  if (!res.ok) throw new Error("Failed to load experiences");
  return res.json();
}
```

`BookingForm` and `QueryForm` each mark the exact line where the POST goes.

## Images

Everything in `public/images/` is a generated placeholder, sized and cropped to
what the components expect. Drop real photography in at the same paths and
dimensions and nothing else needs to change:

- `hero/ayodhya-sarayu-ghat.jpg` — 900×1200, portrait, subject right of centre
- `experiences/<slug>.jpg` — 800×600
- `touchpoints/<name>.jpg` — 800×600
- `branding/logo.svg`, `illustrations/temple-lineart.svg`, `temple-mini.svg`

`scripts/generate-assets.py` (needs Pillow) regenerates them. The logo SVG is an
approximation of the reference mark — replace it with the real artwork.

## Two deliberate deviations from the reference

The reference mock renders about 870px wide, so a few rows that read fine there
land at roughly 78px per column on an actual 390px phone:

1. **Trust section** — 4 columns as in the reference, dropping to 2×2 below
   360px so the labels stay readable.
2. **Footer** — reflowed to brand → Explore / Company → Contact → Need Help,
   keeping the reference's exact content and ordering.

Everything else follows the reference composition.

## Accessibility and motion

Semantic landmarks and heading order, labelled form controls, visible terracotta
focus rings, keyboard-operable menu and modal with focus trap and Escape to
close, `aria-selected` filter tabs, alt text on every meaningful image and
`aria-hidden` on decorative art. All animation is scroll-reveal, image zoom and
arrow nudge only, and `prefers-reduced-motion: reduce` disables it.
