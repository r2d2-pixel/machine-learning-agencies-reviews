# CLAUDE.md — Niche Reviewer Template Playbook

> Auto-loaded by Claude Code. Playbook for populating this template with
> a new niche and deploying it. Written so a fresh session has everything
> it needs without reading the git history.

---

## Account & Deployment Context

**All repos in this directory belong to the `r2d2-pixel` GitHub account.**
Email: `r2d2@brandseoteam.com`. Do NOT push to `b1tterlemon` or any other account.

### Git authentication

The r2d2-pixel PAT is stored in `~/github/r2d2/.env.local` as `R2D2_GITHUB_TOKEN`.
Use it for any push by embedding it in the remote URL:

```bash
# One-time setup per new site repo:
git remote set-url origin https://r2d2-pixel:$R2D2_GITHUB_TOKEN@github.com/r2d2-pixel/REPO-NAME.git

# Or load the var first, then push normally:
source ~/github/r2d2/.env.local && git push origin main
```

For passwordless long-term use, configure SSH (key: `~/.ssh/id_ed25519_r2d2`):
```bash
# ~/.ssh/config entry:
# Host github-r2d2
#   HostName github.com
#   User git
#   IdentityFile ~/.ssh/id_ed25519_r2d2
#
# Then set remote as: git@github-r2d2:r2d2-pixel/REPO-NAME.git
```

### Cloudflare account

Use the Cloudflare account tied to `r2d2@brandseoteam.com` — **not** the
`b1tterlemon` personal account. When deploying via the dashboard, make sure
you are logged in to the r2d2 Cloudflare account before creating Pages projects.

- Account ID: `1afb7a25a539f57955d72bba8f1cf374`
- API token: stored in `~/github/r2d2/.env.local` as `CLOUDFLARE_API_TOKEN`
- MCP config: `.claude/settings.json` in each repo (gitignored) points all
  Cloudflare MCP servers at this account via Bearer token auth

### Local base directory

All r2d2 client sites live under: `~/github/r2d2/`
The template itself is at: `~/github/r2d2/niche-reviewer-template/`
New sites are cloned/created as siblings: `~/github/r2d2/SITE-NAME/`

### GitHub MCP note

The GitHub MCP in Claude Code sessions may be authenticated as `b1tterlemon`.
Do NOT use `mcp__github__create_repository` for r2d2 client sites — it will
create repos in the wrong account. Always use the curl API approach with
`R2D2_GITHUB_TOKEN`, or the `gh` CLI authenticated as `r2d2-pixel`.

---

## What This Template Is

A generic niche reviewer site built with Astro 5. Clone this repo, populate
`src/data/companies.ts` with verified company data, fill the TODO sections
in `src/pages/index.astro`, and deploy to Cloudflare Pages. All comparison,
alternatives, and profile pages generate automatically.

---

## Workflow Rules

**Always commit after every change.** After applying any edit to any file,
stage only the files in this repo and create a git commit immediately. Then
push to `origin main` so Cloudflare Pages deploys automatically.

```bash
git add src/...        # stage only changed files in this repo
git commit -m "..."
git push origin main
```

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Astro 5 |
| Styling | Tailwind CSS 3 + `@tailwindcss/typography` |
| Data | TypeScript (`src/data/companies.ts`) |
| Sitemap | `@astrojs/sitemap` |
| Deploy | Cloudflare Pages (`public/_headers` + `public/_redirects`) |

---

## Complete File Map

### Config (change these first)

| Goal | File | Key to edit |
|---|---|---|
| Site name, domain, tagline | `src/config.ts` | `SITE.*` |
| Niche label, provider label | `src/config.ts` | `NICHE.*` |
| Nav links | `src/config.ts` | `NAV` array |
| Primary accent colour | `src/config.ts` → `BRANDING.primaryColor` **and** `tailwind.config.mjs` → `brand.600` | Both must match |
| Domain in sitemap/canonical | `astro.config.mjs` | `site:` |

### Data

