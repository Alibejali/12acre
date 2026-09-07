import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Events from "@/pages/events";
import EventsSundance from "@/pages/events-sundance";
import EventsSupperClub from "@/pages/events-supperclub";
import EventsMoreovers from "@/pages/events-moreovers";
import EventsCrafternoon from "@/pages/events-crafternoon";
import EventsWanderlust from "@/pages/events-wanderlust";
import Admin from "@/pages/admin";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/events" component={Events} />
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
