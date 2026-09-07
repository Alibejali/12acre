import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "wouter";

export type GuideBase = { id: string; label: string; address: string };
export type MapsProvider = "google" | "apple";

export const SANITAS_BASE: GuideBase = {
  id: "sanitas-view",
  label: "Sanitas View",
  address: "3303–3339 Broadway, Newlands, Boulder",
};

export const OFFICIAL_BASES: GuideBase[] = [
  "Boulder Theater", "eTown Hall", "Canyon Theater (Boulder Public Library)",
  "Hotel Boulderado", "Casey Middle School Auditorium", "Macky Auditorium Concert Hall",
  "Muenzinger Auditorium", "Roe Green Theatre", "Chautauqua Auditorium",
  "Boedecker Theater — Dairy Arts Center", "Gordon Gamm Theater — Dairy Arts Center",
  "Cinemark Century Boulder", "Boulder High School Auditorium",
].map((label) => ({
  id: label.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  label,
  address: `${label}, Boulder, CO`,
}));

type Preferences = {
  base: GuideBase;
  provider: MapsProvider;
  setProvider: (provider: MapsProvider) => void;
  openBaseEditor: () => void;
  directionsUrl: (destination: string) => string;
};

const PreferencesContext = createContext<Preferences | null>(null);

export function GuidePreferencesProvider({ children }: { children: ReactNode }) {
  const [base, setBase] = useState<GuideBase>(SANITAS_BASE);
  const [provider, setProviderState] = useState<MapsProvider>("google");
  const [editing, setEditing] = useState(false);
  const [choice, setChoice] = useState("sanitas-view");
  const [customLabel, setCustomLabel] = useState("");
  const [customAddress, setCustomAddress] = useState("");

  useEffect(() => {
    try {
      const savedBase = localStorage.getItem("sundanceGuide.base");
      const savedProvider = localStorage.getItem("sundanceGuide.mapsProvider");
      if (savedBase) setBase(JSON.parse(savedBase));
      if (savedProvider === "google" || savedProvider === "apple") setProviderState(savedProvider);
    } catch {
      localStorage.removeItem("sundanceGuide.base");
    }
  }, []);

  const setProvider = (next: MapsProvider) => {
    setProviderState(next);
    localStorage.setItem("sundanceGuide.mapsProvider", next);
  };

  const saveBase = () => {
    let next = SANITAS_BASE;
    if (choice === "custom") {
      if (!customLabel.trim() || !customAddress.trim()) return;
      next = { id: "custom", label: customLabel.trim(), address: customAddress.trim() };
    } else {
      next = [SANITAS_BASE, ...OFFICIAL_BASES].find((item) => item.id === choice) ?? SANITAS_BASE;
    }
    setBase(next);
    localStorage.setItem("sundanceGuide.base", JSON.stringify(next));
    setEditing(false);
  };

  const directionsUrl = (destination: string) => {
    const origin = encodeURIComponent(base.address);
    const target = encodeURIComponent(destination);
    return provider === "apple"
      ? `https://maps.apple.com/?saddr=${origin}&daddr=${target}`
      : `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${target}`;
  };

  const value = useMemo(() => ({ base, provider, setProvider, openBaseEditor: () => setEditing(true), directionsUrl }), [base, provider]);

  return (
    <PreferencesContext.Provider value={value}>
      {children}
      {editing && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="base-editor-title">
          <div className="w-full max-w-lg rounded-lg border border-white/15 bg-slate-900 p-6 text-white shadow-2xl">
            <h2 id="base-editor-title" className="text-2xl font-bold text-white">Choose your base</h2>
            <p className="mt-2 text-sm text-white/65">Directions will start from this location on this device.</p>
            <label className="mt-6 block text-sm font-medium" htmlFor="base-choice">Location</label>
            <select id="base-choice" value={choice} onChange={(event) => setChoice(event.target.value)}
              className="mt-2 w-full rounded-md border border-white/20 bg-slate-800 px-3 py-3 text-white">
              <option value={SANITAS_BASE.id}>Sanitas View</option>
              <optgroup label="Official venues">
                {OFFICIAL_BASES.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
              </optgroup>
              <option value="custom">Custom location…</option>
            </select>
            {choice === "custom" && (
              <div className="mt-4 grid gap-3">
                <input aria-label="Custom base name" value={customLabel} onChange={(event) => setCustomLabel(event.target.value)}
                  placeholder="Base name" className="rounded-md border border-white/20 bg-slate-800 px-3 py-3 text-white placeholder:text-white/40" />
                <input aria-label="Custom base address" value={customAddress} onChange={(event) => setCustomAddress(event.target.value)}
                  placeholder="Street address, city" className="rounded-md border border-white/20 bg-slate-800 px-3 py-3 text-white placeholder:text-white/40" />
              </div>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" onClick={() => setEditing(false)} className="rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium">Cancel</button>
              <button type="button" onClick={saveBase} className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-primary">Save base</button>
            </div>
          </div>
        </div>
      )}
    </PreferencesContext.Provider>
  );
}

export function useGuidePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error("useGuidePreferences must be used inside GuidePreferencesProvider");
  return context;
}

export function MapsProviderControl() {
  const { provider, setProvider } = useGuidePreferences();
  return (
    <div className="flex flex-wrap items-center gap-2 text-sm">
      <span className="text-white/60">Directions with:</span>
      {(["google", "apple"] as MapsProvider[]).map((item) => (
        <button type="button" key={item} onClick={() => setProvider(item)}
          className={`rounded-full px-3 py-1.5 font-medium capitalize ${provider === item ? "bg-white text-primary" : "border border-white/25 text-white hover:bg-white/10"}`}>
          {item} Maps
        </button>
      ))}
    </div>
  );
}

export function YourBaseStrip({ showProvider = false }: { showProvider?: boolean }) {
  const { base, openBaseEditor } = useGuidePreferences();
  const isSanitas = base.id === SANITAS_BASE.id;
  return (
    <div className="rounded-lg border border-white/15 bg-slate-900 p-6 text-white shadow-xl">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-white/55">Your base · Saved on this device</p>
          <h2 className="mt-2 text-2xl font-bold text-white">{base.label}</h2>
          <p className="mt-1 text-white/65">{base.address}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" onClick={openBaseEditor} className="rounded-full border border-white/35 px-4 py-2 text-sm font-medium hover:bg-white/10">
            {isSanitas ? "Set as my base" : "Change base"}
          </button>
          <Link href="/sundance" className="rounded-full bg-white px-5 py-2.5 text-sm font-medium text-primary hover:bg-white/90">
            {isSanitas ? "Inquire" : "Prefer a private compound?"}
          </Link>
        </div>
      </div>
      {showProvider && <div className="mt-5 border-t border-white/15 pt-5"><MapsProviderControl /></div>}
    </div>
  );
}