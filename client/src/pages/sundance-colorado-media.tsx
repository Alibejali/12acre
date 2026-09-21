import { useEffect, useMemo, useRef, useState, type FormEvent, type MouseEvent } from "react";
import { Building2, Download, ExternalLink, Film, List, Search, Sparkles, Table2, Users, X } from "lucide-react";
import { GuideDocumentHead, SundanceGuideShell } from "@/components/sundance-guide-shell";
import {
  categoryForType,
  listingFromSeed,
  mediaCategories,
  type ColoradoMediaListing,
  type ColoradoMediaSeedRecord,
  type MediaCategory,
} from "@/data/colorado-media-directory";

const title = "Colorado creative media directory | 12Acre";
const description = "Explore festivals, organizations, training, studios, theaters, media companies, and podcasts across Colorado creative media.";
const canonical = "https://12acre.com/sundance/colorado-media";

const paths: { title: string; copy: string; categories: MediaCategory[]; icon: typeof Film }[] = [
  { title: "I’m going to festivals", copy: "Find festivals, screenings, art houses, and independent theaters.", categories: ["Festivals", "Theaters"], icon: Film },
  { title: "I’m making media", copy: "Find film offices, organizations, training, and production resources for film, TV, commercials, web, and influencer work.", categories: ["Orgs / film office", "Training", "Studios"], icon: Sparkles },
  { title: "I work in Colorado media", copy: "Find professional organizations, media companies, research, and podcasts.", categories: ["Orgs / film office", "Media companies", "Podcasts"], icon: Users },
];

function csvCell(value: string) {
  return `"${value.replaceAll('"', '""')}"`;
}

