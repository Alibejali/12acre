import { ArrowRight, ExternalLink, MapPin } from "lucide-react";
import { Link } from "wouter";
import { GuideDocumentHead, SundanceGuideShell } from "@/components/sundance-guide-shell";
import { useGuidePreferences, YourBaseStrip } from "@/components/sundance-guide-preferences";

const title = "Shop & Errands During Sundance Boulder 2027 | 12Acre Guide";
const description = "Pearl Street shopping, pharmacy and grocery near Broadway, and January layers for Sundance Boulder week. Independent local companion.";
const canonical = "https://12acre.com/sundance/guide/shop";

const shops = [
  { name: "Patagonia Boulder", tag: "Pearl / Outdoor", angle: "Technical layers and outdoor clothing on the Pearl Street corridor.", query: "Patagonia Boulder Colorado", site: "https://www.patagonia.com/stores/co/boulder/1630-pearl-street/store_boulder.html" },
  { name: "Fjällräven Boulder", tag: "Pearl / Outdoor", angle: "Outdoor clothing and packs along downtown’s pedestrian shopping district.", query: "Fjallraven Boulder Colorado", site: "https://www.fjallraven.com/us/en-us/stores/boulder/" },
  { name: "Into The Wind", tag: "Pearl / Gifts", angle: "Kites, toys, and small gifts on Pearl Street Mall.", query: "Into The Wind Boulder", site: "https://intothewind.com/" },
  { name: "Peppercorn", tag: "Pearl / Home", angle: "A long-running downtown stop for kitchen, tabletop, and home goods.", query: "Peppercorn Boulder Colorado", site: "https://peppercorn.com/" },
  { name: "CVS Pharmacy", tag: "Essentials / Central", angle: "A practical central-Boulder option for pharmacy and travel essentials.", query: "CVS Pharmacy 2800 Pearl Street Boulder", site: "https://www.cvs.com/store-locator/cvs-pharmacy-locations/Colorado/Boulder" },
  { name: "Walgreens", tag: "Essentials / North-central", angle: "Pharmacy and basic essentials near the 28th Street corridor.", query: "Walgreens 2870 28th Street Boulder", site: "https://www.walgreens.com/storelocator/find.jsp" },
  { name: "Ideal Market", tag: "Grocery / Near Newlands", angle: "Full-service grocery in the Alpine–Broadway area, close to the Sanitas View side of town.", query: "Ideal Market Boulder Colorado", site: "https://www.wholefoodsmarket.com/stores/idealmarket" },
  { name: "Lucky’s Market", tag: "Grocery / North Broadway", angle: "Neighborhood grocery farther north on Broadway.", query: "Lucky's Market Boulder Colorado", site: "https://www.luckysmarket.com/" },
  { name: "Sprouts Farmers Market", tag: "Grocery / Central", angle: "Produce, prepared foods, and everyday groceries near central Boulder.", query: "Sprouts Farmers Market Boulder Colorado", site: "https://www.sprouts.com/store/co/boulder/boulder/" },
  { name: "Whole Foods Market", tag: "Grocery / Pearl east", angle: "A broad grocery and prepared-food option east of downtown.", query: "Whole Foods Market Pearl Street Boulder", site: "https://www.wholefoodsmarket.com/stores/pearlstreet" },
  { name: "REI Co-op Boulder", tag: "January layers / 28th Street", angle: "Cold-weather layers, traction, and outdoor equipment in central Boulder.", query: "REI Boulder Colorado", site: "https://www.rei.com/stores/boulder" },
  { name: "Neptune Mountaineering", tag: "January layers / South Boulder", angle: "Independent climbing and mountain shop for technical winter gear.", query: "Neptune Mountaineering Boulder", site: "https://www.neptunemountaineering.com/" },
];

export default function SundanceGuideShop() {
  const { directionsUrl, provider } = useGuidePreferences();
  return (
    <SundanceGuideShell>
      <GuideDocumentHead title={title} description={description} canonical={canonical} />
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Useful stops, not a shopping directory</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold !text-white md:text-7xl">Shop, restock, layer up.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">A short local edit for Pearl Street browsing, everyday essentials, groceries near Broadway, and January conditions.</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <YourBaseStrip showProvider />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shops.map((shop) => (
            <article key={shop.name} className="flex min-h-64 flex-col rounded-3xl border border-slate-900/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">{shop.tag}</p>
              <h2 className="mt-4 text-2xl font-semibold">{shop.name}</h2>
              <p className="mt-3 flex-1 leading-7 text-slate-600">{shop.angle}</p>
              <p className="mt-4 text-xs text-slate-500">Check current hours directly before going.</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={directionsUrl(shop.query)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                  <MapPin className="mr-1 inline h-4 w-4" />Directions · {provider === "apple" ? "Apple" : "Google"} <ExternalLink className="ml-1 inline h-4 w-4" />
                </a>
                <a href={shop.site} target="_blank" rel="noopener noreferrer" aria-label={`${shop.name} website`} className="rounded-full border border-slate-300 px-3 py-2 text-sm font-semibold">
                  Site <ExternalLink className="ml-1 inline h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <section className="mt-10 rounded-3xl bg-[#e9eee9] p-7 md:flex md:items-center md:justify-between">
          <div><h2 className="text-2xl font-semibold">Keep the week grounded.</h2><p className="mt-2 text-slate-600">Stay near Broadway, with room to reset between festival days.</p></div>
          <Link href="/sundance" className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-semibold text-white md:mt-0">Stay at Sanitas View <ArrowRight className="h-4 w-4" /></Link>
        </section>
        <p className="mt-8 text-sm text-slate-500">Independent local companion; not affiliated with Sundance Institute. Store availability and hours can change.</p>
      </main>
    </SundanceGuideShell>
  );
}