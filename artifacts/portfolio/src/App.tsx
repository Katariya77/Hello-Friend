import { Switch, Route, Router as WouterRouter } from "wouter";
import HomePage from "@/pages/HomePage";
import ProjectsPage from "@/pages/ProjectsPage";
import SkillsPage from "@/pages/SkillsPage";
import AboutPage from "@/pages/AboutPage";

function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/skills" component={SkillsPage} />
        <Route path="/about" component={AboutPage} />
        <Route>
          <HomePage />
        </Route>
      </Switch>
    </WouterRouter>
  );
}

export default App;
