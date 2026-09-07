import { CircleHelp } from "lucide-react";

export function GuideHelp({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <details className="group relative mt-2 w-fit">
      <summary
        aria-label="More information"
        className={`inline-flex cursor-pointer list-none items-center gap-1.5 text-xs font-medium [&::-webkit-details-marker]:hidden ${
          dark ? "text-white/60 hover:text-white" : "text-slate-500 hover:text-slate-900"
        }`}
      >
        <CircleHelp className="h-4 w-4" />
        <span>How this works</span>
      </summary>
      <div
        className={`absolute left-0 top-full z-20 mt-2 w-72 rounded-xl border p-3 text-xs leading-5 shadow-lg ${
          dark
            ? "border-white/15 bg-slate-900 text-white/75"
            : "border-slate-200 bg-white text-slate-600"
        }`}
      >
        {children}
      </div>
    </details>
  );
}