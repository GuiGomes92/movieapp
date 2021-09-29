import React from "react";
import Home from './Home'
import Movie from './Movie'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/:category/:type/:id" render={(props) => <Movie {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
