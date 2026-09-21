# Replit Agent Paste — Nav chrome + Colorado media (Mockup B)
**Date:** 2026-09-20 · **Priority:** P0 overnight · **CTA lodging:** https://12acre.com/sundance  
**Do not** mention Redbarre, RipplCache, or RBC in any public UI/copy.

## Goal
1. Regroup sitewide Sundance chrome (cleaner top nav).
2. Ship **Colorado media** directory page using **Mockup B** (guided “I am…” start) + search underneath.
3. Seed directory from desk CSV (public web sources only; includes Cine Fe / Colorado Film Study).

## Locked chrome (every header: `/`, `/sundance`, companion pages)
**Left**
- 12Acre logo → `/` (use `https://12acre.com/logo-light.png` on dark headers; `logo-dark.png` on light)
- **Sundance** → `/sundance` (same label/link everywhere)

**Right (order L→R toward Inquire)**
- **Your days** → itinerary/plan page (rename Overview/Plan; this is the 10-day festival tool — not “week kit”)
- **Places ▾** dropdown → Map · Eat · Shop · Lodging · Transit · Family (existing companion routes)
- **Colorado media** → NEW `/sundance/colorado-media`
- **Inquire** → existing lodging inquire / `#sundance-contact` behavior on `/sundance`

**Remove from top nav:** Ask (move into Your days page as a panel/section). Do not leave a duplicate Overview tab.

**Active states**
- On `/sundance` lodging page → Sundance active
- On Your days route → Your days active (not Sundance)
- On Places children → Places active
- On `/sundance/colorado-media` → Colorado media active

## Your days
- Route: keep existing plan route if present (e.g. `/sundance/plan`) or `/sundance/days` — pick one canonical and 301 the other if both exist.
- Include: day planning / multi-stop tools already shipped **plus Ask-the-guide** embedded (former Ask tab content).
- Page title / nav label: **Your days**

## Places dropdown
Map, Eat, Shop, Lodging, Transit, Family — link to existing `/sundance/...` routes. Mobile: Places is one control opening the same list (fits More menu pattern).

## Colorado media page (`/sundance/colorado-media`) — Mockup B
**Above the fold — guided paths (required)**
Three large cards:
1. **I’m going to festivals** → prefilter Festivals + Theaters
2. **I’m making media** → Orgs/film office + Training + Studios (film/TV/commercials/web/influencer)
3. **I work in Colorado media** → Orgs + Media companies + Podcasts

Copy framing: **Colorado creative media** (film, TV, commercials, web, influencer) — not “Colorado film” only.

**Below paths**
- Natural-language ask box (specific or range) → maps to filters/keywords (can reuse Ask-style helper)
- Keyword search + category chips
- Results as **cards** (default); optional Table toggle + Download CSV
- Hide `UNCERTAIN` confidence by default (toggle to show)
- **Add your listing** form → submit for review only (email `sundance@12acre.us` or store for review; **nothing auto-publishes**)

**Data seed**
Import `/Users/newboy/Desktop/Professional/Sanitas View/Colorado-Media-Directory-SEED-2026-09-20.csv` (or embed JSON). Source spreadsheet: `Colorado-Film-Ecosystem-Links-2026-09-20.xlsx` updated with Cine Fe / Film Study / Arts & Venues / OEDIT task force public URLs.

UX reference (interactive): `Colorado-Film-Directory-MOCKUPS-2026-09-20.html` on same desk — prefer Mockup B tab.

## SEO (Colorado media)
- Title: something like `Colorado creative media directory | 12Acre`
- Meta: festivals, orgs, training, studios, theaters, media companies across Colorado
- Canonical: `https://12acre.com/sundance/colorado-media`

## Out of scope
- Full ads/payment stack
- Scraping Sundance Institute catalogs
- Renaming lodging CTA off `/sundance`

## After implement
Republish from Repl UI. Verify:
1. Logo → `/`, Sundance → `/sundance` sitewide
2. Right rail order + Places dropdown
3. Ask only inside Your days
4. `/sundance/colorado-media` guided start works; Cine Fe / Film Study links appear in results
5. Submit listing does not publish raw