export default function SundanceColoradoMedia() {
  const [listings, setListings] = useState<ColoradoMediaListing[]>([]);
  const [categories, setCategories] = useState<MediaCategory[]>([]);
  const [query, setQuery] = useState("");
  const [ask, setAsk] = useState("");
  const [showUncertain, setShowUncertain] = useState(false);
  const [view, setView] = useState<"cards" | "table">("cards");
  const [selected, setSelected] = useState<ColoradoMediaListing | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/colorado-media-directory")
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "The directory could not load.");
        return data as ColoradoMediaSeedRecord[];
      })
      .then((records) => {
        if (active) setListings(records.map(listingFromSeed));
      })
      .catch((cause) => {
        if (active) setError(cause instanceof Error ? cause.message : "The directory could not load.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    const dialog = dialogRef.current;
    dialog?.querySelector<HTMLElement>("button, a[href]")?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const focusable = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      lastFocusRef.current?.focus();
    };
  }, [selected]);

  const counts = useMemo(
    () => Object.fromEntries(mediaCategories.map((category) => [category, listings.filter((listing) => listing.category === category).length])) as Record<MediaCategory, number>,
    [listings],
  );

  const hasSelection = categories.length > 0 || query.trim().length > 0;
  const results = useMemo(() => {
    if (!hasSelection) return [];
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return listings.filter((listing) => {
      if (!showUncertain && listing.confidence === "UNCERTAIN") return false;
      if (categories.length && !categories.includes(listing.category)) return false;
      const haystack = [listing.name, listing.category, listing.location, listing.description, listing.sourceType ?? "", listing.sheet ?? "", ...listing.keywords].join(" ").toLowerCase();
      return terms.every((term) => haystack.includes(term));
    });
  }, [categories, hasSelection, listings, query, showUncertain]);

  const showResults = () => requestAnimationFrame(() => document.getElementById("directory-results")?.scrollIntoView({ behavior: "smooth" }));
  const usePath = (selectedCategories: MediaCategory[]) => {
    setCategories(selectedCategories);
    setQuery("");
    showResults();
  };
  const toggleCategory = (category: MediaCategory) => {
    setCategories((current) => current.includes(category) ? current.filter((item) => item !== category) : [...current, category]);
  };

  const askDirectory = (event: FormEvent) => {
    event.preventDefault();
    const normalized = ask.toLowerCase();
    let inferred: MediaCategory[] = [];
    if (/(festival|screening|theater|cinema|movie house)/.test(normalized)) inferred = ["Festivals", "Theaters"];
    else if (/(learn|training|class|school|workshop|lab)/.test(normalized)) inferred = ["Training"];
    else if (/(studio|production|make|commercial|web|influencer)/.test(normalized)) inferred = ["Orgs / film office", "Training", "Studios"];
    else if (/(podcast|audio|interview)/.test(normalized)) inferred = ["Podcasts"];
    else if (/(company|companies|work|job|professional|organization|film office|grant|guild)/.test(normalized)) inferred = ["Orgs / film office", "Media companies"];
    setCategories(inferred);
    setQuery(inferred.length ? "" : ask);
    showResults();
  };

  const openDetails = (item: ColoradoMediaListing, event: MouseEvent<HTMLElement>) => {
    lastFocusRef.current = event.currentTarget;
    setSelected(item);
  };

  const downloadCsv = () => {
    const rows = [["Name", "Category", "City", "Notes", "Confidence", "URL"], ...results.map((item) => [item.name, item.category, item.location, item.description, item.confidence, item.url])];
    const blob = new Blob([rows.map((row) => row.map(csvCell).join(",")).join("\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "colorado-creative-media-directory.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const submitListing = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = `Name: ${data.get("name")}\nWebsite: ${data.get("url")}\nCategory: ${data.get("category")}\nNotes: ${data.get("notes")}`;
    window.location.href = `mailto:sundance@12acre.us?subject=${encodeURIComponent("Colorado media listing review")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <SundanceGuideShell>
      <GuideDocumentHead title={title} description={description} canonical={canonical} />
      <section className="bg-slate-900 pt-20 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Colorado creative media</p>
          <h1 className="mt-4 max-w-4xl text-5xl font-bold !text-white md:text-7xl">Start with what you’re here to do.</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/70">A practical public-source directory for film, TV, commercials, web, influencer work, festivals, training, and media communities across Colorado.</p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {paths.map((path) => {
              const Icon = path.icon;
              return <button key={path.title} type="button" onClick={() => usePath(path.categories)} className="rounded-3xl border border-white/15 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:bg-white/10"><Icon className="h-7 w-7 text-amber-300" /><h2 className="mt-6 text-2xl font-semibold !text-white">{path.title}</h2><p className="mt-3 text-sm leading-6 text-white/65">{path.copy}</p></button>;
            })}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-16">
        <form onSubmit={askDirectory} className="rounded-3xl bg-[#e9eee9] p-6 md:p-8">
          <label htmlFor="media-ask" className="text-sm font-semibold uppercase tracking-widest text-slate-600">Ask the directory</label>
          <p className="mt-2 text-slate-600">Try “Where can I learn production?” or “Show festivals and theaters.”</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <input id="media-ask" value={ask} onChange={(event) => setAsk(event.target.value)} placeholder="What are you looking for?" className="min-w-0 flex-1 rounded-full border border-slate-300 bg-white px-5 py-3" />
            <button type="submit" className="rounded-full bg-slate-900 px-6 py-3 font-semibold text-white">Find matches</button>
          </div>
        </form>

        <section id="directory-results" className="scroll-mt-24 pt-12">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div><p className="text-xs font-semibold uppercase tracking-widest text-amber-700">176 public-source listings</p><h2 className="mt-2 text-3xl font-semibold">Explore Colorado creative media</h2></div>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setView("cards")} className={`rounded-full px-4 py-2 text-sm font-semibold ${view === "cards" ? "bg-slate-900 text-white" : "border border-slate-300"}`}><List className="mr-1 inline h-4 w-4" />Cards</button>
              <button type="button" onClick={() => setView("table")} className={`rounded-full px-4 py-2 text-sm font-semibold ${view === "table" ? "bg-slate-900 text-white" : "border border-slate-300"}`}><Table2 className="mr-1 inline h-4 w-4" />Table</button>
              <button type="button" disabled={!results.length} onClick={downloadCsv} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold disabled:opacity-40"><Download className="mr-1 inline h-4 w-4" />Download CSV</button>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="relative max-w-xl"><Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search names, cities, notes, and keywords" className="w-full rounded-full border border-slate-300 bg-white py-3 pl-12 pr-5" /></div>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {mediaCategories.map((category) => <button key={category} type="button" onClick={() => toggleCategory(category)} className={`flex items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium ${categories.includes(category) ? "bg-slate-900 text-white" : "border border-slate-300 bg-white"}`}><span>{category}</span><span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">{counts[category] ?? 0}</span></button>)}
            </div>
            <label className="flex w-fit items-center gap-2 text-sm text-slate-600"><input type="checkbox" checked={showUncertain} onChange={(event) => setShowUncertain(event.target.checked)} />Show uncertain records</label>
          </div>

          {loading && <p className="mt-8 text-slate-500">Loading the directory…</p>}
          {error && <p className="mt-8 rounded-2xl bg-red-50 p-4 text-red-800">{error}</p>}
          {!loading && !error && !hasSelection && <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center"><h3 className="text-xl font-semibold">Choose a category to begin</h3><p className="mt-2 text-slate-600">Counts show every listing in the seed. You can also search by name, city, or notes.</p></div>}
          {hasSelection && <p className="mt-6 text-sm text-slate-500">{results.length} result{results.length === 1 ? "" : "s"}</p>}

          {hasSelection && view === "cards" && (
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {results.map((item) => <article key={`${item.name}-${item.sourceType}`} className="flex flex-col rounded-2xl border border-slate-900/10 bg-white p-6"><div className="flex items-start justify-between gap-3"><span className="rounded-full bg-[#e9eee9] px-3 py-1 text-xs font-semibold">{item.category}</span><span className="text-xs text-slate-400">{item.location}</span></div><h3 className="mt-5 text-xl font-semibold">{item.name}</h3><p className="mt-3 line-clamp-4 text-sm leading-6 text-slate-600">{item.description}</p><button type="button" onClick={(event) => openDetails(item, event)} className="mt-auto pt-5 text-left font-semibold underline underline-offset-4">View details</button></article>)}
            </div>
          )}
          {hasSelection && view === "table" && (
            <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white"><table className="min-w-full text-left text-sm"><thead className="bg-slate-100"><tr><th className="p-4">Name</th><th className="p-4">Category</th><th className="p-4">City</th><th className="p-4">Details</th></tr></thead><tbody>{results.map((item) => <tr key={`${item.name}-${item.sourceType}`} className="border-t"><td className="p-4 font-semibold">{item.name}</td><td className="p-4">{item.category}</td><td className="p-4">{item.location}</td><td className="p-4"><button type="button" onClick={(event) => openDetails(item, event)} className="font-semibold underline underline-offset-4">View</button></td></tr>)}</tbody></table></div>
          )}
        </section>

        <section className="mt-16 rounded-3xl bg-slate-950 p-7 text-white md:p-9">
          <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
            <div><Building2 className="h-7 w-7 text-amber-300" /><h2 className="mt-5 text-3xl font-semibold !text-white">Add your listing</h2><p className="mt-3 leading-7 text-white/65">Send a public listing for review. Submissions are checked before anything is added; nothing auto-publishes.</p></div>
            <form onSubmit={submitListing} className="grid gap-3 sm:grid-cols-2">
              <input name="name" required placeholder="Organization or project name" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/45" />
              <input name="url" required type="url" placeholder="Public website URL" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/45" />
              <select name="category" className="rounded-xl border border-white/20 bg-slate-900 px-4 py-3 text-white">{mediaCategories.map((category) => <option key={category}>{category}</option>)}</select>
              <input name="notes" placeholder="Why it belongs / location" className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/45" />
              <button type="submit" className="rounded-full bg-white px-5 py-3 font-semibold text-slate-950 sm:col-span-2">Submit for review</button>
            </form>
          </div>
        </section>
        <p className="mt-8 text-sm leading-6 text-slate-500">Independent directory based on public web sources. Listings are informational, not endorsements. External links open in a new tab.</p>
      </main>

      {selected && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/70 p-4" role="dialog" aria-modal="true" aria-labelledby="media-detail-title" onClick={() => setSelected(null)}>
          <article ref={dialogRef} className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl md:p-8" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-semibold uppercase tracking-widest text-amber-700">{selected.category} · {selected.location}</p><h2 id="media-detail-title" className="mt-3 text-3xl font-semibold">{selected.name}</h2></div><button type="button" aria-label="Close details" onClick={() => setSelected(null)} className="rounded-full border border-slate-200 p-2"><X className="h-5 w-5" /></button></div>
            <p className="mt-6 leading-7 text-slate-600">{selected.description}</p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-500"><span className="rounded-full bg-slate-100 px-3 py-1">Source type: {selected.sourceType?.replaceAll("_", " ")}</span><span className="rounded-full bg-slate-100 px-3 py-1">Confidence: {selected.confidence}</span></div>
            {selected.url ? <a href={selected.url} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-3 font-semibold text-white">Visit website <ExternalLink className="h-4 w-4" /></a> : <p className="mt-7 text-sm text-slate-500">No public website is listed for this record.</p>}
          </article>
        </div>
      )}
    </SundanceGuideShell>
  );
}