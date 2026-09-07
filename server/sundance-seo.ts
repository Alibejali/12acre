const title = "Sundance Boulder Lodging 2027 | Sanitas View Townhomes | 12Acre";
const description =
  "Private luxury townhome compound on Broadway in Boulder for Sundance Film Festival week, January 21–31, 2027. Eleven contiguous residences for teams and creatives. Inquire via 12Acre.";

export function applySundanceSeo(html: string, requestUrl: string): string {
  if (requestUrl.split("?")[0] !== "/sundance") {
    return html;
  }

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
    <meta property="og:url" content="https://12acre.com/sundance" />
    <link rel="canonical" href="https://12acre.com/sundance" />`;

  return page.replace("</head>", `${routeHead}\n  </head>`);
}