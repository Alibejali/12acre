import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ExternalLink, Loader2, MapPin, MessageCircleQuestion, Plus } from "lucide-react";
import { Link } from "wouter";
import { GuideHelp } from "@/components/sundance-guide-help";
import { useGuidePreferences } from "@/components/sundance-guide-preferences";
import { readPlanner, savePlanner } from "@/components/sundance-planner-data";

const historyKey = "sundanceGuide.askHistory";
type AskSource = { label: string; url: string };
type AskAnswer = {
  intent: "film" | "venue" | "logistics" | "festival_status" | "other";
  answer: string;
  sources: AskSource[];
  venue?: { name: string; address: string; pocket: string; walk: number; drive: number };
};
type HistoryItem = { question: string; response: AskAnswer };

function readHistory(): HistoryItem[] {
  try {
    const value = localStorage.getItem(historyKey);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

export function SundanceAskPanel() {
  const { base, directionsUrl, provider } = useGuidePreferences();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<AskAnswer | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>(readHistory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(historyKey, JSON.stringify(history.slice(0, 10)));
  }, [history]);

  const ask = async (event?: FormEvent) => {
    event?.preventDefault();
    const prompt = question.trim();
    if (!prompt || loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/sundance-ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: prompt, base: `${base.label}, ${base.address}` }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "The guide could not answer right now.");
      setAnswer(data);
      setHistory((items) => [{ question: prompt, response: data }, ...items].slice(0, 10));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "The guide could not answer right now.");
    } finally {
      setLoading(false);
    }
  };

  const addVenue = () => {
    if (!answer?.venue) return;
    savePlanner([
      ...readPlanner(),
      { id: `ask-${Date.now()}`, name: answer.venue.name, address: answer.venue.address, kind: "venue" },
    ]);
  };

  return (
    <section id="ask-guide" className="scroll-mt-24 border-t border-slate-200 bg-[#e9eee9]">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">Inside Itinerary</p>
        <div className="mt-3 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-4xl font-semibold text-slate-950">Ask the guide</h2>
            <p className="mt-3 max-w-2xl leading-7 text-slate-600">Ask about lineup timing, venues, logistics, or a film title. Answers use public and official links without republishing the Institute catalog.</p>
          </div>
          <GuideHelp label="About Ask">Ask about lineup timing, venues, or a film title. We answer in plain language and link to official sources. We don’t republish the Institute catalog.</GuideHelp>
        </div>

        <div className="mt-8 max-w-3xl">
          <form onSubmit={ask} className="rounded-3xl border border-slate-900/10 bg-white p-5 shadow-sm">
            <label htmlFor="days-guide-question" className="text-sm font-semibold">What can I help you find?</label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input id="days-guide-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="What should I know about [film title]?" maxLength={500} className="min-w-0 flex-1 rounded-full border border-slate-300 px-5 py-3 outline-none focus:border-slate-700" />
              <button type="submit" disabled={!question.trim() || loading} className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 font-semibold text-white disabled:opacity-50">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageCircleQuestion className="h-4 w-4" />} Ask
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {[
                ["Film lookup", "What should I know about "],
                ["Venue walk time", "How far is Chautauqua Auditorium from my base?"],
                ["Between-screening tip", "Where should I eat between screenings?"],
                ["When is the lineup announced?", "When is the lineup announced?"],
                ["Official tickets", "Where do I find official tickets and showtimes?"],
              ].map(([label, prompt]) => <button key={label} type="button" onClick={() => setQuestion(prompt)} className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:border-slate-500">{label}</button>)}
            </div>
          </form>

          {error && <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}
          {answer && (
            <article className="mt-6 rounded-3xl bg-white p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">{answer.intent} answer</p>
              <p className="mt-4 text-lg leading-8 text-slate-800">{answer.answer}</p>
              {answer.venue && <div className="mt-5 rounded-2xl bg-slate-50 p-5"><p className="font-semibold">From your base: {base.label}</p><p className="mt-1 text-sm text-slate-600">Live conditions vary; verify this route before leaving.</p><div className="mt-4 flex flex-wrap gap-2"><a href={directionsUrl(answer.venue.address)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white"><MapPin className="mr-1 inline h-4 w-4" />Directions · {provider === "apple" ? "Apple" : "Google"} <ExternalLink className="ml-1 inline h-4 w-4" /></a><button type="button" onClick={addVenue} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold"><Plus className="mr-1 inline h-4 w-4" />Add venue to Itinerary</button></div></div>}
              <div className="mt-5 flex flex-wrap gap-2">{answer.sources.map((source) => source.url.startsWith("/") ? <Link key={source.url} href={source.url} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">{source.label} <ArrowRight className="ml-1 inline h-4 w-4" /></Link> : <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">{source.label} <ExternalLink className="ml-1 inline h-4 w-4" /></a>)}</div>
            </article>
          )}
          {history.length > 0 && <div className="mt-8"><h3 className="text-xl font-semibold">Recent questions on this device</h3><div className="mt-3 space-y-2">{history.slice(0, 5).map((item, index) => <button key={`${item.question}-${index}`} type="button" onClick={() => { setQuestion(item.question); setAnswer(item.response); }} className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left hover:border-slate-500">{item.question}</button>)}</div></div>}
        </div>
      </div>
    </section>
  );
}