| Goal | File |
|---|---|
| Add / edit company data | `src/data/companies.ts` |
| Add logos | `public/logos/` (initials fallback is automatic) |
| Update service category labels | `src/lib/companies.ts` → `SERVICE_LABELS` |

### Pages

| URL | File |
|---|---|
| Homepage | `src/pages/index.astro` |
| Company profile | `src/pages/companies/[slug].astro` |
| Alternatives | `src/pages/alternatives/[slug].astro` |
| Comparison | `src/pages/comparisons/[slug].astro` |
| Disclosure | `src/pages/affiliate-disclosure.astro` |
| 404 | `src/pages/404.astro` |

---

## Phase 0 Setup Checklist (do this once per new site)

- [ ] `src/config.ts` — fill every TODO field (SITE, NICHE, BRANDING)
- [ ] `astro.config.mjs` — update `site:` to real domain
- [ ] `tailwind.config.mjs` — update `brand` color to match `BRANDING.primaryColor`
- [ ] `public/favicon.svg` — replace with a niche-appropriate icon using the brand color
- [ ] `src/data/companies.ts` — add at least 5 company objects
- [ ] `src/lib/companies.ts` — update `SERVICE_LABELS` to match your badge values
- [ ] `src/pages/index.astro` — fill all TODO sections with niche-specific content
- [ ] `src/pages/comparisons/[slug].astro` — update `hasCap()` keys and `allTech` array
- [ ] `CLAUDE.md` (this file) — update "Rating logic" and "Known verified facts" sections below
- [ ] `npm run build` — verify clean build

---

## Content & Comparison Rules

Apply to all data edits, new company additions, and prose revisions.

### Rating logic

Ratings are editorial scores for **niche-specific delivery suitability** — not
overall company quality.

