import { useEffect, type ReactNode } from "react";
import { ExternalLink } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";

type GuideHeadProps = {
  title: string;
  description: string;
  canonical: string;
};

export function GuideDocumentHead({ title, description, canonical }: GuideHeadProps) {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    const tags = [
      { selector: 'meta[name="description"]', attribute: "name", key: "description", content: description },
      { selector: 'meta[property="og:title"]', attribute: "property", key: "og:title", content: title },
      { selector: 'meta[property="og:description"]', attribute: "property", key: "og:description", content: description },
      { selector: 'meta[property="og:url"]', attribute: "property", key: "og:url", content: canonical },
      { selector: 'meta[name="twitter:title"]', attribute: "name", key: "twitter:title", content: title },
      { selector: 'meta[name="twitter:description"]', attribute: "name", key: "twitter:description", content: description },
    ];

    const changes = tags.map(({ selector, attribute, key, content }) => {
      let element = document.head.querySelector<HTMLMetaElement>(selector);
      const created = !element;
      const previousContent = element?.content;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
      }
      element.content = content;
      return { element, created, previousContent };
    });

    let canonicalElement = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const canonicalCreated = !canonicalElement;
    const previousCanonical = canonicalElement?.href;
    if (!canonicalElement) {
      canonicalElement = document.createElement("link");
      canonicalElement.rel = "canonical";
      document.head.appendChild(canonicalElement);
    }
    canonicalElement.href = canonical;

    return () => {
      document.title = previousTitle;
      changes.forEach(({ element, created, previousContent }) => {
        if (created) element.remove();
        else element.content = previousContent ?? "";
      });
      if (canonicalCreated) canonicalElement.remove();
      else canonicalElement.href = previousCanonical ?? "";
    };
  }, [canonical, description, title]);

  return null;
}

export function SundanceHeader() {
  return <Navbar />;
}

export function SundanceFooter() {
  return (
    <footer className="border-t border-slate-900/10 bg-slate-950 text-slate-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-6">
        <div className="space-y-2">
          <p>Brought to you by Sanitas View and 12Acre — an independent festival kit for Sundance Boulder week (your personal dossier for maps, plans, and tips). Not affiliated with Sundance Institute.</p>
          <p className="text-xs text-slate-500">
            Homes also available for purchase —{" "}
            <a
              href="https://www.sanitasview.com"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-slate-600 underline-offset-4 transition-colors hover:text-slate-300"
            >
              sanitasview.com <ExternalLink className="ml-1 inline h-3.5 w-3.5" />
            </a>
          </p>
          <p className="text-xs text-slate-500">External links open in a new tab—come back here to keep using your festival kit.</p>
        </div>
        <a href="https://www.sundance.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
          Official festival info <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    </footer>
  );
}

export function SundanceGuideShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-clip bg-background font-sans text-foreground selection:bg-primary/20">
      <SundanceHeader />

      <main>{children}</main>

      <SundanceFooter />
    </div>
  );
}