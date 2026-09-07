const routeMetadata: Record<string, { title: string; description: string; canonical: string }> = {
  "/sundance": {
    title: "Sundance Boulder Lodging 2027 | Sanitas View Townhomes | 12Acre",
    description: "Private luxury townhome compound on Broadway in Boulder for Sundance Film Festival week, January 21–31, 2027. Eleven contiguous residences for teams and creatives. Inquire via 12Acre.",
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