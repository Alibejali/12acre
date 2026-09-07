import { useEffect, useRef, useState } from "react";
import { CircleHelp, X } from "lucide-react";

export function GuideHelp({ children, dark = false, label }: { children: string; dark?: boolean; label: string }) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const closeOnOutside = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative mt-2 w-fit">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
          dark ? "border-white/20 text-white/65 hover:bg-white/10 hover:text-white" : "border-slate-300 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        }`}
      >
        <CircleHelp className="h-5 w-5" />
      </button>
      {open && (
        <div
          role="dialog"
          aria-label={label}
          className={`absolute left-0 top-full z-30 mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-xl border p-4 text-sm leading-6 shadow-xl ${
          dark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-900"
          } ${dark ? "border-white/15 bg-slate-900 text-white/80" : "border-slate-200 bg-white text-slate-600"}`}
        >
          <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full hover:bg-black/10">
            <X className="h-4 w-4" />
          </button>
          <p className="pr-8">{children}</p>
          <button type="button" onClick={() => setOpen(false)} className={`mt-3 min-h-11 rounded-full px-4 text-sm font-semibold ${dark ? "bg-white text-slate-950" : "bg-slate-900 text-white"}`}>
            Close
          </button>
        </div>
      )}
    </div>
  );
}