import { useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";

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

export function SundanceGuideShell({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const navClass = (href: string) =>
    `rounded-full px-3 py-2 text-sm font-medium transition-colors ${
      location === href ? "bg-white text-primary" : "text-white/70 hover:bg-white/10 hover:text-white"
    }`;

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground selection:bg-primary/20">
      <header className="sticky top-0 z-50 border-b border-white/15 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 md:px-6">
          <Link href="/sundance/guide" aria-label="12Acre Sundance guide" className="shrink-0">
            <img src="/logo-light.png" alt="12Acre" className="h-10 w-10 object-contain" />
          </Link>
          <nav aria-label="Sundance guide" className="flex flex-wrap items-center justify-end gap-1">
            <Link href="/sundance/guide" className={navClass("/sundance/guide")}>Overview</Link>
            <Link href="/sundance/guide/map" className={navClass("/sundance/guide/map")}>Map</Link>
            <Link href="/sundance/guide/plan" className={navClass("/sundance/guide/plan")}>Plan</Link>
            <Link href="/sundance/guide/ask" aria-label="Ask the guide" className={navClass("/sundance/guide/ask")}>Ask</Link>
            <Link href="/sundance/guide/eat" className={navClass("/sundance/guide/eat")}>Eat</Link>
            <Link href="/sundance/guide/shop" className={navClass("/sundance/guide/shop")}>Shop</Link>
            <Link href="/sundance/guide/family" className={navClass("/sundance/guide/family")}>Family</Link>
            <Link href="/sundance/guide/transit" className={navClass("/sundance/guide/transit")}>Transit</Link>
            <Link href="/sundance" className="ml-1 rounded-full bg-white px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-white/90">
              Stay with us
            </Link>
          </nav>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-slate-900/10 bg-slate-950 text-slate-300">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-6">
          <p>Independent Boulder companion by 12Acre / Sanitas View — not affiliated with Sundance Institute.</p>
          <a href="https://www.sundance.org/" target="_blank" rel="noreferrer" className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white">
            Official festival info
          </a>
        </div>
      </footer>
    </div>
  );
}