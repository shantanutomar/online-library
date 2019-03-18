import React, { Component } from "react";
import "./App.css";
import { Router, Switch, Route } from "react-router-dom";
import ProtectedRoute from "./Containers/ProtectedRoute/ProtectedRoute";
import { history } from "./Helpers/history";
import { withTheme } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/core/styles";

const Onboard = React.lazy(() => import("./Containers/Onboard/Onboard"));
const Homepage = React.lazy(() => import("./Containers/Homepage/Homepage"));
const MessageSnackbar = React.lazy(() =>
  import("./Containers/MessageSnackbar/MessageSnackbar")
);

const styles = theme => ({
  loadingText: {
    color: theme.palette.primary.main,
    fontFamily: "UbuntuBold"
  }
});
class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <React.Suspense
          fallback={<span className={classes.loadingText}>LOADING PAGE!!</span>}
        >
          <MessageSnackbar />
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

export default withTheme()(withStyles(styles)(App));
