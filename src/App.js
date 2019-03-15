import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const Onboard = React.lazy(() => import("./Containers/Onboard/Onboard"));
class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Suspense fallback={<div>Page is loading...</div>}>
          <Router>
            <Switch>
              <Route exact path="/" render={props => <Onboard {...props} />} />
            </Switch>
          </Router>
        </React.Suspense>
      </div>
    );
  }
}

export default App;
