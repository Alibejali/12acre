# Replit Agent Paste — UX fix: chrome + Itinerary + Colorado media lists (2026-09-20)
# Don feedback after overnight republish — ship ASAP

## 1) Sitewide chrome MUST match home on every page
Problem: Sundance / top nav jumps in placement or style across routes.

Fix:
- One shared header/chrome component used on **all** pages (home, /sundance, Places children, Colorado media, Inquire, Your days/Itinerary).
- Same order, font, size, spacing, sticky behavior, and logo treatment as **home**.
- Locked labels (update “Your days” → **Itinerary**):
  - Logo → `/`
  - **Sundance** → `/sundance`
  - **Itinerary** (was “Your days”) — Ask stays inside this section, not top-level
  - **Places** ▾ → Map / Eat / Shop / Lodging / Transit / Family
  - **Colorado media** → `/sundance/colorado-media`
  - **Inquire**
- Mobile More/hamburger must use the same labels and destinations.
- No alternate “Sundance” CTA chip styles that conflict with the primary nav Sundance item.

## 2) Rename Your days → Itinerary
- Replace visible label everywhere (nav, page title, breadcrumbs, mobile).
- Routes may keep old paths as redirects if needed, but UI says **Itinerary**.
- First-timer meaning: plan-your-days / itinerary tools (Ask lives here).

## 3) Colorado media directory — list our seed, don’t bounce offsite
Seed source: `Colorado-Media-Directory-SEED-2026-09-20.csv` (~176 rows; **85 type=festival**).

### Default landing (no category selected)
- Do **NOT** show 10 random cards.
- Show either: empty state (“Choose a category”) **or** category-only chips/list with **counts** from the seed (Festivals 85, Orgs, Theaters, etc.).
- Prefer category chips + counts; zero result cards until a category or search is chosen.

### Category clicks (Festivals and every other type)
- Filter the **full in-app list** from the seed CSV by `type` (e.g. festival → all ~85 festivals).
- Render our cards/table rows: name, city, short notes, optional confidence.
- **Do not** navigate the whole page to the external URL on category click.
- Card primary action = open **in-app detail panel/page under our chrome**.
- Secondary action = “Visit website” → `target=_blank` (or iframe embed attempt with fallback — see §4).

### Fix seed gaps if still missing
Ensure Arts & Venues and FAMCO rows from the seed are loaded and searchable (earlier verify found 0 hits).

## 4) External sites inside our chrome (optional enhancement)
Don asked: keep menu while viewing other sites.
- Best MVP: in-app detail + Visit website in new tab (always works).
- Optional: try `<iframe>` under our header when the remote allows embedding; if blocked (`X-Frame-Options`/CSP), show fallback message + Open in new tab.
- Do not rely on iframe-only.

## 5) Lodging / brand rules (unchanged)
- Lodging CTA: https://12acre.com/sundance
- No Redbarre / RipplCache / RBC in public UI.

## Done when
1. Header identical on home, /sundance, /sundance/colorado-media, Places child, Itinerary.
2. Nav label **Itinerary** everywhere (not Your days).
3. Colorado media default = no random cards; categories show full filtered seed lists in-app.
4. Festivals shows ~85 (or full festival count from loaded seed), not 1.
5. External links don’t steal the whole chrome; Visit website is explicit.
6. Republish + smoke.

