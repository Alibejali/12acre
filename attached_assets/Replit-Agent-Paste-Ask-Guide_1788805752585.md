# Replit Agent paste — Ask the guide (nav tab)

Run AFTER Plan+Eat+Transit is in (or same session if those routes already exist). Do not Republish — Don will.

---

```
Add Sundance companion ASK TAB — Don believes this is a sleeper feature. Match lodging/guide design system, sundance-guide-shell, Your Base + mapsProvider localStorage. Do NOT scrape or host a Sundance film database (no mirrored synopses/stills/full schedule). Do NOT invent prices. Do NOT break lodging /sundance or existing guide routes.

=== PRODUCT ===
Nav label: "Ask" (aria: Ask the guide)
Route: /sundance/guide/ask
Promise: User asks about a film, filmmaker, venue, or festival-week tip → short plain-language answer + attributed link-outs to official/public sources (Sundance.org, FilmFreeway, IMDb, and venue/Maps as relevant) + our value-add (pocket, walk/drive from Your Base, soft Stay CTA). Feels like a concierge on 12acre — not a scraped catalog.

=== ROUTE + NAV ===
- Add Route /sundance/guide/ask
- Guide shell nav order: Overview · Map · Plan · Ask · Eat · Transit · Stay
- Per-route SEO:
  title: Ask the Sundance Boulder Guide | Film & Venue Concierge | 12Acre
  description: Ask about films, venues, and festival-week tips for Sundance Boulder 2027. Live link-outs to Sundance, FilmFreeway, and IMDb — independent companion, not affiliated with Sundance Institute.
  canonical: https://12acre.com/sundance/guide/ask

=== UI ===
- Hero: "Ask the guide"
- Sub: Independent concierge for festival week — we point you to official sources; we don’t republish the Institute catalog.
- Chat/search box (primary): placeholder e.g. "What should I know about [film title]?" or "How far is Chautauqua from my base?"
- Suggested chips: Film lookup · Venue walk time · Between-screening tip · Official tickets
- Answer card area: answer text, source links (buttons), "From your base" line if venue-related, Directions (Google/Apple pref), "Add venue to plan" when applicable, soft "Stay at Sanitas View" → /sundance
- Disclaimer footer: Not affiliated with Sundance Institute. Answers cite public/official links. Verify times on your tickets / sundance.org.

=== HOW ANSWERS WORK (legal-safe) ===
Prefer a small server endpoint (Express) e.g. POST /api/sundance-ask { question, base? } that:
1) Classifies intent: film | venue | logistics | other
2) For film: does NOT scrape full Institute DB. Returns:
   - Short neutral blurb IF obtainable from a allowed live fetch of public pages OR honest "I can’t load a synopsis here — use these official links"
   - Always include deep-ish link-outs:
     • Sundance site search or festival URL patterns you can construct safely
     • FilmFreeway search URL for the title query
     • IMDb find URL for the title query
3) For venue: use our Official venue list + Your Base → walk/drive estimate (same helpers as Plan) + Directions links
4) For logistics: short editorial from Transit/Eat facts + link to those guide pages
5) Cite sources as links in the response payload

If no LLM API key is configured in the Repl secrets:
- Ship a high-quality RULE-BASED / link-out concierge (still feels useful): parse title after "about", build the three search URLs, venue fuzzy match against our list, base distance math, and canned caring copy. Do NOT fake a synopsis.
- Optional: if OPENAI_API_KEY or similar exists in Replit Secrets, use it ONLY to phrase the short answer + pick links, with system prompt forbidding invented cast/plot/showtimes and requiring link-outs. If unsure, say so and link out.

Persist last few Q&As in localStorage e.g. sundanceGuide.askHistory (max 10) for the device — no account required.

=== VERIFY ===
- /sundance/guide/ask 200; Ask in nav on all guide pages
- Film-style question yields link-outs (Sundance/FilmFreeway/IMDb) without hosting a scraped catalog
- Venue question uses Your Base + maps preference
- Plan/Eat/Transit/Map/Overview still work; lodging untouched
Report files + whether LLM secret was used or link-out mode. Do not Republish — Don will.
```

