# Dental practice website

A static marketing site for a single-location dental practice. Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. Everything resolves at build time — no CMS, no database, no API routes.

## Getting started

```bash
npm install
npm run dev            # http://localhost:3000
npm run build          # produces static output in ./out
```

The build target is `output: 'export'`, so `npm run build` writes a fully static site to `out/`. Upload that directory to any static host (Netlify, Vercel, Cloudflare Pages, or plain nginx).

## Configuration — one file

All brand, contact, and location values live in **`site.config.ts`**. Change them there, nothing else. `HoursCard` and the "open today" strip in the header both derive from `hours` — do not hardcode times anywhere.

Fields to fill in before handing over to the client:

- `name`, `tagline`, `legalName`
- `phone`, `emergencyPhone`, `email`
- `siteUrl` (used for canonical URLs, sitemap, and structured data)
- `address`, `geo`, `mapEmbedUrl`
- `hours` (open/close per day, or `{ closed: true }`)
- `languages`
- `social.facebook`, `social.instagram`
- `bookingProvider` — leave as `type: 'form'` to use the built-in request form, or set `type: 'calcom' | 'calendly'` with a `url` to embed an external scheduler
- `formEndpoint` — a Formspree / Web3Forms / Netlify Forms URL that receives contact and booking submissions

## Content — where things live

```
content/
  services.ts        # treatment menu — name, summary, priceFrom, duration, body
  team.ts            # clinicians — name, role, credentials, bio
  testimonials.ts    # short quotes with first-name attribution
  faqs.ts            # site-wide FAQs (used on About)
  blog/*.md          # articles with YAML frontmatter
```

### Adding a service

Add an entry to `services` in `content/services.ts`:

```ts
{
  slug: 'whitening',
  name: 'Whitening',
  summary: 'Professional in-chair whitening in a single visit.',
  priceFrom: 18000,
  duration: '90 min',
  body: `Two short paragraphs explaining what happens and what it won't do.`,
  faqs: [{ q: '…', a: '…' }],
}
```

The detail page renders automatically at `/services/whitening/` and the row appears on both the homepage menu and `/services/`.

### Adding a clinician

Add an entry to `team` in `content/team.ts`. A profile page is generated at `/team/[slug]/`. Update the shot list note in the design brief if the client still needs to send portraits.

### Publishing a blog post

Create a file under `content/blog/` named `some-slug.md`:

```markdown
---
title: A short honest title
description: One sentence summary used in listings and meta tags.
date: 2026-08-20
author: Dr. [name]
---

Your body copy as markdown.

## A subheading

More text.
```

The post appears at `/blog/some-slug/` and is picked up by `/blog/`, the homepage articles row, and the sitemap.

## Design tokens

All tokens live as CSS custom properties in `app/globals.css`. Tailwind's theme (`tailwind.config.ts`) references those variables — never redefine values in the Tailwind config.

If you need a new shade, add the CSS variable in `globals.css` first, then expose it in `tailwind.config.ts`. Do not add per-component hex values.

Two-surface system: `bg-mist` (cool, page background) and `bg-enamel` (warm, alternating band). Use `<Section surface="mist" | "enamel" | "petrol">` — never set section padding by hand.

## Images

All photography is client-supplied. Until it arrives, `<Placeholder />` renders a flat petrol-tint block with the intended subject as label text — deliberate, not lorem ipsum.

Shot list to send the client:

- 1 portrait-orientation hero (treatment room or reception in natural light, no people looking at camera)
- 4 clinician portraits, same lens and background, waist-up
- 3–4 interior/detail shots (reception, sterilisation area, treatment chair, instruments)
- 1 exterior with signage for the contact page

Deliver AVIF + WebP + JPEG fallback at 640/960/1440/1920 widths.

## Accessibility

Treat the acceptance criteria in section 7 of the design brief as non-negotiable. Before handing over:

- Run axe DevTools on every route — zero critical/serious violations
- Keyboard-only pass: focus always visible, mobile drawer traps and releases correctly
- Test at 320px width — no horizontal scroll
- Toggle `prefers-reduced-motion` — no movement anywhere

## Deploy

### Netlify / Vercel / Cloudflare Pages

- Build command: `npm run build`
- Publish directory: `out`

### Plain static host (nginx, S3, etc.)

`npm run build` and copy the entire `out/` folder to the server root. Ensure the host serves `index.html` for directory URLs (Netlify and Vercel do this by default; nginx needs `try_files $uri $uri/ =404;`).

### Before first deploy

1. Fill in `siteConfig` (especially `siteUrl` — canonical URLs and structured data depend on it).
2. Wire up `formEndpoint` and test both the contact and booking forms.
3. Run `npm run build` locally — the build must produce a clean `out/` with no warnings.
4. Validate the JSON-LD output at [Google Rich Results Test](https://search.google.com/test/rich-results).

## Out of scope

No patient records, no PHI, no insurance verification, no payments, no login. Booking is a **request** — it creates an email, not a confirmed appointment. If the practice needs real scheduling, embed Cal.com or Calendly via `siteConfig.bookingProvider` and let that system own the calendar.
