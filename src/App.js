import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import io from "socket.io-client";

import Join from "./pages/Join";
import Lobby from "./pages/Lobby";
import Game from "./pages/Game";
import Word from "./pages/Word";

import "./reset.css";

//const socket = io.connect("http://113.199.116.33:5000");
const socket = io.connect("http://192.168.0.69:5000");

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/join">
          <Join socket={socket} />
        </Route>
        <Route path="/lobby">
          <Lobby socket={socket} />
        </Route>
        <Route path="/game">
          <Game socket={socket} />
        </Route>
        <Route path="/word">
          <Word socket={socket} />
        </Route>
        <Route path="/">
          <Redirect to="/join" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
