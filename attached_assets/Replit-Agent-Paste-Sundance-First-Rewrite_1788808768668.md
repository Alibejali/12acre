# Replit Agent paste — /sundance Sundance-first rewrite + unified chrome

Don locked 2026-09-07 (Marketing + OOR + UX). Logo→/ may already be in unpublished work — keep it. Do not Republish — Don will.

---

```
REWRITE /sundance to Sundance-first narrative AND unify Sundance chrome so guide tabs never disappear after Stay/Inquire.

Do NOT invent prices/rates. Do NOT scrape schedules. Do NOT break /events/sundance → /sundance 301 (query preserve). Do NOT remove /sundance/guide/* routes. Inquire form + sundance@12acre.com behavior stays.

=== 1) UNIFIED SUNDANCE CHROME (critical UX) ===
Problem: Lodging /sundance uses a minimal header (logo + Inquire only). Guide pages have Overview·Map·Plan·Ask·… When user hits Stay with us → Inquire → Back to top, guide tabs are gone. Kludge.

Fix: ONE shared header component used on BOTH /sundance AND every /sundance/guide/* page.

Header contents (L→R, mobile wrap OK):
- Logo → "/" (site home) — never Services
- Subdued text/nav tabs (same on every Sundance page):
  Overview → /sundance/guide
  Map → /sundance/guide/map
  Plan → /sundance/guide/plan
  Ask → /sundance/guide/ask
  Eat → /sundance/guide/eat
  Shop → /sundance/guide/shop
  Family → /sundance/guide/family
  Transit → /sundance/guide/transit
- Highlight current route tab
- Optional muted "Stay" state when path is exactly /sundance (or label the lodging story as current without a redundant tab)
- PRIMARY brightest/largest control: "Inquire" → /sundance#sundance-contact (or scroll-to-inquire when already on /sundance; flip to "Back to top" while inquire section in view — keep existing inquire UX behavior)

Visual hierarchy: tabs subdued; Inquire is the hero control. Match lodging design system.
Replace old lodging-only minimal header AND old guide-shell header with this shared chrome.
Still NO full consulting nav (About/Services/etc.) on these pages.
Footer disclaimer on guide pages stays (independent / not affiliated with Sundance Institute).

=== 2) /sundance PAGE JOB ===
"How to base festival week in Boulder" — Sanitas View is unequal hero lodging, not a purchase pitch.
Independent hospitality + companion — never official Sundance media.

=== 3) HERO (Sundance-first) ===
Lead: festival week + Boulder base reality (Jan 21–31, 2027; teams need one place).
Subhead: Sanitas View as smart Broadway/Newlands contiguous campus (named clearly).
Spine intent: "First Boulder Sundance · January 21–31, 2027 · Keep your people together"
Keep approved scarcity facts (~2,900 rooms / ~85k over 11-day run) if present — factual, not fear.
In-hero CTAs: Inquire (primary) + Festival week guide secondary still OK (or rely on header tabs).
REMOVE "Don't compete for Boulder" if present.

=== 4) SECTION ORDER ON /sundance ===
1) Festival week — dates, premiere-density week 1 plain language; link sundance.org for official program/tickets; point to header tabs / guide tools (do NOT embed Plan/Ask UIs in this scroll).
2) Lodging problem — contiguous campus vs scattered keys; care/ops for teams — NOT hotel tear-down war. Remove aggressive Hotel Block vs Sanitas attack columns.
3) Your Base: Sanitas View — unequal hero: ~3,000 sq ft, kitchens, rooftops, 3303–3339 Broadway, concierge/black car/catering as hospitality care.
4) How teams use it — 2–3 lighter uses: studio/creative pod, talent+family/entourage, full-campus. Demote brand-activation as primary.
5) Flex booking — keep 1 / sub-block / full 11.
6) Soft utility reminder — short line that Map/Plan/Ask/etc. live in the header tabs (optional small cards OK).
7) FAQ — factual; no purchase-primary FAQ.
8) Inquire & Reserve — KEEP form + email; soften fear headlines.

=== 5) DROP / DEMOTE ON /sundance ===
- Purchase / mid-$2.4M / Lynn sales: remove from primary festival path (quiet far-below line OK only if needed; prefer remove from hero/mid).
- Hotel-bashing comparison columns
- Fear CTAs
- Official-Sundance-sounding claims / scraped schedule

=== 6) KEEP ===
11 contiguous · Broadway Newlands · dates · team-together · kitchens/rooftops · flex booking · care amenities · inquire · guide access via unified tabs

=== 7) SEO (/sundance) ===
Title: Sundance Boulder 2027 Lodging | Sanitas View Basecamp | 12Acre
Description: Base festival week in Boulder at Sanitas View — 11 contiguous townhomes on Broadway for teams and entourages, Jan 21–31, 2027. Independent lodging + companion guide.
Canonical: https://12acre.com/sundance
Update server/sundance-seo.ts + client head.

=== 8) VERIFY ===
- Shared header on /sundance AND /sundance/guide, /map, /plan, /ask, /eat, /shop, /family, /transit
- From Stay → Inquire → Back to top: guide tabs STILL visible
- From any guide tab → Inquire reaches form; tabs remain
- Logo → /
- /events/sundance 301 + query OK
- No consulting nav; Inquire visually dominant vs subdued tabs
- Purchase/hotel-bash/fear CTA gone from primary path
Report files touched. Do not Republish — Don will.
```

