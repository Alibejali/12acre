export type MediaCategory = "Festivals" | "Theaters" | "Orgs / film office" | "Training" | "Studios" | "Media companies" | "Podcasts";
export type MediaConfidence = "VERIFIED" | "UNCERTAIN";

export type ColoradoMediaListing = {
  name: string;
  category: MediaCategory;
  location: string;
  description: string;
  url: string;
  confidence: MediaConfidence;
  keywords: string[];
};

export const mediaCategories: MediaCategory[] = ["Festivals", "Theaters", "Orgs / film office", "Training", "Studios", "Media companies", "Podcasts"];

export const coloradoMediaListings: ColoradoMediaListing[] = [
  {
    name: "Cine Fe",
    category: "Orgs / film office",
    location: "Colorado",
    description: "Filmmaker services, fellowships, research, and community support for Colorado storytellers.",
    url: "https://www.cinefe.org/",
    confidence: "VERIFIED",
    keywords: ["filmmakers", "fellowship", "community", "creative media"],
  },
  {
    name: "Colorado Film Study",
    category: "Media companies",
    location: "Colorado",
    description: "Public research on Colorado film, television, video, jobs, revenue, needs, and opportunities.",
    url: "https://www.cinefe.org/study",
    confidence: "VERIFIED",
    keywords: ["research", "film study", "television", "video", "industry"],
  },
  {
    name: "Colorado Office of Film, Television and Media",
    category: "Orgs / film office",
    location: "Colorado",
    description: "State film office resources for production, locations, festivals, incentives, and industry development.",
    url: "https://oedit.colorado.gov/colorado-office-film-television-media",
    confidence: "VERIFIED",
    keywords: ["film office", "production", "locations", "incentives", "festivals"],
  },
  {
    name: "Colorado media resources and partners",
    category: "Orgs / film office",
    location: "Colorado",
    description: "OEDIT’s public list of film, television, media, production, professional, and community partners.",
    url: "https://oedit.colorado.gov/film-television-and-media-resources-and-partners",
    confidence: "VERIFIED",
    keywords: ["partners", "organizations", "professional", "television", "media"],
  },
  {
    name: "Colorado Film Commission education",
    category: "Training",
    location: "Colorado",
    description: "Public information about workshops, youth programs, production-assistant training, and media education.",
    url: "https://coloradofilm.org/what-we-do/education",
    confidence: "VERIFIED",
    keywords: ["education", "workshops", "training", "students", "production assistant"],
  },
  {
    name: "Colorado Films",
    category: "Media companies",
    location: "Colorado",
    description: "Independent Colorado film discovery with public pages for screenings, organizations, festivals, and podcasts.",
    url: "https://coloradofilms.com/",
    confidence: "VERIFIED",
    keywords: ["screenings", "independent", "organizations", "creative media"],
  },
  {
    name: "Colorado Films festivals",
    category: "Festivals",
    location: "Colorado",
    description: "A public Colorado Films path for finding film festivals and related screening activity.",
    url: "https://coloradofilms.com/OutNow",
    confidence: "VERIFIED",
    keywords: ["festival", "screening", "events", "film"],
  },
  {
    name: "Colorado independent theaters",
    category: "Theaters",
    location: "Colorado",
    description: "Public discovery page for Colorado art houses, independent cinemas, and repertory venues.",
    url: "https://coloradofilms.com/OutNow",
    confidence: "VERIFIED",
    keywords: ["theater", "cinema", "art house", "repertory", "screenings"],
  },
  {
    name: "Colorado Films Podcast",
    category: "Podcasts",
    location: "Colorado",
    description: "Conversations and discovery focused on Colorado films and the people who make them.",
    url: "https://coloradofilms.com/",
    confidence: "VERIFIED",
    keywords: ["podcast", "interviews", "filmmakers", "audio"],
  },
  {
    name: "Boulder County Film Commission",
    category: "Orgs / film office",
    location: "Boulder County",
    description: "Regional film-commission information, industry events, education, and production-community connections.",
    url: "https://bouldercountyfilmcommission.com/",
    confidence: "VERIFIED",
    keywords: ["boulder", "film commission", "events", "production"],
  },
];