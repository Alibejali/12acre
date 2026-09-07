import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { Link } from "wouter";
import { GuideDocumentHead, SundanceGuideShell } from "@/components/sundance-guide-shell";
import { useGuidePreferences, YourBaseStrip } from "@/components/sundance-guide-preferences";

const title = "Family & Kids at Sundance Boulder 2027 | 12Acre Guide";
const description = "Honest guidance for families during Sundance Boulder week — not a kids festival — plus soft landings, partner sitters later, and townhome hospitality. Independent companion.";
const canonical = "https://12acre.com/sundance/guide/family";

export default function SundanceGuideFamily() {
  const { directionsUrl, provider } = useGuidePreferences();
  const directionLabel = provider === "apple" ? "Apple" : "Google";
  return (
    <SundanceGuideShell>
      <GuideDocumentHead title={title} description={description} canonical={canonical} />
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">An honest family companion</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold !text-white md:text-7xl">Festival week, with kids in the picture.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">Sundance is not a kids festival. Families who come anyway can still plan gentler days, dependable resets, and realistic handoffs.</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <YourBaseStrip showProvider />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl bg-[#f1e9df] p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Start with the official program</p>
            <h2 className="mt-4 text-2xl font-semibold">Do not assume a screening is for children.</h2>
            <p className="mt-3 leading-7 text-slate-600">Themes, length, timing, and venue rules vary. Review the current official listing and your ticket details before bringing a child; this guide does not invent or mirror a kids slate.</p>
            <a href="https://www.sundance.org/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold underline underline-offset-4">Check Sundance directly <ExternalLink className="h-4 w-4" /></a>
          </article>
          <article className="rounded-3xl bg-[#e9eee9] p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">A softer landing</p>
            <h2 className="mt-4 text-2xl font-semibold">Kitchens, downtime, and separate rhythms.</h2>
            <p className="mt-3 leading-7 text-slate-600">A townhome base can make breakfast, naps, early nights, and staggered screening plans easier than trying to keep everyone in festival mode all day.</p>
            <Link href="/sundance" className="mt-5 inline-flex items-center gap-2 font-semibold underline underline-offset-4">Explore Sanitas View <ArrowRight className="h-4 w-4" /></Link>
          </article>
          <article className="rounded-3xl border border-slate-900/10 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Easy reset</p>
            <h2 className="mt-4 text-2xl font-semibold">Chautauqua paths</h2>
            <p className="mt-3 leading-7 text-slate-600">The Chautauqua area offers open space and high-level trail options, but January surfaces and weather matter. Choose a route appropriate to your family and current conditions.</p>
            <a href={directionsUrl("Chautauqua Park Boulder Colorado")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"><MapPin className="mr-1 h-4 w-4" />Directions · {directionLabel} <ExternalLink className="ml-1 h-4 w-4" /></a>
          </article>
          <article className="rounded-3xl border border-slate-900/10 bg-white p-7 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Easy reset</p>
            <h2 className="mt-4 text-2xl font-semibold">Pearl Street stroll</h2>
            <p className="mt-3 leading-7 text-slate-600">The pedestrian mall provides a straightforward downtown walk between plans. Keep the reset flexible rather than treating it as another timed attraction.</p>
            <a href={directionsUrl("Pearl Street Mall Boulder Colorado")} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"><MapPin className="mr-1 h-4 w-4" />Directions · {directionLabel} <ExternalLink className="ml-1 h-4 w-4" /></a>
          </article>
          <article className="rounded-3xl border border-dashed border-slate-400 bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Childcare</p>
            <h2 className="mt-4 text-2xl font-semibold">Partner childcare listings coming.</h2>
            <p className="mt-3 leading-7 text-slate-600">We are not publishing unverified sitter recommendations. When considering any caregiver, independently confirm identity, references, credentials, insurance, availability, and the arrangement that fits your family.</p>
          </article>
          <article className="rounded-3xl bg-slate-950 p-7 text-white">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-300">Practical pacing</p>
            <h2 className="mt-4 text-2xl font-semibold !text-white">January rewards a shorter day.</h2>
            <p className="mt-3 leading-7 text-white/70">Leave room for layers, icy sidewalks, food, naps, and early nights. Put only the essential stops into the planner and preserve a route back to your base.</p>
            <Link href="/sundance/guide/plan" className="mt-5 inline-flex items-center gap-2 font-semibold text-white underline underline-offset-4">Open the day planner <ArrowRight className="h-4 w-4" /></Link>
          </article>
        </div>
        <section className="mt-10 rounded-3xl bg-[#e9eee9] p-7 md:flex md:items-center md:justify-between">
          <div><h2 className="text-2xl font-semibold">Give the family room to reset.</h2><p className="mt-2 text-slate-600">Townhome hospitality near Broadway, with a kitchen and space for different schedules.</p></div>
          <Link href="/sundance" className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-semibold text-white md:mt-0">Stay at Sanitas View <ArrowRight className="h-4 w-4" /></Link>
        </section>
        <p className="mt-8 text-sm text-slate-500">Independent companion; not affiliated with Sundance Institute. Verify official program details, venue policies, conditions, and caregiver credentials directly.</p>
      </main>
    </SundanceGuideShell>
  );
}