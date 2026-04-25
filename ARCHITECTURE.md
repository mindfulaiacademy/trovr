# Trovr — Architecture Documentation

## What It Is

Trovr is a **static marketplace** for verified youth soccer coaches in Germany. Parents search for and contact DFB-licensed coaches by city. Built with **Next.js 15 (App Router)**, deployed on **Vercel**.

---

## Directory Structure

```
Trovr/
├── app/              # Pages, layouts, and routing (Next.js App Router)
├── components/       # Shared React UI components
├── data/             # Coach data (single JSON file)
├── lib/              # Data access utilities
├── public/           # Static assets: images, HTML pages, CSS
├── database/         # Supabase schema (SQL)
├── trainer/          # Pre-rendered static HTML trainer pages (legacy)
├── trainer data/     # Raw onboarding materials per trainer (not served)
├── next.config.mjs   # Redirects and rewrites
├── vercel.json       # Vercel-specific routing
└── sitemap.xml       # Pre-generated sitemap
```

---

## Routing

All routes are pre-rendered at build time via `generateStaticParams()`.

| URL Pattern | File | Description |
|---|---|---|
| `/` | `app/page.js` | Redirects to `/fussballtrainer/berlin/` |
| `/fussballtrainer/[city]/` | `app/fussballtrainer/[city]/page.js` | City listing — all coaches in a city |
| `/fussballtrainer/[city]/[slug]/` | `app/fussballtrainer/[city]/[slug]/page.js` | Individual coach profile |

**Current cities:** Berlin, Dresden, Leipzig, Magdeburg

**Static HTML pages** (in `/public/`):
- `/for-coaches-de.html` — Coach recruitment landing page
- `/impressum.html` — Legal imprint
- `/privacy.html` — Privacy policy

---

## Data Layer

**Single source of truth:** `data/coaches-trovr.json` (~2,400 lines, 28 coaches)

All data access goes through `lib/coaches.js`:

```
readData()             → reads the full JSON file
getAllCities()          → unique list of cities with published coaches
getCoachesByCity(city) → coaches filtered by city, sorted by scrapedDate
getCoach(city, slug)   → single coach by ID
```

Data is loaded synchronously at build time — **no runtime database queries** for page rendering.

**Coach schema (key fields):**

```json
{
  "id": "felix-gruber",           // URL slug
  "firstName", "lastName",
  "photo",                        // path to public/images/coaches/
  "city", "district", "zip",
  "bio", "philosophy", "career",
  "methodology": [...],           // array of training methods
  "sessionWalkthrough": [...],    // structured 60-min session breakdown
  "credentials": [{ "name", "verified" }],
  "specialties": [...],
  "yearsExperience", "ageRangeMin", "ageRangeMax",
  "sessionPrice", "packagePrices",
  "rating", "reviewCount", "totalSessions",
  "availability", "locationOptions", "responseTime",
  "reviews": [{ "parentName", "rating", "comment", "date" }],
  "backgroundCheck": "passed",
  "status": "published"           // controls visibility
}
```

---

## Components

| File | Type | Purpose |
|---|---|---|
| `components/Nav.js` | Server | Top navigation bar |
| `components/CoachListing.js` | Client | Coach card grid with age/district/specialty filters |
| `components/ContactSection.js` | Client | Contact modal (email + masked phone reveal) |
| `components/CookieBanner.js` | Client | Cookie consent; loads Google Analytics on accept |

---

## Coach Profile System

**How a coach gets published:**

1. Raw material collected in `trainer data/[name]/` (videos, text, form answers)
2. A JSON entry is authored in `data/coaches-trovr.json` with `"status": "published"`
3. Next.js pre-renders two pages at build time: the city listing card + the full profile page
4. Photo goes into `public/images/coaches/`

**Profile page features:** bio, methodology, session walkthrough, credentials (with verified badge), reviews, pricing, contact modal, sticky mobile booking bar, schema.org markup.

---

## SEO

- **Schema.org markup:** `Person` + `AggregateRating` + `BreadcrumbList` on profile pages; `LocalBusiness` on city listing pages
- **Dynamic OG images:** Edge function at `opengraph-image.js` generates 1200×630 PNG per page
- **Sitemap:** `app/sitemap.js` generates dynamic XML; pre-rendered copy at `/sitemap.xml`
- **Metadata:** Title, description, OG tags, Twitter cards all generated per-page from coach data
- **robots:** Configured in root layout (currently noindex — see `app/layout.js`)

---

## Styling

`app/globals.css` — CSS custom properties (design tokens), no CSS framework.

Key tokens: `--primary: #1B6B4A` (green), `--accent: #F59E0B` (amber), `--radius: 12px`. Mobile-first responsive layout.

---

## Third-Party Services

| Service | Status | Purpose |
|---|---|---|
| **Vercel** | Active | Hosting, image optimization, edge functions |
| **Google Analytics** (`G-L739P1KS7X`) | Active | Loaded on cookie consent |
| **Supabase (PostgreSQL)** | Configured, not active | Future: auth, bookings, payments, reviews |
| **Google Fonts (Inter)** | Active | Typography |

**Supabase schema** (7 tables, not yet wired to frontend): `parents`, `children`, `coaches`, `credentials`, `bookings`, `reviews`, `payments`

---

## Build & Deploy

```bash
npm run dev     # local dev server
npm run build   # static generation of all pages
npm run start   # production server
```

Deployed to **Vercel** automatically on push. Custom domain: `trovr.de`. All pages are statically generated — no server-side rendering at runtime.

---

## Key Constraints

- **No API routes** — all data access is at build time via file reads
- **JSON is the database** — adding a coach requires editing the JSON file and rebuilding
- **Supabase is wired but dormant** — auth/booking features don't exist yet in the frontend
- **Filtering is client-side** — `CoachListing.js` filters the full city dataset in the browser
