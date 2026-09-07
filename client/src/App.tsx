import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Events from "@/pages/events";
import EventsSundance from "@/pages/events-sundance";
import SundanceGuide from "@/pages/sundance-guide";
import SundanceGuideMap from "@/pages/sundance-guide-map";
import SundanceGuidePlan from "@/pages/sundance-guide-plan";
import SundanceGuideEat from "@/pages/sundance-guide-eat";
import SundanceGuideTransit from "@/pages/sundance-guide-transit";
import SundanceGuideAsk from "@/pages/sundance-guide-ask";
import { GuidePreferencesProvider } from "@/components/sundance-guide-preferences";
import EventsSupperClub from "@/pages/events-supperclub";
import EventsMoreovers from "@/pages/events-moreovers";
import EventsCrafternoon from "@/pages/events-crafternoon";
import EventsWanderlust from "@/pages/events-wanderlust";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  const GuideOverviewRoute = () => <GuidePreferencesProvider><SundanceGuide /></GuidePreferencesProvider>;
  const GuideMapRoute = () => <GuidePreferencesProvider><SundanceGuideMap /></GuidePreferencesProvider>;
  const GuidePlanRoute = () => <GuidePreferencesProvider><SundanceGuidePlan /></GuidePreferencesProvider>;
  const GuideEatRoute = () => <GuidePreferencesProvider><SundanceGuideEat /></GuidePreferencesProvider>;
  const GuideTransitRoute = () => <GuidePreferencesProvider><SundanceGuideTransit /></GuidePreferencesProvider>;
  const GuideAskRoute = () => <GuidePreferencesProvider><SundanceGuideAsk /></GuidePreferencesProvider>;
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/events" component={Events} />
      <Route path="/sundance/guide/map" component={GuideMapRoute} />
      <Route path="/sundance/guide/plan" component={GuidePlanRoute} />
      <Route path="/sundance/guide/ask" component={GuideAskRoute} />
      <Route path="/sundance/guide/eat" component={GuideEatRoute} />
      <Route path="/sundance/guide/transit" component={GuideTransitRoute} />
      <Route path="/sundance/guide" component={GuideOverviewRoute} />
      <Route path="/sundance" component={EventsSundance} />
      <Route path="/events/sundance" component={EventsSundance} />
      <Route path="/events/supperclub" component={EventsSupperClub} />
      <Route path="/events/moreovers" component={EventsMoreovers} />
      <Route path="/events/crafternoon" component={EventsCrafternoon} />
      <Route path="/events/wanderlust" component={EventsWanderlust} />
      <Route path="/admin" component={Admin} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
