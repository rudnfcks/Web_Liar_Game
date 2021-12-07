import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Join from "./pages/Join";
import Lobby from "./pages/Lobby";

import "./reset.css";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/join">
          <Join />
        </Route>
        <Route path="/lobby">
          <Lobby />
        </Route>
        <Route path="/">
          <Redirect to="/join" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
