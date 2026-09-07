import {
  Film,
  UtensilsCrossed,
  CookingPot,
  Palette,
  Compass,
  type LucideIcon,
} from "lucide-react";

export type EventCard = {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
};

export const eventCards: EventCard[] = [
  {
    name: "Sundance",
    slug: "sundance",
    icon: Film,
    description:
      "Experience the 2027 Sundance Film Festival from the comfort of a luxury townhome. Short-term residences curated for creatives, industry insiders, and film enthusiasts seeking an elevated stay during one of the world's most celebrated independent film events.",
  },
  {
    name: "Supper Club",
    slug: "supperclub",
    icon: UtensilsCrossed,
    description:
      "An exclusive, invite-only dining experience bringing together a carefully curated group for meaningful conversation over a shared meal. Seats are limited and extended by personal invitation only.",
  },
  {
    name: "Moreovers",
    slug: "moreovers",
    icon: CookingPot,
    description:
      "Turning leftovers into something more — because great food doesn't end after the first serving. A community cooking experience where we share tips, tricks, and creative recipes to transform yesterday's meal into today's masterpiece.",
  },
  {
    name: "Crafternoon",
    slug: "crafternoon",
    icon: Palette,
    description:
      "Hands-on creative sessions that blend craft, community, and collaboration in an environment where ideas take physical shape.",
  },
  {
    name: "Wanderlust",
    slug: "wanderlust",
    icon: Compass,
    description:
      "Travellers Club dossiers for friends — live like a local, multi-leg journeys (London → Iceland pilot), maps, stories, invites, weather, and local know-how.",
  },
];
