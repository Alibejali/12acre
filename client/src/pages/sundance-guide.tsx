import { ArrowRight, ExternalLink, Map, CalendarDays, Home, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { GuideDocumentHead, SundanceGuideShell } from "@/components/sundance-guide-shell";
import { YourBaseStrip } from "@/components/sundance-guide-preferences";
import eventsHero from "@/assets/events-hero.jpg";

const title = "Sundance Boulder 2027 Guide | Venues, Map & Stay | 12Acre";
const description = "Independent companion for Sundance Film Festival week in Boulder (Jan 21–31, 2027): venue map, neighborhood pockets, and Sanitas View lodging on Broadway. Link-outs to official festival info — not a scraped schedule.";
const canonical = "https://12acre.com/sundance/guide";

export default function SundanceGuide() {
  const [showWelcome, setShowWelcome] = useState(false);
  useEffect(() => {
    try {
      setShowWelcome(!localStorage.getItem("sundanceGuide.seenWelcome"));
    } catch {
      setShowWelcome(false);
    }
  }, []);
  const dismissWelcome = () => {
    try { localStorage.setItem("sundanceGuide.seenWelcome", "true"); } catch {}
    setShowWelcome(false);
  };
  return (
    <SundanceGuideShell>
      <GuideDocumentHead title={title} description={description} canonical={canonical} />
      <section className="relative overflow-hidden border-b border-border bg-slate-900">
        <img src={eventsHero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-slate-950/65" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
          <div className="relative z-10">
          <p className="mb-5 text-sm font-medium uppercase tracking-widest text-white/65">Brought to you by Sanitas View and 12Acre · Independent festival kit</p>
          <h1 className="max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">Your Boulder festival week kit</h1>
          <p className="mt-7 max-w-2xl text-lg font-light leading-8 text-white/75">
            An independent festival kit for Sundance Boulder week—your personal dossier for maps, plans, and tips. Not affiliated with Sundance Institute.
          </p>
          <Link href="/sundance" className="mt-9 inline-flex items-center gap-2 rounded-full bg-white/90 px-6 py-3 font-medium text-primary hover:bg-white">
            Stay at Sanitas View <ArrowRight className="h-4 w-4" />
          </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-12 md:px-6">
        <YourBaseStrip showProvider />
      </section>
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 md:grid-cols-[1.2fr_0.8fr] md:px-6 md:py-20">
        <div>
          <h2 className="text-3xl font-semibold text-slate-950">Built to help you find your bearings</h2>
          <div className="mt-6 space-y-5 text-base leading-7 text-slate-600">
            <p>This companion starts with confirmed venues and a neighborhood-based map. Day planning, places to eat and shop, family ideas, transit notes, and an ask-the-guide feature will follow.</p>
            <p>This is not the official Sundance schedule. For films, tickets, program updates, and final event details, use <a href="https://www.sundance.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-semibold text-slate-900 underline underline-offset-4">sundance.org <ExternalLink className="h-3.5 w-3.5" /></a>.</p>
          </div>
        </div>
        <aside className="rounded-lg bg-slate-950 p-7 text-white">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-400">Your Boulder base</p>
          <h2 className="mt-4 text-3xl font-semibold text-white">Sanitas View</h2>
          <p className="mt-4 leading-7 text-slate-300">Eleven contiguous townhomes on Broadway in Newlands, available for teams and creatives during festival week.</p>
          <Link href="/sundance" className="mt-7 inline-flex items-center gap-2 font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            Inquire about lodging <ArrowRight className="h-4 w-4" />
          </Link>
        </aside>
      </section>

      <section className="bg-white/60">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <div className="grid gap-5 md:grid-cols-3">
            <Link href="/sundance/guide/map" className="group rounded-3xl border border-slate-900/10 bg-white p-7 transition-transform hover:-translate-y-1">
              <Map className="h-7 w-7 text-amber-700" />
              <h2 className="mt-8 text-2xl font-semibold">Explore the map</h2>
              <p className="mt-3 leading-7 text-slate-600">Browse official venues by Boulder neighborhood pocket.</p>
              <span className="mt-7 inline-flex items-center gap-2 font-semibold">Open map <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
            <a href="https://www.sundance.org/" target="_blank" rel="noopener noreferrer" className="group rounded-3xl border border-slate-900/10 bg-white p-7 transition-transform hover:-translate-y-1">
              <CalendarDays className="h-7 w-7 text-amber-700" />
              <h2 className="mt-8 text-2xl font-semibold">Official festival info</h2>
              <p className="mt-3 leading-7 text-slate-600">Go straight to Sundance for program details, tickets, and updates.</p>
              <span className="mt-7 inline-flex items-center gap-2 font-semibold">Visit Sundance <ExternalLink className="h-4 w-4" /></span>
            </a>
            <Link href="/sundance" className="group rounded-3xl border border-slate-900/10 bg-white p-7 transition-transform hover:-translate-y-1">
              <Home className="h-7 w-7 text-amber-700" />
              <h2 className="mt-8 text-2xl font-semibold">Stay with your team</h2>
              <p className="mt-3 leading-7 text-slate-600">Make Sanitas View your private base for the festival week.</p>
              <span className="mt-7 inline-flex items-center gap-2 font-semibold">View lodging <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
            </Link>
          </div>

          <div className="mt-12 rounded-3xl border border-dashed border-slate-400 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">Map filters</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Official", "Around the fest", "All"].map((filter, index) => (
                <span key={filter} className={`rounded-full px-4 py-2 text-sm font-medium ${index === 0 ? "bg-slate-950 text-white" : "bg-slate-200 text-slate-600"}`}>{filter}</span>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-500">Around the fest listings appear as partner venues announce.</p>
          </div>
        </div>
      </section>
      {showWelcome && (
        <section role="dialog" aria-modal="false" aria-labelledby="guide-welcome-title" className="fixed bottom-4 left-4 right-4 z-[60] mx-auto max-w-lg rounded-3xl bg-slate-950 p-6 text-white shadow-2xl">
          <button type="button" onClick={dismissWelcome} aria-label="Dismiss welcome" className="absolute right-4 top-4 text-white/70 hover:text-white"><X className="h-5 w-5" /></button>
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">Welcome</p>
          <h2 id="guide-welcome-title" className="mt-2 text-2xl font-semibold">A quick way to use this kit</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-white/75">
            <li><b className="text-white">Map</b> · find venue pockets.</li>
            <li><b className="text-white">Plan</b> · add your own stops and times.</li>
            <li><b className="text-white">Ask</b> · get source-first guidance.</li>
            <li><b className="text-white">Lodging / Stay</b> · consider Sanitas View for your group.</li>
          </ul>
          <button type="button" onClick={dismissWelcome} className="mt-5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-950">Got it</button>
        </section>
      )}
    </SundanceGuideShell>
  );
}