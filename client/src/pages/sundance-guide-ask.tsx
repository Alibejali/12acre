import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, ExternalLink, Loader2, MapPin, MessageCircleQuestion, Plus } from "lucide-react";
import { Link, useLocation } from "wouter";
import { GuideDocumentHead, SundanceGuideShell } from "@/components/sundance-guide-shell";
import { GuideHelp } from "@/components/sundance-guide-help";
import { useGuidePreferences, YourBaseStrip } from "@/components/sundance-guide-preferences";
import { readPlanner, savePlanner } from "@/components/sundance-planner-data";

const title = "Ask the Sundance Boulder Guide | Film & Venue Concierge | 12Acre";
const description = "Ask about films, venues, and festival-week tips for Sundance Boulder 2027. Live link-outs to Sundance, FilmFreeway, and IMDb — independent companion, not affiliated with Sundance Institute.";
const canonical = "https://12acre.com/sundance/guide/ask";
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

export default function SundanceGuideAsk() {
  const { base, directionsUrl, provider } = useGuidePreferences();
  const [, setLocation] = useLocation();
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
    setLocation("/sundance/guide/plan");
  };

  return (
    <SundanceGuideShell>
      <GuideDocumentHead title={title} description={description} canonical={canonical} />
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300">Independent concierge</p>
          <h1 className="mt-4 text-5xl font-bold !text-white md:text-7xl">Ask the guide</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/70">Independent concierge for festival week—we point you to official sources; we don’t republish the Institute catalog.</p>
          <GuideHelp dark label="About Ask">Ask about lineup timing, venues, or a film title. We answer in plain language and link to official sources. We don’t republish the Institute catalog.</GuideHelp>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">
        <YourBaseStrip showProvider />
        <section className="mx-auto mt-10 max-w-3xl">
          <form onSubmit={ask} className="rounded-3xl border border-slate-900/10 bg-white p-5 shadow-sm">
            <label htmlFor="guide-question" className="text-sm font-semibold">What can I help you find?</label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input id="guide-question" value={question} onChange={(event) => setQuestion(event.target.value)}
                placeholder="What should I know about [film title]?" maxLength={500}
                className="min-w-0 flex-1 rounded-full border border-slate-300 px-5 py-3 outline-none focus:border-slate-700" />
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
              ].map(([label, prompt]) => (
                <button key={label} type="button" onClick={() => setQuestion(prompt)} className="rounded-full border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:border-slate-500">{label}</button>
              ))}
            </div>
          </form>

          {error && <p className="mt-5 rounded-2xl bg-red-50 p-4 text-sm text-red-800">{error}</p>}

          {answer && (
            <article className="mt-6 rounded-3xl bg-[#e9eee9] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-700">{answer.intent} answer</p>
              <p className="mt-4 text-lg leading-8 text-slate-800">{answer.answer}</p>
              {answer.venue && (
                <div className="mt-5 rounded-2xl bg-white p-5">
                  <p className="font-semibold">From your base: {base.label}</p>
                  <p className="mt-1 text-sm text-slate-600">Live conditions vary; verify this route before leaving.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <a href={directionsUrl(answer.venue.address)} target="_blank" rel="noopener noreferrer" className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white">
                      <MapPin className="mr-1 inline h-4 w-4" />Directions · {provider === "apple" ? "Apple" : "Google"} <ExternalLink className="ml-1 inline h-4 w-4" />
                    </a>
                    <button type="button" onClick={addVenue} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold">
                      <Plus className="mr-1 inline h-4 w-4" />Add venue to plan
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-5 flex flex-wrap gap-2">
                {answer.sources.map((source) => source.url.startsWith("/") ? (
                  <Link key={source.url} href={source.url} className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">{source.label} <ArrowRight className="ml-1 inline h-4 w-4" /></Link>
                ) : (
                  <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold">{source.label} <ExternalLink className="ml-1 inline h-4 w-4" /></a>
                ))}
              </div>
              <Link href="/sundance" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">Stay at Sanitas View <ArrowRight className="h-4 w-4" /></Link>
            </article>
          )}

          {history.length > 0 && (
            <section className="mt-10">
              <h2 className="text-2xl font-semibold">Recent questions on this device</h2>
              <div className="mt-4 space-y-2">
                {history.slice(0, 5).map((item, index) => (
                  <button key={`${item.question}-${index}`} type="button" onClick={() => { setQuestion(item.question); setAnswer(item.response); }}
                    className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left hover:border-slate-500">
                    <span className="font-medium">{item.question}</span>
                  </button>
                ))}
              </div>
            </section>
          )}
        </section>

        <p className="mx-auto mt-12 max-w-3xl border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">
          Not affiliated with Sundance Institute. Answers cite public or official links. Verify times on your tickets and at sundance.org.
        </p>
      </main>
    </SundanceGuideShell>
  );
}