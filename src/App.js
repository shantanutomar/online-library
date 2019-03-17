import React, { Component } from "react";
import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Containers/ProtectedRoute/ProtectedRoute";
import Homepage from "./Containers/Homepage/Homepage";
import { history } from "./Helpers/history";

const Onboard = React.lazy(() => import("./Containers/Onboard/Onboard"));
class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Suspense fallback={<div>Page is loading...</div>}>
          <Router history={history}>
            <Switch>
              <ProtectedRoute
                exact
                path="/"
                renderFunc={routeProps => <Homepage {...routeProps} />}
              />
              <Route
                exact
                path="/login"
                render={props => <Onboard {...props} />}
              />
            </Switch>
          </Router>
        </React.Suspense>
      </div>
    );
  }
}

export default App;
