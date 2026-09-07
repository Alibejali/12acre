# Replit Agent paste — Welcome every visit + (i) tips

```
UX: festival-kit first-time help. Match Sundance chrome. Do not Republish — Don will.

=== 1) WELCOME SHEET — every visit unless opted out ===
Current: sundanceGuide.seenWelcome hides welcome forever after Got it. CHANGE behavior:

- Show the welcome sheet on /sundance/guide (Overview) at the START of each visit/session by default.
- Add checkbox: "Don't show this again" (unchecked by default).
- Buttons: "Got it" (dismiss for this visit only) AND honor checkbox:
  - If checked + Got it → set localStorage sundanceGuide.hideWelcome=true (never auto-show)
  - If unchecked + Got it → do NOT set hide flag; show again next visit (new page load / new session)
- Migrate: if old sundanceGuide.seenWelcome==="true", treat as hideWelcome=true OR clear seenWelcome and use only hideWelcome going forward (prefer migrate old → hideWelcome so existing dismissers aren't spammed).
- Keep title "A quick way to use this kit" + Map/Plan/Ask/Lodging bullets + kit branding tone.

=== 2) (i) INFO BUTTONS ===
Add small (i) / help icon buttons with popover or dialog (mobile-friendly) in these places:

A) Plan page header — tip: "Add venues in order, enter your ticket times, and we’ll estimate leave-by times between stops. You enter showtimes from Sundance—we don’t scrape the festival grid."
B) Ask page header — tip: "Ask about lineup timing, venues, or a film title. We answer in plain language and link to official sources. We don’t republish the Institute catalog."
C) Your Base strip (shared / Map / Overview where shown) — tip: "Your Base is saved on this device. Change it to any venue or address; directions and walk tips use that starting point. Default is Sanitas View."
D) Lodging page Featured card — tip: "Sanitas View is our Featured private compound for teams. Other stays and sponsored listings appear below—Inquire keeps you on the festival rental path."

Popover: tap (i) to open, tap outside or Close to dismiss. Large hit target on mobile. Accessible aria-label="About …".

=== VERIFY ===
- Fresh load Overview: welcome shows; Got it without checkbox → shows again on reload
- Check Don't show again + Got it → stays hidden on reload
- (i) tips work on Plan, Ask, Your Base, Lodging
- Mobile More / Inquire intact
Report files. Do not Republish — Don will.
```
