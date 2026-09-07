# Replit Agent paste — Ali preview fixes (updated Don 2026-09-07)

```
Ali + Don preview feedback (updated). Match Sundance design system. Do not invent film lineup or prices. Do not scrape Institute catalogs. Do not Republish — Don will.

=== 1) INTERNAL SERVER ERROR on /sundance ===
Users saw intermittent plain "Internal Server Error" on /sundance (incl. #sundance-contact).
Harden server HTML/SEO + SPA fallback + /api/contact: never uncaught throw; prefer always 200 HTML shell; log errors. Hash navigation must not 500. Verify curl /sundance ×20 all 200; contact POST still succeeds.

=== 2) ASK — festival FAQ vs film title ===
Mis-classifying "did films get selected / when will we know" as a title search is wrong.
Add festival_status / lineup_timing intent with a caring human answer: we don’t publish the Institute slate; official selection/lineup news comes from Sundance; link https://www.sundance.org/ (no invented announcement dates). Do NOT send those FAQs to FilmFreeway/IMDb.
Film TITLE lookups still get Sundance/FilmFreeway/IMDb link-outs without synopses.
Add chip: "When is the lineup announced?"
Keep rule-based answers for FAQs/venues/logistics (cheap at scale). Do NOT wire paid LLM calls in this paste — architecture note only in a code comment: future Gemma4 primary + rare Claude/Grok escalate on RBC.

=== 3) EXTERNAL LINKS — new tab, come back here ===
No iframes.
Before first external open each session (or on every external click — prefer once-per-session confirm OR always show inline helper):
Copy near external actions / confirm:
"This link opens in a new tab or window so you can come back here when you’re finished."
All external: target=_blank rel="noopener noreferrer" + external icon.
Our guide tab stays as the return path.

=== 4) FESTIVAL KIT BRANDING (order locked) ===
Brought to you by **Sanitas View and 12Acre** (that order — Sanitas View first).
Plain English: "festival kit" / "festival companion"; dossier only in descriptive gloss, e.g. "your personal dossier for the week."
Overview hero + shared Sundance footer, e.g.:
"Brought to you by Sanitas View and 12Acre — an independent festival kit for Sundance Boulder week (your personal dossier for maps, plans, and tips). Not affiliated with Sundance Institute."

=== 5) FIRST-TIME HELP ===
localStorage sundanceGuide.seenWelcome: dismissible welcome on /sundance/guide — festival kit intro; bullets Map · Plan · Ask · Lodging/Stay; Got it.
(i) popovers on Plan, Ask, Your Base, Lodging Featured — 1–2 sentences each.
Short How to use this kit on Overview if thin.

=== VERIFY ===
As above + branding order Sanitas View and 12Acre; external come-back copy; Ask lineup FAQ sane.
Report files. Do not Republish — Don will.
```
