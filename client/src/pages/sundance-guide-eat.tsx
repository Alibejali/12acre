import { ExternalLink, MapPin, Utensils } from "lucide-react";
import { GuideDocumentHead, SundanceGuideShell } from "@/components/sundance-guide-shell";
import { useGuidePreferences } from "@/components/sundance-guide-preferences";
import { readPlanner, savePlanner } from "@/components/sundance-planner-data";

const places = [
  { name: "The Kitchen American Bistro", area: "Pearl / Downtown", note: "American bistro on Pearl Street; a central option between downtown venues.", address: "1039 Pearl Street, Boulder, CO", url: "https://thekitchenbistros.com/" },
  { name: "Dushanbe Teahouse", area: "Pearl / Downtown", note: "A distinctive downtown tea house beside Boulder Creek.", address: "1770 13th Street, Boulder, CO", url: "https://www.boulderteahouse.com/" },
  { name: "Snooze, an A.M. Eatery", area: "Pearl / Downtown", note: "Breakfast and brunch on Pearl Street; check current hours before heading over.", address: "1617 Pearl Street, Boulder, CO", url: "https://snoozeeatery.com/locations/boulder/" },
  { name: "The Corner", area: "Near CU", note: "A campus-adjacent restaurant and bar on University Hill.", address: "1325 Broadway, Boulder, CO", url: "https://www.thecornerboulder.com/" },
  { name: "Chautauqua Dining Hall", area: "Chautauqua", note: "A dining room at the base of Chautauqua Park, useful when your day already points south.", address: "900 Baseline Road, Boulder, CO", url: "https://www.chautauqua.com/dining/" },
  { name: "Moe's Broadway Bagel", area: "North / Casey fringe", note: "A long-running Boulder bagel shop on Broadway for a straightforward stop north of downtown.", address: "2650 Broadway, Boulder, CO", url: "https://www.moesbroadwaybagel.com/" },
  { name: "Blackbelly", area: "East / Dairy", note: "A restaurant, butcher shop, and bakery in east Boulder.", address: "1606 Conestoga Street, Boulder, CO", url: "https://www.blackbelly.com/" },
  { name: "Dry Storage", area: "East / Dairy", note: "A bakery and coffee stop in the east-side food and arts district.", address: "3601 Arapahoe Avenue, Boulder, CO", url: "https://www.drystorageboulder.com/" },
  { name: "The Rayback Collective", area: "Broadway / Newlands", note: "A food-truck collective and gathering space north of central Boulder.", address: "2775 Valmont Road, Boulder, CO", url: "https://www.raybackcollective.com/" },
];

const title = "Where to Eat During Sundance Boulder 2027 | 12Acre Guide";
const description = "Neighborhood pocket eateries near Sundance Boulder venues — between screenings, group-friendly, quiet notes. Independent local companion.";
const canonical = "https://12acre.com/sundance/guide/eat";

export default function SundanceGuideEat() {
  const { directionsUrl, provider } = useGuidePreferences();

  const addMeal = (place: (typeof places)[number]) => {
    savePlanner([
      ...readPlanner(),
      {
        id: `meal-${place.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now()}`,
        name: place.name,
        address: place.address,
        kind: "meal",
      },
    ]);
  };

  return (
    <SundanceGuideShell>
      <GuideDocumentHead title={title} description={description} canonical={canonical} />
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">A short local list</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight !text-white md:text-6xl">Eat somewhere that feels like Boulder.</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">A few useful anchors, organized by where your day is already taking you. Verify current hours and reservations directly.</p>
        </div>
      </section>
      <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <div className="mb-10 flex items-center gap-3 rounded-2xl bg-[#e9eee9] p-5 text-sm leading-6 text-slate-700">
          <Utensils className="h-5 w-5 shrink-0 text-amber-700" />
          This is editorial, not a ranking. We do not publish invented ratings, prices, hours, or festival schedules.
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {places.map((place) => (
            <article key={place.name} className="rounded-3xl border border-slate-900/10 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">{place.area}</p>
              <h2 className="mt-3 text-2xl font-semibold">{place.name}</h2>
              <p className="mt-3 leading-7 text-slate-600">{place.note}</p>
              <p className="mt-4 text-sm text-slate-500">{place.address}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={directionsUrl(place.address)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                  <MapPin className="mr-1 inline h-4 w-4" />Directions · {provider === "apple" ? "Apple" : "Google"} <ExternalLink className="ml-1 inline h-4 w-4" />
                </a>
                <button type="button" onClick={() => addMeal(place)} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">Add meal stop</button>
                <a href={place.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">
                  Check hours <ExternalLink className="ml-1 inline h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 text-sm text-slate-500">Hours and service change. Use each restaurant’s own site for current details before heading out.</p>
      </main>
    </SundanceGuideShell>
  );
}