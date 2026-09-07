export type PlannerStop = {
  id: string;
  name: string;
  address: string;
  kind: "venue" | "custom" | "base" | "meal";
  date?: string;
  arrival?: string;
  runtime?: number;
  buffer?: number;
  safety?: number;
  notes?: string;
  lat?: number;
  lng?: number;
};

export const plannerVenues = [
  "Boulder Theater", "eTown Hall", "Canyon Theater (Boulder Public Library)",
  "Hotel Boulderado", "Casey Middle School Auditorium", "Macky Auditorium Concert Hall",
  "Muenzinger Auditorium", "Roe Green Theatre", "Chautauqua Auditorium",
  "Boedecker Theater — Dairy Arts Center", "Gordon Gamm Theater — Dairy Arts Center",
  "Cinemark Century Boulder", "Boulder High School Auditorium",
].map((name) => ({ name, address: `${name}, Boulder, CO` }));

export function readPlanner(): PlannerStop[] {
  try {
    const value = localStorage.getItem("sundanceGuide.dayPlan") ?? localStorage.getItem("sundanceGuide.plan");
    return value ? JSON.parse(value) : [];
  } catch { return []; }
}

export function savePlanner(stops: PlannerStop[]) {
  localStorage.setItem("sundanceGuide.dayPlan", JSON.stringify(stops));
  window.dispatchEvent(new Event("sundance-plan-change"));
}