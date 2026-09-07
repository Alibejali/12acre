import { ExternalLink, Footprints, Mountain, ShieldCheck, TrainFront } from "lucide-react";
import { GuideDocumentHead, SundanceGuideShell } from "@/components/sundance-guide-shell";
import { MapsProviderControl, YourBaseStrip } from "@/components/sundance-guide-preferences";

const title = "Getting Around Sundance Boulder 2027 | Walk, RTD, Parking | 12Acre";
const description = "Walk-first festival footprint, RTD tips, parking/rideshare notes from Broadway Newlands. Independent companion — not official Sundance transit.";
const canonical = "https://12acre.com/sundance/guide/transit";

export default function SundanceGuideTransit() {
  return (
    <SundanceGuideShell>
      <GuideDocumentHead title={title} description={description} canonical={canonical} />
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Move through town</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight !text-white md:text-6xl">Boulder is compact. Festival movement still needs a plan.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">Walk first when you can; conditions beat assumptions.</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <YourBaseStrip showProvider />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl bg-[#e9eee9] p-7">
            <Footprints className="h-7 w-7 text-amber-700" />
            <h2 className="mt-6 text-2xl font-semibold">Walk-first footprint</h2>
            <p className="mt-3 leading-7 text-slate-600">Sundance has described a roughly two-mile Boulder venue footprint. From Sanitas View in Broadway / Newlands, Pearl Street is the central anchor. CU campus sits southeast, Chautauqua farther south, and Dairy Arts Center east of downtown. Walk when pavement and time allow.</p>
          </article>
          <article className="rounded-3xl bg-[#f1e9df] p-7">
            <Mountain className="h-7 w-7 text-amber-700" />
            <h2 className="mt-6 text-2xl font-semibold">Ice and access</h2>
            <p className="mt-3 leading-7 text-slate-600">January conditions can change quickly. Build in traction, layers, and a backup ride. Ask venues about step-free entrances and accessible seating before the day; do not assume a route is clear after snow or ice.</p>
          </article>
          <article className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-900/10">
            <TrainFront className="h-7 w-7 text-amber-700" />
            <h2 className="mt-6 text-2xl font-semibold">RTD, bike, rideshare</h2>
            <p className="mt-3 leading-7 text-slate-600">RTD can connect Broadway / Newlands with Pearl, CU, and central corridors; use its live trip planner for the day’s service. Cycling can be efficient in clear conditions. A rideshare pickup one block away may be easier than a crowded venue curb.</p>
            <a href="https://www.rtd-denver.com/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold underline underline-offset-4">
              RTD official service <ExternalLink className="h-4 w-4" />
            </a>
          </article>
          <article className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-900/10">
            <ShieldCheck className="h-7 w-7 text-amber-700" />
            <h2 className="mt-6 text-2xl font-semibold">Parking and a Denver day</h2>
            <p className="mt-3 leading-7 text-slate-600">Do not assume a venue has festival parking. Read posted signs and respect residential areas. For an Around-the-fest day trip to Denver, compare driving with RTD and make a complete return plan using official regional transit and venue information.</p>
            <a href="https://bouldercolorado.gov/services/parking" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold underline underline-offset-4">
              Boulder parking information <ExternalLink className="h-4 w-4" />
            </a>
          </article>
        </div>
        <section className="mt-10 rounded-3xl border border-slate-900/10 bg-slate-950 p-7 text-white">
          <h2 className="text-2xl font-semibold !text-white">Choose your directions provider</h2>
          <p className="mt-2 text-white/65">Your choice is saved on this device and used throughout the guide.</p>
          <div className="mt-5"><MapsProviderControl /></div>
        </section>
      </main>
    </SundanceGuideShell>
  );
}