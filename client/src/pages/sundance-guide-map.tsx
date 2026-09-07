import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { Link } from "wouter";
import { GuideDocumentHead, SundanceGuideShell } from "@/components/sundance-guide-shell";
import { YourBaseStrip, useGuidePreferences } from "@/components/sundance-guide-preferences";

const title = "Sundance Boulder Venues & Map 2027 | 12Acre Guide";
const description = "Official Sundance Boulder screening venues by neighborhood pocket, plus Around the fest filter for Front Range companion showings. Base: Sanitas View, 3303–3339 Broadway.";
const canonical = "https://12acre.com/sundance/guide/map";

const venueGroups = [
  { pocket: "Pearl / Downtown", venues: [
    { name: "Boulder Theater" }, { name: "eTown Hall" }, { name: "Canyon Theater", note: "Boulder Public Library" },
    { name: "Hotel Boulderado", note: "Festival headquarters / programming; not necessarily a screening theater" },
  ]},
  { pocket: "North", venues: [{ name: "Casey Middle School Auditorium" }] },
  { pocket: "CU campus", venues: [{ name: "Macky Auditorium Concert Hall" }, { name: "Muenzinger Auditorium" }, { name: "Roe Green Theatre" }] },
  { pocket: "Chautauqua / Flatirons edge", venues: [{ name: "Chautauqua Auditorium" }] },
  { pocket: "East fringe", venues: [
    { name: "Boedecker Theater", note: "Dairy Arts Center" }, { name: "Gordon Gamm Theater", note: "Dairy Arts Center" },
    { name: "Cinemark Century Boulder", note: "P&I / additional screenings per Sundance" },
  ]},
  { pocket: "Near campus / Central", venues: [{ name: "Boulder High School Auditorium" }] },
];

type Filter = "Official" | "Around the fest" | "All";

export default function SundanceGuideMap() {
  const [filter, setFilter] = useState<Filter>("Official");
  const showOfficial = filter !== "Around the fest";
  const showAround = filter !== "Official";
  const { directionsUrl, provider } = useGuidePreferences();

  return (
    <SundanceGuideShell>
      <GuideDocumentHead title={title} description={description} canonical={canonical} />
      <section className="border-b border-white/10 bg-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-18">
        <p className="text-sm font-medium uppercase tracking-widest text-white/60">Boulder · 2027</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">Venues by neighborhood pocket</h1>
        <p className="mt-5 max-w-2xl text-lg font-light leading-8 text-white/70">Confirmed venue names, grouped to make Boulder easier to navigate. No invented drive times or showtimes.</p>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Venue filters">
          {(["Official", "Around the fest", "All"] as Filter[]).map((item) => (
            <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${filter === item ? "bg-white text-primary" : "border border-white/30 text-white hover:bg-white/10"}`}>
              {item}
            </button>
          ))}
        </div>
      </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8 md:px-6">
        <div className="-mt-1 pt-8"><YourBaseStrip showProvider /></div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 pb-16 md:grid-cols-[0.9fr_1.1fr] md:px-6 md:pb-24">
        <div className="min-h-[360px] overflow-hidden rounded-3xl border border-slate-900/10 bg-white md:sticky md:top-24 md:h-[620px]">
          <iframe
            title="OpenStreetMap of Boulder, Colorado"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-105.315%2C39.975%2C-105.225%2C40.065&layer=mapnik&marker=40.035%2C-105.282"
            className="h-full min-h-[360px] w-full border-0"
            loading="lazy"
          />
        </div>

        <div>
          {showOfficial && (
            <div className="space-y-8">
              {venueGroups.map((group) => (
                <section key={group.pocket}>
                  <h2 className="border-b border-slate-900/15 pb-3 text-xl font-semibold text-slate-950">{group.pocket}</h2>
                  <div className="mt-3 space-y-3">
                    {group.venues.map((venue) => {
                      const directions = directionsUrl(`${venue.name} Boulder, CO`);
                      return (
                        <article key={venue.name} className="rounded-2xl bg-white p-5">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="inline-flex rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">Official</span>
                              <h3 className="mt-3 text-lg font-semibold">{venue.name}</h3>
                              {venue.note && <p className="mt-1 text-sm leading-6 text-slate-500">{venue.note}</p>}
                            </div>
                            <a href={directions} target="_blank" rel="noreferrer" aria-label={`Directions to ${venue.name}`}
                              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-3 py-2 text-sm font-semibold hover:bg-slate-50">
                              <MapPin className="h-4 w-4" /> Directions · {provider === "apple" ? "Apple" : "Google"}
                            </a>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}

          {showAround && (
            <section className={`${showOfficial ? "mt-10" : ""} rounded-3xl border border-dashed border-slate-400 bg-white/40 p-8`}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Around the fest</p>
              <h2 className="mt-3 text-2xl font-semibold">Partner announcements to come</h2>
              <p className="mt-3 leading-7 text-slate-600">Front Range companion showings (e.g. Denver indie houses) will appear here as partners announce. Not official Sundance Institute screenings.</p>
            </section>
          )}

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-900/10 pt-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
            <p>Not affiliated with Sundance Institute. Official program and tickets: sundance.org</p>
            <a href="https://www.sundance.org/" target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-slate-950">
              Official festival venue map <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </SundanceGuideShell>
  );
}