import { ArrowRight, ExternalLink, Mail, MapPin, Star } from "lucide-react";
import { Link } from "wouter";
import { GuideDocumentHead, SundanceGuideShell } from "@/components/sundance-guide-shell";
import { GuideHelp } from "@/components/sundance-guide-help";
import { useGuidePreferences, YourBaseStrip } from "@/components/sundance-guide-preferences";

const title = "Lodging for Sundance Boulder 2027 | Sanitas View & Other Stays | 12Acre";
const description = "Festival-week lodging in Boulder — Sanitas View private compound as Featured base, plus other stays. Independent companion; sponsorships coming.";
const canonical = "https://12acre.com/sundance/guide/lodging";

const otherSearches = [
  { name: "Airbnb Boulder search", query: "Airbnb Boulder Colorado", url: "https://www.airbnb.com/s/Boulder--Colorado--United-States/homes" },
  { name: "Vrbo Boulder search", query: "Vrbo Boulder Colorado", url: "https://www.vrbo.com/search?destination=Boulder%2C%20Colorado" },
  { name: "Downtown Boulder lodging search", query: "lodging downtown Boulder Colorado", url: "https://www.google.com/search?q=lodging+downtown+Boulder+Colorado" },
];

export default function SundanceGuideLodging() {
  const { directionsUrl, provider } = useGuidePreferences();
  const mapLabel = provider === "apple" ? "Apple" : "Google";
  return (
    <SundanceGuideShell>
      <GuideDocumentHead title={title} description={description} canonical={canonical} />
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Independent lodging companion</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold !text-white md:text-7xl">Where to stay for festival week.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">Start with the operating base your group needs, then verify availability, policies, and current details directly.</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <YourBaseStrip showProvider />

        <article className="mt-10 overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl">
          <div className="grid md:grid-cols-[1.2fr_0.8fr]">
            <div className="p-7 md:p-10">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-300 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-950"><Star className="h-3.5 w-3.5" />Featured</span>
                <span className="rounded-full border border-white/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white/75">Your Base</span>
              </div>
              <h2 className="mt-6 text-4xl font-semibold !text-white">Sanitas View</h2>
              <p className="mt-3 max-w-2xl text-lg leading-8 text-white/70">Eleven contiguous, approximately 3,000-square-foot townhomes on Broadway in Newlands—available as one residence, an adjacent sub-block, or a full team campus.</p>
              <p className="mt-4 text-sm text-white/60">3303–3339 Broadway, Boulder · No rate claims are published here.</p>
              <GuideHelp dark label="About Featured lodging">Sanitas View is our Featured private compound for teams. Other stays and sponsored listings appear below—Inquire keeps you on the festival rental path.</GuideHelp>
              <div className="mt-7 flex flex-wrap gap-3">
                <a href="/sundance#sundance-contact" className="rounded-full bg-white px-5 py-3 font-semibold text-primary">Inquire</a>
                <Link href="/sundance" className="rounded-full border border-white/30 px-5 py-3 font-semibold text-white">See the lodging story <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
                <a href={directionsUrl("Sanitas View 3303 Broadway Boulder Colorado")} target="_blank" rel="noopener noreferrer" className="rounded-full border border-white/30 px-5 py-3 font-semibold text-white"><MapPin className="mr-1 inline h-4 w-4" />Directions · {mapLabel} <ExternalLink className="ml-1 inline h-4 w-4" /></a>
              </div>
            </div>
            <div className="min-h-64 bg-[url('/logo-light.png')] bg-center bg-no-repeat opacity-20" aria-hidden="true" />
          </div>
        </article>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          <article className="rounded-3xl bg-[#e9eee9] p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Official information</p>
            <h2 className="mt-4 text-2xl font-semibold">Check Sundance directly.</h2>
            <p className="mt-3 leading-7 text-slate-600">Use Sundance’s public site for official festival information and any lodging resources it publishes. This companion does not mirror festival inventory.</p>
            <a href="https://www.sundance.org/" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 font-semibold underline underline-offset-4">Open sundance.org <ExternalLink className="h-4 w-4" /></a>
          </article>
          <article className="rounded-3xl border border-dashed border-slate-400 bg-white p-7">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Sponsored stays</p>
            <h2 className="mt-4 text-2xl font-semibold">Listings are coming.</h2>
            <p className="mt-3 leading-7 text-slate-600">Future paid placements will be clearly labeled Sponsored. No sponsor inventory or checkout is live in this Phase-1 guide.</p>
            <a href="mailto:sundance@12acre.us?subject=Sundance%20guide%20sponsorship" className="mt-5 inline-flex items-center gap-2 font-semibold underline underline-offset-4"><Mail className="h-4 w-4" />Advertise a stay</a>
          </article>
        </section>

        <section className="mt-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">Other ways to search</p>
          <h2 className="mt-3 text-3xl font-semibold">Compare current options directly.</h2>
          <p className="mt-3 max-w-2xl text-slate-600">These are search links, not endorsements or live inventory. Confirm rates, fees, location, cancellation terms, and availability with the provider.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {otherSearches.map((item) => (
              <article key={item.name} className="rounded-2xl border border-slate-900/10 bg-white p-5">
                <h3 className="font-semibold">{item.name}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={item.url} target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">Open search <ExternalLink className="ml-1 inline h-4 w-4" /></a>
                  <a href={directionsUrl(item.query)} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold"><MapPin className="mr-1 inline h-4 w-4" />Maps <ExternalLink className="ml-1 inline h-4 w-4" /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <p className="mt-12 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">Independent companion; not official Sundance media. Featured and future Sponsored labels describe placement on this guide, not festival affiliation. Verify all lodging details directly.</p>
      </main>
    </SundanceGuideShell>
  );
}