- No company should top every dimension. Identify dimension winners:
  - **Specialist depth:** [update with your niche's top specialist]
  - **Enterprise scale/compliance:** [update with your niche's largest firm]
  - **Cost/accessibility:** [update with your niche's budget option]
- Ratings must have ≥ 0.8 spread across the list (e.g. 4.8 down to 3.9)
- The top specialist boutique holds rank #1 (4.7–4.9 range)
- Large generalists score 0.5–1.0 lower than boutiques on specialist dimensions

### Factual accuracy rules

- Verify founding year, HQ, employee count from a primary source before adding
- Unverifiable marketing claims must be tagged: `(per company website; independently unverifiable)`
- Acquisitions and ownership changes must appear in `description` and `cons`
- Confirm cloud/tech partnership tiers from official partner directories only

### Rating logic (this site)

- **Rank #1 Specialist depth:** Tiger Analytics (4.8) — largest pure-play ML firm, 5,000+ dedicated practitioners
- **Enterprise scale/compliance:** Accenture AI (3.8), EPAM Systems (3.9), Thoughtworks (4.0)
- **Cost/accessibility:** DataForest ($10K min, Clutch 5.0), Addepto ($15K), Binariks ($15K), Algoscale ($15K)
- Rating spread: 4.8 (Tiger Analytics) → 3.5 (Iguazio) = 1.3 spread (exceeds 0.8 minimum)

### Known verified facts

```
Tiger Analytics: founded 2011, HQ Santa Clara CA, 5,000+ employees
Forte Group: founded 2000, HQ Boca Raton FL, 250–500 employees, Clutch 4.9/5
Tensorway: founded 2019, HQ Valencia Spain, 50+ employees, AWS Premier, Clutch 4.9/5
Fractal Analytics: founded 2000, HQ NYC/Mumbai, 5,000+ employees, IPO Feb 2026 on NSE/BSE
Quantiphi: founded 2013, HQ Marlborough MA, ~2,670 employees, AWS Premier ML Consulting Competency, raised $63M
Sigmoid: founded 2013, HQ Bengaluru/NYC, 1,000+ employees, Sequoia-backed, Everest Group Star Performer
DataForest: founded 2018, HQ Kyiv/Tallinn, 50–249 employees, Clutch 5.0 / 27 reviews, Clutch Champion 2024
InData Labs: founded 2014, HQ Nicosia Cyprus, 80+ employees, Clutch Top 10 AI Software
RTS Labs: founded 2012, HQ Richmond VA, 50–200 employees, top US ML consultant for mid-sized businesses 2026
Grid Dynamics: founded 2006, HQ San Ramon CA, ~5,000 employees, NASDAQ: GDYN
N-iX: founded 2002, HQ Malta/Lviv, 2,400+ employees, clients include Bosch Siemens eBay
LeewayHertz: founded 2007, HQ San Francisco, 200–400 employees, Forbes top-10 AI firm, acquired by Hackett Group (HCKT)
LatentView Analytics: founded 2006, HQ Chennai/NYC, 1,191 employees, listed on NSE India
Thoughtworks: founded 1993, HQ Chicago, 10,000+ employees, Constellation Research AI-First firm, acquired Fourkind
ScienceSoft: founded 1989, HQ McKinney TX, 500–1,000 employees, ISO 9001 and ISO 27001 certified
Oxagile: founded 2005, HQ Minsk/Warsaw, 400+ employees
Innowise: founded 2007, HQ Kraków Poland, 1,600+ employees, ISO certified
Miquido: founded 2011, HQ Kraków Poland, 200+ employees, 110+ shipped AI products
Itransition: founded 1998, HQ Denver CO, 3,000+ employees
Algoscale: founded 2014, HQ New York, 100–500 employees
Acropolium: founded 2003, HQ Munich Germany, 150+ employees
DataArt: founded 1997, HQ New York, 5,000+ employees
Addepto: founded 2017, HQ Warsaw Poland, ~52 employees
BairesDev: founded 2009, HQ San Francisco, 4,000+ employees, 1,200+ delivered projects
Intellias: founded 2002, HQ Lviv Ukraine, 3,500+ employees
EPAM Systems: founded 1993, HQ Newtown PA, 58,000+ employees, Glassdoor top-3 Best Tech & AI 2026
DataRobot: founded 2012, HQ Boston MA, 863 employees, ~$285M ARR, $6.3B valuation
Binariks: founded 2014, HQ Lviv Ukraine, 150+ employees
Softeq: founded 1997, HQ Houston TX, 400+ employees, Inc. 5000
Ekimetrics: founded 2006, HQ Paris France, 500+ employees
BCG X: founded 2022 (consolidated from BCG Gamma 2015 + BCG Platinion), HQ Boston MA, 3,000+ practitioners
Accenture AI: HQ Dublin Ireland, 53,000+ AI practitioners, Gartner MQ Leader 2026, on track for $2.4B gen AI revenue
Wipro AI: founded 1945, HQ Bengaluru India, 240,000+ total employees
Deloitte AI: founded 1845, HQ New York, 450,000+ total employees, AI Studios (Google Cloud partnership)
IBM Consulting AI: founded 1911, HQ Armonk NY, 280,000+ total employees, WatsonX platform
Iguazio: founded 2014, HQ Herzliya Israel, 70+ employees, acquired by McKinsey January 2023
```

### Comparison page logic

The `hasCap()` function in `comparisons/[slug].astro` drives all capability
✓/✗ tables. It reads from `badges` and `engagementModels` only. Never add a ✓
claim that isn't backed by actual data. Update the `hasCap()` function keys and
the `allTech` array to match your niche's capabilities and tools.

---

## When Adding a New Company

- [ ] Verify founding year from a primary source
- [ ] Verify HQ from a primary source; note if legal HQ differs from delivery centre
- [ ] Verify employee count from LinkedIn or Crunchbase
- [ ] Check for acquisitions or ownership changes — disclose in `description` + `cons`
- [ ] Confirm cloud/tech partnership tiers from official partner directories
- [ ] Set `rating` using the dimension logic above
- [ ] Ensure no company tops all dimensions
- [ ] Confirm `badges` only contain services the company actually delivers
- [ ] Badges must match keys in `SERVICE_LABELS` in `src/lib/companies.ts`
- [ ] Run `npm run build` and verify page count increases correctly

---

## Known Gotchas (same across all sites cloned from this template)

1. **`brand` color must match in two places.** `tailwind.config.mjs` `brand.600`
   and `BRANDING.primaryColor` in `src/config.ts` must be the same hex value.

2. **All internal `href` values must end with `/`.** `trailingSlash: 'always'`
   in `astro.config.mjs` enforces this. Any link missing the trailing slash
   triggers a redirect warning in the build log.

3. **`SERVICE_LABELS` keys must match `badges` values exactly.** Every string
   in every company's `badges` array must have a matching key in `SERVICE_LABELS`
   in `src/lib/companies.ts`. Missing keys produce raw slugs on company cards.

4. **`StarRating` only accepts `rating: number`.** No other props.

5. **Comparison page slug format is `slug1-vs-slug2`.** `getComparisons()`
   returns this format. The dynamic route is `/comparisons/[slug].astro`.

6. **`hasCap()` keys in `comparisons/[slug].astro` must exactly match the
   capability labels in the JSX capability table.** If you rename one, rename both.

7. **`npm install` may fail with cache permission error.** Fix:
   `npm install --cache /tmp/npm-cache`. This bypasses the EACCES error on the
   default npm cache directory without requiring sudo.

8. **Cloudflare Pages uses `public/_headers` and `public/_redirects`**,
   not `vercel.json`. Do not add a `vercel.json` — it will be ignored.

9. **`astro.config.mjs` redirects go in `redirects:`.** Do not define the
   same path in both a `.astro` file and as a redirect.

10. **Cloudflare Pages project MUST be created from the dashboard, not the API.**
    Creating a project via the Cloudflare API (POST `/accounts/{id}/pages/projects`)
    produces a "Direct Upload" project. Direct Upload projects cannot have a GitHub
    repo connected — neither via the API (`PATCH` with `source:` returns error
    `8000069`) nor via the dashboard. If you hit "A project with this name already
    exists", the existing project is likely a Direct Upload project. Fix:
    1. Delete it via API: `DELETE /accounts/{id}/pages/projects/{name}`
    2. Recreate from the Cloudflare dashboard: **Pages → Create a project →
       Connect to Git** → select the GitHub repo → set build command `npm run build`,
       output dir `dist`.
    Always use "Connect to Git" from the start. Never create Pages projects via the
    API for git-backed deployments.

11. **`git init` creates `master` branch by default on macOS.** Rename it to `main`
    immediately: `git branch -m master main`. Do this before the first commit so
    all history is on `main` from the start. Cloudflare Pages and GitHub both
    expect `main`.

12. **`public/favicon.svg` must be replaced per site.** The template ships a placeholder favicon. Replace it with a niche-appropriate icon using the site's `BRANDING.primaryColor`. `Base.astro` already contains `<link rel="icon" type="image/svg+xml" href="/favicon.svg">` — no other changes needed in the layout.

13. **No table on the homepage may be all-dashes.** A table where every data cell
    shows "–" means a mismatch between the column keywords and the actual data.
    After populating `companies.ts`, run `npm run build` and visually check every
    matrix/capability table. The engagement models table auto-generates its columns
    from `engagementModels` values in the data — it is safe. Any other matrix table
    that checks for keywords must be verified: the keywords must be substrings of the
    actual data values. Fix by updating the keyword list to match your niche's
    terminology.

---

## Build Commands

```bash
npm install                    # first time / after adding dependencies
npm run dev                    # local dev server → http://localhost:4321
npm run build                  # production build → dist/
npm run preview                # preview dist/ locally
npm install --cache /tmp/npm-cache   # workaround if npm cache has permission errors
```

---

## Current Status

**Live — machine-learning-agencies-reviews.com.** 36 companies. Clean build of 705 pages (36 profiles + 630 comparisons + 36 alternatives + index + etc). Deployed to Cloudflare Pages via dashboard "Connect to Git".

Data layer: TypeScript (`src/data/companies.ts`). Companies: 36 (Tiger Analytics #1 4.8, Forte Group #2 4.6, Tensorway #3 4.5 … Iguazio #36 3.5).
