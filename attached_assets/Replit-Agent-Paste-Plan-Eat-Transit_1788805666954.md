# Replit Agent paste — Plan + Eat + Transit (+ multi-stop day map)

Paste into Replit Agent (nordic-summit-consulting). Do not Republish — Don will.

---

```
Companion slice 2 for 12acre.com: /sundance/guide/plan + /eat + /transit, and upgrade Map↔Plan into a multi-stop day builder. Match lodging/guide design system (post A–D polish). Reuse sundance-guide-shell, Your Base (localStorage), Google|Apple Maps preference. Do NOT invent prices. Do NOT scrape or embed Sundance Institute film schedules, synopses, or ticket inventory — users enter their own showtimes from official tickets/sundance.org.

=== ROUTES ===
Add (wouter App.tsx, more-specific first if needed):
- /sundance/guide/plan
- /sundance/guide/eat
- /sundance/guide/transit
Wire nav in guide shell: Overview · Map · Plan · Eat · Transit · Stay→/sundance
Remove “Coming soon” stubs for these three.
Keep /sundance lodging + 301 /events/sundance→/sundance unchanged.

Per-route Helmet/server SEO (same pattern as guide/map):
- Plan title: Sundance Boulder Day Plan 2027 | Multi-stop Guide | 12Acre
  desc: Build an ordered venue day plan for Sundance Boulder week — leave-by times between screenings, walk/drive legs, Q&A buffer. Independent companion; enter your own showtimes.
  canonical https://12acre.com/sundance/guide/plan
- Eat title: Where to Eat During Sundance Boulder 2027 | 12Acre Guide
  desc: Neighborhood pocket eateries near Sundance Boulder venues — between screenings, group-friendly, quiet notes. Independent local companion.
  canonical https://12acre.com/sundance/guide/eat
- Transit title: Getting Around Sundance Boulder 2027 | Walk, RTD, Parking | 12Acre
  desc: Walk-first festival footprint, RTD tips, parking/rideshare notes from Broadway Newlands. Independent companion — not official Sundance transit.
  canonical https://12acre.com/sundance/guide/transit

=== PLAN PAGE (hero feature) — multi-stop process map ===
Product intent: Festival days are chains of venues, NOT always return-to-base. User builds an ordered list of stops (3 / 5 / 10+), sets times, and sees when they must LEAVE each venue to make the next.

UI:
1) Day plan builder (persist localStorage key e.g. sundanceGuide.dayPlan)
   - Add stop: pick from Official venues list (same data as Map) OR custom label+address OR “Your Base”
   - Reorder stops (up/down or drag if easy)
   - Per stop fields (user-entered):
     • Arrival / show start (datetime or time + date for festival week Jan 21–31 2027)
     • Runtime minutes (optional; default 120 if blank — label as estimate)
     • Post-show buffer minutes (default 30 for Q&A / “show and tell”; user adjustable 0–90)
     • Notes (optional)
   - Remove stop
2) Computed legs between consecutive stops:
   - End-of-block = start + runtime + buffer
   - Travel estimate minutes between stop N and N+1:
     Prefer: if venue coords known, haversine → walk min at ~3 mph and drive min at ~15 mph urban; show BOTH walk + drive estimates.
     If no coords: use pocket-to-pocket rough table (Pearl↔CU ~15–20 walk, Pearl↔Chautauqua ~25–35 walk, Pearl↔Dairy/Cinemark ~10–15 drive, Broadway/Newlands↔Pearl ~20–30 walk / ~8–12 drive) — label estimates clearly “approx — verify in Maps”.
   - LEAVE BY = next_start − travel_minutes − small safety (default 10 min, user adjustable)
   - If leave_by is before end-of-block, show WARN: “Tight / likely miss Q&A or next show — leave early or drop buffer”
3) Directions per leg: button opens Google or Apple (user mapsProvider) with origin=stop N address, destination=stop N+1
4) Optional “Start from Your Base” / “End at Your Base” toggles that prepend/append base as stops
5) Clear plan / duplicate day
6) Soft CTA: Stay at Sanitas View → /sundance
7) Disclaimer: Not affiliated with Sundance Institute. Showtimes you enter are yours; official tickets/program at sundance.org. Travel times are estimates.

MAP INTEGRATION:
- On Map venue cards: “Add to plan” → appends venue to dayPlan and optionally navigates to /sundance/guide/plan
- Do not remove single-leg Directions from Map; Plan is the multi-stop tool.

Around the fest: if a companion venue is later added, same Add-to-plan path; for now Official + custom + base.

=== EAT PAGE ===
Pocket-grouped starter list (verified-or-well-known Boulder spots — factual, no fake ratings). Angles: between-screening (fast), group table, quiet/reset. Include Pearl / Downtown, near CU, North/Casey fringe, East/Dairy, near Broadway/Newlands for Sanitas View base. Each card: name, pocket, 1-line angle, Directions via mapsProvider, optional “Add to plan” as a custom/meal stop.
Keep list curated short (8–15), not a scraped directory. Note partnerships/sponsorships come later (WS-24).
Link out; no invented hours unless you’re sure — prefer “check hours” + Maps.

=== TRANSIT PAGE ===
Original editorial + official link-outs:
- Walk-first ~2-mile Boulder venue footprint (Sundance public messaging)
- RTD / local bus — link rtd-denver.com or Boulder transit pages (verify URLs)
- Parking: scarce in January; prefer walk/rideshare; link city parking info if known
- Ice/snow / accessibility note
- From Broadway Newlands (Sanitas View default base): how people typically reach Pearl / CU / Chautauqua / Dairy (high-level)
- Day-trip note for Around the fest / Denver (Sie etc.) — drive/RTD, not detailed scrape
- Soft CTA lodging

=== SHARED ===
Guide shell nav updates; visual sync with lodging; Your Base + mapsProvider unchanged.
No consulting nav. No film titles from a scraped catalog.

=== VERIFY ===
- All three routes 200; nav links work; SEO head correct
- Plan: add 3+ stops, reorder, set times, see leave-by + tight warning; survives refresh
- Map “Add to plan” works
- Eat + Transit render; Directions honor Google/Apple
- /sundance + 301 intact
Report files + localStorage keys. Do not Republish — Don will.
```

