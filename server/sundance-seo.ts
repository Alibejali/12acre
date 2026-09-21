const routeMetadata: Record<string, { title: string; description: string; canonical: string }> = {
  "/sundance": {
    title: "Sundance Boulder 2027 Lodging | Sanitas View Basecamp | 12Acre",
    description: "Base festival week in Boulder at Sanitas View — 11 contiguous townhomes on Broadway for teams and entourages, Jan 21–31, 2027. Independent lodging + companion guide.",
    canonical: "https://12acre.com/sundance",
  },
  "/sundance/guide": {
    title: "Sundance Boulder 2027 Guide | Venues, Map & Stay | 12Acre",
    description: "Independent companion for Sundance Film Festival week in Boulder (Jan 21–31, 2027): venue map, neighborhood pockets, and Sanitas View lodging on Broadway. Link-outs to official festival info — not a scraped schedule.",
    canonical: "https://12acre.com/sundance/guide",
  },
  "/sundance/guide/map": {
    title: "Sundance Boulder Venues & Map 2027 | 12Acre Guide",
    description: "Official Sundance Boulder screening venues by neighborhood pocket, plus Around the fest filter for Front Range companion showings. Base: Sanitas View, 3303–3339 Broadway.",
    canonical: "https://12acre.com/sundance/guide/map",
  },
  "/sundance/guide/plan": {
    title: "Itinerary | Sundance Boulder planner and guide | 12Acre",
    description: "Plan festival days across Boulder with ordered stops, leave-by estimates, directions, and Ask-the-guide help. Independent companion; enter your own ticket times.",
    canonical: "https://12acre.com/sundance/guide/plan",
  },
  "/sundance/guide/ask": {
    title: "Ask the Sundance Boulder Guide | Film & Venue Concierge | 12Acre",
    description: "Ask about films, venues, and festival-week tips for Sundance Boulder 2027. Live link-outs to Sundance, FilmFreeway, and IMDb — independent companion, not affiliated with Sundance Institute.",
    canonical: "https://12acre.com/sundance/guide/ask",
  },
  "/sundance/guide/shop": {
    title: "Shop & Errands During Sundance Boulder 2027 | 12Acre Guide",
    description: "Pearl Street shopping, pharmacy and grocery near Broadway, and January layers for Sundance Boulder week. Independent local companion.",
    canonical: "https://12acre.com/sundance/guide/shop",
  },
  "/sundance/guide/family": {
    title: "Family & Kids at Sundance Boulder 2027 | 12Acre Guide",
    description: "Honest guidance for families during Sundance Boulder week — not a kids festival — plus soft landings, partner sitters later, and townhome hospitality. Independent companion.",
    canonical: "https://12acre.com/sundance/guide/family",
  },
  "/sundance/guide/lodging": {
    title: "Lodging for Sundance Boulder 2027 | Sanitas View & Other Stays | 12Acre",
    description: "Festival-week lodging in Boulder — Sanitas View private compound as Featured base, plus other stays. Independent companion; sponsorships coming.",
    canonical: "https://12acre.com/sundance/guide/lodging",
  },
  "/sundance/colorado-media": {
    title: "Colorado creative media directory | 12Acre",
    description: "Explore festivals, organizations, training, studios, theaters, media companies, and podcasts across Colorado creative media.",
    canonical: "https://12acre.com/sundance/colorado-media",
  },
  "/sundance/guide/eat": {
    title: "Where to Eat During Sundance Boulder 2027 | 12Acre Guide",
    description: "Neighborhood pocket eateries near Sundance Boulder venues — between screenings, group-friendly, quiet notes. Independent local companion.",
    canonical: "https://12acre.com/sundance/guide/eat",
  },
  "/sundance/guide/transit": {
    title: "Getting Around Sundance Boulder 2027 | Walk, RTD, Parking | 12Acre",
    description: "Walk-first festival footprint, RTD tips, parking/rideshare notes from Broadway Newlands. Independent companion — not official Sundance transit.",
    canonical: "https://12acre.com/sundance/guide/transit",
  },
};

export function applySundanceSeo(html: string, requestUrl: string): string {
  const metadata = routeMetadata[requestUrl.split("?")[0]];
  if (!metadata) {
    return html;
  }
  const { title, description, canonical } = metadata;

  let page = html
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/>/,
      `<meta property="og:title" content="${title}" />`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/>/,
      `<meta property="og:description" content="${description}" />`,
    )
    .replace(
      /<meta name="twitter:title" content="[^"]*"\s*\/>/,
      `<meta name="twitter:title" content="${title}" />`,
    )
    .replace(
      /<meta name="twitter:description" content="[^"]*"\s*\/>/,
      `<meta name="twitter:description" content="${description}" />`,
    );

  const routeHead = `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta property="og:url" content="${canonical}" />
    <link rel="canonical" href="${canonical}" />`;

  return page.replace("</head>", `${routeHead}\n  </head>`);
}