import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/layout";
import Home from "@/pages/home";
import Animals from "@/pages/animals";
import Donate from "@/pages/donate";
import SuccessStories from "@/pages/success-stories";
import Contact from "@/pages/contact";
import ExplorerHub from "@/pages/explorer-hub";
import JuniorRanger from "@/pages/junior-ranger";
import GreenTeamGames from "@/pages/green-team-games";
import EcoHeroes from "@/pages/eco-heroes";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/animals" component={Animals} />
        <Route path="/donate" component={Donate} />
        <Route path="/success-stories" component={SuccessStories} />
        <Route path="/contact" component={Contact} />
        <Route path="/explorer" component={ExplorerHub} />
        <Route path="/junior-ranger" component={JuniorRanger} />
        <Route path="/games" component={GreenTeamGames} />
        <Route path="/eco-heroes" component={EcoHeroes} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;